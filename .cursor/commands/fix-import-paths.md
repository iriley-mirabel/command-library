---
name: fix-import-paths
description: Fix broken import paths, standardize import order, and remove unused imports
---

# 📦 Fix Import Paths - Standardize Imports and Fix Broken Paths

## Purpose

Detect and fix broken import paths, standardize import order, convert relative to absolute imports, and remove unused imports. This command ensures all imports follow project standards.

**Note:** This command works on both single files and entire directories.

---

## 📋 Usage

```
/fix-import-paths [path-to-file-or-directory]
```

**Examples:**
```
/fix-import-paths src/features/email-marketing/components/templates/TemplateList.tsx
/fix-import-paths src/features/subscription-management/
/fix-import-paths src/shared/components/ui/
```

---

## 🎯 What This Command Fixes

### 1. Broken Import Paths
```tsx
// ❌ BEFORE - Broken path after component relocation
import { Button } from '../../../shared/components/ui/button'

// ✅ AFTER - Fixed absolute path
import { Button } from '@/shared/components/ui/button'
```

### 2. Relative vs Absolute Imports
```tsx
// ❌ BEFORE - Deep relative paths
import { useForms } from '../../hooks/useForms'
import { EmailForm } from '../../../types'

// ✅ AFTER - Absolute paths from src
import { useForms } from '@/features/email-marketing/hooks/useForms'
import { EmailForm } from '@/features/email-marketing/types'
```

### 3. Import Order
```tsx
// ❌ BEFORE - Wrong order
import { Button } from '@/shared/components/ui/button'
import { useState } from 'react'
import type { EmailForm } from '../types'

// ✅ AFTER - Standard order: React → External → Internal → Types
import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import type { EmailForm } from '../types'
```

### 4. Unused Imports
```tsx
// ❌ BEFORE - Unused imports
import { useState, useEffect, useMemo } from 'react'  // useEffect unused
import { Button, Card, Badge } from '@/shared/components/ui'  // Badge unused

// ✅ AFTER - Only used imports
import { useState, useMemo } from 'react'
import { Button, Card } from '@/shared/components/ui'
```

### 5. Duplicate Imports
```tsx
// ❌ BEFORE - Duplicate imports
import { Button } from '@/shared/components/ui/button'
import { Button } from '@/shared/components/ui'

// ✅ AFTER - Single import
import { Button } from '@/shared/components/ui/button'
```

### 6. Type-Only Imports
```tsx
// ❌ BEFORE - Regular import for types
import { EmailForm, EmailFormStatus } from '../types'

// ✅ AFTER - Type-only import
import type { EmailForm, EmailFormStatus } from '../types'
```

---

## 📐 Standard Import Order

### 1. React Imports
```tsx
import React, { useState, useEffect, useMemo } from 'react'
```

### 2. External Libraries
```tsx
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
```

### 3. Internal Absolute Imports (from @/)
```tsx
import { Button } from '@/shared/components/ui/button'
import { useForms } from '@/features/email-marketing/hooks/useForms'
```

### 4. Internal Relative Imports
```tsx
import { FormListView } from '../components/forms/FormListView'
import type { EmailForm } from '../../types'
```

### 5. Type-Only Imports (at end)
```tsx
import type { EmailForm, EmailFormStatus } from '../types'
```

### 6. Side-Effect Imports (last)
```tsx
import './Component.css'
```

---

## 🔍 Detection Patterns

### Broken Paths to Detect
- Relative paths with `../` going too deep (3+ levels)
- Paths referencing moved/deleted files
- Case-sensitive path mismatches
- Missing file extensions in imports

### Import Issues to Fix
- Wrong import order
- Unused imports (detected via static analysis)
- Duplicate imports from same source
- Type imports not using `import type`
- Mixed default and named imports

---

## ✅ Standard Import Patterns

### React Components
```tsx
// ✅ CORRECT - Standard React component imports
import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { FormListView } from '../components/forms/FormListView'
import type { EmailForm } from '../../types'
```

### Hooks
```tsx
// ✅ CORRECT - Hook imports
import { useState, useEffect, useCallback } from 'react'
import { useForms } from '@/features/email-marketing/hooks/useForms'
import type { UseFormsReturn } from '@/features/email-marketing/hooks/useForms'
```

### Types
```tsx
// ✅ CORRECT - Type-only imports
import type { EmailForm, EmailFormStatus } from '../types'
import type { ComponentProps } from '@/shared/types'
```

### Utilities
```tsx
// ✅ CORRECT - Utility imports
import { formatCurrency } from '@/shared/utils/format'
import { validateEmail } from '@/shared/utils/validation'
```

---

## 🛠️ Fix Process

### Step 1: Detection
1. Scan file for all import statements
2. Check if import paths resolve correctly
3. Detect unused imports (static analysis)
4. Identify import order violations
5. Find duplicate imports

### Step 2: Analysis
1. Map relative paths to absolute paths (when appropriate)
2. Verify file existence for all imports
3. Check for unused imports
4. Identify type-only imports
5. Group imports by category

### Step 3: Fixes
1. Fix broken import paths
2. Convert deep relative paths to absolute
3. Remove unused imports
4. Reorder imports to standard order
5. Convert type imports to `import type`
6. Remove duplicate imports

### Step 4: Verification
1. Verify all imports resolve
2. Check import order is correct
3. Ensure no unused imports remain
4. Validate type imports use `import type`

---

## 📋 Checklist

When fixing imports, verify:

### Path Correctness
- [ ] All import paths resolve correctly
- [ ] No broken paths after component relocation
- [ ] Absolute paths use `@/` alias correctly
- [ ] Relative paths are minimal (prefer absolute)

### Import Order
- [ ] React imports first
- [ ] External libraries second
- [ ] Internal absolute imports third
- [ ] Internal relative imports fourth
- [ ] Type-only imports at end
- [ ] Side-effect imports last

### Import Quality
- [ ] No unused imports
- [ ] No duplicate imports
- [ ] Type imports use `import type`
- [ ] Grouped by source (blank lines between groups)

---

## 🔄 Common Fixes

### Fix 1: Broken Path After Relocation
```tsx
// ❌ BEFORE - Component moved but import not updated
import { MyComponent } from '../../../shared/components/MyComponent'

// ✅ AFTER - Updated to new location
import { MyComponent } from '@/features/email-marketing/components/MyComponent'
```

### Fix 2: Deep Relative Path
```tsx
// ❌ BEFORE - Too many ../ levels
import { useForms } from '../../../../hooks/useForms'

// ✅ AFTER - Absolute path
import { useForms } from '@/features/email-marketing/hooks/useForms'
```

### Fix 3: Import Order
```tsx
// ❌ BEFORE - Wrong order
import { Button } from '@/shared/components/ui/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ✅ AFTER - Correct order
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
```

### Fix 4: Unused Imports
```tsx
// ❌ BEFORE - Unused imports
import { useState, useEffect, useMemo } from 'react'  // useEffect unused

// ✅ AFTER - Only used imports
import { useState, useMemo } from 'react'
```

### Fix 5: Type-Only Import
```tsx
// ❌ BEFORE - Regular import for types only
import { EmailForm, EmailFormStatus } from '../types'

// ✅ AFTER - Type-only import
import type { EmailForm, EmailFormStatus } from '../types'
```

---

## ⚠️ Important Notes

### What NOT to Fix
- **Dynamic imports** - `import()` statements are intentional
- **Conditional imports** - May be required for code splitting
- **Third-party imports** - Don't modify node_modules imports
- **Generated code** - Skip auto-generated files

### Safety Checks
- Always verify imports resolve after fixing
- Check for circular dependencies
- Ensure no functionality breaks
- Test build after import fixes

---

## 🔗 Related Commands

- `/cleanup-unused-code` - Also removes unused imports
- `/relocate-component` - Updates imports after component move
- `/fix-formatting-issues` - May include import fixes

---

## 📊 Report Format

```
📦 Import Path Fix Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: src/features/email-marketing/components/templates/TemplateList.tsx

Issues Found: 12
Fixes Applied: 12

🔴 CRITICAL - Line 5
  Issue: Broken import path after component relocation
  Fix: Updated to '@/shared/components/ui/button'

🟡 IMPORTANT - Line 10
  Issue: Deep relative path (../../../../)
  Fix: Converted to absolute path '@/features/email-marketing/hooks/useForms'

🟢 MINOR - Line 15
  Issue: Unused import 'useEffect'
  Fix: Removed from import statement

🟢 MINOR - Line 20
  Issue: Wrong import order
  Fix: Reordered to standard: React → External → Internal

Summary:
- Fixed 3 broken paths
- Converted 5 relative to absolute paths
- Removed 2 unused imports
- Reordered all imports
- Converted 2 type imports to 'import type'
```

---

## 🎯 Import Path Rules

### When to Use Absolute Paths (`@/`)
- Imports from `src/shared/`
- Imports from other features
- Imports that would require 3+ `../` levels

### When to Use Relative Paths
- Imports within same feature directory
- Imports from parent/sibling directories (1-2 levels)
- Type imports from nearby files

### Path Alias Configuration
```
@/ → src/
```

---

**Ready to fix import paths!** Run `/fix-import-paths [path]` to standardize imports across your codebase. 🚀

