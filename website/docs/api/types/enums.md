# Enums

Enumeration types used throughout the Jack framework. This module contains all the enumerated constants and union types that define standardized values for various component properties, states, and behaviors.

## Component Enums

### ComponentSize
Standard sizes for Jack components.

```typescript
enum ComponentSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  AUTO = 'auto',
  INHERIT = 'inherit'
}

// Usage
const buttonSize = ComponentSize.MD
const inputSize = ComponentSize.LG
```

### ComponentVariant
Visual variants for components.

```typescript
enum ComponentVariant {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  GHOST = 'ghost',
  OUTLINE = 'outline',
  TEXT = 'text',
  LINK = 'link'
}

// Usage
const buttonVariant = ComponentVariant.PRIMARY
const alertVariant = ComponentVariant.ERROR
```

### ComponentState
Component state values.

```typescript
enum ComponentState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  DISABLED = 'disabled',
  FOCUSED = 'focused',
  ACTIVE = 'active',
  HOVER = 'hover'
}

// Usage
const currentState = ComponentState.LOADING
```

## Card Enums

### CardVariant
Visual variants for cards.

```typescript
enum CardVariant {
  DEFAULT = 'default',
  OUTLINED = 'outlined',
  FILLED = 'filled',
  ELEVATED = 'elevated',
  GHOST = 'ghost',
  MINIMAL = 'minimal',
  COMPACT = 'compact',
  EXPANDED = 'expanded'
}

// Usage
const cardVariant = CardVariant.ELEVATED
```

### CardSize
Standard card sizes.

```typescript
enum CardSize {
  XS = 'xs',      // Extra small: 200x150
  SM = 'sm',      // Small: 300x200
  MD = 'md',      // Medium: 400x300
  LG = 'lg',      // Large: 600x400
  XL = 'xl',      // Extra large: 800x600
  AUTO = 'auto',  // Automatic sizing
  CUSTOM = 'custom' // Custom size
}

// Usage
const cardSize = CardSize.MD
```

### CardOrientation
Card orientation options.

```typescript
enum CardOrientation {
  PORTRAIT = 'portrait',   // Height > Width
  LANDSCAPE = 'landscape', // Width > Height
  SQUARE = 'square',       // Width = Height
  AUTO = 'auto'           // Determined by content
}

// Usage
const orientation = CardOrientation.LANDSCAPE
```

### CardLayoutType
Layout types for cards.

```typescript
enum CardLayoutType {
  FLEX = 'flex',
  GRID = 'grid',
  STACK = 'stack',
  MASONRY = 'masonry',
  CUSTOM = 'custom'
}

// Usage
const layoutType = CardLayoutType.GRID
```

### CardGroupLayout
Layout options for card groups.

```typescript
enum CardGroupLayout {
  GRID = 'grid',         // Grid layout with fixed columns
  MASONRY = 'masonry',   // Masonry layout with variable heights
  LIST = 'list',         // Vertical list layout
  CAROUSEL = 'carousel', // Horizontal scrolling layout
  STACK = 'stack',       // Stacked cards with overlap
  TIMELINE = 'timeline', // Timeline-based layout
  KANBAN = 'kanban',     // Kanban board layout
  CUSTOM = 'custom'      // Custom layout
}

// Usage
const groupLayout = CardGroupLayout.MASONRY
```

## View Enums

### ViewStateType
View state types.

```typescript
enum ViewStateType {
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
  MINIMIZED = 'minimized',
  MAXIMIZED = 'maximized',
  FOCUSED = 'focused',
  DRAGGING = 'dragging',
  RESIZING = 'resizing',
  ANIMATING = 'animating'
}

// Usage
const viewState = ViewStateType.FOCUSED
```

### ViewEventType
View event types.

```typescript
enum ViewEventType {
  CREATED = 'created',
  DESTROYED = 'destroyed',
  SHOW = 'show',
  HIDE = 'hide',
  FOCUS = 'focus',
  BLUR = 'blur',
  MINIMIZE = 'minimize',
  MAXIMIZE = 'maximize',
  RESTORE = 'restore',
  POSITION_CHANGE = 'position:change',
  SIZE_CHANGE = 'size:change',
  TITLE_CHANGE = 'title:change',
  CLOSE = 'close',
  DRAG_START = 'drag:start',
  DRAG_END = 'drag:end',
  RESIZE_START = 'resize:start',
  RESIZE_END = 'resize:end'
}

// Usage
const eventType = ViewEventType.POSITION_CHANGE
```

### NavigationDirection
Directions for keyboard navigation.

```typescript
enum NavigationDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  NEXT = 'next',
  PREVIOUS = 'previous'
}

// Usage
const direction = NavigationDirection.RIGHT
```

### DragType
Types of drag operations.

```typescript
enum DragType {
  MOVE = 'move',
  RESIZE = 'resize',
  CUSTOM = 'custom'
}

// Usage
const dragType = DragType.MOVE
```

## Animation Enums

### AnimationDuration
Standard animation durations.

```typescript
enum AnimationDuration {
  INSTANT = 0,
  FAST = 150,
  NORMAL = 300,
  SLOW = 500,
  SLOWER = 800,
  SLOWEST = 1200
}

// Usage
const duration = AnimationDuration.NORMAL
```

### AnimationEasing
Animation easing functions.

```typescript
enum AnimationEasing {
  LINEAR = 'linear',
  EASE = 'ease',
  EASE_IN = 'ease-in',
  EASE_OUT = 'ease-out',
  EASE_IN_OUT = 'ease-in-out',
  CUBIC_BEZIER = 'cubic-bezier(0.4, 0, 0.2, 1)'
}

// Usage
const easing = AnimationEasing.EASE_IN_OUT
```

### TransitionType
Types of transitions.

```typescript
enum TransitionType {
  FADE = 'fade',
  SLIDE = 'slide',
  SCALE = 'scale',
  ROTATE = 'rotate',
  FLIP = 'flip',
  BOUNCE = 'bounce',
  ZOOM = 'zoom',
  CUSTOM = 'custom'
}

// Usage
const transition = TransitionType.FADE
```

## Input Enums

### InputType
Input field types.

```typescript
enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEL = 'tel',
  URL = 'url',
  SEARCH = 'search',
  DATE = 'date',
  TIME = 'time',
  DATETIME_LOCAL = 'datetime-local',
  MONTH = 'month',
  WEEK = 'week',
  COLOR = 'color',
  FILE = 'file',
  RANGE = 'range',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  HIDDEN = 'hidden'
}

// Usage
const inputType = InputType.EMAIL
```

### FormFieldType
Form field types for complex forms.

```typescript
enum FormFieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXTAREA = 'textarea',
  FILE = 'file',
  RICH_TEXT = 'richtext',
  JSON = 'json'
}

// Usage
const fieldType = FormFieldType.MULTISELECT
```

### ValidationSeverity
Validation message severity levels.

```typescript
enum ValidationSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success'
}

// Usage
const severity = ValidationSeverity.ERROR
```

## Event Source Enums

### EventSource
Sources of events in the framework.

```typescript
enum EventSource {
  USER = 'user',
  SYSTEM = 'system',
  API = 'api',
  TIMER = 'timer',
  EXTERNAL = 'external'
}

// Usage
const source = EventSource.USER
```

### InteractionType
Types of user interactions.

```typescript
enum InteractionType {
  CLICK = 'click',
  DOUBLE_CLICK = 'doubleClick',
  RIGHT_CLICK = 'rightClick',
  LONG_PRESS = 'longPress',
  HOVER = 'hover',
  FOCUS = 'focus',
  BLUR = 'blur',
  KEYBOARD = 'keyboard',
  TOUCH = 'touch',
  DRAG = 'drag',
  SWIPE = 'swipe',
  PINCH = 'pinch',
  SCROLL = 'scroll'
}

// Usage
const interaction = InteractionType.DOUBLE_CLICK
```

## Theme Enums

### ThemeMode
Theme modes for light/dark themes.

```typescript
enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
  SYSTEM = 'system'
}

// Usage
const themeMode = ThemeMode.DARK
```

### ColorScheme
Color scheme types.

```typescript
enum ColorScheme {
  MONOCHROME = 'monochrome',
  ANALOGOUS = 'analogous',
  COMPLEMENTARY = 'complementary',
  TRIADIC = 'triadic',
  TETRADIC = 'tetradic',
  CUSTOM = 'custom'
}

// Usage
const colorScheme = ColorScheme.COMPLEMENTARY
```

### BreakpointSize
Responsive breakpoint sizes.

```typescript
enum BreakpointSize {
  XS = 'xs',    // 0px
  SM = 'sm',    // 576px
  MD = 'md',    // 768px
  LG = 'lg',    // 992px
  XL = 'xl',    // 1200px
  XXL = '2xl'   // 1400px
}

// Usage
const breakpoint = BreakpointSize.MD
```

## Layout Enums

### FlexDirection
Flexbox direction values.

```typescript
enum FlexDirection {
  ROW = 'row',
  ROW_REVERSE = 'row-reverse',
  COLUMN = 'column',
  COLUMN_REVERSE = 'column-reverse'
}

// Usage
const direction = FlexDirection.COLUMN
```

### FlexWrap
Flexbox wrap values.

```typescript
enum FlexWrap {
  NOWRAP = 'nowrap',
  WRAP = 'wrap',
  WRAP_REVERSE = 'wrap-reverse'
}

// Usage
const wrap = FlexWrap.WRAP
```

### JustifyContent
Flexbox justify-content values.

```typescript
enum JustifyContent {
  FLEX_START = 'flex-start',
  FLEX_END = 'flex-end',
  CENTER = 'center',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
  SPACE_EVENLY = 'space-evenly',
  START = 'start',
  END = 'end'
}

// Usage
const justify = JustifyContent.CENTER
```

### AlignItems
Flexbox align-items values.

```typescript
enum AlignItems {
  STRETCH = 'stretch',
  FLEX_START = 'flex-start',
  FLEX_END = 'flex-end',
  CENTER = 'center',
  BASELINE = 'baseline',
  START = 'start',
  END = 'end'
}

// Usage
const align = AlignItems.CENTER
```

### Position
CSS position values.

```typescript
enum Position {
  STATIC = 'static',
  RELATIVE = 'relative',
  ABSOLUTE = 'absolute',
  FIXED = 'fixed',
  STICKY = 'sticky'
}

// Usage
const position = Position.ABSOLUTE
```

### Overflow
CSS overflow values.

```typescript
enum Overflow {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  SCROLL = 'scroll',
  AUTO = 'auto',
  CLIP = 'clip'
}

// Usage
const overflow = Overflow.AUTO
```

## Status Enums

### LoadingState
Loading states for components.

```typescript
enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  TIMEOUT = 'timeout'
}

// Usage
const loadingState = LoadingState.LOADING
```

### Priority
Priority levels.

```typescript
enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
  URGENT = 'urgent'
}

// Usage
const priority = Priority.HIGH
```

### Severity
Severity levels for messages and alerts.

```typescript
enum Severity {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}

// Usage
const severity = Severity.ERROR
```

## Accessibility Enums

### AriaRole
ARIA roles for accessibility.

```typescript
enum AriaRole {
  BUTTON = 'button',
  LINK = 'link',
  MENU = 'menu',
  MENUITEM = 'menuitem',
  TAB = 'tab',
  TABPANEL = 'tabpanel',
  DIALOG = 'dialog',
  ALERT = 'alert',
  ALERTDIALOG = 'alertdialog',
  APPLICATION = 'application',
  BANNER = 'banner',
  COMPLEMENTARY = 'complementary',
  CONTENTINFO = 'contentinfo',
  FORM = 'form',
  MAIN = 'main',
  NAVIGATION = 'navigation',
  REGION = 'region',
  SEARCH = 'search',
  ARTICLE = 'article',
  DOCUMENT = 'document',
  IMG = 'img',
  LIST = 'list',
  LISTITEM = 'listitem',
  TABLE = 'table',
  GRID = 'grid',
  GRIDCELL = 'gridcell',
  ROW = 'row',
  COLUMNHEADER = 'columnheader',
  ROWHEADER = 'rowheader'
}

// Usage
const role = AriaRole.BUTTON
```

### KeyboardKey
Common keyboard keys.

```typescript
enum KeyboardKey {
  ENTER = 'Enter',
  ESCAPE = 'Escape',
  SPACE = ' ',
  TAB = 'Tab',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  HOME = 'Home',
  END = 'End',
  PAGE_UP = 'PageUp',
  PAGE_DOWN = 'PageDown',
  DELETE = 'Delete',
  BACKSPACE = 'Backspace',
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  F10 = 'F10',
  F11 = 'F11',
  F12 = 'F12'
}

// Usage
const key = KeyboardKey.ENTER
```

## Usage Examples

### Using Enums in Components

```typescript
import { 
  ComponentSize, 
  ComponentVariant, 
  CardSize, 
  CardVariant 
} from '@priolo/jack/enums'

interface ButtonProps {
  size?: ComponentSize
  variant?: ComponentVariant
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  size = ComponentSize.MD,
  variant = ComponentVariant.DEFAULT,
  children,
  ...props
}) => {
  return (
    <button 
      className={`btn btn--${size} btn--${variant}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Usage
<Button size={ComponentSize.LG} variant={ComponentVariant.PRIMARY}>
  Click me
</Button>
```

### Creating Type-Safe Event Handlers

```typescript
import { ViewEventType, NavigationDirection } from '@priolo/jack/enums'

interface ViewEventHandler {
  eventType: ViewEventType
  handler: (event: any) => void
}

const createEventHandlers = (): ViewEventHandler[] => [
  {
    eventType: ViewEventType.FOCUS,
    handler: (event) => console.log('View focused:', event.view.id)
  },
  {
    eventType: ViewEventType.POSITION_CHANGE,
    handler: (event) => console.log('Position changed:', event.newPosition)
  },
  {
    eventType: ViewEventType.CLOSE,
    handler: (event) => console.log('View closed:', event.view.id)
  }
]

// Navigation handling
const handleKeyboardNavigation = (direction: NavigationDirection, view: ViewStore) => {
  switch (direction) {
    case NavigationDirection.UP:
      view.moveTo(view.state.position.x, view.state.position.y - 10)
      break
    case NavigationDirection.DOWN:
      view.moveTo(view.state.position.x, view.state.position.y + 10)
      break
    case NavigationDirection.LEFT:
      view.moveTo(view.state.position.x - 10, view.state.position.y)
      break
    case NavigationDirection.RIGHT:
      view.moveTo(view.state.position.x + 10, view.state.position.y)
      break
  }
}
```

### Using Enums in Configuration

```typescript
import { 
  CardGroupLayout, 
  AnimationDuration, 
  AnimationEasing,
  ThemeMode 
} from '@priolo/jack/enums'

interface AppConfig {
  theme: {
    mode: ThemeMode
    animations: {
      duration: AnimationDuration
      easing: AnimationEasing
    }
  }
  cards: {
    defaultLayout: CardGroupLayout
    defaultSize: CardSize
  }
}

const appConfig: AppConfig = {
  theme: {
    mode: ThemeMode.AUTO,
    animations: {
      duration: AnimationDuration.NORMAL,
      easing: AnimationEasing.EASE_IN_OUT
    }
  },
  cards: {
    defaultLayout: CardGroupLayout.MASONRY,
    defaultSize: CardSize.MD
  }
}
```

### Validation with Enums

```typescript
import { ComponentVariant, Severity } from '@priolo/jack/enums'

const validateVariant = (variant: string): boolean => {
  return Object.values(ComponentVariant).includes(variant as ComponentVariant)
}

const createValidationMessage = (severity: Severity, message: string) => ({
  severity,
  message,
  timestamp: new Date(),
  id: Math.random().toString(36)
})

// Usage
if (!validateVariant(userInput)) {
  const errorMessage = createValidationMessage(
    Severity.ERROR,
    'Invalid component variant provided'
  )
  console.error(errorMessage)
}
```

These enumeration types provide standardized, type-safe constants for use throughout the Jack framework, ensuring consistency and reducing magic strings in your code while providing excellent IntelliSense support in TypeScript-enabled editors.
