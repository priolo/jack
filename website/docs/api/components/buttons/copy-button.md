# CopyButton

A specialized button component that copies text to the clipboard and provides visual feedback.

## Import

```tsx
import { CopyButton } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | The text to copy to clipboard |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Button size |
| `variant` | `"outline" \| "ghost" \| "link"` | `"ghost"` | Button variant style |
| `className` | `string` | - | Additional CSS classes |
| `children` | `React.ReactNode` | Copy icon | Custom content (overrides default icon) |

## Usage

### Basic Copy Button

```tsx
<CopyButton text="Hello, World!" />
```

### Custom Size and Variant

```tsx
<CopyButton 
  text="npm install @priolo/jack"
  size="lg"
  variant="outline"
/>
```

### Custom Content

```tsx
<CopyButton text="Copy this text">
  Copy to Clipboard
</CopyButton>
```

### In Code Blocks

```tsx
<div className="code-block">
  <pre>npm install @priolo/jack</pre>
  <CopyButton 
    text="npm install @priolo/jack"
    size="sm"
    className="copy-btn"
  />
</div>
```

## Features

- **Clipboard Integration**: Automatically copies text to system clipboard
- **Visual Feedback**: Shows success/error states after copy operation
- **Accessibility**: Includes proper ARIA labels and keyboard support
- **Size Variants**: Multiple size options for different contexts
- **Customizable**: Support for custom content and styling

## Related Components

- [`Button`](./button.md) - Base button component
- [`IconButton`](./icon-button.md) - Icon-specific button

## CSS Classes

- `.copy-button` - Base copy button class
- `.copy-button--xs`, `.copy-button--sm`, `.copy-button--md`, `.copy-button--lg` - Size variants
- `.copy-button--outline`, `.copy-button--ghost`, `.copy-button--link` - Style variants
- `.copy-button--success` - Applied after successful copy
- `.copy-button--error` - Applied when copy fails

## Accessibility

- Uses `aria-label` for screen readers
- Keyboard accessible via Tab navigation
- Provides feedback for copy success/failure
- Follows WCAG guidelines for interactive elements

## Common Patterns

### Documentation Code Blocks

```tsx
const CodeExample = ({ code }: { code: string }) => (
  <div className="relative">
    <pre className="code-block">{code}</pre>
    <CopyButton 
      text={code}
      className="absolute top-2 right-2"
      size="sm"
    />
  </div>
)
```

### Share Links

```tsx
const ShareButton = ({ url }: { url: string }) => (
  <CopyButton 
    text={url}
    variant="outline"
  >
    📋 Copy Link
  </CopyButton>
)
```
