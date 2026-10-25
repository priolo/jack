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
| `headerRender` | `React.ReactNode` | No | Header content (typically `<Header />`) |
| `actionsRender` | `React.ReactNode` | No | Content of the actions bar (not shown when iconized) |
| `iconizedRender` | `React.ReactNode` | No | Content shown instead of the body when iconized |
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
import { FrameworkCard, Header, IconButton, icons } from '@priolo/jack';

function MyCard({ store }) {
  return (
    <FrameworkCard
      store={store}
      headerRender={<Header store={store} icon={<icons.EditorIcon />} />}
      actionsRender={
        <IconButton onClick={handleAction}>
          <icons.EditorIcon />
        </IconButton>
      }
    >
      <div>Card content with actions</div>
    </FrameworkCard>
  );
}
```

## Features

- **Focus Management**: Integrates with Jack's focus system (`focusSo`)
- **Zen Mode Support**: Handles full-screen view mode
- **Dialog Portal**: Renders a container with id `dialog_<uuid>` used by dialogs
- **Snackbar Integration**: Shows notifications set with `store.setSnackbar(...)` (see [Snackbar](../components/cards/snackbar.md))
- **Iconized view**: In `VIEW_SIZE.COMPACT` only `iconizedRender` and a close button are shown

## View Sizes

`VIEW_SIZE` has three values: `NORMAL`, `COMPACT` and `ICONIZED`. `FrameworkCard` switches to the iconized layout only when `store.state.size == VIEW_SIZE.COMPACT`:

- `VIEW_SIZE.NORMAL` - Full card view (actions + body)
- `VIEW_SIZE.COMPACT` - Iconized view: header, `iconizedRender` and a close button

## CSS Classes

The component applies several CSS classes for styling:

- `jack-framework` - Main container
- `jack-framework-linked` - When the card is linked (has a parent) and not in zen mode
- `jack-framework-focus` - When card has focus
- `jack-framework-focus-ctrl` - When focus controls are visible
- `jack-framework-actions` - Actions container
- `jack-framework-body` - Body container

## Related Components

- [`Header`](./header.md) - Card header component
- [`Snackbar`](../components/cards/snackbar.md) - Notification messages
- [`ZenCard`](./zen-card.md) - Full-screen card view
