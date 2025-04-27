// Netlify Function for WalletConnect relay support
export async function handler(event, context) {
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // CORS preflight 처리
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }
  
  // POST 요청 처리 (QR 코드 URI 저장)
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      
      if (!body.uri) {
        return {
          statusCode: 400,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            error: 'Missing WalletConnect URI' 
          })
        };
      }
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: true,
          session_id: Date.now().toString(36) + Math.random().toString(36).substring(2)
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: 'Internal Server Error',
          message: error.message
        })
      };
    }
  }
  
  // 기본 응답
  return {
    statusCode: 200,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'WalletConnect relay ready',
      project_id: process.env.WALLET_CONNECT_PROJECT_ID || 'ce3c8945b428cc57f1c3c0945e0f8d13'
    })
  };
}