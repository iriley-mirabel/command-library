---
name: design-token-check
description: Verify design token usage across a module or file
---

# 🎨 Design Token Verification

Audit design token compliance across an entire module or specific file.

## Usage

```
/design-token-check [module-name]
```

**Examples:**
- `/design-token-check subscription-portal` - Audit entire subscription portal
- `/design-token-check classified-ads` - Audit classified ads module
- `/design-token-check project-management` - Audit project management module
- `/design-token-check` (no args) - Audit currently open file

## Execution Steps

### Step 1: Identify Scope

If module name provided:
- Scan all `.tsx` files in `src/features/[module-name]/`
- Use grep to find violations across the module

If no module name:
- Audit the currently open file only

### Step 2: Scan for Violations

Run these grep patterns across the target scope:

```bash
# Hardcoded hex colors
grep -rn "#[0-9a-fA-F]{3,6}" --include="*.tsx" src/features/[module]/

# RGB/RGBA colors
grep -rn "rgb\(|rgba\(" --include="*.tsx" src/features/[module]/

# Hardcoded pixel values in styles
grep -rn "': '[0-9]+px'" --include="*.tsx" src/features/[module]/

# Inline style objects (potential violations)
grep -rn "style={{" --include="*.tsx" src/features/[module]/
```

### Step 3: Categorize Violations

## Violation Categories

### 🔴 CRITICAL - Hardcoded Colors

**Patterns to find:**
- `color: '#075985'` or any `#hex`
- `backgroundColor: 'rgb(7, 89, 133)'`
- `border: '1px solid #e5e7eb'`
- Named colors: `color: 'blue'`, `'red'`, `'gray'`
- SVG fills/strokes: `fill="#000000"`, `stroke="#333"`

**Fixes:**
```tsx
// ❌ WRONG
color: '#075985'
backgroundColor: 'rgb(7, 89, 133)'
fill="#0c4a6e"

// ✅ CORRECT
className="text-ocean-600"
className="bg-ocean-800"
fill="var(--color-ocean-800)"
```

### 🟠 HIGH - Inline Styles

**Patterns to find:**
- `style={{ ... }}` with hardcoded values
- `style={{ padding: '16px' }}`
- `style={{ fontSize: '14px' }}`

**Fixes:**
```tsx
// ❌ WRONG
<div style={{ padding: '16px', marginBottom: '12px' }}>
<label style={{ color: 'var(--label-color)' }}>

// ✅ CORRECT  
<div className="p-4 mb-3">
<label className="text-ocean-600">
```

### 🟡 MEDIUM - Hardcoded Spacing/Typography

**Patterns to find:**
- `padding: '16px'` or `padding: 16`
- `margin: '12px'` or `margin: 12`
- `gap: '24px'` or `gap: 24`
- `fontSize: '14px'` or `fontSize: 14`
- `fontWeight: 500`

**Fixes:**
```tsx
// ❌ WRONG
padding: '16px'
fontSize: '14px'
fontWeight: 500

// ✅ CORRECT (Tailwind classes)
className="p-4"          // 16px
className="text-sm"      // 14px
className="font-medium"  // 500
```

### 🟢 LOW - Form Label Colors

**Patterns to find:**
- Labels not using `text-ocean-600` class
- Labels using inline color styles

**Fixes:**
```tsx
// ❌ WRONG
<label style={{ color: 'var(--label-color)' }}>Name</label>

// ✅ CORRECT
<label className="text-ocean-600 text-sm font-medium">Name</label>
<Label className="text-ocean-600">Name</Label>
```

## Output Format

### Summary Header
```
═══════════════════════════════════════════════════════════
  🎨 DESIGN TOKEN AUDIT: [module-name]
═══════════════════════════════════════════════════════════

📁 Files Scanned: [count]
❌ Total Violations: [count]
   🔴 Critical (colors): [count]
   🟠 High (inline styles): [count]  
   🟡 Medium (spacing/typography): [count]
   🟢 Low (labels): [count]
```

### Per-File Violations
```
──────────────────────────────────────────────────────────
📄 components/checkout/PaymentStep.tsx
──────────────────────────────────────────────────────────

🔴 Line 45: Hardcoded color
   Current:  color: '#075985'
   Fix:      className="text-ocean-600"

🟠 Line 67: Inline style
   Current:  style={{ padding: '16px', marginBottom: '12px' }}
   Fix:      className="p-4 mb-3"

🟡 Line 89: Hardcoded spacing
   Current:  gap: '24px'
   Fix:      className="gap-6"
```

### Summary Footer
```
═══════════════════════════════════════════════════════════
  📊 COMPLIANCE SCORE: [X]% ([passed]/[total] checks)
═══════════════════════════════════════════════════════════

🔧 Quick Fixes Available: [count] files can be auto-fixed
📋 Manual Review Needed: [count] files need human review

Next Steps:
1. Fix 🔴 Critical issues first
2. Run /design-token-check [module] again to verify
3. Commit changes when score reaches 100%
```

## Token Quick Reference

| Hardcoded | Tailwind Class | CSS Variable |
|-----------|---------------|--------------|
| `#075985` | `text-ocean-600` | `var(--color-ocean-600)` |
| `#0c4a6e` | `text-ocean-800` | `var(--color-ocean-800)` |
| `16px` padding | `p-4` | `var(--space-4)` |
| `12px` margin | `m-3` | `var(--space-3)` |
| `24px` gap | `gap-6` | `var(--space-6)` |
| `14px` font | `text-sm` | `var(--text-sm)` |
| `500` weight | `font-medium` | `var(--font-medium)` |

## Reference Documentation

- **PRIMARY:** `DESIGN_TOKENS_REFERENCE.md` - Complete token reference
- **QUICK:** `DESIGN_TOKEN_QUICK_REFERENCE.md` - Quick lookup
- **CSS:** `src/shared/design-system/tokens/` - Token definitions
- **EXAMPLES:** `src/shared/components/ui/` - Correct usage patterns

## Available Modules

| Module | Path |
|--------|------|
| `subscription-portal` | `src/features/subscription-portal/` |
| `classified-ads` | `src/features/classified-ads/` |
| `project-management` | `src/features/project-management/` |
| `customers` | `src/features/customers/` |
| `invoices` | `src/features/invoices/` |
| `orders` | `src/features/orders/` |
| `products` | `src/features/products/` |
| `reports` | `src/features/reports/` |
| `dashboard` | `src/features/dashboard/` |

---

## 🔄 Enhanced Auto-Fixes

This command now automatically:

### 1. Spacing Fixes
- Detects hardcoded spacing values
- Converts to design tokens
- Uses patterns from `/fix-spacing-layout`

### 2. Color Fixes
- Detects hardcoded colors
- Converts to design token classes
- Standardizes color usage

### 3. Typography Fixes
- Detects hardcoded font sizes
- Converts to design token classes
- Standardizes typography

### Integration
- Works with `/fix-spacing-layout` for comprehensive fixes
- Can auto-fix violations when safe
- Provides detailed fix recommendations

---

**Run this command to audit any module for design token compliance.**
