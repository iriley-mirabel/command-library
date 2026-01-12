---
name: add-filter-all-option
description: Add "All" option to filter dropdowns that are missing it
---

# ➕ Add Filter "All" Option - Standardize Filter Options

## Purpose

Detect filter dropdowns without an "All" option and add it. This command ensures all filters have a standard "All" option for showing unfiltered results.

**Note:** This command handles case sensitivity ('all' vs 'ALL') and updates default filter values.

---

## 📋 Usage

```
/add-filter-all-option [path-to-component]
```

**Examples:**
```
/add-filter-all-option src/features/email-marketing/pages/FormsPage.tsx
/add-filter-all-option src/features/subscription-management/components/PlanFilters.tsx
```

---

## 🎯 What This Command Does

### 1. Adds "All" Option to Filter Arrays
```tsx
// ❌ BEFORE - Missing "All" option
const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DRAFT', label: 'Draft' },
]

// ✅ AFTER - "All" option added
const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DRAFT', label: 'Draft' },
]
```

### 2. Updates Enum/Type Definitions
```tsx
// ❌ BEFORE - Missing "ALL" in type
export type EmailFormStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED'

// ✅ AFTER - "ALL" added to type
export type EmailFormStatus = 'ALL' | 'DRAFT' | 'ACTIVE' | 'PAUSED'
```

### 3. Handles Case Sensitivity
```tsx
// ❌ BEFORE - Inconsistent case
const filterValue = statusFilter === 'ALL' ? 'all' : statusFilter

// ✅ AFTER - Proper case handling
const filterValue = statusFilter === 'ALL' ? 'all' : statusFilter
const filterOptions = [
  { value: 'all', label: 'All' },  // Lowercase for EnhancedFilterBar
  { value: 'ACTIVE', label: 'Active' },
]
```

### 4. Updates Default Filter Values
```tsx
// ❌ BEFORE - No default or wrong default
const [statusFilter, setStatusFilter] = useState<EmailFormStatus>('ACTIVE')

// ✅ AFTER - Default to "All"
const [statusFilter, setStatusFilter] = useState<EmailFormStatus | 'ALL'>('ALL')
```

---

## 🔍 Detection Patterns

### Filters to Detect
- Filter option arrays without "All" or "ALL"
- Enum/type definitions missing "ALL"
- Filter dropdowns in `EnhancedFilterBar` or `SimpleFilterBar`
- Custom filter implementations

### Case Sensitivity Rules
- **EnhancedFilterBar** uses lowercase `'all'` for display
- **Internal state** can use uppercase `'ALL'`
- **Conversion** needed: `value === 'ALL' ? 'all' : value`

---

## ✅ Standard Filter Pattern

### Complete Filter Implementation
```tsx
// ✅ CORRECT - Filter with "All" option
const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PAUSED', label: 'Paused' },
]

export function MyPage() {
  const [statusFilter, setStatusFilter] = useState<EmailFormStatus | 'ALL'>('ALL')
  
  return (
    <EnhancedFilterBar
      filters={[
        {
          id: 'status',
          placeholder: 'All Status',
          value: statusFilter === 'ALL' ? 'all' : statusFilter,
          options: STATUS_OPTIONS,
          onChange: (value) => {
            setStatusFilter((value === 'all' ? 'ALL' : value) as EmailFormStatus | 'ALL')
          }
        }
      ]}
    />
  )
}
```

---

## 🛠️ Fix Process

### Step 1: Detection
1. Scan file for filter option arrays
2. Check for "All" or "ALL" option
3. Detect enum/type definitions
4. Find filter dropdown implementations
5. Check default filter values

### Step 2: Analysis
1. Identify which filters need "All" option
2. Determine case sensitivity requirements
3. Check current default values
4. Identify type definitions to update

### Step 3: Fixes
1. Add "All" option to filter arrays (first position)
2. Update enum/type definitions if needed
3. Update default filter values to "All"
4. Add case conversion logic if needed
5. Update filter onChange handlers

### Step 4: Verification
1. Verify "All" option appears in dropdown
2. Check default filter shows "All"
3. Ensure filtering works correctly
4. Verify case handling is correct

---

## 📋 Checklist

When adding "All" option, verify:

### Filter Options
- [ ] "All" option is first in array
- [ ] "All" uses lowercase 'all' for EnhancedFilterBar
- [ ] All filter options are present
- [ ] Options are properly formatted

### Type Definitions
- [ ] Type includes 'ALL' if needed
- [ ] Type allows 'ALL' in filter state
- [ ] Type conversions are correct

### Default Values
- [ ] Default filter value is 'ALL' or 'all'
- [ ] Initial state shows "All" selected
- [ ] Filter resets to "All" correctly

### Case Handling
- [ ] Conversion from 'ALL' to 'all' for display
- [ ] Conversion from 'all' to 'ALL' for state
- [ ] onChange handler handles both cases

---

## 🔄 Common Fixes

### Fix 1: Add "All" to Filter Array
```tsx
// ❌ BEFORE
const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DRAFT', label: 'Draft' },
]

// ✅ AFTER
const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DRAFT', label: 'Draft' },
]
```

### Fix 2: Update Type Definition
```tsx
// ❌ BEFORE
export type EmailFormStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED'
const [statusFilter, setStatusFilter] = useState<EmailFormStatus>('ACTIVE')

// ✅ AFTER
export type EmailFormStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED'
const [statusFilter, setStatusFilter] = useState<EmailFormStatus | 'ALL'>('ALL')
```

### Fix 3: Add Case Conversion
```tsx
// ❌ BEFORE
<EnhancedFilterBar
  filters={[{
    id: 'status',
    value: statusFilter,
    options: STATUS_OPTIONS,
    onChange: setStatusFilter,
  }]}
/>

// ✅ AFTER
<EnhancedFilterBar
  filters={[{
    id: 'status',
    placeholder: 'All Status',
    value: statusFilter === 'ALL' ? 'all' : statusFilter,
    options: STATUS_OPTIONS,
    onChange: (value) => {
      setStatusFilter((value === 'all' ? 'ALL' : value) as EmailFormStatus | 'ALL')
    }
  }]}
/>
```

### Fix 4: Update Database/Backend Filters
```tsx
// ❌ BEFORE - Backend filter without "All"
const filterOptions = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DRAFT', label: 'Draft' },
]

// ✅ AFTER - Backend filter with "All"
const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DRAFT', label: 'Draft' },
]

// In filter function
if (statusFilter !== 'all' && statusFilter !== 'ALL') {
  result = result.filter(item => item.status === statusFilter)
}
```

---

## ⚠️ Important Notes

### Case Sensitivity Rules
- **EnhancedFilterBar** expects lowercase `'all'` for "All" option
- **Internal state** can use uppercase `'ALL'` for consistency
- **Conversion** must happen at filter bar boundary
- **Database queries** should handle both cases

### What NOT to Change
- **Existing filter logic** - Don't break working filters
- **Backend filters** - May need separate handling
- **Custom filter implementations** - May have different patterns

### Safety Checks
- Always verify filter still works after adding "All"
- Check default behavior shows all items
- Ensure filtering logic handles "All" correctly
- Test filter reset functionality

---

## 🔗 Related Commands

- `/fix-filter-bar` - May add "All" option as part of filter bar fixes
- `/fix-formatting-issues` - Comprehensive formatting fixes

---

## 📊 Report Format

```
➕ Filter "All" Option Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: src/features/email-marketing/pages/FormsPage.tsx

Issues Found: 2
Fixes Applied: 2

🔴 CRITICAL - Line 42
  Issue: STATUS_OPTIONS missing "All" option
  Fix: Added { value: 'all', label: 'All' } as first option

🟡 IMPORTANT - Line 55
  Issue: Default filter value is 'ACTIVE' instead of 'ALL'
  Fix: Changed default to 'ALL' and added type union

Summary:
- Added "All" option to 1 filter array
- Updated 1 type definition
- Updated 1 default filter value
- Added case conversion logic
```

---

## 🎯 Filter "All" Option Rules

### Option Format
- **Value:** `'all'` (lowercase for EnhancedFilterBar)
- **Label:** `'All'` (capitalized)
- **Position:** First in array
- **Case:** Lowercase for display, uppercase for state (optional)

### State Management
- Default value should be `'ALL'` or `'all'`
- Type should allow `'ALL'` in union type
- Conversion needed at filter bar boundary

### Filter Logic
- Check for `'all'` or `'ALL'` before filtering
- If "All" selected, show all items (no filter applied)
- Reset filter should set to "All"

---

**Ready to add "All" options!** Run `/add-filter-all-option [path]` to standardize filter options. 🚀

