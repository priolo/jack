# CardsStore

`cardsSetup` manages one deck's root views and their linked views. The public store type is `CardsStore` and its state contains a single `all` array.

## Import

```ts
import { cardsSetup } from "@priolo/jack"
import type { CardsStore, CardsState, ViewStore } from "@priolo/jack"
import { createStore } from "@priolo/jon"
```

```ts
const cards = createStore(cardsSetup) as CardsStore
```

`CardsGroup` renders a deck when passed its `cardsStore` prop.

## State and getters

- `state.all: ViewStore[]` contains views at the root of this deck. Linked views are reached through each view's `state.linked`.
- `getById(id: string)` searches the deck recursively by `uuid`, including linked views; an empty ID returns `null`.
- `getIndexByView(view)` returns the view's root-array index, or `-1` when absent.

## Actions

- `add({ view, index?, anim? })` inserts a root view (append by default). If that UUID is already present in the docs store, it focuses the existing view instead. `anim` defaults to `false`.
- `addLink({ view, parent, anim? })` sets a parent's linked view, replacing an existing linked view. Passing no `view` clears the link. Animation defaults to `false`.
- `remove({ view, anim?, move? })` removes a root or unlinks a child, clears pending alerts, and calls `onRemoval` unless `move` is true.
- `move({ view, index?, groupDest?, anim? })` repositions a root view or moves it to another deck. The default destination is this deck and the default index is `0`.
- `detach(view)` moves a linked view to the root immediately after its root ancestor.

These actions are asynchronous where noted by their implementation. For example:

```ts
await cards.add({ view })
await cards.addLink({ parent, view: child, anim: true })
await cards.remove({ view, anim: true })
```

## Mutators

- `setAll(all: ViewStore[])` replaces the root view array.

`CardsState` and `CardsStore` are exported types. There are no `selectedCards`, focus-navigation, `clear`, or `removeAt` APIs on this store.
