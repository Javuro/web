/**
 * Netlify Serverless Function for WalletConnect Support
 * 
 * 이 함수는 배포 환경에서 WalletConnect 지원을 위한 서버리스 솔루션입니다.
 * - WalletConnect URI 처리 및 저장
 * - OAuth 연결 대체를 위한 간단한 ID 기반 세션 관리 
 * - 테스트 환경과 프로덕션 환경 간 일관된 경험 제공
 */

// 메모리 캐시로 WalletConnect 세션 관리
// 주의: 서버리스 함수에서는 이 변수가 매 실행마다 초기화됩니다
// 영구적인 데이터 저장이 필요한 경우 DynamoDB 같은 데이터베이스를 고려하세요
let walletConnectSessions = new Map();

// 미리 정의된 테스트 URI (실제 URI가 없는 경우 폴백)
const FALLBACK_TEST_WALLETCONNECT_URI = "wc:7f6e504bfida4412a5aaaa6acb1c79fd7a8b265831a22fd3b24a0d824438ad89@2?relay-protocol=irn&symKey=e2fc583a5c0f8c6d3fe9d92182a979b887cff132d09745d017f36e9314858e36";

// 프로젝트 ID와 앱 정보
const PROJECT_ID = process.env.WALLET_CONNECT_PROJECT_ID || "ce3c8945b428cc57f1c3c0945e0f8d13";
const APP_DOMAIN = process.env.APP_DOMAIN || "javuro.com";

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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '2592000',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
};

// WebSocket 응답을 모방한 객체
const mockWebSocketResponse = (data) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Wallet-Connect': 'true'
    },
    body: JSON.stringify(data)
  };
};

// WalletConnect URI 저장 및 세션 관리
const storeWalletConnectURI = (uri) => {
  const sessionId = generateSessionId();
  
  // 세션 저장
  const session = {
    uri: uri || FALLBACK_TEST_WALLETCONNECT_URI,
    timestamp: Date.now(),
    status: 'active'
  };
  
  walletConnectSessions.set(sessionId, session);
  
  console.log(`Stored new WalletConnect session: ${sessionId}`);
  
  return {
    sessionId,
    uri: session.uri,
    redirectUrl: `/qr-view.html?uri=${encodeURIComponent(session.uri)}`
  };
};

// WalletConnect URI 검색
const getWalletConnectURI = (sessionId) => {
  if (!sessionId) return null;
  
  // 메모리 세션 확인
  const session = walletConnectSessions.get(sessionId);
  if (session) {
    return session.uri;
  }
  
  // 세션을 찾을 수 없는 경우 폴백 URI 반환
  return FALLBACK_TEST_WALLETCONNECT_URI;
};

// 라우터 핸들러 - 요청 경로에 따라 다른 함수 호출
const router = {
  // WebSocket처럼 작동하도록 설계된 엔드포인트
  'GET /': async (event) => {
    try {
      // WebSocket 연결 성공 모방
      return mockWebSocketResponse({
        type: "connection",
        status: "connected",
        uri: FALLBACK_TEST_WALLETCONNECT_URI
      });
    } catch (error) {
      console.error('WebSocket simulation error:', error);
      return sendResponse(500, { status: 'error', message: 'Server error' });
    }
  },
  
  // URI 등록 엔드포인트
  'POST /register': async (event) => {
    try {
      let uri;
      
      try {
        const body = JSON.parse(event.body);
        uri = body.uri;
      } catch (e) {
        uri = FALLBACK_TEST_WALLETCONNECT_URI;
      }
      
      const result = storeWalletConnectURI(uri);
      return sendResponse(200, { 
        status: 'success', 
        ...result 
      });
    } catch (error) {
      console.error('Error registering URI:', error);
      return sendResponse(500, { status: 'error', message: 'Server error' });
    }
  },
  
  // 세션 조회 엔드포인트
  'GET /session': async (event) => {
    try {
      const { sessionId } = event.queryStringParameters || {};
      
      if (!sessionId) {
        return sendResponse(400, { status: 'error', message: 'Session ID is required' });
      }
      
      const uri = getWalletConnectURI(sessionId);
      
      return sendResponse(200, { 
        status: 'success', 
        uri,
        projectId: PROJECT_ID,
        domain: APP_DOMAIN
      });
    } catch (error) {
      console.error('Error fetching session:', error);
      return sendResponse(500, { status: 'error', message: 'Server error' });
    }
  }
};

// 메인 핸들러 함수
export async function handler(event, context) {
  try {
    // 요청 정보 로깅 (디버깅용)
    console.log('Request received:', {
      method: event.httpMethod,
      path: event.path,
      headers: event.headers,
      ip: event.headers['x-forwarded-for'] || event.headers['client-ip'],
      userAgent: event.headers['user-agent']
    });
    
    // OPTIONS 요청 처리 (CORS preflight)
    if (event.httpMethod === 'OPTIONS') {
      return sendResponse(200, {});
    }
    
    // 요청 경로 정규화
    let normalizedPath = event.path
      .replace('/.netlify/functions/wallet-connect', '')
      .replace('/wallet-connect', '');
    
    if (normalizedPath === '') normalizedPath = '/';
    
    // 요청 경로에 맞는 핸들러 찾기
    const routeKey = `${event.httpMethod} ${normalizedPath}`;
    const routeHandler = router[routeKey];
    
    // 라우트 핸들러가 있으면 실행
    if (routeHandler) {
      return await routeHandler(event);
    }
    
    // 알 수 없는 경로이지만 WebSocket 연결 요청으로 간주하고 폴백 처리
    // WebSocket 연결 응답으로 폴백 URI 반환
    return mockWebSocketResponse({
      type: "connection",
      status: "connected",
      uri: FALLBACK_TEST_WALLETCONNECT_URI,
      note: "Fallback URI provided for compatibility. This is a serverless function simulating WebSocket behavior."
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return sendResponse(500, { 
      status: 'error', 
      message: 'Unexpected server error',
      error: error.message
    });
  }
}