#!/bin/bash

# Netlify 배포를 위한 헬퍼 스크립트

echo "Running build helper script for Netlify deployment..."

# _redirects 및 _headers 파일 복사
echo "Copying _redirects and _headers files to dist/public directory..."
cp client/public/_redirects dist/public/ 2>/dev/null || echo "No _redirects file found"
cp client/public/_headers dist/public/ || echo "Creating _headers file..."

# _headers 파일이 없는 경우 생성
if [ ! -f "dist/public/_headers" ]; then
  echo "Creating _headers file with CSP settings..."
  cat > dist/public/_headers << EOL
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src * data: blob:; connect-src *; frame-src *;
EOL
fi

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

# WalletConnect 관련 파일 확인 및 추가 
echo "Setting up WalletConnect files for mobile support..."

# WalletConnect iframe 관련 파일 추가
mkdir -p dist/public/walletconnect
cat > dist/public/walletconnect/index.html << EOL
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WalletConnect Bridge</title>
  <script>
    window.parent.postMessage({ type: 'walletconnect-ready' }, '*');
  </script>
</head>
<body>
  <div id="walletconnect-wrapper"></div>
  <script src="https://unpkg.com/@walletconnect/web3-provider@1.8.0/dist/umd/index.min.js"></script>
</body>
</html>
EOL

# WalletConnect 리디렉트 파일 추가
cat > dist/public/wc-redirect.html << EOL
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JAVURO - WalletConnect</title>
  <script>
    // Extract URI from URL
    function getWalletConnectUri() {
      const search = window.location.search;
      if (search && search.startsWith('?uri=')) {
        return decodeURIComponent(search.substring(5));
      }
      return null;
    }
    
    window.onload = function() {
      const uri = getWalletConnectUri();
      if (uri) {
        // Mobile OS 감지
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // iOS 디바이스 감지
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          window.location.href = uri;
        } 
        // Android 디바이스 감지
        else if (/android/i.test(userAgent)) {
          window.location.href = uri;
        }
        // 기타 모바일 디바이스
        else {
          document.getElementById('qrcode').src = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(uri);
          document.getElementById('qrContainer').style.display = 'flex';
          document.getElementById('uriText').textContent = uri;
        }
      } else {
        document.getElementById('error').style.display = 'block';
      }
    }
  </script>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #121212;
      color: white;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      max-width: 500px;
      text-align: center;
      padding: 20px;
    }
    h1 {
      color: #3A86FF;
    }
    .qr-container {
      display: none;
      flex-direction: column;
      align-items: center;
      margin: 20px 0;
      background-color: white;
      padding: 20px;
      border-radius: 12px;
    }
    .qr-container img {
      max-width: 250px;
      margin-bottom: 20px;
    }
    .uri-text {
      word-break: break-all;
      margin-top: 10px;
      font-size: 12px;
      color: #333;
      padding: 8px;
      background: #f1f1f1;
      border-radius: 4px;
      max-width: 100%;
      overflow-x: auto;
    }
    .error {
      display: none;
      color: #FF6F61;
      margin-top: 20px;
    }
    .button {
      background-color: #3A86FF;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 20px;
      font-weight: bold;
    }
    .button:hover {
      background-color: #2a75e8;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>JAVURO WalletConnect</h1>
    <p>지갑 앱을 열어 QR 코드를 스캔하세요</p>
    
    <div id="qrContainer" class="qr-container">
      <img id="qrcode" src="" alt="WalletConnect QR Code" />
      <div>QR 코드를 스캔하거나 아래 URI를 복사하세요:</div>
      <div id="uriText" class="uri-text"></div>
    </div>
    
    <div id="error" class="error">
      <p>WalletConnect URI를 찾을 수 없습니다. 다시 시도해주세요.</p>
    </div>
    
    <button class="button" onclick="window.location.href='/'">돌아가기</button>
  </div>
</body>
</html>
EOL

echo "WalletConnect support files added."
echo "Build helper completed successfully!"