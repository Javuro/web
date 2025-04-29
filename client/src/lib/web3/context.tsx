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
 * 2. iframe 기반 QR 모달이 CSP(Content-Security-Policy) 정책에 의해 차단되는 문제
 * 3. window 객체 접근 시점이 SSR과 충돌하는 문제
 * 
 * 해결 방안:
 * 1. projectId를 하드코딩하여 환경변수 의존성 제거
 * 2. index.html에 frame-src CSP 설정 추가
 * 3. typeof window 체크 후 WalletConnect 초기화
 */

// WalletConnect Project ID - 환경 변수 또는 기본값 사용
const WALLET_CONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "ce3c8945b428cc57f1c3c0945e0f8d13";

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
        return {
          name: 'JAVURO',
          description: 'JAVURO Web3 Application',
          url: window.location.origin,
          icons: [`${window.location.origin}/favicon.png`]
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
    
    const walletConnectConnector = new WalletConnectConnector({
      chains,
      options: {
        projectId: WALLET_CONNECT_PROJECT_ID,
        showQrModal: true,
        qrModalOptions: {
          themeMode: 'dark',
          qrModalTheme: {
            borderRadius: {
              primary: 'var(--radius)',
              secondary: 'var(--radius)',
              modal: 'var(--radius)',
            },
          },
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

      const config = getWagmiConfig();
      if (!config) {
        throw new Error('Failed to initialize wallet configuration');
      }

      // Try WalletConnect first for mobile devices
      if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const walletConnectConnector = config.connectors.find(
          c => c instanceof WalletConnectConnector
        );

        if (walletConnectConnector) {
          try {
            console.log('Attempting WalletConnect connection on mobile...');
            await connect({ connector: walletConnectConnector });
            return;
          } catch (error: any) {
            console.error('WalletConnect connection error:', error);
            console.log('Falling back to MetaMask...');
          }
        }
      }

      // Try MetaMask
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

      // Fallback to WalletConnect
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
        throw new Error('WalletConnect 연결에 실패했습니다. 다시 시도해주세요.');
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