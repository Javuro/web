import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
 * 1. Replit 배포 환경에서 환경변수(import.meta.env)가 제대로 주입되지 않는 문제
 * 2. iframe 기반 QR 모달이 CSP(Content-Security-Policy) 정책에 해 차단되는 문제
 * 3. window 객체 접근 시점이 SSR과 충돌하는 문제
 * 
 * 해결 방안:
 * 1. projectId를 하드코딩하여 환경변수 의존성 제거
 * 2. index.html에 frame-src CSP 설정 추가
 * 3. typeof window 체크 후 WalletConnect 초기화
 */

// WalletConnect Project ID - 환경 변수 또는 기본값 사용
const WALLET_CONNECT_PROJECT_ID = typeof window !== 'undefined' && window.WALLET_CONNECT_PROJECT_ID 
  ? window.WALLET_CONNECT_PROJECT_ID 
  : (typeof import.meta !== 'undefined' && import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID) 
    ? import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID 
    : "ce3c8945b428cc57f1c3c0945e0f8d13";

// Configure chains
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

// 클라이언트 사이드에서만 wagmi config 초기화
function getWagmiConfig() {
  if (typeof window === 'undefined') {
    console.warn('Attempting to initialize wagmi config in non-browser environment');
    return null;
  }

  if (wagmiConfig) return wagmiConfig;

  try {
    // Initialize connectors array with MetaMask
    const injectedConnector = new InjectedConnector({
      chains,
      options: {
        name: 'MetaMask',
        shimDisconnect: true,
      },
    });

    // 현재 URL과 favicon URL을 안전하게 가져오는 함수
    const getMetadata = () => {
      if (typeof window === 'undefined') {
        // 서버 사이드에서는 기본값 사용
        return {
          name: 'JAVURO',
          description: 'JAVURO Web3 Application',
          url: 'https://javuro.com',
          icons: ['https://javuro.com/favicon.png']
        };
      }
      
      // 클라이언트 사이드에서는 실제 URL 사용
      try {
        const origin = window.location.origin;
        console.log('Original URL:', `${origin}/docs/JAVURO%20Whitepaper%20EN%200.3.1.pdf`);
        return {
          name: 'JAVURO',
          description: 'JAVURO Web3 Application',
          url: origin,
          icons: [`${origin}/favicon.png`]
        };
      } catch (error) {
        console.error('Error creating metadata:', error);
        // 오류 발생 시 대체 값 사용
        return {
          name: 'JAVURO',
          description: 'JAVURO Web3 Application',
          url: 'https://javuro.com',
          icons: ['https://javuro.com/favicon.png']
        };
      }
    };

    // Initialize WalletConnect connector with dynamic metadata
    const metadata = getMetadata();
    console.log('WalletConnect metadata:', metadata);
    
    // WebSocket URL for WalletConnect
    const wsUrl = getWebSocketUrl();
    console.log('Connecting to WebSocket server at:', wsUrl);
    
    const walletConnectConnector = new WalletConnectConnector({
      chains,
      options: {
        projectId: WALLET_CONNECT_PROJECT_ID,
        showQrModal: true,
        qrModalOptions: {
          themeMode: 'dark',
          themeVariables: {
            '--wcm-z-index': '10000',  // 높은 z-index로 모달이 최상단에 표시되도록 함
            '--wcm-background-color': '#000000',
            '--wcm-accent-color': '#3A86FF',
            '--wcm-accent-fill-color': '#FFFFFF',
            '--wcm-background-border-radius': '8px'
          }
        },
        metadata
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

// WebSocket URL 생성 함수
function getWebSocketUrl() {
  if (typeof window === 'undefined') return '';
  
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/ws`;
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
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // WebSocket 연결 설정
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const wsUrl = getWebSocketUrl();
    const socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      console.log('WebSocket connection established');
      // 연결 정보 전송
      socket.send(JSON.stringify({ 
        type: 'connect', 
        clientInfo: {
          userAgent: navigator.userAgent,
          url: window.location.href
        }
      }));
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received from server:', data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

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

      // 모바일 장치 감지
      const isMobile = typeof navigator !== 'undefined' && 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Safari 브라우저 감지
      const isSafari = typeof navigator !== 'undefined' &&
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        
      console.log(`Device: ${isMobile ? 'Mobile' : 'Desktop'}, Browser: ${isSafari ? 'Safari' : 'Other'}`);

      // 사용 가능한 커넥터 가져오기
      const availableConnectors = connectors.filter(c => c.ready);
      const walletConnectConnector = availableConnectors.find(c => c.id === 'walletConnect');
      const injectedConnector = availableConnectors.find(c => c.id === 'injected');

      // 모바일 및 Safari에서는 WalletConnect를 우선 사용
      if ((isMobile || isSafari) && walletConnectConnector) {
        try {
          console.log('Attempting WalletConnect connection on mobile/Safari...');
          await connect({ connector: walletConnectConnector });
          return;
        } catch (error) {
          console.error('WalletConnect connection error:', error);
          if (injectedConnector) {
            console.log('Falling back to injected connector...');
          } else {
            throw error; // No fallback available
          }
        }
      }

      // 데스크톱에서는 MetaMask 등 injected provider 먼저 시도
      if (injectedConnector && window.ethereum) {
        try {
          console.log('Attempting MetaMask connection...');
          await connect({ connector: injectedConnector });
          return;
        } catch (error) {
          console.log('Injected connector failed, trying WalletConnect...', error);
          if (walletConnectConnector) {
            console.log('Falling back to WalletConnect...');
          } else {
            throw error; // No fallback available
          }
        }
      }

      // 최종 대안으로 WalletConnect 시도
      if (walletConnectConnector) {
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
          throw new Error('WalletConnect 연결에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        throw new Error('지원되는 지갑 커넥터가 없습니다.');
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