# CopyButton

A specialized button component that copies text to the clipboard and provides visual feedback.

## Import

```tsx
import { CopyButton } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| (() => string)` | - | The text to copy, or a function returning it (evaluated on click) |
| `absolute` | `boolean` | - | Positions the button absolutely and shows it only when the parent has class `jack-hover-container` is hovered |
| `label` | `string` | `"COPY"` | Tooltip text |
| `className` | `string` | `""` | Additional CSS classes (applied to the tooltip wrapper) |
| `style` | `React.CSSProperties` | - | Inline styles (applied to the tooltip wrapper) |

## Usage

### Basic Copy Button

```tsx
<CopyButton value="Hello, World!" />
```

### Lazy Value and Custom Tooltip

```tsx
<CopyButton 
  value={() => editor.getText()}
  label="Copy to clipboard"
/>
```

### In Code Blocks

```tsx
<div className="jack-hover-container" style={{ position: "relative" }}>
  <pre>npm install @priolo/jack</pre>
  <CopyButton 
    value="npm install @priolo/jack"
    absolute
  />
</div>
```

## Features

- **Clipboard Integration**: Copies text to the system clipboard (via a temporary `textarea` and `document.execCommand('copy')`)
- **Tooltip**: Shows `label` on hover
- **Click isolation**: The click calls `preventDefault` and `stopPropagation`
- **Hover reveal**: With `absolute` the button is hidden until the `jack-hover-container` ancestor is hovered

## Related Components

- [`Button`](./button.md) - Base button component
- [`IconButton`](./icon-button.md) - Icon-specific button (used internally)

## CSS Classes

- `jack-hover-hide` - Applied when `absolute` is set; shown when an ancestor with `jack-hover-container` is hovered

## Common Patterns

### Documentation Code Blocks

```tsx
const CodeExample = ({ code }: { code: string }) => (
  <div className="jack-hover-container" style={{ position: "relative" }}>
    <pre className="code-block">{code}</pre>
    <CopyButton value={code} absolute />
  </div>
)
```
