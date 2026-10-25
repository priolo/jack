# FocusStore

Focus management is provided as the singleton `focusSo`; `focusSetup` and a public `FocusStore` type are not exported from `@priolo/jack`.

## Import

```ts
import { focusSo } from "@priolo/jack"
import type { ViewStore } from "@priolo/jack"
```

## State

| Field | Type | Default |
|---|---|---|
| `view` | `ViewStore \| null` | `null` |
| `show` | `boolean` | `false` |
| `position` | `number` | `-1` |
| `shortcuts` | `Shortcut[]` | `[]` |
| `shiftKey`, `altKey`, `ctrlKey` | `boolean` | `false` |

`Shortcut` is an internal type with `code`, `description`, and `action` fields; it is not exported by the package.

## Actions

- `focus(view)` sets the focused view and computes its initial focus position when the view is not null.
- `exeShortcut(event)` invokes registered shortcuts whose `code` matches the event's `code`. The event shape is `{ code, altKey, shiftKey, ctrlKey }`.
- `moveVert(up)` moves the position one step up or down within the current view. It initializes the position when it is `-1` and returns `false` if the target position is unavailable.
- `moveHoriz(left)` focuses the adjacent view returned by the internal `getNear` helper; it does nothing when the current view is in zen mode.

## Mutators

- `setView(view)`, `setShow(show)`, `setPosition(position)`, and `setShortcuts(shortcuts)` update their matching state fields.

There is no `focusSetup` or exported `FocusStore` class. Use the shared `focusSo` instance.
