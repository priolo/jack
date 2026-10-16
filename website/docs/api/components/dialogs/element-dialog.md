# ElementDialog

A positioned dialog component that creates popup dialogs relative to specific HTML elements. Perfect for context menus, dropdowns, tooltips, and other element-relative popups.

## Import

```tsx
import { ElementDialog } from "@priolo/jack";
```

## Props

Extends `DialogProps` with additional positioning features:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `element` | `HTMLElement \| null` | **Required** | The target element to position relative to |
| `store` | `ViewStore` | `undefined` | View store for dialog management |
| `title` | `string \| null` | `undefined` | Dialog title (null hides title bar) |
| `width` | `number` | `200` | Dialog width in pixels |
| `onClose` | `(e: Event) => void` | `undefined` | Callback when dialog should close |
| `children` | `ReactNode` | `undefined` | Dialog content |

## Basic Usage

```tsx
import { ElementDialog, Button } from "@priolo/jack";
import { useState } from "react";

function BasicElementDialog() {
  const [element, setElement] = useState(null);

  const handleButtonClick = (e) => {
    setElement(e.target);
  };

  const handleClose = () => {
    setElement(null);
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>
        Open Dialog
      </Button>

      <ElementDialog
        element={element}
        title="Context Menu"
        onClose={handleClose}
      >
        <div>Dialog content appears next to the button!</div>
      </ElementDialog>
    </div>
  );
}
```

## Context Menu Example

```tsx
function ContextMenuExample() {
  const [element, setElement] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRightClick = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    setElement(e.target);
  };

  const actions = [
    { label: "Edit", action: () => console.log("Edit", selectedItem) },
    { label: "Delete", action: () => console.log("Delete", selectedItem) },
    { label: "Copy", action: () => console.log("Copy", selectedItem) }
  ];

  return (
    <div>
      {["Item 1", "Item 2", "Item 3"].map(item => (
        <div
          key={item}
          onContextMenu={(e) => handleRightClick(e, item)}
          style={{ padding: "10px", border: "1px solid #ccc", margin: "5px" }}
        >
          Right-click me: {item}
        </div>
      ))}

      <ElementDialog
        element={element}
        title={null} // No title for context menu
        width={120}
        onClose={() => setElement(null)}
      >
        {actions.map(action => (
          <div
            key={action.label}
            onClick={() => {
              action.action();
              setElement(null);
            }}
            style={{ padding: "8px", cursor: "pointer" }}
          >
            {action.label}
          </div>
        ))}
      </ElementDialog>
    </div>
  );
}
```

## Dropdown Menu

```tsx
function DropdownMenu() {
  const [element, setElement] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Select an option");

  const options = [
    "Option A",
    "Option B", 
    "Option C",
    "Option D"
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setElement(null);
  };

  return (
    <div>
      <Button onClick={(e) => setElement(e.target)}>
        {selectedOption} ▼
      </Button>

      <ElementDialog
        element={element}
        title={null}
        width={150}
        onClose={() => setElement(null)}
      >
        {options.map(option => (
          <div
            key={option}
            onClick={() => handleSelect(option)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              borderBottom: "1px solid #eee"
            }}
          >
            {option}
          </div>
        ))}
      </ElementDialog>
    </div>
  );
}
```

## Form Field Helper

```tsx
function FormWithHelpers() {
  const [helpElement, setHelpElement] = useState(null);
  const [helpContent, setHelpContent] = useState("");

  const showHelp = (e, content) => {
    setHelpContent(content);
    setHelpElement(e.target);
  };

  return (
    <form>
      <div style={{ marginBottom: "15px" }}>
        <label>
          Username:
          <input type="text" />
          <button
            type="button"
            onClick={(e) => showHelp(e, "Username must be 3-20 characters, alphanumeric only.")}
            style={{ marginLeft: "5px" }}
          >
            ?
          </button>
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Password:
          <input type="password" />
          <button
            type="button"
            onClick={(e) => showHelp(e, "Password must be at least 8 characters with uppercase, lowercase, and numbers.")}
            style={{ marginLeft: "5px" }}
          >
            ?
          </button>
        </label>
      </div>

      <ElementDialog
        element={helpElement}
        title="Help"
        width={250}
        onClose={() => setHelpElement(null)}
      >
        <div style={{ padding: "10px" }}>
          {helpContent}
        </div>
      </ElementDialog>
    </form>
  );
}
```

## With ViewStore

```tsx
import { createStore } from "@priolo/jon";
import { viewSetup } from "@priolo/jack";

function StoreBasedDialog() {
  const [element, setElement] = useState(null);
  const [store] = useState(() => createStore(viewSetup));

  const handleOpenDialog = (e) => {
    setElement(e.target);
    // You can use store methods here
    store.setTitle("Store-based Dialog");
  };

  return (
    <div>
      <Button onClick={handleOpenDialog}>
        Open Store Dialog
      </Button>

      <ElementDialog
        element={element}
        store={store}
        title="Managed by Store"
        onClose={() => setElement(null)}
      >
        <div>This dialog is managed by a ViewStore</div>
      </ElementDialog>
    </div>
  );
}
```

## Advanced Positioning

```tsx
function AdvancedPositioning() {
  const [element, setElement] = useState(null);
  const [position, setPosition] = useState("auto");

  // Multiple trigger elements
  const triggerRefs = useRef([]);

  const handleTrigger = (index, e) => {
    setElement(e.target);
    setPosition(`Triggered from button ${index + 1}`);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around", padding: "50px" }}>
      {[0, 1, 2, 3].map(index => (
        <Button
          key={index}
          onClick={(e) => handleTrigger(index, e)}
        >
          Trigger {index + 1}
        </Button>
      ))}

      <ElementDialog
        element={element}
        title="Positioned Dialog"
        width={200}
        onClose={() => setElement(null)}
      >
        <div style={{ padding: "10px" }}>
          <p>{position}</p>
          <p>This dialog positions itself relative to the clicked button.</p>
        </div>
      </ElementDialog>
    </div>
  );
}
```

## Interactive Content

```tsx
function InteractiveDialog() {
  const [element, setElement] = useState(null);
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={(e) => setElement(e.target)}>
        Open Interactive Dialog
      </Button>

      <ElementDialog
        element={element}
        title="Interactive Content"
        width={250}
        onClose={() => setElement(null)}
      >
        <div style={{ padding: "15px" }}>
          <p>Counter: {count}</p>
          <div>
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <Button 
              onClick={() => setCount(0)}
              style={{ margin: "0 10px" }}
            >
              Reset
            </Button>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button onClick={() => setElement(null)}>
              Close
            </Button>
          </div>
        </div>
      </ElementDialog>
    </div>
  );
}
```

## Close Detection

```tsx
function CloseDetectionExample() {
  const [element, setElement] = useState(null);
  const [closeReason, setCloseReason] = useState("");

  const handleClose = (e) => {
    // Detect different close reasons
    if (e.target.closest('.close-button')) {
      setCloseReason("Closed via close button");
    } else if (e.type === 'click') {
      setCloseReason("Closed via outside click");
    } else {
      setCloseReason("Closed via other method");
    }
    
    setTimeout(() => setCloseReason(""), 3000);
    setElement(null);
  };

  return (
    <div>
      <Button onClick={(e) => setElement(e.target)}>
        Open Dialog
      </Button>

      {closeReason && (
        <div style={{ color: "blue", margin: "10px 0" }}>
          {closeReason}
        </div>
      )}

      <ElementDialog
        element={element}
        title="Close Detection"
        onClose={handleClose}
      >
        <div style={{ padding: "10px" }}>
          <p>Try different ways to close this dialog:</p>
          <ul>
            <li>Click outside</li>
            <li>Click the X button</li>
            <li>Press Escape</li>
          </ul>
        </div>
      </ElementDialog>
    </div>
  );
}
```

## Features

- **Element-Relative Positioning**: Automatically positions relative to target element
- **Flexible Content**: Supports any React content
- **Optional Title**: Can show/hide title bar
- **Custom Width**: Configurable dialog width
- **Store Integration**: Works with ViewStore for state management
- **Auto-Close**: Closes when clicking outside or pressing Escape
- **Event Handling**: Provides close event details

## Positioning Behavior

The dialog automatically positions itself relative to the target element:
- Tries to position below the element first
- Falls back to above if no space below
- Adjusts horizontal position to stay within viewport
- Handles edge cases for screen boundaries

## CSS Classes

The component uses these CSS classes for styling:

- `.element-dialog` - Main dialog container
- `.element-dialog-content` - Dialog content area
- `.element-dialog-title` - Title bar (when title provided)
- `.element-dialog-body` - Main content body

## Accessibility

- Proper focus management
- Keyboard navigation support (Escape to close)
- ARIA attributes for screen readers
- Semantic HTML structure

## Related Components

- [Dialog](./dialog.md) - Base dialog component
- [ListDialog](./list-dialog.md) - Dialog with list content
- [AlertDialog](./alert-dialog.md) - Confirmation dialogs
- [Button](../buttons/button.md) - Often used as triggers