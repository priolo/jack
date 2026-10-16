# EditStringRow

An editable text input row component designed for use in lists. Provides inline string editing with multiline support, keyboard navigation, and a delete button for removing the item.

## Import

```tsx
import { EditStringRow } from "@priolo/jack";
```

## Props

Implements the `RenderRowBaseProps<string>` interface:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `item` | `string` | **Required** | The string value to display/edit |
| `isSelect` | `boolean` | `false` | Whether this row is currently selected |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `placeholder` | `string` | `undefined` | Placeholder text for empty input |
| `onChange` | `(newItem: string \| null) => void` | `undefined` | Callback when item changes or is deleted |
| `onSelect` | `(e: React.SyntheticEvent) => void` | `undefined` | Callback when row is focused/selected |

## Basic Usage

```tsx
import { EditStringRow, EditList } from "@priolo/jack";

function StringListExample() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [selected, setSelected] = useState(-1);

  return (
    <EditList
      items={items}
      select={selected}
      RenderRow={EditStringRow}
      placeholder="Enter text..."
      onItemsChange={setItems}
      onSelectChange={setSelected}
      onNewItem={() => ""}
    />
  );
}
```

## Read-Only Mode

```tsx
function ReadOnlyStringList() {
  const [items] = useState(["Read-only item 1", "Read-only item 2"]);

  return (
    <EditList
      items={items}
      RenderRow={EditStringRow}
      readOnly={true}
      onItemsChange={() => {}} // No changes allowed
    />
  );
}
```

## With Custom Placeholder

```tsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [selected, setSelected] = useState(-1);

  return (
    <EditList
      items={todos}
      select={selected}
      RenderRow={EditStringRow}
      placeholder="Add a new todo..."
      onItemsChange={setTodos}
      onSelectChange={setSelected}
      onNewItem={() => ""}
    />
  );
}
```

## Handling Item Changes

```tsx
function ManagedStringList() {
  const [items, setItems] = useState(["First", "Second", "Third"]);

  const handleItemChange = (newItems) => {
    // Validate or transform items before saving
    const validItems = newItems.filter(item => item && item.trim());
    setItems(validItems);
  };

  return (
    <EditList
      items={items}
      RenderRow={EditStringRow}
      placeholder="Enter text..."
      onItemsChange={handleItemChange}
      onNewItem={() => ""}
    />
  );
}
```

## Multiline Content

The EditStringRow supports multiline text editing:

```tsx
function MultilineNotes() {
  const [notes, setNotes] = useState([
    "This is a short note",
    "This is a longer note\nwith multiple lines\nof content"
  ]);

  return (
    <EditList
      items={notes}
      RenderRow={EditStringRow}
      placeholder="Add a note..."
      onItemsChange={setNotes}
      onNewItem={() => ""}
    />
  );
}
```

## Keyboard Shortcuts

The component handles these keyboard interactions:

- **Delete/Backspace on empty input**: Removes the item from the list
- **Focus**: Triggers the `onSelect` callback
- **Multiline editing**: Enter creates new lines (Ctrl+Enter in some contexts)

```tsx
function KeyboardExample() {
  const [items, setItems] = useState(["Type here and try Delete on empty"]);
  
  const handleItemChange = (newItems, action) => {
    if (action === 'DELETE') {
      console.log('Item deleted via keyboard');
    }
    setItems(newItems);
  };

  return (
    <EditList
      items={items}
      RenderRow={EditStringRow}
      onItemsChange={handleItemChange}
      onNewItem={() => ""}
    />
  );
}
```

## Custom Styling

```tsx
function StyledStringList() {
  const customRowStyle = {
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    margin: '2px 0'
  };

  return (
    <EditList
      items={["Styled item 1", "Styled item 2"]}
      RenderRow={(props) => (
        <div style={customRowStyle}>
          <EditStringRow {...props} />
        </div>
      )}
      onItemsChange={() => {}}
      onNewItem={() => ""}
    />
  );
}
```

## Validation Example

```tsx
function ValidatedStringList() {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});

  const validateItem = (item, index) => {
    if (!item || item.trim().length < 3) {
      setErrors(prev => ({ ...prev, [index]: "Must be at least 3 characters" }));
      return false;
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
    return true;
  };

  const handleItemsChange = (newItems) => {
    newItems.forEach(validateItem);
    setItems(newItems);
  };

  return (
    <div>
      <EditList
        items={items}
        RenderRow={EditStringRow}
        placeholder="At least 3 characters..."
        onItemsChange={handleItemsChange}
        onNewItem={() => ""}
      />
      {Object.entries(errors).map(([index, error]) => (
        <div key={index} style={{ color: 'red', fontSize: '12px' }}>
          Row {parseInt(index) + 1}: {error}
        </div>
      ))}
    </div>
  );
}
```

## Features

- **Multiline Support**: Full multiline text editing capabilities
- **Keyboard Navigation**: Delete key removes empty items
- **Visual Selection**: Clear indication of selected state
- **Delete Button**: Hover to reveal delete button (when not read-only)
- **Auto-focus**: Automatically focuses when selected
- **Placeholder Support**: Shows helpful placeholder text
- **Flexible Layout**: Responsive design that works in various containers

## CSS Classes

The component uses these CSS classes:

- `.editrow-container` - Main container with flex layout
- `.editrow-input` - The text input area  
- `.editrow-delete` - Delete button (appears on hover)
- `.editrow-selected` - Applied when row is selected

## Accessibility

- Proper keyboard navigation and focus management
- ARIA labels for screen readers
- High contrast delete button
- Semantic HTML structure

## Related Components

- [EditList](../lists/edit-list.md) - Container for editable lists
- [EditNumberRow](./edit-number-row.md) - For numeric input rows
- [EditItemRow](./edit-item-row.md) - For generic item rows
- [TextInput](../inputs/text-input.md) - Underlying input component
- [Box](../layout/box.md) - Layout container used internally
