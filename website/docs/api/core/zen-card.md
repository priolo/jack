# ZenCard

The `ZenCard` component provides a full-screen overlay for displaying cards in zen mode, allowing focused interaction with a single card.

## Import

```typescript
import { ZenCard } from '@priolo/jack';
```

## Props

The `ZenCard` component doesn't accept props - it reads its state from the global docs store.

## Usage

```tsx
import { ZenCard } from '@priolo/jack';

function App() {
  return (
    <div>
      {/* Your main app content */}
      <CardsGroup cardsStore={deckCardsSo} Render={MyCardComponent} />
      
      {/* ZenCard overlay */}
      <ZenCard />
    </div>
  );
}
```

## Features

### Full-Screen Overlay

ZenCard creates a modal-like overlay that covers the entire viewport when a card enters zen mode.

### Automatic State Management

The component automatically shows/hides based on the global docs store state:

```typescript
// To open a card in zen mode
docsSo.zenOpen(cardStore);

// To close zen mode
docsSo.zenClose();
```

### Click to Close

Users can click on the overlay outside the zen card content to close zen mode.

### Portal Rendering

The zen card content is rendered into the container with ID `zen-card`.

## CSS Classes

- `open` - Applied (CSS module class) when `docsSo.state.zenOpen` is true
- `hide` - Applied when no card is in zen mode (`zenCard` is null)

## Animation States

The component handles smooth transitions:

1. **Opening**: Card animates to full screen
2. **Open**: Card is fully displayed in zen mode  
3. **Closing**: Card animates back to original position
4. **Closed**: Zen overlay is hidden

## Store Integration

ZenCard integrates with the docs store:

```typescript
// Check if zen mode is active
const isZenOpen = docsSo.state.zenOpen;

// Get the current zen card
const zenCard = docsSo.state.zenCard;
```

## Usage with Cards

Any card can be opened in zen mode by calling:

```typescript
// From a button click or other event
const handleZenMode = () => {
  docsSo.zenOpen(myCardStore);
};

// Or from the header double-click (built-in)
// Double-click the card title to enter zen mode
```

## Related Components

- [`FrameworkCard`](./framework-card.md) - Cards that can be displayed in zen mode
- [`Header`](./header.md) - Provides zen mode toggle via double-click
- [`CardsGroup`](./cards-group.md) - Main card container

## Example Implementation

```tsx
import { ZenCard, CardsGroup, FrameworkCard, Header, Button, docsSo, icons } from '@priolo/jack';

function MyCard({ store }) {
  const handleZenToggle = () => {
    if (docsSo.state.zenCard === store) {
      docsSo.zenClose();
    } else {
      docsSo.zenOpen(store);
    }
  };

  return (
    <FrameworkCard
      store={store}
      headerRender={<Header store={store} icon={<icons.EditorIcon />} />}
    >
      <div>
        <p>Card content here</p>
        <Button onClick={handleZenToggle}>
          Toggle Zen Mode
        </Button>
      </div>
    </FrameworkCard>
  );
}

function App() {
  return (
    <>
      <CardsGroup cardsStore={cardsStore} Render={MyCard} />
      <ZenCard />
    </>
  );
}
```
