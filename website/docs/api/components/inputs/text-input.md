# TextInput

A versatile text input component with validation, labels, and various input types support.

## Import

```tsx
import { TextInput } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current input value |
| `onChange` | `(value: string) => void` | - | Callback when value changes |
| `type` | `"text" \| "email" \| "password" \| "tel" \| "url"` | `"text"` | Input type |
| `placeholder` | `string` | - | Placeholder text |
| `label` | `string` | - | Input label text |
| `error` | `string` | - | Error message to display |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `required` | `boolean` | `false` | Whether input is required |
| `readOnly` | `boolean` | `false` | Whether input is read-only |
| `autoFocus` | `boolean` | `false` | Whether to auto-focus on mount |
| `maxLength` | `number` | - | Maximum character length |
| `pattern` | `string` | - | Regex pattern for validation |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Input style variant |
| `icon` | `React.ReactNode` | - | Icon to display in input |
| `iconPosition` | `"left" \| "right"` | `"left"` | Position of the icon |
| `onFocus` | `() => void` | - | Callback when input gains focus |
| `onBlur` | `() => void` | - | Callback when input loses focus |
| `className` | `string` | - | Additional CSS classes |

## Usage

### Basic Text Input

```tsx
const [name, setName] = useState("")

<TextInput
  value={name}
  onChange={setName}
  placeholder="Enter your name"
  label="Full Name"
/>
```

### Email Input with Validation

```tsx
const [email, setEmail] = useState("")
const [emailError, setEmailError] = useState("")

const validateEmail = (value: string) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  setEmailError(isValid ? "" : "Please enter a valid email")
}

<TextInput
  type="email"
  value={email}
  onChange={setEmail}
  onBlur={() => validateEmail(email)}
  placeholder="you@example.com"
  label="Email Address"
  error={emailError}
  required
/>
```

### Password Input

```tsx
const [password, setPassword] = useState("")

<TextInput
  type="password"
  value={password}
  onChange={setPassword}
  placeholder="Enter password"
  label="Password"
  required
  minLength={8}
/>
```

### Input with Icon

```tsx
<TextInput
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search..."
  icon={<SearchIcon />}
  iconPosition="left"
/>
```

### Different Sizes and Variants

```tsx
<div className="space-y-4">
  <TextInput
    value={text}
    onChange={setText}
    size="sm"
    variant="filled"
    placeholder="Small filled input"
  />
  
  <TextInput
    value={text}
    onChange={setText}
    size="md"
    variant="outline"
    placeholder="Medium outline input"
  />
  
  <TextInput
    value={text}
    onChange={setText}
    size="lg"
    variant="ghost"
    placeholder="Large ghost input"
  />
</div>
```

## Features

- **Multiple Types**: Support for text, email, password, tel, url
- **Validation**: Built-in and custom validation support
- **Icons**: Configurable icon placement
- **Size Variants**: Multiple size options
- **Style Variants**: Different visual styles
- **Accessibility**: Full screen reader and keyboard support
- **Error States**: Visual error indication and messages

## Related Components

- [`NumberInput`](./number-input.md) - Numeric input component
- [`FindInput`](./find-input.md) - Search-specific input
- [`MarkdownEditor`](./markdown-editor.md) - Rich text editor

## CSS Classes

- `.text-input` - Base input container class
- `.text-input__label` - Label styling
- `.text-input__field` - Input field styling
- `.text-input__icon` - Icon container styling
- `.text-input__error` - Error message styling
- `.text-input--sm`, `.text-input--md`, `.text-input--lg` - Size variants
- `.text-input--outline`, `.text-input--filled`, `.text-input--ghost` - Style variants
- `.text-input--error` - Error state styling
- `.text-input--disabled` - Disabled state styling

## Accessibility

- Uses proper `label` associations
- Includes `aria-describedby` for error messages
- Supports keyboard navigation
- Screen reader friendly error announcements
- Focus management and indicators

## Common Patterns

### Form Fields

```tsx
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  
  const updateField = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  return (
    <form className="space-y-4">
      <TextInput
        value={formData.name}
        onChange={updateField("name")}
        label="Full Name"
        required
      />
      
      <TextInput
        type="email"
        value={formData.email}
        onChange={updateField("email")}
        label="Email"
        required
      />
      
      <TextInput
        type="tel"
        value={formData.phone}
        onChange={updateField("phone")}
        label="Phone Number"
      />
    </form>
  )
}
```

### Search Input

```tsx
const SearchInput = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("")
  
  useEffect(() => {
    const debounced = setTimeout(() => {
      onSearch(query)
    }, 300)
    
    return () => clearTimeout(debounced)
  }, [query, onSearch])
  
  return (
    <TextInput
      value={query}
      onChange={setQuery}
      placeholder="Search..."
      icon={<SearchIcon />}
      variant="filled"
    />
  )
}
```
