# Setup Script Behavior - Command Merging

## Overview

The setup scripts (`setup-commands.sh` and `setup-commands.ps1`) now **preserve project-specific commands** while merging library commands. They will only replace commands with the **exact same filename**.

## Behavior Scenarios

### Scenario 1: No Existing Commands Directory

**Action:** Creates a symlink to the library (or copies if symlink fails)

```
.cursor/commands/ → [symlink to library]
```

**Result:** All library commands available

---

### Scenario 2: Already a Symlink

**Action:** Asks if you want to replace the symlink

- **Yes:** Replaces with new symlink (updates to latest library)
- **No:** Keeps existing symlink

**Result:** Either updated symlink or existing one preserved

---

### Scenario 3: Existing Directory with Commands (Most Important!)

**Action:** **Merges** commands intelligently:

1. **Preserves** project-specific commands (not in library)
2. **Adds** new commands from library
3. **Replaces** only commands with the same filename (if different)
4. **Keeps** identical commands unchanged

**Example:**
```
Project has:
  - cleanup-unused-code.md (project version)
  - my-custom-command.md (project-specific)
  
Library has:
  - cleanup-unused-code.md (library version)
  - fix-import-paths.md (new)
  - test-page-quick.md (new)

Result after merge:
  - cleanup-unused-code.md (replaced with library version)
  - my-custom-command.md (preserved - project-specific)
  - fix-import-paths.md (added from library)
  - test-page-quick.md (added from library)
```

## Command Replacement Rules

### ✅ Will Replace:
- Commands with **exact same filename** that are **different** from library version
- Example: `cleanup-unused-code.md` in project vs library (different content)

### ❌ Will NOT Replace:
- Commands with **exact same filename** that are **identical** to library version
- Commands that **don't exist** in library (project-specific commands)
- Commands with **different filenames** (even if similar purpose)

## Output Messages

### During Merge:
```
⚠️  .cursor/commands already exists with project-specific commands
Merging library commands with existing commands...
  - Existing commands will be preserved
  - Library commands will be added
  - Commands with the same name will be replaced with library versions

  ⚠️  Replacing: cleanup-unused-code.md (library version)
  ➕ Adding: fix-import-paths.md
  ➕ Adding: test-page-quick.md
  ✓ Keeping: my-custom-command.md (project-specific)

✓ Merge complete!
  - Total commands: 4
  - Project-specific: 1 (preserved)
```

## Best Practices

1. **Project-Specific Commands:**
   - Use unique filenames (e.g., `my-project-special-command.md`)
   - These will always be preserved

2. **Updating Library Commands:**
   - Run setup script again to get latest library versions
   - Only commands with same name will be updated

3. **Customizing Library Commands:**
   - If you customize a library command, it will be replaced on next run
   - Consider creating a new command with different name instead

4. **Symlink vs Copy:**
   - **Symlink:** Best for most cases - automatic updates
   - **Copy:** Use when you need project-specific modifications

## Troubleshooting

### "My custom command disappeared!"
- **Check:** Was it in `.cursor/commands/` directory?
- **Solution:** If it had a unique name, it should be preserved. Check the merge output.

### "Library command didn't update!"
- **Check:** Is `.cursor/commands` a symlink or directory?
- **Solution:** 
  - If symlink: Pull latest from library repo
  - If directory: Run setup script again to merge updates

### "I want to keep my version of a library command"
- **Solution:** Rename your version (e.g., `cleanup-unused-code-custom.md`)
- This way it won't be replaced by library updates

## Technical Details

### Bash Script (`setup-commands.sh`)
- Uses `cmp` to check if files are identical
- Only replaces if files differ
- Preserves all non-conflicting files

### PowerShell Script (`setup-commands.ps1`)
- Uses `Get-FileHash` with MD5 to compare files
- Only replaces if hashes differ
- Preserves all non-conflicting files

Both scripts provide detailed output showing what was added, replaced, and preserved.
