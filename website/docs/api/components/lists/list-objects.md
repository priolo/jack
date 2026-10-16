# ListObjects

A specialized list component optimized for displaying and managing objects with built-in property mapping and advanced features.

## Import

```tsx
import { ListObjects } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | `[]` | Array of objects to display |
| `keyProperty` | `keyof T` | `"id"` | Property to use as unique key |
| `displayProperty` | `keyof T \| ((item: T) => string)` | - | Property or function for main display text |
| `secondaryProperty` | `keyof T \| ((item: T) => string)` | - | Property or function for secondary text |
| `imageProperty` | `keyof T` | - | Property containing image URL |
| `statusProperty` | `keyof T` | - | Property for status indication |
| `groupBy` | `keyof T \| ((item: T) => string)` | - | Property or function to group items by |
| `selectedItems` | `T[]` | `[]` | Currently selected objects |
| `onSelectionChange` | `(selected: T[]) => void` | - | Callback when selection changes |
| `selectionMode` | `"none" \| "single" \| "multiple"` | `"none"` | Object selection mode |
| `sortBy` | `keyof T \| ((item: T) => any)` | - | Property or function to sort by |
| `sortDirection` | `"asc" \| "desc"` | `"asc"` | Sort direction |
| `filterBy` | `keyof T \| ((item: T) => any)` | - | Property or function to filter by |
| `filterValue` | `any` | - | Value to filter by |
| `searchable` | `boolean` | `false` | Whether to show search input |
| `searchProperties` | `(keyof T)[]` | - | Properties to search within |
| `showGroups` | `boolean` | `true` | Whether to show group headers |
| `showImages` | `boolean` | `true` | Whether to display images |
| `showSecondary` | `boolean` | `true` | Whether to show secondary text |
| `showStatus` | `boolean` | `true` | Whether to show status indicators |
| `onItemClick` | `(item: T) => void` | - | Callback when object is clicked |
| `onItemDoubleClick` | `(item: T) => void` | - | Callback when object is double-clicked |
| `className` | `string` | - | Additional CSS classes |

## Usage

### Basic Object List

```tsx
interface User {
  id: string
  name: string
  email: string
  avatar: string
  status: "online" | "offline" | "away"
}

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", avatar: "/avatars/john.jpg", status: "online" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "/avatars/jane.jpg", status: "away" }
]

<ListObjects
  items={users}
  keyProperty="id"
  displayProperty="name"
  secondaryProperty="email"
  imageProperty="avatar"
  statusProperty="status"
/>
```

### Searchable Product List

```tsx
interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  inStock: boolean
}

<ListObjects
  items={products}
  keyProperty="id"
  displayProperty="name"
  secondaryProperty={(product) => `$${product.price.toFixed(2)}`}
  imageProperty="image"
  statusProperty={(product) => product.inStock ? "available" : "out-of-stock"}
  searchable={true}
  searchProperties={["name", "category"]}
  groupBy="category"
/>
```

### Employee Directory with Selection

```tsx
const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])

<ListObjects
  items={employees}
  keyProperty="id"
  displayProperty={(emp) => `${emp.firstName} ${emp.lastName}`}
  secondaryProperty={(emp) => `${emp.department} • ${emp.position}`}
  imageProperty="profilePhoto"
  statusProperty="availability"
  selectionMode="multiple"
  selectedItems={selectedEmployees}
  onSelectionChange={setSelectedEmployees}
  groupBy="department"
  sortBy={(emp) => emp.lastName}
/>
```

### File Manager

```tsx
interface FileObject {
  id: string
  name: string
  size: number
  type: string
  modified: Date
  icon: string
}

<ListObjects
  items={files}
  keyProperty="id"
  displayProperty="name"
  secondaryProperty={(file) => `${formatFileSize(file.size)} • ${formatDate(file.modified)}`}
  imageProperty="icon"
  statusProperty="type"
  groupBy={(file) => file.type}
  sortBy="modified"
  sortDirection="desc"
  onItemDoubleClick={(file) => openFile(file)}
/>
```

### Filtered Contact List

```tsx
const [filter, setFilter] = useState("")

<ListObjects
  items={contacts}
  keyProperty="id"
  displayProperty={(contact) => `${contact.firstName} ${contact.lastName}`}
  secondaryProperty={(contact) => contact.company}
  imageProperty="avatar"
  searchable={true}
  searchProperties={["firstName", "lastName", "company", "email"]}
  sortBy={(contact) => contact.lastName}
/>
```

## Features

- **Object-Oriented**: Designed specifically for object collections
- **Property Mapping**: Flexible property binding for display
- **Grouping**: Automatic grouping by any property
- **Search**: Multi-property search functionality
- **Sorting**: Sort by any property or custom function
- **Status Indicators**: Visual status representation
- **Image Support**: Built-in image/avatar display
- **Selection**: Single or multiple object selection

## Related Components

- [`List`](./list.md) - Basic list component
- [`EditList`](./edit-list.md) - Editable list with CRUD operations
- [`ListMultiWithFilter`](./list-multi-with-filter.md) - Multi-select with filtering

## CSS Classes

- `.list-objects` - Base list container
- `.list-objects__search` - Search input container
- `.list-objects__group` - Group header
- `.list-objects__group-title` - Group title text
- `.list-objects__item` - Individual object item
- `.list-objects__item-image` - Object image/avatar
- `.list-objects__item-content` - Main content area
- `.list-objects__item-primary` - Primary display text
- `.list-objects__item-secondary` - Secondary display text
- `.list-objects__item-status` - Status indicator
- `.list-objects__item--selected` - Selected item styling

## Accessibility

- Proper semantic markup with roles
- Keyboard navigation support
- Screen reader friendly grouping
- ARIA labels for status indicators
- Focus management for selection

## Common Patterns

### Team Directory

```tsx
const TeamDirectory = ({ team }: { team: Team }) => {
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([])
  
  return (
    <div className="team-directory">
      <h2>{team.name}</h2>
      <ListObjects
        items={team.members}
        keyProperty="id"
        displayProperty={(member) => `${member.firstName} ${member.lastName}`}
        secondaryProperty={(member) => `${member.role} • ${member.email}`}
        imageProperty="profileImage"
        statusProperty="availability"
        groupBy="department"
        selectionMode="multiple"
        selectedItems={selectedMembers}
        onSelectionChange={setSelectedMembers}
        searchable={true}
        searchProperties={["firstName", "lastName", "email", "role"]}
        onItemClick={(member) => viewMemberProfile(member)}
      />
      
      {selectedMembers.length > 0 && (
        <div className="selected-actions">
          <Button onClick={() => sendMessageToMembers(selectedMembers)}>
            Send Message ({selectedMembers.length})
          </Button>
        </div>
      )}
    </div>
  )
}
```

### Media Library

```tsx
const MediaLibrary = ({ media }: { media: MediaFile[] }) => {
  const [filter, setFilter] = useState<string>("")
  const [sortBy, setSortBy] = useState<keyof MediaFile>("dateAdded")
  
  return (
    <div className="media-library">
      <div className="library-controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as keyof MediaFile)}>
          <option value="name">Name</option>
          <option value="dateAdded">Date Added</option>
          <option value="size">Size</option>
        </select>
      </div>
      
      <ListObjects
        items={media}
        keyProperty="id"
        displayProperty="name"
        secondaryProperty={(file) => `${formatFileSize(file.size)} • ${formatDate(file.dateAdded)}`}
        imageProperty="thumbnail"
        statusProperty="type"
        groupBy={(file) => file.type}
        sortBy={sortBy}
        sortDirection="desc"
        searchable={true}
        searchProperties={["name", "tags", "description"]}
        onItemDoubleClick={(file) => openMediaFile(file)}
      />
    </div>
  )
}
```

### Order Management

```tsx
const OrderList = ({ orders }: { orders: Order[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "yellow"
      case "processing": return "blue"
      case "shipped": return "green"
      case "delivered": return "success"
      case "cancelled": return "red"
      default: return "gray"
    }
  }
  
  return (
    <ListObjects
      items={orders}
      keyProperty="id"
      displayProperty={(order) => `Order #${order.number}`}
      secondaryProperty={(order) => `${order.customerName} • $${order.total.toFixed(2)}`}
      statusProperty="status"
      groupBy="status"
      sortBy="createdAt"
      sortDirection="desc"
      searchable={true}
      searchProperties={["number", "customerName", "customerEmail"]}
      onItemClick={(order) => viewOrderDetails(order)}
    />
  )
}
```
