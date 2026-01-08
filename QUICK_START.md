# Quick Start Guide

Get up and running with the Cursor Command Library in 5 minutes.

## 🚀 Installation (5 Steps)

### 1. Clone the Library (ONCE on your machine)
```bash
# Linux/Mac
git clone https://github.com/iriley-mirabel/command-library.git ~/cursor-commands
```

```powershell
# Windows (PowerShell)
git clone https://github.com/iriley-mirabel/command-library.git $env:USERPROFILE\cursor-commands
```

**Important:** Clone this ONCE to your machine (not in a project). This creates a shared library that all your projects will reference.

### 2. Navigate to Your Project
```bash
# Linux/Mac
cd ~/your-project
```

```powershell
# Windows (PowerShell)
cd C:\Projects-AICodeAssistants\YourProject
```

### 3. Run Setup Script (in EACH project)
```bash
# Linux/Mac
bash ~/cursor-commands/scripts/setup-commands.sh
```

```powershell
# Windows (PowerShell)
& "$env:USERPROFILE\cursor-commands\scripts\setup-commands.ps1"
```

**What this does:** Creates `.cursor/commands/` in THIS project and links it to the shared library.

### 4. Restart Cursor IDE
Close and reopen Cursor to load the commands.

### 5. Test It
Open Cursor Composer (Cmd+I / Ctrl+I) and type `/` to see available commands.

## ✅ Verify It Works

Try a command:
```
/cleanup-unused-code
```

If you see the command execute, you're all set! 🎉

## 🔄 Daily Routine

**Start of each day:**
```bash
# Linux/Mac
cd ~/cursor-commands
git pull
```

```powershell
# Windows (PowerShell)
cd $env:USERPROFILE\cursor-commands
git pull
```

That's it! If using symlinks, commands update automatically in all projects.

## 📚 Next Steps

- Read [README.md](./README.md) for full documentation
- Check [INSTALLATION.md](./INSTALLATION.md) for detailed setup
- Browse [masterlistreference.txt](./masterlistreference.txt) for all commands

## 🆘 Troubleshooting

**Commands not showing?**
- Restart Cursor IDE
- Check `.cursor/commands/` exists in your project
- Verify symlink/copy was created

**Need help?**
- See [INSTALLATION.md](./INSTALLATION.md) for detailed troubleshooting
- Check [GITIGNORE_STRATEGY.md](./GITIGNORE_STRATEGY.md) for git setup

---

**That's it! You're ready to use the command library.** 🚀

