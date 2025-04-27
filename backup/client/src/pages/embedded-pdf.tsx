import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

/**
 * Embedded PDF Viewer Page
 * - Allows viewing PDFs directly within the website
 * - Uses direct embedding for better compatibility
 */
export default function EmbeddedPDF() {
  const [location, setLocation] = useLocation();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [directPdfUrl, setDirectPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'direct' | 'google'>('direct');
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const params = new URLSearchParams(window.location.search);
      const url = params.get('url');
      
      if (!url) {
        setError('PDF URL was not provided');
        setIsLoading(false);
        return;
      }
      
      console.log('Original URL:', url);
      
      // 개발 환경에서 더 간단한 접근 방식으로 PDF 로드
      // 캐시 버스팅 파라미터 추가
      const timestamp = Date.now();
      const finalUrl = url.includes('?') ? `${url}&t=${timestamp}` : `${url}?t=${timestamp}`;
      
      // 직접 다운로드용 URL 저장
      setDirectPdfUrl(finalUrl);
      
      // 기본적으로 구글 뷰어 사용 (더 안정적인 방식)
      const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
      setPdfUrl(googleDocsViewerUrl);
      setViewMode('google');
      
      // 로딩 완료
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error processing PDF URL:', error);
      setError('An error occurred while loading the PDF');
      setIsLoading(false);
    }
  }, []);
  
  // Open directly in browser
  const openInBrowser = () => {
    if (directPdfUrl) {
      window.open(directPdfUrl, '_blank');
    }
  };
  
  // Download button click
  const handleDownload = () => {
    if (directPdfUrl) {
      const link = document.createElement('a');
      link.href = directPdfUrl;
      link.download = directPdfUrl.split('/').pop() || 'whitepaper.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
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
            {directPdfUrl && (
              <>
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={openInBrowser}
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in New Window
                </Button>
                
                <Button
                  className="bg-gradient-to-r from-[#3A86FF] to-[#FF6F61]/80"
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </>
            )}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg shadow-lg overflow-hidden w-full"
          style={{ height: 'calc(100vh - 150px)' }}
        >
          {error ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <p className="text-red-500 mb-4 text-xl">{error}</p>
              <p className="text-muted-foreground text-sm text-center mb-6">
                There was a problem loading the whitepaper.
              </p>
              
              {directPdfUrl && (
                <div className="flex flex-col gap-4">
                  <Button 
                    className="bg-gradient-to-r from-[#3A86FF] to-[#FF6F61]/80"
                    onClick={openInBrowser}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Directly in New Window
                  </Button>
                </div>
              )}
            </div>
          ) : isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-t-[#3A86FF] border-r-[#FF6F61] border-b-[#3A86FF] border-l-[#FF6F61] rounded-full animate-spin"></div>
                <p className="text-muted-foreground">Loading whitepaper...</p>
              </div>
            </div>
          ) : pdfUrl ? (
            <iframe 
              src={pdfUrl} 
              className="w-full h-full border-0" 
              title="PDF Viewer"
              onError={() => setError('An error occurred while loading the PDF')}
              style={{ backgroundColor: '#f8f9fa' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground">No PDF URL was provided</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}