# MouseStore

A store for managing mouse interactions and tracking across the Jack framework. MouseStore handles mouse positioning, drag and drop operations, click tracking, and global mouse state management for card interactions.

## Import

```javascript
import { MouseStore } from '@priolo/jack'
import { useStore } from '@priolo/jon'
```

## Overview

MouseStore provides centralized mouse interaction management for the Jack framework. It tracks mouse position, handles drag and drop operations, manages click states, and coordinates mouse-based interactions between cards and components.

## State Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `{x: number, y: number}` | `{x: 0, y: 0}` | Current mouse cursor position |
| `isDragging` | `boolean` | `false` | Whether a drag operation is in progress |
| `dragData` | `object \| null` | `null` | Data being dragged during drag operations |
| `dragElement` | `Element \| null` | `null` | The element being dragged |
| `dropTarget` | `Element \| null` | `null` | Current valid drop target under cursor |
| `dragOffset` | `{x: number, y: number}` | `{x: 0, y: 0}` | Offset from cursor to drag element origin |
| `clickState` | `'idle' \| 'down' \| 'dragging'` | `'idle'` | Current click/drag state |
| `lastClick` | `{x: number, y: number, timestamp: number} \| null` | `null` | Last click position and timing |
| `dragThreshold` | `number` | `5` | Minimum pixels to move before starting drag |
| `doubleClickThreshold` | `number` | `300` | Maximum time between clicks for double-click |
| `isOverDropZone` | `boolean` | `false` | Whether cursor is over a valid drop zone |

## Methods

### Position Tracking

#### `updatePosition(x, y)`
Updates the current mouse cursor position.

```javascript
mouseStore.updatePosition(event.clientX, event.clientY)
```

**Parameters:**
- `x` (number): X coordinate in viewport pixels
- `y` (number): Y coordinate in viewport pixels

#### `getRelativePosition(element)`
Gets mouse position relative to a specific element.

```javascript
const relativePos = mouseStore.getRelativePosition(cardElement)
// Returns: {x: number, y: number}
```

### Drag and Drop

#### `startDrag(element, data, options)`
Initiates a drag operation.

```javascript
mouseStore.startDrag(cardElement, { cardId: 'card-1', type: 'card' }, {
  dragImage: customDragImage,
  offset: { x: 10, y: 10 }
})
```

**Parameters:**
- `element` (Element): The element being dragged
- `data` (object): Data to carry with the drag operation
- `options` (object, optional): Drag configuration
  - `dragImage` (Element): Custom drag preview image
  - `offset` (`{x, y}`): Cursor offset from element origin
  - `allowedDropZones` (string[]): CSS selectors for valid drop zones

#### `updateDrag(x, y)`
Updates drag position during a drag operation.

```javascript
mouseStore.updateDrag(event.clientX, event.clientY)
```

#### `endDrag(dropTarget?)`
Ends the current drag operation.

```javascript
mouseStore.endDrag(dropTargetElement)
```

**Parameters:**
- `dropTarget` (Element, optional): Element where the drop occurred

#### `cancelDrag()`
Cancels the current drag operation without dropping.

```javascript
mouseStore.cancelDrag()
```

### Click Handling

#### `handleMouseDown(x, y, element)`
Handles mouse down events for click tracking.

```javascript
mouseStore.handleMouseDown(event.clientX, event.clientY, event.target)
```

#### `handleMouseUp(x, y, element)`
Handles mouse up events and detects clicks/double-clicks.

```javascript
mouseStore.handleMouseUp(event.clientX, event.clientY, event.target)
```

#### `isDoubleClick(x, y, timestamp)`
Checks if a click qualifies as a double-click.

```javascript
const isDouble = mouseStore.isDoubleClick(x, y, Date.now())
```

### Drop Zone Management

#### `registerDropZone(element, config)`
Registers an element as a valid drop zone.

```javascript
mouseStore.registerDropZone(deckElement, {
  accepts: ['card', 'widget'],
  onDragEnter: (dragData) => console.log('Drag entered'),
  onDragLeave: () => console.log('Drag left'),
  onDrop: (dragData, position) => console.log('Dropped', dragData)
})
```

**Parameters:**
- `element` (Element): The drop zone element
- `config` (object): Drop zone configuration
  - `accepts` (string[]): Types of drag data this zone accepts
  - `onDragEnter` (function): Called when drag enters zone
  - `onDragLeave` (function): Called when drag leaves zone
  - `onDrop` (function): Called when drop occurs in zone

#### `unregisterDropZone(element)`
Removes a drop zone registration.

```javascript
mouseStore.unregisterDropZone(deckElement)
```

#### `getDropZoneAt(x, y)`
Gets the drop zone element at specific coordinates.

```javascript
const dropZone = mouseStore.getDropZoneAt(event.clientX, event.clientY)
```

## Usage Examples

### Basic Mouse Tracking

```javascript
import { MouseStore } from '@priolo/jack'
import { useStore } from '@priolo/jon'

const MyComponent = () => {
  const mouseState = useStore(MouseStore)
  
  return (
    <div>
      <p>Mouse Position: {mouseState.position.x}, {mouseState.position.y}</p>
      <p>Is Dragging: {mouseState.isDragging ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

### Implementing Drag and Drop

```javascript
import { MouseStore } from '@priolo/jack'

const DraggableCard = ({ children, cardData }) => {
  const handleMouseDown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const offset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
    
    MouseStore.startDrag(event.currentTarget, cardData, { offset })
  }
  
  return (
    <div 
      className="draggable-card"
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  )
}
```

### Creating a Drop Zone

```javascript
import { MouseStore } from '@priolo/jack'
import { useEffect, useRef } from 'react'

const DropZone = ({ onDrop, accepts = ['card'] }) => {
  const dropRef = useRef()
  
  useEffect(() => {
    const element = dropRef.current
    if (!element) return
    
    MouseStore.registerDropZone(element, {
      accepts,
      onDrop: (dragData, position) => {
        onDrop(dragData, position)
      }
    })
    
    return () => MouseStore.unregisterDropZone(element)
  }, [onDrop, accepts])
  
  return (
    <div 
      ref={dropRef}
      className="drop-zone"
    >
      Drop cards here
    </div>
  )
}
```

### Global Mouse Event Handling

```javascript
import { MouseStore } from '@priolo/jack'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    const handleMouseMove = (event) => {
      MouseStore.updatePosition(event.clientX, event.clientY)
      
      if (MouseStore.state.isDragging) {
        MouseStore.updateDrag(event.clientX, event.clientY)
      }
    }
    
    const handleMouseUp = (event) => {
      if (MouseStore.state.isDragging) {
        const dropTarget = MouseStore.getDropZoneAt(
          event.clientX, 
          event.clientY
        )
        MouseStore.endDrag(dropTarget)
      }
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  
  return <div>Your app content</div>
}
```

## Integration with Cards

### Card Dragging

```javascript
import { MouseStore, ViewStore } from '@priolo/jack'

const DraggableCard = ({ store }) => {
  const viewState = useStore(store)
  const mouseState = useStore(MouseStore)
  
  const handleDragStart = (event) => {
    MouseStore.startDrag(event.currentTarget, {
      type: 'card',
      cardId: viewState.id,
      store: store
    })
  }
  
  return (
    <div 
      className="card"
      style={{
        position: 'absolute',
        left: viewState.pos.x,
        top: viewState.pos.y,
        opacity: mouseState.dragElement === event.currentTarget ? 0.5 : 1
      }}
      onMouseDown={handleDragStart}
    >
      Card Content
    </div>
  )
}
```

### Deck Drop Handling

```javascript
import { MouseStore, CardsStore } from '@priolo/jack'

const Deck = ({ cardsStore }) => {
  const deckRef = useRef()
  
  useEffect(() => {
    MouseStore.registerDropZone(deckRef.current, {
      accepts: ['card'],
      onDrop: (dragData, position) => {
        if (dragData.type === 'card') {
          // Move card to new position
          dragData.store.setPosition(position.x, position.y)
          
          // Add to this deck if from another deck
          if (dragData.store.state.group !== cardsStore) {
            cardsStore.add({ view: dragData.store })
          }
        }
      }
    })
  }, [cardsStore])
  
  return <div ref={deckRef} className="deck">...</div>
}
```

## Event Handling

### Mouse Events

```javascript
// Listen for drag start
MouseStore.on('drag:start', (dragData, element) => {
  console.log('Drag started:', dragData)
})

// Listen for drag end
MouseStore.on('drag:end', (dragData, dropTarget) => {
  console.log('Drag ended:', dragData, dropTarget)
})

// Listen for position changes
MouseStore.on('position:change', (newPosition) => {
  console.log('Mouse moved to:', newPosition)
})

// Listen for drop zone events
MouseStore.on('dropzone:enter', (zone, dragData) => {
  console.log('Entered drop zone:', zone)
})

MouseStore.on('dropzone:leave', (zone) => {
  console.log('Left drop zone:', zone)
})
```

### Click Events

```javascript
// Listen for clicks
MouseStore.on('click', (position, element) => {
  console.log('Clicked at:', position)
})

// Listen for double-clicks
MouseStore.on('doubleclick', (position, element) => {
  console.log('Double-clicked at:', position)
})
```

## CSS Classes

MouseStore automatically applies CSS classes to track interaction states:

```css
/* Applied to body during drag operations */
.mouse-dragging {
  cursor: grabbing;
  user-select: none;
}

/* Applied to valid drop zones during drag */
.drop-zone-active {
  border: 2px dashed #007acc;
  background-color: rgba(0, 122, 204, 0.1);
}

/* Applied to drop zones when drag is over them */
.drop-zone-hover {
  border-color: #005a9e;
  background-color: rgba(0, 122, 204, 0.2);
}

/* Applied to elements being dragged */
.element-dragging {
  opacity: 0.5;
  transform: scale(0.95);
  z-index: 1000;
}
```

## Best Practices

### Performance Optimization

```javascript
// Throttle mouse position updates
import { throttle } from 'lodash'

const throttledUpdatePosition = throttle(
  (x, y) => MouseStore.updatePosition(x, y),
  16 // ~60fps
)

document.addEventListener('mousemove', (event) => {
  throttledUpdatePosition(event.clientX, event.clientY)
})
```

### Memory Management

```javascript
// Always clean up drop zone registrations
useEffect(() => {
  const element = dropRef.current
  MouseStore.registerDropZone(element, config)
  
  return () => {
    MouseStore.unregisterDropZone(element)
  }
}, [])
```

### Accessibility

```javascript
// Support keyboard-based drag and drop
const handleKeyDown = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    // Start keyboard drag mode
    MouseStore.startKeyboardDrag(element, data)
  }
  
  if (event.key === 'Escape') {
    // Cancel any active drag
    MouseStore.cancelDrag()
  }
}
```

## Common Patterns

### Drag Preview

```javascript
const createDragPreview = (element, dragData) => {
  const preview = element.cloneNode(true)
  preview.style.position = 'absolute'
  preview.style.pointerEvents = 'none'
  preview.style.opacity = '0.8'
  preview.style.transform = 'scale(0.9)'
  
  document.body.appendChild(preview)
  return preview
}

MouseStore.startDrag(element, data, {
  dragImage: createDragPreview(element, data)
})
```

### Multi-Select Drag

```javascript
const handleMultiSelectDrag = (selectedCards) => {
  MouseStore.startDrag(null, {
    type: 'multi-card',
    cards: selectedCards,
    count: selectedCards.length
  })
}
```

### Snap to Grid

```javascript
const snapToGrid = (x, y, gridSize = 20) => ({
  x: Math.round(x / gridSize) * gridSize,
  y: Math.round(y / gridSize) * gridSize
})

MouseStore.on('drag:end', (dragData, dropTarget) => {
  const snappedPosition = snapToGrid(
    MouseStore.state.position.x,
    MouseStore.state.position.y
  )
  
  if (dragData.store) {
    dragData.store.setPosition(snappedPosition.x, snappedPosition.y)
  }
})
```

## TypeScript Support

```typescript
interface MouseState {
  position: { x: number; y: number }
  isDragging: boolean
  dragData: any | null
  dragElement: Element | null
  dropTarget: Element | null
  dragOffset: { x: number; y: number }
  clickState: 'idle' | 'down' | 'dragging'
  lastClick: { x: number; y: number; timestamp: number } | null
  dragThreshold: number
  doubleClickThreshold: number
  isOverDropZone: boolean
}

interface DragData {
  type: string
  [key: string]: any
}

interface DropZoneConfig {
  accepts: string[]
  onDragEnter?: (dragData: DragData) => void
  onDragLeave?: () => void
  onDrop?: (dragData: DragData, position: { x: number; y: number }) => void
}

declare class MouseStore {
  state: MouseState
  updatePosition(x: number, y: number): void
  startDrag(element: Element, data: DragData, options?: any): void
  endDrag(dropTarget?: Element): void
  registerDropZone(element: Element, config: DropZoneConfig): void
  // ... other methods
}
```

MouseStore provides the foundation for rich mouse-based interactions in the Jack framework, enabling intuitive drag and drop, precise positioning, and responsive user interactions across all card components.
