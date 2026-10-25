# DateTimeInput

A text input for date/time strings. It wraps [`TextInput`](./text-input.md) with the placeholder `YYYY-MM-DD hh:mm:ss`. On blur the text is parsed with `dayjs` and replaced by the normalized string `YYYY-MM-DD HH:mm:ss`, or by `""` if it is not a valid date. There is no calendar popup.

## Import

```tsx
import { DateTimeInput } from "@priolo/jack"
```

## Props

`DateTimeInput` accepts all the [`TextInput`](./text-input.md) props (`value`, `readOnly`, `className`, `style`, `onKeyEnter`, ...) with these differences:

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string \| number` | Date text (any format `dayjs` can parse) |
| `onChange` | `(newValue: string \| number) => void` | Called while typing with the text, and on blur with the normalized text (or `""`). Required in practice: it is called on blur without optional chaining |
| `placeholder` | - | Ignored: always `YYYY-MM-DD hh:mm:ss` |
| `onBlur` | - | Ignored: the component uses its own blur handler |

## Usage

### Basic Date Input

```tsx
const [date, setDate] = useState("")

<DateTimeInput
  value={date}
  onChange={setDate}
/>
```

### Working with Date Objects

```tsx
const [date, setDate] = useState<Date>()

<DateTimeInput
  value={date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : ""}
  onChange={(v) => setDate(v ? dayjs(v).toDate() : undefined)}
/>
```

### Read Only

```tsx
<DateTimeInput readOnly value="2023-12-31 14:30:00" />
```

## Features

- **Normalization**: On blur the value becomes `YYYY-MM-DD HH:mm:ss`
- **Validation**: Invalid dates become an empty string
- **TextInput props**: All the `TextInput` props are available

## Related Components

- [`TextInput`](./text-input.md) - General text input
- [`NumberInput`](./number-input.md) - Numeric input

## CSS Classes

- `jack-cmp jack-cmp-text-input` - Same classes as `TextInput`

## Common Patterns

### Date Range

```tsx
const DateRange = () => {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  
  return (
    <div>
      <DateTimeInput value={start} onChange={setStart} />
      <DateTimeInput value={end} onChange={setEnd} />
    </div>
  )
}
```
