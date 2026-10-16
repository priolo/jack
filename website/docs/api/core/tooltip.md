# Tooltip Components

Jack provides two tooltip components for displaying contextual help and information.

## TooltipWrapCmp

A wrapper component that adds tooltip functionality to any child element.

### Import

```typescript
import { TooltipWrapCmp } from '@priolo/jack';
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `content` | `React.ReactNode` | Yes | Content to display in tooltip |
| `disabled` | `boolean` | No | Disables tooltip when true |
| `tabIndex` | `number` | No | Tab index for keyboard navigation |
| `style` | `React.CSSProperties` | No | Inline styles |
| `className` | `string` | No | Additional CSS classes |
| `onMouseOver` | `(e: React.MouseEvent) => void` | No | Mouse over handler |
| `onClick` | `(e: React.MouseEvent) => void` | No | Click handler |
| `onKeyDown` | `(e: React.KeyboardEvent) => void` | No | Key down handler |
| `children` | `React.ReactNode` | Yes | Element to wrap with tooltip |

### Usage

```tsx
import { TooltipWrapCmp } from '@priolo/jack';

function MyComponent() {
  return (
    <TooltipWrapCmp content="This is a helpful tooltip">
      <button>Hover me</button>
    </TooltipWrapCmp>
  );
}
```

### Complex Tooltip Content

```tsx
import { TooltipWrapCmp } from '@priolo/jack';

function MyComponent() {
  return (
    <TooltipWrapCmp 
      content={
        <div>
          <strong>Card Title</strong>
          <br />
          <small>Card subtitle or description</small>
        </div>
      }
    >
      <div>Complex content with rich tooltip</div>
    </TooltipWrapCmp>
  );
}
```

### Conditional Tooltips

```tsx
import { TooltipWrapCmp } from '@priolo/jack';

function MyComponent({ showTooltip, tooltipText }) {
  return (
    <TooltipWrapCmp 
      content={tooltipText}
      disabled={!showTooltip}
    >
      <span>Conditionally show tooltip</span>
    </TooltipWrapCmp>
  );
}
```

## TooltipCmp

The global tooltip component that renders tooltips. This is typically used once in your app root.

### Import

```typescript
import { TooltipCmp } from '@priolo/jack';
```

### Usage

```tsx
import { TooltipCmp } from '@priolo/jack';

function App() {
  return (
    <div>
      {/* Your app content */}
      <MyAppContent />
      
      {/* Global tooltip renderer */}
      <TooltipCmp />
    </div>
  );
}
```

## Features

### Smart Positioning

Tooltips automatically position themselves to avoid viewport edges and provide optimal visibility.

### Color Theme Support

Tooltips inherit color themes from CSS custom properties:

- `--dialog-bg` - Background color
- `--dialog-fg` - Text color

### Unique ID Management

Each tooltip wrapper has a unique ID to prevent conflicts when multiple tooltips are active.

### Cleanup on Unmount

Tooltips are automatically cleaned up when components unmount to prevent memory leaks.

## Styling

Tooltips can be styled using CSS custom properties:

```css
.tooltip-content {
  --dialog-bg: #333;
  --dialog-fg: #fff;
}
```

## Accessibility

- Supports keyboard navigation with `tabIndex`
- Provides hover and focus states
- Properly manages tooltip visibility states

## Performance

- Tooltips are only rendered when visible
- Automatic cleanup prevents memory leaks
- Uses React portals for optimal rendering

## Related Components

- [`Header`](./header.md) - Uses tooltips for compact view
- [`IconButton`](../components/buttons/icon-button.md) - Often wrapped with tooltips
- [`FrameworkCard`](./framework-card.md) - Contains tooltip-enabled elements

## Common Patterns

### Icon with Tooltip

```tsx
import { TooltipWrapCmp, IconButton } from '@priolo/jack';

function ActionButton() {
  return (
    <TooltipWrapCmp content="Save changes">
      <IconButton onClick={handleSave}>
        <SaveIcon />
      </IconButton>
    </TooltipWrapCmp>
  );
}
```

### Truncated Text with Tooltip

```tsx
import { TooltipWrapCmp } from '@priolo/jack';

function TruncatedText({ text }) {
  return (
    <TooltipWrapCmp content={text}>
      <div style={{ 
        maxWidth: '200px', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis' 
      }}>
        {text}
      </div>
    </TooltipWrapCmp>
  );
}
```
