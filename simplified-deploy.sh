#!/bin/bash

# Exit on error
set -e

echo "Starting simplified deployment preparation..."

# Create deployment directory
rm -rf deploy-package
mkdir -p deploy-package

# Copy necessary files
echo "Copying essential project files..."
cp -r client deploy-package/
cp -r server deploy-package/
cp -r shared deploy-package/
cp -r functions deploy-package/
cp package.json package-lock.json vite.config.ts tsconfig.json deploy-package/
cp tailwind.config.ts postcss.config.js deploy-package/
cp .env.production deploy-package/.env
cp netlify.toml deploy-package/

# Remove unnecessary files to reduce size
echo "Optimizing package size..."
find deploy-package -name "node_modules" -type d -exec rm -rf {} +
find deploy-package -name ".git" -type d -exec rm -rf {} +

echo "Deployment package created successfully in deploy-package directory"
echo "To use this package for deployment, transfer the entire 'deploy-package' directory to your hosting service."