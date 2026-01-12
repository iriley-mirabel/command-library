# 🚀 Complete Slash Commands Cheatsheet

## Quick Reference - All Commands

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CURSOR SLASH COMMANDS - COMPLETE LIST                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🆕 NEW COMMANDS (Phase 1 - High Priority)

### `/fix-spacing-layout` ⭐
**Fix spacing and layout issues**
```
/fix-spacing-layout [path]
```
- Converts hardcoded px → design tokens
- Fixes padding/margin inconsistencies
- Standardizes gap values
- Works on files or directories

### `/fix-import-paths` ⭐
**Fix broken imports and standardize import order**
```
/fix-import-paths [path]
```
- Fixes broken import paths
- Converts relative → absolute imports
- Removes unused imports
- Standardizes import order

### `/cleanup-unused-code` ⭐
**Remove dead code and improve quality**
```
/cleanup-unused-code [path] [--remove-console-logs]
```
- Removes unused imports
- Removes commented code
- Removes unused variables/functions
- Optional: Remove console.log

### `/implement-view-modes` ⭐
**Add missing table/card views**
```
/implement-view-modes [path]
```
- Detects missing views
- Creates table view implementation
- Creates card view implementation
- Adds view toggle to filter bar

---

## 🆕 NEW COMMANDS (Phase 2 - Medium Priority)

### `/add-filter-all-option`
**Add "All" option to filters**
```
/add-filter-all-option [path]
```
- Detects filters without "All"
- Adds "All" option to arrays
- Handles case sensitivity
- Updates default values

### `/fix-form-fields`
**Standardize form fields**
```
/fix-form-fields [path]
```
- Replaces plain labels with Label component
- Standardizes placeholders
- Adds validation
- Fixes spacing

### `/standardize-status-badges`
**Standardize status badge colors**
```
/standardize-status-badges [path]
```
- Fixes inconsistent status colors
- Standardizes color mappings
- Ensures design token usage
- Fixes status labels

### `/fix-table-columns`
**Standardize table column definitions**
```
/fix-table-columns [path]
```
- Adds missing column properties
- Fixes column widths
- Adds sortable/resizable flags
- Fixes alignment

---

## 🆕 NEW COMMANDS (Phase 3 - Lower Priority)

### `/relocate-component`
**Move component and update imports**
```
/relocate-component [source] [destination]
```
- Moves component file
- Updates all import paths
- Updates index exports
- Verifies no broken references

### `/fix-navigation-routes`
**Fix broken route paths**
```
/fix-navigation-routes [path]
```
- Fixes broken route paths
- Updates route definitions
- Fixes navigation logic
- Standardizes route naming

### `/add-error-handling`
**Add error handling to async operations**
```
/add-error-handling [path]
```
- Adds try-catch blocks
- Adds error state management
- Adds error UI components
- Adds validation errors

---

## 🔄 ENHANCED EXISTING COMMANDS

### `/fix-filter-bar` - ENHANCED
**Standardize filter bar layout** (now with auto-fixes)
```
/fix-filter-bar [path]
```
**New capabilities:**
- Auto-fixes spacing issues
- Auto-adds "All" option
- Better view mode detection
- Auto-fixes import paths

### `/fix-data-table` - ENHANCED
**Standardize data table** (now with auto-fixes)
```
/fix-data-table [path]
```
**New capabilities:**
- Auto-fixes column definitions
- Auto-fixes spacing
- Better status badge standardization
- Auto-cleanup unused code

### `/refactor-cleanup` - ENHANCED
**Comprehensive refactoring** (now with better cleanup)
```
/refactor-cleanup [path]
```
**New capabilities:**
- Better unused code detection
- Integration with import fixes
- More aggressive cleanup
- Uses `/cleanup-unused-code` patterns

### `/design-token-check` - ENHANCED
**Audit design tokens** (now with auto-fixes)
```
/design-token-check [module]
```
**New capabilities:**
- Auto-fixes spacing violations
- Auto-fixes color violations
- Auto-fixes typography violations
- Integration with `/fix-spacing-layout`

---

## 📊 EXISTING COMMANDS (Testing & Quality)

### `/test-page-quick`
**Quick smoke test**
```
/test-page-quick
```
- Fast check (2 min)
- Critical pages only
- Daily routine

### `/test-feature-pages`
**Feature-specific test**
```
/test-feature-pages
```
- One feature at a time
- 2-3 minutes
- After feature work

### `/test-pages`
**Full application test**
```
/test-pages
```
- Comprehensive (5-10 min)
- All pages
- Before deployment

### `/debug-failing-page`
**Debug broken page**
```
/debug-failing-page
```
- Deep dive (5 min)
- Detailed analysis
- Fix recommendations

---

## 🎯 Command Usage by Task

### Spacing Issues
```
/fix-spacing-layout [path]
```

### Broken Imports
```
/fix-import-paths [path]
```

### Dead Code
```
/cleanup-unused-code [path]
```

### Missing Views
```
/implement-view-modes [path]
```

### Filter Issues
```
/fix-filter-bar [path]
/add-filter-all-option [path]
```

### Table Issues
```
/fix-data-table [path]
/fix-table-columns [path]
```

### Form Issues
```
/fix-form-fields [path]
```

### Status Badges
```
/standardize-status-badges [path]
```

### Component Move
```
/relocate-component [src] [dest]
```

### Route Issues
```
/fix-navigation-routes [path]
```

### Error Handling
```
/add-error-handling [path]
```

### Design Tokens
```
/design-token-check [module]
```

### Comprehensive Fixes
```
/fix-formatting-issues [path]  # Master command
```

---

## 🔗 Command Chains

### Daily Cleanup Routine
```
1. /fix-import-paths [path]
2. /cleanup-unused-code [path]
3. /fix-spacing-layout [path]
```

### Page Standardization
```
1. /fix-filter-bar [path]
2. /implement-view-modes [path]
3. /fix-data-table [path]
4. /fix-form-fields [path]
```

### Complete Page Fix
```
/fix-formatting-issues [path]  # Runs all formatting fixes
```

---

## 📋 Command Priority Guide

### Use These First (Most Common)
- `/fix-spacing-layout` - Spacing issues
- `/fix-import-paths` - Broken imports
- `/cleanup-unused-code` - Code quality
- `/fix-filter-bar` - Filter bar issues

### Use When Needed
- `/implement-view-modes` - Missing views
- `/add-filter-all-option` - Filter enhancement
- `/fix-form-fields` - Form standardization
- `/fix-table-columns` - Table fixes

### Use Occasionally
- `/standardize-status-badges` - Status consistency
- `/relocate-component` - Component moves
- `/fix-navigation-routes` - Route fixes
- `/add-error-handling` - Error management

---

## 💡 Pro Tips

### Tip 1: Start with Master Command
```
/fix-formatting-issues [path]
```
Runs multiple fixes at once

### Tip 2: Chain Related Commands
```
/fix-import-paths [path] && /cleanup-unused-code [path]
```

### Tip 3: Use Module-Level Commands
```
/fix-filter-bar-module src/features/email-marketing/
```

### Tip 4: Verify After Fixes
```
/test-page-quick  # Quick check after fixes
```

---

## 📚 Documentation

- **New Commands:** `.cursor/commands/NEW_COMMANDS_SUMMARY.md`
- **Recommendations:** `.cursor/commands/RECOMMENDATIONS_NEW_SLASH_COMMANDS.md`
- **Individual Commands:** `.cursor/commands/[command-name].md`

---

**All commands are ready to use!** 🚀

