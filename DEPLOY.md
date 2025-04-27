# JAVURO 배포 가이드

## 배포 준비

1. 전체 프로젝트를 GitHub 저장소에 푸시하세요.
2. 백서 파일이 `client/public/docs/` 경로에 있는지 확인하세요.

## Netlify 배포 방법

### 1. 새 사이트 배포하기

1. Netlify에 로그인하고 "Add new site" > "Import an existing project" 선택
2. 프로젝트를 담고 있는 GitHub 저장소를 선택
3. 다음 배포 설정을 구성:
   - Build command: `npm run build`
   - Publish directory: `client/dist`

### 2. 환경 변수 설정

다음 환경 변수를 Netlify 사이트 대시보드의 "Site settings" > "Environment variables"에서 설정:

- `VITE_WALLET_CONNECT_PROJECT_ID`: WalletConnect 프로젝트 ID

### 3. 배포 확인

1. 배포가 완료되면 제공된 URL에서 사이트를 확인할 수 있습니다.
2. 모든 기능이 제대로 작동하는지 테스트하세요.

### 4. 커스텀 도메인 설정 (선택사항)

1. Netlify 대시보드에서 "Domain settings" 선택
2. "Add custom domain"을 클릭하고 "javuro.com" 입력
3. DNS 설정 지침에 따라 도메인 제공업체에서 DNS 레코드를 업데이트

## 문제 해결

- 배포 문제가 발생하면 Netlify 대시보드의 "Deploys" 탭에서 빌드 로그를 확인하세요.
- 자바스크립트 콘솔 오류를 확인하여 클라이언트 측 문제를 파악하세요.
- 환경 변수가 올바르게 설정되었는지 다시 확인하세요.
