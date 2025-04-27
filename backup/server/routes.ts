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

  const httpServer = createServer(app);
  
  // WebSocket 서버 설정 - WalletConnect와 같은 실시간 통신에 도움
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');
    
    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);
        
        // 클라이언트에 응답
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ status: 'ok', message: 'Message received' }));
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
    
    // 연결 확인 메시지 전송
    ws.send(JSON.stringify({ type: 'connection', status: 'connected' }));
  });

  return httpServer;
}