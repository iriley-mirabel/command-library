---
name: migrate-legacy-aspnet
description: Migrate legacy ASP.NET code to React with modern architecture and design standards
---

# 🔄 Migrate Legacy ASP.NET to React

Migrate legacy ASP.NET (Classic ASP or ASP.NET) code to this project's modern React architecture, design system, and coding standards.

**Focus:** React.js frontend integration with existing APIs or GraphQL functions for business logic.

---

## Instructions for AI

When the user runs `/migrate-legacy-aspnet`, perform the following steps:

### Step 1: Analyze Legacy Code

**Understand the legacy code structure:**

1. **Identify Code Type:**
   - Classic ASP (VBScript/JScript)
   - ASP.NET Web Forms (C#/VB.NET)
   - ASP.NET MVC
   - Embedded SQL queries
   - COM objects and business logic
   - HTML templates with server-side code

2. **Extract Key Information:**
   - Business logic and workflows
   - Database queries and data access patterns
   - UI structure and user interactions
   - Form validations and data processing
   - Authentication/authorization logic
   - API endpoints and data transformations

3. **Identify Code Separation:**
   - **React Frontend (This Project):**
     - UI components and presentation
     - Client-side form validations
     - User interactions and events
     - Client-side state management
     - UI routing and navigation
     - API integration and data fetching
   - **Backend API Logic:**
     - If API exists: Integrate with existing API endpoints
     - If no API exists: Suggest creating GraphQL functions/resolvers
     - Business logic should be handled via API calls (REST or GraphQL)
     - Database operations via API, not direct from React

4. **Map to Modern Equivalents:**
   - Server-side rendering → React components (UI only)
   - PostBack events → React state and event handlers
   - ViewState → React state management
   - Code-behind business logic → **Node.js backend API**
   - Server controls → Design system components
   - Server-side business logic → **Separate Node.js application**

### Step 2: Understand Project Architecture

**Reference this project's structure:**

1. **Feature-Based Architecture:**
   - Place code in `src/features/[feature-name]/`
   - Follow existing feature patterns (see `src/features/CallCenter/`, `src/features/Opportunity/`, etc.)
   - Use feature-specific folders: `components/`, `hooks/`, `services/`, `types/`

2. **Design System:**
   - Use components from `src/shared/components/ui/`
   - Apply design tokens from `src/styles/tokens.css`
   - Follow design patterns in existing features
   - No hardcoded colors, spacing, or typography

3. **Database Access:**
   - Use Prisma ORM (see `prisma/schema.prisma`)
   - Use correct Mirabel field names (e.g., `gsCustomersID`, not `customerId`)
   - Reference existing services in `src/services/` or `src/features/[feature]/services/`

4. **API Integration Patterns:**
   - **If API exists:** Integrate with existing REST/GraphQL endpoints
   - **If no API exists:** Suggest creating GraphQL functions/resolvers
   - Use `src/services/GraphQLService.ts` for GraphQL calls
   - Use existing REST service patterns from `src/services/`
   - Handle errors consistently
   - Use proper TypeScript types
   - **Never:** Put business logic directly in React components
   - **Always:** Call APIs for business logic, calculations, and data operations

### Step 3: Create Migration Plan

**Before coding, provide:**

1. **Analysis Summary:**
   - What the legacy code does
   - Key business logic identified
   - **API endpoints available** (if any)
   - **Business logic without APIs** (needs GraphQL functions)
   - Database tables/queries used (for API/GraphQL design)
   - UI components needed
   - Dependencies and integrations

2. **Migration Strategy:**
   - Feature name and location
   - Component breakdown (React UI only)
   - State management approach
   - **API Integration Plan:**
     - Existing APIs to use
     - GraphQL functions to create (for missing business logic)
     - API service layer design
   - Data transformation requirements

3. **Risk Assessment:**
   - Complex business logic that needs careful translation
   - Database schema differences
   - Missing functionality in new stack
   - Performance considerations

### Step 4: Implement Migration

**Create React components following this project's patterns:**

1. **Component Structure:**
   ```typescript
   // src/features/[feature-name]/components/[ComponentName].tsx
   import { useState, useEffect } from 'react';
   import { Button } from '@/shared/components/ui/button';
   // ... other imports following project patterns
   ```

2. **Use Design System:**
   - Import from `@/shared/components/ui/`
   - Use design tokens (CSS variables)
   - Follow existing component patterns
   - Match UI/UX of similar features

3. **API Integration:**
   - **If API exists:** Integrate with existing endpoints
     - Use `src/services/GraphQLService.ts` for GraphQL
     - Use REST service patterns from `src/services/`
     - Create service layer (`services/[feature]Service.ts`)
   - **If no API exists:** Suggest GraphQL functions
     - Identify business logic that needs backend API
     - Suggest GraphQL resolver/function structure
     - Provide GraphQL schema suggestions
     - Note: GraphQL functions should be created in backend, not React
   - Use TypeScript for type safety
   - Follow existing patterns for error handling

4. **Business Logic Handling:**
   - **Never put business logic in React components**
   - All business logic should be via API calls
   - Create custom hooks (`use[FeatureName].ts`) for API calls
   - Extract data fetching to service layer
   - Client-side validations only (UI/UX related)

5. **State Management:**
   - Use React hooks (useState, useEffect, useReducer)
   - Consider context for shared state
   - Follow existing state patterns in project

### Step 5: Code Quality Checks

**Ensure migrated code follows project standards:**

1. **TypeScript:**
   - All types defined
   - No `any` types
   - Proper interfaces for data structures
   - Type-safe API calls

2. **Architecture:**
   - Files in correct feature folder
   - Proper separation of concerns
   - Reusable components extracted
   - No circular dependencies

3. **Design System:**
   - No hardcoded styles
   - Uses design tokens
   - Responsive design
   - Accessibility considerations

4. **Code Style:**
   - Follow existing naming conventions
   - Proper file organization
   - Consistent formatting
   - Comments for complex logic

### Step 6: Testing & Validation

**Verify the migration:**

1. **Functionality:**
   - All business logic preserved
   - Data flows correctly
   - Error handling works
   - Edge cases covered

2. **UI/UX:**
   - Matches design system
   - Responsive layout
   - Accessible interactions
   - Consistent with project style

3. **Integration:**
   - Works with existing features
   - Proper API integration
   - Database queries correct
   - No breaking changes

---

## Usage Examples

### Example 1: Migrate ASP.NET Web Form

**User provides:**
- ASP.NET `.aspx` file
- Code-behind `.aspx.cs` file
- Related business logic

**AI should:**
1. Analyze the form structure and controls
2. Identify data binding and postback logic
3. Map to React components and state
4. Convert to TypeScript with proper types
5. Apply design system components

### Example 2: Migrate Classic ASP Page

**User provides:**
- Classic ASP `.asp` file with VBScript
- Embedded SQL queries
- HTML structure

**AI should:**
1. Extract business logic from VBScript
2. **Identify if API exists for this logic:**
   - If yes: Integrate with existing API
   - If no: Suggest GraphQL function structure
3. Create React components for UI only
4. Implement API integration hooks
5. Add proper error handling
6. **For missing APIs:** Provide GraphQL function suggestions

### Example 3: Migrate with Database Operations

**User provides:**
- Legacy code with SQL queries
- Old database schema

**AI should:**
1. Identify database operations needed
2. **Check if API exists for these operations:**
   - If yes: Use existing API endpoints
   - If no: Suggest GraphQL functions with Prisma queries
3. Map old schema to current schema (for API/GraphQL design)
4. Create React components that call APIs
5. **Provide GraphQL function suggestions** (if needed):
   - GraphQL schema structure
   - Resolver function outline
   - Prisma query examples
   - Note: Functions should be created in backend

---

## Reference Files

When migrating, reference these project files:

- **Architecture:** `src/context.md` - Project architecture documentation
- **Design System:** `src/shared/components/ui/` - UI component library
- **Database:** `prisma/schema.prisma` - Database schema with field names
- **Examples:** 
  - `src/features/CallCenter/` - Feature-based structure
  - `src/features/Opportunity/` - Complex feature example
  - `src/services/GraphQLService.ts` - API service patterns

---

## Output Format

After migration, provide:

1. **Migration Summary:**
   - Files created/modified (React components only)
   - Components created
   - API services/hooks added
   - **GraphQL functions suggested** (if business logic has no API)
   - API integration points

2. **Code Files:**
   - All React components (UI only)
   - TypeScript types
   - API service files and hooks
   - Updated imports
   - **GraphQL function suggestions** (if needed):
     - GraphQL schema snippets
     - Resolver function outlines
     - Prisma query examples
     - Note: These should be implemented in backend

3. **Notes:**
   - **API Integration:**
     - APIs used from existing backend
     - GraphQL functions that need to be created
     - API endpoints to implement (if any)
   - Breaking changes
   - Manual steps required (especially GraphQL function creation)
   - Testing recommendations
   - Future improvements

---

## Tips

1. **React Focus:** This migration is React.js frontend only
2. **API First:** Always check if API exists before suggesting GraphQL functions
3. **GraphQL for Missing Logic:** If business logic has no API, suggest GraphQL functions
4. **No Business Logic in React:** Keep React components focused on UI and API calls
5. **Start Small:** Migrate one page/feature at a time
6. **Test Thoroughly:** Verify all functionality works with APIs
7. **Document Changes:** Note any differences from original behavior
8. **Follow Patterns:** Use existing project patterns as reference

## GraphQL Function Suggestions

When business logic has no existing API, provide:

1. **GraphQL Schema:**
   ```graphql
   type Query {
     # Example query
     getFeatureData(input: FeatureInput!): FeatureResponse!
   }
   
   type Mutation {
     # Example mutation
     processFeatureData(input: ProcessInput!): ProcessResponse!
   }
   ```

2. **Resolver Function Outline:**
   ```typescript
   // Backend resolver example (for reference)
   export const getFeatureData = async (parent, args, context) => {
     // Business logic here
     // Prisma queries
     // Data transformations
     return result;
   };
   ```

3. **Prisma Query Examples:**
   ```typescript
   // Example Prisma query (for backend)
   const data = await prisma.tableName.findMany({
     where: { /* conditions */ },
     include: { /* relations */ }
   });
   ```

**Note:** GraphQL functions should be implemented in the backend Node.js application, not in this React project.

---

**Transform legacy ASP.NET code into modern React with this project's architecture! 🔄**

