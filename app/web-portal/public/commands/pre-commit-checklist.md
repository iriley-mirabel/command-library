# /pre-commit-checklist

Complete quality check before PR.

## Purpose
Pre-commit quality check workflow - runs all quality checks

## Usage
`/pre-commit-checklist [path]`

## Speed
Fast (3-5min)

## When to use
Before every commit, before PR

## Workflow
1. Audit for logs/dead code.
2. Verify design token compliance.
3. Run quick smoke tests on critical routes.
4. Generate /pr-ready summary.

## Workflow includes
- Code cleanup
- Import fixes
- Spacing fixes
- Design token check
- Quick test
- PR readiness check

