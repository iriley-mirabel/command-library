---
name: fix-form-fields
description: Standardize form fields with Label component, proper spacing, and design tokens
---

# 📝 Fix Form Fields - Standardize Form Field Implementation

## Purpose

Standardize form field labels, placeholders, spacing, and styling to use design tokens and the Label component. This command ensures all form fields follow consistent patterns.

**Note:** This command works on form components and pages with forms.

---

## 📋 Usage

```
/fix-form-fields [path-to-component]
```

**Examples:**
```
/fix-form-fields src/features/email-marketing/components/forms/FormBuilder.tsx
/fix-form-fields src/features/subscription-management/components/PlanForm.tsx
```

---

## 🎯 What This Command Fixes

### 1. Standardize Labels
```tsx
// ❌ BEFORE - Plain label
<label>Name</label>
<input />

// ✅ AFTER - Label component with design token
<Label className="text-ocean-600">Name</Label>
<Input />
```

### 2. Fix Placeholder Text
```tsx
// ❌ BEFORE - Inconsistent placeholder
<input placeholder="Enter name" />
<input placeholder="name" />

// ✅ AFTER - Consistent placeholder format
<Input placeholder="Enter name" />
<Input placeholder="Enter email" />
```

### 3. Add Missing Validation
```tsx
// ❌ BEFORE - No validation
<Input value={name} onChange={(e) => setName(e.target.value)} />

// ✅ AFTER - With validation
<Input
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
  minLength={2}
/>
```

### 4. Fix Field Spacing
```tsx
// ❌ BEFORE - Inconsistent spacing
<div>
  <label>Name</label>
  <input />
  <label>Email</label>
  <input />
</div>

// ✅ AFTER - Standard spacing
<div className="space-y-3">
  <div className="space-y-2">
    <Label className="text-ocean-600">Name</Label>
    <Input className="h-10" />
  </div>
  <div className="space-y-2">
    <Label className="text-ocean-600">Email</Label>
    <Input className="h-10" />
  </div>
</div>
```

### 5. Ensure Design Token Usage
```tsx
// ❌ BEFORE - Hardcoded values
<input style={{ height: '40px', fontSize: '14px' }} />

// ✅ AFTER - Design tokens
<Input className="h-10 text-sm" />
```

---

## 🔍 Detection Patterns

### Labels to Fix
- Plain `<label>` tags (should use `Label` component)
- Missing labels on form fields
- Inconsistent label styling
- Labels without design token colors

### Placeholders to Fix
- Inconsistent placeholder formats
- Missing placeholders
- Placeholders that don't match label text

### Spacing to Fix
- Missing spacing between fields
- Inconsistent field spacing
- Missing spacing between label and input

### Validation to Add
- Required fields without `required` attribute
- Missing min/max length validation
- Missing type validation (email, number, etc.)

---

## ✅ Standard Form Field Pattern

### Complete Form Field Implementation
```tsx
// ✅ CORRECT - Standard form field
<div className="space-y-3">
  <div className="space-y-2">
    <Label htmlFor="name" className="text-ocean-600">
      Name
    </Label>
    <Input
      id="name"
      type="text"
      placeholder="Enter name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      minLength={2}
      className="h-10"
    />
  </div>
  
  <div className="space-y-2">
    <Label htmlFor="email" className="text-ocean-600">
      Email
    </Label>
    <Input
      id="email"
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="h-10"
    />
  </div>
</div>
```

---

## 🛠️ Fix Process

### Step 1: Detection
1. Scan file for form fields
2. Check label implementation
3. Detect placeholder consistency
4. Find spacing issues
5. Check for validation

### Step 2: Analysis
1. Identify fields needing Label component
2. Check placeholder formats
3. Identify spacing issues
4. Determine validation needs
5. Check design token usage

### Step 3: Fixes
1. Replace plain labels with Label component
2. Standardize placeholder text
3. Add proper spacing (space-y-3 for fields, space-y-2 for label-input)
4. Add validation attributes
5. Ensure design token usage

### Step 4: Verification
1. Verify labels use Label component
2. Check placeholder consistency
3. Ensure spacing is correct
4. Verify validation works
5. Check design token compliance

---

## 📋 Checklist

When fixing form fields, verify:

### Labels
- [ ] All labels use `Label` component
- [ ] Labels have `text-ocean-600` class (design token)
- [ ] Labels have `htmlFor` matching input `id`
- [ ] Label text is clear and descriptive

### Inputs
- [ ] Inputs use `Input` component (not plain `<input>`)
- [ ] Inputs have proper `type` attribute
- [ ] Inputs have consistent placeholder format
- [ ] Inputs have `className="h-10"` (design token)

### Spacing
- [ ] Fields have `space-y-3` between them
- [ ] Label-input pairs have `space-y-2`
- [ ] Form container has proper padding

### Validation
- [ ] Required fields have `required` attribute
- [ ] Fields have appropriate validation (minLength, maxLength, type)
- [ ] Error messages are displayed (if validation fails)

---

## 🔄 Common Fixes

### Fix 1: Replace Plain Label
```tsx
// ❌ BEFORE
<label>Name</label>
<input />

// ✅ AFTER
<Label htmlFor="name" className="text-ocean-600">Name</Label>
<Input id="name" />
```

### Fix 2: Standardize Placeholder
```tsx
// ❌ BEFORE
<Input placeholder="name" />
<Input placeholder="Enter your email address" />

// ✅ AFTER
<Input placeholder="Enter name" />
<Input placeholder="Enter email" />
```

### Fix 3: Add Field Spacing
```tsx
// ❌ BEFORE
<div>
  <Label>Name</Label>
  <Input />
  <Label>Email</Label>
  <Input />
</div>

// ✅ AFTER
<div className="space-y-3">
  <div className="space-y-2">
    <Label className="text-ocean-600">Name</Label>
    <Input className="h-10" />
  </div>
  <div className="space-y-2">
    <Label className="text-ocean-600">Email</Label>
    <Input className="h-10" />
  </div>
</div>
```

### Fix 4: Add Validation
```tsx
// ❌ BEFORE
<Input value={email} onChange={(e) => setEmail(e.target.value)} />

// ✅ AFTER
<Input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  placeholder="Enter email"
  className="h-10"
/>
```

### Fix 5: Use Design Tokens
```tsx
// ❌ BEFORE
<input style={{ height: '40px', fontSize: '14px', padding: '8px' }} />

// ✅ AFTER
<Input className="h-10 text-sm p-2" />
```

---

## ⚠️ Important Notes

### What NOT to Change
- **Custom form components** - May have specific requirements
- **Third-party form libraries** - Don't modify library components
- **Complex validation logic** - May require custom handling
- **Accessibility features** - Don't remove existing ARIA attributes

### Safety Checks
- Always verify forms still work after fixes
- Check validation behavior
- Ensure accessibility is maintained
- Test form submission

---

## 🔗 Related Commands

- `/fix-spacing-layout` - Also fixes form spacing
- `/audit-design-tokens` - Comprehensive design token audit

---

## 📊 Report Format

```
📝 Form Fields Fix Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: src/features/email-marketing/components/forms/FormBuilder.tsx

Issues Found: 8
Fixes Applied: 8

🔴 CRITICAL - Line 45
  Issue: Plain <label> tag instead of Label component
  Fix: Replaced with <Label className="text-ocean-600">

🟡 IMPORTANT - Line 50
  Issue: Missing placeholder text
  Fix: Added placeholder="Enter name"

🟢 MINOR - Line 55
  Issue: Inconsistent spacing between fields
  Fix: Added space-y-3 container and space-y-2 for label-input pairs

Summary:
- Replaced 5 plain labels with Label component
- Added 3 missing placeholders
- Fixed spacing in 2 form sections
- Added validation to 2 required fields
```

---

## 🎯 Form Field Rules

### Label Component
- MUST use `Label` from `@/shared/components/ui/label`
- MUST have `className="text-ocean-600"` (design token)
- MUST have `htmlFor` matching input `id`

### Input Component
- MUST use `Input` from `@/shared/components/ui/input`
- MUST have `className="h-10"` (design token: 40px)
- MUST have consistent placeholder format

### Spacing
- Fields: `space-y-3` (12px gap)
- Label-Input: `space-y-2` (8px gap)
- Form container: `p-4` (16px padding)

### Validation
- Required fields: `required` attribute
- Text fields: `minLength`/`maxLength` if needed
- Email fields: `type="email"`
- Number fields: `type="number"` with `min`/`max`

---

**Ready to fix form fields!** Run `/fix-form-fields [path]` to standardize form field implementation. 🚀

