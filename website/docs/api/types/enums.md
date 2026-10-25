# Enums

These are the enums and shared type publicly exported by `@priolo/jack`. Do not import the internal `LOAD_MODE` from the package entry point: it is defined in the stack types module but is not re-exported there.

## View and loading enums

```ts
import { VIEW_SIZE, LOAD_STATE, MESSAGE_TYPE, DOC_ANIM } from "@priolo/jack"
```

- `VIEW_SIZE` is numeric: `NORMAL = 0`, `COMPACT = 1`, `ICONIZED = 2`.
- `LOAD_STATE` is numeric: `IDLE = 0`, `LOADING = 1`, `ERROR = 2`.
- `MESSAGE_TYPE` is string-valued: `INFO = "info"`, `SUCCESS = "success"`, `WARNING = "warn"`, `ERROR = "error"`.
- `DOC_ANIM` is string-valued: `SHOW = "show"`, `EXIT = "exit"`, `DRAGGING = "dragging"`, `EXITING = "exiting"`, `SHOWING = "showing"`, `SIZING = "sizing"`.

`LOAD_MODE` exists internally with numeric members `MANUAL = 0`, `PARENT = 1`, `POLLING = 2`, but is not exported by `@priolo/jack`.

## Docs enums

```ts
import { DRAWER_POSITION, FIXED_CARD } from "@priolo/jack"
```

- `DRAWER_POSITION`: `RIGHT = "right"`, `BOTTOM = "bottom"`.
- `FIXED_CARD` is numeric: `CONNECTIONS = 0`, `LOGS = 1`, `ABOUT = 2`.

## Shared color type

```ts
import type { ColorVar } from "@priolo/jack"
```

`ColorVar` has optional `fg` and `bg` string fields. The source's `Color` type allows strings such as hex, `rgb(...)`, and `rgba(...)`; `Color` itself is not exported from the package.

No `Severity`, `ComponentVariant`, `CardSize`, `ViewEventType`, or other invented enum is exported by this library.
