#!/bin/bash

# Setup script to link Cursor commands library to your project
# This script creates a symlink from the command library to your project's .cursor/commands folder

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Cursor Commands Library Setup${NC}"
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LIBRARY_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"
COMMANDS_DIR="$LIBRARY_DIR/.cursor/commands"

# Check if we're in a project directory
if [ ! -f "package.json" ] && [ ! -f ".git/config" ]; then
    echo -e "${YELLOW}⚠️  Warning: This doesn't look like a project directory.${NC}"
    echo "   Make sure you're running this from your project root."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if commands directory exists in library
if [ ! -d "$COMMANDS_DIR" ]; then
    echo -e "${RED}❌ Error: Commands directory not found at $COMMANDS_DIR${NC}"
    exit 1
fi

# Create .cursor directory if it doesn't exist
if [ ! -d ".cursor" ]; then
    echo "📁 Creating .cursor directory..."
    mkdir -p .cursor
fi

# Check if .cursor/commands already exists
if [ -L ".cursor/commands" ]; then
    # Already a symlink - ask if they want to keep it or replace
    echo -e "${YELLOW}⚠️  .cursor/commands is already a symlink${NC}"
    read -p "Replace with new symlink? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm .cursor/commands
        echo "🔗 Creating symlink to command library..."
        ln -s "$COMMANDS_DIR" .cursor/commands
    else
        echo "Keeping existing symlink."
    fi
elif [ -d ".cursor/commands" ]; then
    # Directory exists - merge commands instead of replacing
    echo -e "${YELLOW}⚠️  .cursor/commands already exists with project-specific commands${NC}"
    echo "Merging library commands with existing commands..."
    echo "  - Existing commands will be preserved"
    echo "  - Library commands will be added"
    echo "  - Commands with the same name will be replaced with library versions"
    echo ""
    
    # Backup existing commands count
    EXISTING_COUNT=$(find .cursor/commands -maxdepth 1 -name "*.md" | wc -l)
    
    # Copy library commands, but preserve existing ones that don't conflict
    for lib_cmd in "$COMMANDS_DIR"/*.md; do
        if [ -f "$lib_cmd" ]; then
            cmd_name=$(basename "$lib_cmd")
            project_cmd=".cursor/commands/$cmd_name"
            
            if [ -f "$project_cmd" ]; then
                # Command exists - check if it's different
                if ! cmp -s "$lib_cmd" "$project_cmd"; then
                    echo -e "  ${YELLOW}⚠️  Replacing: $cmd_name (library version)${NC}"
                    cp "$lib_cmd" "$project_cmd"
                else
                    echo -e "  ✓ Keeping: $cmd_name (identical)"
                fi
            else
                # New command from library
                echo -e "  ➕ Adding: $cmd_name"
                cp "$lib_cmd" "$project_cmd"
            fi
        fi
    done
    
    # Count final commands
    FINAL_COUNT=$(find .cursor/commands -maxdepth 1 -name "*.md" | wc -l)
    PROJECT_ONLY=$((FINAL_COUNT - $(find "$COMMANDS_DIR" -maxdepth 1 -name "*.md" | wc -l)))
    
    echo ""
    echo -e "${GREEN}✓ Merge complete!${NC}"
    echo "  - Total commands: $FINAL_COUNT"
    if [ $PROJECT_ONLY -gt 0 ]; then
        echo -e "  - Project-specific: $PROJECT_ONLY (preserved)"
    fi
    echo ""
    echo "Note: Commands are copied (not symlinked) to preserve project-specific commands."
    echo "To update library commands, run this script again."
else
    # No existing directory - create symlink
    echo "🔗 Creating symlink to command library..."
    ln -s "$COMMANDS_DIR" .cursor/commands
fi

# Add to .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore..."
    touch .gitignore
fi

# Check if .cursor/commands is already in .gitignore
if ! grep -q "^\.cursor/commands$" .gitignore 2>/dev/null; then
    echo "📝 Adding .cursor/commands to .gitignore..."
    echo "" >> .gitignore
    echo "# Cursor commands library (symlinked from external repo)" >> .gitignore
    echo ".cursor/commands" >> .gitignore
fi

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Your project now has access to the Cursor commands library."
echo "The commands are symlinked from: $COMMANDS_DIR"
echo ""
echo "To update commands, pull the latest from the command library repo:"
echo "  cd $LIBRARY_DIR && git pull"
echo ""
echo "Commands will be available in Cursor immediately!"

