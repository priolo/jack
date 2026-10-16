# Component

A base wrapper component that provides common functionality and styling patterns for Jack UI components.

## Import

```javascript
import { Component } from '@priolo/jack'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to be rendered inside the component |
| `className` | `string` | - | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `id` | `string` | - | HTML id attribute |
| `as` | `React.ElementType` | `'div'` | HTML element or React component to render as |
| `testId` | `string` | - | Test identifier for testing frameworks |
| `variant` | `string` | - | Component variant for styling |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Component size |
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `loading` | `boolean` | `false` | Whether the component is in loading state |
| `visible` | `boolean` | `true` | Whether the component is visible |
| `elevation` | `number` | - | Material Design elevation level (0-24) |
| `rounded` | `boolean \| string` | - | Border radius styling |
| `fullWidth` | `boolean` | `false` | Whether component takes full width |
| `fullHeight` | `boolean` | `false` | Whether component takes full height |
| `centered` | `boolean` | `false` | Whether to center the component |
| `onClick` | `(event: React.MouseEvent) => void` | - | Click handler |
| `onKeyDown` | `(event: React.KeyboardEvent) => void` | - | Key down handler |
| `onFocus` | `(event: React.FocusEvent) => void` | - | Focus handler |
| `onBlur` | `(event: React.FocusEvent) => void` | - | Blur handler |
| `ref` | `React.Ref` | - | Forward ref to the underlying element |

## Basic Usage

### Simple Wrapper

```jsx
import { Component } from '@priolo/jack'

function BasicExample() {
  return (
    <Component className="my-component">
      <h3>Wrapped Content</h3>
      <p>This content is wrapped in a Component.</p>
    </Component>
  )
}
```

### Custom Element

```jsx
function CustomElementExample() {
  return (
    <Component as="section" className="content-section">
      <Component as="header">
        <h2>Section Header</h2>
      </Component>
      <Component as="main">
        <p>Section content goes here.</p>
      </Component>
    </Component>
  )
}
```

## Advanced Examples

### Styled Component

```jsx
function StyledExample() {
  return (
    <Component
      variant="card"
      size="lg"
      elevation={2}
      rounded={true}
      className="custom-card"
    >
      <h3>Styled Component</h3>
      <p>This component has elevation and rounded corners.</p>
    </Component>
  )
}
```

### Interactive Component

```jsx
function InteractiveExample() {
  const [isActive, setIsActive] = React.useState(false)
  
  return (
    <Component
      variant={isActive ? 'active' : 'default'}
      onClick={() => setIsActive(!isActive)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsActive(!isActive)
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
    >
      Click to toggle: {isActive ? 'Active' : 'Inactive'}
    </Component>
  )
}
```

### Loading State

```jsx
function LoadingExample() {
  const [loading, setLoading] = React.useState(false)
  
  const handleAction = async () => {
    setLoading(true)
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
  }
  
  return (
    <Component
      loading={loading}
      disabled={loading}
      variant="action-card"
      onClick={handleAction}
    >
      {loading ? 'Processing...' : 'Click to start action'}
    </Component>
  )
}
```

### Responsive Component

```jsx
function ResponsiveExample() {
  return (
    <Component
      fullWidth
      size="md"
      className="responsive-component"
      style={{
        '@media (max-width: 768px)': {
          padding: '16px'
        },
        '@media (min-width: 769px)': {
          padding: '24px'
        }
      }}
    >
      <h3>Responsive Content</h3>
      <p>This component adapts to screen size.</p>
    </Component>
  )
}
```

## Variants and Sizing

### Size Variants

```jsx
function SizeExamples() {
  return (
    <div>
      <Component size="xs" variant="chip">Extra Small</Component>
      <Component size="sm" variant="chip">Small</Component>
      <Component size="md" variant="chip">Medium</Component>
      <Component size="lg" variant="chip">Large</Component>
      <Component size="xl" variant="chip">Extra Large</Component>
    </div>
  )
}
```

### Elevation Levels

```jsx
function ElevationExamples() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {[0, 1, 2, 4, 6, 8, 12, 16, 24].map(level => (
        <Component
          key={level}
          elevation={level}
          style={{ padding: '16px', margin: '8px' }}
        >
          Elevation {level}
        </Component>
      ))}
    </div>
  )
}
```

## Component Composition

### Card Component

```jsx
function CardComponent({ title, children, actions }) {
  return (
    <Component
      variant="card"
      elevation={1}
      rounded
      className="card-component"
    >
      {title && (
        <Component variant="card-header" className="card-header">
          <h3>{title}</h3>
        </Component>
      )}
      <Component variant="card-body" className="card-body">
        {children}
      </Component>
      {actions && (
        <Component variant="card-actions" className="card-actions">
          {actions}
        </Component>
      )}
    </Component>
  )
}
```

### Form Field Component

```jsx
function FormField({ label, error, required, children }) {
  return (
    <Component
      variant="form-field"
      className={`form-field ${error ? 'form-field--error' : ''}`}
    >
      {label && (
        <Component as="label" variant="form-label">
          {label} {required && <span className="required">*</span>}
        </Component>
      )}
      <Component variant="form-input">
        {children}
      </Component>
      {error && (
        <Component variant="form-error" className="error-message">
          {error}
        </Component>
      )}
    </Component>
  )
}
```

### Modal Component

```jsx
function Modal({ open, onClose, title, children }) {
  if (!open) return null
  
  return (
    <Component
      variant="modal-overlay"
      onClick={onClose}
      className="modal-overlay"
    >
      <Component
        variant="modal"
        elevation={8}
        rounded
        onClick={(e) => e.stopPropagation()}
        className="modal"
      >
        <Component variant="modal-header" className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </Component>
        <Component variant="modal-body" className="modal-body">
          {children}
        </Component>
      </Component>
    </Component>
  )
}
```

## Styling

### CSS Classes

The Component applies these CSS classes:

- `.jack-component` - Base component class
- `.jack-component--{variant}` - Variant-specific class
- `.jack-component--size-{size}` - Size-specific class
- `.jack-component--disabled` - When disabled
- `.jack-component--loading` - When loading
- `.jack-component--hidden` - When not visible
- `.jack-component--full-width` - When fullWidth is true
- `.jack-component--full-height` - When fullHeight is true
- `.jack-component--centered` - When centered is true
- `.jack-component--rounded` - When rounded is true
- `.jack-component--elevation-{level}` - Elevation-specific class

### Custom Styling

```css
.jack-component {
  position: relative;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.jack-component--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.jack-component--loading {
  cursor: wait;
}

.jack-component--hidden {
  display: none;
}

.jack-component--full-width {
  width: 100%;
}

.jack-component--full-height {
  height: 100%;
}

.jack-component--centered {
  margin: 0 auto;
}

.jack-component--rounded {
  border-radius: 8px;
}

/* Elevation shadows */
.jack-component--elevation-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.jack-component--elevation-2 {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.jack-component--elevation-4 {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
```

## Testing

### Test Utilities

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Component } from '@priolo/jack'

function TestExample() {
  return (
    <Component
      testId="test-component"
      onClick={() => console.log('clicked')}
    >
      Test Content
    </Component>
  )
}

// Test usage
test('renders component with test id', () => {
  render(<TestExample />)
  const component = screen.getByTestId('test-component')
  expect(component).toBeInTheDocument()
})

test('handles click events', () => {
  const handleClick = jest.fn()
  render(
    <Component testId="clickable" onClick={handleClick}>
      Click me
    </Component>
  )
  
  fireEvent.click(screen.getByTestId('clickable'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

## Accessibility

### ARIA Support

```jsx
function AccessibleComponent() {
  return (
    <Component
      as="button"
      role="button"
      aria-label="Interactive component"
      aria-describedby="help-text"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Handle activation
        }
      }}
    >
      Accessible Content
      <Component as="span" id="help-text" className="sr-only">
        Press Enter or Space to activate
      </Component>
    </Component>
  )
}
```

### Focus Management

```jsx
function FocusableComponent() {
  const ref = React.useRef()
  
  React.useEffect(() => {
    // Auto-focus when component mounts
    if (ref.current) {
      ref.current.focus()
    }
  }, [])
  
  return (
    <Component
      ref={ref}
      tabIndex={0}
      onFocus={(e) => console.log('Component focused')}
      onBlur={(e) => console.log('Component blurred')}
      style={{ outline: '2px solid blue' }}
    >
      Focusable component content
    </Component>
  )
}
```

## Best Practices

### Component Design

- Use semantic HTML elements via the `as` prop when appropriate
- Provide meaningful `testId` values for testing
- Use consistent variant naming across your application
- Leverage the elevation system for depth hierarchy

### Performance

```jsx
// Good: Memoize expensive component rendering
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return (
    <Component variant="data-view" loading={!data}>
      {data ? <DataVisualization data={data} /> : 'Loading...'}
    </Component>
  )
})
```

### TypeScript Usage

```typescript
interface CustomComponentProps {
  title: string
  variant?: 'primary' | 'secondary'
  onAction?: () => void
}

const CustomComponent: React.FC<CustomComponentProps> = ({
  title,
  variant = 'primary',
  onAction
}) => {
  return (
    <Component
      variant={`custom-${variant}`}
      onClick={onAction}
      className="custom-component"
    >
      <h3>{title}</h3>
    </Component>
  )
}
```

## Common Patterns

### Layout Container

```jsx
function LayoutContainer({ children }) {
  return (
    <Component
      as="div"
      fullWidth
      className="layout-container"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}
    >
      {children}
    </Component>
  )
}
```

### Conditional Rendering

```jsx
function ConditionalComponent({ condition, fallback, children }) {
  return (
    <Component visible={condition}>
      {condition ? children : fallback}
    </Component>
  )
}
```