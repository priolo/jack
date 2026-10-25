# Snackbar

A notification component that displays temporary messages inside a card. It is rendered automatically by [`FrameworkCard`](../../core/framework-card.md) and is driven by the card store: call `store.setSnackbar(...)` to show a message. `SnackbarCmp` itself is **not** exported from `@priolo/jack`; only `MESSAGE_TYPE` is.

## Import

```tsx
import { MESSAGE_TYPE } from "@priolo/jack";
```

## Props (internal component)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `view` | `ViewStore` | No (needed in practice) | The view store that holds the snackbar state |

## Snackbar State

`store.setSnackbar(snackbar)` replaces `store.state.snackbar`, which has this shape:

| Property | Type | Description |
|----------|------|-------------|
| `open` | `boolean` | Whether the snackbar is visible |
| `title` | `string` | Title of the message (tooltip in compact mode) |
| `body` | `string` | Body text |
| `type` | `MESSAGE_TYPE` | Type of message (determines icon and styling) |
| `timeout` | `number` | Milliseconds after which the snackbar closes itself |

The card `size` also matters: if it is `VIEW_SIZE.COMPACT` only the icon is shown, with the title as tooltip; clicking the icon closes it.

## Message Types

```tsx
enum MESSAGE_TYPE {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warn",
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
import { FrameworkCard, MESSAGE_TYPE } from "@priolo/jack";

function MyCard({ store }) {
  const handleShowMessage = () => {
    store.setSnackbar({
      open: true,
      title: "Operation completed successfully!",
      type: MESSAGE_TYPE.SUCCESS,
      timeout: 5000,
    });
  };

  return (
    <FrameworkCard store={store}>
      <button onClick={handleShowMessage}>
        Show Success Message
      </button>
    </FrameworkCard>
  );
}
```

## Different Message Types

```tsx
function NotificationExamples({ store }) {
  const showInfo = () => {
    store.setSnackbar({
      open: true,
      title: "Information message",
      body: "Additional details here",
      type: MESSAGE_TYPE.INFO,
    });
  };

  const showWarning = () => {
    store.setSnackbar({
      open: true,
      title: "Warning: Check your input",
      type: MESSAGE_TYPE.WARNING,
    });
  };

  const showError = () => {
    store.setSnackbar({
      open: true,
      title: "Error occurred",
      body: "Please try again later",
      type: MESSAGE_TYPE.ERROR,
    });
  };

  return (
    <div>
      <button onClick={showInfo}>Show Info</button>
      <button onClick={showWarning}>Show Warning</button>
      <button onClick={showError}>Show Error</button>
    </div>
  );
}
```

## Compact Mode

When the card size is `VIEW_SIZE.COMPACT`, the snackbar shows only the icon with a tooltip:

```tsx
store.setSize(VIEW_SIZE.COMPACT);
```

## Auto-close Behavior

Use `timeout` to close the snackbar automatically:

```tsx
store.setSnackbar({
  open: true,
  title: "This message will auto-close",
  type: MESSAGE_TYPE.INFO,
  timeout: 3000,
});
```

To close it manually from code:

```tsx
store.setSnackbar({ ...store.state.snackbar, open: false });
```

## CSS Classes

The component root box has the global class `jack-cmp-snackbar` plus the message type (`info`, `success`, `warn` or `error`). All the other classes are CSS-module classes (hashed names) for: root, box, icon-only box, open/close animation, header, title, body and linked cards.

## Features

- **Multiple Message Types**: Info, success, warning and error messages
- **Automatic Icons**: Each message type displays an appropriate icon
- **Compact Mode**: Icon-only with tooltip
- **Manual Close**: Close button (or click on the icon in compact mode)
- **Timeout**: Optional automatic closing
- **Animations**: Open/close transitions
- **Integration**: Built into `FrameworkCard`

## Related Components

- [FrameworkCard](../../core/framework-card.md) - Automatically includes the snackbar
- [IconButton](../buttons/icon-button.md) - Used for close button
- [TooltipWrapCmp](../../core/tooltip.md) - Used in compact mode
