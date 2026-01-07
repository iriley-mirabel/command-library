# Contributing to Cursor Command Library

Thank you for contributing to the command library! This guide will help you add new commands, improve existing ones, and share updates with the team.

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iriley-mirabel/command-library.git
   cd command-library
   ```

2. **Create a branch:**
   ```bash
   git checkout -b add-my-command
   ```

3. **Make your changes**

4. **Test your changes** in a project

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add new command: /my-command"
   git push origin add-my-command
   ```

6. **Create a pull request**

## 📝 Adding a New Command

### Step 1: Create the Command File

Create a new markdown file in `.cursor/commands/`:

```bash
touch .cursor/commands/my-new-command.md
```

### Step 2: Write the Command

Use this template:

```markdown
# /my-new-command

Brief description of what this command does.

## Purpose
What problem does this solve?

## Usage
`/my-new-command [optional-args]`

## Speed
Fast (30s - 2min) | Moderate (2-5min) | Slow (5-10min)

## When to use
When should developers use this command?

## Instructions
- Step 1
- Step 2
- Step 3

## Examples
Optional examples of usage
```

### Step 3: Test the Command

1. **In a test project**, run the setup script to link commands
2. **Open Cursor** and try the new command
3. **Verify** it works as expected

### Step 4: Update Documentation

If needed, update:
- `masterlistreference.txt` - Add to the appropriate category
- `README.md` - Add to the command list

## 🔧 Improving Existing Commands

### Best Practices

- ✅ Keep commands focused and atomic
- ✅ Use clear, descriptive names
- ✅ Document usage clearly
- ✅ Include speed estimates
- ✅ Provide examples when helpful

### Command Structure

Commands should include:
1. **Title** - The command name (e.g., `# /my-command`)
2. **Description** - What it does
3. **Purpose** - Why it exists
4. **Usage** - How to use it
5. **Speed** - Time estimate
6. **When to use** - Use cases
7. **Instructions** - Step-by-step guidance

## 🔄 Workflow Commands

Workflow commands chain multiple commands together. Example:

```markdown
# /my-workflow

Description of the workflow.

## Execution Steps
1. Run `/command-1`
2. Run `/command-2`
3. Run `/command-3`

## When to use
When to use this workflow
```

## 📋 Command Categories

Organize commands by category:

- **Code Quality & Cleanup** - `/cleanup-unused-code`, `/fix-import-paths`
- **UI Components** - `/fix-filter-bar`, `/fix-data-table`
- **Testing** - `/test-page-quick`, `/test-pages`
- **Workflows** - `/standardize-page`, `/pre-commit-checklist`
- **Discovery** - `/find-command`, `/suggest-command`

## ✅ Before Submitting

- [ ] Command file follows the template
- [ ] Command tested in a real project
- [ ] Documentation updated (if needed)
- [ ] No typos or formatting issues
- [ ] Command name is clear and descriptive

## 🎯 Command Naming

### Good Names
- `/cleanup-unused-code` - Clear and descriptive
- `/fix-import-paths` - Action-oriented
- `/test-page-quick` - Indicates speed

### Avoid
- `/clean` - Too vague (use `/cleanup-unused-code`)
- `/fix` - Too generic
- `/cmd1` - Not descriptive

## 📚 Documentation Updates

When adding commands, consider updating:

1. **masterlistreference.txt** - Complete reference
2. **README.md** - Quick reference table
3. **Category sections** - Add to appropriate category

## 🐛 Reporting Issues

Found a bug or have a suggestion?

1. **Check existing issues** - See if it's already reported
2. **Create an issue** - Describe the problem or suggestion
3. **Provide context** - What command, what happened, expected behavior

## 🔍 Code Review Process

1. **Submit PR** - Create a pull request
2. **Review** - Team members review changes
3. **Test** - Reviewer tests in their environment
4. **Merge** - Once approved, merge to main
5. **Update** - Team members pull updates

## 💡 Ideas for New Commands

Looking for ideas? Consider:

- Common repetitive tasks
- Code quality improvements
- UI standardization needs
- Testing workflows
- Debugging helpers

## 📞 Questions?

- Check [README.md](./README.md) for general info
- Review [masterlistreference.txt](./masterlistreference.txt) for examples
- Open an issue for questions

---

**Thank you for contributing! 🎉**

