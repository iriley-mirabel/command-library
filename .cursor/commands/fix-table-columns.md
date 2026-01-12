---
name: fix-table-columns
description: Standardize table column definitions with proper width, sortable, and resizable settings
---

# 📊 Fix Table Columns - Standardize Column Definitions

## Purpose

Detect and fix table column definitions to ensure they have proper width, sortable, resizable, and other standard properties. This command standardizes column configurations for EnhancedDataTable.

**Note:** This command works on components with EnhancedDataTable column definitions.

---

## 📋 Usage

```
/fix-table-columns [path-to-component]
```

**Examples:**
```
/fix-table-columns src/features/email-marketing/components/forms/FormListView.tsx
/fix-table-columns src/features/subscription-management/components/PlansTableView.tsx
```

---

## 🎯 What This Command Fixes

### 1. Missing Column Properties
```tsx
// ❌ BEFORE - Missing properties
{
  id: 'name',
  header: 'Name',
  accessor: 'name',
}

// ✅ AFTER - Complete properties
{
  id: 'name',
  header: 'Name',
  accessor: 'name',
  sortable: true,
  resizable: true,
  width: 200,
  minWidth: 150,
  maxWidth: 300,
}
```

### 2. Inconsistent Column Widths
```tsx
// ❌ BEFORE - No width specified
{
  id: 'name',
  header: 'Name',
  accessor: 'name',
}

// ✅ AFTER - Proper width settings
{
  id: 'name',
  header: 'Name',
  accessor: 'name',
  width: 200,
  minWidth: 150,
  maxWidth: 300,
}
```

### 3. Missing Sortable/Filterable Flags
```tsx
// ❌ BEFORE - Missing flags
{
  id: 'status',
  header: 'Status',
  accessor: 'status',
}

// ✅ AFTER - With flags
{
  id: 'status',
  header: 'Status',
  accessor: 'status',
  sortable: true,
  filterable: true,
}
```

### 4. Column Alignment
```tsx
// ❌ BEFORE - No alignment
{
  id: 'amount',
  header: 'Amount',
  accessor: 'amount',
}

// ✅ AFTER - Right-aligned for numbers
{
  id: 'amount',
  header: 'Amount',
  accessor: 'amount',
  align: 'right',
  sortable: true,
}
```

---

## 🔍 Detection Patterns

### Column Issues to Detect
- Missing `sortable` flag (should be true for data columns)
- Missing `resizable` flag (should be true for data columns)
- Missing width properties (width, minWidth, maxWidth)
- Missing alignment (right for numbers, center for badges)
- Missing `filterable` flag (if filtering is needed)

### Standard Column Patterns
- **Text columns:** sortable, resizable, width 150-300px
- **Number columns:** sortable, resizable, right-aligned, width 100-150px
- **Status columns:** sortable, center-aligned, width 100-150px
- **Action columns:** not sortable, not resizable, fixed width 50px

---

## ✅ Standard Column Definitions

### Complete Column Implementation
```tsx
// ✅ CORRECT - Standard column definitions
const columns: ColumnDefinition<EmailForm>[] = useMemo(() => [
  {
    id: 'selection',
    header: (
      <Checkbox
        checked={allSelected}
        onCheckedChange={onSelectAll}
      />
    ),
    accessor: () => null,
    sortable: false,
    resizable: false,
    width: 50,
    minWidth: 50,
    align: 'center' as const,
    render: (_: unknown, row: EmailForm) => (
      <Checkbox
        checked={isSelected(row.id)}
        onCheckedChange={() => onSelectForm?.(row.id)}
      />
    ),
  },
  {
    id: 'name',
    header: 'Form Name',
    accessor: 'name',
    sortable: true,
    resizable: true,
    width: 250,
    minWidth: 200,
    maxWidth: 300,
    render: (_: unknown, row: EmailForm) => (
      <div className="font-medium text-gray-900">{row.name}</div>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    sortable: true,
    resizable: true,
    width: 120,
    minWidth: 100,
    align: 'center' as const,
    render: (_: unknown, row: EmailForm) => (
      <Badge className={STATUS_COLORS[row.status]}>
        {STATUS_LABELS[row.status]}
      </Badge>
    ),
  },
  {
    id: 'submissions',
    header: 'Submissions',
    accessor: 'submissionCount',
    sortable: true,
    resizable: true,
    width: 120,
    minWidth: 100,
    align: 'right' as const,
    render: (_: unknown, row: EmailForm) => (
      <span className="text-sm text-gray-900">
        {row.submissionCount.toLocaleString()}
      </span>
    ),
  },
], [allSelected, onSelectAll, onSelectForm, isSelected])
```

---

## 🛠️ Fix Process

### Step 1: Detection
1. Scan file for column definitions
2. Check for missing properties
3. Detect inconsistent widths
4. Find missing sortable/resizable flags
5. Check alignment settings

### Step 2: Analysis
1. Identify column types (text, number, status, action)
2. Determine appropriate widths
3. Check which columns should be sortable
4. Identify alignment needs
5. Check for filterable columns

### Step 3: Fixes
1. Add missing width properties
2. Add sortable/resizable flags
3. Set proper alignment
4. Add filterable flag if needed
5. Standardize render functions

### Step 4: Verification
1. Verify all columns have required properties
2. Check widths are appropriate
3. Ensure sortable flags are correct
4. Verify alignment is set properly

---

## 📋 Checklist

When fixing table columns, verify:

### Column Properties
- [ ] All columns have `id`, `header`, `accessor`
- [ ] Data columns have `sortable: true`
- [ ] Data columns have `resizable: true`
- [ ] All columns have width properties
- [ ] Action columns have `sortable: false`

### Width Settings
- [ ] Text columns: width 150-300px
- [ ] Number columns: width 100-150px
- [ ] Status columns: width 100-150px
- [ ] Action columns: width 50px
- [ ] minWidth and maxWidth set appropriately

### Alignment
- [ ] Text columns: left-aligned (default)
- [ ] Number columns: right-aligned
- [ ] Status columns: center-aligned
- [ ] Action columns: center-aligned

---

## 🔄 Common Fixes

### Fix 1: Add Missing Properties
```tsx
// ❌ BEFORE - Missing properties
{
  id: 'name',
  header: 'Name',
  accessor: 'name',
}

// ✅ AFTER - Complete properties
{
  id: 'name',
  header: 'Name',
  accessor: 'name',
  sortable: true,
  resizable: true,
  width: 200,
  minWidth: 150,
  maxWidth: 300,
}
```

### Fix 2: Set Proper Widths
```tsx
// ❌ BEFORE - No width
{
  id: 'amount',
  header: 'Amount',
  accessor: 'amount',
}

// ✅ AFTER - Proper width
{
  id: 'amount',
  header: 'Amount',
  accessor: 'amount',
  sortable: true,
  resizable: true,
  width: 120,
  minWidth: 100,
  align: 'right' as const,
}
```

### Fix 3: Fix Alignment
```tsx
// ❌ BEFORE - No alignment
{
  id: 'status',
  header: 'Status',
  accessor: 'status',
}

// ✅ AFTER - Center-aligned
{
  id: 'status',
  header: 'Status',
  accessor: 'status',
  sortable: true,
  resizable: true,
  width: 120,
  minWidth: 100,
  align: 'center' as const,
}
```

### Fix 4: Action Column
```tsx
// ❌ BEFORE - Missing properties
{
  id: 'actions',
  header: '',
  accessor: () => null,
}

// ✅ AFTER - Proper action column
{
  id: 'actions',
  header: '',
  accessor: () => null,
  sortable: false,
  resizable: false,
  width: 50,
  minWidth: 50,
  align: 'center' as const,
  render: (_: unknown, row: Item) => (
    <DropdownMenu>
      {/* Actions */}
    </DropdownMenu>
  ),
}
```

---

## ⚠️ Important Notes

### Column Type Guidelines
- **Text columns:** sortable, resizable, left-aligned, width 150-300px
- **Number columns:** sortable, resizable, right-aligned, width 100-150px
- **Status columns:** sortable, resizable, center-aligned, width 100-150px
- **Date columns:** sortable, resizable, left-aligned, width 150-200px
- **Action columns:** not sortable, not resizable, center-aligned, width 50px

### What NOT to Change
- **Custom render functions** - Don't modify working render logic
- **Complex columns** - May have specific requirements
- **Third-party table columns** - Don't modify library columns

### Safety Checks
- Always verify table still works after fixes
- Check column widths are appropriate
- Ensure sorting works correctly
- Test column resizing

---

## 🔗 Related Commands

- `/fix-data-table` - Comprehensive table fixes
- `/standardize-status-badges` - Status column badge fixes

---

## 📊 Report Format

```
📊 Table Columns Fix Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: src/features/email-marketing/components/forms/FormListView.tsx

Issues Found: 8
Fixes Applied: 8

🔴 CRITICAL - Line 130
  Issue: Column 'name' missing sortable and resizable flags
  Fix: Added sortable: true, resizable: true

🟡 IMPORTANT - Line 140
  Issue: Column 'amount' missing width properties
  Fix: Added width: 120, minWidth: 100, align: 'right'

🟢 MINOR - Line 150
  Issue: Column 'status' missing alignment
  Fix: Added align: 'center'

Summary:
- Added sortable/resizable to 5 columns
- Added width properties to 6 columns
- Fixed alignment on 3 columns
- Standardized 8 column definitions
```

---

## 🎯 Column Definition Rules

### Required Properties
- `id` - Unique column identifier
- `header` - Column header text or component
- `accessor` - Data accessor (key or function)

### Standard Properties
- `sortable: true` - For data columns
- `resizable: true` - For data columns
- `width` - Default width in pixels
- `minWidth` - Minimum resize width
- `maxWidth` - Maximum resize width
- `align` - 'left' | 'center' | 'right'

### Column Types
- **Text:** width 150-300px, left-aligned
- **Number:** width 100-150px, right-aligned
- **Status:** width 100-150px, center-aligned
- **Date:** width 150-200px, left-aligned
- **Action:** width 50px, center-aligned, not sortable

---

**Ready to fix table columns!** Run `/fix-table-columns [path]` to standardize column definitions. 🚀

