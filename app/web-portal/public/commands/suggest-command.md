# /suggest-command [path]

Get context-aware command suggestions based on current file.

## Purpose
Get context-aware command suggestions based on current file

## Usage
`/suggest-command [file-path]` or `/suggest-command` (analyzes currently open file)

## Speed
Fast (30s - 1min)

## When to use
Unsure which command to use, need recommendations

## What It Detects
- Code quality issues (unused imports, commented code)
- UI component issues (filter bars, tables, forms)
- Design system issues (hardcoded values)
- Testing needs

## What It Suggests
- Commands to fix issues (high priority)
- Commands to standardize (medium priority)
- Commands for enhancements (low priority)

## Analyzes
- File content and patterns
- Common issues detected
- Context and structure

