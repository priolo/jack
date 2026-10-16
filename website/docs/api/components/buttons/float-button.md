# FloatButton

The `FloatButton` component provides a floating action button (FAB) typically used for primary actions.

## Import

```typescript
import { FloatButton } from '@priolo/jack';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onClick` | `(e: React.MouseEvent) => void` | No | Click handler |
| `children` | `React.ReactNode` | No | Button content (usually an icon) |
| `disabled` | `boolean` | No | Whether button is disabled |
| `className` | `string` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | No | Inline styles |

## Usage

### Basic Float Button

```tsx
import { FloatButton } from '@priolo/jack';
import { AddIcon } from '@priolo/jack/icons';

function MyComponent() {
  const handleAdd = () => {
    console.log('Add new item');
  };

  return (
    <FloatButton onClick={handleAdd}>
      <AddIcon />
    </FloatButton>
  );
}
```

### Positioned Float Button

```tsx
import { FloatButton } from '@priolo/jack';
import { SendIcon } from '@priolo/jack/icons';

function ChatInterface() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Chat content */}
      
      <FloatButton 
        style={{ 
          position: 'absolute',
          bottom: '20px',
          right: '20px'
        }}
        onClick={handleSend}
      >
        <SendIcon />
      </FloatButton>
    </div>
  );
}
```

### Disabled Float Button

```tsx
import { FloatButton } from '@priolo/jack';
import { SaveIcon } from '@priolo/jack/icons';

function SaveFAB({ hasChanges, onSave }) {
  return (
    <FloatButton 
      disabled={!hasChanges}
      onClick={onSave}
    >
      <SaveIcon />
    </FloatButton>
  );
}
```

## Features

### Elevated Appearance

FloatButton has a distinctive elevated appearance that makes it stand out from other UI elements.

### Icon Optimized

Designed specifically for icon content with appropriate sizing and spacing.

### Hover Effects

Provides visual feedback on hover and interaction states.

### Accessibility

Supports keyboard navigation and proper focus management.

## Common Use Cases

### Primary Action

```tsx
import { FloatButton } from '@priolo/jack';
import { ComposeIcon } from '@priolo/jack/icons';

function EmailInterface() {
  return (
    <div className="email-interface">
      {/* Email list */}
      
      <FloatButton 
        style={{ 
          position: 'fixed',
          bottom: '24px',
          right: '24px'
        }}
        onClick={handleCompose}
      >
        <ComposeIcon />
      </FloatButton>
    </div>
  );
}
```

### Form Submission

```tsx
import { FloatButton } from '@priolo/jack';
import { CheckIcon } from '@priolo/jack/icons';

function FormContainer({ isValid, onSubmit }) {
  return (
    <div className="form-container">
      {/* Form fields */}
      
      <FloatButton 
        disabled={!isValid}
        onClick={onSubmit}
        style={{ marginTop: '20px' }}
      >
        <CheckIcon />
      </FloatButton>
    </div>
  );
}
```

### Quick Actions

```tsx
import { FloatButton } from '@priolo/jack';
import { ShareIcon } from '@priolo/jack/icons';

function ContentView({ content, onShare }) {
  return (
    <div className="content-view">
      <div className="content">{content}</div>
      
      <FloatButton 
        style={{ 
          position: 'relative',
          marginTop: '16px'
        }}
        onClick={onShare}
      >
        <ShareIcon />
      </FloatButton>
    </div>
  );
}
```

## Styling

FloatButton can be customized with CSS:

```css
.custom-float-button {
  background: #007bff;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  width: 56px;
  height: 56px;
}

.custom-float-button:hover {
  background: #0056b3;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
```

## Best Practices

### Positioning

- Use `position: fixed` for global actions
- Use `position: absolute` or `position: relative` for context-specific actions
- Place in bottom-right corner for primary global actions

### Content

- Use clear, recognizable icons
- Avoid text content in favor of icons
- Consider tooltips for clarity

### Behavior

- Reserve for primary or frequent actions
- Don't use multiple FABs in the same view
- Ensure proper contrast and visibility

## Related Components

- [`IconButton`](./icon-button.md) - For smaller icon actions
- [`Button`](./button.md) - For text-based actions
- [`TooltipWrapCmp`](../core/tooltip.md) - For adding helpful tooltips
