# FrameworkCard

The `FrameworkCard` component is the standard structure for all cards in Jack. It provides a consistent layout with header, body, actions, and dialog support.

## Import

```typescript
import { FrameworkCard } from '@priolo/jack';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `store` | `ViewStore` | Yes | The view store for this card |
| `className` | `string` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | No | Inline styles |
| `styleBody` | `React.CSSProperties` | No | Inline styles for the body |
| `headerRender` | `React.ReactNode` | No | Custom header content |
| `actionsRender` | `React.ReactNode` | No | Custom actions content |
| `iconizedRender` | `React.ReactNode` | No | Content for iconized view |
| `children` | `React.ReactNode` | Yes | Main card content |

## Usage

### Basic Usage

```tsx
import { FrameworkCard, Header } from '@priolo/jack';

function MyCard({ store }) {
  return (
    <FrameworkCard
      store={store}
      headerRender={<Header store={store} icon={<MyIcon />} />}
    >
      <div>Card content goes here</div>
    </FrameworkCard>
  );
}
```

### With Actions

```tsx
import { FrameworkCard, Header, IconButton } from '@priolo/jack';

function MyCard({ store }) {
  return (
    <FrameworkCard
      store={store}
      headerRender={<Header store={store} icon={<MyIcon />} />}
      actionsRender={
        <IconButton onClick={handleAction}>
          <ActionIcon />
        </IconButton>
      }
    >
      <div>Card content with actions</div>
    </FrameworkCard>
  );
}
```

## Features

- **Responsive Layout**: Automatically adjusts to different view sizes
- **Focus Management**: Integrates with Jack's focus system
- **Zen Mode Support**: Handles full-screen view mode
- **Dialog Portal**: Provides portal for dialogs
- **Error Boundary**: Wraps content in error boundary
- **Snackbar Integration**: Shows notifications via `SnackbarCmp`

## View Sizes

The card adapts to different view sizes:

- `VIEW_SIZE.NORMAL` - Full card view
- `VIEW_SIZE.COMPACT` - Iconized view showing only icon and actions

## CSS Classes

The component applies several CSS classes for styling:

- `jack-framework` - Main container
- `jack-framework-focus` - When card has focus
- `jack-framework-focus-ctrl` - When focus controls are visible
- `jack-framework-actions` - Actions container
- `jack-framework-body` - Body container

## Events

The card handles several events automatically:

- Click events for focus management
- Drag events for card movement
- Keyboard events for accessibility

## Related Components

- [`Header`](./header.md) - Card header component
- [`SnackbarCmp`](../components/cards/snackbar.md) - Notification component
- [`ZenCard`](./zen-card.md) - Full-screen card view
