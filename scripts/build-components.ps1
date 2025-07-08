#!/usr/bin/env pwsh
# OSLC Component Build Script for PowerShell 7
# Builds both components using the workspace setup and copies them to the demo folder

Write-Host "🔨 Building OSLC Components..." -ForegroundColor Cyan

# Navigate to project root
$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location $projectRoot

try {
    Write-Host "📦 Installing workspace dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to install workspace dependencies"
    }
    
    Write-Host "🔨 Building postMessage helper..." -ForegroundColor Yellow
    npm run build --workspace=@oslc/postmessage-helper
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to build postMessage helper"
    }
    
    Write-Host "🔨 Building selection webcomponent..." -ForegroundColor Yellow
    npm run build --workspace=@oslc/selection-webcomponent
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to build selection webcomponent"
    }
    
    Write-Host "📋 Copying components to demo..." -ForegroundColor Green
    
    # Create vendor directories
    $vendorBase = "src/oslc-selection-demo/vendor/@oslc"
    $postmsgTarget = "$vendorBase/oslc-postmessage-helper"
    $selectionTarget = "$vendorBase/oslc-selection-webcomponent"
    
    New-Item -ItemType Directory -Path $postmsgTarget -Force | Out-Null
    New-Item -ItemType Directory -Path $selectionTarget -Force | Out-Null
    
    # Copy built distributions
    Copy-Item -Path "src/oslc-postmessage-helper/dist/*" -Destination $postmsgTarget -Recurse -Force
    Copy-Item -Path "src/oslc-selection-webcomponent/dist/*" -Destination $selectionTarget -Recurse -Force
    
    Write-Host "✅ Build complete! Components are ready in oslc-selection-demo/vendor/" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Starting demo server..." -ForegroundColor Cyan
    
    # Navigate to demo directory and start server
    Push-Location "src/oslc-selection-demo"
    Write-Host "Starting server in $(Get-Location)..." -ForegroundColor Yellow
    Write-Host "Demo will be available at http://localhost:3000" -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    
    npx serve . --listen 3000
    
} catch {
    Write-Host "❌ Build failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔍 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Make sure Node.js 22+ and npm are installed" -ForegroundColor White
    Write-Host "  2. Check that package.json files exist in component directories" -ForegroundColor White
    Write-Host "  3. Verify workspace is properly configured" -ForegroundColor White
    exit 1
} finally {
    Pop-Location
}

if ($Host.Name -eq "ConsoleHost") {
    Write-Host "Press any key to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
