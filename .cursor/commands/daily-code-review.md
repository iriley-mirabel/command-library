---
name: daily-code-review
description: Review staged/last-commit files and run cleanup/refactor on those files only
---

# 🔍 Refactor Only the Files You're Committing

Automate a focused review and refactor of just the files in your recent commit scope. This command:
- Detects changed files (staged or last commit)
- Applies cleanup-only changes to those files
- Runs comprehensive refactor checks only on those files

Primary references:
- `.cursorrules` (Pre-flight rules, design tokens, architecture)
- `DOCUMENTATION_INDEX.md` (Primary docs index)
- `DESIGN_TOKENS_REFERENCE.md` (Design token compliance)
- `AVAILABLE_COMPONENTS_CATALOG.md` (Re-use before creating)
- `naming-conventions.md` (Project-wide naming rules)
- `ENHANCED_MODULAR_ARCHITECTURE.md` / `PROJECT_ARCHITECTURE.md`

---

## How It Selects Files

Detection order (first non-empty set wins):
1) Files committed in the last window for the target author (default: last 24 hours for current Git user)
```
# Default author resolution (fallbacks):
#   1) --author (exact string match on name/email)
#   2) git config user.email
#   3) git config user.name
#
# Default time window: --since "24 hours ago" (or --hours 24)

git log --since="<SINCE_WINDOW>" --author="<AUTHOR_QUERY>" \
  --name-only --diff-filter=AMRT --pretty=format: | sort | uniq
```

2) Staged files (about to be committed):
```
git diff --name-only --cached
```
3) If none from above, files in the last commit:
```
git diff --name-only --diff-filter=AMRT HEAD~1..HEAD
```

Filters:
- Include only code files we maintain: `*.ts, *.tsx, *.js, *.jsx, *.mjs, *.cjs, *.json, *.md` (update as needed)
- Exclude generated artifacts: `dist/**`, `coverage/**`, `playwright-report/**`, `node_modules/**`

You can override with flags below.

---

## Usage

```
/daily-code-review [--author "<name-or-email>"] [--since "<git-since>"] [--hours <n>] [--staged-only] [--last-commit] [--include "<glob>"] [--exclude "<glob>"] [--keep-console-logs]
```

Examples:
```
/daily-code-review                            # default: last 24h by current Git user
/daily-code-review --author "dev@company.com" # last 24h by this author
/daily-code-review --hours 6                  # last 6 hours (current user)
/daily-code-review --since "yesterday 6am"    # custom window (git since syntax)
/daily-code-review --staged-only
/daily-code-review --last-commit
/daily-code-review --include "src/features/subscription-portal/**"
/daily-code-review --exclude "src/shared/design-system/**" --keep-console-logs
```

Flags:
- `--author "<name-or-email>"`: Limit to commits by this author (exact name or email match). Defaults to `git config user.email` or `git config user.name`.
- `--since "<git-since>"`: Time window start in git-native syntax (e.g., `"24 hours ago"`, `"yesterday"`, `"2026-01-07 10:00"`). Defaults to `"24 hours ago"`.
- `--hours <n>`: Convenience alternative to `--since` (e.g., `--hours 12` → `--since "12 hours ago"`).
- `--staged-only`: Only consider staged files (ignore last commit)
- `--last-commit`: Force using last commit range (`HEAD~1..HEAD`)
- `--include "<glob>"`: Additional include glob(s)
- `--exclude "<glob>"`: Additional exclude glob(s)
- `--keep-console-logs`: Do not remove console.* statements

---

## What It Runs On Each File

For each selected file, in order:
1) Cleanup dead/unused code
```
/cleanup-unused-code <file> [--remove-console-logs]
```
  - By default, console statements are removed. Use `--keep-console-logs` to keep them.
  - See `cleanup-unused-code.md` for detailed guidance and patterns.

2) Comprehensive refactor & cleanup assessment
```
/refactor-cleanup <file>
```
  - See `refactor-cleanup.md` for comprehensive refactor steps and checklists.

Notes:
- These commands operate per-file to minimize risk and scope.
- They follow the project's design token and architecture standards via `.cursorrules`.

---

## Step-by-Step Flow (Agent)

1) Pre-flight
   - Run `/pre-flight-check` mentally (rules from `.cursorrules`)
   - Confirm design token rules; no inline styles; no CSS files in features

2) Detect file set
   - If neither `--staged-only` nor `--last-commit` provided:
     - Resolve `AUTHOR_QUERY`:
       - If `--author` provided, use it
       - Else try `git config user.email`, then `git config user.name`
     - Resolve time window:
       - If `--hours <n>`, set `--since "<n> hours ago"`
       - Else if `--since "<git-since>"` provided, use that
       - Else default `--since "24 hours ago"`
     - Use git log to gather unique files in the window for the author
   - Else if `--staged-only`: use `git diff --name-only --cached`
   - Else if `--last-commit`: use `git diff --name-only --diff-filter=AMRT HEAD~1..HEAD`
   - Apply includes/excludes and default filters
   - If none found, ask for a path or range

3) Show and confirm scope
   - Print the resolved file list (short)
   - Continue automatically (non-interactive mode) unless empty

4) Run per-file actions
   - For each file:
     - `/cleanup-unused-code <file>` (omit `--remove-console-logs` if `--keep-console-logs` was provided)
     - `/refactor-cleanup <file>`

5) Verify
   - Ensure typecheck/build still passes for touched files (or run project typecheck if quick)
   - Summarize changes per file (what was cleaned/refactored)

---

## Safety & Compliance

- Respect project rules:
  - No hardcoded colors/spacing/fonts; use design tokens
  - No CSS files in feature folders
  - Use shared components from `src/shared/components/ui/` first
  - Follow naming rules in `naming-conventions.md`
  - Database field names must match schema; check Prisma and field mappings
- Limit scope strictly to selected files
- Prefer low-risk cleanups first; provide notes if medium/high-risk refactors are proposed

---

## 🚨 MANDATORY ARCHITECTURE PATTERN

### **Required Data Flow (ALL Development)**

**ALL development MUST follow this strict hierarchy:**

```
Page → Components → Hooks (Business Logic) → Services → axiosService
```

### **Critical Rules:**

1. **Components MUST NEVER directly import or use `axiosService`**
   - ❌ **FORBIDDEN**: `import axiosService from '@/services/axiosService'` in any component
   - ✅ **REQUIRED**: All API calls must go through hooks

2. **All Business Logic MUST be in Hooks**
   - Data fetching logic
   - Form submission logic
   - State management logic
   - Validation logic
   - All reusable business logic

3. **Services are the ONLY layer that can use `axiosService`**
   - Services handle HTTP requests
   - Services transform API responses
   - Services handle API errors

4. **Hooks call Services, Services call axiosService**
   - Hooks contain business logic and orchestration
   - Services contain API-specific logic
   - Clear separation of concerns

---

## Output Format

Provide a concise, file-scoped report:
```
🧭 Refactor Committed Files Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Files:
- src/features/.../A.tsx
- src/features/.../B.ts

A.tsx
- Removed 3 unused imports
- Removed 2 console.log statements
- Extracted small utility function
- Added missing type annotations

B.ts
- Removed commented code block (12 lines)
- Replaced 'any' with specific interface
- Memoized expensive computation
```

---

## Related Commands
- `/cleanup-unused-code` (runs first per file)
- `/refactor-cleanup` (runs second per file)
- `/pre-flight-check`

Use this command to keep changes tight and safe—only the files you’re committing are modified. 🚀



