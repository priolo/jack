# NumberInput

A numeric text input. It wraps [`TextInput`](./text-input.md): characters that are not numeric are stripped while typing, and the value is clamped to `min`/`max` and truncated to `decimals` on blur.

## Import

```tsx
import { NumberInput } from "@priolo/jack"
```

## Props

`NumberInput` accepts all the [`TextInput`](./text-input.md) props (`placeholder`, `readOnly`, `className`, `style`, `onKeyEnter`, ...) plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Current numeric value (`null`/`undefined` shows an empty field) |
| `onChange` | `(newValue: string \| number) => void` | - | Called with the parsed number while typing (only when the text is a valid number) and again on blur |
| `min` | `number` | - | Minimum value, applied on blur |
| `max` | `number` | - | Maximum value, applied on blur |
| `decimals` | `number` | - | Number of decimals: when greater than 0 `.` and `,` are accepted while typing; on blur the value is truncated (not rounded) to this many decimals |

On blur an empty or invalid text becomes `0` (then clamped by `min`/`max`).

## Usage

### Basic Number Input

```tsx
const [quantity, setQuantity] = useState(1)

<NumberInput
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={100}
/>
```

### Decimal Input

```tsx
const [price, setPrice] = useState(0)

<NumberInput
  value={price}
  onChange={setPrice}
  min={0}
  decimals={2}
  placeholder="0.00"
/>
```

### Integer Input

```tsx
const [age, setAge] = useState<number>()

<NumberInput
  value={age}
  onChange={setAge}
  min={0}
  max={120}
  placeholder="Enter your age"
/>
```

## Features

- **Numeric filtering**: Only digits, `+`, `-` (and `.`/`,` when `decimals > 0`) are kept
- **Min/Max Constraints**: Enforced on blur
- **Decimals control**: Truncation on blur
- **TextInput props**: All the `TextInput` props are available

## Related Components

- [`TextInput`](./text-input.md) - General text input component
- [`FindInput`](./find-input.md) - Search input component

## CSS Classes

- `jack-cmp jack-cmp-text-input` - Same classes as `TextInput`

## Common Patterns

### Settings Form

```tsx
const SettingsForm = () => {
  const [settings, setSettings] = useState({
    timeout: 30,
    maxRetries: 3,
  })
  
  const updateSetting = (key: string) => (value: string | number) => {
    setSettings(prev => ({ ...prev, [key]: Number(value) }))
  }
  
  return (
    <form>
      <NumberInput
        value={settings.timeout}
        onChange={updateSetting("timeout")}
        min={1}
        max={300}
      />
      <NumberInput
        value={settings.maxRetries}
        onChange={updateSetting("maxRetries")}
        min={0}
        max={10}
      />
    </form>
  )
}
```
