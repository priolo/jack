# DocsStore

The package provides a singleton docs store named `docsSo` (type `DocStore`). It tracks deck instances and shared card-display state; it is not a document-content store.

## Import

```ts
import { docsSo, DRAWER_POSITION, FIXED_CARD } from "@priolo/jack"
import type { DocStore, DocState } from "@priolo/jack"
```

## State

| Field | Type | Default |
|---|---|---|
| `allDeck` | `CardsStore[]` | `[]` |
| `zenCard` | `ViewStore \| null` | `null` |
| `zenOpen` | `boolean` | `false` |
| `cardOptions` | `{ [type: string]: string }` | `{}` |
| `drawerPosition` | `DRAWER_POSITION` | `DRAWER_POSITION.RIGHT` |

`FIXED_CARD` is also exported, with `CONNECTIONS`, `LOGS`, and `ABOUT` numeric values `0`, `1`, and `2`.

## Getters and actions

- `getAllCards()` flattens `state.all` from each deck in `allDeck`; it returns root deck entries.
- `getSerialization()` returns `{ drawerPosition }`.
- `setSerialization(state)` restores `drawerPosition`.
- `zenOpen(card)` sets the active zen card, waits for the opening animation, then sets `zenOpen` to `true`.
- `zenClose()` closes zen mode, waits, refreshes the previous zen card, and clears it.

## Mutators

- `setZenCard(card)`, `setZenOpen(open)`, `setDrawerPosition(position)`, and `setAllDeck(decks)` update the corresponding fields.

The store's type is `DocStore` (not `DocsStore`); `docsSo` is the exported singleton, not a setup to pass to `createStore`.
