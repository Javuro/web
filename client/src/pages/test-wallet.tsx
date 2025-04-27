import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/lib/web3/context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, CheckIcon, ExternalLinkIcon } from 'lucide-react';

export function TestWallet() {
  const { account, connectWallet, disconnectWallet, isConnecting, error } = useWeb3();
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleConnectClick = async () => {
    setTestResult(null);
    try {
      await connectWallet();
      setTestResult('성공! 월렛 연결이 정상적으로 작동합니다.');
    } catch (err) {
      console.error('연결 테스트 실패:', err);
      setTestResult('실패: 월렛 연결 중 오류가 발생했습니다.');
    }
  };

  const handleDisconnectClick = () => {
    disconnectWallet();
    setTestResult('월렛 연결이 해제되었습니다.');
  };

  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card className="border-2 border-primary/10 shadow-lg">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-2xl font-bold text-primary">월렛 연결 테스트</CardTitle>
          <CardDescription>
            WalletConnect와 다른 월렛 연결 방식이 제대로 작동하는지 확인합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="flex flex-col items-center justify-center gap-4 p-6 bg-muted/50 rounded-lg">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">현재 상태</h3>
              <p className="text-muted-foreground mb-4">
                {account ? '월렛 연결됨' : '월렛 연결되지 않음'}
              </p>
              
              {account && (
                <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-primary/10 text-primary">
                  <CheckIcon className="w-4 h-4" />
                  <span>{shortenAddress(account)}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Button 
                onClick={handleConnectClick} 
                disabled={isConnecting || !!account}
                className="flex-1"
                size="lg"
              >
                {isConnecting ? '연결 중...' : '월렛 연결'}
              </Button>
              
              <Button 
                onClick={handleDisconnectClick} 
                disabled={!account}
                variant="outline" 
                className="flex-1"
                size="lg"
              >
                연결 해제
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>오류 발생</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {testResult && (
            <Alert variant={testResult.includes('성공') ? 'default' : 'destructive'}>
              {testResult.includes('성공') ? <CheckIcon className="h-4 w-4" /> : <InfoIcon className="h-4 w-4" />}
              <AlertTitle>{testResult.includes('성공') ? '테스트 성공' : '테스트 실패'}</AlertTitle>
              <AlertDescription>{testResult}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            이 페이지는 월렛 연결 기능을 테스트하기 위한 용도입니다. 
            연결 버튼을 클릭하면 WalletConnect 모달이 표시되어야 합니다.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <ExternalLinkIcon className="w-4 h-4" />
            <a 
              href="https://javuro.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              실제 사이트에서 테스트하기
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default TestWallet;