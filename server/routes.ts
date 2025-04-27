import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from 'ws';
import { storage } from "./storage";

// 관리자 인증 미들웨어
const authenticate = (req: Request, res: Response, next: Function) => {
  // 요청 헤더에서 인증 토큰 확인
  const adminSecret = req.headers['x-admin-secret'];
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ 
      error: '관리자 인증 실패' 
    });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // 기본 API 라우트
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  
  // WalletConnect 지원 엔드포인트
  app.get('/api/wallet-connect/config', (req, res) => {
    res.json({ 
      projectId: process.env.WALLET_CONNECT_PROJECT_ID || 'ce3c8945b428cc57f1c3c0945e0f8d13',
      relayUrl: 'wss://relay.walletconnect.org',
      metadata: {
        name: 'JAVURO',
        description: 'JAVURO Web3 Application',
        url: 'https://javuro.com',
        icons: ['https://javuro.com/favicon.png']
      }
    });
  });
  
  // WalletConnect QR 코드 URI 처리 엔드포인트
  app.post('/api/wallet-connect/uri', (req, res) => {
    try {
      const { uri } = req.body;
      if (!uri) {
        return res.status(400).json({ error: 'URI is required' });
      }
      
      // 실제 환경에서는 세션 저장 등의 처리가 필요할 수 있음
      const sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
      
      res.json({ 
        success: true, 
        sessionId,
        redirectUrl: `/qr-view.html?uri=${encodeURIComponent(uri)}`
      });
    } catch (error) {
      console.error('Error processing WalletConnect URI:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  
  // WebSocket 서버 설정 - WalletConnect와 같은 실시간 통신에 도움
  const wss = new WebSocketServer({ 
    server: httpServer, 
    path: '/ws',
    perMessageDeflate: {
      zlibDeflateOptions: {
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      clientNoContextTakeover: true,
      serverNoContextTakeover: true,
      serverMaxWindowBits: 10,
      concurrencyLimit: 10,
      threshold: 1024
    }
  });
  
  // WalletConnect 관련 세션 저장소 (메모리)
  const walletConnectSessions = new Map();
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');
    const clientId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    
    // 클라이언트 식별자 추가
    (ws as any).clientId = clientId;
    
    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);
        
        // WalletConnect 메시지 처리
        if (data.type === 'walletconnect') {
          if (data.action === 'register_uri') {
            // QR 코드 URI 저장
            walletConnectSessions.set(clientId, {
              uri: data.uri,
              timestamp: Date.now()
            });
            // 성공 응답
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ 
                type: 'walletconnect', 
                status: 'registered',
                sessionId: clientId,
                redirectUrl: `/qr-view.html?uri=${encodeURIComponent(data.uri)}`
              }));
            }
          }
        } else {
          // 일반 메시지 응답
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ status: 'ok', message: 'Message received' }));
          }
        }
      } catch (error) {
        console.error('Error processing message:', error);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ status: 'error', message: 'Failed to process message' }));
        }
      }
    });
    
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
      // 세션 정리
      if ((ws as any).clientId) {
        walletConnectSessions.delete((ws as any).clientId);
      }
    });
    
    // 연결 확인 메시지 전송
    ws.send(JSON.stringify({ type: 'connection', status: 'connected' }));
  });

  return httpServer;
}