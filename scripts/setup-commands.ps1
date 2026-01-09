# PowerShell script to link Cursor commands library to your project
# This script creates a symlink from the command library to your project's .cursor/commands folder

$ErrorActionPreference = "Stop"

Write-Host "Cursor Commands Library Setup" -ForegroundColor Green
Write-Host ""

# Get the directory where this script is located
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$LibraryDir = Split-Path -Parent $ScriptDir
$CommandsDir = Join-Path $LibraryDir ".cursor\commands"

# Check if we're in a project directory
$IsProject = (Test-Path "package.json") -or (Test-Path ".git\config")
if (-not $IsProject) {
    Write-Host "Warning: This doesn't look like a project directory." -ForegroundColor Yellow
    Write-Host "   Make sure you're running this from your project root."
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit 1
    }
}

# Check if commands directory exists in library
if (-not (Test-Path $CommandsDir)) {
    Write-Host "Error: Commands directory not found at $CommandsDir" -ForegroundColor Red
    exit 1
}

# Create .cursor directory if it doesn't exist
if (-not (Test-Path ".cursor")) {
    Write-Host "Creating .cursor directory..."
    New-Item -ItemType Directory -Path ".cursor" | Out-Null
}

# Check if .cursor/commands already exists
if (Test-Path ".cursor\commands") {
    $item = Get-Item ".cursor\commands" -ErrorAction SilentlyContinue
    $isSymlink = $item.LinkType -eq "SymbolicLink"
    
    if ($isSymlink) {
        # Already a symlink - ask if they want to keep it or replace
        Write-Host ".cursor/commands is already a symlink" -ForegroundColor Yellow
        $replace = Read-Host "Replace with new symlink? (y/n)"
        if ($replace -eq "y" -or $replace -eq "Y") {
            Remove-Item ".cursor\commands" -Force
            Write-Host "Creating symlink to command library..."
            try {
                New-Item -ItemType SymbolicLink -Path ".cursor\commands" -Target $CommandsDir | Out-Null
            } catch {
                Write-Host "Failed to create symlink. You may need to run PowerShell as Administrator." -ForegroundColor Red
                Write-Host "   Error: $_" -ForegroundColor Red
                exit 1
            }
        } else {
            Write-Host "Keeping existing symlink."
        }
    } else {
        # Directory exists - merge commands instead of replacing
        Write-Host ".cursor/commands already exists with project-specific commands" -ForegroundColor Yellow
        Write-Host "Merging library commands with existing commands..."
        Write-Host "  - Existing commands will be preserved"
        Write-Host "  - Library commands will be added"
        Write-Host "  - Commands with the same name will be replaced with library versions"
        Write-Host ""
        
        # Count existing commands
        $existingCount = (Get-ChildItem ".cursor\commands" -Filter "*.md" -File).Count
        
        # Copy library commands, preserving existing ones that don't conflict
        $libraryCommands = Get-ChildItem $CommandsDir -Filter "*.md" -File
        $added = 0
        $replaced = 0
        $kept = 0
        
        foreach ($libCmd in $libraryCommands) {
            $cmdName = $libCmd.Name
            $projectCmd = Join-Path ".cursor\commands" $cmdName
            
            if (Test-Path $projectCmd) {
                # Command exists - check if it's different
                $libContent = Get-FileHash $libCmd.FullName -Algorithm MD5
                $projContent = Get-FileHash $projectCmd -Algorithm MD5
                
                if ($libContent.Hash -ne $projContent.Hash) {
                    Write-Host "  Replacing: $cmdName (library version)" -ForegroundColor Yellow
                    Copy-Item $libCmd.FullName $projectCmd -Force
                    $replaced++
                } else {
                    Write-Host "  Keeping: $cmdName (identical)" -ForegroundColor Green
                    $kept++
                }
            } else {
                # New command from library
                Write-Host "  Adding: $cmdName" -ForegroundColor Cyan
                Copy-Item $libCmd.FullName $projectCmd
                $added++
            }
        }
        
        # Count final commands
        $finalCount = (Get-ChildItem ".cursor\commands" -Filter "*.md" -File).Count
        $projectOnly = $finalCount - $libraryCommands.Count
        
        Write-Host ""
        Write-Host "Merge complete!" -ForegroundColor Green
        Write-Host "  - Total commands: $finalCount"
        Write-Host "  - Added: $added"
        Write-Host "  - Replaced: $replaced"
        Write-Host "  - Kept (identical): $kept"
        if ($projectOnly -gt 0) {
            Write-Host "  - Project-specific: $projectOnly (preserved)" -ForegroundColor Cyan
        }
        Write-Host ""
        Write-Host "Note: Commands are copied (not symlinked) to preserve project-specific commands."
        Write-Host "To update library commands, run this script again."
    }
} else {
    # No existing directory - try to create symlink
    Write-Host "Creating symlink to command library..."
    try {
        New-Item -ItemType SymbolicLink -Path ".cursor\commands" -Target $CommandsDir | Out-Null
    } catch {
        Write-Host "Failed to create symlink. You may need to run PowerShell as Administrator." -ForegroundColor Red
        Write-Host "   Error: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "Alternative: Copy commands instead of symlinking"
        $copy = Read-Host "Copy commands instead? (y/n)"
        if ($copy -eq "y" -or $copy -eq "Y") {
            New-Item -ItemType Directory -Path ".cursor\commands" | Out-Null
            Copy-Item -Path "$CommandsDir\*" -Destination ".cursor\commands" -Recurse -Force
            Write-Host "Commands copied (not symlinked). Remember to update manually." -ForegroundColor Yellow
        } else {
            exit 1
        }
    }
}

# Add to .gitignore if it doesn't exist
if (-not (Test-Path ".gitignore")) {
    Write-Host "Creating .gitignore..."
    New-Item -ItemType File -Path ".gitignore" | Out-Null
}

# Check if .cursor/commands is already in .gitignore
$gitignoreContent = Get-Content ".gitignore" -ErrorAction SilentlyContinue
if ($gitignoreContent -notcontains ".cursor/commands") {
    Write-Host "Adding .cursor/commands to .gitignore..."
    Add-Content ".gitignore" ""
    Add-Content ".gitignore" "# Cursor commands library (symlinked from external repo)"
    Add-Content ".gitignore" ".cursor/commands"
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your project now has access to the Cursor commands library."
Write-Host "The commands are symlinked from: $CommandsDir"
Write-Host ""
Write-Host "To update commands, pull the latest from the command library repo:"
Write-Host "  cd $LibraryDir; git pull"
Write-Host ""
Write-Host "Commands will be available in Cursor immediately!"

