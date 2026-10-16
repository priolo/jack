# FocusStore

A store for managing focus state and navigation across the Jack framework. FocusStore handles keyboard navigation, focus tracking, and focus-related interactions between cards and components.

## Import

```typescript
import { FocusStore, focusSetup } from "@priolo/jack"
import { createStore } from "@priolo/jon"
```

## Creating a FocusStore

### Basic Setup

```typescript
// Create a focus store instance
const focusStore = createStore(focusSetup) as FocusStore

// Use with global focus management
const App = () => {
  return (
    <FocusProvider store={focusStore}>
      <CardsGroup cardsStore={deckStore} />
    </FocusProvider>
  )
}
```

### With Custom Configuration

```typescript
import { focusSetup } from "@priolo/jack"
import { mixStores } from "@priolo/jon"

const customFocusSetup = mixStores(focusSetup, {
  state: {
    focusMode: "strict" as "strict" | "loose",
    trapFocus: true,
    highlightFocus: true,
    keyboardNavigation: true,
  },
  mutators: {
    setFocusMode: (mode: "strict" | "loose") => ({ focusMode: mode }),
    setTrapFocus: (trap: boolean) => ({ trapFocus: trap }),
    setHighlightFocus: (highlight: boolean) => ({ highlightFocus: highlight }),
    setKeyboardNavigation: (enabled: boolean) => ({ keyboardNavigation: enabled }),
  },
})

const focusStore = createStore(customFocusSetup) as FocusStore
```

## State Properties

| Property | Type | Description |
|----------|------|-------------|
| `currentFocus` | `string \| null` | Currently focused element ID |
| `previousFocus` | `string \| null` | Previously focused element ID |
| `focusHistory` | `string[]` | Stack of focus history |
| `focusableElements` | `string[]` | Array of focusable element IDs |
| `focusMode` | `FocusMode` | Current focus management mode |
| `isNavigating` | `boolean` | Whether keyboard navigation is active |
| `trapFocus` | `boolean` | Whether focus is trapped in container |
| `autoFocus` | `boolean` | Whether to auto-focus new elements |

## Focus Mode Types

```typescript
type FocusMode = 
  | "strict"    // Strict focus management with keyboard trapping
  | "loose"     // Loose focus management allowing external focus
  | "disabled"  // No focus management
```

## Mutators

### Focus Management

#### `setFocus(elementId: string): void`
Sets focus to a specific element.

```typescript
focusStore.setFocus("card-1")
```

#### `clearFocus(): void`
Clears the current focus.

```typescript
focusStore.clearFocus()
```

#### `restoreFocus(): void`
Restores focus to the previously focused element.

```typescript
focusStore.restoreFocus()
```

### Navigation

#### `focusNext(): void`
Moves focus to the next focusable element.

```typescript
focusStore.focusNext()
```

#### `focusPrevious(): void`
Moves focus to the previous focusable element.

```typescript
focusStore.focusPrevious()
```

#### `focusFirst(): void`
Moves focus to the first focusable element.

```typescript
focusStore.focusFirst()
```

#### `focusLast(): void`
Moves focus to the last focusable element.

```typescript
focusStore.focusLast()
```

### Element Registration

#### `registerFocusable(elementId: string): void`
Registers an element as focusable.

```typescript
focusStore.registerFocusable("card-2")
```

#### `unregisterFocusable(elementId: string): void`
Unregisters a focusable element.

```typescript
focusStore.unregisterFocusable("card-2")
```

#### `setFocusableElements(elements: string[]): void`
Sets the complete list of focusable elements.

```typescript
focusStore.setFocusableElements(["card-1", "card-2", "card-3"])
```

### Configuration

#### `setFocusMode(mode: FocusMode): void`
Sets the focus management mode.

```typescript
focusStore.setFocusMode("strict")
```

#### `setTrapFocus(trap: boolean): void`
Enables or disables focus trapping.

```typescript
focusStore.setTrapFocus(true)
```

#### `setAutoFocus(enabled: boolean): void`
Enables or disables auto-focus behavior.

```typescript
focusStore.setAutoFocus(true)
```

## Advanced Usage

### Global Focus Provider

```typescript
import { createContext, useContext } from "react"

const FocusContext = createContext<FocusStore | null>(null)

export const FocusProvider = ({ 
  children, 
  store 
}: { 
  children: React.ReactNode
  store: FocusStore 
}) => {
  return (
    <FocusContext.Provider value={store}>
      {children}
    </FocusContext.Provider>
  )
}

export const useFocus = () => {
  const context = useContext(FocusContext)
  if (!context) {
    throw new Error("useFocus must be used within FocusProvider")
  }
  return context
}
```

### Focusable Card Component

```typescript
const FocusableCard = ({ 
  store, 
  id 
}: { 
  store: ViewStore
  id: string 
}) => {
  const focusStore = useFocus()
  const focusState = useStore(focusStore)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const isFocused = focusState.currentFocus === id
  
  useEffect(() => {
    // Register this card as focusable
    focusStore.registerFocusable(id)
    
    return () => {
      focusStore.unregisterFocusable(id)
    }
  }, [id])
  
  useEffect(() => {
    // Auto-focus if this card is the current focus
    if (isFocused && cardRef.current) {
      cardRef.current.focus()
    }
  }, [isFocused])

  const handleFocus = () => {
    focusStore.setFocus(id)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "Tab":
        if (!e.shiftKey) {
          e.preventDefault()
          focusStore.focusNext()
        }
        break
      case "ArrowLeft":
        if (e.shiftKey && e.key === "Tab") {
          e.preventDefault()
          focusStore.focusPrevious()
        }
        break
      case "Home":
        e.preventDefault()
        focusStore.focusFirst()
        break
      case "End":
        e.preventDefault()
        focusStore.focusLast()
        break
      case "Escape":
        focusStore.clearFocus()
        break
    }
  }

  return (
    <FrameworkCard
      ref={cardRef}
      store={store}
      className={`focusable-card ${isFocused ? "focused" : ""}`}
      tabIndex={isFocused ? 0 : -1}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      aria-selected={isFocused}
    >
      <div className="card-content">
        {/* Card content */}
      </div>
    </FrameworkCard>
  )
}
```

### Keyboard Navigation Hook

```typescript
const useKeyboardNavigation = (focusStore: FocusStore) => {
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Only handle if no input is focused
      if (document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA") {
        return
      }

      switch (e.key) {
        case "ArrowRight":
        case "j": // Vim-style navigation
          e.preventDefault()
          focusStore.focusNext()
          break
        case "ArrowLeft":  
        case "k": // Vim-style navigation
          e.preventDefault()
          focusStore.focusPrevious()
          break
        case "Home":
        case "g":
          e.preventDefault()
          focusStore.focusFirst()
          break
        case "End":
        case "G":
          e.preventDefault()
          focusStore.focusLast()
          break
        case "Escape":
          focusStore.clearFocus()
          break
      }
    }

    document.addEventListener("keydown", handleGlobalKeyDown)
    return () => document.removeEventListener("keydown", handleGlobalKeyDown)
  }, [focusStore])
}
```

### Focus-Aware Cards Group

```typescript
const FocusAwareCardsGroup = ({ 
  cardsStore,
  focusStore,
  Render 
}: {
  cardsStore: CardsStore
  focusStore: FocusStore
  Render: ({ view, isFocused }: { view: ViewStore, isFocused: boolean }) => React.ReactNode
}) => {
  const cardsState = useStore(cardsStore)
  const focusState = useStore(focusStore)
  
  useKeyboardNavigation(focusStore)
  
  useEffect(() => {
    // Update focusable elements when cards change
    const cardIds = cardsState.views.map((_, index) => `card-${index}`)
    focusStore.setFocusableElements(cardIds)
    
    // Auto-focus first card if no focus and auto-focus is enabled
    if (focusState.autoFocus && 
        !focusState.currentFocus && 
        cardIds.length > 0) {
      focusStore.setFocus(cardIds[0])
    }
  }, [cardsState.views.length])

  return (
    <div className="focus-aware-cards-group">
      {cardsState.views.map((view, index) => {
        const cardId = `card-${index}`
        const isFocused = focusState.currentFocus === cardId
        
        return (
          <div key={cardId} className={`card-wrapper ${isFocused ? "focused" : ""}`}>
            {Render({ view, isFocused })}
          </div>
        )
      })}
    </div>
  )
}
```

### Focus Trap Component

```typescript
const FocusTrap = ({ 
  children, 
  focusStore,
  enabled = true 
}: {
  children: React.ReactNode
  focusStore: FocusStore
  enabled?: boolean
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!enabled) return
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      
      const container = containerRef.current
      if (!container) return
      
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (focusableElements.length === 0) return
      
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
    
    document.addEventListener("keydown", handleTabKey)
    return () => document.removeEventListener("keydown", handleTabKey)
  }, [enabled])
  
  return (
    <div ref={containerRef} className="focus-trap">
      {children}
    </div>
  )
}
```

### Dialog Focus Management

```typescript
const FocusableDialog = ({ 
  store, 
  focusStore,
  children 
}: {
  store: ViewStore
  focusStore: FocusStore
  children: React.ReactNode
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<string | null>(null)
  
  useEffect(() => {
    // Save current focus before opening dialog
    previousFocus.current = focusStore.state.currentFocus
    
    // Focus the dialog
    if (dialogRef.current) {
      dialogRef.current.focus()
    }
    
    // Restore focus when dialog closes
    return () => {
      if (previousFocus.current) {
        focusStore.setFocus(previousFocus.current)
      }
    }
  }, [])
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      store.setShow(false)
    }
  }
  
  return (
    <FocusTrap focusStore={focusStore}>
      <Dialog
        ref={dialogRef}
        store={store}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="focusable-dialog"
      >
        {children}
      </Dialog>
    </FocusTrap>
  )
}
```

## Integration with Card Management

### Focus-Aware Card Addition

```typescript
const addCardWithFocus = (
  cardsStore: CardsStore, 
  focusStore: FocusStore, 
  cardSetup: any
) => {
  const newCard = createStore(cardSetup) as ViewStore
  const currentLength = cardsStore.state.views.length
  
  // Add card to deck
  cardsStore.add({ view: newCard, anim: true })
  
  // Focus the new card
  const newCardId = `card-${currentLength}`
  setTimeout(() => {
    focusStore.registerFocusable(newCardId)
    focusStore.setFocus(newCardId)
  }, 100) // Wait for animation
}
```

### Focus Persistence

```typescript
const useFocusPersistence = (focusStore: FocusStore, storageKey: string) => {
  // Save focus state to localStorage
  useEffect(() => {
    const state = focusStore.state
    const focusData = {
      currentFocus: state.currentFocus,
      focusHistory: state.focusHistory,
    }
    localStorage.setItem(storageKey, JSON.stringify(focusData))
  }, [focusStore.state.currentFocus])
  
  // Restore focus state on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        const focusData = JSON.parse(saved)
        if (focusData.currentFocus) {
          focusStore.setFocus(focusData.currentFocus)
        }
      } catch (error) {
        console.warn("Failed to restore focus state:", error)
      }
    }
  }, [])
}
```

## Accessibility Features

### Screen Reader Support

```typescript
const AccessibleCard = ({ 
  store, 
  id, 
  focusStore 
}: {
  store: ViewStore
  id: string
  focusStore: FocusStore
}) => {
  const focusState = useStore(focusStore)
  const isFocused = focusState.currentFocus === id
  const cardIndex = focusState.focusableElements.indexOf(id) + 1
  const totalCards = focusState.focusableElements.length

  return (
    <FrameworkCard
      store={store}
      role="article"
      aria-label={`Card ${cardIndex} of ${totalCards}`}
      aria-selected={isFocused}
      aria-describedby={`card-${id}-description`}
      tabIndex={isFocused ? 0 : -1}
    >
      <div id={`card-${id}-description`} className="sr-only">
        {isFocused ? "Currently focused card" : ""}
      </div>
      {/* Card content */}
    </FrameworkCard>
  )
}
```

### Focus Indicators

```css
.focusable-card.focused {
  outline: 2px solid var(--focus-color, #007acc);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 122, 204, 0.3);
}

.focusable-card:focus {
  outline: 2px solid var(--focus-color, #007acc);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .focusable-card {
    transition: none;
  }
}
```

## TypeScript Support

### Type Definitions

```typescript
interface FocusStore extends Store {
  state: {
    currentFocus: string | null
    previousFocus: string | null
    focusHistory: string[]
    focusableElements: string[]
    focusMode: FocusMode
    isNavigating: boolean
    trapFocus: boolean
    autoFocus: boolean
  }
  
  // Focus management
  setFocus(elementId: string): void
  clearFocus(): void
  restoreFocus(): void
  
  // Navigation
  focusNext(): void
  focusPrevious(): void
  focusFirst(): void
  focusLast(): void
  
  // Element registration
  registerFocusable(elementId: string): void
  unregisterFocusable(elementId: string): void
  setFocusableElements(elements: string[]): void
  
  // Configuration
  setFocusMode(mode: FocusMode): void
  setTrapFocus(trap: boolean): void
  setAutoFocus(enabled: boolean): void
}

type FocusMode = "strict" | "loose" | "disabled"

interface FocusableComponent {
  id: string
  element: HTMLElement
  tabIndex: number
  focusable: boolean
}
```

### Generic Focus Hooks

```typescript
const useFocusable = <T extends HTMLElement>(
  id: string,
  focusStore: FocusStore
) => {
  const ref = useRef<T>(null)
  const focusState = useStore(focusStore)
  
  const isFocused = focusState.currentFocus === id
  
  useEffect(() => {
    focusStore.registerFocusable(id)
    return () => focusStore.unregisterFocusable(id)
  }, [id])
  
  useEffect(() => {
    if (isFocused && ref.current) {
      ref.current.focus()
    }
  }, [isFocused])
  
  return {
    ref,
    isFocused,
    setFocus: () => focusStore.setFocus(id),
    clearFocus: () => focusStore.clearFocus(),
  }
}
```

## Performance Considerations

### Optimized Focus Updates

```typescript
const useOptimizedFocus = (focusStore: FocusStore) => {
  const [deferredFocus, setDeferredFocus] = useState(focusStore.state.currentFocus)
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDeferredFocus(focusStore.state.currentFocus)
    }, 16) // Defer to next frame
    
    return () => clearTimeout(timeoutId)
  }, [focusStore.state.currentFocus])
  
  return deferredFocus
}
```

### Virtual Focus for Large Lists

```typescript
const VirtualFocusList = ({ 
  items, 
  focusStore,
  renderItem 
}: {
  items: any[]
  focusStore: FocusStore
  renderItem: (item: any, isFocused: boolean) => React.ReactNode
}) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 })
  const focusState = useStore(focusStore)
  
  // Only register visible items as focusable
  useEffect(() => {
    const visibleIds = items
      .slice(visibleRange.start, visibleRange.end)
      .map((_, index) => `item-${visibleRange.start + index}`)
    
    focusStore.setFocusableElements(visibleIds)
  }, [visibleRange, items.length])
  
  return (
    <div className="virtual-focus-list">
      {items.slice(visibleRange.start, visibleRange.end).map((item, index) => {
        const itemId = `item-${visibleRange.start + index}`
        const isFocused = focusState.currentFocus === itemId
        
        return (
          <div key={itemId}>
            {renderItem(item, isFocused)}
          </div>
        )
      })}
    </div>
  )
}
```

## Best Practices

1. **Always register/unregister focusable elements properly**
2. **Use semantic HTML and ARIA attributes for accessibility**
3. **Implement keyboard navigation consistently**
4. **Provide clear focus indicators**
5. **Handle focus restoration in modals/dialogs**
6. **Optimize for large lists with virtual focus**
7. **Support both mouse and keyboard interactions**
8. **Test with screen readers**
9. **Respect user's reduced motion preferences**
10. **Implement focus trapping in modal contexts**

## Related Components

- [`ViewStore`](./view-store.md) - Base store for individual cards
- [`CardsStore`](./cards-store.md) - Managing card collections
- [`Dialog`](../components/dialogs/dialog.md) - Modal focus management
- [`CardsGroup`](../components/core/cards-group.md) - Card collection rendering
