# .gitignore Strategy for Command Library

This document explains how to keep the Cursor command library separate from your project code using `.gitignore`.

## 🎯 The Problem

You want to:
- ✅ Use the same commands across multiple projects
- ✅ Keep commands in a central repository
- ✅ Avoid committing commands to each project repo
- ✅ Allow easy updates without conflicts

## ✅ The Solution

Use `.gitignore` to exclude `.cursor/commands/` from each project repository while keeping it in the command library repository.

## 📋 How It Works

### In the Command Library Repository

The command library repository **DOES track** `.cursor/commands/`:

```
command-library/          # ← This repo
├── .cursor/
│   ├── commands/         # ← Tracked in git
│   │   ├── cleanup-unused-code.md
│   │   └── ...
│   └── .cursorrules      # ← Tracked in git
└── .gitignore            # ← Does NOT ignore .cursor/commands
```

### In Your Project Repositories

Each project repository **DOES NOT track** `.cursor/commands/`:

```
your-project/             # ← Your project repo
├── .cursor/
│   ├── commands/         # ← NOT tracked (symlinked/copied)
│   └── .cursorrules      # ← Tracked (if project-specific)
├── .gitignore            # ← Includes .cursor/commands
└── src/                  # ← Your project code
```

## 🔧 Setup Process

### Step 1: Setup Script Adds to .gitignore

When you run the setup script, it automatically adds:

```gitignore
# Cursor commands library (symlinked from external repo)
.cursor/commands
```

### Step 2: Verify .gitignore

After setup, check your `.gitignore`:

```bash
cat .gitignore | grep "\.cursor/commands"
```

You should see `.cursor/commands` listed.

### Step 3: Verify Git Status

Check that commands are ignored:

```bash
git status
```

You should **NOT** see `.cursor/commands/` in the output.

## 🚫 What Gets Ignored

### Ignored (Not Committed)
- ✅ `.cursor/commands/` - All command files
- ✅ `.cursor/commands/*.md` - Individual command files

### Not Ignored (Can Be Committed)
- ❌ `.cursor/.cursorrules` - Your project-specific rules (if you have them)
- ❌ `.cursor/` directory itself (if it contains other files)

## ✅ What This Achieves

### 1. Commands Stay in Library Repo
- Commands are only committed to the command library repository
- Each project references the library (via symlink or copy)
- No duplication across project repos

### 2. No Conflicts
- Multiple projects can use the same commands
- Updates happen in one place (the library)
- No merge conflicts in project repos

### 3. Clean Project Repos
- Project repos only contain project-specific code
- Commands are "external" dependencies
- Clear separation of concerns

## 🔄 Update Workflow

### When Commands Are Updated

1. **Update the library:**
   ```bash
   cd ~/cursor-commands
   git pull
   ```

2. **If using symlinks:** Commands automatically update in all projects ✅

3. **If using copies:** Re-run setup in each project:
   ```bash
   cd ~/projects/my-project
   bash ~/cursor-commands/scripts/setup-commands.sh
   ```

### Git Status After Updates

```bash
# In your project
git status
# Should NOT show .cursor/commands/ changes
```

## 🛠️ Manual Setup

If you need to manually add to `.gitignore`:

```gitignore
# Add this line to your project's .gitignore
.cursor/commands
```

**Important:** Use `.cursor/commands` (not `.cursor/commands/` or `**/.cursor/commands`) to match the exact directory.

## ⚠️ Common Issues

### Issue: Commands Show Up in Git Status

**Problem:** `.cursor/commands/` appears in `git status`

**Solution:**
1. Check `.gitignore` includes `.cursor/commands`
2. If commands were already tracked, remove them:
   ```bash
   git rm -r --cached .cursor/commands
   git commit -m "Remove commands from tracking"
   ```

### Issue: .cursorrules Is Ignored

**Problem:** You want to track `.cursor/.cursorrules` but it's being ignored

**Solution:**
- `.cursorrules` should NOT be ignored
- Only `.cursor/commands` is ignored
- If `.cursorrules` is ignored, check your `.gitignore` patterns

### Issue: Can't Find .gitignore

**Problem:** Project doesn't have a `.gitignore`

**Solution:**
- The setup script creates one if it doesn't exist
- Or create manually:
  ```bash
  echo ".cursor/commands" >> .gitignore
  ```

## 📝 Best Practices

### ✅ DO

- Keep `.cursor/commands` in `.gitignore` in all project repos
- Commit `.cursor/commands` in the library repo
- Use symlinks when possible (automatic updates)
- Pull library updates daily

### ❌ DON'T

- Don't commit `.cursor/commands/` to project repos
- Don't remove `.cursor/commands` from `.gitignore`
- Don't manually edit commands in project repos (edit in library)
- Don't create project-specific commands in `.cursor/commands/` (use library)

## 🔍 Verification

### Check What's Ignored

```bash
# See ignored files
git status --ignored

# Should show .cursor/commands/ in the ignored list
```

### Check What's Tracked

```bash
# See what git is tracking
git ls-files | grep "\.cursor"

# Should NOT show .cursor/commands/
# May show .cursor/.cursorrules if you have one
```

## 📚 Related Documentation

- [README.md](./README.md) - General overview
- [INSTALLATION.md](./INSTALLATION.md) - Installation guide
- [masterlistreference.txt](./masterlistreference.txt) - Command reference

---

**Summary:** Use `.gitignore` to exclude `.cursor/commands/` from project repos while keeping it in the library repo. This ensures commands are centralized, shareable, and easy to update.

