# TextInput

A text input (or textarea) component. It is a `forwardRef` component: the ref points to the underlying `input`/`textarea` element. `PasswordInput` is another export of the same component.

## Import

```tsx
import { TextInput } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | - | Current input value |
| `onChange` | `(newValue: string) => void` | - | Called with the new text |
| `placeholder` | `string` | - | Placeholder text |
| `autoFocus` | `boolean` | - | Whether to auto-focus on mount |
| `tabIndex` | `number` | `0` | Tab index |
| `readOnly` | `boolean` | - | Renders a read-only `div` (class `jack-lbl-readonly`) instead of the input; password values are shown as `***` |
| `className` | `string` | - | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `focus` | `boolean` | - | When it becomes true, the input text is selected |
| `multiline` | `boolean` | - | Renders a `textarea` that auto-grows with its content |
| `rows` | `number` | `1` | Rows of the textarea |
| `type` | `string` | - | HTML input type (e.g. `"password"`) |
| `onFocus` | `(e: React.FocusEvent) => void` | - | Called when the input gains focus (the text is selected first) |
| `onBlur` | `(e: React.FocusEvent) => void` | - | Called when the input loses focus |
| `onKeyDown` | `(e: React.KeyboardEvent) => void` | - | Key down handler |
| `onKeyEnter` | `(e: React.KeyboardEvent) => void` | - | Called when Enter is pressed |

## Usage

### Basic Text Input

```tsx
const [name, setName] = useState("")

<TextInput
  value={name}
  onChange={setName}
  placeholder="Enter your name"
/>
```

### Submit on Enter

```tsx
<TextInput
  value={email}
  onChange={setEmail}
  onKeyEnter={() => submit(email)}
  placeholder="you@example.com"
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
/>
```

### Multiline

```tsx
<TextInput
  multiline
  rows={3}
  value={text}
  onChange={setText}
/>
```

### Read Only

```tsx
<TextInput readOnly value="Not editable" />
```

## Features

- **Multiline**: Auto-growing textarea with `multiline`
- **Read-only label**: `readOnly` renders plain text
- **Select on focus**: Text is selected when the input gains focus
- **Enter key**: Dedicated `onKeyEnter` callback
- **Ref forwarding**: The ref gives access to the DOM element

## Related Components

- [`NumberInput`](./number-input.md) - Numeric input component
- [`FindInput`](./find-input.md) - Search-specific input
- [`MarkdownEditor`](./markdown-editor.md) - Rich text editor

## CSS Classes

- `jack-cmp jack-cmp-text-input` - Base classes of the input
- `jack-lbl-readonly` - Read-only rendering

## Common Patterns

### Form Fields

```tsx
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" })
  
  const updateField = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  return (
    <form>
      <TextInput
        value={formData.name}
        onChange={updateField("name")}
        placeholder="Full Name"
      />
      <TextInput
        type="email"
        value={formData.email}
        onChange={updateField("email")}
        placeholder="Email"
      />
    </form>
  )
}
```

### Debounced Search

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
    />
  )
}
```
