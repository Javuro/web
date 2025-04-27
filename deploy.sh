#!/bin/bash

# JAVURO 배포 스크립트
# 이 스크립트는 Netlify 수동 배포를 위한 빌드 및 배포 준비를 수행합니다.

echo "JAVURO 배포 준비 시작..."

# 1. 필요한 디렉토리 생성
echo "배포 디렉토리 생성 중..."
mkdir -p dist/public/docs

# 2. 빌드 실행
echo "프로젝트 빌드 중..."
VITE_WALLET_CONNECT_PROJECT_ID=ce3c8945b428cc57f1c3c0945e0f8d13 VITE_BUILD_TIME=$(date +%s) npm run build

# 3. 문서 파일 복사
echo "백서 문서 파일 복사 중..."
if [ -d "client/public/docs" ]; then
  find client/public/docs -name "*.pdf" -exec cp -f {} dist/public/docs/ \;
  echo "PDF 파일 복사 완료: $(find dist/public/docs -name "*.pdf" | wc -l) 파일"
else
  echo "경고: client/public/docs 디렉토리를 찾을 수 없습니다."
fi

# 4. Netlify 설정 확인
echo "Netlify 설정 확인 중..."
if [ -f netlify.toml ]; then
  echo "netlify.toml 파일이 루트 디렉토리에 있습니다."
else
  echo "오류: netlify.toml 파일을 찾을 수 없습니다."
  exit 1
fi

echo "배포 준비 완료! 다음 단계:"
echo "1. Netlify 사이트에 로그인하세요."
echo "2. 'Sites' > 'javuro' > 'Deploys' > 'Deploy manually' 메뉴로 이동하세요."
echo "3. dist/public 폴더를 업로드하세요."
echo ""
echo "파일 경로: $(pwd)/dist/public"