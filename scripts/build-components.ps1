#!/usr/bin/env pwsh
# OSLC Component Build Script for PowerShell 7
# Builds both the postMessage helper and selection webcomponent
# and copies them to the demo folder

Write-Host "🔨 Building OSLC Components..." -ForegroundColor Cyan

# Navigate to script directory

function Build-Component {
    param(
        [string]$ComponentPath,
        [string]$ComponentName
    )
    
    Write-Host "📦 Installing dependencies for $ComponentName..." -ForegroundColor Yellow
    Push-Location "$PSScriptRoot/../src/$ComponentPath"
    
    if (-not (Test-Path "node_modules")) {
        npm install
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to install dependencies for $ComponentName"
        }
    }
    
    Write-Host "🔨 Building $ComponentName..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to build $ComponentName"
    }
    
    if (-not (Test-Path "dist")) {
        throw "Build succeeded but no dist folder found for $ComponentName"
    }
    
    Write-Host "� Packing $ComponentName for local use..." -ForegroundColor Green
    npm pack
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to pack $ComponentName"
    }
    
    Write-Host "�📋 Copying $ComponentName to demo..." -ForegroundColor Green
    $vendorPath = "../oslc-selection-demo/vendor/@oslc"
    $targetPath = "$vendorPath/$ComponentPath"
    
    # Create vendor directory if it doesn't exist
    if (-not (Test-Path $vendorPath)) {
        New-Item -ItemType Directory -Path $vendorPath -Force | Out-Null
    }
    
    # Remove existing target directory if it exists
    if (Test-Path $targetPath) {
        Remove-Item -Path $targetPath -Recurse -Force
    }
    
    # Copy dist folder to target
    Copy-Item -Path "dist" -Destination $targetPath -Recurse -Force

    Pop-Location
}

function Install-LocalDependency {
    param(
        [string]$DependentPath,
        [string]$DependencyPath,
        [string]$PackageName
    )
    
    Write-Host "🔗 Installing local dependency $PackageName in $DependentPath..." -ForegroundColor Cyan
    
    # Get the packed tarball name
    Push-Location "$PSScriptRoot/../src/$DependencyPath"
    $tarballFiles = Get-ChildItem -Filter "*.tgz"
    if ($tarballFiles.Count -eq 0) {
        throw "No tarball found for $PackageName"
    }
    $tarballPath = $tarballFiles[0].FullName
    
    # Install in dependent project
    Set-Location "../$DependentPath"
    npm install $tarballPath
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to install local dependency $PackageName"
    }
    
    Pop-Location
}

try {
    # Build postMessage helper first
    Build-Component -ComponentPath "oslc-postmessage-helper" -ComponentName "postMessage helper"
    
    # Install postMessage helper as dependency for webcomponent
    Install-LocalDependency -DependentPath "oslc-selection-webcomponent" -DependencyPath "oslc-postmessage-helper" -PackageName "@oslc/postmessage-helper"
    
    # Build selection webcomponent
    Build-Component -ComponentPath "oslc-selection-webcomponent" -ComponentName "selection webcomponent"
    
    Write-Host "✅ Build complete! Components are ready in oslc-selection-demo/vendor/" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 To run the demo:" -ForegroundColor Cyan
    Write-Host "   cd ../src/oslc-selection-demo" -ForegroundColor White
    Write-Host "   python -m http.server 8080" -ForegroundColor White
    Write-Host "   # or" -ForegroundColor Gray
    Write-Host "   npx serve ." -ForegroundColor White
    Write-Host ""
    Write-Host "Then open http://localhost:8080" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Build failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔍 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Make sure Node.js and npm are installed" -ForegroundColor White
    Write-Host "  2. Check that package.json files exist in component directories" -ForegroundColor White
    Write-Host "  3. Verify TypeScript and Rollup dependencies are available" -ForegroundColor White
    exit 1
}

if ($Host.Name -eq "ConsoleHost") {
    Write-Host "Press any key to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
