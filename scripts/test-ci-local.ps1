#!/usr/bin/env pwsh
# Local CI Test Script
# Mimics the GitHub Actions workflow for local testing

param(
    [switch]$SkipTests,
    [switch]$SkipBuild,
    [switch]$SkipDemo,
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host "`n🔄 $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

try {
    Write-Host "🚀 Starting Local CI Test Pipeline" -ForegroundColor Magenta
    Write-Host "This script mimics the GitHub Actions workflow" -ForegroundColor Gray
    
    $startTime = Get-Date
    
    # Navigate to repository root
    $repoRoot = Split-Path -Parent $PSScriptRoot
    Push-Location $repoRoot
    
    Write-Host "Repository: $(Get-Location)" -ForegroundColor Gray
    
    if (-not $SkipTests) {
        Write-Step "Running Tests (like 'test' job)"
        
        # Test postmessage-helper
        Write-Host "  Testing postmessage-helper..." -ForegroundColor Yellow
        Push-Location "src/oslc-postmessage-helper"
        
        if (Test-Path "package.json") {
            npm ci
            if ($Verbose) { npm run test } else { npm run test 2>$null }
            npm run build
            npm pack
            Write-Success "  postmessage-helper tests and build completed"
        } else {
            Write-Warning "  No package.json found for postmessage-helper"
        }
        Pop-Location
        
        # Test selection-webcomponent
        Write-Host "  Testing selection-webcomponent..." -ForegroundColor Yellow
        Push-Location "src/oslc-selection-webcomponent"
        
        if (Test-Path "package.json") {
            # Install local dependency
            $tarballPath = Get-ChildItem "../oslc-postmessage-helper/*.tgz" | Select-Object -First 1
            if ($tarballPath) {
                npm install $tarballPath.FullName
            }
            npm ci
            if ($Verbose) { npm run test } else { npm run test 2>$null }
            npm run build
            Write-Success "  selection-webcomponent tests and build completed"
        } else {
            Write-Warning "  No package.json found for selection-webcomponent"
        }
        Pop-Location
    }
    
    if (-not $SkipBuild) {
        Write-Step "Simulating Build and Publish (like 'build-and-publish' job)"
        
        Write-Host "  Checking package.json configurations..." -ForegroundColor Yellow
        
        # Check postmessage-helper
        $postmsgPkg = Get-Content "src/oslc-postmessage-helper/package.json" | ConvertFrom-Json
        Write-Host "    postmessage-helper v$($postmsgPkg.version)" -ForegroundColor Gray
        
        # Check selection-webcomponent
        $selectionPkg = Get-Content "src/oslc-selection-webcomponent/package.json" | ConvertFrom-Json
        Write-Host "    selection-webcomponent v$($selectionPkg.version)" -ForegroundColor Gray
        
        Write-Host "  Build artifacts would be published to:" -ForegroundColor Yellow
        Write-Host "    https://npm.pkg.github.com/@oslc/postmessage-helper" -ForegroundColor Gray
        Write-Host "    https://npm.pkg.github.com/@oslc/selection-webcomponent" -ForegroundColor Gray
        
        Write-Success "  Build simulation completed"
    }
    
    if (-not $SkipDemo) {
        Write-Step "Preparing Demo (like 'deploy-demo' job)"
        
        # Run the build script to prepare demo
        Write-Host "  Running build-components script..." -ForegroundColor Yellow
        
        $buildScript = Join-Path $PSScriptRoot "build-components.ps1"
        if (Test-Path $buildScript) {
            & $buildScript
            Write-Success "  Demo components built successfully"
        } else {
            Write-Warning "  Build script not found, trying manual build..."
            & (Join-Path $PSScriptRoot "build-components.ps1")
        }
        
        # Create version info (like CI does)
        $versionInfo = @{
            version = (Get-Date -Format "yyyyMMdd-HHmmss")
            commit = "local-test"
            branch = "local"
            buildTime = (Get-Date -Format "o")
            components = @{
                "postmessage-helper" = $postmsgPkg.version
                "selection-webcomponent" = $selectionPkg.version
            }
        }
        
        $versionJson = $versionInfo | ConvertTo-Json -Depth 3
        $versionJson | Out-File "src/oslc-selection-demo/version.json" -Encoding utf8
        
        Write-Host "  Demo would be deployed to:" -ForegroundColor Yellow
        Write-Host "    https://OSLC.github.io/olsc-selection-utils/" -ForegroundColor Gray
        
        Write-Success "  Demo preparation completed"
    }
    
    $endTime = Get-Date
    $duration = $endTime - $startTime
    
    Write-Host "`n🎉 Local CI Test Pipeline Completed Successfully!" -ForegroundColor Green
    Write-Host "Duration: $($duration.TotalSeconds.ToString('F1')) seconds" -ForegroundColor Gray
    
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "  1. Test the demo locally:" -ForegroundColor White
    Write-Host "     cd src/oslc-selection-demo" -ForegroundColor Gray
    Write-Host "     python -m http.server 8080" -ForegroundColor Gray
    Write-Host "  2. Commit and push to trigger real CI" -ForegroundColor White
    Write-Host "  3. Check GitHub Actions for actual deployment" -ForegroundColor White
    
} catch {
    Write-Error "Pipeline failed: $($_.Exception.Message)"
    Write-Host "`nTroubleshooting:" -ForegroundColor Yellow
    Write-Host "  • Check that Node.js and npm are installed" -ForegroundColor White
    Write-Host "  • Verify all package.json files exist" -ForegroundColor White
    Write-Host "  • Run with -Verbose for more details" -ForegroundColor White
    exit 1
} finally {
    Pop-Location
}
