# ComponentTypes

There is no shared `ComponentProps`, `ComponentVariant`, `ComponentSize`, or theme type exported by `@priolo/jack`. Component props are defined by the individual components and documented on their component API pages.

## Shared exported type

The package exports `ColorVar`, a small optional foreground/background color shape:

```ts
import type { ColorVar } from "@priolo/jack"

type ColorVar = {
  fg?: string
  bg?: string
}
```

The source permits CSS hex colors as well as other strings for `fg` and `bg`. Other general-purpose component types are not part of the package's public type exports.
