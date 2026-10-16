# Accordion

A collapsible content component that allows users to show and hide sections of content in a compact, organized way.

## Import

```javascript
import { Accordion } from '@priolo/jack'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Accordion content (AccordionItem components) |
| `className` | `string` | - | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `allowMultiple` | `boolean` | `false` | Allow multiple panels to be open simultaneously |
| `allowToggle` | `boolean` | `true` | Allow panels to be collapsed after opening |
| `defaultIndex` | `number \| number[]` | - | Default opened panel index(es) |
| `index` | `number \| number[]` | - | Controlled opened panel index(es) |
| `onChange` | `(index: number \| number[]) => void` | - | Callback when panel state changes |
| `variant` | `'default' \| 'bordered' \| 'filled' \| 'ghost'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `disabled` | `boolean` | `false` | Disable all accordion interactions |
| `animated` | `boolean` | `true` | Enable expand/collapse animations |
| `icon` | `React.ReactNode \| 'chevron' \| 'plus' \| 'arrow'` | `'chevron'` | Expand/collapse icon |
| `iconPosition` | `'left' \| 'right'` | `'right'` | Icon position |

## AccordionItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Panel content |
| `title` | `React.ReactNode` | - | Panel header title |
| `subtitle` | `React.ReactNode` | - | Panel header subtitle |
| `icon` | `React.ReactNode` | - | Panel header icon |
| `disabled` | `boolean` | `false` | Disable this panel |
| `className` | `string` | - | Additional CSS classes for the item |
| `headerClassName` | `string` | - | Additional CSS classes for the header |
| `contentClassName` | `string` | - | Additional CSS classes for the content |

## Basic Usage

### Simple Accordion

```jsx
import { Accordion, AccordionItem } from '@priolo/jack'

function BasicExample() {
  return (
    <Accordion>
      <AccordionItem title="Section 1">
        <p>Content for the first section. This can contain any React elements.</p>
      </AccordionItem>
      <AccordionItem title="Section 2">
        <p>Content for the second section with more detailed information.</p>
      </AccordionItem>
      <AccordionItem title="Section 3">
        <p>Content for the third section including lists, images, or other components.</p>
      </AccordionItem>
    </Accordion>
  )
}
```

### Controlled Accordion

```jsx
function ControlledExample() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  
  return (
    <Accordion
      index={activeIndex}
      onChange={setActiveIndex}
      allowToggle={true}
    >
      <AccordionItem title="First Panel">
        <p>This is the first panel content.</p>
      </AccordionItem>
      <AccordionItem title="Second Panel">
        <p>This is the second panel content.</p>
      </AccordionItem>
      <AccordionItem title="Third Panel">
        <p>This is the third panel content.</p>
      </AccordionItem>
    </Accordion>
  )
}
```

## Advanced Examples

### Multiple Panels Open

```jsx
function MultipleExample() {
  return (
    <Accordion
      allowMultiple={true}
      defaultIndex={[0, 2]}
      variant="bordered"
    >
      <AccordionItem 
        title="User Information" 
        subtitle="Personal details and preferences"
        icon={<UserIcon />}
      >
        <div>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john@example.com</p>
          <p><strong>Role:</strong> Administrator</p>
        </div>
      </AccordionItem>
      
      <AccordionItem 
        title="Account Settings"
        subtitle="Security and notification settings"
        icon={<SettingsIcon />}
      >
        <div>
          <label>
            <input type="checkbox" /> Enable notifications
          </label>
          <label>
            <input type="checkbox" /> Two-factor authentication
          </label>
        </div>
      </AccordionItem>
      
      <AccordionItem 
        title="Billing Information"
        subtitle="Payment methods and invoices"
        icon={<CreditCardIcon />}
      >
        <div>
          <p>Current plan: Professional</p>
          <p>Next billing date: March 15, 2024</p>
        </div>
      </AccordionItem>
    </Accordion>
  )
}
```

### FAQ Accordion

```jsx
function FAQExample() {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."
    },
    {
      question: "Can I change my subscription plan?",
      answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings."
    },
    {
      question: "Is my data secure?",
      answer: "We use enterprise-grade encryption and security measures to protect your data."
    }
  ]
  
  return (
    <Accordion variant="ghost" size="lg" icon="plus">
      {faqs.map((faq, index) => (
        <AccordionItem 
          key={index}
          title={faq.question}
          className="faq-item"
        >
          <p>{faq.answer}</p>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
```

### Custom Icon Accordion

```jsx
function CustomIconExample() {
  const CustomExpandIcon = ({ isOpen }) => (
    <svg 
      width="16" 
      height="16" 
      style={{ 
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease'
      }}
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  )
  
  return (
    <Accordion
      icon={<CustomExpandIcon />}
      variant="filled"
      iconPosition="left"
    >
      <AccordionItem title="Custom Icon Panel">
        <p>This accordion uses a custom expand/collapse icon.</p>
      </AccordionItem>
    </Accordion>
  )
}
```

### Nested Accordion

```jsx
function NestedExample() {
  return (
    <Accordion variant="bordered">
      <AccordionItem title="Main Category 1">
        <Accordion variant="ghost" size="sm">
          <AccordionItem title="Subcategory 1.1">
            <p>Nested content for subcategory 1.1</p>
          </AccordionItem>
          <AccordionItem title="Subcategory 1.2">
            <p>Nested content for subcategory 1.2</p>
          </AccordionItem>
        </Accordion>
      </AccordionItem>
      
      <AccordionItem title="Main Category 2">
        <Accordion variant="ghost" size="sm">
          <AccordionItem title="Subcategory 2.1">
            <p>Nested content for subcategory 2.1</p>
          </AccordionItem>
        </Accordion>
      </AccordionItem>
    </Accordion>
  )
}
```

## Variants and Styling

### Visual Variants

```jsx
function VariantsExample() {
  const content = <p>Sample accordion content for demonstration.</p>
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Accordion variant="default">
        <AccordionItem title="Default Variant">{content}</AccordionItem>
      </Accordion>
      
      <Accordion variant="bordered">
        <AccordionItem title="Bordered Variant">{content}</AccordionItem>
      </Accordion>
      
      <Accordion variant="filled">
        <AccordionItem title="Filled Variant">{content}</AccordionItem>
      </Accordion>
      
      <Accordion variant="ghost">
        <AccordionItem title="Ghost Variant">{content}</AccordionItem>
      </Accordion>
    </div>
  )
}
```

### Size Variants

```jsx
function SizeExample() {
  const content = <p>Accordion content with different sizes.</p>
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Accordion size="sm">
        <AccordionItem title="Small Size">{content}</AccordionItem>
      </Accordion>
      
      <Accordion size="md">
        <AccordionItem title="Medium Size">{content}</AccordionItem>
      </Accordion>
      
      <Accordion size="lg">
        <AccordionItem title="Large Size">{content}</AccordionItem>
      </Accordion>
    </div>
  )
}
```

## Animation and Interaction

### Custom Animation

```jsx
function AnimatedExample() {
  return (
    <Accordion
      animated={true}
      className="custom-animated-accordion"
    >
      <AccordionItem title="Animated Panel">
        <div style={{ padding: '16px' }}>
          <p>This content animates smoothly when expanding and collapsing.</p>
          <ul>
            <li>Smooth height transitions</li>
            <li>Fade in/out effects</li>
            <li>Customizable timing</li>
          </ul>
        </div>
      </AccordionItem>
    </Accordion>
  )
}
```

### Event Handling

```jsx
function EventExample() {
  const handleChange = (index) => {
    console.log('Panel changed:', index)
  }
  
  const handleItemClick = (index, event) => {
    console.log('Item clicked:', index, event)
  }
  
  return (
    <Accordion onChange={handleChange}>
      <AccordionItem 
        title="Interactive Panel"
        onClick={(e) => handleItemClick(0, e)}
      >
        <p>This panel logs events when interacted with.</p>
      </AccordionItem>
    </Accordion>
  )
}
```

## Accessibility

### ARIA Support

```jsx
function AccessibleExample() {
  return (
    <Accordion
      role="tablist"
      aria-label="Content sections"
    >
      <AccordionItem 
        title="Accessible Panel"
        aria-describedby="panel-description"
      >
        <div id="panel-description">
          <p>This accordion follows accessibility best practices:</p>
          <ul>
            <li>Proper ARIA attributes</li>
            <li>Keyboard navigation support</li>
            <li>Screen reader compatibility</li>
          </ul>
        </div>
      </AccordionItem>
    </Accordion>
  )
}
```

### Keyboard Navigation

```jsx
function KeyboardExample() {
  return (
    <Accordion
      onKeyDown={(e, index) => {
        switch (e.key) {
          case 'ArrowDown':
            // Focus next panel
            break
          case 'ArrowUp':
            // Focus previous panel
            break
          case 'Home':
            // Focus first panel
            break
          case 'End':
            // Focus last panel
            break
        }
      }}
    >
      <AccordionItem title="Keyboard Accessible Panel">
        <p>Use arrow keys, Home, and End to navigate between panels.</p>
      </AccordionItem>
    </Accordion>
  )
}
```

## Styling

### CSS Classes

The Accordion component applies these CSS classes:

- `.jack-accordion` - Base accordion container
- `.jack-accordion--{variant}` - Variant-specific styling
- `.jack-accordion--size-{size}` - Size-specific styling
- `.jack-accordion--disabled` - When disabled
- `.jack-accordion-item` - Individual accordion item
- `.jack-accordion-item--expanded` - When item is open
- `.jack-accordion-item--disabled` - When item is disabled
- `.jack-accordion-header` - Item header/trigger
- `.jack-accordion-content` - Item content area
- `.jack-accordion-icon` - Expand/collapse icon

### Custom Styling

```css
.jack-accordion {
  border-radius: 8px;
  overflow: hidden;
}

.jack-accordion--bordered {
  border: 1px solid #e0e0e0;
}

.jack-accordion--filled .jack-accordion-header {
  background-color: #f5f5f5;
}

.jack-accordion-item {
  border-bottom: 1px solid #e0e0e0;
}

.jack-accordion-item:last-child {
  border-bottom: none;
}

.jack-accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.jack-accordion-header:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.jack-accordion-content {
  padding: 16px;
  overflow: hidden;
}

.jack-accordion-icon {
  transition: transform 0.2s ease;
}

.jack-accordion-item--expanded .jack-accordion-icon {
  transform: rotate(180deg);
}
```

## Best Practices

### Content Organization

```jsx
// Good: Logical grouping of related content
function WellOrganizedAccordion() {
  return (
    <Accordion allowMultiple defaultIndex={[0]}>
      <AccordionItem title="Account Information">
        {/* Related account settings */}
      </AccordionItem>
      <AccordionItem title="Privacy Settings">
        {/* Related privacy controls */}
      </AccordionItem>
      <AccordionItem title="Notification Preferences">
        {/* Related notification settings */}
      </AccordionItem>
    </Accordion>
  )
}
```

### Performance Optimization

```jsx
// Lazy load heavy content
const LazyContent = React.lazy(() => import('./HeavyContent'))

function OptimizedAccordion() {
  return (
    <Accordion>
      <AccordionItem title="Light Content">
        <p>This loads immediately.</p>
      </AccordionItem>
      <AccordionItem title="Heavy Content">
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyContent />
        </React.Suspense>
      </AccordionItem>
    </Accordion>
  )
}
```

### Responsive Design

```jsx
function ResponsiveAccordion() {
  return (
    <Accordion
      size="lg"
      className="responsive-accordion"
      style={{
        '@media (max-width: 768px)': {
          size: 'sm'
        }
      }}
    >
      <AccordionItem title="Responsive Panel">
        <p>Content that adapts to screen size.</p>
      </AccordionItem>
    </Accordion>
  )
}
```

## Common Patterns

### Settings Panel

```jsx
function SettingsAccordion() {
  return (
    <Accordion variant="bordered" allowMultiple>
      <AccordionItem title="General Settings" icon={<SettingsIcon />}>
        <SettingsForm section="general" />
      </AccordionItem>
      <AccordionItem title="Security" icon={<ShieldIcon />}>
        <SecuritySettings />
      </AccordionItem>
      <AccordionItem title="Notifications" icon={<BellIcon />}>
        <NotificationSettings />
      </AccordionItem>
    </Accordion>
  )
}
```

### Product Details

```jsx
function ProductAccordion({ product }) {
  return (
    <Accordion variant="ghost">
      <AccordionItem title="Product Description">
        <p>{product.description}</p>
      </AccordionItem>
      <AccordionItem title="Specifications">
        <SpecificationsList specs={product.specs} />
      </AccordionItem>
      <AccordionItem title="Reviews">
        <ReviewsList reviews={product.reviews} />
      </AccordionItem>
    </Accordion>
  )
}
```