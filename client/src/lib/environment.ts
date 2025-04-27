// 환경 설정 관련 유틸리티

// 현재 환경이 프로덕션인지 확인
export const isProduction = import.meta.env.PROD;

// 현재 환경이 개발인지 확인
export const isDevelopment = import.meta.env.DEV;

// API 기본 URL
export const apiBaseUrl = import.meta.env.VITE_API_URL || '';

// WalletConnect 프로젝트 ID
export const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '';

// 현재 환경에 맞는 설정 가져오기
export const getEnvironmentConfig = () => {
  return {
    apiBaseUrl,
    isProduction,
    isDevelopment,
    walletConnectProjectId,
    // 여기에 추가 환경 설정 변수 추가
  };
};

// 로깅 유틸리티 - 개발환경에서만 콘솔에 출력
export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args);
    }
  },
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  }
};