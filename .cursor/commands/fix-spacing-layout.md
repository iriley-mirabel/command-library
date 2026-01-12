---
name: fix-spacing-layout
description: Fix spacing and layout issues by converting hardcoded values to design tokens
---

# 🎨 Fix Spacing & Layout - Standardize Spacing with Design Tokens

## Purpose

Detect and fix spacing inconsistencies, hardcoded pixel values, and layout issues by converting them to design tokens. This command ensures all spacing uses the centralized design system.

**Note:** This command works on both single files and entire directories.

---

## 📋 Usage

```
/fix-spacing-layout [path-to-file-or-directory]
```

**Examples:**
```
/fix-spacing-layout src/features/email-marketing/components/templates/TemplateList.tsx
/fix-spacing-layout src/features/subscription-management/
/fix-spacing-layout src/shared/components/ui/
```

---

## 🎯 What This Command Fixes

### 1. Hardcoded Pixel Values
```tsx
// ❌ BEFORE
<div className="p-4 m-2 gap-3" style={{ padding: '16px', margin: '12px' }}>

// ✅ AFTER
<div className="p-4 m-3 gap-3">
```

### 2. Inconsistent Spacing
```tsx
// ❌ BEFORE - Mixed spacing values
<div className="p-3 m-4 gap-2">
  <div className="p-5 m-2 gap-4">

// ✅ AFTER - Consistent spacing scale
<div className="p-4 m-4 gap-3">
  <div className="p-4 m-3 gap-3">
```

### 3. Inline Style Spacing
```tsx
// ❌ BEFORE
<div style={{ padding: '16px', margin: '8px', gap: '12px' }}>

// ✅ AFTER
<div className="p-4 m-2 gap-3">
```

### 4. Layout Alignment Issues
```tsx
// ❌ BEFORE - Inconsistent flex/grid gaps
<div className="flex gap-2">
  <div className="grid gap-4">

// ✅ AFTER - Standardized gaps
<div className="flex gap-3">
  <div className="grid gap-3">
```

### 5. Padding/Margin Inconsistencies
```tsx
// ❌ BEFORE - Random spacing values
<div className="p-5 m-3">
<div className="p-6 m-4">

// ✅ AFTER - Standard spacing scale
<div className="p-4 m-3">
<div className="p-4 m-4">
```

---

## 🔍 Detection Patterns

### Hardcoded Values to Detect
- Inline styles with `padding`, `margin`, `gap`, `spacing`
- Hardcoded pixel values in className (if not using Tailwind)
- Inconsistent spacing scale usage
- Mixed spacing units (px, rem, em)

### Design Token Mapping
```
4px   → space-1   (p-1, m-1, gap-1)
8px   → space-2   (p-2, m-2, gap-2)
12px  → space-3   (p-3, m-3, gap-3)
16px  → space-4   (p-4, m-4, gap-4)
24px  → space-6   (p-6, m-6, gap-6)
32px  → space-8   (p-8, m-8, gap-8)
48px  → space-12  (p-12, m-12, gap-12)
64px  → space-16  (p-16, m-16, gap-16)
```

---

## ✅ Standard Spacing Patterns

### Form Fields
```tsx
// ✅ CORRECT - Standard form spacing
<div className="space-y-3">  {/* 12px gap between fields */}
  <Label className="text-ocean-600">Name</Label>
  <Input className="h-10" />  {/* 40px height */}
</div>
```

### Card Layouts
```tsx
// ✅ CORRECT - Standard card spacing
<Card className="p-4">  {/* 16px padding */}
  <CardHeader className="pb-3">  {/* 12px bottom padding */}
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">  {/* 12px gap */}
    {/* Content */}
  </CardContent>
</Card>
```

### Grid Layouts
```tsx
// ✅ CORRECT - Standard grid spacing
<div className="grid grid-cols-3 gap-6">  {/* 24px gap */}
  {/* Grid items */}
</div>
```

### Flex Layouts
```tsx
// ✅ CORRECT - Standard flex spacing
<div className="flex items-center gap-3">  {/* 12px gap */}
  <Button>Action</Button>
  <Button>Action</Button>
</div>
```

---

## 🛠️ Fix Process

### Step 1: Detection
1. Scan file for inline styles with spacing properties
2. Detect hardcoded pixel values in className attributes
3. Identify inconsistent spacing patterns
4. Find mixed spacing units

### Step 2: Analysis
1. Map hardcoded values to nearest design token
2. Identify spacing scale violations
3. Check for alignment issues
4. Verify Tailwind class usage

### Step 3: Fixes
1. Replace inline styles with Tailwind classes
2. Convert hardcoded px to design token scale
3. Standardize spacing values
4. Fix alignment issues
5. Ensure consistent gap values

### Step 4: Verification
1. Check all spacing uses design tokens
2. Verify no hardcoded values remain
3. Ensure consistent spacing scale
4. Validate layout still works

---

## 📋 Checklist

When fixing spacing, verify:

### Spacing Consistency
- [ ] All spacing uses design token scale (space-1 through space-16)
- [ ] No hardcoded pixel values in inline styles
- [ ] Consistent gap values in flex/grid layouts
- [ ] Padding/margin follows standard patterns

### Layout Alignment
- [ ] Elements properly aligned
- [ ] Consistent spacing between related elements
- [ ] Proper spacing in forms (space-y-3)
- [ ] Card padding follows standard (p-4)

### Design Token Compliance
- [ ] No `style={{ padding: '...' }}` with hardcoded values
- [ ] No `style={{ margin: '...' }}` with hardcoded values
- [ ] No `style={{ gap: '...' }}` with hardcoded values
- [ ] All spacing uses Tailwind classes or CSS variables

---

## 🔄 Common Fixes

### Fix 1: Inline Style to Tailwind
```tsx
// ❌ BEFORE
<div style={{ padding: '16px', margin: '12px' }}>

// ✅ AFTER
<div className="p-4 m-3">
```

### Fix 2: Standardize Gap Values
```tsx
// ❌ BEFORE
<div className="flex gap-2">
  <div className="grid gap-5">

// ✅ AFTER
<div className="flex gap-3">
  <div className="grid gap-3">
```

### Fix 3: Form Field Spacing
```tsx
// ❌ BEFORE
<div>
  <label>Name</label>
  <input />
  <label>Email</label>
  <input />
</div>

// ✅ AFTER
<div className="space-y-3">
  <Label>Name</Label>
  <Input />
  <Label>Email</Label>
  <Input />
</div>
```

### Fix 4: Card Spacing
```tsx
// ❌ BEFORE
<Card>
  <div style={{ padding: '20px' }}>
    <h2>Title</h2>
    <p>Content</p>
  </div>
</Card>

// ✅ AFTER
<Card className="p-4">
  <CardHeader className="pb-3">
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
</Card>
```

---

## ⚠️ Important Notes

### What NOT to Fix
- **Intentional spacing** - If spacing is intentionally non-standard for design reasons
- **Third-party components** - Don't modify node_modules
- **Generated code** - Skip auto-generated files
- **Complex calculations** - Dynamic spacing based on calculations

### Safety Checks
- Always preserve functionality
- Test layout after fixes
- Verify responsive behavior
- Check for visual regressions

---

## 🔗 Related Commands

- `/fix-filter-bar` - May fix spacing in filter bars
- `/fix-form-fields` - Includes form spacing fixes
- `/audit-design-tokens` - Comprehensive design token audit
- `/fix-formatting-issues` - Master command for all formatting

---

## 📊 Report Format

```
🎨 Spacing & Layout Fix Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: src/features/email-marketing/components/templates/TemplateList.tsx

Issues Found: 8
Fixes Applied: 8

🔴 CRITICAL - Line 45
  Issue: Inline style with hardcoded padding
  Fix: Converted to className="p-4"

🟡 IMPORTANT - Line 120
  Issue: Inconsistent gap values (gap-2 and gap-5)
  Fix: Standardized to gap-3

🟢 MINOR - Line 200
  Issue: Hardcoded margin in style
  Fix: Converted to className="m-3"

Summary:
- Removed 5 inline styles
- Standardized 8 spacing values
- Fixed 3 alignment issues
```

---

**Ready to fix spacing issues!** Run `/fix-spacing-layout [path]` to standardize spacing across your codebase. 🚀

