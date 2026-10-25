# ViewTypes

The view API types exported by `@priolo/jack` describe the base card-view setup and store. They are declared in `src/stores/stacks/viewBase.ts`; fields on `ViewState` are optional because it is a `Partial` state type.

## Import

```ts
import { viewSetup, VIEW_SIZE, DOC_ANIM } from "@priolo/jack"
import type { ViewState, ViewStore, ViewGetters, ViewActions, ViewMutators } from "@priolo/jack"
```

## ViewState

The base state has these fields:

```ts
type ViewState = Partial<{
  uuid: string
  type: string
  draggable: boolean
  unclosable: boolean
  pinnable: boolean
  droppable: boolean
  size: VIEW_SIZE
  sizeForce: boolean
  disabled: boolean
  width: number
  widthMin: number
  widthMax: number
  widthCompact: number
  docAnim: DOC_ANIM
  docAniDisabled: boolean
  parent: ViewStore | null
  linked: ViewStore | null
  group: CardsStore | null
  snackbar: SnackbarState
  alert: AlertState
}>
```

The `CardsStore` type is publicly exported. `SnackbarState` and `AlertState` are internal types, not named exports from the package.

## Getters, actions, and mutators

The exported `ViewGetters`, `ViewActions`, and `ViewMutators` types correspond to the actual members on `viewSetup`:

- Getters: `getWidth`, `getTitle`, `getSubTitle`, `getSerialization`.
- Actions: lifecycle callbacks `onLinked`, `onInsertion`, `onRemoval`, `onDrop`; alert handling `alertOpen` and `closeAlert`; `onRemoveFromDeck`; serialization via `setSerialization`; linking via `setLinked`; animation via `docAnim`.
- Mutators: `setSize`, `setWidth`, `setDisabled`, `setDocAnim`, `setSnackbar`, `setAlert`.

`ViewStore` extends the `@priolo/jon` store core and exposes `state: ViewState` plus a string index signature. It does not define general position, title, focus, serialization, or event methods.
