# Options

A flexible configuration component for managing and displaying option sets, preferences, and settings with various input types and validation.

## Import

```javascript
import { Options } from '@priolo/jack'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `OptionConfig[]` | `[]` | Array of option configurations |
| `values` | `Record<string, any>` | `{}` | Current option values |
| `onChange` | `(key: string, value: any) => void` | - | Callback when option value changes |
| `onBulkChange` | `(values: Record<string, any>) => void` | - | Callback when multiple values change |
| `className` | `string` | - | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `variant` | `'default' \| 'compact' \| 'card' \| 'inline'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `disabled` | `boolean` | `false` | Disable all options |
| `readOnly` | `boolean` | `false` | Make all options read-only |
| `showLabels` | `boolean` | `true` | Show option labels |
| `showDescriptions` | `boolean` | `true` | Show option descriptions |
| `groupBy` | `string` | - | Group options by this property |
| `layout` | `'vertical' \| 'horizontal' \| 'grid'` | `'vertical'` | Layout orientation |
| `columns` | `number` | `1` | Number of columns for grid layout |
| `validation` | `ValidationConfig` | - | Global validation configuration |
| `resetButton` | `boolean` | `false` | Show reset to defaults button |
| `exportButton` | `boolean` | `false` | Show export configuration button |

## OptionConfig Interface

```typescript
interface OptionConfig {
  key: string                           // Unique identifier
  label?: string                        // Display label
  description?: string                  // Help text
  type: OptionType                      // Input type
  defaultValue?: any                    // Default value
  placeholder?: string                  // Input placeholder
  disabled?: boolean                    // Disable this option
  readOnly?: boolean                    // Make read-only
  required?: boolean                    // Mark as required
  validation?: ValidationRule[]         // Validation rules
  group?: string                        // Option group
  order?: number                        // Display order
  condition?: ConditionConfig           // Conditional display
  // Type-specific properties
  min?: number                          // For number/range types
  max?: number                          // For number/range types
  step?: number                         // For number/range types
  options?: SelectOption[]              // For select/radio types
  multiple?: boolean                    // For select type
  rows?: number                         // For textarea type
  accept?: string                       // For file type
  format?: string                       // For date types
}

type OptionType = 
  | 'text' | 'email' | 'password' | 'url' | 'tel'
  | 'number' | 'range' | 'date' | 'time' | 'datetime'
  | 'textarea' | 'select' | 'multiselect' | 'radio' | 'checkbox'
  | 'switch' | 'color' | 'file' | 'json' | 'custom'
```

## Basic Usage

### Simple Options

```jsx
import { Options } from '@priolo/jack'

function BasicExample() {
  const [values, setValues] = React.useState({
    username: '',
    email: '',
    notifications: true
  })
  
  const options = [
    {
      key: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter your username',
      required: true
    },
    {
      key: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your@email.com',
      required: true
    },
    {
      key: 'notifications',
      label: 'Enable Notifications',
      description: 'Receive email notifications for updates',
      type: 'switch',
      defaultValue: true
    }
  ]
  
  const handleChange = (key, value) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }
  
  return (
    <Options
      options={options}
      values={values}
      onChange={handleChange}
    />
  )
}
```

### Form Configuration

```jsx
function FormConfigExample() {
  const [config, setConfig] = React.useState({
    title: 'My Form',
    description: '',
    submitText: 'Submit',
    showProgressBar: true,
    allowDrafts: false,
    maxFileSize: 10
  })
  
  const formOptions = [
    {
      key: 'title',
      label: 'Form Title',
      type: 'text',
      required: true,
      validation: [
        { rule: 'minLength', value: 3, message: 'Title must be at least 3 characters' }
      ]
    },
    {
      key: 'description',
      label: 'Form Description',
      type: 'textarea',
      rows: 3,
      placeholder: 'Optional description for your form'
    },
    {
      key: 'submitText',
      label: 'Submit Button Text',
      type: 'text',
      defaultValue: 'Submit'
    },
    {
      key: 'showProgressBar',
      label: 'Show Progress Bar',
      description: 'Display progress indicator for multi-step forms',
      type: 'checkbox'
    },
    {
      key: 'allowDrafts',
      label: 'Allow Draft Saving',
      description: 'Users can save incomplete forms as drafts',
      type: 'switch'
    },
    {
      key: 'maxFileSize',
      label: 'Maximum File Size (MB)',
      type: 'number',
      min: 1,
      max: 100,
      step: 1,
      defaultValue: 10
    }
  ]
  
  return (
    <Options
      options={formOptions}
      values={config}
      onChange={(key, value) => setConfig(prev => ({ ...prev, [key]: value }))}
      variant="card"
      resetButton={true}
      exportButton={true}
    />
  )
}
```

## Advanced Examples

### Grouped Options

```jsx
function GroupedExample() {
  const [settings, setSettings] = React.useState({})
  
  const options = [
    // Appearance Group
    {
      key: 'theme',
      label: 'Theme',
      type: 'select',
      group: 'appearance',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'auto', label: 'Auto' }
      ],
      defaultValue: 'light'
    },
    {
      key: 'fontSize',
      label: 'Font Size',
      type: 'range',
      group: 'appearance',
      min: 12,
      max: 24,
      step: 2,
      defaultValue: 16
    },
    {
      key: 'compactMode',
      label: 'Compact Mode',
      type: 'switch',
      group: 'appearance',
      description: 'Reduce spacing for more content'
    },
    
    // Privacy Group
    {
      key: 'analytics',
      label: 'Analytics',
      type: 'checkbox',
      group: 'privacy',
      description: 'Help improve the app by sharing usage data'
    },
    {
      key: 'crashReports',
      label: 'Crash Reports',
      type: 'checkbox',
      group: 'privacy',
      description: 'Automatically send crash reports'
    },
    
    // Advanced Group
    {
      key: 'debugMode',
      label: 'Debug Mode',
      type: 'switch',
      group: 'advanced',
      description: 'Enable debug logging (requires restart)'
    },
    {
      key: 'cacheSize',
      label: 'Cache Size (MB)',
      type: 'number',
      group: 'advanced',
      min: 10,
      max: 1000,
      defaultValue: 100
    }
  ]
  
  return (
    <Options
      options={options}
      values={settings}
      onChange={(key, value) => setSettings(prev => ({ ...prev, [key]: value }))}
      groupBy="group"
      variant="card"
      layout="vertical"
    />
  )
}
```

### Conditional Options

```jsx
function ConditionalExample() {
  const [config, setConfig] = React.useState({
    enableFeature: false,
    featureType: 'basic'
  })
  
  const options = [
    {
      key: 'enableFeature',
      label: 'Enable Advanced Feature',
      type: 'switch',
      description: 'Unlock additional configuration options'
    },
    {
      key: 'featureType',
      label: 'Feature Type',
      type: 'radio',
      options: [
        { value: 'basic', label: 'Basic' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'expert', label: 'Expert' }
      ],
      condition: {
        key: 'enableFeature',
        operator: 'equals',
        value: true
      }
    },
    {
      key: 'expertSettings',
      label: 'Expert Configuration',
      type: 'json',
      placeholder: '{"key": "value"}',
      condition: {
        key: 'featureType',
        operator: 'equals',
        value: 'expert'
      }
    }
  ]
  
  return (
    <Options
      options={options}
      values={config}
      onChange={(key, value) => setConfig(prev => ({ ...prev, [key]: value }))}
    />
  )
}
```

### Validation Example

```jsx
function ValidationExample() {
  const [data, setData] = React.useState({})
  const [errors, setErrors] = React.useState({})
  
  const options = [
    {
      key: 'serverUrl',
      label: 'Server URL',
      type: 'url',
      required: true,
      validation: [
        { rule: 'required', message: 'Server URL is required' },
        { rule: 'url', message: 'Please enter a valid URL' },
        { rule: 'pattern', value: /^https:\/\//, message: 'URL must use HTTPS' }
      ]
    },
    {
      key: 'apiKey',
      label: 'API Key',
      type: 'password',
      required: true,
      validation: [
        { rule: 'required', message: 'API Key is required' },
        { rule: 'minLength', value: 32, message: 'API Key must be at least 32 characters' }
      ]
    },
    {
      key: 'timeout',
      label: 'Request Timeout (seconds)',
      type: 'number',
      min: 1,
      max: 300,
      defaultValue: 30,
      validation: [
        { rule: 'min', value: 1, message: 'Timeout must be at least 1 second' },
        { rule: 'max', value: 300, message: 'Timeout cannot exceed 5 minutes' }
      ]
    }
  ]
  
  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }))
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }))
    }
  }
  
  const validateOptions = () => {
    const newErrors = {}
    options.forEach(option => {
      const value = data[option.key]
      option.validation?.forEach(rule => {
        if (!validateRule(value, rule)) {
          newErrors[option.key] = rule.message
        }
      })
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  return (
    <div>
      <Options
        options={options}
        values={data}
        onChange={handleChange}
        errors={errors}
      />
      <button onClick={validateOptions}>
        Validate Configuration
      </button>
    </div>
  )
}
```

### Custom Option Types

```jsx
function CustomTypeExample() {
  const [settings, setSettings] = React.useState({})
  
  const ColorPicker = ({ value, onChange }) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
        type="color"
        value={value || '#000000'}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        type="text"
        value={value || '#000000'}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
      />
    </div>
  )
  
  const options = [
    {
      key: 'primaryColor',
      label: 'Primary Color',
      type: 'custom',
      component: ColorPicker,
      description: 'Choose your brand primary color'
    },
    {
      key: 'logo',
      label: 'Logo Upload',
      type: 'file',
      accept: 'image/*',
      description: 'Upload your company logo (PNG, JPG, SVG)'
    },
    {
      key: 'socialLinks',
      label: 'Social Media Links',
      type: 'json',
      placeholder: '{"twitter": "https://twitter.com/...", "linkedin": "..."}',
      description: 'JSON object with social media URLs'
    }
  ]
  
  return (
    <Options
      options={options}
      values={settings}
      onChange={(key, value) => setSettings(prev => ({ ...prev, [key]: value }))}
      variant="card"
    />
  )
}
```

## Layout Variants

### Grid Layout

```jsx
function GridLayoutExample() {
  const options = [
    { key: 'option1', label: 'Option 1', type: 'switch' },
    { key: 'option2', label: 'Option 2', type: 'switch' },
    { key: 'option3', label: 'Option 3', type: 'switch' },
    { key: 'option4', label: 'Option 4', type: 'switch' },
    { key: 'option5', label: 'Option 5', type: 'switch' },
    { key: 'option6', label: 'Option 6', type: 'switch' }
  ]
  
  return (
    <Options
      options={options}
      layout="grid"
      columns={3}
      variant="compact"
    />
  )
}
```

### Inline Layout

```jsx
function InlineLayoutExample() {
  const quickOptions = [
    {
      key: 'autoSave',
      label: 'Auto Save',
      type: 'switch'
    },
    {
      key: 'showLineNumbers',
      label: 'Line Numbers',
      type: 'switch'
    },
    {
      key: 'wordWrap',
      label: 'Word Wrap',
      type: 'switch'
    }
  ]
  
  return (
    <Options
      options={quickOptions}
      layout="horizontal"
      variant="inline"
      showDescriptions={false}
    />
  )
}
```

## Styling

### CSS Classes

The Options component applies these CSS classes:

- `.jack-options` - Base options container
- `.jack-options--{variant}` - Variant-specific styling
- `.jack-options--size-{size}` - Size-specific styling
- `.jack-options--layout-{layout}` - Layout-specific styling
- `.jack-options-group` - Option group container
- `.jack-options-group__title` - Group title
- `.jack-options-item` - Individual option item
- `.jack-options-item--disabled` - Disabled option
- `.jack-options-item--readonly` - Read-only option
- `.jack-options-item--error` - Option with validation error
- `.jack-options-label` - Option label
- `.jack-options-description` - Option description
- `.jack-options-input` - Option input wrapper
- `.jack-options-error` - Error message
- `.jack-options-actions` - Actions container

### Custom Styling

```css
.jack-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.jack-options--layout-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns, 1), 1fr);
  gap: 16px;
}

.jack-options--layout-horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}

.jack-options-group {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.jack-options-group__title {
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.jack-options-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.jack-options-item--error {
  border-left: 3px solid #e53e3e;
  padding-left: 12px;
}

.jack-options-label {
  font-weight: 500;
  color: #333;
}

.jack-options-description {
  font-size: 0.875rem;
  color: #666;
}

.jack-options-error {
  color: #e53e3e;
  font-size: 0.875rem;
}
```

## Accessibility

### ARIA Support

```jsx
function AccessibleOptions() {
  return (
    <Options
      options={[
        {
          key: 'setting1',
          label: 'Important Setting',
          description: 'This setting affects system behavior',
          type: 'switch',
          'aria-describedby': 'setting1-help',
          'aria-required': true
        }
      ]}
      role="group"
      aria-label="Application Settings"
    />
  )
}
```

### Keyboard Navigation

The Options component supports full keyboard navigation:
- **Tab/Shift+Tab**: Navigate between options
- **Enter/Space**: Activate switches, checkboxes, buttons
- **Arrow Keys**: Navigate radio button groups
- **Escape**: Close dropdowns/dialogs

## Best Practices

### Option Organization

```jsx
// Good: Logical grouping and ordering
const wellOrganizedOptions = [
  // Basic settings first
  { key: 'name', label: 'Display Name', type: 'text', order: 1 },
  { key: 'email', label: 'Email', type: 'email', order: 2 },
  
  // Advanced settings later
  { key: 'apiEndpoint', label: 'API Endpoint', type: 'url', group: 'advanced', order: 10 },
  { key: 'debugMode', label: 'Debug Mode', type: 'switch', group: 'advanced', order: 11 }
]
```

### Performance Optimization

```jsx
// Memoize expensive option calculations
const expensiveOptions = React.useMemo(() => {
  return generateDynamicOptions(data)
}, [data])

// Debounce onChange for real-time validation
const debouncedOnChange = React.useCallback(
  debounce((key, value) => {
    validateAndSave(key, value)
  }, 300),
  []
)
```

### TypeScript Integration

```typescript
interface AppSettings {
  theme: 'light' | 'dark'
  notifications: boolean
  language: string
}

const typedOptions: OptionConfig[] = [
  {
    key: 'theme',
    label: 'Theme',
    type: 'select',
    options: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' }
    ]
  } as const
]
```