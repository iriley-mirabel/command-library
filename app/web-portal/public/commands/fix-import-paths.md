# /fix-import-paths

Fix broken import paths and standardize the order: React first, then external libraries, then internal components, and types last. Convert relative paths to absolute `@/` paths.

## Purpose
Fix broken imports, standardize import order, convert relative to absolute

## Usage
`/fix-import-paths [path]`

## Speed
Fast (30s - 1min)

## When to use
After moving files, when imports break, code standardization

## Instructions
- Convert relative paths to absolute `@/` paths
- Organize order: React → External → Internal → Types
- Ensure all imports are used; remove those that aren't

## Fixes
- Broken import paths
- Relative → absolute imports (`@/` paths)
- Import order (React → External → Internal → Types)
- Unused imports
- Type-only imports

