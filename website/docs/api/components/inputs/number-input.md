# NumberInput

A specialized input component for numeric values with increment/decrement controls and validation.

## Import

```tsx
import { NumberInput } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| undefined` | - | Current numeric value |
| `onChange` | `(value: number \| undefined) => void` | - | Callback when value changes |
| `min` | `number` | - | Minimum allowed value |
| `max` | `number` | - | Maximum allowed value |
| `step` | `number` | `1` | Increment/decrement step |
| `precision` | `number` | - | Number of decimal places |
| `placeholder` | `string` | - | Placeholder text |
| `label` | `string` | - | Input label text |
| `error` | `string` | - | Error message to display |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `required` | `boolean` | `false` | Whether input is required |
| `readOnly` | `boolean` | `false` | Whether input is read-only |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Input style variant |
| `showControls` | `boolean` | `true` | Whether to show +/- buttons |
| `formatter` | `(value: number) => string` | - | Custom number formatter |
| `parser` | `(text: string) => number` | - | Custom number parser |
| `onFocus` | `() => void` | - | Callback when input gains focus |
| `onBlur` | `() => void` | - | Callback when input loses focus |
| `className` | `string` | - | Additional CSS classes |

## Usage

### Basic Number Input

```tsx
const [quantity, setQuantity] = useState(1)

<NumberInput
  value={quantity}
  onChange={setQuantity}
  label="Quantity"
  min={1}
  max={100}
/>
```

### Price Input with Formatting

```tsx
const [price, setPrice] = useState(0)

<NumberInput
  value={price}
  onChange={setPrice}
  label="Price"
  min={0}
  step={0.01}
  precision={2}
  formatter={(value) => `$${value.toFixed(2)}`}
  placeholder="0.00"
/>
```

### Percentage Input

```tsx
const [percentage, setPercentage] = useState(50)

<NumberInput
  value={percentage}
  onChange={setPercentage}
  label="Percentage"
  min={0}
  max={100}
  step={5}
  formatter={(value) => `${value}%`}
/>
```

### Age Input (No Controls)

```tsx
const [age, setAge] = useState()

<NumberInput
  value={age}
  onChange={setAge}
  label="Age"
  min={0}
  max={120}
  showControls={false}
  placeholder="Enter your age"
/>
```

### Temperature Input

```tsx
const [temperature, setTemperature] = useState(20)

<NumberInput
  value={temperature}
  onChange={setTemperature}
  label="Temperature"
  min={-50}
  max={50}
  step={0.5}
  precision={1}
  formatter={(value) => `${value}°C`}
/>
```

## Features

- **Numeric Validation**: Automatic validation for numeric input
- **Min/Max Constraints**: Built-in range validation
- **Step Controls**: Increment/decrement buttons
- **Precision Control**: Configurable decimal places
- **Custom Formatting**: Support for currency, percentage, units
- **Keyboard Support**: Arrow keys for increment/decrement
- **Accessibility**: Full screen reader support

## Related Components

- [`TextInput`](./text-input.md) - General text input component
- [`FindInput`](./find-input.md) - Search input component

## CSS Classes

- `.number-input` - Base input container class
- `.number-input__label` - Label styling
- `.number-input__field` - Input field styling
- `.number-input__controls` - Controls container
- `.number-input__control-btn` - Individual control button
- `.number-input__error` - Error message styling
- `.number-input--sm`, `.number-input--md`, `.number-input--lg` - Size variants
- `.number-input--outline`, `.number-input--filled`, `.number-input--ghost` - Style variants
- `.number-input--error` - Error state styling
- `.number-input--disabled` - Disabled state styling

## Accessibility

- Uses `role="spinbutton"` for proper semantics
- Includes `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Keyboard navigation (Up/Down arrows)
- Screen reader announcements for value changes
- Focus management for control buttons

## Common Patterns

### Shopping Cart Item

```tsx
const CartItem = ({ item }: { item: CartItem }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  
  const updateQuantity = (newQuantity: number | undefined) => {
    if (newQuantity && newQuantity > 0) {
      setQuantity(newQuantity)
      // Update cart logic here
    }
  }
  
  return (
    <div className="cart-item">
      <span>{item.name}</span>
      <NumberInput
        value={quantity}
        onChange={updateQuantity}
        min={1}
        max={item.stock}
        size="sm"
      />
      <span>${(item.price * quantity).toFixed(2)}</span>
    </div>
  )
}
```

### Settings Form

```tsx
const SettingsForm = () => {
  const [settings, setSettings] = useState({
    timeout: 30,
    maxRetries: 3,
    bufferSize: 1024
  })
  
  const updateSetting = (key: string) => (value: number | undefined) => {
    setSettings(prev => ({ ...prev, [key]: value || 0 }))
  }
  
  return (
    <form className="space-y-4">
      <NumberInput
        value={settings.timeout}
        onChange={updateSetting("timeout")}
        label="Timeout (seconds)"
        min={1}
        max={300}
      />
      
      <NumberInput
        value={settings.maxRetries}
        onChange={updateSetting("maxRetries")}
        label="Max Retries"
        min={0}
        max={10}
      />
      
      <NumberInput
        value={settings.bufferSize}
        onChange={updateSetting("bufferSize")}
        label="Buffer Size (KB)"
        min={256}
        max={8192}
        step={256}
      />
    </form>
  )
}
```

### Range Selector

```tsx
const RangeSelector = () => {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(100)
  
  return (
    <div className="range-selector">
      <div className="flex gap-4">
        <NumberInput
          value={minValue}
          onChange={setMinValue}
          label="Min"
          max={maxValue - 1}
          size="sm"
        />
        <NumberInput
          value={maxValue}
          onChange={setMaxValue}
          label="Max"
          min={minValue + 1}
          size="sm"
        />
      </div>
    </div>
  )
}
```
