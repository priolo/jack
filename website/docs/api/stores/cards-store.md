# CardsStore

The store for managing collections of cards and deck functionality in the Jack framework. CardsStore handles the organization, positioning, and lifecycle of multiple card views within a deck container.

## Import

```typescript
import { CardsStore, cardsSetup } from "@priolo/jack"
import { createStore } from "@priolo/jon"
```

## Creating a CardsStore

### Basic Setup

```typescript
// Create a cards store instance
const deckStore = createStore(cardsSetup) as CardsStore

// Use with CardsGroup component
<CardsGroup
  cardsStore={deckStore}
  Render={({ view }) => <YourCardComponent store={view} />}
/>
```

### With Custom Configuration

```typescript
import { cardsSetup, viewSetup } from "@priolo/jack"
import { mixStores } from "@priolo/jon"

// Extend with custom functionality
const customCardsSetup = mixStores(cardsSetup, {
  state: {
    maxCards: 10,
    allowDuplicates: false,
  },
  mutators: {
    setMaxCards: (maxCards: number) => ({ maxCards }),
    setAllowDuplicates: (allowDuplicates: boolean) => ({ allowDuplicates }),
  },
})

const deckStore = createStore(customCardsSetup) as CardsStore
```

## State Properties

| Property | Type | Description |
|----------|------|-------------|
| `views` | `ViewStore[]` | Array of all card view stores in the deck |
| `dragSource` | `ViewStore \| null` | Currently dragged card reference |
| `dragTarget` | `ViewStore \| null` | Target position for drag operation |
| `selectedCards` | `ViewStore[]` | Array of currently selected cards |
| `focusedCard` | `ViewStore \| null` | Currently focused card |

## Mutators

### Card Management

#### `add(options: AddCardOptions): void`
Adds a new card to the deck.

```typescript
interface AddCardOptions {
  view: ViewStore
  index?: number
  anim?: boolean
}

// Basic usage
const newCard = createStore(cardSetup) as ViewStore
deckStore.add({ view: newCard })

// Insert at specific position
deckStore.add({ 
  view: newCard, 
  index: 2, 
  anim: true 
})
```

#### `remove(view: ViewStore): void`
Removes a card from the deck.

```typescript
deckStore.remove(cardToRemove)
```

#### `removeAt(index: number): void`
Removes a card at the specified index.

```typescript
deckStore.removeAt(0) // Remove first card
```

#### `clear(): void`
Removes all cards from the deck.

```typescript
deckStore.clear()
```

### Card Linking

#### `addLink(options: LinkOptions): void`
Creates a linked card relationship.

```typescript
interface LinkOptions {
  parent: ViewStore
  view: ViewStore
  anim?: boolean
}

// Create linked card
const detailCard = createStore(detailSetup) as ViewStore
deckStore.addLink({
  parent: parentCard,
  view: detailCard,
  anim: true
})
```

#### `removeLinks(parent: ViewStore): void`
Removes all linked cards for a parent.

```typescript
deckStore.removeLinks(parentCard)
```

### Card Positioning

#### `moveCard(from: number, to: number): void`
Moves a card from one position to another.

```typescript
deckStore.moveCard(0, 3) // Move first card to fourth position
```

#### `setPosition(view: ViewStore, x: number, y: number): void`
Sets the absolute position of a card.

```typescript
deckStore.setPosition(cardView, 100, 200)
```

### Selection Management

#### `selectCard(view: ViewStore): void`
Selects a card (single selection).

```typescript
deckStore.selectCard(cardView)
```

#### `selectMultiple(views: ViewStore[]): void`
Selects multiple cards.

```typescript
deckStore.selectMultiple([card1, card2, card3])
```

#### `clearSelection(): void`
Clears all selected cards.

```typescript
deckStore.clearSelection()
```

### Focus Management

#### `focusCard(view: ViewStore): void`
Sets focus to a specific card.

```typescript
deckStore.focusCard(cardView)
```

#### `focusNext(): void`
Moves focus to the next card.

```typescript
deckStore.focusNext()
```

#### `focusPrevious(): void`
Moves focus to the previous card.

```typescript
deckStore.focusPrevious()
```

## Advanced Usage

### Custom Card Rendering

```typescript
const App = () => {
  const deckStore = createStore(cardsSetup) as CardsStore

  return (
    <div className="app">
      <CardsGroup
        cardsStore={deckStore}
        Render={({ view }) => {
          // Render different components based on card type
          switch (view.state.type) {
            case "user-list":
              return <UserListCard store={view} />
            case "user-detail":
              return <UserDetailCard store={view} />
            case "settings":
              return <SettingsCard store={view} />
            default:
              return <DefaultCard store={view} />
          }
        }}
      />
    </div>
  )
}
```

### Dynamic Card Creation

```typescript
const createUserListCard = (users: User[]) => {
  const cardSetup = mixStores(viewSetup, {
    state: {
      users,
      type: "user-list",
      title: "Users"
    },
    mutators: {
      setUsers: (users: User[]) => ({ users }),
      addUser: (user: User) => (state) => ({
        users: [...state.users, user]
      }),
    }
  })

  const cardStore = createStore(cardSetup) as ViewStore
  deckStore.add({ view: cardStore, anim: true })
  return cardStore
}
```

### Card Linking Pattern

```typescript
const handleItemClick = (item: any, parentCard: ViewStore) => {
  // Create detail card
  const detailCard = createStore(detailSetup) as ViewStore
  detailCard.setItem(item)
  
  // Link to parent
  const deck = parentCard.state.group
  deck.addLink({
    parent: parentCard,
    view: detailCard,
    anim: true
  })
}
```

### Batch Operations

```typescript
// Add multiple cards
const addMultipleCards = (cardData: any[]) => {
  cardData.forEach((data, index) => {
    const card = createStore(cardSetup) as ViewStore
    card.setData(data)
    deckStore.add({ 
      view: card, 
      index: index,
      anim: false // Disable animation for bulk operations
    })
  })
}

// Remove selected cards
const removeSelectedCards = () => {
  deckStore.state.selectedCards.forEach(card => {
    deckStore.remove(card)
  })
  deckStore.clearSelection()
}
```

## Event Handling

### Card Lifecycle Events

```typescript
// Listen for card additions
deckStore.state.views.length // Access via state changes

// Custom event handling in card setup
const cardSetup = mixStores(viewSetup, {
  state: {
    onAdd: null as ((card: ViewStore) => void) | null,
    onRemove: null as ((card: ViewStore) => void) | null,
  },
  mutators: {
    setOnAdd: (callback: (card: ViewStore) => void) => ({ onAdd: callback }),
    setOnRemove: (callback: (card: ViewStore) => void) => ({ onRemove: callback }),
  }
})
```

## Integration with CardsGroup

### Basic Integration

```typescript
<CardsGroup
  cardsStore={deckStore}
  Render={({ view }) => <CardComponent store={view} />}
/>
```

### With Custom Props

```typescript
<CardsGroup
  cardsStore={deckStore}
  className="custom-deck"
  style={{ padding: "20px" }}
  Render={({ view, index }) => (
    <CardComponent 
      store={view} 
      index={index}
      onSelect={() => deckStore.selectCard(view)}
    />
  )}
/>
```

## Performance Considerations

### Optimization Tips

1. **Lazy Card Creation**: Create cards only when needed
2. **Virtualization**: For large numbers of cards, implement virtualization
3. **Animation Control**: Disable animations during bulk operations
4. **Memory Management**: Remove unused cards to prevent memory leaks

```typescript
// Efficient card management
const addCardEfficiently = (data: any) => {
  // Check if card already exists
  const existingCard = deckStore.state.views.find(
    view => view.state.id === data.id
  )
  
  if (existingCard) {
    // Update existing card instead of creating new
    existingCard.setData(data)
    deckStore.focusCard(existingCard)
  } else {
    // Create new card
    const newCard = createStore(cardSetup) as ViewStore
    newCard.setData(data)
    deckStore.add({ view: newCard })
  }
}
```

## TypeScript Support

### Type Definitions

```typescript
interface CardsStore extends Store {
  state: {
    views: ViewStore[]
    dragSource: ViewStore | null
    dragTarget: ViewStore | null
    selectedCards: ViewStore[]
    focusedCard: ViewStore | null
  }
  
  // Mutator methods
  add(options: AddCardOptions): void
  remove(view: ViewStore): void
  addLink(options: LinkOptions): void
  selectCard(view: ViewStore): void
  // ... other methods
}

interface AddCardOptions {
  view: ViewStore
  index?: number
  anim?: boolean
}

interface LinkOptions {
  parent: ViewStore
  view: ViewStore
  anim?: boolean
}
```

### Generic Card Types

```typescript
interface TypedCard<T = any> extends ViewStore {
  state: ViewStore['state'] & {
    data: T
    type: string
  }
}

// Usage with typed cards
const createTypedCard = <T>(data: T, type: string): TypedCard<T> => {
  const setup = mixStores(viewSetup, {
    state: { data, type },
    mutators: {
      setData: (data: T) => ({ data }),
    }
  })
  return createStore(setup) as TypedCard<T>
}
```

## Common Patterns

### Master-Detail Pattern

```typescript
const createMasterDetailCards = (items: any[]) => {
  // Create master list card
  const masterCard = createUserListCard(items)
  
  // Handle item selection to show detail
  masterCard.onItemSelect = (item) => {
    const detailCard = createDetailCard(item)
    deckStore.addLink({
      parent: masterCard,
      view: detailCard,
      anim: true
    })
  }
}
```

### Card State Synchronization

```typescript
// Sync cards with external data source
const syncCards = (dataSource: any[]) => {
  // Remove cards not in data source
  deckStore.state.views.forEach(card => {
    if (!dataSource.find(item => item.id === card.state.id)) {
      deckStore.remove(card)
    }
  })
  
  // Add/update cards from data source
  dataSource.forEach(item => {
    const existingCard = deckStore.state.views.find(
      card => card.state.id === item.id
    )
    
    if (existingCard) {
      existingCard.updateData(item)
    } else {
      const newCard = createCardFromData(item)
      deckStore.add({ view: newCard })
    }
  })
}
```

## Best Practices

1. **Use CardsStore for deck-level operations**
2. **Keep individual card logic in ViewStore**
3. **Implement proper cleanup for removed cards**
4. **Use linking for related card relationships**
5. **Handle edge cases for empty decks**
6. **Consider performance for large card collections**
7. **Implement keyboard navigation support**
8. **Use consistent card type naming conventions**

## Related Components

- [`ViewStore`](./view-store.md) - Individual card management
- [`CardsGroup`](../components/core/cards-group.md) - Visual rendering of card collections
- [`Header`](../components/core/header.md) - Card header with controls
- [`FrameworkCard`](../components/core/framework-card.md) - Standard card wrapper
