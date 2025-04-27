import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Web3Provider } from "@/lib/web3/context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Download from "@/pages/download";
import Community from "@/pages/community";
import Token from "@/pages/token";
import MyPage from "@/pages/mypage";
import About from "@/pages/about";
import Rewards from "@/pages/rewards";
import Disclaimer from "@/pages/disclaimer";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Whitepaper from "@/pages/whitepaper";
import ViewPDF from "@/pages/view-pdf";
import EmbeddedPDF from "@/pages/embedded-pdf";
import TestWallet from "@/pages/test-wallet";
import AdminPanel from "@/pages/admin/index";
import AdminPosts from "@/pages/admin/posts";
import Header from "@/components/layout/header";
import Footer from "@/components/landing/footer";
import ScrollToTop from "@/components/layout/scroll-to-top";
import { useEffect } from "react";

function Router() {
  useEffect(() => {
    // WebSocket 연결은 브라우저 환경에서만 실행
    if (typeof window === 'undefined') return;

    // WebSocket 연결 설정
    const setupWebSocketConnection = () => {
      try {
        // 배포용으로 WebSocket 비활성화 (Netlify에서는 WebSocket 지원 없음)
        if (import.meta.env.PROD) {
          console.log('WebSocket 연결이 프로덕션 환경에서 비활성화되었습니다');
          return () => {}; // 빈 클린업 함수 반환
        }
        
        // 개발 모드에서만 WebSocket 연결 시도
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws`;
        
        console.log('Connecting to WebSocket server at:', wsUrl);
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
        
        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          // 에러가 발생하면 재연결 시도하지 않음
        };
        
        socket.onclose = (event) => {
          console.log('WebSocket connection closed:', event.code, event.reason);
          // 재연결 시도하지 않음 (에러 발생 방지)
        };
        
        // 컴포넌트 언마운트 시 연결 해제
        return () => {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
          }
        };
      } catch (error) {
        console.error('Error setting up WebSocket:', error);
        return () => {}; // 빈 클린업 함수 반환
      }
    };
    
    // WebSocket 연결 시작
    const cleanup = setupWebSocketConnection();
    
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScrollToTop />
      <main className="flex-grow pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/download" component={Download} />
          <Route path="/community" component={Community} />
          <Route path="/token" component={Token} />
          <Route path="/rewards" component={Rewards} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/whitepaper" component={Whitepaper} />
          <Route path="/view-pdf" component={ViewPDF} />
          <Route path="/embedded-pdf" component={EmbeddedPDF} />
          <Route path="/test-wallet" component={TestWallet} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/admin/posts" component={AdminPosts} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <Router />
        <Toaster />
      </Web3Provider>
    </QueryClientProvider>
  );
}

export default App;