# Windows PowerShell Setup Guide

A step-by-step guide for Windows users to set up the Cursor Command Library.

## 🎯 Understanding the Setup

**Key Concept:** You clone the library ONCE to your machine, then link it to EACH project separately.

```
Your Machine:
├── C:\Users\YourName\cursor-commands\    ← Clone ONCE here
│   ├── .cursor\commands\                  ← Source commands (20+ files)
│   └── scripts\
│       └── setup-commands.ps1
│
└── Your Projects:
    ├── Project-A\                         ← Run setup script here
    │   └── .cursor\commands\              ← Links to cursor-commands
    │
    ├── Project-B\                         ← Run setup script here
    │   └── .cursor\commands\              ← Links to cursor-commands
    │
    └── Project-C\                          ← No setup = no commands
```

## 📋 Step-by-Step Instructions

### Step 1: Clone the Library (Do This Once)

Open PowerShell and run:

```powershell
# Clone to your user directory
git clone https://github.com/iriley-mirabel/command-library.git $env:USERPROFILE\cursor-commands
```

This creates: `C:\Users\YourName\cursor-commands\`

**Verify it worked:**
```powershell
cd $env:USERPROFILE\cursor-commands
dir
```

You should see folders like `.cursor`, `scripts`, etc.

### Step 2: Set Up in Your First Project

Navigate to your project and run the setup script:

```powershell
# Navigate to your project
cd C:\Projects-AICodeAssistants\Classified-01

# Run the setup script
& "$env:USERPROFILE\cursor-commands\scripts\setup-commands.ps1"
```

**What happens:**
1. Script creates `.cursor\commands\` folder in your project
2. Creates a symlink (or copy) pointing to the library
3. Adds `.cursor\commands` to your `.gitignore`
4. Commands are now available in Cursor IDE!

### Step 3: Repeat for Other Projects

For each additional project:

```powershell
# Navigate to the project
cd C:\Projects-AICodeAssistants\AnotherProject

# Run the same setup script
& "$env:USERPROFILE\cursor-commands\scripts\setup-commands.ps1"
```

Each project gets its own `.cursor\commands\` folder that links to the same library.

## 🔄 Daily Updates

**Once per day**, pull the latest commands:

```powershell
cd $env:USERPROFILE\cursor-commands
git pull
```

**If using symlinks:** All projects automatically get the updates! ✅  
**If using copies:** You'll need to re-run setup in each project.

## ⚠️ Common Issues & Solutions

### Issue: "Missing closing '}'" Error

**Solution:** The script has been fixed. Make sure you have the latest version:
```powershell
cd $env:USERPROFILE\cursor-commands
git pull
```

### Issue: Symlink Creation Failed

**Error:** "Failed to create symlink. You may need to run PowerShell as Administrator."

**Solution:** The script will offer to copy instead. Type `y` to copy the commands. You'll need to re-run setup when commands update.

**Alternative:** Run PowerShell as Administrator:
1. Right-click PowerShell
2. Select "Run as Administrator"
3. Navigate to your project and run the script again

### Issue: "Commands directory not found"

**Error:** "Error: Commands directory not found at..."

**Solution:** Make sure you cloned the repository correctly:
```powershell
# Check if the library exists
Test-Path "$env:USERPROFILE\cursor-commands\.cursor\commands"

# If false, re-clone:
cd $env:USERPROFILE
Remove-Item -Recurse -Force cursor-commands -ErrorAction SilentlyContinue
git clone https://github.com/iriley-mirabel/command-library.git cursor-commands
```

### Issue: Commands Not Showing in Cursor

**Checklist:**
1. ✅ `.cursor\commands\` exists in your project
2. ✅ Restart Cursor IDE (close and reopen)
3. ✅ Open Composer (Ctrl+I) and type `/`
4. ✅ Verify symlink/copy was created correctly

**Verify symlink:**
```powershell
# In your project directory
Get-Item .cursor\commands | Select-Object Target, LinkType
```

## 📝 Quick Reference

### Clone Library (Once)
```powershell
git clone https://github.com/iriley-mirabel/command-library.git $env:USERPROFILE\cursor-commands
```

### Setup in Project
```powershell
cd C:\Your\Project\Path
& "$env:USERPROFILE\cursor-commands\scripts\setup-commands.ps1"
```

### Daily Update
```powershell
cd $env:USERPROFILE\cursor-commands
git pull
```

### Verify Setup
```powershell
# Check if .cursor/commands exists
Test-Path .cursor\commands

# Check if it's in .gitignore
Select-String -Path .gitignore -Pattern "\.cursor/commands"
```

## ✅ Success Checklist

After setup, verify:

- [ ] Library cloned to `$env:USERPROFILE\cursor-commands`
- [ ] `.cursor\commands\` exists in your project
- [ ] `.cursor\commands` is in `.gitignore`
- [ ] Commands appear in Cursor IDE (type `/` in Composer)
- [ ] Can pull updates from library repo

## 🆘 Still Having Issues?

1. **Check the script path:**
   ```powershell
   Test-Path "$env:USERPROFILE\cursor-commands\scripts\setup-commands.ps1"
   ```

2. **Check PowerShell execution policy:**
   ```powershell
   Get-ExecutionPolicy
   ```
   If it's "Restricted", you may need to allow scripts:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Read the full documentation:**
   - [INSTALLATION.md](./INSTALLATION.md) - Detailed installation guide
   - [README.md](./README.md) - General overview
   - [GITIGNORE_STRATEGY.md](./GITIGNORE_STRATEGY.md) - Git setup explained

---

**You're all set!** The commands should now be available in Cursor IDE. 🎉
