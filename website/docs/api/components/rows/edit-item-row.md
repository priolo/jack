# EditItemRow

A generic editable row component that displays any item as text with a delete button. Designed for use in lists where you need simple text display with removal capabilities.

## Import

```tsx
import { EditItemRow } from "@priolo/jack";
```

## Props

Implements the `RenderRowBaseProps<any>` interface:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `item` | `any` | **Required** | The item to display (will be converted to string) |
| `isSelect` | `boolean` | `false` | Whether this row is currently selected |
| `readOnly` | `boolean` | `false` | Whether the row is read-only (hides delete button) |
| `onChange` | `(newItem: any \| null) => void` | `undefined` | Callback when item is deleted (called with null) |
| `onSelect` | `(e: React.SyntheticEvent) => void` | `undefined` | Callback when row is clicked/selected |

## Basic Usage

```tsx
import { EditItemRow, EditList } from "@priolo/jack";

function GenericItemList() {
  const [items, setItems] = useState([
    "Simple string",
    { name: "Object item", id: 1 },
    42,
    true,
    null
  ]);
  const [selected, setSelected] = useState(-1);

  return (
    <EditList
      items={items}
      select={selected}
      RenderRow={EditItemRow}
      onItemsChange={setItems}
      onSelectChange={setSelected}
      onNewItem={() => "New item"}
    />
  );
}
```

## Object Display

```tsx
function ObjectList() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" }
  ]);

  // Objects will be displayed as "[object Object]" by default
  // For better display, consider using a custom RenderRow
  return (
    <EditList
      items={users}
      RenderRow={EditItemRow}
      onItemsChange={setUsers}
      onNewItem={() => ({ id: Date.now(), name: "New User", email: "" })}
    />
  );
}
```

## Custom Object Display

```tsx
function ImprovedObjectList() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
  ]);

  // Custom row that displays objects better
  const UserRow = ({ item, isSelect, readOnly, onChange, onSelect }) => {
    const displayText = item ? `${item.name} (${item.email})` : "";
    
    return (
      <EditItemRow
        item={displayText}
        isSelect={isSelect}
        readOnly={readOnly}
        onChange={onChange}
        onSelect={onSelect}
      />
    );
  };

  return (
    <EditList
      items={users}
      RenderRow={UserRow}
      onItemsChange={setUsers}
      onNewItem={() => ({ id: Date.now(), name: "New User", email: "" })}
    />
  );
}
```

## Read-Only Display

```tsx
function ReadOnlyItemList() {
  const [items] = useState([
    "Read-only item 1",
    "Read-only item 2", 
    "Read-only item 3"
  ]);

  return (
    <div>
      <h3>Display Only</h3>
      <EditList
        items={items}
        RenderRow={EditItemRow}
        readOnly={true}
        onItemsChange={() => {}} // No changes allowed
      />
    </div>
  );
}
```

## Mixed Data Types

```tsx
function MixedTypesList() {
  const [mixedItems, setMixedItems] = useState([
    "String value",
    123,
    true,
    { type: "object", value: "test" },
    new Date(),
    null,
    undefined
  ]);

  const handleItemsChange = (newItems) => {
    console.log("Items changed:", newItems);
    setMixedItems(newItems);
  };

  return (
    <div>
      <h3>Mixed Data Types</h3>
      <EditList
        items={mixedItems}
        RenderRow={EditItemRow}
        onItemsChange={handleItemsChange}
        onNewItem={() => "New mixed item"}
      />
    </div>
  );
}
```

## Tags or Labels List

```tsx
function TagsList() {
  const [tags, setTags] = useState([
    "javascript",
    "react", 
    "typescript",
    "css",
    "html"
  ]);

  const addTag = (tagName) => {
    if (tagName && !tags.includes(tagName)) {
      setTags([...tags, tagName]);
    }
  };

  return (
    <div>
      <h3>Tags</h3>
      <EditList
        items={tags}
        RenderRow={EditItemRow}
        onItemsChange={setTags}
        onNewItem={() => "new-tag"}
      />
      
      <div style={{ marginTop: '10px' }}>
        <strong>Selected Tags:</strong> {tags.join(", ")}
      </div>
    </div>
  );
}
```

## Confirmation Before Delete

```tsx
function ConfirmDeleteList() {
  const [items, setItems] = useState([
    "Important item 1",
    "Important item 2",
    "Important item 3"
  ]);

  const ConfirmDeleteRow = ({ item, isSelect, readOnly, onChange, onSelect }) => {
    const handleDelete = () => {
      if (confirm(`Are you sure you want to delete "${item}"?`)) {
        onChange(null);
      }
    };

    return (
      <EditItemRow
        item={item}
        isSelect={isSelect}
        readOnly={readOnly}
        onChange={handleDelete}
        onSelect={onSelect}
      />
    );
  };

  return (
    <EditList
      items={items}
      RenderRow={ConfirmDeleteRow}
      onItemsChange={setItems}
      onNewItem={() => "New important item"}
    />
  );
}
```

## Custom Styling

```tsx
function StyledItemList() {
  const [items, setItems] = useState([
    "Styled item 1",
    "Styled item 2",
    "Styled item 3"
  ]);

  const StyledItemRow = (props) => (
    <div style={{
      border: props.isSelect ? '2px solid blue' : '1px solid gray',
      borderRadius: '4px',
      margin: '2px 0',
      backgroundColor: props.isSelect ? '#e3f2fd' : 'white'
    }}>
      <EditItemRow {...props} />
    </div>
  );

  return (
    <EditList
      items={items}
      RenderRow={StyledItemRow}
      onItemsChange={setItems}
      onNewItem={() => "New styled item"}
    />
  );
}
```

## ID-Based Items

```tsx
function IdBasedList() {
  const [items, setItems] = useState([
    { id: "item_1", label: "First Item" },
    { id: "item_2", label: "Second Item" },
    { id: "item_3", label: "Third Item" }
  ]);

  const IdItemRow = ({ item, isSelect, readOnly, onChange, onSelect }) => {
    return (
      <EditItemRow
        item={item?.label || "Unnamed"}
        isSelect={isSelect}
        readOnly={readOnly}
        onChange={onChange}
        onSelect={onSelect}
      />
    );
  };

  return (
    <EditList
      items={items}
      RenderRow={IdItemRow}
      onItemsChange={setItems}
      onNewItem={() => ({ 
        id: `item_${Date.now()}`, 
        label: "New Item" 
      })}
    />
  );
}
```

## Dynamic Item Creation

```tsx
function DynamicItemList() {
  const [items, setItems] = useState([]);
  const [itemType, setItemType] = useState("string");

  const createNewItem = () => {
    switch (itemType) {
      case "string":
        return "New text item";
      case "number":
        return Math.floor(Math.random() * 100);
      case "object":
        return { type: "generated", value: Date.now() };
      case "boolean":
        return Math.random() > 0.5;
      default:
        return "Default item";
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Item Type:
          <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="object">Object</option>
            <option value="boolean">Boolean</option>
          </select>
        </label>
      </div>
      
      <EditList
        items={items}
        RenderRow={EditItemRow}
        onItemsChange={setItems}
        onNewItem={createNewItem}
      />
    </div>
  );
}
```

## Features

- **Universal Display**: Can display any data type as text
- **Delete Button**: Hover to reveal delete button (when not read-only)
- **Selection Support**: Visual indication of selected state
- **Click Handling**: Supports row selection on click
- **Flexible Content**: Works with strings, numbers, objects, booleans
- **Read-Only Mode**: Can disable deletion when needed

## String Conversion

The component displays items using JavaScript's default string conversion:
- Strings: displayed as-is
- Numbers: displayed as numeric text
- Booleans: displayed as "true" or "false"
- Objects: displayed as "[object Object]" (consider custom display)
- null/undefined: displayed as empty string

## CSS Classes

The component uses these CSS classes:

- `.editrow-container` - Main container with flex layout
- `.editrow-content` - Content area (flex: 1)
- `.editrow-delete` - Delete button (appears on hover)
- `.editrow-selected` - Applied when row is selected

## Layout Structure

```
┌─────────────────────────────────────┐
│ Box (flex container)                │
│ ├─ ListRow (flex: 1)               │
│ │  └─ Item content                 │
│ └─ IconButton (delete, on hover)   │
└─────────────────────────────────────┘
```

## Accessibility

- Proper keyboard navigation and focus management
- ARIA labels for screen readers
- High contrast delete button
- Semantic HTML structure
- Click target meets minimum size requirements

## Related Components

- [EditList](../lists/edit-list.md) - Container for editable lists
- [EditStringRow](./edit-string-row.md) - For text input rows
- [EditNumberRow](./edit-number-row.md) - For numeric input rows
- [ListRow](../lists/list-row.md) - Underlying row component
- [Box](../layout/box.md) - Layout container used internally
