#!/bin/bash

# Netlify 배포를 위한 헬퍼 스크립트

echo "Running build helper script for Netlify deployment..."

# _redirects 파일 복사
echo "Copying _redirects file to dist directory..."
cp client/public/_redirects dist/

# index.html 확인 및 복사
if [ ! -f "dist/index.html" ]; then
  echo "Copying index.html to dist directory..."
  cp client/index.html dist/
fi

# 필요한 assets 폴더 확인
if [ ! -d "dist/assets" ] && [ -d "client/public/assets" ]; then
  echo "Copying assets folder..."
  cp -r client/public/assets dist/
fi

# docs 폴더 확인
if [ -d "client/public/docs" ]; then
  echo "Ensuring docs folder is available..."
  mkdir -p dist/docs
  cp -r client/public/docs/* dist/docs/
fi

echo "Build helper completed successfully!"