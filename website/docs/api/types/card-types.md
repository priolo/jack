# CardTypes

Jack does not define a separate exported `CardState`, `CardProps`, `CardVariant`, or `CardSize` type. A card is a `ViewStore` extended with fields and behavior in its own setup.

## Import

```ts
import { viewSetup, cardsSetup } from "@priolo/jack"
import type { ViewStore, ViewState, CardsStore, CardsState } from "@priolo/jack"
import { createStore, mixStores } from "@priolo/jon"
```

`CardsState` is the state type of `cardsSetup`, containing `all: ViewStore[]`. `CardsStore` adds its getters and actions (`getById`, `getIndexByView`, `add`, `addLink`, `remove`, `move`, and `detach`). See [CardsStore](../stores/cards-store.md) for signatures and behavior.

## Define a card-specific store

Add custom state and methods by mixing `viewSetup` with an application setup. The custom fields are application-defined, not Jack card types:

```ts
const noteSetup = mixStores(viewSetup, {
  state: { type: "note", text: "" },
  mutators: {
    setText: (text: string) => ({ text }),
  },
})
const note = createStore(noteSetup) as ViewStore
```

The base fields and types are documented in [ViewTypes](./view-types.md). Card component props are declared by each component; there is no shared exported card-props interface.
