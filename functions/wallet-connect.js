/**
 * Netlify Serverless Function for WalletConnect Support
 * 
 * 이 함수는 배포 환경에서 WebSocket 프록시 역할을 합니다.
 * - WalletConnect URI 처리 및 QR 코드 생성 로직 지원
 * - JAVURO 웹사이트와 모바일 앱 간의 통신 연결
 */

// 메모리 캐시로 WalletConnect 세션 관리
const walletConnectSessions = new Map();

// 세션 ID 생성 유틸리티
const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// 클라이언트에 CORS 헤더와 함께 응답 전송
const sendResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
};

// WalletConnect URI 저장 및 세션 관리
const storeWalletConnectURI = (uri) => {
  const sessionId = generateSessionId();
  walletConnectSessions.set(sessionId, {
    uri,
    timestamp: Date.now()
  });
  
  // 30분 후 세션 자동 삭제 (메모리 관리)
  setTimeout(() => {
    walletConnectSessions.delete(sessionId);
  }, 30 * 60 * 1000);
  
  return {
    sessionId,
    uri,
    redirectUrl: `/qr-view.html?uri=${encodeURIComponent(uri)}`
  };
};

// WalletConnect URI 검색
const getWalletConnectURI = (sessionId) => {
  if (!sessionId) return null;
  
  const session = walletConnectSessions.get(sessionId);
  if (!session) return null;
  
  return session.uri;
};

// 라우터 핸들러 - 요청 경로에 따라 다른 함수 호출
const router = {
  'POST /register': async (event) => {
    try {
      const { uri } = JSON.parse(event.body);
      
      if (!uri || !uri.startsWith('wc:')) {
        return sendResponse(400, { status: 'error', message: 'Invalid URI format' });
      }
      
      const result = storeWalletConnectURI(uri);
      return sendResponse(200, { status: 'success', ...result });
    } catch (error) {
      console.error('Error registering URI:', error);
      return sendResponse(500, { status: 'error', message: 'Server error' });
    }
  },
  
  'GET /session': async (event) => {
    try {
      const { sessionId } = event.queryStringParameters || {};
      
      if (!sessionId) {
        return sendResponse(400, { status: 'error', message: 'Session ID is required' });
      }
      
      const uri = getWalletConnectURI(sessionId);
      
      if (!uri) {
        return sendResponse(404, { status: 'error', message: 'Session not found' });
      }
      
      return sendResponse(200, { status: 'success', uri });
    } catch (error) {
      console.error('Error fetching session:', error);
      return sendResponse(500, { status: 'error', message: 'Server error' });
    }
  }
};

// 메인 핸들러 함수
export async function handler(event, context) {
  try {
    // OPTIONS 요청 처리 (CORS preflight)
    if (event.httpMethod === 'OPTIONS') {
      return sendResponse(200, {});
    }
    
    // 요청 경로에 맞는 핸들러 찾기
    const routeKey = `${event.httpMethod} ${event.path.replace('/.netlify/functions/wallet-connect', '')}`;
    const routeHandler = router[routeKey];
    
    // 라우트 핸들러가 있으면 실행
    if (routeHandler) {
      return await routeHandler(event);
    }
    
    // 기본 응답 (루트 경로)
    if (event.httpMethod === 'GET' && (event.path === '/.netlify/functions/wallet-connect' || event.path === '/wallet-connect')) {
      return sendResponse(200, { 
        status: 'success', 
        message: 'JAVURO WalletConnect Service',
        time: new Date().toISOString() 
      });
    }
    
    // 알 수 없는 경로
    return sendResponse(404, { status: 'error', message: 'Route not found' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return sendResponse(500, { status: 'error', message: 'Unexpected server error' });
  }
}