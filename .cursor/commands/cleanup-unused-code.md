# /cleanup-unused-code

Remove unused imports, commented-out code, unused variables, and console logs. Standardize the file structure after cleaning.

## Purpose
Remove unused imports, commented code, unused variables, console.log

## Usage
`/cleanup-unused-code [path] [--remove-console-logs]`

## Speed
Fast (30s - 2min)

## When to use
Daily cleanup, before commits, after refactoring

## Instructions
- Remove any code blocks that are commented out
- Identify and delete unused variables or functions
- If `--remove-console-logs` is passed, delete all console.log statements
- Standardize the file after cleaning

## Fixes
- Unused imports
- Commented-out code blocks
- Unused variables/functions
- Console.log statements (optional)

