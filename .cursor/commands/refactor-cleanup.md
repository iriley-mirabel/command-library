---
name: refactor-cleanup
description: Comprehensive refactoring and cleanup with risk assessment
---

# 🔧 Refactor & Cleanup Analysis

Analyze the current file(s) for refactoring opportunities with detailed risk assessment.

**Reference Documents:**
- `ENHANCED_MODULAR_ARCHITECTURE.md` (PRIMARY - Complete architecture standards)
- `PROJECT_ARCHITECTURE.md` (Quick architecture overview)
- `DESIGN_TOKENS_REFERENCE.md` (Design token compliance)
- `AVAILABLE_COMPONENTS_CATALOG.md` (Shared components for extraction)
- `.cursorrules` (Code quality standards)
- `DOCUMENTATION_INDEX.md` (All references)

---

## Refactoring Categories

### 1. 📦 File Size & Structure

**Check for:**
- Files > 300 lines (consider splitting)
- Components > 200 lines (extract sub-components)
- Functions > 50 lines (break into smaller functions)
- Too many responsibilities in one file

**Refactorings:**

#### Split Large Components
- **Risk: 🟢 LOW** - Safe if props are well-defined
- Extract logical sections into sub-components
- Move to same file initially, then separate if reused
- Example: Extract `ProductFormHeader`, `ProductFormBody`, `ProductFormFooter`

#### Split Large Files
- **Risk: 🟡 MEDIUM** - Can break imports in other files
- Check all imports before splitting
- Update import paths across codebase
- Test after splitting to verify no broken references

#### Extract Utility Functions
- **Risk: 🟢 LOW** - Very safe refactoring
- Move pure functions to `utils/` directory
- Add unit tests for extracted functions
- Makes code more testable and reusable

---

### 2. 🎯 Code Duplication

**Check for:**
- Repeated code blocks (DRY principle)
- Similar logic in multiple places
- Copy-pasted components with minor variations
- Duplicate API calls or data transformations

**Refactorings:**

#### Extract Shared Functions
- **Risk: 🟢 LOW** - Safe with proper typing
- Identify duplicate logic patterns
- Extract to shared utils with TypeScript types
- Replace all instances with function call

#### Extract Custom Hooks
- **Risk: 🟢 LOW to 🟡 MEDIUM** - Test hook independently
- Duplicate state management → custom hook
- Reusable side effects → custom hook
- Example: `useProductForm`, `useFilterState`
- **Risk increases if:** Hook has complex dependencies

#### Create Shared Components
- **Risk: 🟡 MEDIUM** - Ensure API is flexible enough
- Multiple similar components → one with props/variants
- Move to `src/shared/components/ui/`
- **Risk: 🔴 HIGH if:** Forcing different use cases into one component

#### Consolidate Similar Patterns
- **Risk: 🟡 MEDIUM** - May affect multiple features
- Similar form patterns → shared form component
- Similar table configurations → shared table setup
- Test all usage locations after consolidation

---

### 3. ⚡ Performance Optimization

**Check for:**
- Missing memoization on expensive operations
- Unnecessary re-renders
- Large objects in dependency arrays
- Inline function definitions in renders
- Unoptimized list rendering

**Refactorings:**

#### Add React.memo
- **Risk: 🟢 LOW** - Easy to test and revert
- Wrap components that re-render unnecessarily
- Verify with React DevTools Profiler
- Don't over-optimize - only memo if needed

#### useMemo for Expensive Calculations
- **Risk: 🟢 LOW** - Generally safe
- Wrap expensive computations
- Only if calculation is actually expensive (profile first)
- Example: filtering/sorting large arrays, complex transformations

#### useCallback for Event Handlers
- **Risk: 🟢 LOW** - Prevents child re-renders
- Memoize callbacks passed to memoized children
- Add to dependency array properly
- **Risk: 🟡 MEDIUM if:** Dependencies are incorrect (stale closures)

#### Virtualize Large Lists
- **Risk: 🟡 MEDIUM** - Changes rendering behavior
- Lists with 100+ items should be virtualized
- Use libraries like `react-virtual` or `react-window`
- Test scrolling behavior thoroughly

#### Code Splitting with React.lazy
- **Risk: 🟢 LOW to 🟡 MEDIUM** - Generally safe
- Split feature routes with `React.lazy()`
- Add loading boundaries
- **Risk increases if:** Lazy loading critical path components

---

### 4. 🏗️ Architecture & Organization

**Check for:**
- Cross-feature dependencies (violates architecture)
- Components in wrong directories
- Missing separation of concerns
- Business logic in UI components
- Tight coupling between modules

**Refactorings:**

#### Extract Business Logic to Services
- **Risk: 🟡 MEDIUM** - Can break if logic has side effects
- Move API calls to `services/` directory
- Extract data transformations
- Keep components focused on UI
- Add error handling in service layer

#### Separate Concerns (Container/Presentational)
- **Risk: 🟡 MEDIUM to 🔴 HIGH** - Significant restructuring
- Container components: data fetching, state management
- Presentational components: UI rendering only
- Makes components more testable
- **High risk if:** Many components need restructuring

#### Move Shared Code to src/shared
- **Risk: 🟢 LOW** - Update imports only
- Code used across features → `src/shared/`
- Update import paths
- Run build to verify all imports resolve

#### Remove Cross-Feature Dependencies
- **Risk: 🔴 HIGH** - Major architecture fix
- Feature importing from another feature → extract to shared
- May require duplicate code temporarily
- Requires careful testing of both features
- Plan this refactoring carefully

---

### 5. 📘 Type Safety & Code Quality

**Check for:**
- `any` types that should be specific
- Missing error handling
- Unhandled promise rejections
- Missing input validation
- Weak prop types (e.g., `props: any`)

**Refactorings:**

#### Replace 'any' with Proper Types
- **Risk: 🟢 LOW** - Catches bugs at compile time
- Define interfaces for all data structures
- Use generics for reusable components
- May reveal existing type errors (this is good!)

#### Add Error Boundaries
- **Risk: 🟢 LOW** - Purely additive
- Wrap feature routes with error boundaries
- Add fallback UI for errors
- Prevents entire app crashes

#### Add Try-Catch to Async Operations
- **Risk: 🟢 LOW** - Improves reliability
- Wrap API calls in try-catch
- Show user-friendly error messages
- Log errors for debugging

#### Improve Type Definitions
- **Risk: 🟢 LOW** - Better IntelliSense and safety
- Export types from `types/` directory
- Use `import type` for type-only imports
- Add JSDoc comments for complex types

#### Add Input Validation
- **Risk: 🟢 LOW** - Improves reliability
- Validate form inputs before submission
- Add schema validation (Zod, Yup)
- Show validation errors to users

---

### 6. 🧹 Code Cleanup

**Check for:**
- Unused imports, variables, functions
- Commented-out code
- Console.log statements
- TODO comments that should be issues
- Magic numbers and strings
- Inconsistent formatting

**Refactorings:**

#### Remove Dead Code
- **Risk: 🟢 LOW** - Use git history if needed
- Delete unused imports (ESLint can help)
- Remove commented-out code
- Delete unused variables and functions
- Verify with build and tests

**Enhanced with `/cleanup-unused-code` patterns:**
- Automatic detection of unused imports
- Removal of commented code blocks
- Detection of unused variables/functions
- Optional console.log removal
- Integration with `/fix-import-paths` for import cleanup

#### Extract Constants
- **Risk: 🟢 LOW** - Very safe refactoring
- Magic numbers → named constants
- Repeated strings → constants
- Move to `constants/` directory or top of file
- Example: `const MAX_FILE_SIZE = 5 * 1024 * 1024;`

#### Remove Console Logs
- **Risk: 🟢 LOW** - Clean up debug code
- Replace with proper logging service
- Keep only intentional logging
- Use proper logger for production

#### Cleanup TODO Comments
- **Risk: 🟢 LOW** - Organizational
- Convert TODOs to GitHub issues
- Remove completed TODOs
- Add issue links for planned work

#### Consistent Formatting
- **Risk: 🟢 LOW** - Run Prettier/ESLint
- Format with project standards
- Fix linter warnings
- Organize imports consistently

---

### 7. 🎨 Design System Compliance

**Check for:**
- Hardcoded values (colors, spacing, fonts)
- Inline styles that should use design tokens
- Duplicate styling patterns
- CSS-in-JS that could use design system
- Non-standard component patterns

**Refactorings:**

#### Replace Hardcoded Values with Tokens
- **Risk: 🟢 LOW** - Visual consistency improvement
- Colors → design token variables
- Spacing → design token spacing scale
- Typography → design token font styles
- Reference: `DESIGN_TOKENS_REFERENCE.md`

#### Extract Reusable Styles
- **Risk: 🟢 LOW** - DRY principle for styles
- Repeated style objects → shared style constants
- Common patterns → design system components
- Move to design system if used across features

#### Consolidate Component Variants
- **Risk: 🟡 MEDIUM** - Test all variants
- Multiple similar components → one with variant prop
- Standardize naming: `size="sm|md|lg"`, `variant="primary|secondary"`
- Document variants in component

---

### 8. 🧪 Testability

**Check for:**
- Code that's hard to test
- Tight coupling making mocking difficult
- Side effects mixed with logic
- Missing data-testid attributes

**Refactorings:**

#### Extract Pure Functions
- **Risk: 🟢 LOW** - Makes testing easier
- Separate pure logic from React components
- Move to utils and add unit tests
- Makes code more reusable

#### Add Test IDs
- **Risk: 🟢 LOW** - Purely additive
- Add `data-testid` to key elements
- Helps with integration tests
- Follow consistent naming convention

#### Inject Dependencies
- **Risk: 🟡 MEDIUM** - Changes component API
- Pass dependencies as props instead of importing
- Makes mocking easier in tests
- Example: Pass `apiClient` instead of importing it

---

### 9. ⚠️ Error Handling & User Experience

**Check for:**
- Missing loading states
- No error messages for failed operations
- Unhandled edge cases
- Missing empty states
- No optimistic updates

**Refactorings:**

#### Add Loading States
- **Risk: 🟢 LOW** - Improves UX
- Show spinner/skeleton during async operations
- Disable buttons during submission
- Provide visual feedback

#### Improve Error Messages
- **Risk: 🟢 LOW** - Better UX
- Generic errors → specific, actionable messages
- Add error boundaries with user-friendly fallbacks
- Log errors for debugging

#### Add Empty States
- **Risk: 🟢 LOW** - Better UX
- No data → helpful empty state message
- Suggest actions user can take
- Make empty states engaging

#### Add Optimistic Updates
- **Risk: 🟡 MEDIUM to 🔴 HIGH** - Complex to implement
- Update UI immediately, rollback on error
- Improves perceived performance
- **High risk:** Requires careful state management and rollback logic

---

### 10. 📊 Code Metrics & Standards

**Check for:**
- Cyclomatic complexity > 10
- Cognitive complexity > 15
- Too many props (> 10)
- Too many state variables (> 8)
- Deep nesting (> 4 levels)

**Refactorings:**

#### Reduce Complexity
- **Risk: 🟡 MEDIUM** - Logic changes need testing
- Extract complex conditions to named functions
- Use early returns to reduce nesting
- Replace nested ternaries with if-else or switch

#### Reduce Props Count
- **Risk: 🟡 MEDIUM** - Changes component API
- Group related props into objects
- Use composition instead of configuration
- Example: `formProps={{...}}` instead of individual props

#### Flatten Nested Code
- **Risk: 🟢 LOW to 🟡 MEDIUM** - Improves readability
- Use guard clauses (early returns)
- Extract nested logic to functions
- Reduce indentation levels

---

## Risk Level Guide

### 🟢 LOW RISK
- No breaking changes expected
- Easy to test and verify
- Easy to revert if needed
- Minimal impact on other code
- **Safe to proceed immediately**

### 🟡 MEDIUM RISK
- May affect multiple files
- Requires thorough testing
- Could have edge cases
- Needs careful review
- **Test before committing**

### 🔴 HIGH RISK
- Significant architectural changes
- Affects many files/features
- Could introduce subtle bugs
- Requires comprehensive testing
- **Plan carefully, test extensively, consider doing in stages**

---

## Report Format

For each refactoring opportunity:

```
## [Category] - [Number] opportunities found

### 1. [Refactoring Name] - Risk: 🟢/🟡/🔴

**Current Issue:**
Line 45-67: Large component (250 lines) with multiple responsibilities

**Proposed Refactoring:**
- Extract form section to ProductFormFields component
- Extract submit logic to useProductSubmit hook
- Keep ProductForm as orchestrator

**Risk Assessment:**
🟡 MEDIUM RISK
- Affects component structure
- Need to ensure props are passed correctly
- Test form submission after refactoring
- Easy to verify: Submit form and check behavior

**Benefits:**
- Reduces file from 250 → 100 lines
- Improves reusability of form fields
- Easier to test in isolation

**Implementation Steps:**
1. Create ProductFormFields.tsx
2. Move field rendering code
3. Define props interface
4. Test form submission
5. Remove old code from ProductForm

**Estimated Effort:** 15-30 minutes
```

---

## After Analysis

**Provide:**
1. **Summary**: Total refactoring opportunities by risk level
2. **Prioritized List**: Start with low-risk, high-impact
3. **Quick Wins**: Fast, low-risk improvements to do first
4. **Plan**: Suggested order for medium/high-risk refactorings
5. **Testing Checklist**: What to test after each refactoring

**Risk Summary Example:**
```
📊 Refactoring Opportunities Found: 15

🟢 LOW RISK: 8 opportunities (safe to proceed)
🟡 MEDIUM RISK: 5 opportunities (test thoroughly)
🔴 HIGH RISK: 2 opportunities (plan carefully)

Recommended Order:
1. Do all LOW risk refactorings first (quick wins)
2. Plan and test MEDIUM risk one at a time
3. Schedule HIGH risk for dedicated refactoring session
```

---

**Provide specific, actionable refactorings with clear risk assessment for each.**

