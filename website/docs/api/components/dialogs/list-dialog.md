# ListDialog

A specialized dialog component for displaying lists with selection capabilities. Provides built-in filtering, search functionality, and multiple selection modes for choosing items from collections.

## Import

```tsx
import { ListDialog } from '@priolo/jack';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | `[]` | Array of items to display in the list |
| `value` | `T \| T[]` | `undefined` | Currently selected item(s) |
| `onSelect` | `(value: T \| T[]) => void` | - | Callback fired when item selection changes |
| `onClose` | `() => void` | - | Callback fired when dialog should close |
| `title` | `string` | `"Select Item"` | Dialog title text |
| `multiple` | `boolean` | `false` | Allow multiple item selection |
| `searchable` | `boolean` | `true` | Enable search/filter functionality |
| `searchPlaceholder` | `string` | `"Search..."` | Placeholder text for search input |
| `emptyText` | `string` | `"No items found"` | Text displayed when list is empty |
| `renderItem` | `(item: T) => React.ReactNode` | - | Custom item renderer function |
| `getItemText` | `(item: T) => string` | - | Function to extract searchable text from items |
| `getItemKey` | `(item: T) => string \| number` | - | Function to extract unique key from items |
| `filterFunction` | `(item: T, query: string) => boolean` | - | Custom filter function for search |
| `sortFunction` | `(a: T, b: T) => number` | - | Custom sort function for items |
| `maxHeight` | `number` | `400` | Maximum height of the list area in pixels |
| `showSelectAll` | `boolean` | `false` | Show "Select All" option (multiple mode only) |
| `confirmButton` | `string` | `"Select"` | Text for confirm button |
| `cancelButton` | `string` | `"Cancel"` | Text for cancel button |
| `loading` | `boolean` | `false` | Show loading state |
| `className` | `string` | - | Additional CSS class names |
| `style` | `React.CSSProperties` | - | Inline styles |

## Basic Usage

### Simple Item Selection

```tsx
import { ListDialog } from '@priolo/jack';

const items = [
  { id: 1, name: 'Apple', category: 'Fruit' },
  { id: 2, name: 'Carrot', category: 'Vegetable' },
  { id: 3, name: 'Banana', category: 'Fruit' },
];

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Select Item
      </Button>
      
      {isOpen && (
        <ListDialog
          items={items}
          value={selected}
          onSelect={setSelected}
          onClose={() => setIsOpen(false)}
          title="Choose a Food Item"
          getItemText={(item) => item.name}
          getItemKey={(item) => item.id}
          renderItem={(item) => (
            <div>
              <strong>{item.name}</strong>
              <small> ({item.category})</small>
            </div>
          )}
        />
      )}
    </>
  );
}
```

### Multiple Selection

```tsx
function MultiSelectExample() {
  const [selected, setSelected] = useState([]);

  return (
    <ListDialog
      items={users}
      value={selected}
      onSelect={setSelected}
      onClose={() => setIsOpen(false)}
      title="Select Users"
      multiple={true}
      showSelectAll={true}
      getItemText={(user) => `${user.name} (${user.email})`}
      getItemKey={(user) => user.id}
      renderItem={(user) => (
        <div className="user-item">
          <img src={user.avatar} alt="" className="avatar" />
          <div>
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
          </div>
        </div>
      )}
    />
  );
}
```

### Custom Filtering

```tsx
function CustomFilterExample() {
  const [categories] = useState([
    { id: 1, name: 'Electronics', count: 150 },
    { id: 2, name: 'Clothing', count: 89 },
    { id: 3, name: 'Books', count: 234 },
  ]);

  return (
    <ListDialog
      items={categories}
      title="Select Category"
      searchable={true}
      filterFunction={(item, query) => {
        return item.name.toLowerCase().includes(query.toLowerCase()) ||
               item.count.toString().includes(query);
      }}
      sortFunction={(a, b) => b.count - a.count}
      renderItem={(category) => (
        <div className="category-item">
          <span className="name">{category.name}</span>
          <span className="count">({category.count} items)</span>
        </div>
      )}
      onSelect={(category) => {
        console.log('Selected category:', category);
      }}
      onClose={() => setDialogOpen(false)}
    />
  );
}
```

## Advanced Examples

### Async Data Loading

```tsx
function AsyncListDialog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ListDialog
      items={items}
      loading={loading}
      title="Select from Server"
      emptyText="No items available"
      getItemText={(item) => item.title}
      getItemKey={(item) => item.id}
      onSelect={(item) => console.log('Selected:', item)}
      onClose={() => setDialogOpen(false)}
    />
  );
}
```

### Complex Item Rendering

```tsx
function ProductListDialog() {
  return (
    <ListDialog
      items={products}
      title="Select Product"
      maxHeight={500}
      renderItem={(product) => (
        <div className="product-item">
          <img 
            src={product.thumbnail} 
            alt={product.name}
            className="product-image"
          />
          <div className="product-details">
            <h4 className="product-name">{product.name}</h4>
            <p className="product-description">{product.description}</p>
            <div className="product-meta">
              <span className="price">${product.price}</span>
              <span className="stock">
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      )}
      filterFunction={(product, query) => {
        const searchText = query.toLowerCase();
        return product.name.toLowerCase().includes(searchText) ||
               product.description.toLowerCase().includes(searchText) ||
               product.category.toLowerCase().includes(searchText);
      }}
      getItemKey={(product) => product.id}
      onSelect={handleProductSelect}
      onClose={() => setDialogOpen(false)}
    />
  );
}
```

## Features

- **Flexible Selection**: Support for single and multiple item selection
- **Built-in Search**: Configurable search and filtering capabilities
- **Custom Rendering**: Full control over item display with custom render functions
- **Keyboard Navigation**: Arrow keys, Enter, and Escape support
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Virtualization support for large lists
- **Loading States**: Built-in loading indicator support
- **Empty States**: Customizable empty list messaging
- **Selection Controls**: "Select All" and "Clear All" options for multiple selection

## CSS Classes

| Class | Description |
|-------|-------------|
| `.list-dialog` | Main dialog container |
| `.list-dialog__header` | Dialog header section |
| `.list-dialog__title` | Dialog title text |
| `.list-dialog__search` | Search input container |
| `.list-dialog__content` | Main content area |
| `.list-dialog__list` | List container |
| `.list-dialog__item` | Individual list item |
| `.list-dialog__item--selected` | Selected item state |
| `.list-dialog__item--disabled` | Disabled item state |
| `.list-dialog__empty` | Empty state container |
| `.list-dialog__loading` | Loading state container |
| `.list-dialog__actions` | Footer action buttons |
| `.list-dialog__select-all` | Select all control |

## Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Automatic focus handling
- **Selection Announcements**: Screen reader notifications for selection changes
- **High Contrast**: Support for high contrast themes

## Related Components

- [`Dialog`](./dialog.md) - Base dialog component
- [`List`](../lists/list.md) - Standalone list component
- [`FindInput`](../inputs/find-input.md) - Search input component
- [`ElementDialog`](./element-dialog.md) - Positioned dialog component