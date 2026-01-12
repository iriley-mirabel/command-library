---
name: fix-navigation-routes
description: Fix broken route paths, update route definitions, and standardize navigation
---

# 🧭 Fix Navigation Routes - Standardize Route Definitions

## Purpose

Detect broken route paths, update route definitions, fix navigation logic, and standardize route naming. This command ensures all routes are properly defined and navigation works correctly.

**Note:** This command works at module-level since routes are usually centralized.

---

## 📋 Usage

```
/fix-navigation-routes [path-to-routes-file-or-module]
```

**Examples:**
```
/fix-navigation-routes src/features/email-marketing/routes.tsx
/fix-navigation-routes src/features/subscription-management/
```

---

## 🎯 What This Command Fixes

### 1. Broken Route Paths
```tsx
// ❌ BEFORE - Broken path
navigate('/email-marketing/forms/edit')  // Missing form ID

// ✅ AFTER - Fixed path
navigate(`/email-marketing/forms/${formId}/edit`)
```

### 2. Route Definition Updates
```tsx
// ❌ BEFORE - Old route path
{
  path: '/email-marketing/templates',
  element: <TemplatesPage />,
}

// ✅ AFTER - Updated route path
{
  path: '/chargebrite/templates',
  element: <TemplatesPage />,
}
```

### 3. Navigation Logic
```tsx
// ❌ BEFORE - Hardcoded navigation
const handleEdit = () => {
  window.location.href = '/forms/edit'
}

// ✅ AFTER - Proper navigation
const handleEdit = (formId: string) => {
  navigate(`/email-marketing/forms/${formId}/edit`)
}
```

### 4. Route Naming
```tsx
// ❌ BEFORE - Inconsistent naming
'/email-marketing/forms'
'/email-marketing/form-list'
'/email-marketing/forms-list'

// ✅ AFTER - Standardized naming
'/email-marketing/forms'
'/email-marketing/forms'
'/email-marketing/forms'
```

---

## 🔍 Detection Patterns

### Route Issues to Detect
- Broken route paths (404 errors)
- Inconsistent route naming
- Hardcoded navigation (window.location)
- Missing route parameters
- Duplicate route definitions

### Navigation Patterns
- `navigate()` calls with broken paths
- `Link` components with wrong `to` props
- Route definitions with wrong paths
- Missing route parameters

---

## ✅ Standard Route Patterns

### Route Definitions
```tsx
// ✅ CORRECT - Standard route definition
{
  path: '/email-marketing/forms',
  element: <FormsPage />,
},
{
  path: '/email-marketing/forms/:id/edit',
  element: <FormEditPage />,
},
{
  path: '/email-marketing/forms/new',
  element: <FormCreatePage />,
}
```

### Navigation Calls
```tsx
// ✅ CORRECT - Proper navigation
const navigate = useNavigate()

const handleEdit = (formId: string) => {
  navigate(`/email-marketing/forms/${formId}/edit`)
}

const handleCreate = () => {
  navigate('/email-marketing/forms/new')
}
```

---

## 🛠️ Fix Process

### Step 1: Detection
1. Scan route definition files
2. Check for broken paths
3. Detect navigation calls
4. Find inconsistent naming
5. Check for missing parameters

### Step 2: Analysis
1. Identify all route definitions
2. Map navigation calls to routes
3. Check for broken references
4. Identify naming inconsistencies
5. Determine standard route structure

### Step 3: Fixes
1. Fix broken route paths
2. Update route definitions
3. Fix navigation calls
4. Standardize route naming
5. Add missing route parameters

### Step 4: Verification
1. Verify all routes resolve
2. Check navigation works
3. Ensure no broken links
4. Test route parameters

---

## 📋 Checklist

When fixing navigation routes, verify:

### Route Definitions
- [ ] All routes are properly defined
- [ ] Route paths are consistent
- [ ] Route parameters are correct
- [ ] No duplicate routes

### Navigation
- [ ] All navigate() calls use correct paths
- [ ] Link components have correct `to` props
- [ ] Route parameters are passed correctly
- [ ] No hardcoded window.location

### Naming
- [ ] Route paths follow consistent pattern
- [ ] Route names match feature structure
- [ ] No inconsistent naming

---

## 🔄 Common Fixes

### Fix 1: Update Route Path
```tsx
// ❌ BEFORE - Old path
{
  path: '/email-marketing/templates',
  element: <TemplatesPage />,
}

// ✅ AFTER - New path
{
  path: '/chargebrite/templates',
  element: <TemplatesPage />,
}
```

### Fix 2: Fix Navigation Call
```tsx
// ❌ BEFORE - Broken path
navigate('/forms/edit')

// ✅ AFTER - Correct path
navigate(`/email-marketing/forms/${formId}/edit`)
```

### Fix 3: Add Route Parameter
```tsx
// ❌ BEFORE - Missing parameter
{
  path: '/forms/edit',
  element: <FormEditPage />,
}

// ✅ AFTER - With parameter
{
  path: '/forms/:id/edit',
  element: <FormEditPage />,
}
```

---

## ⚠️ Important Notes

### What NOT to Change
- **Route structure** - Don't change overall routing architecture
- **Route guards** - Don't modify authentication/authorization
- **Route parameters** - Don't change parameter names if used elsewhere

### Safety Checks
- Always verify routes work after fixes
- Check navigation doesn't break
- Ensure route parameters are correct
- Test all route transitions

---

## 🔗 Related Commands

- `/fix-import-paths` - May fix route imports
- `/fix-formatting-issues` - Comprehensive fixes

---

## 📊 Report Format

```
🧭 Navigation Routes Fix Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Module: src/features/email-marketing/

Issues Found: 5
Fixes Applied: 5

🔴 CRITICAL - routes.tsx Line 45
  Issue: Broken route path '/email-marketing/templates'
  Fix: Updated to '/chargebrite/templates'

🟡 IMPORTANT - FormsPage.tsx Line 180
  Issue: Navigation call with broken path
  Fix: Updated to `/email-marketing/forms/${formId}/edit`

Summary:
- Fixed 2 broken route paths
- Updated 3 navigation calls
- Standardized route naming
```

---

**Ready to fix navigation routes!** Run `/fix-navigation-routes [path]` to standardize route definitions. 🚀

