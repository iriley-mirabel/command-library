# PowerShell script to link Cursor commands library to your project
# This script creates a symlink from the command library to your project's .cursor/commands folder

$ErrorActionPreference = "Stop"

Write-Host "🚀 Cursor Commands Library Setup" -ForegroundColor Green
Write-Host ""

# Get the directory where this script is located
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$LibraryDir = Split-Path -Parent $ScriptDir
$CommandsDir = Join-Path $LibraryDir ".cursor\commands"

# Check if we're in a project directory
$IsProject = (Test-Path "package.json") -or (Test-Path ".git\config")
if (-not $IsProject) {
    Write-Host "⚠️  Warning: This doesn't look like a project directory." -ForegroundColor Yellow
    Write-Host "   Make sure you're running this from your project root."
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit 1
    }
}

# Check if commands directory exists in library
if (-not (Test-Path $CommandsDir)) {
    Write-Host "❌ Error: Commands directory not found at $CommandsDir" -ForegroundColor Red
    exit 1
}

# Create .cursor directory if it doesn't exist
if (-not (Test-Path ".cursor")) {
    Write-Host "📁 Creating .cursor directory..."
    New-Item -ItemType Directory -Path ".cursor" | Out-Null
}

# Check if .cursor/commands already exists
if (Test-Path ".cursor\commands") {
    Write-Host "⚠️  .cursor/commands already exists" -ForegroundColor Yellow
    $replace = Read-Host "Replace with symlink to command library? (y/n)"
    if ($replace -eq "y" -or $replace -eq "Y") {
        Remove-Item ".cursor\commands" -Recurse -Force
    } else {
        Write-Host "Aborted."
        exit 1
    }
}

# Create symlink (requires admin on Windows)
Write-Host "🔗 Creating symlink to command library..."
try {
    New-Item -ItemType SymbolicLink -Path ".cursor\commands" -Target $CommandsDir | Out-Null
} catch {
    Write-Host "❌ Failed to create symlink. You may need to run PowerShell as Administrator." -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative: Copy commands instead of symlinking"
    $copy = Read-Host "Copy commands instead? (y/n)"
    if ($copy -eq "y" -or $copy -eq "Y") {
        Copy-Item -Path $CommandsDir -Destination ".cursor\commands" -Recurse
        Write-Host "✅ Commands copied (not symlinked). Remember to update manually." -ForegroundColor Yellow
    } else {
        exit 1
    }
}

# Add to .gitignore if it doesn't exist
if (-not (Test-Path ".gitignore")) {
    Write-Host "📝 Creating .gitignore..."
    New-Item -ItemType File -Path ".gitignore" | Out-Null
}

# Check if .cursor/commands is already in .gitignore
$gitignoreContent = Get-Content ".gitignore" -ErrorAction SilentlyContinue
if ($gitignoreContent -notcontains ".cursor/commands") {
    Write-Host "📝 Adding .cursor/commands to .gitignore..."
    Add-Content ".gitignore" ""
    Add-Content ".gitignore" "# Cursor commands library (symlinked from external repo)"
    Add-Content ".gitignore" ".cursor/commands"
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your project now has access to the Cursor commands library."
Write-Host "The commands are symlinked from: $CommandsDir"
Write-Host ""
Write-Host "To update commands, pull the latest from the command library repo:"
Write-Host "  cd $LibraryDir; git pull"
Write-Host ""
Write-Host "Commands will be available in Cursor immediately!"

