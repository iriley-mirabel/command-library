# /standardize-page

Standardize a page by running all common fixes and quality checks.

## Purpose
Complete page standardization workflow - runs all common fixes

## Usage
`/standardize-page [path]`

## Speed
Moderate (5-10min)

## When to use
New pages, legacy pages, before refactoring

## Execution Steps
Please execute these commands in order. **Stop and ask for feedback after Step 4.**

1. **Imports**: Run `/fix-import-paths` to standardize order and fix broken paths.
2. **Cleanup**: Run `/cleanup-unused-code` to remove dead code and logs.
3. **Layout**: Run `/fix-spacing-layout` to convert hardcoded px to design tokens.
4. **UI Components**: Run `/fix-filter-bar`, `/implement-view-modes`, and `/fix-data-table`.
5. **Forms**: If forms exist, run `/fix-form-fields`.
6. **Verification**: End with `/test-page-quick`.

## Workflow includes
- Import fixes
- Code cleanup
- Spacing fixes
- Filter bar standardization
- View modes implementation
- Data table standardization
- Form field standardization
- Quick test verification

## Context
- **Target Path**: @[path]
- **Time Estimate**: 5-10 minutes

