---
name: add-error-handling
description: Add error handling to API calls, async operations, and form submissions
---

# ⚠️ Add Error Handling - Standardize Error Management

## Purpose

Detect API calls and async operations without error handling, and add proper try-catch blocks, error state management, and error UI components.

**Note:** This command works on component-level files.

---

## 📋 Usage

```
/add-error-handling [path-to-component]
```

**Examples:**
```
/add-error-handling src/features/email-marketing/pages/FormsPage.tsx
/add-error-handling src/features/subscription-management/components/PlanForm.tsx
```

---

## 🎯 What This Command Adds

### 1. Try-Catch Blocks
```tsx
// ❌ BEFORE - No error handling
const handleSubmit = async () => {
  const result = await api.createForm(data)
  // No error handling
}

// ✅ AFTER - With error handling
const handleSubmit = async () => {
  try {
    setIsLoading(true)
    setError(null)
    const result = await api.createForm(data)
    // Success handling
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to create form')
  } finally {
    setIsLoading(false)
  }
}
```

### 2. Error State Management
```tsx
// ❌ BEFORE - No error state
const [isLoading, setIsLoading] = useState(false)

// ✅ AFTER - With error state
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
```

### 3. Error UI Components
```tsx
// ❌ BEFORE - No error display
return <Form onSubmit={handleSubmit} />

// ✅ AFTER - With error display
return (
  <>
    {error && (
      <Alert variant="error">
        {error}
      </Alert>
    )}
    <Form onSubmit={handleSubmit} />
  </>
)
```

### 4. Validation Error Handling
```tsx
// ❌ BEFORE - No validation errors
<Input value={email} onChange={(e) => setEmail(e.target.value)} />

// ✅ AFTER - With validation errors
const [emailError, setEmailError] = useState<string | null>(null)

<Input
  value={email}
  onChange={(e) => {
    setEmail(e.target.value)
    if (!isValidEmail(e.target.value)) {
      setEmailError('Invalid email address')
    } else {
      setEmailError(null)
    }
  }}
/>
{emailError && <span className="text-error-600 text-sm">{emailError}</span>}
```

---

## 🔍 Detection Patterns

### Missing Error Handling
- API calls without try-catch
- Async functions without error handling
- Form submissions without validation
- Promise chains without .catch()

### Error State Issues
- Missing error state variables
- No error UI components
- Errors not displayed to users
- No error recovery options

---

## ✅ Standard Error Handling Pattern

### Complete Error Handling Implementation
```tsx
// ✅ CORRECT - Standard error handling
export function MyComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Validation
      if (!data.email || !isValidEmail(data.email)) {
        throw new Error('Invalid email address')
      }
      
      // API call
      const result = await api.createItem(data)
      
      // Success handling
      navigate(`/items/${result.id}`)
    } catch (err) {
      // Error handling
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An unexpected error occurred'
      setError(errorMessage)
      
      // Log error for debugging
      console.error('Failed to create item:', err)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <>
      {error && (
        <Alert variant="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  )
}
```

---

## 🛠️ Fix Process

### Step 1: Detection
1. Scan file for API calls
2. Check for async functions
3. Detect missing try-catch blocks
4. Find form submissions
5. Check for error state

### Step 2: Analysis
1. Identify all async operations
2. Determine error types
3. Check for existing error handling
4. Identify error UI needs
5. Determine validation requirements

### Step 3: Implementation
1. Add try-catch blocks to async operations
2. Add error state management
3. Add error UI components
4. Add validation error handling
5. Add error recovery options

### Step 4: Verification
1. Verify error handling works
2. Check error messages display
3. Ensure error recovery works
4. Test error scenarios

---

## 📋 Checklist

When adding error handling, verify:

### Error Handling
- [ ] All async operations have try-catch
- [ ] Error state is managed properly
- [ ] Error messages are user-friendly
- [ ] Errors are logged for debugging

### Error UI
- [ ] Error messages are displayed to users
- [ ] Error UI uses Alert component
- [ ] Users can dismiss errors
- [ ] Error recovery options available

### Validation
- [ ] Form validation errors are displayed
- [ ] Field-level validation works
- [ ] Validation messages are clear
- [ ] Invalid submissions are prevented

---

## 🔄 Common Implementations

### Implementation 1: API Call Error Handling
```tsx
// ❌ BEFORE - No error handling
const loadData = async () => {
  const data = await api.getData()
  setData(data)
}

// ✅ AFTER - With error handling
const [error, setError] = useState<string | null>(null)

const loadData = async () => {
  try {
    setError(null)
    const data = await api.getData()
    setData(data)
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to load data')
  }
}
```

### Implementation 2: Form Submission Error Handling
```tsx
// ❌ BEFORE - No error handling
const handleSubmit = async (data: FormData) => {
  await api.createItem(data)
  navigate('/items')
}

// ✅ AFTER - With error handling
const [error, setError] = useState<string | null>(null)
const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async (data: FormData) => {
  try {
    setIsLoading(true)
    setError(null)
    await api.createItem(data)
    navigate('/items')
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to create item')
  } finally {
    setIsLoading(false)
  }
}
```

### Implementation 3: Validation Error Handling
```tsx
// ❌ BEFORE - No validation
<Input value={email} onChange={(e) => setEmail(e.target.value)} />

// ✅ AFTER - With validation
const [emailError, setEmailError] = useState<string | null>(null)

<Input
  value={email}
  onChange={(e) => {
    setEmail(e.target.value)
    if (e.target.value && !isValidEmail(e.target.value)) {
      setEmailError('Invalid email address')
    } else {
      setEmailError(null)
    }
  }}
/>
{emailError && (
  <span className="text-error-600 text-sm mt-1">{emailError}</span>
)}
```

---

## ⚠️ Important Notes

### What NOT to Change
- **Existing error handling** - Don't modify working error handling
- **Error boundaries** - Don't modify React error boundaries
- **Third-party error handling** - Don't modify library error handling

### Safety Checks
- Always verify error handling works
- Check error messages are user-friendly
- Ensure errors don't break functionality
- Test error scenarios

---

## 🔗 Related Commands

- `/fix-formatting-issues` - Comprehensive fixes

---

## 📊 Report Format

```
⚠️ Error Handling Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: src/features/email-marketing/pages/FormsPage.tsx

Issues Found: 4
Fixes Applied: 4

🔴 CRITICAL - Line 150
  Issue: API call without try-catch block
  Fix: Added try-catch with error state management

🟡 IMPORTANT - Line 200
  Issue: Form submission without error handling
  Fix: Added error handling and error UI

Summary:
- Added try-catch to 3 async operations
- Added error state management
- Added error UI components
- Added validation error handling
```

---

**Ready to add error handling!** Run `/add-error-handling [path]` to standardize error management. 🚀

