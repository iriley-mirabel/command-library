# /fix-filter-bar

Standardize the filter bar layout and functionality in the current file.

## Purpose
Standardize filter bar layout and functionality

## Usage
`/fix-filter-bar [path]`

## Speed
Moderate (1-3min)

## When to use
Filter bar inconsistencies, missing features

## Instructions
1. **Layout**: Fix spacing issues and ensure design token compliance
2. **Logic**: 
   - Ensure an "All" option exists in the filter
   - Detect and fix view mode switching logic
3. **Dependencies**: Auto-fix broken import paths related to the filter components

## Usage
- Use this when the filter bar is inconsistent or missing features
- **Recommended Chain**: Run `/implement-view-modes` immediately after

## New capabilities
- Auto-fixes spacing issues
- Auto-adds "All" option
- Better view mode detection
- Auto-fixes import paths

