---
name: implement-view-modes
description: Ensure pages have both table and card views with proper view toggle implementation
---

# 👁️ Implement View Modes - Add Missing Table/Card Views

## Purpose

Detect pages with only one view (table OR card, not both) and implement the missing view. This command ensures all pages with filter bars have both table and card views with proper view toggle functionality.

**Note:** This command integrates with `/fix-filter-bar` to ensure view toggles are present.

---

## 📋 Usage

```
/implement-view-modes [path-to-page-component]
```

**Examples:**
```
/implement-view-modes src/features/email-marketing/pages/FormsPage.tsx
/implement-view-modes src/features/subscription-management/pages/PlansPage.tsx
/implement-view-modes src/features/products/pages/ProductsPage.tsx
```

---

## 🎯 What This Command Does

### 1. Detects Missing Views
```tsx
// ❌ BEFORE - Only card view exists
{viewMode === 'cards' && <CardView data={data} />}

// ✅ AFTER - Both views exist
{viewMode === 'table' && <EnhancedDataTable data={data} columns={columns} />}
{viewMode === 'cards' && <CardView data={data} />}
```

### 2. Adds View State Management
```tsx
// ❌ BEFORE - No view state
export function MyPage() {
  return <CardView data={data} />
}

// ✅ AFTER - View state added
export function MyPage() {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  
  return (
    <>
      <EnhancedFilterBar
        activeView={viewMode}
        onViewChange={(view) => setViewMode(view === 'cards' ? 'cards' : 'table')}
      />
      {viewMode === 'table' && <EnhancedDataTable data={data} columns={columns} />}
      {viewMode === 'cards' && <CardView data={data} />}
    </>
  )
}
```

### 3. Creates Table View Implementation
```tsx
// ✅ Creates proper table view with EnhancedDataTable
{viewMode === 'table' && (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
    <EnhancedDataTable
      id="items-table"
      data={items}
      columns={columns}
      enableSelection={true}
      enablePagination={true}
      rowDensity="compact"
    />
  </div>
)}
```

### 4. Ensures View Toggle in Filter Bar
```tsx
// ✅ Adds view toggle to filter bar
<EnhancedFilterBar
  activeView={viewMode}
  onViewChange={(view) => setViewMode(view === 'cards' ? 'cards' : 'table')}
  hideViewIcons={['kanban', 'split']}
/>
```

---

## 🔍 Detection Patterns

### Missing Views to Detect
- Pages with only `CardView` or `CardGrid` (missing table)
- Pages with only `EnhancedDataTable` or table (missing cards)
- Pages with view state but only one view implementation
- Pages with filter bar but no view toggle

### View State Issues
- Missing view state management
- View state not connected to filter bar
- View toggle buttons missing from filter bar
- View mode not persisted (optional)

---

## ✅ Standard View Implementation

### Complete View Implementation
```tsx
// ✅ CORRECT - Both views with proper state management
export function MyPage() {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [data, setData] = useState<Item[]>([])
  
  // Define table columns
  const columns: ColumnDefinition<Item>[] = useMemo(() => [
    {
      id: 'name',
      header: 'Name',
      accessor: 'name',
      sortable: true,
      resizable: true,
      width: 200,
    },
    // ... more columns
  ], [])
  
  return (
    <div>
      <EnhancedFilterBar
        activeView={viewMode}
        onViewChange={(view) => setViewMode(view === 'cards' ? 'cards' : 'table')}
        hideViewIcons={['kanban', 'split']}
      />
      
      {viewMode === 'table' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <EnhancedDataTable
            id="items-table"
            data={data}
            columns={columns}
            enableSelection={true}
            enablePagination={true}
            rowDensity="compact"
          />
        </div>
      )}
      
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## 🛠️ Implementation Process

### Step 1: Detection
1. Scan page for view implementations
2. Check for view state management
3. Detect missing view (table or card)
4. Check filter bar for view toggle
5. Identify data structure and columns needed

### Step 2: Analysis
1. Determine which view is missing
2. Analyze existing view for patterns
3. Identify data structure
4. Determine column definitions needed
5. Check for selection/actions needed

### Step 3: Implementation
1. Add view state management
2. Create missing view implementation
3. Add view toggle to filter bar
4. Ensure both views have full functionality
5. Add proper imports

### Step 4: Verification
1. Verify both views render correctly
2. Check view toggle works
3. Ensure data displays in both views
4. Verify selection/actions work in both views
5. Test responsive behavior

---

## 📋 Checklist

When implementing view modes, verify:

### View State
- [ ] View state is defined (`useState<'table' | 'cards'>`)
- [ ] View state is connected to filter bar
- [ ] View toggle buttons are present in filter bar
- [ ] View state persists (optional, can use localStorage)

### Table View
- [ ] Table view uses `EnhancedDataTable`
- [ ] Columns are properly defined
- [ ] Selection works (if needed)
- [ ] Actions work (if needed)
- [ ] Pagination works (if needed)

### Card View
- [ ] Card view uses grid layout
- [ ] Cards display all necessary data
- [ ] Selection works (if needed)
- [ ] Actions work (if needed)
- [ ] Responsive grid (1/2/3 columns)

### Integration
- [ ] Both views display same data
- [ ] Both views have same functionality
- [ ] View toggle switches between views
- [ ] No duplicate view controls

---

## 🔄 Common Implementations

### Implementation 1: Add Missing Table View
```tsx
// ❌ BEFORE - Only card view
export function MyPage() {
  const [viewMode, setViewMode] = useState<'cards'>('cards')
  
  return (
    <>
      <EnhancedFilterBar activeView={viewMode} onViewChange={setViewMode} />
      {viewMode === 'cards' && <CardView data={data} />}
    </>
  )
}

// ✅ AFTER - Both views
export function MyPage() {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  
  const columns: ColumnDefinition<Item>[] = useMemo(() => [
    { id: 'name', header: 'Name', accessor: 'name', sortable: true, width: 200 },
    // ... more columns
  ], [])
  
  return (
    <>
      <EnhancedFilterBar
        activeView={viewMode}
        onViewChange={(view) => setViewMode(view === 'cards' ? 'cards' : 'table')}
        hideViewIcons={['kanban', 'split']}
      />
      {viewMode === 'table' && (
        <EnhancedDataTable data={data} columns={columns} />
      )}
      {viewMode === 'cards' && <CardView data={data} />}
    </>
  )
}
```

### Implementation 2: Add Missing Card View
```tsx
// ❌ BEFORE - Only table view
export function MyPage() {
  return <EnhancedDataTable data={data} columns={columns} />
}

// ✅ AFTER - Both views
export function MyPage() {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  
  return (
    <>
      <EnhancedFilterBar
        activeView={viewMode}
        onViewChange={(view) => setViewMode(view === 'cards' ? 'cards' : 'table')}
        hideViewIcons={['kanban', 'split']}
      />
      {viewMode === 'table' && (
        <EnhancedDataTable data={data} columns={columns} />
      )}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  )
}
```

### Implementation 3: Add View State Management
```tsx
// ❌ BEFORE - No view state
export function MyPage() {
  return (
    <>
      <SimpleFilterBar />
      <CardView data={data} />
    </>
  )
}

// ✅ AFTER - View state added
export function MyPage() {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  
  const columns: ColumnDefinition<Item>[] = useMemo(() => [
    // ... column definitions
  ], [])
  
  return (
    <>
      <EnhancedFilterBar
        activeView={viewMode}
        onViewChange={(view) => setViewMode(view === 'cards' ? 'cards' : 'table')}
        hideViewIcons={['kanban', 'split']}
      />
      {viewMode === 'table' && (
        <EnhancedDataTable data={data} columns={columns} />
      )}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  )
}
```

---

## ⚠️ Important Notes

### What NOT to Change
- **Existing view implementations** - Don't modify working views
- **Data structure** - Keep existing data format
- **Functionality** - Both views should have same features
- **Styling** - Preserve existing card/table styling

### Safety Checks
- Always verify both views work after implementation
- Check selection/actions work in both views
- Ensure data displays correctly
- Test view toggle functionality
- Verify responsive behavior

---

## 🔗 Related Commands

- `/fix-filter-bar` - Ensures view toggle is in filter bar
- `/fix-data-table` - Standardizes table implementation
- `/fix-table-columns` - Fixes column definitions

---

## 📊 Report Format

```
👁️ View Modes Implementation Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: src/features/email-marketing/pages/FormsPage.tsx

Issues Found: 2
Fixes Applied: 2

🔴 CRITICAL - Missing Table View
  Issue: Page only has card view, missing table view
  Fix: Added EnhancedDataTable implementation with columns

🟡 IMPORTANT - Missing View Toggle
  Issue: Filter bar doesn't have view toggle buttons
  Fix: Added activeView and onViewChange to EnhancedFilterBar

Summary:
- Added table view implementation
- Added view state management
- Added view toggle to filter bar
- Both views now functional
```

---

## 🎯 View Mode Rules

### Required Views
- **Table view** - MUST use `EnhancedDataTable`
- **Card view** - MUST use grid layout with cards
- **Both views** - MUST display same data with same functionality

### View State
- Use `useState<'table' | 'cards'>`
- Default to 'table'
- Connect to filter bar
- Optional: Persist in localStorage

### View Toggle
- MUST be in filter bar (not separate)
- Use `EnhancedFilterBar` with `activeView` and `onViewChange`
- Hide kanban/split views: `hideViewIcons={['kanban', 'split']}`

---

**Ready to implement view modes!** Run `/implement-view-modes [path]` to add missing views to your pages. 🚀

