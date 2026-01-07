# PowerShell script to pull latest commands from the library repo
# Run this daily to get the latest commands

$ErrorActionPreference = "Stop"

Write-Host "🔄 Updating Cursor Commands Library" -ForegroundColor Green
Write-Host ""

# Get the directory where this script is located
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$LibraryDir = Split-Path -Parent $ScriptDir

Set-Location $LibraryDir

# Check if this is a git repo
if (-not (Test-Path ".git")) {
    Write-Host "⚠️  This doesn't appear to be a git repository." -ForegroundColor Yellow
    Write-Host "   Make sure you've cloned the command library repo."
    exit 1
}

# Pull latest changes
Write-Host "📥 Pulling latest commands..."
try {
    git pull origin main
} catch {
    try {
        git pull origin master
    } catch {
        Write-Host "❌ Failed to pull. Make sure you have a remote configured." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Commands updated!" -ForegroundColor Green
Write-Host ""
Write-Host "If you're using symlinks, your projects will automatically have the latest commands."
Write-Host "If you copied commands, you'll need to run the setup script again in each project."

