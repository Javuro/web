import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/lib/web3/context';
import { Loader2 } from 'lucide-react';

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className }: WalletButtonProps) {
  const { account, connectWallet, disconnectWallet, isConnecting, error } = useWeb3();
  const [isMobileOrSafari, setIsMobileOrSafari] = useState(false);
  const [showPopupWallets, setShowPopupWallets] = useState(false);

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
      
      {error && (
        <div className="absolute z-50 mt-2 p-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-sm w-[250px]">
          {error}
        </div>
      )}
    </div>
  );
}