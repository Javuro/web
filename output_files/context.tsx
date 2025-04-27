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

// websocket 서버에 연결
function connectToWsServer() {
  if (typeof window === 'undefined') return null;
  if (wsConnection && wsConnection.readyState === WebSocket.OPEN) return wsConnection;
  
  try {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    console.log('Connecting to WebSocket server at:', wsUrl);
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received from server:', data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
    };
    
    wsConnection = ws;
    return ws;
  } catch (error) {
    console.error('Failed to connect to WebSocket server:', error);
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
    // 서버 측 WebSocket 연결 구성
    connectToWsServer();
    
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
        showQrModal: true,
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
      
      // WalletConnect 우선 시도 (모바일 또는 Safari 브라우저)
      if (isMobileDevice || isSafariBrowser) {
        const walletConnectConnector = config.connectors.find(
          c => c instanceof WalletConnectConnector
        );

        if (walletConnectConnector) {
          try {
            console.log('Attempting WalletConnect connection on mobile/Safari...');
            
            // 서버에 연결된 WebSocket이 있으면 URI 요청을 보낼 준비
            if (ws && ws.readyState === WebSocket.OPEN) {
              // WalletConnect의 URI를 얻기 위한 이벤트 리스너 설정
              const uriListener = async (event: any) => {
                try {
                  const data = JSON.parse(event.data);
                  
                  // walletconnect:// URI 감지
                  if (data.type === 'walletconnect' && data.uri) {
                    // QR 코드 페이지로 리디렉션
                    window.open(`/qr-view.html?uri=${encodeURIComponent(data.uri)}`, '_blank');
                    
                    // 리스너 제거
                    ws.removeEventListener('message', uriListener);
                  }
                } catch (error) {
                  console.error('Failed to parse WebSocket message:', error);
                }
              };
              
              // 리스너 등록
              ws.addEventListener('message', uriListener);
            }
            
            // WalletConnect 연결 시도
            await connect({ connector: walletConnectConnector });
            return;
          } catch (error: any) {
            console.error('WalletConnect connection error:', error);
            console.log('Falling back to MetaMask...');
          }
        }
      }

      // MetaMask 시도
      if (typeof window !== 'undefined' && window.ethereum) {
        const injectedConnector = config.connectors.find(
          c => c instanceof InjectedConnector
        );

        if (injectedConnector) {
          try {
            console.log('Attempting MetaMask connection...');
            await connect({ connector: injectedConnector });
            return;
          } catch (error) {
            console.log('MetaMask connection failed, trying WalletConnect...', error);
          }
        }
      }

      // 최종적으로 WalletConnect로 폴백
      const walletConnectConnector = config.connectors.find(
        c => c instanceof WalletConnectConnector
      );

      if (!walletConnectConnector) {
        throw new Error('WalletConnect not initialized');
      }

      try {
        console.log('Attempting WalletConnect connection...');
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