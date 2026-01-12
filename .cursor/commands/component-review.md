---
name: component-review
description: Check if component already exists before creating
---

# 🔍 Component Existence Review

Before creating a new component, verify if it already exists or can be reused.

## Search Locations

### 1. Shared UI Components
Check `src/shared/components/ui/` for:
- Exact match for what you need
- Similar component that can be extended
- Base component that can be composed

Common components to check:
- `Button`, `IconButton`
- `Card`, `Modal`, `Dialog`
- `Input`, `Select`, `Checkbox`, `Radio`
- `Table`, `DataGrid`
- `Tabs`, `Accordion`
- `Badge`, `Chip`, `Tag`
- `LoadingSpinner`, `Skeleton`
- `Toast`, `Alert`, `Banner`
- Form components and layouts

### 2. Design System Documentation
Review (in order of importance):
- **PRIMARY:** `AVAILABLE_COMPONENTS_CATALOG.md` - Master component list (CHECK FIRST!)
- **REGISTRY:** `src/shared/design-system/APPROVED_COMPONENTS_REGISTRY.md` - Approved components
- **GUIDE:** `SHARED_COMPONENTS_GUIDE.md` - Usage guidelines
- **PATTERNS:** `src/shared/design-system/components/` - Component patterns
- **ARCHITECTURE:** `ENHANCED_MODULAR_ARCHITECTURE.md` - Complete component architecture
  - Or `PROJECT_ARCHITECTURE.md` - Quick component guidelines
- **INDEX:** `DOCUMENTATION_INDEX.md` - All documentation references

### 3. Similar Features
Check if other features have:
- Similar UI patterns you can extract to shared
- Component variations that should be consolidated
- Duplicate implementations that indicate need for shared component

## Decision Matrix

**If component exists:**
- ✅ Use it directly
- Document which component and why it fits

**If similar component exists:**
- ✅ Evaluate if it can be extended with props
- Consider adding variant or size props
- Avoid creating near-duplicates

**If no match found:**
- ✅ Confirm it's truly unique to create
- Plan to build it in `src/shared/` if reusable
- Build in feature folder only if feature-specific

## Report Format

```
## Component Search Results

**Requested:** [Component name/description]

**Search Results:**
1. ✅ FOUND: `Button` in src/shared/components/ui/button.tsx
   - Supports all needed variants
   - Has proper design token usage
   - Recommendation: Use directly

2. ⚠️  SIMILAR: `Card` in src/shared/components/ui/card.tsx
   - Similar but missing [feature]
   - Recommendation: Extend with new prop

3. ❌ NOT FOUND: [Specific component]
   - No existing match
   - Recommendation: Create new in [location]
```

**Provide clear recommendation on whether to create, reuse, or extend.**

