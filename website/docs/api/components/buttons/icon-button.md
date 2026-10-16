# IconButton

The `IconButton` component provides a button specifically designed for displaying icons with optional effects and states.

## Import

```typescript
import { IconButton } from '@priolo/jack';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tabIndex` | `number` | No | Tab index for keyboard navigation |
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
import { IconButton } from '@priolo/jack';
import { CloseIcon } from '@priolo/jack/icons';

function MyComponent() {
  const handleClose = () => {
    console.log('Close clicked');
  };

  return (
    <IconButton onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  );
}
```

### Icon Button with Effects

```tsx
import { IconButton } from '@priolo/jack';
import { SaveIcon } from '@priolo/jack/icons';

function SaveButton({ onSave }) {
  return (
    <IconButton effect onClick={onSave}>
      <SaveIcon />
    </IconButton>
  );
}
```

### Selected Icon Button

```tsx
import { IconButton } from '@priolo/jack';
import { StarIcon } from '@priolo/jack/icons';

function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <IconButton 
      select={isFavorite} 
      onClick={onToggle}
    >
      <StarIcon />
    </IconButton>
  );
}
```

### Disabled Icon Button

```tsx
import { IconButton } from '@priolo/jack';
import { DeleteIcon } from '@priolo/jack/icons';

function DeleteButton({ canDelete, onDelete }) {
  return (
    <IconButton 
      disabled={!canDelete}
      onClick={onDelete}
    >
      <DeleteIcon />
    </IconButton>
  );
}
```

## Features

### Visual Effects

When `effect` prop is true, the button shows enhanced visual feedback on hover and click.

### Icon Support

Designed to work seamlessly with Jack's icon system and any SVG icons.

### Keyboard Navigation

Supports keyboard navigation and activation with Space/Enter keys.

### Flexible Sizing

Icons automatically inherit appropriate sizing from the button container.

## Common Use Cases

### Header Actions

```tsx
import { IconButton } from '@priolo/jack';
import { CloseIcon, DetachIcon } from '@priolo/jack/icons';

function CardHeader({ onClose, onDetach }) {
  return (
    <div className="header-actions">
      <IconButton onClick={onDetach}>
        <DetachIcon />
      </IconButton>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}
```

### Toolbar Actions

```tsx
import { IconButton } from '@priolo/jack';
import { EditIcon, DeleteIcon, CopyIcon } from '@priolo/jack/icons';

function ItemToolbar({ onEdit, onDelete, onCopy }) {
  return (
    <div className="toolbar">
      <IconButton effect onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton effect onClick={onCopy}>
        <CopyIcon />
      </IconButton>
      <IconButton effect onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
```

### Form Controls

```tsx
import { IconButton } from '@priolo/jack';
import { AddIcon, RemoveIcon } from '@priolo/jack/icons';

function QuantityControls({ value, onIncrease, onDecrease }) {
  return (
    <div className="quantity-controls">
      <IconButton 
        disabled={value <= 0}
        onClick={onDecrease}
      >
        <RemoveIcon />
      </IconButton>
      <span>{value}</span>
      <IconButton onClick={onIncrease}>
        <AddIcon />
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
- [`Header`](../core/header.md) - Uses IconButton for actions
- [`TooltipWrapCmp`](../core/tooltip.md) - Often wraps IconButton
