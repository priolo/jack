# Button

The `Button` component provides a standard button with hover effects, selection states, and keyboard support.

## Import

```typescript
import { Button } from '@priolo/jack';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `select` | `boolean` | No | Whether button appears selected |
| `children` | `React.ReactNode` | No | Button content |
| `tabIndex` | `number` | No | Tab index for keyboard navigation (default: 0) |
| `className` | `string` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | No | Inline styles |
| `disabled` | `boolean` | No | Whether button is disabled |
| `onClick` | `(e: React.MouseEvent, select: boolean) => void` | No | Click handler |

## Usage

### Basic Button

```tsx
import { Button } from '@priolo/jack';

function MyComponent() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <Button onClick={handleClick}>
      Click Me
    </Button>
  );
}
```

### Selected Button

```tsx
import { Button } from '@priolo/jack';

function ToggleButton({ isActive, onToggle }) {
  return (
    <Button 
      select={isActive} 
      onClick={onToggle}
    >
      {isActive ? 'Active' : 'Inactive'}
    </Button>
  );
}
```

### Disabled Button

```tsx
import { Button } from '@priolo/jack';

function SaveButton({ canSave, onSave }) {
  return (
    <Button 
      disabled={!canSave}
      onClick={onSave}
    >
      Save Changes
    </Button>
  );
}
```

### Custom Styling

```tsx
import { Button } from '@priolo/jack';

function CustomButton() {
  return (
    <Button 
      className="my-custom-button"
      style={{ backgroundColor: '#007bff', color: 'white' }}
      onClick={handleClick}
    >
      Custom Styled Button
    </Button>
  );
}
```

## Features

### Hover Effects

The button automatically shows hover effects when the mouse is over it.

### Keyboard Support

- **Space**: Triggers click event
- **Enter**: Triggers click event
- **Tab Navigation**: Respects `tabIndex` prop

### Selection State

The `select` prop allows you to show the button in a selected/active state.

### Click Handler

The `onClick` handler receives both the event and the current `select` state:

```tsx
const handleClick = (event, isSelected) => {
  console.log('Clicked!', { event, isSelected });
};
```

## CSS Classes

The component applies several CSS classes:

- `jack-cmp` - Base component class
- `jack-cmp-button` - Button-specific class
- `jack-cmp-select` - Applied when selected or hovered
- `jack-cmp-disabled` - Applied when disabled

## States

### Normal State
Default appearance with standard styling.

### Hover State
Enhanced appearance when mouse is over the button.

### Selected State
Highlighted appearance when `select` prop is true.

### Disabled State
Dimmed appearance and no interaction when `disabled` prop is true.

## Accessibility

- Proper `tabIndex` support for keyboard navigation
- Keyboard event handling for Space and Enter keys
- Appropriate ARIA states through CSS classes

## Related Components

- [`IconButton`](./icon-button.md) - Button specifically for icons
- [`FloatButton`](./float-button.md) - Floating action button
- [`Header`](../core/header.md) - Uses buttons for actions

## Common Patterns

### Form Submit Button

```tsx
import { Button } from '@priolo/jack';

function LoginForm({ onSubmit, isLoading }) {
  return (
    <form onSubmit={onSubmit}>
      {/* form fields */}
      <Button 
        disabled={isLoading}
        onClick={onSubmit}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
```

### Tab Button

```tsx
import { Button } from '@priolo/jack';

function TabButton({ isActive, label, onClick }) {
  return (
    <Button 
      select={isActive}
      onClick={onClick}
      className="tab-button"
    >
      {label}
    </Button>
  );
}
```

### Action Button with Focus

```tsx
import { Button } from '@priolo/jack';

function PrimaryAction({ onAction }) {
  return (
    <Button 
      className="jack-focus-1" // Jack focus class
      onClick={onAction}
    >
      Primary Action
    </Button>
  );
}
```
