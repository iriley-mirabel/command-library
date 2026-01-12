---
name: migrate-react-code
description: Migrate old React code to this project's guidelines including design system, architecture, and naming conventions
---

# 🔄 Migrate React Code to Project Standards

Migrate existing React code (from other projects or older versions) to match this project's design system, architectural patterns, naming conventions, and coding standards.

---

## Instructions for AI

When the user runs `/migrate-react-code`, perform the following steps:

### Step 1: Analyze Existing React Code

**Understand the code to migrate:**

1. **Identify Code Structure:**
   - Component structure and organization
   - State management approach (useState, Redux, Context, etc.)
   - API/data fetching patterns
   - Styling approach (CSS modules, styled-components, inline styles, Tailwind)
   - TypeScript usage and type definitions
   - Routing and navigation patterns

2. **Extract Key Information:**
   - Business logic and workflows
   - API endpoints and data structures
   - UI components and their functionality
   - Form handling and validations
   - User interactions and state changes
   - Dependencies and external libraries

3. **Identify Migration Scope:**
   - Full page/feature migration
   - UI-only update (business logic stays)
   - Business logic update (UI already generated)
   - Partial migration (specific components)

### Step 2: Understand Project Guidelines

**Reference this project's standards:**

1. **Architecture:**
   - Feature-based structure: `src/features/[feature-name]/`
   - Folder organization: `components/`, `hooks/`, `services/`, `types/`, `context/`
   - See examples: `src/features/CallCenter/`, `src/features/Opportunity/`
   - Reference: `src/context.md` for architecture details

2. **Design System:**
   - Use components from `src/shared/components/ui/`
   - Design tokens: `src/styles/tokens.css` (no hardcoded values)
   - Follow existing component patterns
   - Responsive design patterns
   - Accessibility standards

3. **Naming Conventions:**
   - Components: PascalCase (`UserProfile.tsx`)
   - Hooks: camelCase starting with `use` (`useUserData.ts`)
   - Services: camelCase ending with `Service` (`userService.ts`)
   - Types: PascalCase interfaces/types (`UserProfile`, `ApiResponse`)
   - Files: Match export name (component name = file name)

4. **Code Patterns:**
   - TypeScript: Strict typing, no `any`
   - React Hooks: Prefer hooks over class components
   - Error handling: Consistent error patterns
   - API calls: Use existing service patterns
   - State management: React hooks, Context for shared state

5. **Styling:**
   - Design tokens (CSS variables) only
   - Tailwind CSS utility classes
   - Component-level styles in feature folders
   - No inline styles or hardcoded colors/spacing

### Step 3: Determine Migration Type

**Identify what needs to be migrated:**

#### Type A: Full Migration (UI + Business Logic)
- Migrate entire component/page
- Update UI to design system
- Update business logic to project patterns
- Create proper folder structure
- Add TypeScript types

#### Type B: UI-Only Update (Business Logic Preserved)
- Keep existing business logic
- Replace UI components with design system
- Update styling to use design tokens
- Maintain functionality
- Improve UX/UI consistency

#### Type C: Business Logic Update (UI Already Generated)
- UI components already exist in project
- Update API calls to match project patterns
- Integrate with existing services
- Update data transformations
- Connect to proper data sources

#### Type D: Partial Migration (Specific Components)
- Migrate specific components only
- Update to match project patterns
- Integrate with existing code
- Maintain compatibility

### Step 4: Create Migration Plan

**Before coding, provide:**

1. **Analysis Summary:**
   - Current code structure
   - What needs to be changed
   - Dependencies to update
   - Integration points

2. **Migration Strategy:**
   - Feature location and structure
   - Component breakdown
   - API/service updates needed
   - State management approach
   - Styling updates required

3. **Risk Assessment:**
   - Breaking changes
   - Dependencies conflicts
   - Missing functionality
   - Performance impact

### Step 5: Implement Migration

**Update code following project patterns:**

#### For Full Migration (Type A):

1. **Create Feature Structure:**
   ```typescript
   src/features/[feature-name]/
   ├── components/
   │   └── [ComponentName].tsx
   ├── hooks/
   │   └── use[FeatureName].ts
   ├── services/
   │   └── [feature]Service.ts
   ├── types/
   │   └── index.ts
   └── index.tsx
   ```

2. **Update Components:**
   - Replace UI components with design system
   - Update styling to design tokens
   - Follow project component patterns
   - Add proper TypeScript types

3. **Update Business Logic:**
   - Extract to custom hooks
   - Create service layer
   - Use project API patterns
   - Add error handling

#### For UI-Only Update (Type B):

1. **Preserve Business Logic:**
   - Keep existing hooks and services
   - Maintain data flow
   - Preserve state management

2. **Update UI Components:**
   ```typescript
   // Replace old components
   // OLD: <div className="custom-button">Click</div>
   // NEW: <Button>Click</Button>
   
   // Replace styling
   // OLD: style={{ color: '#ff0000', padding: '10px' }}
   // NEW: className="text-primary p-2.5"
   ```

3. **Apply Design System:**
   - Import from `@/shared/components/ui/`
   - Use design tokens
   - Match project UI patterns

#### For Business Logic Update (Type C):

1. **Identify Existing UI:**
   - Locate UI components in project
   - Understand current structure
   - Identify integration points

2. **Update API Calls:**
   ```typescript
   // OLD: fetch('/api/users')
   // NEW: use existing service pattern
   import { userService } from '@/services/userService';
   // or
   import { useUsers } from '@/features/users/hooks/useUsers';
   ```

3. **Update Data Flow:**
   - Connect to project services
   - Use project data structures
   - Follow existing patterns
   - Update TypeScript types

4. **Integrate Business Logic:**
   - Update hooks to use project APIs
   - Connect to proper data sources
   - Handle errors consistently
   - Add proper loading states

### Step 6: Code Quality Checks

**Ensure migrated code follows project standards:**

1. **TypeScript:**
   - All types defined
   - No `any` types
   - Proper interfaces
   - Type-safe API calls

2. **Architecture:**
   - Correct folder structure
   - Proper separation of concerns
   - Reusable components
   - No circular dependencies

3. **Design System:**
   - Uses design tokens only
   - No hardcoded styles
   - Responsive design
   - Accessibility

4. **Naming Conventions:**
   - Follows project naming
   - Consistent file names
   - Proper exports
   - Clear component names

5. **Code Style:**
   - Matches project formatting
   - Consistent patterns
   - Proper comments
   - Clean code structure

### Step 7: Testing & Validation

**Verify the migration:**

1. **Functionality:**
   - All features work correctly
   - Data flows properly
   - Error handling works
   - Edge cases covered

2. **UI/UX:**
   - Matches design system
   - Responsive layout
   - Consistent styling
   - Accessible interactions

3. **Integration:**
   - Works with existing code
   - No breaking changes
   - Proper API integration
   - Correct data structures

---

## Usage Examples

### Example 1: Full Page Migration

**User provides:**
- Old React component/page
- Business logic included

**AI should:**
1. Analyze structure and functionality
2. Create feature folder structure
3. Migrate UI to design system
4. Update business logic to project patterns
5. Add TypeScript types
6. Integrate with project services

### Example 2: UI-Only Update

**User provides:**
- React component with working logic
- Request: "Update UI to match project design"

**AI should:**
1. Keep business logic intact
2. Replace UI components with design system
3. Update styling to design tokens
4. Maintain all functionality
5. Improve UI consistency

### Example 3: Business Logic Update

**User provides:**
- UI already exists in project
- Old API calls or business logic
- Request: "Update API calls and business logic"

**AI should:**
1. Locate existing UI components
2. Understand current structure
3. Update API calls to project patterns
4. Integrate with existing services
5. Update data transformations
6. Connect to proper data sources

### Example 4: Component Migration

**User provides:**
- Specific component to migrate
- Context of where it will be used

**AI should:**
1. Analyze component functionality
2. Update to project patterns
3. Use design system components
4. Add proper types
5. Integrate with existing code

---

## Reference Files

When migrating, reference these project files:

- **Architecture:** `src/context.md` - Complete project architecture
- **Design System:** 
  - `src/shared/components/ui/` - UI component library
  - `src/styles/tokens.css` - Design tokens
- **Examples:**
  - `src/features/CallCenter/` - Feature structure example
  - `src/features/Opportunity/` - Complex feature example
- **Services:**
  - `src/services/GraphQLService.ts` - API service patterns
  - `src/services/globalService.ts` - Service patterns
- **Hooks:**
  - `src/hooks/useApi.js` - API hook patterns
  - `src/features/CallCenter/hooks/` - Feature hooks

---

## Output Format

After migration, provide:

1. **Migration Summary:**
   - Type of migration performed
   - Files created/modified
   - Components updated
   - Services/hooks added
   - Breaking changes

2. **Code Files:**
   - All updated components
   - New/updated services
   - TypeScript types
   - Updated imports

3. **Integration Notes:**
   - How to use migrated code
   - Dependencies required
   - Manual steps needed
   - Testing recommendations

---

## Tips

1. **Preserve Functionality:** Ensure all features work after migration
2. **Follow Patterns:** Use existing project patterns as reference
3. **Incremental:** Migrate in small, testable chunks
4. **Test Thoroughly:** Verify all functionality works
5. **Document Changes:** Note differences from original code

---

**Transform React code to match this project's modern standards! 🔄**

