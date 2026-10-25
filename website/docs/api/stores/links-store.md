# LinksStore

`linksSetup` is an internal setup for storing root linked views. The package exports `linksSetup` and the `LinksState`/`LinksStore` types, but does not export a `LinksStore` singleton. It is separate from `CardsStore`'s `addLink` relationship.

## Import

```ts
import { linksSetup } from "@priolo/jack"
import type { LinksState, LinksStore, ViewStore } from "@priolo/jack"
import { createStore } from "@priolo/jon"
```

```ts
const links = createStore(linksSetup) as LinksStore
```

## State and getters

- `state.all: ViewStore[]` stores root views for this links collection.
- `getById(id)` searches recursively by view UUID; returns `null` for an empty ID.
- `getIndexByView(view)` returns the root-array index, or `-1` if absent.
- `find(state)` returns the first recursively visited view whose state deep-equals the supplied partial state.
- `findAll(state)` returns all recursively visited views whose state deep-equals it.

## Actions and mutators

- `add({ view, index? })` adds a view at the optional array index unless a view with the same UUID is already present.
- `remove(view)` removes that view from the root array; it does nothing for a null view.
- `setAll(all)` replaces the root array.

There are no link graph, link-type, layout, validation, or event APIs on this store.
