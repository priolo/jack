# FindInput

A search input with a find icon and a clear button. The clear button replaces the icon when there is text; pressing Escape also clears the value.

## Import

```tsx
import { FindInput, FindInputHeader } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current search value |
| `onChange` | `(newValue: string) => void` | - | Called on every change; called with `""` when cleared |
| `style` | `React.CSSProperties` | - | Inline styles of the container |
| `className` | `string` | `""` | Additional CSS classes of the container |

The placeholder is fixed to `"search..."`.

## FindInputHeader

Same as `FindInput`, but with a customizable placeholder and no `className` prop.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current search value |
| `placeholder` | `string` | `"search..."` | Placeholder text |
| `onChange` | `(newValue: string) => void` | - | Called on every change; called with `""` when cleared |
| `style` | `React.CSSProperties` | - | Inline styles of the container |

## Usage

### Basic Search Input

```tsx
const [searchQuery, setSearchQuery] = useState("")

<FindInput
  value={searchQuery}
  onChange={setSearchQuery}
/>
```

### Header Search with Placeholder

```tsx
<FindInputHeader
  value={query}
  onChange={setQuery}
  placeholder="Search products..."
/>
```

## Features

- **Clear Button**: Appears when the field has text
- **Escape to clear**: Escape resets the value to `""`
- **Search icon**: Shown when the field is empty

## Related Components

- [`TextInput`](./text-input.md) - General text input component (used internally)
- [`NumberInput`](./number-input.md) - Numeric input component

## CSS Classes

- `jack-cmp-txt-finder` - Container class

## Common Patterns

### Live Filter

```tsx
const LiveFilter = ({ items }: { items: Item[] }) => {
  const [filter, setFilter] = useState("")
  
  const filteredItems = useMemo(() => {
    if (!filter) return items
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [items, filter])
  
  return (
    <div>
      <FindInput
        value={filter}
        onChange={setFilter}
      />
      <ItemList items={filteredItems} />
    </div>
  )
}
```
