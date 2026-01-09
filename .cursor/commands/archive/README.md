# Archived Commands

This directory contains commands that have been deprecated, replaced, or are no longer actively maintained.

## Archive Process

When archiving a command:

1. **Move the file** from `.cursor/commands/` to `.cursor/commands/archive/`
2. **Update** `library/commands-index.json` to mark it as archived
3. **Add a note** in the archived file explaining why it was archived
4. **Commit** with message: `Archive: command-name (reason)`

## Archived Commands

Commands in this directory are:
- Not included in the web portal
- Not available in Cursor IDE
- Kept for historical reference
- Can be restored if needed

## Restoring Archived Commands

To restore an archived command:

1. Move file back to `.cursor/commands/`
2. Update `library/commands-index.json` to mark as active
3. Commit: `Restore: command-name`
