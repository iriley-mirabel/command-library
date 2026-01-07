# Installation Guide

This guide explains how to integrate the Cursor Command Library into your projects while keeping it separate from your project code.

## 🎯 Overview

The command library is designed to be:
- **Centralized**: One source of truth for all commands
- **Shared**: All team members use the same commands
- **Separate**: Commands don't clutter your project repos
- **Updatable**: Pull updates daily to get new commands

## 📋 Prerequisites

- Git installed
- Cursor IDE installed
- Access to the command library repository

## 🚀 Installation Steps

### Step 1: Clone the Command Library

Clone the repository to a standard location on your machine:

```bash
# Recommended location (Linux/Mac)
git clone https://github.com/iriley-mirabel/command-library.git ~/cursor-commands

# Or Windows (PowerShell)
git clone https://github.com/iriley-mirabel/command-library.git $env:USERPROFILE\cursor-commands
```

**Why a standard location?**
- Makes it easy to find and update
- Allows multiple projects to reference the same source
- Simplifies the setup process

### Step 2: Set Up in Your Project

Navigate to your project directory and run the setup script:

```bash
# Linux/Mac
bash ~/cursor-commands/scripts/setup-commands.sh

# Windows (PowerShell)
~/$env:USERPROFILE/cursor-commands/scripts/setup-commands.ps1
```

**What the script does:**
1. Creates `.cursor/commands/` directory in your project
2. Creates a symlink (or copy) to the command library
3. Adds `.cursor/commands` to your `.gitignore`
4. Verifies the setup

### Step 3: Verify Installation

1. Open your project in Cursor IDE
2. Open Composer (Cmd+I / Ctrl+I)
3. Type `/` to see available commands
4. You should see commands like `/cleanup-unused-code`, `/fix-import-paths`, etc.

## 🔄 Daily Update Routine

### Start of Each Day

```bash
# Navigate to command library
cd ~/cursor-commands  # or $env:USERPROFILE\cursor-commands on Windows

# Pull latest updates
git pull

# If using symlinks, commands are automatically updated in all projects!
# If using copies, you'll need to re-run setup in each project
```

### Automated Update Script

You can also use the update script:

```bash
# Linux/Mac
bash ~/cursor-commands/scripts/update-commands.sh

# Windows (PowerShell)
~/$env:USERPROFILE/cursor-commands/scripts/update-commands.ps1
```

## 🔧 Integration Methods

### Method 1: Symlink (Recommended)

**Pros:**
- ✅ Automatic updates (just pull the library)
- ✅ No duplication
- ✅ Always in sync

**Cons:**
- ⚠️ Requires symlink support (admin on Windows)

**How it works:**
The setup script creates a symbolic link from your project's `.cursor/commands/` to the library's `.cursor/commands/` directory. When you pull updates to the library, all projects automatically get the new commands.

### Method 2: Copy

**Pros:**
- ✅ Works everywhere
- ✅ No special permissions needed

**Cons:**
- ⚠️ Need to re-run setup when commands update
- ⚠️ Commands can get out of sync

**When to use:**
- If symlinks aren't available
- If you prefer explicit control over updates

## 🚫 Keeping Commands Separate

### How .gitignore Works

The setup script automatically adds `.cursor/commands` to your project's `.gitignore`. This ensures:

1. **Commands stay in the library repo** - Not committed to each project
2. **No conflicts** - Each project references the same source
3. **Clean project repos** - Only project-specific code is tracked

### Your Project's .gitignore

After running setup, your `.gitignore` will include:

```gitignore
# Cursor commands library (symlinked from external repo)
.cursor/commands
```

**Important:** Don't remove this line! It keeps commands separate from your project code.

### What Gets Ignored

- ✅ `.cursor/commands/` - The symlinked/copied commands
- ❌ `.cursor/.cursorrules` - Your project-specific rules (if you have them)

## 📁 Directory Structure

After setup, your project will look like:

```
your-project/
├── .cursor/
│   ├── commands/          # ← Symlinked to ~/cursor-commands/.cursor/commands/
│   └── .cursorrules        # Your project rules (optional)
├── .gitignore             # Includes .cursor/commands
├── src/
└── ...
```

The `commands/` directory is a symlink (or copy) pointing to the library.

## 🔍 Troubleshooting

### Commands Not Showing in Cursor

1. **Check the symlink/copy exists:**
   ```bash
   ls -la .cursor/commands  # Linux/Mac
   dir .cursor\commands      # Windows
   ```

2. **Restart Cursor IDE** - Sometimes needed to pick up new commands

3. **Verify the path:**
   - Symlink should point to your library location
   - Copy should contain the `.md` files

### Symlink Failed on Windows

**Option 1: Run as Administrator**
- Right-click PowerShell
- Select "Run as Administrator"
- Run the setup script again

**Option 2: Use Copy Method**
- The script will offer to copy instead
- You'll need to re-run setup when commands update

### Commands Out of Date

```bash
# Update the library
cd ~/cursor-commands
git pull

# If using symlinks, you're done!
# If using copies, re-run setup in each project
```

### Multiple Projects

Each project needs its own setup. The symlink/copy is per-project, but all point to the same library source.

```bash
# Project 1
cd ~/projects/project-1
bash ~/cursor-commands/scripts/setup-commands.sh

# Project 2
cd ~/projects/project-2
bash ~/cursor-commands/scripts/setup-commands.sh

# Both now use the same library source!
```

## ✅ Verification Checklist

After installation, verify:

- [ ] `.cursor/commands/` exists in your project
- [ ] Commands appear when typing `/` in Cursor Composer
- [ ] `.cursor/commands` is in `.gitignore`
- [ ] Can pull updates from the library repo
- [ ] Commands work (try `/test-page-quick`)

## 🆘 Need Help?

1. Check the [README.md](./README.md) for general information
2. Review [masterlistreference.txt](./masterlistreference.txt) for command documentation
3. Use `/find-command` in Cursor to search for commands
4. Open an issue in the repository

---

**Happy coding! 🚀**

