# IconButton

The `IconButton` component provides a button specifically designed for displaying icons with optional effects and states.

## Import

```typescript
import { IconButton, icons } from '@priolo/jack';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tabIndex` | `number` | No | Tab index for keyboard navigation (default: 0) |
| `onClick` | `(e: React.MouseEvent) => void` | No | Click handler |
| `children` | `React.ReactNode` | No | Icon or content to display |
| `effect` | `boolean` | No | Enables hover/click visual effects |
| `select` | `boolean` | No | Whether button appears selected |
| `disabled` | `boolean` | No | Whether button is disabled |
| `className` | `string` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | No | Inline styles |

## Usage

### Basic Icon Button

```tsx
import { IconButton, icons } from '@priolo/jack';

function MyComponent() {
  const handleClose = () => {
    console.log('Close clicked');
  };

  return (
    <IconButton onClick={handleClose}>
      <icons.EditorIcon />
    </IconButton>
  );
}
```

### Icon Button with Effects

```tsx
import { IconButton, icons } from '@priolo/jack';

function SaveButton({ onSave }) {
  return (
    <IconButton effect onClick={onSave}>
      <icons.EditorIcon />
    </IconButton>
  );
}
```

### Selected Icon Button

```tsx
import { IconButton, icons } from '@priolo/jack';

function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <IconButton 
      select={isFavorite} 
      onClick={onToggle}
    >
      <icons.EditorIcon />
    </IconButton>
  );
}
```

### Disabled Icon Button

```tsx
import { IconButton, icons } from '@priolo/jack';

function DeleteButton({ canDelete, onDelete }) {
  return (
    <IconButton 
      disabled={!canDelete}
      onClick={onDelete}
    >
      <icons.EditorIcon />
    </IconButton>
  );
}
```

## Features

### Visual Effects

When `effect` is true, the button is highlighted (class `jack-cmp-select`) while the mouse is over it. `select` always highlights it.

### Icon Support

Works with any SVG icon component. Only `icons.EditorIcon` is exported by the package; the other examples use it as a placeholder.

### Keyboard Navigation

Supports keyboard navigation and activation with Space/Enter keys.

### CSS Classes

- `jack-cmp jack-cmp-button` - Base classes
- `jack-cmp-select` - Applied when selected or (with `effect`) hovered
- `jack-cmp-disabled` - Applied when disabled

## Common Use Cases

### Header Actions

```tsx
import { IconButton, icons } from '@priolo/jack';

function CardHeader({ onClose, onDetach }) {
  return (
    <div className="header-actions">
      <IconButton onClick={onDetach}>
        <icons.EditorIcon />
      </IconButton>
      <IconButton onClick={onClose}>
        <icons.EditorIcon />
      </IconButton>
    </div>
  );
}
```

### Toolbar Actions

```tsx
import { IconButton, icons } from '@priolo/jack';

function ItemToolbar({ onEdit, onDelete, onCopy }) {
  return (
    <div className="toolbar">
      <IconButton effect onClick={onEdit}>
        <icons.EditorIcon />
      </IconButton>
      <IconButton effect onClick={onCopy}>
        <icons.EditorIcon />
      </IconButton>
      <IconButton effect onClick={onDelete}>
        <icons.EditorIcon />
      </IconButton>
    </div>
  );
}
```

### Form Controls

```tsx
import { IconButton, icons } from '@priolo/jack';

function QuantityControls({ value, onIncrease, onDecrease }) {
  return (
    <div className="quantity-controls">
      <IconButton 
        disabled={value <= 0}
        onClick={onDecrease}
      >
        <icons.EditorIcon />
      </IconButton>
      <span>{value}</span>
      <IconButton onClick={onIncrease}>
        <icons.EditorIcon />
      </IconButton>
    </div>
  );
}
```

## Styling

IconButton can be styled using CSS classes:

```css
.my-icon-button {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 4px;
}

.my-icon-button:hover {
  background: rgba(0, 0, 0, 0.1);
}
```

## Related Components

- [`Button`](./button.md) - Standard text button
- [`FloatButton`](./float-button.md) - Floating action button
- [`Header`](../../core/header.md) - Uses IconButton for actions
- [`TooltipWrapCmp`](../../core/tooltip.md) - Often wraps IconButton
