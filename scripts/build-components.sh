#!/bin/bash
# OSLC Component Build Script for Bash
# Builds both components using the workspace setup and copies them to the demo folder

set -e  # Exit on any error

echo "🔨 Building OSLC Components..."

# Navigate to project root
cd "$(dirname "$0")/.."

echo "📦 Installing workspace dependencies..."
npm install

echo "🔨 Building postMessage helper..."
npm run build --workspace=@oslc/postmessage-helper

echo "🔨 Building selection webcomponent..."
npm run build --workspace=@oslc/selection-webcomponent

echo "📋 Copying components to demo..."

# Create vendor directories
VENDOR_BASE="src/oslc-selection-demo/vendor/@oslc"
POSTMSG_TARGET="$VENDOR_BASE/oslc-postmessage-helper"
SELECTION_TARGET="$VENDOR_BASE/oslc-selection-webcomponent"

mkdir -p "$POSTMSG_TARGET"
mkdir -p "$SELECTION_TARGET"

# Copy built distributions
cp -r src/oslc-postmessage-helper/dist/* "$POSTMSG_TARGET/"
cp -r src/oslc-selection-webcomponent/dist/* "$SELECTION_TARGET/"

echo "✅ Build complete! Components are ready in oslc-selection-demo/vendor/"
echo ""
