# List

A versatile list component for displaying collections of items with selection, filtering, and interaction capabilities.

## Import

```tsx
import { List } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | `[]` | Array of items to display |
| `renderItem` | `(item: T, index: number) => React.ReactNode` | - | Function to render each item |
| `selectedItems` | `T[]` | `[]` | Currently selected items |
| `onSelectionChange` | `(selected: T[]) => void` | - | Callback when selection changes |
| `selectionMode` | `"none" \| "single" \| "multiple"` | `"none"` | Item selection mode |
| `itemKey` | `string \| ((item: T) => string)` | `"id"` | Key property or function for item identification |
| `emptyMessage` | `string \| React.ReactNode` | `"No items found"` | Message when list is empty |
| `loading` | `boolean` | `false` | Whether list is in loading state |
| `loadingMessage` | `string \| React.ReactNode` | `"Loading..."` | Loading state message |
| `maxHeight` | `number \| string` | - | Maximum height with scrolling |
| `virtualized` | `boolean` | `false` | Whether to use virtual scrolling for large lists |
| `itemHeight` | `number` | `40` | Height of each item (for virtualization) |
| `divider` | `boolean` | `true` | Whether to show dividers between items |
| `dense` | `boolean` | `false` | Whether to use compact spacing |
| `className` | `string` | - | Additional CSS classes |
| `onItemClick` | `(item: T, index: number) => void` | - | Callback when item is clicked |
| `onItemDoubleClick` | `(item: T, index: number) => void` | - | Callback when item is double-clicked |

## Usage

### Basic List

```tsx
const items = [
  { id: 1, name: "Apple", category: "Fruit" },
  { id: 2, name: "Carrot", category: "Vegetable" },
  { id: 3, name: "Banana", category: "Fruit" }
]

<List
  items={items}
  renderItem={(item) => (
    <div className="flex justify-between">
      <span>{item.name}</span>
      <span className="text-gray-500">{item.category}</span>
    </div>
  )}
/>
```

### List with Single Selection

```tsx
const [selectedItem, setSelectedItem] = useState<Item>()

<List
  items={items}
  renderItem={(item) => <span>{item.name}</span>}
  selectionMode="single"
  selectedItems={selectedItem ? [selectedItem] : []}
  onSelectionChange={(selected) => setSelectedItem(selected[0])}
  onItemClick={(item) => console.log("Clicked:", item.name)}
/>
```

### List with Multiple Selection

```tsx
const [selectedItems, setSelectedItems] = useState<Item[]>([])

<List
  items={items}
  renderItem={(item) => (
    <div className="flex items-center gap-2">
      <span>{item.name}</span>
      {selectedItems.includes(item) && <CheckIcon />}
    </div>
  )}
  selectionMode="multiple"
  selectedItems={selectedItems}
  onSelectionChange={setSelectedItems}
/>
```

### Custom Item Rendering

```tsx
const renderContact = (contact: Contact) => (
  <div className="flex items-center gap-3 p-2">
    <Avatar src={contact.avatar} />
    <div>
      <div className="font-medium">{contact.name}</div>
      <div className="text-sm text-gray-500">{contact.email}</div>
    </div>
    <div className="ml-auto">
      <IconButton icon={<MoreIcon />} />
    </div>
  </div>
)

<List
  items={contacts}
  renderItem={renderContact}
  onItemClick={(contact) => openContactDetails(contact)}
/>
```

### Virtualized List (Large Data)

```tsx
<List
  items={largeDataset} // 10,000+ items
  renderItem={(item) => <div>{item.title}</div>}
  virtualized={true}
  itemHeight={50}
  maxHeight={400}
/>
```

### Loading State

```tsx
<List
  items={items}
  renderItem={(item) => <span>{item.name}</span>}
  loading={isLoading}
  loadingMessage="Fetching data..."
/>
```

### Empty State

```tsx
<List
  items={[]}
  renderItem={(item) => <span>{item.name}</span>}
  emptyMessage={
    <div className="text-center py-8">
      <EmptyIcon className="mx-auto mb-2" />
      <p>No items found</p>
      <Button onClick={addItem}>Add First Item</Button>
    </div>
  }
/>
```

## Features

- **Flexible Rendering**: Custom item rendering with full control
- **Selection Modes**: None, single, or multiple selection
- **Virtual Scrolling**: Performance optimization for large datasets
- **Loading States**: Built-in loading and empty state handling
- **Keyboard Navigation**: Arrow keys, Enter, Space for interaction
- **Accessibility**: Full screen reader and keyboard support

## Related Components

- [`EditList`](./edit-list.md) - Editable list with add/remove capabilities
- [`ListObjects`](./list-objects.md) - List with object-specific features
- [`ListMultiWithFilter`](./list-multi-with-filter.md) - List with filtering capabilities

## CSS Classes

- `.list` - Base list container
- `.list__item` - Individual list item
- `.list__item--selected` - Selected item styling
- `.list__item--hover` - Hover state styling
- `.list__divider` - Item separator
- `.list__empty` - Empty state container
- `.list__loading` - Loading state container
- `.list--dense` - Compact spacing variant
- `.list--virtualized` - Virtual scrolling container

## Accessibility

- Uses `role="list"` and `role="listitem"` for proper semantics
- Keyboard navigation (Arrow keys, Enter, Space)
- Focus management for selection
- Screen reader announcements for selection changes
- Proper ARIA labels and descriptions

## Common Patterns

### Contact List

```tsx
const ContactList = ({ contacts }: { contacts: Contact[] }) => {
  const [selectedContact, setSelectedContact] = useState<Contact>()
  
  const renderContact = (contact: Contact) => (
    <div className="contact-item">
      <Avatar src={contact.avatar} size="sm" />
      <div className="contact-info">
        <div className="contact-name">{contact.name}</div>
        <div className="contact-email">{contact.email}</div>
      </div>
      <div className="contact-actions">
        <IconButton icon={<PhoneIcon />} onClick={() => callContact(contact)} />
        <IconButton icon={<EmailIcon />} onClick={() => emailContact(contact)} />
      </div>
    </div>
  )
  
  return (
    <List
      items={contacts}
      renderItem={renderContact}
      selectionMode="single"
      selectedItems={selectedContact ? [selectedContact] : []}
      onSelectionChange={(selected) => setSelectedContact(selected[0])}
      maxHeight={400}
    />
  )
}
```

### Todo List

```tsx
const TodoList = ({ todos, onToggle }: { todos: Todo[], onToggle: (todo: Todo) => void }) => {
  const renderTodo = (todo: Todo) => (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />
      <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
      <div className="todo-meta">
        {todo.dueDate && <span>{formatDate(todo.dueDate)}</span>}
        {todo.priority && <Badge variant={todo.priority}>{todo.priority}</Badge>}
      </div>
    </div>
  )
  
  return (
    <List
      items={todos}
      renderItem={renderTodo}
      itemKey="id"
      emptyMessage="No todos yet. Add one to get started!"
    />
  )
}
```

### File Explorer

```tsx
const FileExplorer = ({ files }: { files: FileItem[] }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([])
  
  const renderFile = (file: FileItem) => (
    <div className="file-item">
      <FileIcon type={file.type} />
      <div className="file-info">
        <div className="file-name">{file.name}</div>
        <div className="file-meta">
          {formatFileSize(file.size)} • {formatDate(file.modified)}
        </div>
      </div>
    </div>
  )
  
  return (
    <List
      items={files}
      renderItem={renderFile}
      selectionMode="multiple"
      selectedItems={selectedFiles}
      onSelectionChange={setSelectedFiles}
      onItemDoubleClick={(file) => openFile(file)}
      dense={true}
    />
  )
}
```
