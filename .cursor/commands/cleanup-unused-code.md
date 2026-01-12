---
name: cleanup-unused-code
description: Remove unused imports, commented code, unused variables, and console.log statements
---

# 🧹 Cleanup Unused Code - Remove Dead Code and Improve Code Quality

## Purpose

Detect and remove unused imports, commented-out code blocks, unused variables/functions, and console.log statements. This command improves code quality and maintainability.

**Note:** This command works on both single files and entire directories.

---

## 📋 Usage

```
/cleanup-unused-code [path-to-file-or-directory] [--remove-console-logs]
```

**Examples:**
```
/cleanup-unused-code src/features/email-marketing/components/templates/TemplateList.tsx
/cleanup-unused-code src/features/subscription-management/
/cleanup-unused-code src/shared/components/ui/ --remove-console-logs
```

**Flags:**
- `--remove-console-logs` - Also remove console.log/console.error statements (optional)

---

## 🎯 What This Command Removes

### 1. Unused Imports
```tsx
// ❌ BEFORE - Unused imports
import { useState, useEffect, useMemo } from 'react'  // useEffect unused
import { Button, Card, Badge } from '@/shared/components/ui'  // Badge unused

// ✅ AFTER - Only used imports
import { useState, useMemo } from 'react'
import { Button, Card } from '@/shared/components/ui'
```

### 2. Commented-Out Code
```tsx
// ❌ BEFORE - Commented code blocks
// const oldFunction = () => {
//   // Old implementation
//   return something
// }

// ✅ AFTER - Removed
// (Code removed)
```

### 3. Unused Variables
```tsx
// ❌ BEFORE - Unused variables
const unusedVariable = 'test'
const [unusedState, setUnusedState] = useState(null)

// ✅ AFTER - Removed
// (Variables removed)
```

### 4. Unused Functions
```tsx
// ❌ BEFORE - Unused function
function unusedHelper() {
  return 'unused'
}

// ✅ AFTER - Removed
// (Function removed)
```

### 5. Console.log Statements
```tsx
// ❌ BEFORE - Debug console.log
console.log('debug info', data)
console.error('error', error)

// ✅ AFTER - Removed (if --remove-console-logs flag)
// (Console statements removed)
```

### 6. Unused Type Definitions
```tsx
// ❌ BEFORE - Unused type
type UnusedType = {
  field: string
}

// ✅ AFTER - Removed
// (Type removed)
```

---

## 🔍 Detection Patterns

### Unused Imports
- Static analysis of import usage
- Check if imported symbol is used in file
- Handle re-exports and type-only imports
- Check for side-effect imports (don't remove)

### Commented Code
- Multi-line comment blocks
- Commented function definitions
- Commented variable declarations
- Commented import statements

### Unused Variables
- Variables declared but never read
- State variables never used
- Function parameters never used (except in interfaces)
- Destructured variables never used

### Console Statements
- `console.log()`
- `console.error()`
- `console.warn()`
- `console.info()`
- `console.debug()`

---

## ✅ What to Keep

### Keep These (Even if "Unused")
- **Type-only imports** - Used for type checking
- **Side-effect imports** - `import './styles.css'`
- **Re-exported imports** - `export { Button } from './button'`
- **Interface props** - Function parameters in interfaces
- **Error handling** - Variables in catch blocks
- **Intentional comments** - Documentation comments, TODO comments

---

## 🛠️ Cleanup Process

### Step 1: Detection
1. Scan file for all imports
2. Check usage of each imported symbol
3. Find commented code blocks
4. Detect unused variables/functions
5. Find console.log statements (if flag set)

### Step 2: Analysis
1. Verify imports are truly unused
2. Check for re-exports
3. Identify commented code blocks
4. Verify variables are unused (not just assigned)
5. Check console.log context (may be intentional)

### Step 3: Removal
1. Remove unused imports
2. Remove commented code blocks
3. Remove unused variables
4. Remove unused functions
5. Remove console.log (if flag set)

### Step 4: Verification
1. Verify file still compiles
2. Check no functionality broken
3. Ensure no broken references
4. Validate imports are correct

---

## 📋 Checklist

When cleaning up code, verify:

### Imports
- [ ] No unused imports remain
- [ ] Type-only imports preserved
- [ ] Side-effect imports preserved
- [ ] Re-exported imports preserved

### Code
- [ ] Commented code blocks removed
- [ ] Unused variables removed
- [ ] Unused functions removed
- [ ] Unused types removed

### Console Statements
- [ ] Console.log removed (if flag set)
- [ ] Intentional logging preserved (if needed)
- [ ] Error logging preserved (if needed)

---

## 🔄 Common Cleanups

### Cleanup 1: Unused Imports
```tsx
// ❌ BEFORE
import { useState, useEffect, useMemo, useCallback } from 'react'
import { Button, Card, Badge, Input } from '@/shared/components/ui'

// Component only uses useState and Button
export function MyComponent() {
  const [state, setState] = useState('')
  return <Button>Click</Button>
}

// ✅ AFTER
import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
```

### Cleanup 2: Commented Code
```tsx
// ❌ BEFORE
// const oldImplementation = () => {
//   return 'old code'
// }

const newImplementation = () => {
  return 'new code'
}

// ✅ AFTER
const newImplementation = () => {
  return 'new code'
}
```

### Cleanup 3: Unused Variables
```tsx
// ❌ BEFORE
function MyComponent() {
  const unusedVar = 'test'
  const [unusedState] = useState(null)
  const usedVar = 'used'
  
  return <div>{usedVar}</div>
}

// ✅ AFTER
function MyComponent() {
  const usedVar = 'used'
  
  return <div>{usedVar}</div>
}
```

### Cleanup 4: Console.log Removal
```tsx
// ❌ BEFORE
function MyComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    console.log('Loading data...')
    fetchData().then(setData)
    console.log('Data loaded', data)
  }, [])
  
  return <div>Content</div>
}

// ✅ AFTER (with --remove-console-logs)
function MyComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetchData().then(setData)
  }, [])
  
  return <div>Content</div>
}
```

---

## ⚠️ Important Notes

### What NOT to Remove
- **Type-only imports** - `import type { ... }`
- **Side-effect imports** - `import './styles.css'`
- **Re-exported imports** - `export { Button } from './button'`
- **Interface props** - Even if "unused", they're part of contract
- **Error variables** - Variables in catch blocks
- **Documentation comments** - JSDoc, explanatory comments

### Safety Checks
- Always verify file compiles after cleanup
- Check for broken functionality
- Ensure no broken references
- Test after cleanup

### Console.log Handling
- **Default:** Keep console.log (may be intentional)
- **With flag:** Remove all console statements
- **Exception:** Keep console.error in error handlers (if intentional)

---

## 🔗 Related Commands

- `/fix-import-paths` - Also removes unused imports
- `/refactor-cleanup` - Comprehensive refactoring and cleanup
- `/fix-formatting-issues` - May include code cleanup

---

## 📊 Report Format

```
🧹 Unused Code Cleanup Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: src/features/email-marketing/components/templates/TemplateList.tsx

Issues Found: 15
Removals Applied: 15

🟡 IMPORTANT - Line 5
  Issue: Unused import 'useEffect'
  Fix: Removed from import statement

🟢 MINOR - Line 45-52
  Issue: Commented code block (8 lines)
  Fix: Removed commented code

🟢 MINOR - Line 120
  Issue: Unused variable 'unusedVar'
  Fix: Removed variable declaration

🟢 MINOR - Line 200
  Issue: console.log statement
  Fix: Removed (with --remove-console-logs flag)

Summary:
- Removed 5 unused imports
- Removed 3 commented code blocks (25 lines)
- Removed 4 unused variables
- Removed 2 unused functions
- Removed 1 console.log statement
- Net reduction: ~50 lines
```

---

## 🎯 Cleanup Rules

### Import Cleanup
- Remove if symbol not used in file
- Keep if used in type annotations
- Keep if re-exported
- Keep side-effect imports

### Code Cleanup
- Remove commented function definitions
- Remove commented variable declarations
- Remove unused helper functions
- Keep documentation comments

### Console Cleanup
- Remove only with `--remove-console-logs` flag
- Keep console.error in error handlers (if intentional)
- Keep console.log if clearly intentional (e.g., logging service)

---

**Ready to clean up unused code!** Run `/cleanup-unused-code [path]` to remove dead code and improve code quality. 🚀

