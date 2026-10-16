# Snackbar

A toast notification component that displays temporary messages in cards. The Snackbar can show different types of messages (info, success, warning, error) with appropriate icons and can appear in normal or compact view.

## Import

```tsx
import { SnackbarCmp } from "@priolo/jack";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `view` | `ViewStore` | **Required** | The view store instance that manages the snackbar state |

## ViewStore Properties

The component reads several properties from the ViewStore:

| Property | Type | Description |
|----------|------|-------------|
| `snackbar.open` | `boolean` | Whether the snackbar is currently visible |
| `snackbar.title` | `string` | The title/message to display |
| `snackbar.body` | `ReactNode` | Optional body content |
| `snackbar.type` | `MESSAGE_TYPE` | The type of message (determines icon and styling) |
| `snackbar.hide` | `boolean` | Whether to hide the content (used for animations) |
| `size` | `VIEW_SIZE` | If COMPACT, shows only icon with tooltip |

## Message Types

```tsx
enum MESSAGE_TYPE {
  INFO = "info",
  SUCCESS = "success", 
  WARNING = "warning",
  ERROR = "error"
}
```

Each type displays a corresponding icon:
- **INFO**: InfoIcon
- **SUCCESS**: SuccessIcon  
- **WARNING**: WarnIcon
- **ERROR**: SkullIcon

## Basic Usage

```tsx
import { SnackbarCmp, FrameworkCard } from "@priolo/jack";
import { useStore } from "@priolo/jon";

function MyCard({ store }) {
  const handleShowMessage = () => {
    store.snackbarOpen({
      title: "Operation completed successfully!",
      type: "success"
    });
  };

  return (
    <FrameworkCard store={store}>
      <button onClick={handleShowMessage}>
        Show Success Message
      </button>
      <SnackbarCmp view={store} />
    </FrameworkCard>
  );
}
```

## Different Message Types

```tsx
function NotificationExamples({ store }) {
  const showInfo = () => {
    store.snackbarOpen({
      title: "Information message",
      body: "Additional details here",
      type: "info"
    });
  };

  const showWarning = () => {
    store.snackbarOpen({
      title: "Warning: Check your input",
      type: "warning"  
    });
  };

  const showError = () => {
    store.snackbarOpen({
      title: "Error occurred",
      body: "Please try again later",
      type: "error"
    });
  };

  return (
    <div>
      <button onClick={showInfo}>Show Info</button>
      <button onClick={showWarning}>Show Warning</button>
      <button onClick={showError}>Show Error</button>
      <SnackbarCmp view={store} />
    </div>
  );
}
```

## Compact Mode

In compact mode (when `VIEW_SIZE.COMPACT`), the snackbar shows only the icon with a tooltip:

```tsx
function CompactSnackbar({ store }) {
  // Set store to compact size
  store.setSize(VIEW_SIZE.COMPACT);
  
  return (
    <div>
      {/* Will show only icon with tooltip */}
      <SnackbarCmp view={store} />
    </div>
  );
}
```

## Auto-close Behavior

```tsx
function AutoCloseExample({ store }) {
  const showTimedMessage = () => {
    store.snackbarOpen({
      title: "This message will auto-close",
      type: "info"
    });
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      store.snackbarClose();
    }, 3000);
  };

  return (
    <div>
      <button onClick={showTimedMessage}>
        Show Timed Message
      </button>
      <SnackbarCmp view={store} />
    </div>
  );
}
```

## Integration with FrameworkCard

The SnackbarCmp is automatically included in FrameworkCard components:

```tsx
function MyCard({ store }) {
  // SnackbarCmp is automatically rendered within FrameworkCard
  return (
    <FrameworkCard store={store}>
      <div>Card content</div>
      {/* SnackbarCmp is automatically included */}
    </FrameworkCard>
  );
}
```

## CSS Classes

The component uses these CSS classes for styling:

- `.snackbar-root` - Root container
- `.snackbar-root_icon` - Root container in compact mode
- `.snackbar-box` - Message box container
- `.snackbar-box_icon` - Icon container in compact mode
- `.snackbar-open` / `.snackbar-close` - Animation states
- `.snackbar-header` - Message header with icon and close button
- `.snackbar-body` - Message body content
- `.snackbar-linked` - Applied when not in root view
- `.snackbar-info` / `.snackbar-success` / `.snackbar-warning` / `.snackbar-error` - Message type styles

## Features

- **Multiple Message Types**: Support for info, success, warning, and error messages
- **Automatic Icons**: Each message type displays an appropriate icon
- **Compact Mode**: Can display as icon-only with tooltip
- **Manual Close**: Users can close messages with the close button
- **Animations**: Smooth open/close transitions
- **Integration**: Built into FrameworkCard for easy use
- **Flexible Content**: Support for both title and body content

## Accessibility

- Uses semantic HTML with proper ARIA attributes
- Keyboard navigation support for close button
- High contrast icons for better visibility
- Tooltip provides context in compact mode

## Related Components

- [FrameworkCard](../core/framework-card.md) - Automatically includes SnackbarCmp
- [IconButton](../buttons/icon-button.md) - Used for close button
- [TooltipWrapCmp](../core/tooltip.md) - Used in compact mode
