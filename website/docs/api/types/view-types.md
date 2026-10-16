# ViewTypes

Type definitions for view-related functionality in the Jack framework. This module contains all the TypeScript interfaces, types, and enumerations used for card view management, positioning, sizing, and state handling.

## Core Interfaces

### ViewState
Represents the complete state of a card view.

```typescript
interface ViewState {
  // Identity
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode | string | null
  type: string

  // Position and Layout
  position: Position
  size: Size
  minSize: Size
  maxSize: Size
  zIndex: number

  // Visibility and State
  visible: boolean
  minimized: boolean
  maximized: boolean
  focused: boolean
  selected: boolean
  dragging: boolean
  resizing: boolean

  // Relationships
  group: CardsStore | null
  linkedTo: ViewStore | null
  links: ViewStore[]

  // Metadata
  metadata: Record<string, any>
  saveState: boolean
  lastModified: Date
  createdAt: Date
}
```

### Position
Defines 2D coordinates for card positioning.

```typescript
interface Position {
  x: number
  y: number
}

// Alternative with optional coordinates
interface PartialPosition {
  x?: number
  y?: number
}

// Position with constraints
interface ConstrainedPosition extends Position {
  minX?: number
  maxX?: number
  minY?: number
  maxY?: number
}
```

### Size
Defines dimensions for card sizing.

```typescript
interface Size {
  width: number
  height: number
}

// Size with optional dimensions
interface PartialSize {
  width?: number
  height?: number
}

// Size with constraints
interface SizeConstraints {
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
}
```

### ViewStore Interface
The complete ViewStore interface with all methods and state.

```typescript
interface ViewStore extends Store {
  state: ViewState

  // Position Methods
  setPosition(position: Position): void
  setPosition(x: number, y: number): void
  getPosition(): Position
  
  // Size Methods
  setSize(size: Size): void
  setSize(width: number, height: number): void
  getSize(): Size
  
  // Content Methods
  setTitle(title: string): void
  setSubtitle(subtitle: string): void
  setIcon(icon: React.ReactNode | string | null): void
  
  // State Methods
  show(): void
  hide(): void
  minimize(): void
  maximize(): void
  restore(): void
  focus(): void
  blur(): void
  select(): void
  deselect(): void
  
  // Lifecycle Methods
  close(): void
  save(): void
  restore(): void
  
  // Event Methods
  on(event: string, handler: Function): void
  off(event: string, handler: Function): void
  emit(event: string, ...args: any[]): void
}
```

## View Configuration Types

### ViewSetupOptions
Configuration options for creating a new view.

```typescript
interface ViewSetupOptions {
  // Initial state
  state?: Partial<ViewState>
  
  // Custom mutators
  mutators?: Record<string, (...args: any[]) => Partial<ViewState>>
  
  // Custom actions
  actions?: Record<string, Function>
  
  // Event handlers
  events?: Record<string, Function>
  
  // Lifecycle hooks
  hooks?: {
    onCreated?: (store: ViewStore) => void
    onDestroyed?: (store: ViewStore) => void
    onFocused?: (store: ViewStore) => void
    onBlurred?: (store: ViewStore) => void
  }
}
```

### ViewOptions
Options passed when creating or configuring a view.

```typescript
interface ViewOptions {
  id?: string
  title?: string
  position?: Position
  size?: Size
  visible?: boolean
  minimized?: boolean
  type?: string
  metadata?: Record<string, any>
}
```

## Animation and Transition Types

### AnimationConfig
Configuration for view animations.

```typescript
interface AnimationConfig {
  duration: number
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
  delay?: number
  onComplete?: () => void
  onStart?: () => void
}

// Specific animation types
interface PositionAnimation extends AnimationConfig {
  from: Position
  to: Position
}

interface SizeAnimation extends AnimationConfig {
  from: Size
  to: Size
}

interface OpacityAnimation extends AnimationConfig {
  from: number
  to: number
}
```

### TransitionState
Represents the current state of a view transition.

```typescript
interface TransitionState {
  isAnimating: boolean
  animationType: 'position' | 'size' | 'opacity' | 'custom'
  progress: number
  startTime: number
  duration: number
}
```

## Drag and Drop Types

### DragState
State information during drag operations.

```typescript
interface DragState {
  isDragging: boolean
  dragType: 'move' | 'resize' | 'custom'
  startPosition: Position
  currentPosition: Position
  offset: Position
  constraints?: {
    minX?: number
    maxX?: number
    minY?: number
    maxY?: number
  }
}
```

### DropTarget
Defines a valid drop target for drag operations.

```typescript
interface DropTarget {
  id: string
  element: HTMLElement
  accepts: string[]
  bounds: DOMRect
  onDrop: (dragData: any, position: Position) => void
  onDragEnter?: (dragData: any) => void
  onDragLeave?: () => void
}
```

## Focus and Navigation Types

### FocusState
Focus-related state for views.

```typescript
interface FocusState {
  hasFocus: boolean
  canFocus: boolean
  focusOrder: number
  tabIndex: number
  keyboardNavigation: boolean
}
```

### NavigationDirection
Directions for keyboard navigation.

```typescript
type NavigationDirection = 'up' | 'down' | 'left' | 'right' | 'next' | 'previous'
```

### KeyboardEvent
Enhanced keyboard event with view context.

```typescript
interface ViewKeyboardEvent extends KeyboardEvent {
  view: ViewStore
  direction?: NavigationDirection
  handled: boolean
}
```

## Event Types

### ViewEvent
Base interface for view events.

```typescript
interface ViewEvent {
  type: string
  view: ViewStore
  timestamp: Date
  source: 'user' | 'system' | 'api'
}
```

### Specific Event Types

```typescript
interface ViewPositionEvent extends ViewEvent {
  type: 'position:change'
  oldPosition: Position
  newPosition: Position
}

interface ViewSizeEvent extends ViewEvent {
  type: 'size:change'
  oldSize: Size
  newSize: Size
}

interface ViewFocusEvent extends ViewEvent {
  type: 'focus' | 'blur'
  relatedView?: ViewStore
}

interface ViewStateEvent extends ViewEvent {
  type: 'show' | 'hide' | 'minimize' | 'maximize' | 'close'
  reason?: string
}
```

## Utility Types

### ViewSelector
Function type for selecting views.

```typescript
type ViewSelector = (view: ViewStore) => boolean

// Common selectors
type ViewTypeSelector = (type: string) => ViewSelector
type ViewPositionSelector = (bounds: DOMRect) => ViewSelector
type ViewStateSelector = (statePredicate: (state: ViewState) => boolean) => ViewSelector
```

### ViewComparator
Function type for comparing views.

```typescript
type ViewComparator = (a: ViewStore, b: ViewStore) => number

// Common comparators
const byPosition: ViewComparator = (a, b) => 
  a.state.position.x - b.state.position.x

const byZIndex: ViewComparator = (a, b) => 
  a.state.zIndex - b.state.zIndex

const byCreationTime: ViewComparator = (a, b) => 
  a.state.createdAt.getTime() - b.state.createdAt.getTime()
```

### ViewTransform
Function type for transforming view properties.

```typescript
type ViewTransform<T> = (view: ViewStore) => T

// Common transforms
const toPosition: ViewTransform<Position> = (view) => view.state.position
const toSize: ViewTransform<Size> = (view) => view.state.size
const toTitle: ViewTransform<string> = (view) => view.state.title
```

## Constraints and Validation Types

### ViewConstraints
Constraints that can be applied to views.

```typescript
interface ViewConstraints {
  position?: {
    minX?: number
    maxX?: number
    minY?: number
    maxY?: number
    snapToGrid?: number
    containment?: 'parent' | 'viewport' | DOMRect
  }
  
  size?: {
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    aspectRatio?: number
    snapToGrid?: number
  }
  
  behavior?: {
    draggable?: boolean
    resizable?: boolean
    focusable?: boolean
    minimizable?: boolean
    maximizable?: boolean
    closable?: boolean
  }
}
```

### ValidationResult
Result of view validation operations.

```typescript
interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

// Validator function type
type ViewValidator = (view: ViewStore) => ValidationResult
```

## Layout Types

### LayoutEngine
Interface for layout calculation engines.

```typescript
interface LayoutEngine {
  name: string
  calculate(views: ViewStore[], container: DOMRect): LayoutResult
  update(views: ViewStore[], changes: ViewStore[]): LayoutResult
  constraints?: ViewConstraints
}

interface LayoutResult {
  positions: Map<string, Position>
  success: boolean
  conflicts: string[]
  suggestions?: Map<string, Position>
}
```

### GridLayout
Configuration for grid-based layouts.

```typescript
interface GridLayoutConfig {
  columns: number
  rows?: number
  cellWidth: number
  cellHeight: number
  gap: number
  padding: Position
  autoFlow: 'row' | 'column'
}
```

## Persistence Types

### ViewSerializedState
Serializable representation of view state.

```typescript
interface ViewSerializedState {
  id: string
  title: string
  subtitle: string
  position: Position
  size: Size
  visible: boolean
  minimized: boolean
  maximized: boolean
  type: string
  metadata: Record<string, any>
  customState?: Record<string, any>
  version: number
  timestamp: string
}
```

### SerializationOptions
Options for view serialization.

```typescript
interface SerializationOptions {
  includeMetadata?: boolean
  includeCustomState?: boolean
  includeLinkedViews?: boolean
  compress?: boolean
  version?: number
}
```

## Hook Types

### ViewHook
React hook return type for view state.

```typescript
interface ViewHook {
  state: ViewState
  actions: ViewActions
  refs: ViewRefs
  events: ViewEventEmitter
}

interface ViewActions {
  setPosition: (position: Position) => void
  setSize: (size: Size) => void
  focus: () => void
  close: () => void
  minimize: () => void
  maximize: () => void
  // ... other actions
}

interface ViewRefs {
  containerRef: React.RefObject<HTMLDivElement>
  contentRef: React.RefObject<HTMLDivElement>
  headerRef: React.RefObject<HTMLDivElement>
}

interface ViewEventEmitter {
  on: (event: string, handler: Function) => void
  off: (event: string, handler: Function) => void
  emit: (event: string, ...args: any[]) => void
}
```

## Generic Types

### Typed View Store
Generic interface for typed view stores.

```typescript
interface TypedViewStore<T = any> extends ViewStore {
  state: ViewState & {
    data: T
    type: string
  }
  
  setData: (data: T) => void
  getData: () => T
}

// Usage example
interface UserData {
  id: string
  name: string
  email: string
}

type UserViewStore = TypedViewStore<UserData>
```

### View Factory
Factory function type for creating views.

```typescript
type ViewFactory<T extends ViewStore = ViewStore> = (
  options?: ViewOptions
) => T

// Generic factory with custom state
type TypedViewFactory<TState = any, TStore extends ViewStore = ViewStore> = (
  initialState?: TState,
  options?: ViewOptions
) => TStore & { state: ViewState & TState }
```

## Union Types

### ViewStateType
Union of all possible view states.

```typescript
type ViewStateType = 
  | 'hidden'
  | 'visible'
  | 'minimized'
  | 'maximized'
  | 'focused'
  | 'dragging'
  | 'resizing'
  | 'animating'
```

### ViewEventType
Union of all view event types.

```typescript
type ViewEventType =
  | 'created'
  | 'destroyed'
  | 'show'
  | 'hide'
  | 'focus'
  | 'blur'
  | 'minimize'
  | 'maximize'
  | 'restore'
  | 'position:change'
  | 'size:change'
  | 'title:change'
  | 'close'
  | 'drag:start'
  | 'drag:end'
  | 'resize:start'
  | 'resize:end'
```

## Usage Examples

### Creating Typed Views

```typescript
// Define custom view type
interface TaskData {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

// Create typed view store
const createTaskView = (task: TaskData): TypedViewStore<TaskData> => {
  const setup = mixStores(viewSetup, {
    state: {
      data: task,
      type: 'task',
      title: task.title
    },
    mutators: {
      setData: (data: TaskData) => ({ data, title: data.title }),
      toggleCompleted: () => (state) => ({
        data: { ...state.data, completed: !state.data.completed }
      })
    }
  })
  
  return createStore(setup) as TypedViewStore<TaskData>
}
```

### Using View Constraints

```typescript
// Define constraints for a card type
const cardConstraints: ViewConstraints = {
  position: {
    minX: 0,
    minY: 0,
    snapToGrid: 20,
    containment: 'parent'
  },
  size: {
    minWidth: 200,
    minHeight: 150,
    maxWidth: 800,
    aspectRatio: 16/9
  },
  behavior: {
    draggable: true,
    resizable: true,
    minimizable: true,
    closable: true
  }
}

// Apply constraints to view
const constrainedView = createView({
  title: 'Constrained Card',
  constraints: cardConstraints
})
```

### Implementing Custom Layout

```typescript
// Create custom layout engine
const tileLayoutEngine: LayoutEngine = {
  name: 'tile',
  
  calculate(views: ViewStore[], container: DOMRect): LayoutResult {
    const positions = new Map<string, Position>()
    const columns = Math.floor(container.width / 300)
    
    views.forEach((view, index) => {
      const row = Math.floor(index / columns)
      const col = index % columns
      
      positions.set(view.state.id, {
        x: col * 300,
        y: row * 200
      })
    })
    
    return {
      positions,
      success: true,
      conflicts: []
    }
  },
  
  update(views: ViewStore[], changes: ViewStore[]): LayoutResult {
    // Recalculate layout for changed views
    return this.calculate(views, getCurrentContainer())
  }
}
```

These type definitions provide a comprehensive foundation for working with views in the Jack framework, ensuring type safety and clear interfaces for all view-related operations.
