import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/lib/web3/context';
import { Loader2 } from 'lucide-react';
import { WalletQRModal } from './wallet-qr-modal';

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className }: WalletButtonProps) {
  const { account, connectWallet, disconnectWallet, isConnecting, error } = useWeb3();
  const [isMobileOrSafari, setIsMobileOrSafari] = useState(false);
  const [showPopupWallets, setShowPopupWallets] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [walletConnectUri, setWalletConnectUri] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // WebSocket 연결 설정
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setupWebSocket = () => {
      try {
        // WebSocket 연결
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws`;
        
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;
        
        // 연결 성공 시
        ws.onopen = () => {
          console.log('WebSocket connected successfully');
        };
        
        // 메시지 수신 시
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('WebSocket message received:', data);
            
            // WalletConnect URI 수신 처리
            if (data.uri && data.uri.startsWith('wc:')) {
              setWalletConnectUri(data.uri);
              setShowQRModal(true);
            }
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };
        
        // 오류 발생 시
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
        
        // 연결 종료 시
        ws.onclose = () => {
          console.log('WebSocket connection closed');
          
          // 연결 종료 시 5초 후 재연결 시도
          setTimeout(() => {
            if (wsRef.current?.readyState !== WebSocket.OPEN) {
              setupWebSocket();
            }
          }, 5000);
        };
      } catch (error) {
        console.error('Failed to setup WebSocket:', error);
      }
    };
    
    setupWebSocket();
    
    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // URI 감시자 설정 (WalletConnect 연결 완료 시 QR 모달 닫기)
  useEffect(() => {
    if (!showQRModal) {
      // 모달이 닫히면 URI 초기화
      setWalletConnectUri(null);
    }
  }, [showQRModal]);

  // 모바일 또는 사파리 감지
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      setIsMobileOrSafari(isMobile || isSafari);
    }
  }, []);

  // 주소 포맷팅 (0x1234...abcd 형식)
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // 지갑 앱 열기
  const openWalletApp = (walletType: string) => {
    try {
      let deepLink = '';
      const javuroDomain = 'javuro.com';
      
      switch(walletType) {
        case 'metamask':
          deepLink = 'https://metamask.app.link/dapp/' + javuroDomain;
          break;
        case 'trustwallet':
          deepLink = 'https://link.trustwallet.com/open_url?url=' + encodeURIComponent('https://' + javuroDomain);
          break;
        case 'imtoken':
          deepLink = 'imtokenv2://browserview?url=' + encodeURIComponent('https://' + javuroDomain);
          break;
        default:
          // 기본적으로 일반 연결 시도
          connectWallet();
          return;
      }
      
      // 딥링크 열기
      window.location.href = deepLink;
    } catch (error) {
      console.error('지갑 앱 실행 오류:', error);
    }
  };

  // 수동으로 WalletConnect QR 코드 표시
  const handleConnectWithQR = async () => {
    // 팝업 닫기
    setShowPopupWallets(false);
    
    // 우선 모든 기존 세션을 클리어
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('wc@') || key.startsWith('walletconnect')) {
          localStorage.removeItem(key);
        }
      });
    }
    
    // 더미 URI 설정 (테스트용)
    setWalletConnectUri('wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=91303dedf64285cbbaf9120f6e9d160a5c8aa3deb67017a3874cd272323f48ae');
    
    // QR 모달 열기
    setShowQRModal(true);
    
    try {
      // 실제 연결 시도
      connectWallet();
    } catch (error) {
      console.error('WalletConnect connection error:', error);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {account ? (
        <Button onClick={disconnectWallet} variant="outline">
          {formatAddress(account)}
        </Button>
      ) : (
        <>
          <Button 
            onClick={isMobileOrSafari ? () => setShowPopupWallets(!showPopupWallets) : connectWallet} 
            disabled={isConnecting}
            className="relative"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                연결 중...
              </>
            ) : (
              '지갑 연결'
            )}
          </Button>
          
          {/* 모바일/사파리용 지갑 선택 팝업 */}
          {isMobileOrSafari && showPopupWallets && (
            <div className="absolute z-50 mt-2 p-4 bg-background border rounded-md shadow-lg w-[200px] flex flex-col gap-2">
              <Button variant="outline" onClick={() => openWalletApp('metamask')}>
                MetaMask
              </Button>
              <Button variant="outline" onClick={() => openWalletApp('trustwallet')}>
                Trust Wallet
              </Button>
              <Button variant="outline" onClick={() => openWalletApp('imtoken')}>
                imToken
              </Button>
              <Button variant="outline" onClick={handleConnectWithQR}>
                WalletConnect (QR)
              </Button>
              <Button variant="outline" onClick={() => connectWallet()}>
                기타 지갑
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowPopupWallets(false)}>
                닫기
              </Button>
            </div>
          )}
        </>
      )}
      
      {/* WalletConnect QR 코드 모달 */}
      <WalletQRModal 
        uri={walletConnectUri} 
        isOpen={showQRModal} 
        onOpenChange={setShowQRModal} 
      />
      
      {error && (
        <div className="absolute z-50 mt-2 p-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-sm w-[250px]">
          {error}
        </div>
      )}
    </div>
  );
}