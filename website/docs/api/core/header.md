# Header

The `Header` component provides a standard header for cards with title, subtitle, icon, and action buttons.

## Import

```typescript
import { Header } from '@priolo/jack';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `store` | `ViewStore` | Yes | The view store for this header |
| `icon` | `React.ReactNode` | No | Icon to display in header |
| `extraRender` | `React.ReactNode` | No | Additional content in header actions |

## Usage

### Basic Header

```tsx
import { Header } from '@priolo/jack';
import { MyIcon } from './icons';

function MyCard({ store }) {
  return (
    <FrameworkCard
      store={store}
      headerRender={<Header store={store} icon={<MyIcon />} />}
    >
      {/* Card content */}
    </FrameworkCard>
  );
}
```

### Header with Extra Actions

```tsx
import { Header, IconButton } from '@priolo/jack';

function MyCard({ store }) {
  return (
    <FrameworkCard
      store={store}
      headerRender={
        <Header 
          store={store} 
          icon={<MyIcon />}
          extraRender={
            <IconButton onClick={handleCustomAction}>
              <CustomIcon />
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

The header automatically displays the title and subtitle from the store:

```typescript
// In your store setup
getters: {
  getTitle: () => "My Card Title",
  getSubTitle: () => "Subtitle description"
}
```

### Size Toggle

Click the icon to toggle between normal and compact view sizes.

### Drag and Drop

The header is draggable when the card allows dragging:

```typescript
// In your store state
state: {
  draggable: true // Makes the header draggable
}
```

### Action Buttons

The header includes several conditional action buttons:

- **Close Button**: Closes the card (if `unclosable` is false)
- **Detach Button**: Detaches linked cards
- **Expand/Compress**: Controls for linked card views
- **Navigation**: Left/right navigation for card groups

### Zen Mode

Double-click the title area to enter zen (full-screen) mode.

## Responsive Behavior

### Normal View
- Shows full title and subtitle
- Displays all action buttons
- Supports drag and drop

### Compact View
- Shows only icon with tooltip
- Icon contains title and subtitle info
- Minimal action buttons

## CSS Classes

- `jack-title` - Applied to title text
- Various internal classes for styling different states

## Store Integration

The header reads several properties from the store:

```typescript
interface ViewState {
  draggable: boolean;     // Controls if header is draggable
  unclosable: boolean;    // Controls if close button is shown
  size: VIEW_SIZE;        // Controls compact/normal view
  linked?: ViewStore;     // Linked card reference
  parent?: ViewStore;     // Parent card reference
}
```

## Related Components

- [`FrameworkCard`](./framework-card.md) - Container that uses Header
- [`IconButton`](../components/buttons/icon-button.md) - Action buttons
- [`TooltipWrapCmp`](./tooltip.md) - Tooltip functionality
