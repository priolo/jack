# CardsGroup

The `CardsGroup` component is a generic container for managing and displaying multiple cards in Jack. It handles the layout, drag-and-drop functionality, and rendering of card collections.

## Import

```typescript
import { CardsGroup } from '@priolo/jack';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `cardsStore` | `CardsStore` | Yes | The store managing the cards collection |
| `Render` | `FunctionComponent<RenderProps>` | Yes | Component to render each card |

## RenderProps Interface

```typescript
interface RenderProps {
  view: ViewStore;
}
```

## Usage

```tsx
import { CardsGroup, PolymorphicCard } from '@priolo/jack';

function MyApp() {
  return (
    <CardsGroup 
      cardsStore={deckCardsSo} 
      Render={PolymorphicCard}
    />
  );
}
```

## Features

- **Drag & Drop**: Automatically handles drag and drop reordering of cards
- **Drop Areas**: Provides visual drop zones between cards
- **Flexible Rendering**: Uses render props pattern for custom card rendering
- **Z-Index Management**: Automatically manages card stacking order

## Related Components

- [`FrameworkCard`](../core/framework-card.md) - Individual card wrapper
- [`RootCard`](../core/root-card.md) - Root card container
- [`DropArea`](../core/drop-area.md) - Drop zone component

## Store Integration

The `CardsGroup` integrates with the Jack store system to manage card state:

```typescript
const cardsStore = createStore(cardsSetup) as CardsStore;
```

The component automatically subscribes to store changes and updates the UI accordingly.
