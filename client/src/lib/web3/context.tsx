import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { WagmiConfig, createConfig, configureChains, useAccount, useConnect, useDisconnect } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// ethereum 속성을 window 인터페이스에 추가
declare global {
  interface Window {
    ethereum?: any;
  }
}

/**
 * WalletConnect QR 모달이 작동하지 않는 주요 원인:
 * 1. 배포 환경과 로컬 환경 간의 웹소켓 연결 불일치
 * 2. iframe 기반 QR 모달이 CSP(Content-Security-Policy) 정책에 의해 차단
 * 3. window 객체 접근 시점 문제
 * 4. WalletConnect 버전 호환성 문제
 * 
 * 해결 방안:
 * 1. 항상 javuro.com 도메인 사용으로 설정 통일
 * 2. CSP 설정에 필요한 도메인 추가
 * 3. 자체 WebSocket 서버 활용
 * 4. 커스텀 QR 코드 페이지 제공
 */

// 고정 WalletConnect Project ID
const WALLET_CONNECT_PROJECT_ID = "ce3c8945b428cc57f1c3c0945e0f8d13";

// WebSocket 연결 관리
let wsConnection: WebSocket | null = null;

// WalletConnect 메타데이터 정의
const WALLET_CONNECT_METADATA = {
  name: 'JAVURO',
  description: 'JAVURO Web3 Application',
  url: 'https://javuro.com',
  icons: ['https://javuro.com/favicon.png']
};

// WalletConnect URI 이벤트 리스너
type WCUriListener = (uri: string) => void;
const wcUriListeners: WCUriListener[] = [];

// WalletConnect URI 리스너 등록
export function addWalletConnectUriListener(listener: WCUriListener) {
  console.log('Adding WalletConnect URI listener');
  wcUriListeners.push(listener);
  return () => {
    const index = wcUriListeners.indexOf(listener);
    if (index > -1) {
      wcUriListeners.splice(index, 1);
      console.log('Removed WalletConnect URI listener');
    }
  };
}

// WalletConnect URI 발견 시 모든 리스너에게 알림
function notifyWalletConnectUri(uri: string) {
  if (!uri || !uri.startsWith('wc:')) return;
  
  console.log('WalletConnect URI detected:', uri.substring(0, 20) + '...');
  wcUriListeners.forEach(listener => {
    try {
      listener(uri);
    } catch (error) {
      console.error('Error in WalletConnect URI listener:', error);
    }
  });
}

// 환경 감지 (Netlify vs 개발환경)
function isNetlifyEnvironment() {
  return typeof window !== 'undefined' && window.location.hostname.includes('.netlify.app');
}

// websocket 서버에 연결
function connectToWsServer() {
  if (typeof window === 'undefined') return null;
  if (wsConnection && wsConnection.readyState === WebSocket.OPEN) return wsConnection;
  
  try {
    // Netlify 환경에서는 서버리스 함수를 사용한 대체 경로 사용
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    let wsUrl;
    
    if (isNetlifyEnvironment()) {
      // Netlify 환경에서는 서버리스 함수를 사용
      wsUrl = `${protocol}//${window.location.host}/wallet-connect`;
    } else {
      // 개발 환경에서는 일반 WebSocket 사용
      wsUrl = `${protocol}//${window.location.host}/ws`;
    }
    
    console.log('Connecting to WebSocket server at:', wsUrl);
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
      
      // Netlify 환경인 경우 초기 연결 메시지 전송
      if (isNetlifyEnvironment()) {
        ws.send(JSON.stringify({ 
          type: 'init', 
          clientInfo: {
            userAgent: navigator.userAgent,
            url: window.location.href
          }
        }));
      }
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received from server:', data);
        
        // WalletConnect URI 감지하여 리스너에게 전달
        if (data.uri && data.uri.startsWith('wc:')) {
          notifyWalletConnectUri(data.uri);
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      
      // 연결 끊김 시 5초 후 재시도 (Netlify에서만)
      if (isNetlifyEnvironment()) {
        setTimeout(() => {
          console.log('Attempting to reconnect WebSocket...');
          wsConnection = null;
          connectToWsServer();
        }, 5000);
      }
    };
    
    wsConnection = ws;
    return ws;
  } catch (error) {
    console.error('Failed to connect to WebSocket server:', error);
    return null;
  }
}

// 블록체인 네트워크 설정
const { chains, publicClient } = configureChains(
  [bsc],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://bsc-dataseed.binance.org',
      }),
    }),
  ]
);

let wagmiConfig: ReturnType<typeof createConfig> | null = null;

// Netlify 서버리스 함수를 사용하여 WalletConnect URI 얻기
async function getWalletConnectURIFromNetlify() {
  try {
    // 서버리스 함수 호출
    const response = await fetch('/.netlify/functions/wallet-connect');
    const data = await response.json();
    
    if (data && data.uri && data.uri.startsWith('wc:')) {
      console.log('Got WalletConnect URI from Netlify function:', data.uri.substring(0, 20) + '...');
      return data.uri;
    }
    
    throw new Error('Invalid URI response from Netlify function');
  } catch (error) {
    console.error('Failed to get WalletConnect URI from Netlify function:', error);
    return null;
  }
}

// 클라이언트 사이드에서만 wagmi config 초기화
function getWagmiConfig() {
  if (typeof window === 'undefined') {
    console.warn('Attempting to initialize wagmi config in non-browser environment');
    return null;
  }

  if (wagmiConfig) return wagmiConfig;

  try {
    // 환경에 따라 WebSocket 연결
    if (!isNetlifyEnvironment()) {
      connectToWsServer();
    } else {
      // Netlify 환경에서는 서버리스 함수를 이용해 URI 획득 준비
      getWalletConnectURIFromNetlify().then(uri => {
        if (uri) {
          notifyWalletConnectUri(uri);
        }
      });
    }
    
    // 메타마스크 커넥터 설정
    const injectedConnector = new InjectedConnector({
      chains,
      options: {
        name: 'MetaMask',
        shimDisconnect: true,
      },
    });

    // WalletConnect 커넥터 설정
    const walletConnectConnector = new WalletConnectConnector({
      chains,
      options: {
        projectId: WALLET_CONNECT_PROJECT_ID,
        showQrModal: false, // 커스텀 QR 모달 사용
        metadata: WALLET_CONNECT_METADATA,
      },
    });

    wagmiConfig = createConfig({
      autoConnect: false,
      publicClient,
      connectors: [injectedConnector, walletConnectConnector],
    });

    return wagmiConfig;
  } catch (error) {
    console.error('Failed to initialize wagmi config:', error);
    return null;
  }
}

interface Web3ContextType {
  account: string | null;
  balance: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType | null>(null);

function Web3ContextProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const clearWalletConnectSessions = () => {
    if (typeof window === 'undefined') return;

    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('wc@') || key.startsWith('walletconnect')) {
          localStorage.removeItem(key);
        }
      });
    } catch (err) {
      console.error('Error clearing WalletConnect sessions:', err);
    }
  };

  async function connectWallet() {
    if (typeof window === 'undefined') {
      console.error('Cannot connect wallet in non-browser environment');
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      clearWalletConnectSessions();

      // WebSocket 연결 확인/재연결
      const ws = connectToWsServer();
      
      const config = getWagmiConfig();
      if (!config) {
        throw new Error('Failed to initialize wallet configuration');
      }

      // 모바일 기기 감지
      const isMobileDevice = typeof navigator !== 'undefined' && 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Safari 브라우저 감지
      const isSafariBrowser = typeof navigator !== 'undefined' && 
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      // 브라우저 확장 감지
      const hasExtension = typeof window !== 'undefined' && !!window.ethereum;
      
      console.log('Device detection:', { 
        isMobile: isMobileDevice, 
        isSafari: isSafariBrowser,
        hasExtension: hasExtension
      });

      // WalletConnect 우선 시도 (모바일이나 Safari 또는 확장이 없는 경우)
      if (isMobileDevice || isSafariBrowser || !hasExtension) {
        const walletConnectConnector = config.connectors.find(
          c => c instanceof WalletConnectConnector
        );

        if (walletConnectConnector) {
          try {
            console.log('Attempting WalletConnect connection...');
            await connect({ connector: walletConnectConnector });
            return;
          } catch (error: any) {
            console.error('WalletConnect connection error:', error);
            console.log('Falling back to injected connector...');
          }
        }
      }

      // MetaMask/확장 시도
      if (hasExtension) {
        const injectedConnector = config.connectors.find(
          c => c instanceof InjectedConnector
        );

        if (injectedConnector) {
          try {
            console.log('Attempting Injected connector connection...');
            await connect({ connector: injectedConnector });
            return;
          } catch (error) {
            console.log('Injected connector failed, trying WalletConnect...', error);
          }
        }
      }

      // 최종적으로 WalletConnect 시도
      const walletConnectConnector = config.connectors.find(
        c => c instanceof WalletConnectConnector
      );

      if (!walletConnectConnector) {
        throw new Error('WalletConnect not initialized');
      }

      try {
        console.log('Attempting WalletConnect connection as fallback...');
        await connect({ connector: walletConnectConnector });
      } catch (error: any) {
        console.error('WalletConnect connection error details:', {
          name: error.name,
          message: error.message,
          code: error.code,
          stack: error.stack,
        });
        
        if (error.message && error.message.includes('User rejected')) {
          throw new Error('사용자가 연결 요청을 거부했습니다.');
        } else {
          throw new Error('WalletConnect 연결에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError(err instanceof Error ? err.message : '지갑 연결에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsConnecting(false);
    }
  }

  function disconnectWallet() {
    try {
      disconnect();
      clearWalletConnectSessions();
    } catch (err) {
      console.error('Wallet disconnection error:', err);
    }
  }

  return (
    <Web3Context.Provider
      value={{
        account: address || null,
        balance: null,
        connectWallet,
        disconnectWallet,
        isConnecting,
        error,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function Web3Provider({ children }: { children: ReactNode }) {
  // useEffect를 사용하여 브라우저 환경에서만 컴포넌트를 렌더링
  const [config, setConfig] = useState<ReturnType<typeof createConfig> | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // 브라우저 환경에서만 wagmi 구성 초기화
    if (typeof window !== 'undefined') {
      const wagmiConfig = getWagmiConfig();
      setConfig(wagmiConfig);
      setInitialized(true);
    }
  }, []);

  // 초기화 전에는 빈 div 반환
  if (!initialized) {
    return <div style={{ display: 'none' }}></div>;
  }

  // 초기화 후 config가 없으면 에러 표시
  if (!config) {
    console.error('Failed to initialize wagmi config');
    return (
      <div className="p-4 text-center text-red-500">
        지갑 연결 설정을 초기화할 수 없습니다. 브라우저를 새로고침하거나 다른 브라우저로 시도해주세요.
      </div>
    );
  }

  return (
    <WagmiConfig config={config}>
      <Web3ContextProvider>{children}</Web3ContextProvider>
    </WagmiConfig>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}