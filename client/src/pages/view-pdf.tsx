import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

export default function ViewPDF() {
  const [location, setLocation] = useLocation();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Parse URL query parameter to get the PDF URL
      const searchParams = new URLSearchParams(window.location.search);
      let url = searchParams.get('url');
      
      if (!url) {
        console.warn('No PDF URL provided in query parameters');
        setErrorMessage('PDF URL이 제공되지 않았습니다.');
        return;
      }
      
      // 공백 문자 및 인코딩 수정
      url = decodeURIComponent(url).trim();
      
      // 절대 경로가 아닌 경우 현재 도메인에 상대적인 경로로 변환 (배포 환경 지원)
      if (!url.startsWith('http')) {
        const base = window.location.origin;
        url = `${base}${url.startsWith('/') ? '' : '/'}${url}`;
      }
      
      // URL에 이미 쿼리 파라미터가 있는지 확인 (캐시 방지용)
      if (url.includes('?')) {
        // 기존 쿼리에 캐시 버스팅 파라미터 추가
        url += `&cache=${Date.now()}`;
      } else {
        // 새 쿼리 파라미터 추가
        url += `?cache=${Date.now()}`;
      }
      
      // 로컬 스토리지에 최근 열람한 PDF URL 저장 (디버깅용)
      try {
        localStorage.setItem('lastPdfUrl', url);
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      
      console.log('Loading PDF at URL:', url);
      setPdfUrl(url);
      
    } catch (error) {
      console.error('Error processing PDF URL:', error);
      setErrorMessage('PDF URL 처리 중 오류가 발생했습니다.');
    }
  }, []);

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  // 원본 URL 추출 (직접 브라우저에서 열 수 있는 URL)
  const getOriginalUrl = () => {
    try {
      if (!pdfUrl) return null;
      
      // URL에서 캐시 파라미터 제거
      const url = new URL(pdfUrl);
      url.searchParams.delete('cache');
      
      return url.toString();
    } catch (e) {
      console.error('Error processing URL:', e);
      return pdfUrl;
    }
  };
  
  const originalUrl = getOriginalUrl();
  
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setLocation('/whitepaper')}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Whitepaper
          </Button>
          
          <div className="flex gap-2">
            {originalUrl && (
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => window.open(originalUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Open in Browser
              </Button>
            )}
            
            <Button
              className="bg-gradient-to-r from-[#3A86FF] to-[#FF6F61]/80"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg shadow-lg overflow-hidden w-full"
          style={{ height: 'calc(100vh - 150px)' }}
        >
          {errorMessage ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <p className="text-red-500 mb-4 text-xl">{errorMessage}</p>
              <p className="text-muted-foreground text-sm text-center mb-6">백서를 불러오는 데 문제가 발생했습니다.</p>
              
              {originalUrl && (
                <div className="flex flex-col gap-4">
                  <Button
                    className="bg-gradient-to-r from-[#3A86FF] to-[#FF6F61]/80"
                    onClick={() => window.open(originalUrl, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    브라우저에서 직접 열기
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setLocation('/whitepaper')}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    백서 페이지로 돌아가기
                  </Button>
                </div>
              )}
            </div>
          ) : pdfUrl ? (
            <iframe 
              src={pdfUrl} 
              className="w-full h-full border-0" 
              title="PDF Viewer"
              onError={() => setErrorMessage('PDF를 로드하는 중 오류가 발생했습니다.')}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground">PDF를 불러오는 중...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}