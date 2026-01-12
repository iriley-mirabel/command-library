# 🆕 New Slash Commands Summary

## Overview

Based on analysis of developer work patterns, **12 new commands** have been created and **3 existing commands** have been enhanced to automate repetitive tasks.

---

## 📊 Phase 1: High Priority Commands (Created)

### 1. `/fix-spacing-layout` ⭐
**Purpose:** Fix spacing and layout issues by converting hardcoded values to design tokens

**Usage:**
```
/fix-spacing-layout [path-to-file-or-directory]
```

**Fixes:**
- Hardcoded pixel values → Design tokens
- Inconsistent spacing → Standard spacing scale
- Inline style spacing → Tailwind classes
- Layout alignment issues

**Example:**
```tsx
// ❌ BEFORE
<div style={{ padding: '16px', margin: '12px' }}>

// ✅ AFTER
<div className="p-4 m-3">
```

---

### 2. `/fix-import-paths` ⭐
**Purpose:** Fix broken import paths, standardize import order, remove unused imports

**Usage:**
```
/fix-import-paths [path-to-file-or-directory]
```

**Fixes:**
- Broken import paths
- Relative vs absolute imports
- Import order (React → External → Internal → Types)
- Unused imports
- Type-only imports

**Example:**
```tsx
// ❌ BEFORE
import { Button } from '../../../shared/components/ui/button'
import { useState } from 'react' // Wrong order

// ✅ AFTER
import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
```

---

### 3. `/cleanup-unused-code` ⭐
**Purpose:** Remove unused imports, commented code, unused variables, console.log

**Usage:**
```
/cleanup-unused-code [path] [--remove-console-logs]
```

**Fixes:**
- Unused imports
- Commented-out code blocks
- Unused variables/functions
- Console.log statements (optional)

**Example:**
```tsx
// ❌ BEFORE
import { useState, useEffect, useMemo } from 'react' // useEffect unused
// const oldFunction = () => {} // Commented code
console.log('debug')

// ✅ AFTER
import { useState, useMemo } from 'react'
```

---

### 4. `/implement-view-modes` ⭐
**Purpose:** Ensure pages have both table and card views with proper view toggle

**Usage:**
```
/implement-view-modes [path-to-page-component]
```

**Fixes:**
- Adds missing table view
- Adds missing card view
- Adds view state management
- Adds view toggle to filter bar

**Example:**
```tsx
// ❌ BEFORE - Only card view
{viewMode === 'cards' && <CardView data={data} />}

// ✅ AFTER - Both views
{viewMode === 'table' && <EnhancedDataTable data={data} columns={columns} />}
{viewMode === 'cards' && <CardView data={data} />}
```

---

## 📊 Phase 2: Medium Priority Commands (Created)

### 5. `/add-filter-all-option`
**Purpose:** Add "All" option to filter dropdowns that are missing it

**Usage:**
```
/add-filter-all-option [path-to-component]
```

**Fixes:**
- Adds "All" option to filter arrays
- Updates enum/type definitions
- Handles case sensitivity
- Updates default filter values

---

### 6. `/fix-form-fields`
**Purpose:** Standardize form fields with Label component, proper spacing, design tokens

**Usage:**
```
/fix-form-fields [path-to-component]
```

**Fixes:**
- Replaces plain labels with Label component
- Standardizes placeholder text
- Adds missing validation
- Fixes field spacing
- Ensures design token usage

---

### 7. `/standardize-status-badges`
**Purpose:** Standardize status badge colors and labels to use design tokens

**Usage:**
```
/standardize-status-badges [path-to-component-or-directory]
```

**Fixes:**
- Inconsistent status colors
- Status color mappings
- Status labels
- Design token usage

---

### 8. `/fix-table-columns`
**Purpose:** Standardize table column definitions with proper width, sortable, resizable

**Usage:**
```
/fix-table-columns [path-to-component]
```

**Fixes:**
- Missing column properties
- Column widths
- Sortable/resizable flags
- Column alignment

---

## 📊 Phase 3: Lower Priority Commands (Created)

### 9. `/relocate-component`
**Purpose:** Move component between directories and update all import paths

**Usage:**
```
/relocate-component [source-path] [destination-path]
```

**Fixes:**
- Moves component file
- Updates all import paths
- Updates index exports
- Updates relative imports

---

### 10. `/fix-navigation-routes`
**Purpose:** Fix broken route paths, update route definitions, standardize navigation

**Usage:**
```
/fix-navigation-routes [path-to-routes-file-or-module]
```

**Fixes:**
- Broken route paths
- Route definition updates
- Navigation logic
- Route naming

---

### 11. `/add-error-handling`
**Purpose:** Add error handling to API calls, async operations, form submissions

**Usage:**
```
/add-error-handling [path-to-component]
```

**Fixes:**
- Adds try-catch blocks
- Adds error state management
- Adds error UI components
- Adds validation error handling

---

## 🔄 Enhanced Existing Commands

### `/fix-filter-bar` - ENHANCED
**New capabilities:**
- Auto-detects and fixes spacing issues
- Auto-adds "All" option if missing
- Better integration with view mode detection
- Auto-fixes import paths for filter components

### `/fix-data-table` - ENHANCED
**New capabilities:**
- Auto-fixes column definitions (width, sortable, etc.)
- Auto-detects and fixes spacing issues
- Better status badge standardization in tables
- Auto-cleanup unused table code

### `/refactor-cleanup` - ENHANCED
**New capabilities:**
- Better detection of unused code
- Integration with import path fixes
- More aggressive commented code removal
- Uses `/cleanup-unused-code` patterns

### `/design-token-check` - ENHANCED
**New capabilities:**
- Auto-fixes spacing violations
- Auto-fixes color violations
- Auto-fixes typography violations
- Integration with `/fix-spacing-layout`

---

## 📋 Quick Reference

### Most Used Commands
```
/fix-spacing-layout [path]        # Fix spacing issues
/fix-import-paths [path]          # Fix broken imports
/cleanup-unused-code [path]       # Remove dead code
/implement-view-modes [path]      # Add missing views
```

### Filter & Table Commands
```
/fix-filter-bar [path]            # Standardize filter bars
/add-filter-all-option [path]      # Add "All" to filters
/fix-table-columns [path]          # Fix table columns
/fix-data-table [path]             # Comprehensive table fixes
```

### Form & Component Commands
```
/fix-form-fields [path]            # Standardize form fields
/standardize-status-badges [path]   # Fix status badges
/relocate-component [src] [dest]    # Move components
```

### Quality Commands
```
/design-token-check [module]      # Audit design tokens
/add-error-handling [path]         # Add error handling
/fix-navigation-routes [path]      # Fix routes
```

---

## 🎯 Command Integration

### Master Commands
- `/fix-formatting-issues` - Runs filter bar, data table, and header fixes
- Can be enhanced to include new commands

### Command Chains
```
1. /fix-import-paths [path]
2. /cleanup-unused-code [path]
3. /fix-spacing-layout [path]
4. /fix-filter-bar [path]
5. /implement-view-modes [path]
```

---

## 📚 Documentation

All commands are documented in `.cursor/commands/`:
- Each command has detailed usage examples
- Includes detection patterns
- Provides fix examples
- Includes checklists

---

**All commands are ready to use!** 🚀

