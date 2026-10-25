# CardsGroup

The `CardsGroup` component is a generic container for managing and displaying multiple cards in Jack. It handles the layout, drag-and-drop functionality, and rendering of card collections.

## Import

```typescript
import { CardsGroup } from '@priolo/jack';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `cardsStore` | `CardsStore` | No (in practice always pass it) | The store managing the cards collection |
| `Render` | `FunctionComponent<RenderProps>` | Yes | Component to render each card |

## RenderProps Interface

```typescript
interface RenderProps {
  view: ViewStore;
}
```

## Usage

```tsx
import { CardsGroup, ViewStore } from '@priolo/jack';

// your own component: choose the card to render, e.g. by view.state.type
const MyRender = ({ view }: { view: ViewStore }) => <MyCardView store={view} />;

function MyApp() {
  return (
    <CardsGroup 
      cardsStore={deckCardsSo} 
      Render={MyRender}
    />
  );
}
```

## Features

- **Drop Areas**: Renders a drop zone before each card and one after the last (drag and drop is driven by `mouseSo` / `DragCmp`)
- **Flexible Rendering**: Each card is wrapped in an internal `RootCard` that renders it through `Render`
- **Z-Index Management**: Earlier cards get a higher `zIndex`

## Related Components

- [`FrameworkCard`](../core/framework-card.md) - Individual card wrapper

## Store Integration

The `CardsGroup` integrates with the Jack store system to manage card state:

```typescript
import { createStore } from '@priolo/jon';
import { cardsSetup, CardsStore } from '@priolo/jack';

import { createStore } from '@priolo/jon';
import { cardsSetup, CardsStore } from '@priolo/jack';

const cardsStore = createStore(cardsSetup) as CardsStore;
```

The component automatically subscribes to store changes and updates the UI accordingly.
