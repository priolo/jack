# Box

A flexible layout container component that provides consistent spacing, alignment, and layout patterns throughout your application.

## Import

```javascript
import { Box } from '@priolo/jack'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to be rendered inside the box |
| `className` | `string` | - | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `padding` | `BoxSpacing` | - | Padding values (number, string, or spacing object) |
| `margin` | `BoxSpacing` | - | Margin values (number, string, or spacing object) |
| `direction` | `'row' \| 'column'` | `'column'` | Flex direction |
| `align` | `BoxAlign` | - | Alignment options |
| `gap` | `number \| string` | - | Gap between child elements |
| `flex` | `string \| number` | - | Flex properties |
| `width` | `string \| number` | - | Width of the box |
| `height` | `string \| number` | - | Height of the box |
| `background` | `string` | - | Background color or image |
| `border` | `string \| boolean` | - | Border styling |
| `borderRadius` | `string \| number` | - | Border radius |
| `shadow` | `boolean \| string` | - | Box shadow |
| `overflow` | `'visible' \| 'hidden' \| 'scroll' \| 'auto'` | - | Overflow behavior |
| `position` | `'static' \| 'relative' \| 'absolute' \| 'fixed' \| 'sticky'` | - | CSS position |
| `zIndex` | `number` | - | Z-index value |
| `onClick` | `(event: React.MouseEvent) => void` | - | Click handler |
| `onDoubleClick` | `(event: React.MouseEvent) => void` | - | Double click handler |
| `onMouseEnter` | `(event: React.MouseEvent) => void` | - | Mouse enter handler |
| `onMouseLeave` | `(event: React.MouseEvent) => void` | - | Mouse leave handler |

## Interfaces

### BoxSpacing

```typescript
type BoxSpacing = number | string | {
  top?: number | string
  right?: number | string
  bottom?: number | string
  left?: number | string
  horizontal?: number | string  // Sets left and right
  vertical?: number | string    // Sets top and bottom
  all?: number | string        // Sets all sides
}
```

### BoxAlign

```typescript
interface BoxAlign {
  items?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  content?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'
  self?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
}
```

## Basic Usage

### Simple Container

```jsx
import { Box } from '@priolo/jack'

function BasicExample() {
  return (
    <Box padding={20} background="#f5f5f5">
      <h3>Content Title</h3>
      <p>This is content inside a basic box container.</p>
    </Box>
  )
}
```

### Flex Layout

```jsx
function FlexExample() {
  return (
    <Box 
      direction="row" 
      gap={16}
      align={{ items: 'center', justify: 'space-between' }}
      padding={{ horizontal: 20, vertical: 12 }}
    >
      <span>Left Content</span>
      <span>Right Content</span>
    </Box>
  )
}
```

## Advanced Examples

### Card Layout

```jsx
function CardExample() {
  return (
    <Box
      background="white"
      border="1px solid #e0e0e0"
      borderRadius={8}
      shadow="0 2px 8px rgba(0,0,0,0.1)"
      padding={24}
      margin={{ bottom: 16 }}
    >
      <Box margin={{ bottom: 16 }}>
        <h3>Card Title</h3>
        <p>Card description text goes here.</p>
      </Box>
      <Box direction="row" gap={12} align={{ justify: 'flex-end' }}>
        <button>Cancel</button>
        <button>Save</button>
      </Box>
    </Box>
  )
}
```

### Grid Layout

```jsx
function GridExample() {
  return (
    <Box 
      direction="row" 
      gap={20}
      style={{ flexWrap: 'wrap' }}
    >
      {[1, 2, 3, 4].map(item => (
        <Box
          key={item}
          flex="1 1 calc(50% - 10px)"
          padding={16}
          background="#f8f9fa"
          borderRadius={4}
        >
          Grid Item {item}
        </Box>
      ))}
    </Box>
  )
}
```

### Responsive Container

```jsx
function ResponsiveExample() {
  return (
    <Box
      width="100%"
      padding={{ 
        all: 16,
        // Can be overridden with CSS media queries
      }}
      style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <Box 
        direction="row"
        gap={24}
        style={{
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            gap: '16px'
          }
        }}
      >
        <Box flex="2">Main Content</Box>
        <Box flex="1">Sidebar</Box>
      </Box>
    </Box>
  )
}
```

### Interactive Box

```jsx
function InteractiveExample() {
  const [isHovered, setIsHovered] = React.useState(false)
  
  return (
    <Box
      padding={20}
      background={isHovered ? '#e3f2fd' : '#f5f5f5'}
      borderRadius={8}
      style={{ 
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => console.log('Box clicked!')}
    >
      Hover over me to see the effect!
    </Box>
  )
}
```

## Layout Patterns

### Stack Layout

```jsx
function StackLayout({ children }) {
  return (
    <Box direction="column" gap={16}>
      {children}
    </Box>
  )
}
```

### Inline Layout

```jsx
function InlineLayout({ children }) {
  return (
    <Box 
      direction="row" 
      gap={8} 
      align={{ items: 'center' }}
      style={{ flexWrap: 'wrap' }}
    >
      {children}
    </Box>
  )
}
```

### Center Layout

```jsx
function CenterLayout({ children }) {
  return (
    <Box
      height="100vh"
      align={{ 
        items: 'center', 
        justify: 'center' 
      }}
    >
      {children}
    </Box>
  )
}
```

## Spacing Utilities

### Consistent Spacing

```jsx
// Using spacing object for precise control
<Box padding={{ vertical: 20, horizontal: 16 }}>
  Content with vertical and horizontal padding
</Box>

// Using shorthand for all sides
<Box padding={16} margin={8}>
  Content with equal padding and margin
</Box>

// Using string values for CSS units
<Box padding="1rem" margin="0.5em">
  Content with CSS unit spacing
</Box>
```

### Responsive Spacing

```jsx
function ResponsiveSpacing() {
  return (
    <Box
      padding={{ all: 16 }}
      className="responsive-box"
      style={{
        '@media (min-width: 768px)': {
          padding: '24px'
        },
        '@media (min-width: 1024px)': {
          padding: '32px'
        }
      }}
    >
      Responsive content
    </Box>
  )
}
```

## Styling

### CSS Classes

The Box component applies these CSS classes:

- `.jack-box` - Base box class
- `.jack-box--direction-row` - When direction is 'row'
- `.jack-box--direction-column` - When direction is 'column'
- `.jack-box--bordered` - When border prop is true
- `.jack-box--shadowed` - When shadow prop is true
- `.jack-box--clickable` - When onClick handler is provided

### Custom Styling

```css
.jack-box {
  position: relative;
  box-sizing: border-box;
}

.jack-box--direction-row {
  display: flex;
  flex-direction: row;
}

.jack-box--direction-column {
  display: flex;
  flex-direction: column;
}

.jack-box--bordered {
  border: 1px solid var(--border-color, #e0e0e0);
}

.jack-box--shadowed {
  box-shadow: var(--box-shadow, 0 2px 4px rgba(0,0,0,0.1));
}

.jack-box--clickable {
  cursor: pointer;
}
```

## Accessibility

### Semantic HTML

```jsx
// Use appropriate semantic elements when needed
<Box as="section" padding={20}>
  <Box as="header" margin={{ bottom: 16 }}>
    <h2>Section Title</h2>
  </Box>
  <Box as="main">
    Main content goes here
  </Box>
</Box>
```

### Focus Management

```jsx
function FocusableBox() {
  return (
    <Box
      padding={16}
      style={{ outline: 'none' }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Handle activation
        }
      }}
      role="button"
      aria-label="Interactive box element"
    >
      Focusable content
    </Box>
  )
}
```

## Best Practices

### Performance

- Use CSS classes for repeated styling patterns instead of inline styles
- Leverage the spacing system for consistent design
- Combine Box components efficiently to avoid excessive nesting

### Layout Composition

```jsx
// Good: Semantic and clear structure
function UserCard({ user }) {
  return (
    <Box className="user-card" padding={20} border borderRadius={8}>
      <Box className="user-header" direction="row" gap={12} margin={{ bottom: 16 }}>
        <img src={user.avatar} alt={user.name} />
        <Box>
          <h3>{user.name}</h3>
          <p>{user.role}</p>
        </Box>
      </Box>
      <Box className="user-content">
        {user.bio}
      </Box>
    </Box>
  )
}
```

### Responsive Design

```jsx
// Use Box for responsive breakpoints
function ResponsiveGrid({ items }) {
  return (
    <Box 
      direction="row"
      gap={16}
      style={{
        flexWrap: 'wrap'
      }}
    >
      {items.map(item => (
        <Box
          key={item.id}
          flex="1 1 300px"  // Responsive flex basis
          padding={16}
        >
          {item.content}
        </Box>
      ))}
    </Box>
  )
}
```

## Common Patterns

### Form Layout

```jsx
function FormLayout() {
  return (
    <Box direction="column" gap={20} padding={24}>
      <Box direction="column" gap={8}>
        <label>Name</label>
        <input type="text" />
      </Box>
      <Box direction="column" gap={8}>
        <label>Email</label>
        <input type="email" />
      </Box>
      <Box direction="row" gap={12} align={{ justify: 'flex-end' }}>
        <button type="button">Cancel</button>
        <button type="submit">Save</button>
      </Box>
    </Box>
  )
}
```

### Navigation Layout

```jsx
function Navigation() {
  return (
    <Box 
      direction="row" 
      align={{ items: 'center', justify: 'space-between' }}
      padding={{ horizontal: 20, vertical: 12 }}
      background="white"
      border="bottom"
    >
      <Box className="nav-brand">
        <h1>Brand</h1>
      </Box>
      <Box direction="row" gap={16}>
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Box>
    </Box>
  )
}
```