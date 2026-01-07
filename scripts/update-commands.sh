#!/bin/bash

# Update script to pull latest commands from the library repo
# Run this daily to get the latest commands

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🔄 Updating Cursor Commands Library${NC}"
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LIBRARY_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

cd "$LIBRARY_DIR"

# Check if this is a git repo
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  This doesn't appear to be a git repository.${NC}"
    echo "   Make sure you've cloned the command library repo."
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest commands..."
git pull origin main || git pull origin master

echo ""
echo -e "${GREEN}✅ Commands updated!${NC}"
echo ""
echo "If you're using symlinks, your projects will automatically have the latest commands."
echo "If you copied commands, you'll need to run the setup script again in each project."

