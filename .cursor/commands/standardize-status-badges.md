---
name: standardize-status-badges
description: Standardize status badge colors and labels to use design tokens and consistent patterns
---

# 🏷️ Standardize Status Badges - Consistent Status Display

## Purpose

Detect inconsistent status badge colors and labels, and standardize them to use design tokens and consistent patterns. This command ensures all status badges follow the same color scheme and labeling.

**Note:** This command works on components and can detect patterns across modules.

---

## 📋 Usage

```
/standardize-status-badges [path-to-component-or-directory]
```

**Examples:**
```
/standardize-status-badges src/features/email-marketing/components/forms/FormListView.tsx
/standardize-status-badges src/features/subscription-management/
```

---

## 🎯 What This Command Fixes

### 1. Inconsistent Status Colors
```tsx
// ❌ BEFORE - Inconsistent colors
<Badge className="bg-blue-100 text-blue-800">Active</Badge>
<Badge className="bg-green-100 text-green-800">Active</Badge>

// ✅ AFTER - Standardized colors
<Badge className="bg-success-100 text-success-800">Active</Badge>
```

### 2. Status Color Mappings
```tsx
// ❌ BEFORE - Inconsistent mapping
const STATUS_COLORS = {
  ACTIVE: 'bg-blue-100 text-blue-800',
  DRAFT: 'bg-gray-100 text-gray-800',
}

// ✅ AFTER - Standardized mapping
const STATUS_COLORS: Record<EmailFormStatus, string> = {
  ACTIVE: 'bg-success-100 text-success-800',
  DRAFT: 'bg-gray-100 text-gray-800',
  PAUSED: 'bg-warning-100 text-warning-800',
  ARCHIVED: 'bg-gray-100 text-gray-600',
}
```

### 3. Status Labels
```tsx
// ❌ BEFORE - Inconsistent labels
<Badge>active</Badge>
<Badge>Active</Badge>
<Badge>ACTIVE</Badge>

// ✅ AFTER - Standardized labels
<Badge>{STATUS_LABELS[status]}</Badge>
// Where STATUS_LABELS = { ACTIVE: 'Active', DRAFT: 'Draft', ... }
```

### 4. Design Token Usage
```tsx
// ❌ BEFORE - Hardcoded colors
<Badge style={{ backgroundColor: '#10b981', color: '#fff' }}>Active</Badge>

// ✅ AFTER - Design tokens
<Badge className="bg-success-100 text-success-800">Active</Badge>
```

---

## 🎨 Standard Status Color Scheme

### Status Colors (Design Tokens)
```tsx
// ✅ CORRECT - Standard status color mappings
const STATUS_COLORS: Record<StatusType, string> = {
  // Success states (green)
  ACTIVE: 'bg-success-100 text-success-800',
  COMPLETED: 'bg-success-100 text-success-800',
  PUBLISHED: 'bg-success-100 text-success-800',
  
  // Warning states (amber/yellow)
  PENDING: 'bg-warning-100 text-warning-800',
  PAUSED: 'bg-warning-100 text-warning-800',
  DRAFT: 'bg-warning-100 text-warning-800',
  
  // Error states (red)
  FAILED: 'bg-error-100 text-error-800',
  CANCELLED: 'bg-error-100 text-error-800',
  REJECTED: 'bg-error-100 text-error-800',
  
  // Neutral states (gray)
  ARCHIVED: 'bg-gray-100 text-gray-600',
  INACTIVE: 'bg-gray-100 text-gray-600',
  DELETED: 'bg-gray-100 text-gray-500',
}
```

### Status Labels
```tsx
// ✅ CORRECT - Standard status labels
const STATUS_LABELS: Record<StatusType, string> = {
  ACTIVE: 'Active',
  DRAFT: 'Draft',
  PAUSED: 'Paused',
  ARCHIVED: 'Archived',
  // ... capitalize first letter, rest lowercase
}
```

---

## 🔍 Detection Patterns

### Inconsistencies to Detect
- Different colors for same status across files
- Hardcoded color values instead of design tokens
- Inconsistent label capitalization
- Missing status color mappings
- Non-standard color classes

### Standard Patterns to Enforce
- Success states → `bg-success-100 text-success-800`
- Warning states → `bg-warning-100 text-warning-800`
- Error states → `bg-error-100 text-error-800`
- Neutral states → `bg-gray-100 text-gray-600`

---

## ✅ Standard Badge Implementation

### Complete Badge Implementation
```tsx
// ✅ CORRECT - Standard status badge pattern
const STATUS_COLORS: Record<EmailFormStatus, string> = {
  ACTIVE: 'bg-success-100 text-success-800',
  DRAFT: 'bg-gray-100 text-gray-800',
  PAUSED: 'bg-warning-100 text-warning-800',
  ARCHIVED: 'bg-gray-100 text-gray-600',
}

const STATUS_LABELS: Record<EmailFormStatus, string> = {
  ACTIVE: 'Active',
  DRAFT: 'Draft',
  PAUSED: 'Paused',
  ARCHIVED: 'Archived',
}

// Usage
<Badge className={STATUS_COLORS[form.status]}>
  {STATUS_LABELS[form.status]}
</Badge>
```

---

## 🛠️ Fix Process

### Step 1: Detection
1. Scan file for status badge usage
2. Check for status color mappings
3. Detect inconsistent colors
4. Find hardcoded color values
5. Check label consistency

### Step 2: Analysis
1. Identify all status types in file
2. Map statuses to standard color scheme
3. Check for existing color mappings
4. Identify label inconsistencies
5. Determine design token usage

### Step 3: Fixes
1. Create/update STATUS_COLORS mapping
2. Create/update STATUS_LABELS mapping
3. Replace hardcoded colors with design tokens
4. Standardize badge usage
5. Update all badge instances

### Step 4: Verification
1. Verify all badges use standard colors
2. Check labels are consistent
3. Ensure design tokens are used
4. Verify no hardcoded colors remain

---

## 📋 Checklist

When standardizing status badges, verify:

### Color Mappings
- [ ] STATUS_COLORS constant defined
- [ ] All statuses mapped to standard colors
- [ ] Colors use design tokens (bg-*-100 text-*-800)
- [ ] No hardcoded color values

### Labels
- [ ] STATUS_LABELS constant defined
- [ ] Labels are capitalized (first letter)
- [ ] Labels are consistent across files
- [ ] Labels match status enum values

### Badge Usage
- [ ] Badges use STATUS_COLORS mapping
- [ ] Badges use STATUS_LABELS mapping
- [ ] Badge component from shared/ui
- [ ] No inline styles for colors

---

## 🔄 Common Fixes

### Fix 1: Standardize Color Mappings
```tsx
// ❌ BEFORE - Inconsistent colors
const STATUS_COLORS = {
  ACTIVE: 'bg-blue-100 text-blue-800',
  DRAFT: 'bg-gray-100 text-gray-800',
}

// ✅ AFTER - Standardized colors
const STATUS_COLORS: Record<EmailFormStatus, string> = {
  ACTIVE: 'bg-success-100 text-success-800',
  DRAFT: 'bg-gray-100 text-gray-800',
  PAUSED: 'bg-warning-100 text-warning-800',
  ARCHIVED: 'bg-gray-100 text-gray-600',
}
```

### Fix 2: Add Status Labels
```tsx
// ❌ BEFORE - No label mapping
<Badge className={STATUS_COLORS[status]}>
  {status}
</Badge>

// ✅ AFTER - With label mapping
const STATUS_LABELS: Record<EmailFormStatus, string> = {
  ACTIVE: 'Active',
  DRAFT: 'Draft',
  PAUSED: 'Paused',
  ARCHIVED: 'Archived',
}

<Badge className={STATUS_COLORS[status]}>
  {STATUS_LABELS[status]}
</Badge>
```

### Fix 3: Replace Hardcoded Colors
```tsx
// ❌ BEFORE - Hardcoded colors
<Badge style={{ backgroundColor: '#10b981', color: '#fff' }}>Active</Badge>

// ✅ AFTER - Design tokens
<Badge className="bg-success-100 text-success-800">Active</Badge>
```

### Fix 4: Standardize Badge Usage
```tsx
// ❌ BEFORE - Inconsistent usage
<Badge className="bg-blue-100">active</Badge>
<Badge className="bg-green-100">Active</Badge>

// ✅ AFTER - Standardized
<Badge className={STATUS_COLORS[status]}>
  {STATUS_LABELS[status]}
</Badge>
```

---

## ⚠️ Important Notes

### Status Color Semantics
- **Success (Green):** Active, Completed, Published, Success
- **Warning (Amber):** Pending, Paused, Draft, Warning
- **Error (Red):** Failed, Cancelled, Rejected, Error
- **Neutral (Gray):** Archived, Inactive, Deleted, Neutral

### What NOT to Change
- **Custom status colors** - If intentionally different for UX
- **Third-party components** - Don't modify library components
- **Status enum values** - Don't change enum definitions

### Safety Checks
- Always verify badges display correctly after fixes
- Check color contrast for accessibility
- Ensure labels are readable
- Test with all status values

---

## 🔗 Related Commands

- `/audit-design-tokens` - Comprehensive design token audit
- `/fix-table-columns` - May include status badge fixes in tables

---

## 📊 Report Format

```
🏷️ Status Badge Standardization Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: src/features/email-marketing/components/forms/FormListView.tsx

Issues Found: 6
Fixes Applied: 6

🔴 CRITICAL - Line 60
  Issue: Inconsistent status color (bg-blue-100 instead of bg-success-100)
  Fix: Updated to bg-success-100 text-success-800

🟡 IMPORTANT - Line 65
  Issue: Missing STATUS_LABELS mapping
  Fix: Added STATUS_LABELS constant with proper labels

🟢 MINOR - Line 120
  Issue: Hardcoded color in style attribute
  Fix: Replaced with design token classes

Summary:
- Standardized 4 status color mappings
- Added STATUS_LABELS constant
- Replaced 2 hardcoded colors with design tokens
- Updated 6 badge instances
```

---

## 🎯 Status Badge Rules

### Color Scheme
- Success states → `bg-success-100 text-success-800`
- Warning states → `bg-warning-100 text-warning-800`
- Error states → `bg-error-100 text-error-800`
- Neutral states → `bg-gray-100 text-gray-600`

### Labels
- Capitalize first letter, rest lowercase
- Match status enum value (but formatted)
- Use STATUS_LABELS constant for consistency

### Implementation
- Define STATUS_COLORS and STATUS_LABELS constants
- Use Record<StatusType, string> for type safety
- Always use Badge component from shared/ui
- Never use inline styles for colors

---

**Ready to standardize status badges!** Run `/standardize-status-badges [path]` to ensure consistent status display. 🚀

