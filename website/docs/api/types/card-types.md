# CardTypes

Type definitions for card components and card-related functionality in the Jack framework. This module contains all the TypeScript interfaces, types, and enumerations used for card management, rendering, and interactions.

## Core Card Interfaces

### CardState
Represents the state of a card component.

```typescript
interface CardState extends ViewState {
  // Card-specific properties
  cardType: string
  isLoading: boolean
  hasError: boolean
  errorMessage: string | null
  
  // Content state
  data: any
  isEmpty: boolean
  isEditable: boolean
  isDirty: boolean
  
  // Visual state
  highlighted: boolean
  pinned: boolean
  collapsed: boolean
  variant: CardVariant
  
  // Interactive state
  clickable: boolean
  draggable: boolean
  resizable: boolean
  selectable: boolean
}
```

### CardProps
Common props interface for card components.

```typescript
interface CardProps {
  store: ViewStore
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  
  // Event handlers
  onClick?: (event: React.MouseEvent) => void
  onDoubleClick?: (event: React.MouseEvent) => void
  onContextMenu?: (event: React.MouseEvent) => void
  
  // Card-specific handlers
  onCardSelect?: (card: ViewStore) => void
  onCardClose?: (card: ViewStore) => void
  onCardMinimize?: (card: ViewStore) => void
  onCardMaximize?: (card: ViewStore) => void
  
  // Render props
  headerRender?: React.ReactNode
  footerRender?: React.ReactNode
  contentRender?: React.ReactNode
}
```

### FrameworkCardProps
Props for the FrameworkCard component.

```typescript
interface FrameworkCardProps extends CardProps {
  // Layout props
  padding?: string | number
  margin?: string | number
  borderRadius?: string | number
  
  // Behavior props
  autoResize?: boolean
  maintainAspectRatio?: boolean
  enableResize?: boolean
  enableDrag?: boolean
  
  // Visual props
  showHeader?: boolean
  showFooter?: boolean
  showBorder?: boolean
  elevation?: number
  
  // Animation props
  animateMount?: boolean
  animateResize?: boolean
  animationDuration?: number
}
```

## Card Type Enumerations

### CardVariant
Visual variants for cards.

```typescript
type CardVariant = 
  | 'default'
  | 'outlined'
  | 'filled'
  | 'elevated'
  | 'ghost'
  | 'minimal'
  | 'compact'
  | 'expanded'
```

### CardSize
Standard card sizes.

```typescript
type CardSize = 
  | 'xs'     // Extra small: 200x150
  | 'sm'     // Small: 300x200
  | 'md'     // Medium: 400x300
  | 'lg'     // Large: 600x400
  | 'xl'     // Extra large: 800x600
  | 'auto'   // Automatic sizing
  | 'custom' // Custom size
```

### CardOrientation
Card orientation options.

```typescript
type CardOrientation = 
  | 'portrait'  // Height > Width
  | 'landscape' // Width > Height
  | 'square'    // Width = Height
  | 'auto'      // Determined by content
```

## Content Type Interfaces

### CardContent
Generic card content structure.

```typescript
interface CardContent<T = any> {
  type: string
  data: T
  metadata?: Record<string, any>
  lastModified: Date
  version: number
}

// Specific content types
interface TextCardContent extends CardContent<string> {
  type: 'text'
  data: string
  wordCount: number
  characterCount: number
}

interface ListCardContent extends CardContent<any[]> {
  type: 'list'
  data: any[]
  itemCount: number
  selectedItems: any[]
}

interface FormCardContent extends CardContent<Record<string, any>> {
  type: 'form'
  data: Record<string, any>
  fields: FormField[]
  validation: ValidationResult
}
```

### FormField
Form field definition for form cards.

```typescript
interface FormField {
  id: string
  name: string
  type: FormFieldType
  label: string
  placeholder?: string
  required: boolean
  disabled: boolean
  value: any
  defaultValue: any
  validation?: FieldValidation
  options?: SelectOption[]
}

type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'password'
  | 'number'
  | 'date'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'file'
```

## Card Layout Types

### CardLayout
Layout configuration for cards.

```typescript
interface CardLayout {
  type: CardLayoutType
  direction: 'horizontal' | 'vertical'
  alignment: 'start' | 'center' | 'end' | 'stretch'
  spacing: number
  padding: Spacing
  overflow: 'visible' | 'hidden' | 'scroll' | 'auto'
}

type CardLayoutType = 
  | 'flex'
  | 'grid'
  | 'stack'
  | 'masonry'
  | 'custom'
```

### Spacing
Spacing configuration for cards.

```typescript
interface Spacing {
  top?: number
  right?: number
  bottom?: number
  left?: number
  horizontal?: number
  vertical?: number
  all?: number
}
```

## Card Group Types

### CardGroupProps
Props for card group components.

```typescript
interface CardGroupProps {
  cardsStore: CardsStore
  className?: string
  style?: React.CSSProperties
  
  // Layout props
  layout?: CardGroupLayout
  spacing?: number
  columns?: number
  rows?: number
  
  // Behavior props
  selectable?: boolean
  multiSelect?: boolean
  sortable?: boolean
  filterable?: boolean
  
  // Render props
  Render: CardRenderFunction
  EmptyRender?: React.ReactNode
  LoadingRender?: React.ReactNode
  
  // Event handlers
  onCardSelect?: (card: ViewStore) => void
  onCardsSelect?: (cards: ViewStore[]) => void
  onCardAdd?: (card: ViewStore) => void
  onCardRemove?: (card: ViewStore) => void
}

type CardRenderFunction = (props: {
  view: ViewStore
  index: number
  isSelected: boolean
  isFocused: boolean
}) => React.ReactNode
```

### CardGroupLayout
Layout options for card groups.

```typescript
type CardGroupLayout = 
  | 'grid'      // Grid layout with fixed columns
  | 'masonry'   // Masonry layout with variable heights
  | 'list'      // Vertical list layout
  | 'carousel'  // Horizontal scrolling layout
  | 'stack'     // Stacked cards with overlap
  | 'timeline'  // Timeline-based layout
  | 'kanban'    // Kanban board layout
  | 'custom'    // Custom layout
```

## Card Theme Types

### CardTheme
Theme configuration for cards.

```typescript
interface CardTheme {
  name: string
  colors: CardColors
  typography: CardTypography
  spacing: CardSpacing
  borders: CardBorders
  shadows: CardShadows
  animations: CardAnimations
}

interface CardColors {
  background: string
  foreground: string
  border: string
  selected: string
  focused: string
  hover: string
  active: string
  disabled: string
  error: string
  warning: string
  success: string
  info: string
}

interface CardTypography {
  fontFamily: string
  fontSize: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  fontWeight: {
    light: number
    normal: number
    medium: number
    bold: number
  }
  lineHeight: number
}

interface CardSpacing {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

interface CardBorders {
  width: number
  radius: number
  style: 'solid' | 'dashed' | 'dotted' | 'none'
}

interface CardShadows {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
}

interface CardAnimations {
  duration: {
    fast: number
    normal: number
    slow: number
  }
  easing: {
    ease: string
    easeIn: string
    easeOut: string
    easeInOut: string
  }
}
```

## Card Interaction Types

### CardInteraction
Card interaction configuration.

```typescript
interface CardInteraction {
  clickable: boolean
  draggable: boolean
  resizable: boolean
  selectable: boolean
  contextMenu: boolean
  keyboard: boolean
  touch: boolean
  
  // Gesture support
  gestures: CardGestures
  
  // Accessibility
  accessibility: CardAccessibility
}

interface CardGestures {
  swipe: boolean
  pinch: boolean
  rotate: boolean
  longPress: boolean
  doubleClick: boolean
}

interface CardAccessibility {
  role: string
  label: string
  description: string
  keyboardNavigation: boolean
  screenReader: boolean
  focusable: boolean
  tabIndex: number
}
```

## Card Event Types

### CardEvent
Base interface for card events.

```typescript
interface CardEvent {
  type: CardEventType
  card: ViewStore
  timestamp: Date
  source: 'user' | 'system' | 'api'
  data?: any
}

type CardEventType = 
  | 'click'
  | 'doubleClick'
  | 'contextMenu'
  | 'select'
  | 'deselect'
  | 'focus'
  | 'blur'
  | 'dragStart'
  | 'dragEnd'
  | 'resizeStart'
  | 'resizeEnd'
  | 'minimize'
  | 'maximize'
  | 'close'
  | 'edit'
  | 'save'
  | 'cancel'
  | 'error'
  | 'load'
  | 'mount'
  | 'unmount'
```

### Specific Card Events

```typescript
interface CardClickEvent extends CardEvent {
  type: 'click'
  position: Position
  button: number
  modifiers: {
    ctrl: boolean
    shift: boolean
    alt: boolean
    meta: boolean
  }
}

interface CardDragEvent extends CardEvent {
  type: 'dragStart' | 'dragEnd'
  startPosition: Position
  endPosition: Position
  deltaPosition: Position
}

interface CardResizeEvent extends CardEvent {
  type: 'resizeStart' | 'resizeEnd'
  startSize: Size
  endSize: Size
  deltaSize: Size
}
```

## Card Factory Types

### CardFactory
Factory function for creating cards.

```typescript
type CardFactory<T extends ViewStore = ViewStore> = (
  type: string,
  options?: CardFactoryOptions
) => T

interface CardFactoryOptions {
  initialState?: Partial<CardState>
  position?: Position
  size?: Size
  theme?: string
  variant?: CardVariant
  content?: CardContent
  metadata?: Record<string, any>
}
```

### CardTemplate
Template for creating cards.

```typescript
interface CardTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: string
  
  // Template configuration
  defaultSize: Size
  defaultPosition?: Position
  allowedVariants: CardVariant[]
  supportedContent: string[]
  
  // Template structure
  setup: any
  component: React.ComponentType<CardProps>
  
  // Validation
  validate?: (content: CardContent) => ValidationResult
  
  // Lifecycle hooks
  onCreate?: (card: ViewStore) => void
  onDestroy?: (card: ViewStore) => void
}
```

## Utility Types

### CardSelector
Function type for selecting cards.

```typescript
type CardSelector = (card: ViewStore) => boolean

// Common selectors
const byType: (type: string) => CardSelector = (type) => 
  (card) => card.state.type === type

const byData: <T>(predicate: (data: T) => boolean) => CardSelector = (predicate) => 
  (card) => predicate(card.state.data)

const byState: (statePredicate: (state: CardState) => boolean) => CardSelector = (predicate) => 
  (card) => predicate(card.state as CardState)
```

### CardComparator
Function type for comparing cards.

```typescript
type CardComparator = (a: ViewStore, b: ViewStore) => number

// Common comparators
const byCreationDate: CardComparator = (a, b) => 
  a.state.createdAt.getTime() - b.state.createdAt.getTime()

const byTitle: CardComparator = (a, b) => 
  a.state.title.localeCompare(b.state.title)

const bySize: CardComparator = (a, b) => 
  (a.state.size.width * a.state.size.height) - (b.state.size.width * b.state.size.height)
```

### CardTransform
Function type for transforming card data.

```typescript
type CardTransform<T> = (card: ViewStore) => T

// Common transforms
const toSummary: CardTransform<CardSummary> = (card) => ({
  id: card.state.id,
  title: card.state.title,
  type: card.state.type,
  size: card.state.size,
  position: card.state.position,
  lastModified: card.state.lastModified
})

interface CardSummary {
  id: string
  title: string
  type: string
  size: Size
  position: Position
  lastModified: Date
}
```

## Generic Card Types

### TypedCard
Generic interface for typed cards.

```typescript
interface TypedCard<TData = any, TState extends CardState = CardState> extends ViewStore {
  state: TState & {
    data: TData
    cardType: string
  }
  
  // Typed methods
  setData: (data: TData) => void
  getData: () => TData
  updateData: (updater: (data: TData) => TData) => void
  
  // Content methods
  isEmpty: () => boolean
  isValid: () => boolean
  serialize: () => string
  deserialize: (data: string) => void
}

// Usage examples
interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
}

type UserCard = TypedCard<UserData>

interface TaskData {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
}

type TaskCard = TypedCard<TaskData>
```

## Usage Examples

### Creating Custom Card Types

```typescript
// Define custom card state
interface CustomCardState extends CardState {
  customProperty: string
  nestedData: {
    value: number
    label: string
  }
}

// Create typed card factory
const createCustomCard = (data: any): TypedCard<any, CustomCardState> => {
  const setup = mixStores(viewSetup, {
    state: {
      data,
      cardType: 'custom',
      customProperty: 'default',
      nestedData: { value: 0, label: 'Default' }
    },
    mutators: {
      setCustomProperty: (value: string) => ({ customProperty: value }),
      setNestedData: (data: { value: number; label: string }) => ({ nestedData: data })
    }
  })
  
  return createStore(setup) as TypedCard<any, CustomCardState>
}
```

### Card Theme Implementation

```typescript
// Define dark theme
const darkCardTheme: CardTheme = {
  name: 'dark',
  colors: {
    background: '#1e1e1e',
    foreground: '#ffffff',
    border: '#404040',
    selected: '#0078d4',
    focused: '#0078d4',
    hover: '#2a2a2a',
    active: '#333333',
    disabled: '#666666',
    error: '#f85149',
    warning: '#d29922',
    success: '#3fb950',
    info: '#58a6ff'
  },
  typography: {
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem', 
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 600
    },
    lineHeight: 1.5
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borders: {
    width: 1,
    radius: 8,
    style: 'solid'
  },
  shadows: {
    none: 'none',
    sm: '0 1px 3px rgba(0,0,0,0.2)',
    md: '0 4px 6px rgba(0,0,0,0.3)',
    lg: '0 10px 15px rgba(0,0,0,0.4)',
    xl: '0 20px 25px rgba(0,0,0,0.5)'
  },
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out'
    }
  }
}
```

### Using Card Selectors and Transforms

```typescript
// Filter cards by type
const taskCards = cardsStore.state.views.filter(byType('task'))

// Get card summaries
const cardSummaries = cardsStore.state.views.map(toSummary)

// Sort cards by creation date
const sortedCards = [...cardsStore.state.views].sort(byCreationDate)

// Find specific card
const findCardById = (id: string) => 
  cardsStore.state.views.find(card => card.state.id === id)

// Group cards by type
const groupCardsByType = () => {
  return cardsStore.state.views.reduce((groups, card) => {
    const type = card.state.type
    if (!groups[type]) groups[type] = []
    groups[type].push(card)
    return groups
  }, {} as Record<string, ViewStore[]>)
}
```

These type definitions provide a comprehensive foundation for working with cards in the Jack framework, ensuring type safety and clear interfaces for all card-related operations, from basic card properties to complex theming and interaction systems.
