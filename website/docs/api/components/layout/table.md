# Table

A comprehensive data table component with sorting, filtering, pagination, row selection, and customizable columns.

## Import

```javascript
import { Table } from '@priolo/jack'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | `[]` | Array of data objects to display |
| `columns` | `ColumnConfig[]` | `[]` | Column configuration array |
| `className` | `string` | - | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `variant` | `'default' \| 'striped' \| 'bordered' \| 'compact' \| 'elevated'` | `'default'` | Visual variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Table size |
| `loading` | `boolean` | `false` | Show loading state |
| `error` | `string \| Error` | - | Error message to display |
| `emptyMessage` | `React.ReactNode` | `'No data available'` | Message when table is empty |
| `sortable` | `boolean` | `true` | Enable column sorting |
| `filterable` | `boolean` | `false` | Enable column filtering |
| `selectable` | `boolean \| 'single' \| 'multiple'` | `false` | Enable row selection |
| `selectedRows` | `any[]` | `[]` | Controlled selected rows |
| `onSelectionChange` | `(rows: any[]) => void` | - | Selection change callback |
| `pagination` | `PaginationConfig \| boolean` | `false` | Pagination configuration |
| `currentPage` | `number` | `1` | Current page (controlled) |
| `pageSize` | `number` | `10` | Items per page |
| `totalItems` | `number` | - | Total items for server-side pagination |
| `onPageChange` | `(page: number, pageSize: number) => void` | - | Page change callback |
| `sortBy` | `string` | - | Currently sorted column |
| `sortDirection` | `'asc' \| 'desc'` | `'asc'` | Sort direction |
| `onSort` | `(column: string, direction: 'asc' \| 'desc') => void` | - | Sort callback |
| `onRowClick` | `(row: any, index: number) => void` | - | Row click handler |
| `onRowDoubleClick` | `(row: any, index: number) => void` | - | Row double click handler |
| `rowClassName` | `(row: any, index: number) => string` | - | Dynamic row class function |
| `expandable` | `boolean` | `false` | Enable row expansion |
| `expandedRows` | `any[]` | `[]` | Currently expanded rows |
| `onRowExpand` | `(row: any, expanded: boolean) => void` | - | Row expand callback |
| `renderExpandedRow` | `(row: any) => React.ReactNode` | - | Render expanded row content |
| `stickyHeader` | `boolean` | `false` | Make header sticky |
| `virtualScrolling` | `boolean` | `false` | Enable virtual scrolling for large datasets |
| `rowHeight` | `number` | `40` | Row height for virtual scrolling |

## ColumnConfig Interface

```typescript
interface ColumnConfig {
  key: string                           // Data property key
  title: string                         // Column header title
  width?: number | string               // Column width
  minWidth?: number                     // Minimum column width
  maxWidth?: number                     // Maximum column width
  sortable?: boolean                    // Override global sortable
  filterable?: boolean                  // Override global filterable
  resizable?: boolean                   // Allow column resizing
  hidden?: boolean                      // Hide column
  pinned?: 'left' | 'right'            // Pin column to side
  align?: 'left' | 'center' | 'right'  // Text alignment
  type?: ColumnType                     // Data type for formatting
  format?: string | FormatFunction      // Custom formatting
  render?: (value: any, row: any, index: number) => React.ReactNode
  headerRender?: () => React.ReactNode  // Custom header content
  filter?: FilterConfig                 // Custom filter configuration
  className?: string                    // Column CSS class
  headerClassName?: string              // Header CSS class
}

type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'percentage' | 'image' | 'link' | 'tag'
```

## Basic Usage

### Simple Table

```jsx
import { Table } from '@priolo/jack'

function BasicExample() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
  ]
  
  const columns = [
    { key: 'id', title: 'ID', width: 80 },
    { key: 'name', title: 'Name', width: 200 },
    { key: 'email', title: 'Email', width: 250 },
    { key: 'role', title: 'Role', width: 120 }
  ]
  
  return (
    <Table
      data={data}
      columns={columns}
      sortable
    />
  )
}
```

### Formatted Columns

```jsx
function FormattedExample() {
  const salesData = [
    { 
      id: 1, 
      product: 'Laptop', 
      price: 1299.99, 
      quantity: 5, 
      discount: 0.1,
      soldDate: new Date('2024-01-15'),
      inStock: true,
      image: 'laptop.jpg'
    },
    { 
      id: 2, 
      product: 'Mouse', 
      price: 29.99, 
      quantity: 50, 
      discount: 0.05,
      soldDate: new Date('2024-01-16'),
      inStock: false,
      image: 'mouse.jpg'
    }
  ]
  
  const columns = [
    {
      key: 'image',
      title: 'Image',
      width: 80,
      type: 'image',
      render: (value) => (
        <img src={value} alt="Product" style={{ width: 40, height: 40 }} />
      )
    },
    { key: 'product', title: 'Product', width: 150 },
    { 
      key: 'price', 
      title: 'Price', 
      width: 100,
      type: 'currency',
      align: 'right'
    },
    { 
      key: 'quantity', 
      title: 'Qty', 
      width: 80,
      type: 'number',
      align: 'center'
    },
    { 
      key: 'discount', 
      title: 'Discount', 
      width: 100,
      type: 'percentage',
      align: 'right'
    },
    { 
      key: 'soldDate', 
      title: 'Sale Date', 
      width: 120,
      type: 'date',
      format: 'MM/dd/yyyy'
    },
    {
      key: 'inStock',
      title: 'In Stock',
      width: 100,
      type: 'boolean',
      render: (value) => (
        <span className={`badge ${value ? 'badge-success' : 'badge-danger'}`}>
          {value ? 'Yes' : 'No'}
        </span>
      )
    }
  ]
  
  return (
    <Table
      data={salesData}
      columns={columns}
      variant="striped"
      sortable
    />
  )
}
```

## Advanced Examples

### Selectable Table with Actions

```jsx
function SelectableExample() {
  const [data, setData] = React.useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'pending' }
  ])
  const [selectedRows, setSelectedRows] = React.useState([])
  
  const columns = [
    { key: 'name', title: 'Name', width: 200 },
    { key: 'email', title: 'Email', width: 250 },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      render: (value) => (
        <span className={`status-badge status-${value}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      width: 150,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn-sm btn-primary"
            onClick={() => editUser(row)}
          >
            Edit
          </button>
          <button 
            className="btn-sm btn-danger"
            onClick={() => deleteUser(row)}
          >
            Delete
          </button>
        </div>
      )
    }
  ]
  
  const editUser = (user) => {
    console.log('Edit user:', user)
  }
  
  const deleteUser = (user) => {
    setData(prev => prev.filter(u => u.id !== user.id))
  }
  
  const bulkDelete = () => {
    const selectedIds = selectedRows.map(row => row.id)
    setData(prev => prev.filter(u => !selectedIds.includes(u.id)))
    setSelectedRows([])
  }
  
  return (
    <div>
      {selectedRows.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <span>{selectedRows.length} rows selected</span>
          <button onClick={bulkDelete} className="btn-danger ml-2">
            Delete Selected
          </button>
        </div>
      )}
      <Table
        data={data}
        columns={columns}
        selectable="multiple"
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        variant="bordered"
      />
    </div>
  )
}
```

### Expandable Rows

```jsx
function ExpandableExample() {
  const orderData = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      total: 157.50,
      date: new Date('2024-01-15'),
      status: 'completed',
      items: [
        { product: 'Laptop', quantity: 1, price: 129.99 },
        { product: 'Mouse', quantity: 1, price: 27.51 }
      ]
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      total: 89.99,
      date: new Date('2024-01-16'),
      status: 'pending',
      items: [
        { product: 'Keyboard', quantity: 1, price: 89.99 }
      ]
    }
  ]
  
  const columns = [
    { key: 'id', title: 'Order ID', width: 120 },
    { key: 'customer', title: 'Customer', width: 200 },
    { 
      key: 'total', 
      title: 'Total', 
      width: 100, 
      type: 'currency',
      align: 'right'
    },
    { 
      key: 'date', 
      title: 'Date', 
      width: 120, 
      type: 'date'
    },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      render: (value) => (
        <span className={`status-badge status-${value}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ]
  
  const renderExpandedRow = (order) => (
    <div style={{ padding: '16px', backgroundColor: '#f9f9f9' }}>
      <h4>Order Items</h4>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
  
  return (
    <Table
      data={orderData}
      columns={columns}
      expandable
      renderExpandedRow={renderExpandedRow}
      variant="elevated"
    />
  )
}
```

### Paginated Table

```jsx
function PaginatedExample() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [totalItems, setTotalItems] = React.useState(0)
  
  const columns = [
    { key: 'id', title: 'ID', width: 80 },
    { key: 'name', title: 'Name', width: 200 },
    { key: 'email', title: 'Email', width: 250 },
    { key: 'department', title: 'Department', width: 150 },
    { key: 'joinDate', title: 'Join Date', width: 120, type: 'date' }
  ]
  
  // Simulate API call
  const fetchData = async (page, size) => {
    setLoading(true)
    try {
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockData = generateMockEmployees(page, size)
      setData(mockData.items)
      setTotalItems(mockData.total)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  React.useEffect(() => {
    fetchData(currentPage, pageSize)
  }, [currentPage, pageSize])
  
  const handlePageChange = (page, size) => {
    setCurrentPage(page)
    setPageSize(size)
  }
  
  return (
    <Table
      data={data}
      columns={columns}
      loading={loading}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => 
          `${range[0]}-${range[1]} of ${total} items`
      }}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      variant="striped"
    />
  )
}
```

### Filterable and Sortable Table

```jsx
function FilterableExample() {
  const [data, setData] = React.useState(originalData)
  const [filters, setFilters] = React.useState({})
  const [sortBy, setSortBy] = React.useState('')
  const [sortDirection, setSortDirection] = React.useState('asc')
  
  const columns = [
    { 
      key: 'name', 
      title: 'Name', 
      width: 200,
      filterable: true,
      filter: { type: 'text', placeholder: 'Search names...' }
    },
    { 
      key: 'department', 
      title: 'Department', 
      width: 150,
      filterable: true,
      filter: { 
        type: 'select',
        options: [
          { value: 'engineering', label: 'Engineering' },
          { value: 'marketing', label: 'Marketing' },
          { value: 'sales', label: 'Sales' }
        ]
      }
    },
    { 
      key: 'salary', 
      title: 'Salary', 
      width: 120,
      type: 'currency',
      align: 'right',
      filterable: true,
      filter: { 
        type: 'range',
        min: 30000,
        max: 200000
      }
    },
    { 
      key: 'startDate', 
      title: 'Start Date', 
      width: 120,
      type: 'date',
      filterable: true,
      filter: { type: 'dateRange' }
    },
    {
      key: 'active',
      title: 'Active',
      width: 80,
      type: 'boolean',
      filterable: true,
      filter: { type: 'boolean' }
    }
  ]
  
  const handleSort = (column, direction) => {
    setSortBy(column)
    setSortDirection(direction)
    
    const sortedData = [...data].sort((a, b) => {
      const aVal = a[column]
      const bVal = b[column]
      
      if (direction === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
    
    setData(sortedData)
  }
  
  const handleFilter = (column, value) => {
    setFilters(prev => ({ ...prev, [column]: value }))
    
    // Apply filters to original data
    let filteredData = originalData
    Object.entries({ ...filters, [column]: value }).forEach(([key, val]) => {
      if (val) {
        filteredData = filteredData.filter(row => {
          // Implement filter logic based on column type
          return row[key].toString().toLowerCase().includes(val.toLowerCase())
        })
      }
    })
    
    setData(filteredData)
  }
  
  return (
    <Table
      data={data}
      columns={columns}
      sortable
      filterable
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSort={handleSort}
      onFilter={handleFilter}
      variant="bordered"
      stickyHeader
    />
  )
}
```

## Virtual Scrolling

### Large Dataset Example

```jsx
function VirtualScrollExample() {
  // Generate large dataset
  const largeData = React.useMemo(() => 
    Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      score: Math.floor(Math.random() * 100),
      active: Math.random() > 0.5
    })), []
  )
  
  const columns = [
    { key: 'id', title: 'ID', width: 80 },
    { key: 'name', title: 'Name', width: 150 },
    { key: 'email', title: 'Email', width: 200 },
    { key: 'score', title: 'Score', width: 100, type: 'number' },
    { key: 'active', title: 'Active', width: 80, type: 'boolean' }
  ]
  
  return (
    <div style={{ height: '400px' }}>
      <Table
        data={largeData}
        columns={columns}
        virtualScrolling
        rowHeight={40}
        variant="compact"
      />
    </div>
  )
}
```

## Styling

### CSS Classes

The Table component applies these CSS classes:

- `.jack-table` - Base table container
- `.jack-table--{variant}` - Variant-specific styling
- `.jack-table--size-{size}` - Size-specific styling
- `.jack-table--loading` - Loading state
- `.jack-table--selectable` - When selection is enabled
- `.jack-table-header` - Table header
- `.jack-table-header--sticky` - Sticky header
- `.jack-table-body` - Table body
- `.jack-table-row` - Table row
- `.jack-table-row--selected` - Selected row
- `.jack-table-row--expanded` - Expanded row
- `.jack-table-cell` - Table cell
- `.jack-table-cell--{align}` - Cell alignment
- `.jack-table-cell--sortable` - Sortable column header
- `.jack-table-cell--sorted` - Currently sorted column
- `.jack-table-pagination` - Pagination container

### Custom Styling

```css
.jack-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.jack-table--striped .jack-table-row:nth-child(even) {
  background-color: #f9f9f9;
}

.jack-table--bordered {
  border: 1px solid #e0e0e0;
}

.jack-table--bordered .jack-table-cell {
  border: 1px solid #e0e0e0;
}

.jack-table--compact .jack-table-cell {
  padding: 8px 12px;
}

.jack-table--elevated {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.jack-table-header {
  background-color: #f5f5f5;
  font-weight: 600;
}

.jack-table-header--sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}

.jack-table-row:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.jack-table-row--selected {
  background-color: #e3f2fd;
}

.jack-table-cell {
  padding: 12px 16px;
  text-align: left;
  vertical-align: middle;
}

.jack-table-cell--center {
  text-align: center;
}

.jack-table-cell--right {
  text-align: right;
}

.jack-table-cell--sortable {
  cursor: pointer;
  user-select: none;
}

.jack-table-cell--sortable:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
```

## Accessibility

The Table component follows accessibility best practices:

- Proper semantic HTML table structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### Example with ARIA

```jsx
function AccessibleTable() {
  return (
    <Table
      data={data}
      columns={columns}
      aria-label="Employee data table"
      role="table"
      selectable="multiple"
      sortable
      caption="List of all employees with their details"
    />
  )
}
```

## Best Practices

### Performance Optimization

- Use virtual scrolling for large datasets (>1000 rows)
- Implement server-side pagination for very large datasets
- Memoize column configurations
- Use `React.memo` for custom cell renderers

### Data Management

```jsx
// Good: Proper data structure
const wellStructuredData = [
  {
    id: 1, // Always include unique identifier
    name: 'John Doe',
    email: 'john@example.com',
    metadata: { department: 'Engineering' } // Nested data is fine
  }
]

// Good: Stable column configuration
const stableColumns = React.useMemo(() => [
  { key: 'name', title: 'Name', width: 200 },
  { key: 'email', title: 'Email', width: 250 }
], [])
```

### TypeScript Integration

```typescript
interface Employee {
  id: number
  name: string
  email: string
  department: string
  active: boolean
}

const typedColumns: ColumnConfig<Employee>[] = [
  { key: 'name', title: 'Name', width: 200 },
  { key: 'email', title: 'Email', width: 250 },
  { key: 'department', title: 'Department', width: 150 },
  { 
    key: 'active', 
    title: 'Status',
    render: (value: boolean) => value ? 'Active' : 'Inactive'
  }
]
```