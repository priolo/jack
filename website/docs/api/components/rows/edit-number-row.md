# EditNumberRow

An editable numeric input row component designed for use in lists. Provides inline number editing with increment/decrement controls, keyboard navigation, and a delete button for removing the item.

## Import

```tsx
import { EditNumberRow } from "@priolo/jack";
```

## Props

Implements the `RenderRowBaseProps<number>` interface:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `item` | `number` | **Required** | The numeric value to display/edit |
| `isSelect` | `boolean` | `false` | Whether this row is currently selected |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `placeholder` | `string` | `undefined` | Placeholder text for empty input |
| `onChange` | `(newItem: number \| null) => void` | `undefined` | Callback when item changes or is deleted |
| `onSelect` | `(e: React.SyntheticEvent) => void` | `undefined` | Callback when row is focused/selected |

## Basic Usage

```tsx
import { EditNumberRow, EditList } from "@priolo/jack";

function NumberListExample() {
  const [numbers, setNumbers] = useState([10, 20, 30]);
  const [selected, setSelected] = useState(-1);

  return (
    <EditList
      items={numbers}
      select={selected}
      RenderRow={EditNumberRow}
      placeholder="Enter number..."
      onItemsChange={setNumbers}
      onSelectChange={setSelected}
      onNewItem={() => 0}
    />
  );
}
```

## Price List Example

```tsx
function PriceList() {
  const [prices, setPrices] = useState([19.99, 29.99, 39.99]);
  const [selected, setSelected] = useState(-1);

  return (
    <div>
      <h3>Product Prices</h3>
      <EditList
        items={prices}
        select={selected}
        RenderRow={EditNumberRow}
        placeholder="0.00"
        onItemsChange={setPrices}
        onSelectChange={setSelected}
        onNewItem={() => 0}
      />
      <div>
        Total: ${prices.reduce((sum, price) => sum + price, 0).toFixed(2)}
      </div>
    </div>
  );
}
```

## Read-Only Mode

```tsx
function ReadOnlyNumberList() {
  const [scores] = useState([95, 87, 92, 78]);

  return (
    <div>
      <h3>Test Scores</h3>
      <EditList
        items={scores}
        RenderRow={EditNumberRow}
        readOnly={true}
        onItemsChange={() => {}} // No changes allowed
      />
    </div>
  );
}
```

## Integer-Only Input

```tsx
function CounterList() {
  const [counts, setCounts] = useState([1, 5, 10]);
  
  const handleCountChange = (newCounts) => {
    // Ensure all values are integers
    const integerCounts = newCounts.map(count => 
      count ? Math.round(count) : count
    );
    setCounts(integerCounts);
  };

  return (
    <EditList
      items={counts}
      RenderRow={EditNumberRow}
      placeholder="0"
      onItemsChange={handleCountChange}
      onNewItem={() => 1}
    />
  );
}
```

## Validation and Constraints

```tsx
function ValidatedNumberList() {
  const [values, setValues] = useState([50, 75, 100]);
  const [errors, setErrors] = useState({});

  const validateAndUpdate = (newValues) => {
    const newErrors = {};
    
    newValues.forEach((value, index) => {
      if (value !== null && value !== undefined) {
        if (value < 0) newErrors[index] = "Must be positive";
        if (value > 100) newErrors[index] = "Must be ≤ 100";
      }
    });
    
    setErrors(newErrors);
    setValues(newValues);
  };

  return (
    <div>
      <h3>Percentage Values (0-100)</h3>
      <EditList
        items={values}
        RenderRow={EditNumberRow}
        placeholder="0-100"
        onItemsChange={validateAndUpdate}
        onNewItem={() => 0}
      />
      {Object.entries(errors).map(([index, error]) => (
        <div key={index} style={{ color: 'red', fontSize: '12px' }}>
          Row {parseInt(index) + 1}: {error}
        </div>
      ))}
    </div>
  );
}
```

## Keyboard Shortcuts

The component handles these keyboard interactions:

- **Delete/Backspace on empty input**: Removes the item from the list
- **Arrow Up/Down**: Navigate between rows in the list
- **Enter**: Move to next row or create new item
- **Number keys**: Direct numeric input
- **Decimal point**: For decimal numbers

```tsx
function KeyboardExample() {
  const [items, setItems] = useState([10, 20]);
  
  const handleItemChange = (newItems, action) => {
    if (action === 'DELETE') {
      console.log('Item deleted via keyboard');
    }
    setItems(newItems);
  };

  return (
    <div>
      <p>Try Delete/Backspace on empty fields</p>
      <EditList
        items={items}
        RenderRow={EditNumberRow}
        onItemsChange={handleItemChange}
        onNewItem={() => 0}
      />
    </div>
  );
}
```

## Currency Input

```tsx
function CurrencyList() {
  const [amounts, setAmounts] = useState([100.50, 250.75, 500.00]);

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '';
    return `$${value.toFixed(2)}`;
  };

  return (
    <div>
      <h3>Budget Items</h3>
      <EditList
        items={amounts}
        RenderRow={EditNumberRow}
        placeholder="0.00"
        onItemsChange={setAmounts}
        onNewItem={() => 0}
      />
      <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
        Total Budget: {formatCurrency(amounts.reduce((sum, amt) => sum + amt, 0))}
      </div>
    </div>
  );
}
```

## Statistical Data

```tsx
function StatsList() {
  const [measurements, setMeasurements] = useState([
    12.5, 15.2, 18.7, 22.1, 19.8
  ]);

  const calculateStats = (values) => {
    const validValues = values.filter(v => v !== null && v !== undefined);
    const sum = validValues.reduce((a, b) => a + b, 0);
    const avg = sum / validValues.length;
    const min = Math.min(...validValues);
    const max = Math.max(...validValues);
    
    return { avg, min, max, count: validValues.length };
  };

  const stats = calculateStats(measurements);

  return (
    <div>
      <h3>Measurement Data</h3>
      <EditList
        items={measurements}
        RenderRow={EditNumberRow}
        placeholder="0.0"
        onItemsChange={setMeasurements}
        onNewItem={() => 0}
      />
      <div style={{ marginTop: '10px', fontSize: '14px' }}>
        <div>Count: {stats.count}</div>
        <div>Average: {stats.avg.toFixed(2)}</div>
        <div>Min: {stats.min}</div>
        <div>Max: {stats.max}</div>
      </div>
    </div>
  );
}
```

## Conditional Formatting

```tsx
function ColorCodedNumbers() {
  const [values, setValues] = useState([10, -5, 25, -15, 30]);

  const CustomNumberRow = (props) => {
    const value = props.item;
    const color = value > 0 ? 'green' : value < 0 ? 'red' : 'black';
    
    return (
      <div style={{ color }}>
        <EditNumberRow {...props} />
      </div>
    );
  };

  return (
    <div>
      <h3>Profit/Loss (Green: Profit, Red: Loss)</h3>
      <EditList
        items={values}
        RenderRow={CustomNumberRow}
        placeholder="0"
        onItemsChange={setValues}
        onNewItem={() => 0}
      />
    </div>
  );
}
```

## Features

- **Numeric Input**: Accepts only valid numeric values
- **Decimal Support**: Full support for decimal numbers
- **Keyboard Navigation**: Delete key removes empty items
- **Visual Selection**: Clear indication of selected state
- **Delete Button**: Hover to reveal delete button (when not read-only)
- **Auto-focus**: Automatically focuses when selected
- **Placeholder Support**: Shows helpful placeholder text
- **Number Validation**: Ensures only valid numbers are entered

## CSS Classes

The component uses these CSS classes:

- `.editrow-container` - Main container with flex layout
- `.editrow-number-input` - The numeric input area
- `.editrow-delete` - Delete button (appears on hover)
- `.editrow-selected` - Applied when row is selected

## Void Detection

The component includes a built-in `isVoid` function that considers these values as "empty":
- `null`
- `undefined`

This is used for keyboard deletion behavior and validation.

## Accessibility

- Proper keyboard navigation and focus management
- ARIA labels for screen readers
- High contrast delete button
- Semantic HTML structure
- Number input type for mobile keyboards

## Related Components

- [EditList](../lists/edit-list.md) - Container for editable lists
- [EditStringRow](./edit-string-row.md) - For text input rows
- [EditItemRow](./edit-item-row.md) - For generic item rows
- [NumberInput](../inputs/number-input.md) - Underlying input component
- [Box](../layout/box.md) - Layout container used internally
