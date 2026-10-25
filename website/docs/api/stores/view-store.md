# ViewStore

`viewSetup` is the base setup mixed into card stores. Its public store type is `ViewStore`; `ViewState` is partial because the state is initialized by a setup function.

## Import

```ts
import { viewSetup } from "@priolo/jack"
import type { ViewStore, ViewState } from "@priolo/jack"
import { createStore, mixStores } from "@priolo/jon"
```

Create a base view with `createStore(viewSetup)`, or mix the setup into a card-specific setup:

```ts
const cardSetup = mixStores(viewSetup, {
  state: { type: "example", content: "Hello" },
})
const view = createStore(cardSetup) as ViewStore
```

## State

`ViewState` contains these fields (the base setup supplies the defaults):

| Field | Type | Default |
|---|---|---|
| `uuid` | `string` | Generated UUID |
| `type` | `string` | `null` |
| `draggable`, `pinnable` | `boolean` | `true` |
| `unclosable`, `droppable`, `sizeForce`, `disabled`, `docAniDisabled` | `boolean` | `false` |
| `size` | `VIEW_SIZE` | `VIEW_SIZE.NORMAL` |
| `width`, `widthMin`, `widthMax`, `widthCompact` | `number` | `300`, `80`, `600`, `40` |
| `docAnim` | `DOC_ANIM` | `DOC_ANIM.EXIT` |
| `parent`, `linked` | `ViewStore \| null` | `null` |
| `group` | `CardsStore \| null` | `null` |
| `snackbar` | `SnackbarState` | `{ open: false }` |
| `alert` | `AlertState` | `{ open: false }` |

`SnackbarState` and `AlertState` are declared in the internal stack types module and are not named exports of `@priolo/jack`. The enums `VIEW_SIZE` and `DOC_ANIM` are public; see [Enums](../types/enums.md).

## Getters

- `getWidth()` returns `widthMax` for the zen card, `widthCompact` for a compact card, otherwise `width`.
- `getTitle()` and `getSubTitle()` default to `null`; card setups may override them.
- `getSerialization()` returns `{ uuid, type, size, linked }`, recursively serializing the linked view when present. Override it to include card-specific state.

## Actions

- `onLinked()`, `onInsertion()`, `onRemoval()` and `onDrop(data: DragDoc)` are no-op lifecycle hooks intended for card-specific setups.
- `onRemoveFromDeck()` removes this view from its group with animation and calls `fetchAbort` when available.
- `setLinked(view)` links or unlinks a child view and updates its parent/group references.
- `docAnim(state: DOC_ANIM)` updates the animation state, waiting for the configured animation interval where appropriate.
- `alertOpen(alert)` opens an alert and resolves to `true` or `false` when closed; `closeAlert(result)` closes it and resolves the pending promise.
- `setSerialization(state)` restores the `uuid` and `size` fields.

## Mutators

- `setSize(size: VIEW_SIZE)` also requests the sizing animation.
- `setWidth(width: number)`
- `setDisabled(disabled: boolean)`
- `setDocAnim(docAnim: DOC_ANIM)`
- `setSnackbar(snackbar)` and `setAlert(alert)`

Mutators accept their declared arguments and return state updates; the store API is supplied by `@priolo/jon`.
