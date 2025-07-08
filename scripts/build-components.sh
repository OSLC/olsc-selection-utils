#!/bin/bash

# OSLC Component Build Script
# Builds both the postMessage helper and selection webcomponent
# and copies them to the demo folder

set -e  # Exit on any error

echo "🔨 Building OSLC Components..."

# Navigate to project root
cd "$(dirname "$0")/.."

echo "📦 Installing dependencies for postMessage helper..."
cd src/oslc-postmessage-helper
npm install

echo "🔨 Building postMessage helper..."
npm run build

echo "📋 Copying postMessage helper to demo..."
mkdir -p ../oslc-selection-demo/vendor/@oslc
cp -r dist ../oslc-selection-demo/vendor/@oslc/postmessage-helper

echo "📦 Installing dependencies for selection webcomponent..."
cd ../oslc-selection-webcomponent
npm install

echo "🔨 Building selection webcomponent..."
npm run build

echo "📋 Copying selection webcomponent to demo..."
mkdir -p ../oslc-selection-demo/vendor/@oslc
cp -r dist ../oslc-selection-demo/vendor/@oslc/selection-webcomponent

echo "✅ Build complete! Components are ready in oslc-selection-demo/vendor/"
echo ""
echo "🌐 To run the demo:"
echo "   cd src/oslc-selection-demo"
echo "   python -m http.server 8080"
echo "   # or"
echo "   npx serve ."
echo ""
echo "Then open http://localhost:8080"
