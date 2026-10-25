# Header

The `Header` component provides a standard header for cards with title, subtitle, icon, and action buttons.

## Import

```typescript
import { Header } from '@priolo/jack';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `store` | `ViewStore` | No (required in practice) | The view store for this header |
| `icon` | `React.ReactNode` | No | Icon to display in header |
| `extraRender` | `React.ReactNode` | No | Additional buttons, shown only while the mouse hovers the header |

## Usage

### Basic Header

```tsx
import { FrameworkCard, Header, icons } from '@priolo/jack';

function MyCard({ store }) {
  return (
    <FrameworkCard
      store={store}
      headerRender={<Header store={store} icon={<icons.EditorIcon />} />}
    >
      {/* Card content */}
    </FrameworkCard>
  );
}
```

### Header with Extra Actions

```tsx
import { FrameworkCard, Header, IconButton, icons } from '@priolo/jack';

function MyCard({ store }) {
  return (
    <FrameworkCard
      store={store}
      headerRender={
        <Header 
          store={store} 
          icon={<icons.EditorIcon />}
          extraRender={
            <IconButton onClick={handleCustomAction}>
              <icons.EditorIcon />
            </IconButton>
          }
        />
      }
    >
      {/* Card content */}
    </FrameworkCard>
  );
}
```

## Features

### Dynamic Title & Subtitle

The header automatically displays the title and subtitle from the store (`getTitle()` / `getSubTitle()`):

```typescript
// In your store setup
getters: {
  getTitle: () => "My Card Title",
  getSubTitle: () => "Subtitle description"
}
```

### Size Toggle

Click the icon to toggle between `VIEW_SIZE.NORMAL` and `VIEW_SIZE.COMPACT` (disabled in zen mode).

### Drag and Drop

The header is draggable when `store.state.draggable` is true (and not in zen mode).

### Action Buttons

The header includes several conditional buttons (shown on mouse hover where noted):

- **Close Button**: Closes the card (hidden if `unclosable` is true); in zen mode it closes zen mode
- **Detach Button**: Detaches a linked card from its parent (hover, linked cards only)
- **Expand/Compress**: Expands or compresses the whole chain of parent cards (hover, linked cards only)
- **Extra actions**: `extraRender` is rendered only while the mouse is over the header

### Zen Mode

Double-click the title area to enter zen (full-screen) mode.

## Responsive Behavior

### Normal View
- Shows full title and subtitle
- Displays the action buttons

### Compact View
- Shows only the icon; a tooltip contains title and subtitle

## CSS Classes

- `jack-framework-header` - Header root
- `jack-title` - Applied to title text
- `jack-subtitle` - Applied to subtitle text

## Store Integration

The header reads several properties from the store:

```typescript
interface ViewState {
  draggable: boolean;     // Controls if header is draggable
  unclosable: boolean;    // Controls if close button is shown
  size: VIEW_SIZE;        // Controls compact/normal view
  linked?: ViewStore;     // Linked card reference
  parent?: ViewStore;     // Parent card reference
  group: CardsStore;      // Group the card belongs to
}
```

## Related Components

- [`FrameworkCard`](./framework-card.md) - Container that uses Header
- [`IconButton`](../components/buttons/icon-button.md) - Action buttons
- [`TooltipWrapCmp`](./tooltip.md) - Tooltip functionality
