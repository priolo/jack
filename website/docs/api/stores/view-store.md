# ViewStore

The base store for managing individual card views in the Jack framework. ViewStore provides the fundamental state and functionality that all card components require for positioning, sizing, focus management, and lifecycle operations.

## Import

```javascript
import { viewSetup, ViewStore } from '@priolo/jack'
import { createStore, mixStores } from '@priolo/jon'
```

## Creating a ViewStore

### Basic Setup

```javascript
// Create a basic ViewStore
const basicViewStore = createStore(viewSetup)

// Create a custom ViewStore with additional properties
const customSetup = {
  state: {
    customData: null,
    type: 'my-card-type'
  },
  mutators: {
    setCustomData: (data) => ({ customData: data })
  }
}

const customViewStore = createStore(mixStores(viewSetup, customSetup))
```

### TypeScript Usage

```typescript
interface CustomState {
  customData: any
  type: string
}

interface CustomMutators {
  setCustomData: (data: any) => Partial<CustomState>
}

type CustomViewStore = ViewStore & {
  state: ViewStore['state'] & CustomState
} & CustomMutators

const customViewStore = createStore(mixStores(viewSetup, customSetup)) as CustomViewStore
```

## State Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | `generated` | Unique identifier for the view |
| `title` | `string` | `''` | Display title of the card |
| `subtitle` | `string` | `''` | Subtitle text |
| `icon` | `React.ReactNode \| string` | `null` | Icon for the card header |
| `position` | `Position` | `{ x: 0, y: 0 }` | Card position coordinates |
| `size` | `Size` | `{ width: 300, height: 200 }` | Card dimensions |
| `minSize` | `Size` | `{ width: 200, height: 150 }` | Minimum allowed size |
| `maxSize` | `Size` | `{ width: 800, height: 600 }` | Maximum allowed size |
| `zIndex` | `number` | `1` | Stacking order |
| `visible` | `boolean` | `true` | Visibility state |
| `minimized` | `boolean` | `false` | Minimized/iconified state |
| `maximized` | `boolean` | `false` | Maximized state |
| `focused` | `boolean` | `false` | Focus state |
| `selected` | `boolean` | `false` | Selection state |
| `dragging` | `boolean` | `false` | Currently being dragged |
| `resizing` | `boolean` | `false` | Currently being resized |
| `group` | `CardsStore` | `null` | Parent cards group/deck |
| `linkedTo` | `ViewStore` | `null` | Parent view for linked cards |
| `links` | `ViewStore[]` | `[]` | Child linked views |
| `metadata` | `Record<string, any>` | `{}` | Custom metadata |
| `saveState` | `boolean` | `true` | Whether to save state automatically |

## Mutators (Actions)

### Basic Operations

```javascript
// Set card title and subtitle
viewStore.setTitle('My Card Title')
viewStore.setSubtitle('Card subtitle')
viewStore.setIcon(<MyIcon />)

// Position and size management
viewStore.setPosition({ x: 100, y: 200 })
viewStore.setSize({ width: 400, height: 300 })
viewStore.move(50, 30) // Relative movement
viewStore.resize(450, 350) // Resize to specific dimensions

// Visibility states
viewStore.show()
viewStore.hide()
viewStore.minimize()
viewStore.maximize()
viewStore.restore() // Return to normal size

// Focus management
viewStore.focus()
viewStore.blur()
viewStore.select()
viewStore.deselect()

// Lifecycle
viewStore.close() // Remove from parent group
viewStore.destroy() // Complete cleanup
```

### Advanced Operations

```javascript
// Link management
viewStore.addLink(childViewStore)
viewStore.removeLink(childViewStore)
viewStore.clearLinks()

// State management
viewStore.saveCurrentState()
viewStore.restoreState(savedState)
viewStore.resetToDefaults()

// Group operations
viewStore.bringToFront()
viewStore.sendToBack()
viewStore.centerInGroup()

// Custom metadata
viewStore.setMetadata('key', value)
viewStore.getMetadata('key')
viewStore.clearMetadata()
```

## Usage Examples

### Basic Card Implementation

```jsx
import { FrameworkCard, Header, viewSetup } from '@priolo/jack'
import { createStore, mixStores, useStore } from '@priolo/jon'

// Define custom card setup
const myCardSetup = {
  state: {
    content: '',
    type: 'my-card'
  },
  mutators: {
    setContent: (content) => ({ content })
  }
}

// Create mixed setup
const cardSetup = mixStores(viewSetup, myCardSetup)

// Card component
function MyCard({ store }) {
  const state = useStore(store)
  
  return (
    <FrameworkCard store={store}>
      <Header store={store} />
      <div style={{ padding: 16 }}>
        <input
          value={state.content}
          onChange={(e) => store.setContent(e.target.value)}
          placeholder="Enter content..."
        />
      </div>
    </FrameworkCard>
  )
}

// Usage
const cardStore = createStore(cardSetup)
cardStore.setTitle('My Custom Card')
cardStore.setPosition({ x: 100, y: 100 })
```

### Advanced Card with State Management

```jsx
const advancedCardSetup = {
  state: {
    data: [],
    loading: false,
    error: null,
    type: 'data-card'
  },
  
  mutators: {
    setData: (data) => ({ data, loading: false, error: null }),
    setLoading: (loading) => ({ loading }),
    setError: (error) => ({ error, loading: false }),
  },
  
  actions: {
    async loadData() {
      this.setLoading(true)
      try {
        const response = await fetch('/api/data')
        const data = await response.json()
        this.setData(data)
      } catch (error) {
        this.setError(error.message)
      }
    }
  }
}

const dataCardSetup = mixStores(viewSetup, advancedCardSetup)

function DataCard({ store }) {
  const state = useStore(store)
  
  React.useEffect(() => {
    store.loadData()
  }, [])
  
  return (
    <FrameworkCard store={store}>
      <Header 
        store={store} 
        actions={[
          {
            icon: <RefreshIcon />,
            onClick: () => store.loadData(),
            tooltip: 'Refresh data'
          }
        ]}
      />
      <div style={{ padding: 16 }}>
        {state.loading && <div>Loading...</div>}
        {state.error && <div className="error">{state.error}</div>}
        {state.data.length > 0 && (
          <ul>
            {state.data.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </FrameworkCard>
  )
}
```

### Linked Cards Example

```jsx
// Master card setup
const masterCardSetup = mixStores(viewSetup, {
  state: {
    items: [],
    type: 'master-list'
  },
  mutators: {
    setItems: (items) => ({ items }),
    selectItem: (item) => ({ selectedItem: item })
  }
})

// Detail card setup
const detailCardSetup = mixStores(viewSetup, {
  state: {
    item: null,
    type: 'item-detail'
  },
  mutators: {
    setItem: (item) => ({ item })
  }
})

function MasterCard({ store }) {
  const state = useStore(store)
  
  const handleItemClick = (item) => {
    // Create detail card linked to this master card
    const detailStore = createStore(detailCardSetup)
    detailStore.setItem(item)
    detailStore.setTitle(`Details: ${item.name}`)
    
    // Add as linked card
    const deck = store.state.group
    deck.addLink({
      parent: store,
      view: detailStore,
      anim: true
    })
  }
  
  return (
    <FrameworkCard store={store}>
      <Header store={store} />
      <div style={{ padding: 16 }}>
        {state.items.map(item => (
          <div 
            key={item.id}
            onClick={() => handleItemClick(item)}
            style={{ 
              padding: 8, 
              cursor: 'pointer',
              borderBottom: '1px solid #eee'
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </FrameworkCard>
  )
}
```

## Event Handling

### State Change Events

```javascript
// Listen for state changes
viewStore.on('stateChange', (newState, oldState) => {
  console.log('State changed:', { newState, oldState })
})

// Listen for specific property changes
viewStore.on('position:change', (newPosition) => {
  console.log('Position changed:', newPosition)
})

viewStore.on('size:change', (newSize) => {
  console.log('Size changed:', newSize)
})

// Lifecycle events
viewStore.on('focus', () => {
  console.log('Card focused')
})

viewStore.on('blur', () => {
  console.log('Card lost focus')
})

viewStore.on('close', () => {
  console.log('Card closing')
})
```

### Custom Event Handling

```javascript
const customCardSetup = mixStores(viewSetup, {
  state: {
    customProperty: null
  },
  
  mutators: {
    setCustomProperty: (value) => {
      // Emit custom event
      this.emit('customProperty:change', value)
      return { customProperty: value }
    }
  }
})

// Usage
const cardStore = createStore(customCardSetup)
cardStore.on('customProperty:change', (value) => {
  console.log('Custom property changed:', value)
})
```

## Persistence and Serialization

### State Serialization

```javascript
// Save current state
const savedState = viewStore.serialize()

// Restore state
viewStore.deserialize(savedState)

// Save to localStorage
const saveToStorage = () => {
  const state = viewStore.serialize()
  localStorage.setItem(`card-${viewStore.state.id}`, JSON.stringify(state))
}

// Load from localStorage
const loadFromStorage = (cardId) => {
  const saved = localStorage.getItem(`card-${cardId}`)
  if (saved) {
    const state = JSON.parse(saved)
    viewStore.deserialize(state)
  }
}
```

### Selective State Saving

```javascript
// Custom serialization excluding sensitive data
const customSerialize = () => {
  const { password, ...safeState } = viewStore.state
  return safeState
}

// Save only specific properties
const minimalState = {
  position: viewStore.state.position,
  size: viewStore.state.size,
  title: viewStore.state.title
}
```

## Best Practices

### Store Composition

```javascript
// Good: Modular store composition
const baseFeatures = {
  state: {
    feature1: false,
    feature2: null
  },
  mutators: {
    toggleFeature1: () => ({ feature1: !this.state.feature1 }),
    setFeature2: (value) => ({ feature2: value })
  }
}

const advancedFeatures = {
  state: {
    advancedMode: false
  },
  mutators: {
    toggleAdvanced: () => ({ advancedMode: !this.state.advancedMode })
  }
}

// Compose multiple feature sets
const fullSetup = mixStores(viewSetup, baseFeatures, advancedFeatures)
```

### Memory Management

```javascript
// Proper cleanup
const cleanupCard = (store) => {
  // Remove event listeners
  store.off('stateChange')
  
  // Clear links to prevent memory leaks
  store.clearLinks()
  
  // Remove from parent group
  if (store.state.group) {
    store.state.group.remove(store)
  }
  
  // Final cleanup
  store.destroy()
}

// Auto cleanup on component unmount
React.useEffect(() => {
  return () => {
    cleanupCard(viewStore)
  }
}, [viewStore])
```

### Performance Optimization

```javascript
// Use memoization for expensive operations
const expensiveCardSetup = mixStores(viewSetup, {
  state: {
    complexData: null,
    computedValue: null
  },
  
  mutators: {
    setComplexData: function(data) {
      // Compute expensive value only when data changes
      const computedValue = this.computeExpensiveValue(data)
      return { complexData: data, computedValue }
    }
  },
  
  methods: {
    computeExpensiveValue: (data) => {
      // Expensive computation here
      return data ? processComplexData(data) : null
    }
  }
})
```

## TypeScript Support

### Type Definitions

```typescript
interface Position {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}

interface ViewState {
  id: string
  title: string
  subtitle: string
  position: Position
  size: Size
  visible: boolean
  focused: boolean
  // ... other properties
}

interface ViewMutators {
  setTitle: (title: string) => Partial<ViewState>
  setPosition: (position: Position) => Partial<ViewState>
  setSize: (size: Size) => Partial<ViewState>
  focus: () => Partial<ViewState>
  blur: () => Partial<ViewState>
  // ... other mutators
}

interface ViewStore extends ViewMutators {
  state: ViewState
}
```

### Custom Type Extensions

```typescript
interface CustomCardState extends ViewState {
  customData: any
  type: 'my-custom-card'
}

interface CustomCardMutators extends ViewMutators {
  setCustomData: (data: any) => Partial<CustomCardState>
}

interface CustomViewStore extends ViewStore {
  state: CustomCardState
}

type CustomViewStore = ViewStore & CustomCardMutators & {
  state: CustomCardState
}
```
