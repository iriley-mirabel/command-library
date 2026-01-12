---
name: dead-code-removal
description: ⚠️ DEPRECATED - Use /cleanup-unused-code instead
deprecated: true
replacement: cleanup-unused-code
---

# ⚠️ This Command is Deprecated

**Use `/cleanup-unused-code` instead.**

This command has been replaced by `/cleanup-unused-code` which provides:
- Better unused code detection
- Console.log removal option
- Improved patterns
- More comprehensive cleanup

**Migration:**
```bash
# Old (deprecated)
/dead-code-removal <module-name>
/dead-code-removal <path-to-file>

# New (recommended)
/cleanup-unused-code <module-name>
/cleanup-unused-code <path-to-file> [--remove-console-logs]
```

**Deprecation Date:** 2024-01-15  
**Removal Date:** 2024-02-15 (30 days from deprecation)

---

# 🧹 Remove Dead Code (Original Documentation)

⚠️ **Note:** This command is deprecated. See migration instructions above.

Identifies and removes unused code (exports, components, functions, hooks, imports) from a module or specific page/file.

**Recommended:** Use at **module level** for comprehensive analysis. Dead code often spans multiple files (unused exports, components imported but never used, etc.).

---

## 🎯 Quick Summary

**Primary Scope:** Module-level analysis (recommended)  
**Secondary Scope:** Page/file-level analysis (for quick cleanup)  
**Speed:** Moderate (~30 seconds to 2 minutes depending on scope)  
**Purpose:** Remove unused code to reduce bundle size and improve maintainability  
**Action:** Safe removal with verification

---

## 📋 Usage

### Module-Level (Recommended)

```bash
/dead-code-removal <module-name>
```

**Examples:**
```bash
/dead-code-removal email-marketing
/dead-code-removal subscription-management
/dead-code-removal classified-ads
```

### Page/File-Level

```bash
/dead-code-removal <path-to-file>
```

**Examples:**
```bash
/dead-code-removal src/features/email-marketing/pages/ContactsPage.tsx
/dead-code-removal src/features/subscription-management/components/SubscriptionCard.tsx
```

### With Options

```bash
/dead-code-removal email-marketing --dry-run
/dead-code-removal email-marketing --aggressive
/dead-code-removal email-marketing --include-tests
```

---

## 🔍 What Gets Detected

### 1. Unused Exports
- Components exported but never imported elsewhere
- Functions exported but never used
- Types/interfaces exported but never referenced
- Constants exported but never imported

### 2. Unused Imports
- Imported modules/components never used in file
- Unused type imports
- Side-effect imports that aren't needed

### 3. Unused Components
- React components defined but never rendered
- Components only used in commented-out code
- Duplicate components (same functionality exists elsewhere)

### 4. Unused Functions/Hooks
- Functions defined but never called
- Custom hooks created but never used
- Utility functions that are obsolete

### 5. Unused Variables/Constants
- Variables declared but never referenced
- Constants defined but never used
- State variables that are set but never read

### 6. Dead Code Blocks
- Commented-out code blocks
- Conditional code that's never true (e.g., `if (false)`)
- Unreachable code after return statements

### 7. Unused Files
- Files that are never imported anywhere
- Orphaned test files
- Legacy files replaced by newer versions

---

## 📊 Analysis Process

### Phase 1: Discovery

**For Module-Level:**
1. Scan all files in the module directory
2. Build dependency graph of imports/exports
3. Identify entry points (pages, routes, public API)
4. Trace usage from entry points

**For Page-Level:**
1. Read the target file
2. Identify all exports
3. Search codebase for imports of those exports
4. Check internal usage within the file

### Phase 2: Classification

Categorize dead code by type and risk:

```yaml
DEAD-001:
  Type: UNUSED_EXPORT
  Item: ContactFormModal component
  Location: src/features/email-marketing/components/contacts/ContactFormModal.tsx
  Risk: 🟢 LOW (safe to remove)
  Reason: Exported but never imported anywhere
  Verification: Searched entire codebase, no imports found

DEAD-002:
  Type: UNUSED_IMPORT
  Item: useState import
  Location: src/features/email-marketing/pages/ContactsPage.tsx:15
  Risk: 🟢 LOW (safe to remove)
  Reason: Imported but never used in file
  Verification: File uses useReducer instead

DEAD-003:
  Type: UNUSED_FUNCTION
  Item: formatContactName function
  Location: src/features/email-marketing/utils/contactUtils.ts:45
  Risk: 🟡 MEDIUM (verify no dynamic calls)
  Reason: Defined but never called
  Verification: Static analysis shows no references
```

### Phase 3: Risk Assessment

**🟢 LOW RISK - Safe to Remove:**
- Unused imports (verified not used)
- Unused local variables
- Commented-out code
- Unused type-only imports
- Dead code after return statements

**🟡 MEDIUM RISK - Verify Before Removing:**
- Unused exports (check for dynamic imports)
- Unused functions (check for string-based calls)
- Unused components (check for dynamic rendering)
- Unused hooks (check for conditional usage)

**🔴 HIGH RISK - Careful Review:**
- Files that might be entry points
- Exports that might be used by external tools
- Code that might be called via reflection/dynamic access
- Test files (might be run by test framework)

### Phase 4: Verification

Before removing, verify:

1. **Static Analysis:**
   - Search codebase for exact string matches
   - Check import statements
   - Verify no dynamic imports
   - Check for string-based references

2. **Build Verification:**
   - Run TypeScript compiler (catches unused imports)
   - Run ESLint (catches some dead code)
   - Check for build errors

3. **Runtime Verification:**
   - Check if code is used via dynamic access
   - Verify no string-based component rendering
   - Check for reflection-based usage

---

## 📄 Report Format

### Summary Section

```markdown
# 🧹 Dead Code Analysis Report

**Scope:** Module: `email-marketing` | File: `ContactsPage.tsx`
**Analysis Date:** [Date/Time]
**Files Analyzed:** [Count]
**Total Lines Analyzed:** [Count]

## 📊 Summary

| Metric | Value |
|--------|-------|
| Dead Code Items Found | [Count] |
| Estimated Lines to Remove | [Lines] |
| Estimated Bundle Size Reduction | [KB] |
| Low Risk Items | [Count] |
| Medium Risk Items | [Count] |
| High Risk Items | [Count] |
```

### Findings Section

```markdown
## 🔎 Detailed Findings

### DEAD-001: Unused Export - ContactFormModal 🔴

**Type:** UNUSED_EXPORT  
**Location:** `src/features/email-marketing/components/contacts/ContactFormModal.tsx`  
**Risk:** 🟢 LOW  
**Lines:** 1-150 (entire file)

**Details:**
- Component exported but never imported
- No references found in codebase
- Not used in any routes
- Safe to remove entire file

**Verification:**
```bash
# Searched for:
grep -r "ContactFormModal" src/
grep -r "from.*ContactFormModal" src/
grep -r "import.*ContactFormModal" src/

# Results: No matches found
```

**Action:** Remove entire file

---

### DEAD-002: Unused Import - useState 🟢

**Type:** UNUSED_IMPORT  
**Location:** `src/features/email-marketing/pages/ContactsPage.tsx:15`  
**Risk:** 🟢 LOW  
**Lines:** 15

**Details:**
- `useState` imported from 'react' but never used
- File uses `useReducer` instead
- Safe to remove

**Code:**
```typescript
// Line 15 - REMOVE THIS
import { useState, useReducer } from 'react';

// Should be:
import { useReducer } from 'react';
```

**Action:** Remove unused import

---

### DEAD-003: Unused Function - formatContactName 🟡

**Type:** UNUSED_FUNCTION  
**Location:** `src/features/email-marketing/utils/contactUtils.ts:45-52`  
**Risk:** 🟡 MEDIUM  
**Lines:** 45-52

**Details:**
- Function defined but never called
- No static references found
- Verify no dynamic calls before removing

**Code:**
```typescript
// Lines 45-52 - VERIFY BEFORE REMOVING
export function formatContactName(contact: Contact): string {
  return `${contact.firstName} ${contact.lastName}`.trim();
}
```

**Verification Steps:**
1. Search for string "formatContactName" in codebase
2. Check for dynamic function calls: `window['formatContactName']`
3. Check for eval/Function constructor usage
4. If no matches, safe to remove

**Action:** Verify, then remove if confirmed unused

---

### DEAD-004: Commented-Out Code Block 🟢

**Type:** DEAD_CODE_BLOCK  
**Location:** `src/features/email-marketing/pages/ContactsPage.tsx:234-245`  
**Risk:** 🟢 LOW  
**Lines:** 234-245

**Details:**
- Large block of commented-out code
- Appears to be old implementation
- Safe to remove

**Code:**
```typescript
// Lines 234-245 - REMOVE THIS
// const handleOldSubmit = async (data: FormData) => {
//   try {
//     await submitForm(data);
//     toast.success('Saved!');
//   } catch (error) {
//     toast.error('Failed to save');
//   }
// };
```

**Action:** Remove commented code block

---

### DEAD-005: Unused File - OldContactService.ts 🟡

**Type:** UNUSED_FILE  
**Location:** `src/features/email-marketing/services/OldContactService.ts`  
**Risk:** 🟡 MEDIUM  
**Lines:** Entire file (200 lines)

**Details:**
- File exists but never imported
- Replaced by `ContactService.ts`
- Verify no dynamic imports before removing

**Verification:**
```bash
# Check for any references
grep -r "OldContactService" src/
grep -r "old-contact-service" src/

# Results: No matches found
```

**Action:** Verify, then remove file if confirmed unused
```

### Action Plan Section

```markdown
## 🛠️ Removal Plan

### Phase 1: Low Risk Removals (Do First) ⚡

**Estimated Time:** 10-15 minutes  
**Risk:** 🟢 LOW  
**Items:** [Count]

1. [ ] **DEAD-002** Remove unused `useState` import (1 line)
2. [ ] **DEAD-004** Remove commented-out code block (12 lines)
3. [ ] **DEAD-006** Remove unused `formatDate` import (1 line)
4. [ ] **DEAD-008** Remove unused `CONSTANT_VALUE` (1 line)

**Total Lines Removed:** ~15 lines

---

### Phase 2: Medium Risk Removals (Verify First) 🔍

**Estimated Time:** 20-30 minutes  
**Risk:** 🟡 MEDIUM  
**Items:** [Count]

1. [ ] **DEAD-003** Verify `formatContactName` function
   - [ ] Search for string references
   - [ ] Check for dynamic calls
   - [ ] Remove if confirmed unused (8 lines)

2. [ ] **DEAD-005** Verify `OldContactService.ts` file
   - [ ] Check for dynamic imports
   - [ ] Verify replacement exists
   - [ ] Remove if confirmed unused (200 lines)

3. [ ] **DEAD-007** Verify unused `useContactHook` hook
   - [ ] Check for conditional usage
   - [ ] Remove if confirmed unused (45 lines)

**Total Lines Removed:** ~253 lines (after verification)

---

### Phase 3: High Risk Removals (Careful Review) ⚠️

**Estimated Time:** 30-60 minutes  
**Risk:** 🔴 HIGH  
**Items:** [Count]

1. [ ] **DEAD-001** Review `ContactFormModal` component
   - [ ] Check if used in dynamic routes
   - [ ] Verify no external tool dependencies
   - [ ] Check test files
   - [ ] Remove if confirmed unused (150 lines)

**Total Lines Removed:** ~150 lines (after careful review)

---

## 📈 Impact Summary

**Total Dead Code Found:**
- Items: [Count]
- Lines: [Count]
- Files: [Count]

**After All Removals:**
- Lines Removed: ~[Count]
- Bundle Size Reduction: ~[KB]
- Files Removed: [Count]
- Maintainability: Significantly improved
- Build Time: Slightly faster

**Estimated Total Time:** [Time]
```

---

## 🔧 Options Reference

| Option | Description | Default |
|--------|-------------|---------|
| `--dry-run` | Show what would be removed without actually removing | Remove immediately |
| `--aggressive` | Remove medium-risk items without extra verification | Conservative (verify first) |
| `--include-tests` | Also analyze test files for dead code | Exclude tests |
| `--keep-comments` | Don't remove commented-out code | Remove comments |
| `--min-lines=N` | Only report dead code blocks with N+ lines | Report all |
| `--export=json` | Export results as JSON file | Markdown only |

---

## ⚠️ Safety Guidelines

### Before Removing

1. **Always verify:**
   - Search codebase for exact string matches
   - Check for dynamic imports/access
   - Verify no string-based references
   - Check test files if using `--include-tests`

2. **Use version control:**
   - Commit current state before removal
   - Use `--dry-run` first to review
   - Remove incrementally (phase by phase)
   - Test after each phase

3. **Check for false positives:**
   - Exports used by external tools
   - Code used via reflection
   - Dynamic imports (check import() calls)
   - String-based component rendering

### After Removing

1. **Verify build:**
   ```bash
   npm run build
   npm run type-check
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Check for runtime errors:**
   - Test affected features manually
   - Check browser console for errors
   - Verify no missing imports

---

## 🎯 Best Practices

### ✅ DO

1. **Start with module-level analysis** - More comprehensive
2. **Use `--dry-run` first** - Review before removing
3. **Remove incrementally** - Phase by phase
4. **Test after each phase** - Catch issues early
5. **Keep a backup** - Use git commits
6. **Document removals** - Note why code was removed

### ❌ DON'T

1. **Don't remove without verification** - Always check first
2. **Don't remove test files blindly** - They might be run by test framework
3. **Don't remove public API exports** - Check if used externally
4. **Don't remove code used dynamically** - Check for string-based access
5. **Don't remove everything at once** - Incremental is safer

---

## 🔄 Workflow

### Step 1: Run Analysis

```bash
/dead-code-removal email-marketing --dry-run
```

### Step 2: Review Report

- Review all findings
- Check risk levels
- Verify high-risk items manually

### Step 3: Remove Low-Risk Items

```bash
/dead-code-removal email-marketing
# (without --dry-run, removes low-risk items)
```

### Step 4: Verify and Test

- Run build
- Run tests
- Test affected features

### Step 5: Remove Medium-Risk Items

- After verification, remove medium-risk items
- Test again

### Step 6: Review High-Risk Items

- Carefully review each high-risk item
- Remove only if 100% certain
- Consider keeping if uncertain

---

## 📚 Related Commands

- `/find-duplicate-code` - Find duplicate code patterns
- `/refactor-cleanup` - Comprehensive refactoring analysis
- `/audit-component-duplication` - Check for duplicate components
- `/pre-flight-check` - Verify code quality standards

---

## 💡 Example Output

```markdown
# 🧹 Dead Code Analysis Report

**Scope:** Module: `email-marketing`
**Analysis Date:** January 15, 2026
**Files Analyzed:** 127
**Total Lines Analyzed:** 15,432

## 📊 Summary

| Metric | Value |
|--------|-------|
| Dead Code Items Found | 23 |
| Estimated Lines to Remove | 487 |
| Estimated Bundle Size Reduction | ~12 KB |
| Low Risk Items | 15 |
| Medium Risk Items | 6 |
| High Risk Items | 2 |

## 🔎 Top Findings

1. **Unused Component:** `ContactFormModal` (150 lines) - Never imported
2. **Unused File:** `OldContactService.ts` (200 lines) - Replaced by new service
3. **Unused Imports:** 12 unused imports across files
4. **Commented Code:** 3 large commented blocks (45 lines total)

## 🛠️ Quick Wins (< 5 minutes)

1. Remove 12 unused imports (12 lines)
2. Remove 3 commented code blocks (45 lines)
3. Remove 5 unused constants (5 lines)

**Total Quick Wins:** 62 lines removed in ~5 minutes
```

---

## 🚀 Getting Started

**For Module-Level Analysis (Recommended):**
```bash
/dead-code-removal <module-name> --dry-run
```

**For Page-Level Analysis:**
```bash
/dead-code-removal <path-to-file> --dry-run
```

The AI will:
1. Analyze the scope (module or file)
2. Identify all dead code
3. Categorize by risk level
4. Generate removal plan
5. Optionally remove low-risk items automatically

**Time:** 30 seconds - 2 minutes depending on scope  
**Output:** Comprehensive report with actionable removal plan  
**Value:** Cleaner codebase, smaller bundle, improved maintainability

---

**Clean up your codebase efficiently and safely!** 🧹✨

