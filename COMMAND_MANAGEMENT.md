# Command Management Workflow

This document explains how to maintain, update, archive, and create commands in the Cursor Command Library.

## 📁 Directory Structure

```
.cursor/
├── commands/              # Active commands (used by Cursor IDE)
│   ├── cleanup-unused-code.md
│   ├── fix-import-paths.md
│   └── ...
├── commands/archive/      # Archived/deprecated commands
│   └── README.md          # Archive documentation
└── .cursorrules           # Master rules file

library/
└── commands-index.json    # Index of all commands (includes archived list)
```

## 🔄 Workflow Overview

### Adding a New Command

1. **Create the command file** in `.cursor/commands/`
2. **Update `library/commands-index.json`** - Add to appropriate category
3. **Test the command** in a real project
4. **Create a PR** - GitHub Actions will validate automatically
5. **Merge** - Command becomes available to all team members

### Updating an Existing Command

1. **Edit the command file** in `.cursor/commands/`
2. **Test changes** in a project
3. **Commit with descriptive message**: `Update: command-name - improved instructions`
4. **Create PR** or push directly (if you have permissions)
5. **GitHub Actions validates** the changes

### Archiving a Command

1. **Move file** to archive: `git mv .cursor/commands/old.md .cursor/commands/archive/old.md`
2. **Update `library/commands-index.json`**:
   - Remove from category's `commands` array
   - Add to `archived` array
3. **Add archive note** to the file (optional but recommended)
4. **Commit**: `Archive: old-command (replaced by new-command)`

### Restoring an Archived Command

1. **Move file back**: `git mv .cursor/commands/archive/old.md .cursor/commands/old.md`
2. **Update `library/commands-index.json`**:
   - Remove from `archived` array
   - Add back to category's `commands` array
3. **Commit**: `Restore: old-command`

## ✅ Validation

GitHub Actions automatically validates:

- ✅ All commands in index.json have corresponding files
- ✅ All archived commands are in archive directory
- ✅ Command files have required sections (Purpose, Usage, Speed, When to use)
- ✅ Command files follow naming convention (`# /command-name`)
- ✅ No duplicate commands in index
- ✅ JSON structure is valid

## 📋 Command File Format

Every command file must include:

```markdown
# /command-name

Brief description of what this command does.

## Purpose
What problem does this solve?

## Usage
`/command-name [optional-args]`

## Speed
Fast (30s - 2min) | Moderate (2-5min) | Slow (5-10min)

## When to use
When should developers use this command?

## Instructions
- Step 1
- Step 2
- Step 3
```

## 🔍 Index File Structure

`library/commands-index.json` structure:

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024",
  "totalCommands": 20,
  "archived": ["old-command-1", "deprecated-command"],
  "categories": {
    "category-key": {
      "name": "Category Display Name",
      "commands": ["command-slug-1", "command-slug-2"]
    }
  },
  "mostUsed": ["command-1", "command-2"],
  "aliases": {
    "alias": "full-command-name"
  }
}
```

## 🌐 Web Portal Integration

- **Active commands**: Automatically appear in the web portal
- **Archived commands**: Excluded from web portal (not shown)
- **Auto-sync**: Commands sync to web portal on Amplify deployment
- **Index-based**: Web portal uses `commands-index.json` to determine which commands to show

## 👥 Team Collaboration

### For Team Members

1. **Clone the repo** to your local machine
2. **Create a branch** for your changes
3. **Make changes** (add/update/archive commands)
4. **Test locally** in a project
5. **Create PR** - Team reviews and validates
6. **Merge** - Changes available to everyone

### For Maintainers

1. **Review PRs** - Check changes make sense
2. **Validate** - GitHub Actions runs automatically
3. **Test** - Verify commands work in real projects
4. **Merge** - Deploy to team

## 🚀 Deployment

### Local Development

Commands are available immediately after:
1. Cloning the repo
2. Running setup script in a project
3. Commands appear in Cursor IDE

### Web Portal

Web portal updates automatically:
1. Commands are copied to `app/web-portal/public/commands/` during Amplify build
2. Archived commands are excluded
3. Index file determines which commands to display
4. No manual sync needed

## 📝 Best Practices

1. **Always update index.json** when adding/archiving commands
2. **Use descriptive commit messages**: `Add: command-name` or `Archive: old-command`
3. **Test commands** before submitting PRs
4. **Follow the template** for consistency
5. **Archive instead of delete** - Keep history for reference
6. **Document why** when archiving (in commit message or file)

## 🔗 Related Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Detailed contribution guide
- [README.md](./README.md) - General documentation
- [AMPLIFY_SETUP.md](./AMPLIFY_SETUP.md) - Web portal deployment
