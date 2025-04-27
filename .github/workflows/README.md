# GitHub Actions 워크플로우 가이드

## 개요

이 폴더에는 JAVURO 프로젝트의 자동화된 배포 및 테스트를 위한 GitHub Actions 워크플로우 설정이 포함되어 있습니다.

## 사용 가능한 워크플로우

1. **Netlify 배포** (`netlify-deploy.yml`)
   - `main` 브랜치에 푸시할 때마다 자동으로 실행
   - 수동으로도 실행 가능 (GitHub 저장소의 Actions 탭에서)
   - 프로젝트를 빌드하고 Netlify에 배포합니다

## Netlify 배포 워크플로우 사용 방법

### 필수 환경 변수

이 워크플로우를 사용하려면 GitHub 저장소 설정의 Secrets에 다음 값을 설정해야 합니다:

1. `NETLIFY_AUTH_TOKEN`: Netlify 계정의 개인 액세스 토큰
2. `NETLIFY_SITE_ID`: 배포할 Netlify 사이트의 ID
3. `WALLET_CONNECT_PROJECT_ID`: WalletConnect 프로젝트 ID

### 환경 변수 설정 방법

1. GitHub 저장소 페이지에서 "Settings" 탭으로 이동
2. 좌측 메뉴에서 "Secrets and variables" > "Actions" 선택
3. "New repository secret" 버튼을 클릭하여 각 시크릿을 추가

### 수동으로 배포 트리거하기

1. GitHub 저장소 페이지에서 "Actions" 탭으로 이동
2. 좌측에서 "Deploy to Netlify" 워크플로우 선택
3. "Run workflow" 버튼 클릭
4. 필요한 경우 브랜치 선택
5. "Run workflow" 버튼 클릭하여 배포 시작

## 배포 설정 사용자 정의

워크플로우 설정은 `.github/workflows/netlify-deploy.yml` 파일을 수정하여 사용자 정의할 수 있습니다:

- 빌드 설정 변경
- 추가 환경 변수 설정
- 배포 전 추가 테스트 단계 추가
- 알림 설정 (Slack, 이메일 등)