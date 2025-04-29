import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface WalletQRModalProps {
  uri: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalletQRModal({ uri, isOpen, onOpenChange }: WalletQRModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // QR 코드 생성
  useEffect(() => {
    if (!uri) {
      setQrCodeDataUrl(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // WalletConnect URI 로깅 (디버깅용)
      console.log('Generating QR code for URI:', uri.substring(0, 20) + '...');
      
      // QR 코드 생성 설정
      const qrOptions = {
        color: {
          dark: '#000000',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'H' as const,
        margin: 1,
        width: 300
      };
      
      // QR 코드 생성
      QRCode.toDataURL(uri, qrOptions)
        .then(url => {
          setQrCodeDataUrl(url);
          setIsLoading(false);
          console.log('QR code generated successfully');
        })
        .catch(err => {
          console.error('QR 코드 생성 실패:', err);
          setError('QR 코드 생성에 실패했습니다.');
          setIsLoading(false);
          
          // 실패 시 대체 솔루션 - 외부 QR 코드 생성 서비스 사용
          try {
            const encodedUri = encodeURIComponent(uri);
            const backupQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUri}`;
            setQrCodeDataUrl(backupQrUrl);
            setIsLoading(false);
            setError(null);
            console.log('Using backup QR code service');
          } catch (backupErr) {
            console.error('Backup QR code generation failed:', backupErr);
          }
        });
    } catch (err) {
      console.error('QR 코드 생성 오류:', err);
      setError('QR 코드 생성 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  }, [uri]);

  // 클립보드에 URI 복사
  const copyToClipboard = () => {
    if (!uri) return;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(uri)
        .then(() => {
          alert('복사 완료! 지갑 앱에 붙여넣기 하세요.');
        })
        .catch((err) => {
          console.error('클립보드 복사 실패:', err);
          alert('복사 실패. 수동으로 복사해주세요.');
        });
    } else {
      // 비보안 환경용 대체 방법
      const textArea = document.createElement("textarea");
      textArea.value = uri;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          alert('복사 완료! 지갑 앱에 붙여넣기 하세요.');
        } else {
          alert('복사 실패. 수동으로 복사해주세요.');
        }
      } catch (err) {
        console.error('클립보드 복사 오류:', err);
        alert('복사 실패. 수동으로 복사해주세요.');
      }
      
      document.body.removeChild(textArea);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>지갑 연결</DialogTitle>
        <DialogDescription>
          QR 코드를 스캔하거나 URI를 복사하여 지갑을 연결하세요.
        </DialogDescription>
        
        <div className="flex flex-col items-center justify-center py-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-[300px] w-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-sm text-muted-foreground">QR 코드 생성 중...</p>
            </div>
          )}
          
          {!isLoading && error && (
            <div className="flex flex-col items-center justify-center h-[300px] w-[300px] bg-destructive/10 text-destructive rounded-md">
              <p className="text-center p-4">{error}</p>
            </div>
          )}
          
          {!isLoading && !error && qrCodeDataUrl && (
            <div className="bg-white p-4 rounded-md">
              <img 
                src={qrCodeDataUrl} 
                alt="WalletConnect QR Code" 
                className="h-[300px] w-[300px]"
              />
            </div>
          )}
          
          {uri && (
            <div className="mt-4 w-full">
              <div className="bg-muted p-2 rounded-md text-xs font-mono overflow-x-auto break-all">
                {uri}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={copyToClipboard}
              >
                URI 복사
              </Button>
            </div>
          )}
        </div>
        
        <DialogClose asChild>
          <Button variant="outline">닫기</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}