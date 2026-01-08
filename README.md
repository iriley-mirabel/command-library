# Cursor Command Library & Workflow Hub

A centralized repository for Cursor IDE slash commands and workflows. This library helps development teams standardize their development practices and share custom commands across projects.

## 📚 What is This?

This repository contains:
- **75+ custom slash commands** for Cursor IDE
- **Workflow chains** that combine multiple commands
- **Discovery tools** to help find the right command
- **A web portal** (coming soon) to browse and search commands

## 🚀 Quick Start

### For Individual Developers

1. **Clone this repository** to a location on your machine:
   ```bash
   git clone https://github.com/iriley-mirabel/command-library.git ~/cursor-commands
   cd ~/cursor-commands
   ```

2. **In each project**, run the setup script:
   ```bash
   # Linux/Mac
   bash ~/cursor-commands/scripts/setup-commands.sh
   ```
   
   ```powershell
   # Windows (PowerShell)
   & "$env:USERPROFILE\cursor-commands\scripts\setup-commands.ps1"
   ```

3. **Daily updates**: Pull the latest commands each morning:
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

### For Teams

1. **One team member** clones and maintains the library repo
2. **All team members** clone it to the same location (e.g., `~/cursor-commands`)
3. **Each project** runs the setup script to link commands
4. **Daily routine**: Pull updates at the start of each day

## 📁 Repository Structure

```
command-library/
├── .cursor/
│   ├── commands/          # All command markdown files
│   │   ├── cleanup-unused-code.md
│   │   ├── fix-import-paths.md
│   │   ├── standardize-page.md
│   │   └── ... (75+ commands)
│   └── .cursorrules       # Master rules file
├── library/               # Source files for web portal (coming soon)
├── scripts/               # Setup and update scripts
│   ├── setup-commands.sh
│   ├── setup-commands.ps1
│   ├── update-commands.sh
│   └── update-commands.ps1
├── app/                   # Next.js web portal (coming soon)
└── README.md
```

## 🔧 How It Works

### Integration Methods

#### Method 1: Symlink (Recommended)
The setup script creates a symlink from your project's `.cursor/commands/` to the library. This means:
- ✅ Updates are automatic (just pull the library repo)
- ✅ No duplication
- ✅ Always in sync

**Note**: On Windows, symlinks require admin privileges. The script will offer to copy instead if symlink fails.

#### Method 2: Copy
If symlinks aren't available, the script can copy commands instead. You'll need to re-run setup when commands are updated.

### Keeping Commands Separate

The setup script automatically adds `.cursor/commands` to your project's `.gitignore`. This ensures:
- ✅ Commands stay in the library repo (not in each project)
- ✅ Each project references the same source
- ✅ No conflicts between projects

## 📖 Available Commands

### Most Used Commands

| Command | Purpose | Time |
|---------|---------|------|
| `/cleanup-unused-code` | Remove unused code/logs | 1-2m |
| `/fix-import-paths` | Fix & sort imports | 1m |
| `/standardize-page` | Full page refactor | 5-10m |
| `/test-page-quick` | Smoke test | 2m |
| `/pre-commit-checklist` | Quality check before PR | 3-5m |
| `/pr-ready` | Generate PR description | 2m |

### Command Categories

- **Code Quality & Cleanup**: `/cleanup-unused-code`, `/fix-import-paths`, `/fix-spacing-layout`
- **UI Components**: `/fix-filter-bar`, `/fix-data-table`, `/fix-form-fields`
- **Testing**: `/test-page-quick`, `/test-pages`, `/debug-failing-page`
- **Workflows**: `/standardize-page`, `/pre-commit-checklist`, `/daily-cleanup`
- **Discovery**: `/find-command`, `/suggest-command`

See [masterlistreference.txt](./masterlistreference.txt) for the complete reference.

## 🔄 Daily Workflow

### Start of Day
```bash
# 1. Update commands library
cd ~/cursor-commands
git pull

# 2. In your project, verify everything works
# (Commands are automatically updated if using symlinks)
```

### During Development
- Use commands as needed: `/cleanup-unused-code`, `/fix-import-paths`, etc.
- Use workflows for complex tasks: `/standardize-page`, `/pre-commit-checklist`

### End of Day / Before Commits
```bash
# Run pre-commit checklist
/pre-commit-checklist [your-changes-path]
```

## 🤝 Contributing

### Adding New Commands

1. **Create the command file** in `.cursor/commands/`:
   ```bash
   # Example: .cursor/commands/my-new-command.md
   # /my-new-command
   
   Description of what this command does.
   
   ## Instructions
   - Step 1
   - Step 2
   ```

2. **Test it** in a project
3. **Commit and push** to the library repo
4. **Team members pull** to get the update

### Updating Existing Commands

1. Edit the command file in `.cursor/commands/`
2. Test the changes
3. Commit and push
4. Team members pull updates

### Workflow

```bash
# 1. Make your changes
cd ~/cursor-commands
# Edit command files...

# 2. Commit
git add .
git commit -m "Add new command: /my-command"
git push

# 3. Team members pull
git pull
```

## 📝 Best Practices

### For Command Library Maintainers

- ✅ Keep commands focused and atomic
- ✅ Document usage clearly
- ✅ Test commands before committing
- ✅ Use clear, descriptive names
- ✅ Group related commands

### For Developers Using Commands

- ✅ Pull updates daily
- ✅ Use `/find-command` to discover commands
- ✅ Run `/pre-commit-checklist` before commits
- ✅ Contribute improvements back to the library

## 🌐 Web Portal

The Next.js web portal is now live! Browse, search, and explore commands in a beautiful dark-mode interface.

**Features:**
- 🔍 Search and filter commands
- 📱 Responsive design
- 📋 Copy commands to clipboard
- 🎨 Dark mode theme
- ⚡ Fast static site

**Running locally:**
```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

**Deploy to Vercel:** Push to GitHub and import the `app` directory on Vercel.

## 🚧 Future Enhancements

- [ ] Download all commands as ZIP file
- [ ] Usage analytics and tracking
- [ ] Command ratings/favorites
- [ ] Command versioning

## 📄 License

This command library is for internal team use. Commands are shared to standardize development practices.

## 🆘 Troubleshooting

### Commands not showing in Cursor

1. **Check symlink**: Make sure `.cursor/commands` exists and points to the library
2. **Restart Cursor**: Sometimes Cursor needs a restart to pick up new commands
3. **Check path**: Verify the symlink target is correct

### Symlink failed on Windows

- Run PowerShell as Administrator, or
- Use the copy method (you'll need to re-run setup when commands update)

### Commands out of date

```bash
cd ~/cursor-commands
git pull
```

If using symlinks, commands update automatically. If using copies, re-run the setup script.

## 📞 Support

For questions or issues:
1. Check the [masterlistreference.txt](./masterlistreference.txt) for command documentation
2. Use `/find-command` in Cursor to search for commands
3. Open an issue in this repository

---

**Happy coding! 🚀**

