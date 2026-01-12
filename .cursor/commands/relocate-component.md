---
name: relocate-component
description: Move component between directories and update all import paths automatically
---

# 📦 Relocate Component - Move Component and Update Imports

## Purpose

Move a component from one directory to another and automatically update all import paths across the codebase. This command handles component relocation with full import path updates.

**Note:** This is a complex operation that affects multiple files. Use with caution.

---

## 📋 Usage

```
/relocate-component [source-path] [destination-path]
```

**Examples:**
```
/relocate-component src/shared/components/ui/MyComponent.tsx src/features/email-marketing/components/
/relocate-component src/features/products/components/ProductCard.tsx src/shared/components/ui/
```

---

## 🎯 What This Command Does

### 1. Moves Component File
```bash
# Moves file from source to destination
src/shared/components/ui/MyComponent.tsx
  → src/features/email-marketing/components/MyComponent.tsx
```

### 2. Updates All Import Paths
```tsx
// ❌ BEFORE - Old import path
import { MyComponent } from '@/shared/components/ui/MyComponent'

// ✅ AFTER - Updated import path
import { MyComponent } from '@/features/email-marketing/components/MyComponent'
```

### 3. Updates Index Exports
```tsx
// ❌ BEFORE - Old export
export { MyComponent } from './ui/MyComponent'

// ✅ AFTER - Updated export (if moving to shared)
export { MyComponent } from './MyComponent'
```

### 4. Updates Relative Imports
```tsx
// ❌ BEFORE - Relative import breaks
import { MyComponent } from '../../../shared/components/ui/MyComponent'

// ✅ AFTER - Fixed relative import
import { MyComponent } from '../../components/MyComponent'
```

---

## 🔍 Detection Patterns

### Files to Update
- All files importing the component
- Index files exporting the component
- Test files importing the component
- Documentation referencing the component

### Import Patterns to Fix
- Absolute imports (`@/shared/...`)
- Relative imports (`../../...`)
- Re-exports in index files
- Type-only imports

---

## ✅ Relocation Process

### Step 1: Pre-Flight Checks
1. Verify source file exists
2. Check destination directory exists
3. Detect all files importing the component
4. Check for naming conflicts
5. Verify no circular dependencies

### Step 2: Move File
1. Copy file to destination
2. Update internal imports in moved file
3. Delete source file
4. Verify file moved successfully

### Step 3: Update Imports
1. Find all files importing the component
2. Update absolute import paths
3. Update relative import paths
4. Update index file exports
5. Update type imports

### Step 4: Verification
1. Verify all imports resolve
2. Check for broken references
3. Run build to verify
4. Check for TypeScript errors

---

## 📋 Checklist

When relocating a component, verify:

### File Movement
- [ ] Source file moved to destination
- [ ] File structure is correct
- [ ] No naming conflicts
- [ ] Internal imports in file updated

### Import Updates
- [ ] All absolute imports updated
- [ ] All relative imports updated
- [ ] Index file exports updated
- [ ] Type imports updated

### Verification
- [ ] All imports resolve correctly
- [ ] No broken references
- [ ] Build succeeds
- [ ] No TypeScript errors

---

## 🔄 Common Relocations

### Relocation 1: Shared to Feature
```bash
# Command
/relocate-component src/shared/components/ui/FormCard.tsx src/features/email-marketing/components/

# Updates
- Moves file to feature directory
- Updates all imports from @/shared/... to @/features/email-marketing/...
- Updates relative imports
```

### Relocation 2: Feature to Shared
```bash
# Command
/relocate-component src/features/products/components/ProductCard.tsx src/shared/components/ui/

# Updates
- Moves file to shared directory
- Updates all imports to use @/shared/components/ui/...
- Updates index.ts exports
```

### Relocation 3: Within Feature
```bash
# Command
/relocate-component src/features/email-marketing/components/forms/FormCard.tsx src/features/email-marketing/components/

# Updates
- Moves file within feature
- Updates relative imports only
- Updates feature index exports
```

---

## ⚠️ Important Notes

### Safety Checks
- **Always backup** before relocating
- **Verify imports** after relocation
- **Test build** to catch errors
- **Check for circular dependencies**

### What NOT to Relocate
- **Third-party components** - Don't move node_modules
- **Generated files** - May be auto-generated
- **Files with many dependencies** - High risk of breaking

### Manual Steps May Be Needed
- Update documentation
- Update test file paths
- Update Storybook stories
- Update component catalog

---

## 🔗 Related Commands

- `/fix-import-paths` - Fixes import paths after relocation
- `/fix-formatting-issues` - May need to run after relocation

---

## 📊 Report Format

```
📦 Component Relocation Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Component: MyComponent.tsx
From: src/shared/components/ui/
To: src/features/email-marketing/components/

Files Updated: 12
Imports Fixed: 15

✅ File moved successfully
✅ Updated 8 absolute imports
✅ Updated 4 relative imports
✅ Updated 2 index file exports
✅ Updated 1 type import

Summary:
- Component relocated
- All imports updated
- No broken references
- Build successful
```

---

**Ready to relocate components!** Run `/relocate-component [source] [destination]` to move components safely. 🚀

