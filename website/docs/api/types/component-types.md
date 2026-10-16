# ComponentTypes

Type definitions for general component functionality in the Jack framework. This module contains all the TypeScript interfaces, types, and enumerations used for component props, styling, theming, and common component patterns.

## Base Component Types

### ComponentProps
Base props interface that all Jack components extend.

```typescript
interface ComponentProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  
  // Accessibility
  id?: string
  role?: string
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-hidden'?: boolean
  
  // Data attributes
  'data-testid'?: string
  'data-component'?: string
  
  // Event handlers
  onClick?: (event: React.MouseEvent) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  onFocus?: (event: React.FocusEvent) => void
  onBlur?: (event: React.FocusEvent) => void
}
```

### StyledComponentProps
Props for components that support styling and theming.

```typescript
interface StyledComponentProps extends ComponentProps {
  // Theme
  theme?: string | ComponentTheme
  variant?: string
  
  // Size
  size?: ComponentSize
  
  // Visual state
  disabled?: boolean
  loading?: boolean
  error?: boolean
  
  // Layout
  fullWidth?: boolean
  fullHeight?: boolean
  
  // Spacing
  margin?: Spacing | number | string
  padding?: Spacing | number | string
}
```

### InteractiveComponentProps
Props for interactive components like buttons and inputs.

```typescript
interface InteractiveComponentProps extends StyledComponentProps {
  // State
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  
  // Validation
  error?: boolean
  errorMessage?: string
  helperText?: string
  
  // Interaction
  tabIndex?: number
  autoFocus?: boolean
  
  // Form integration
  name?: string
  value?: any
  defaultValue?: any
  
  // Event handlers
  onChange?: (value: any, event?: Event) => void
  onSubmit?: (value: any, event?: Event) => void
  onReset?: () => void
  onValidate?: (value: any) => ValidationResult
}
```

## Component Configuration Types

### ComponentConfig
General configuration for component behavior.

```typescript
interface ComponentConfig {
  // Behavior
  lazy?: boolean
  memoize?: boolean
  forwardRef?: boolean
  
  // Styling
  useCSS?: boolean
  useStyledComponents?: boolean
  
  // Accessibility
  enforceA11y?: boolean
  autoId?: boolean
  
  // Performance
  debounce?: number
  throttle?: number
  
  // Development
  debug?: boolean
  displayName?: string
}
```

### ComponentState
Base state interface for stateful components.

```typescript
interface ComponentState {
  // Lifecycle
  mounted: boolean
  initialized: boolean
  
  // Interaction
  focused: boolean
  hovered: boolean
  active: boolean
  
  // State
  loading: boolean
  error: boolean
  disabled: boolean
  
  // Data
  value: any
  previousValue: any
  
  // Validation
  valid: boolean
  touched: boolean
  dirty: boolean
}
```

## Theme and Styling Types

### ComponentTheme
Theme configuration for components.

```typescript
interface ComponentTheme {
  name: string
  colors: ThemeColors
  typography: ThemeTypography
  spacing: ThemeSpacing
  borders: ThemeBorders
  shadows: ThemeShadows
  animations: ThemeAnimations
  breakpoints: ThemeBreakpoints
}

interface ThemeColors {
  // Primary colors
  primary: string
  secondary: string
  tertiary: string
  
  // Semantic colors
  success: string
  warning: string
  error: string
  info: string
  
  // Neutral colors
  background: string
  surface: string
  border: string
  text: string
  textSecondary: string
  textDisabled: string
  
  // Interactive states
  hover: string
  active: string
  focus: string
  disabled: string
  selected: string
}

interface ThemeTypography {
  fontFamily: {
    primary: string
    secondary: string
    monospace: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
  }
  fontWeight: {
    thin: number
    light: number
    normal: number
    medium: number
    semibold: number
    bold: number
    extrabold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
    loose: number
  }
  letterSpacing: {
    tight: string
    normal: string
    wide: string
  }
}

interface ThemeSpacing {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
  '4xl': number
}

interface ThemeBorders {
  radius: {
    none: number
    sm: number
    md: number
    lg: number
    xl: number
    full: number
  }
  width: {
    thin: number
    normal: number
    thick: number
  }
}

interface ThemeShadows {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  inner: string
}

interface ThemeAnimations {
  duration: {
    fast: number
    normal: number
    slow: number
  }
  easing: {
    linear: string
    ease: string
    easeIn: string
    easeOut: string
    easeInOut: string
  }
  transition: {
    all: string
    colors: string
    opacity: string
    transform: string
  }
}

interface ThemeBreakpoints {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}
```

## Component Size Types

### ComponentSize
Standard component sizes.

```typescript
type ComponentSize = 
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'auto'
  | 'inherit'
```

### Spacing
Spacing configuration for components.

```typescript
interface Spacing {
  top?: number | string
  right?: number | string
  bottom?: number | string
  left?: number | string
  horizontal?: number | string
  vertical?: number | string
  all?: number | string
}

// Shorthand spacing types
type SpacingValue = number | string | Spacing
type MarginValue = SpacingValue
type PaddingValue = SpacingValue
```

## Component Factory Types

### ComponentFactory
Factory function for creating components.

```typescript
type ComponentFactory<TProps = any, TComponent = React.ComponentType> = (
  config?: ComponentConfig
) => TComponent

interface ComponentFactoryOptions {
  defaultProps?: Partial<ComponentProps>
  displayName?: string
  memo?: boolean
  forwardRef?: boolean
  withTheme?: boolean
}
```

### ComponentTemplate
Template for creating components.

```typescript
interface ComponentTemplate {
  id: string
  name: string
  description: string
  category: ComponentCategory
  
  // Template structure
  component: React.ComponentType<any>
  defaultProps: Record<string, any>
  
  // Configuration
  configurable: string[]
  required: string[]
  
  // Validation
  propTypes?: Record<string, any>
  validate?: (props: any) => ValidationResult
  
  // Documentation
  examples?: ComponentExample[]
  documentation?: string
}

interface ComponentExample {
  title: string
  description: string
  code: string
  props: Record<string, any>
  preview?: React.ReactNode
}
```

## Event Handler Types

### ComponentEventHandlers
Standard event handlers for components.

```typescript
interface ComponentEventHandlers {
  // Mouse events
  onClick?: (event: React.MouseEvent) => void
  onDoubleClick?: (event: React.MouseEvent) => void
  onMouseDown?: (event: React.MouseEvent) => void
  onMouseUp?: (event: React.MouseEvent) => void
  onMouseEnter?: (event: React.MouseEvent) => void
  onMouseLeave?: (event: React.MouseEvent) => void
  onMouseMove?: (event: React.MouseEvent) => void
  
  // Keyboard events
  onKeyDown?: (event: React.KeyboardEvent) => void
  onKeyUp?: (event: React.KeyboardEvent) => void
  onKeyPress?: (event: React.KeyboardEvent) => void
  
  // Focus events
  onFocus?: (event: React.FocusEvent) => void
  onBlur?: (event: React.FocusEvent) => void
  
  // Form events
  onChange?: (value: any, event?: Event) => void
  onSubmit?: (event: React.FormEvent) => void
  onReset?: (event: React.FormEvent) => void
  
  // Touch events
  onTouchStart?: (event: React.TouchEvent) => void
  onTouchMove?: (event: React.TouchEvent) => void
  onTouchEnd?: (event: React.TouchEvent) => void
  
  // Drag events
  onDragStart?: (event: React.DragEvent) => void
  onDragEnd?: (event: React.DragEvent) => void
  onDragEnter?: (event: React.DragEvent) => void
  onDragLeave?: (event: React.DragEvent) => void
  onDragOver?: (event: React.DragEvent) => void
  onDrop?: (event: React.DragEvent) => void
}
```

## Validation Types

### ValidationResult
Result of component validation.

```typescript
interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

interface ValidationError {
  field: string
  message: string
  code?: string
  value?: any
}

interface ValidationWarning {
  field: string
  message: string
  code?: string
  value?: any
}

// Validator function types
type ComponentValidator<T = any> = (value: T, props?: any) => ValidationResult
type FieldValidator = (value: any, field: string) => boolean | string
type AsyncValidator<T = any> = (value: T, props?: any) => Promise<ValidationResult>
```

## Render Props Types

### RenderProps
Common render prop patterns.

```typescript
interface RenderProps {
  // Content render props
  children?: React.ReactNode | ((props: any) => React.ReactNode)
  render?: (props: any) => React.ReactNode
  
  // Specific render props
  headerRender?: React.ReactNode | ((props: any) => React.ReactNode)
  footerRender?: React.ReactNode | ((props: any) => React.ReactNode)
  contentRender?: React.ReactNode | ((props: any) => React.ReactNode)
  
  // Loading states
  loadingRender?: React.ReactNode
  errorRender?: React.ReactNode | ((error: Error) => React.ReactNode)
  emptyRender?: React.ReactNode
  
  // Custom renders
  customRender?: Record<string, React.ReactNode | ((props: any) => React.ReactNode)>
}

// Render function types
type RenderFunction<TProps = any> = (props: TProps) => React.ReactNode
type ConditionalRenderFunction<TProps = any> = (props: TProps) => React.ReactNode | null
type AsyncRenderFunction<TProps = any> = (props: TProps) => Promise<React.ReactNode>
```

## Hook Types

### ComponentHook
Base hook return type for component hooks.

```typescript
interface ComponentHook<TState = any, TActions = any> {
  state: TState
  actions: TActions
  refs: ComponentRefs
  utils: ComponentUtils
}

interface ComponentRefs {
  ref: React.RefObject<HTMLElement>
  containerRef: React.RefObject<HTMLDivElement>
  contentRef: React.RefObject<HTMLDivElement>
  [key: string]: React.RefObject<HTMLElement>
}

interface ComponentUtils {
  isVisible: () => boolean
  isFocused: () => boolean
  isDisabled: () => boolean
  scrollIntoView: () => void
  focus: () => void
  blur: () => void
  measure: () => DOMRect | null
}
```

## Utility Types

### ComponentSelector
Function type for selecting components.

```typescript
type ComponentSelector<T = React.ComponentType> = (component: T) => boolean

// Common selectors
const byDisplayName: (name: string) => ComponentSelector = (name) => 
  (component) => component.displayName === name

const byType: (type: string) => ComponentSelector = (type) => 
  (component) => component.type === type
```

### ComponentTransform
Function type for transforming component props or state.

```typescript
type ComponentTransform<TInput, TOutput> = (input: TInput) => TOutput

// Common transforms
const propsTransform: ComponentTransform<any, ComponentProps> = (props) => ({
  ...props,
  className: `jack-component ${props.className || ''}`.trim()
})

const stateTransform: ComponentTransform<any, ComponentState> = (state) => ({
  ...state,
  timestamp: new Date()
})
```

## Category and Classification Types

### ComponentCategory
Categories for organizing components.

```typescript
type ComponentCategory = 
  | 'core'
  | 'layout'
  | 'input'
  | 'display'
  | 'feedback'
  | 'navigation'
  | 'data'
  | 'media'
  | 'utility'
  | 'custom'
```

### ComponentVariant
Common component variants.

```typescript
type ComponentVariant = 
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'ghost'
  | 'outline'
  | 'text'
  | 'link'
```

## Usage Examples

### Creating a Styled Component

```typescript
interface CustomButtonProps extends StyledComponentProps {
  variant?: ComponentVariant
  loading?: boolean
  icon?: React.ReactNode
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'default',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  className,
  ...props
}) => {
  const buttonClass = `
    jack-button 
    jack-button--${variant} 
    jack-button--${size}
    ${loading ? 'jack-button--loading' : ''}
    ${disabled ? 'jack-button--disabled' : ''}
    ${className || ''}
  `.trim()

  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  )
}
```

### Using Component Theme

```typescript
// Define custom theme
const customTheme: ComponentTheme = {
  name: 'custom',
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
    background: '#ffffff',
    surface: '#f8f9fa',
    border: '#e9ecef',
    text: '#212529',
    textSecondary: '#6c757d',
    textDisabled: '#adb5bd',
    hover: '#e9ecef',
    active: '#dee2e6',
    focus: '#007bff',
    disabled: '#f8f9fa',
    selected: '#e3f2fd'
  },
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Georgia, serif',
      monospace: 'Fira Code, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem'
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em'
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
    '4xl': 96
  },
  borders: {
    radius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999
    },
    width: {
      thin: 1,
      normal: 2,
      thick: 4
    }
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
  },
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out'
    },
    transition: {
      all: 'all 0.3s ease',
      colors: 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
      opacity: 'opacity 0.3s ease',
      transform: 'transform 0.3s ease'
    }
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    '2xl': 1400
  }
}
```

### Component Validation

```typescript
// Define validation rules
const componentValidator: ComponentValidator<ComponentProps> = (value, props) => {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []

  // Required field validation
  if (props?.required && (!value || value === '')) {
    errors.push({
      field: 'value',
      message: 'This field is required',
      code: 'REQUIRED'
    })
  }

  // Type validation
  if (value && typeof value !== 'string') {
    warnings.push({
      field: 'value',
      message: 'Expected string value',
      code: 'TYPE_MISMATCH'
    })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

// Use in component
const ValidatedInput: React.FC<InteractiveComponentProps> = ({
  value,
  onChange,
  onValidate = componentValidator,
  ...props
}) => {
  const [validationResult, setValidationResult] = React.useState<ValidationResult>({
    valid: true,
    errors: [],
    warnings: []
  })

  React.useEffect(() => {
    if (onValidate) {
      const result = onValidate(value, props)
      setValidationResult(result)
    }
  }, [value, onValidate, props])

  return (
    <div className={`jack-input ${!validationResult.valid ? 'jack-input--error' : ''}`}>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value, e)}
        {...props}
      />
      {validationResult.errors.map((error, index) => (
        <div key={index} className="jack-input__error">
          {error.message}
        </div>
      ))}
    </div>
  )
}
```

These type definitions provide a comprehensive foundation for working with components in the Jack framework, ensuring type safety and consistent interfaces for all component-related operations, from basic props to complex theming and validation systems.
