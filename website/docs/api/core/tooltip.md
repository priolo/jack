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
| `content` | `React.ReactNode` | No | Content to display in tooltip; if empty, `children` are rendered without the wrapper |
| `disabled` | `boolean` | No | Disables tooltip when true |
| `tabIndex` | `number` | No | Tab index of the wrapper (default `-1`) |
| `style` | `React.CSSProperties` | No | Inline styles of the wrapper `div` |
| `className` | `string` | No | CSS classes of the wrapper `div` |
| `onMouseOver` | `(enter: boolean) => void` | No | Called with `true` on mouse enter and `false` on leave |
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

Tooltips take their colors from the CSS custom properties of the hovered element:

- `--accent` - Background color
- `--accent-text` - Text color

### Unique ID Management

Each tooltip wrapper has a unique ID to prevent conflicts when multiple tooltips are active.

### Cleanup on Unmount

The tooltip is closed when the wrapper is disabled or unmounted.

## Styling

Set the variables on the wrapped element (or a parent):

```css
.my-element {
  --accent: #333;
  --accent-text: #fff;
}
```

## Accessibility

- `tabIndex` and `onKeyDown` are forwarded to the wrapper

## Performance

- Only one tooltip is shown at a time (a single global store)

## Related Components

- [`Header`](./header.md) - Uses tooltips for compact view
- [`IconButton`](../components/buttons/icon-button.md) - Often wrapped with tooltips
- [`FrameworkCard`](./framework-card.md) - Contains tooltip-enabled elements

## Common Patterns

### Icon with Tooltip

```tsx
import { TooltipWrapCmp, IconButton, icons } from '@priolo/jack';

function ActionButton() {
  return (
    <TooltipWrapCmp content="Save changes">
      <IconButton onClick={handleSave}>
        <icons.EditorIcon />
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
