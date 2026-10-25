# MouseStore

Mouse drag-and-drop state is provided as the singleton `mouseSo`. The package does not export a `MouseStore` class or setup.

## Import

```ts
import { mouseSo } from "@priolo/jack"
import type { DragDoc, Position } from "@priolo/jack"
```

## State

- `drag: DragDoc | null` ? current drag description.
- `position: Position | null` ? last pointer position, with `x` and `y` coordinates.
- `color: ColorVar | null` ? optional drag color.

`DragDoc` has optional `source` and `destination` fields. Each is a `DragSource` (internal type) with optional `group: CardsStore`, `view: ViewStore`, and `index: number`.

## Actions

- `startDrag(drag)` attaches document-level mouse move/up listeners, updates the position from `pageX`/`pageY`, and sets `drag`.
- `stopDrag()` restores the source view's animation, calls `onDrop(drag)` when dropped on another view, or moves the source view between groups when the destination has a group and index. It then clears `drag`.

## Mutators

- `setDrag(drag)`, `setPosition(position)`, and `setColor(color)` update the corresponding fields.

The source defines only these drag-store operations; it does not provide the generalized mouse tracking, drop-zone registry, click handling, or drag configuration described in some other APIs.
