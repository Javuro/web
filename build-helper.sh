#!/bin/bash

# Netlify 배포를 위한 헬퍼 스크립트

echo "Running build helper script for Netlify deployment..."

# _redirects 파일 복사
echo "Copying _redirects file to dist/public directory..."
cp client/public/_redirects dist/public/

# index.html 확인 및 복사
if [ ! -f "dist/public/index.html" ]; then
  echo "Copying index.html to dist/public directory..."
  cp client/index.html dist/public/
fi

# 필요한 assets 폴더 확인
if [ ! -d "dist/public/assets" ] && [ -d "client/public/assets" ]; then
  echo "Copying assets folder..."
  cp -r client/public/assets dist/public/
fi

# docs 폴더 확인
if [ -d "client/public/docs" ]; then
  echo "Ensuring docs folder is available..."
  mkdir -p dist/public/docs
  cp -r client/public/docs/* dist/public/docs/
fi

echo "Build helper completed successfully!"