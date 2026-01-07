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
if [ -d ".cursor/commands" ] || [ -L ".cursor/commands" ]; then
    echo -e "${YELLOW}⚠️  .cursor/commands already exists${NC}"
    read -p "Replace with symlink to command library? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf .cursor/commands
    else
        echo "Aborted."
        exit 1
    fi
fi

# Create symlink
echo "🔗 Creating symlink to command library..."
ln -s "$COMMANDS_DIR" .cursor/commands

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

