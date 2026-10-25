---
id: "theme"
title: 'Theme'
sidebar_label: 'Theme'
sidebar_position: 4
---

A THEME is a set of CSS variables that defines the colors of the whole application.  
Jack components never use fixed colors: they only read CSS variables.  
So a theme is just a CSS file that overrides those variables.

## The CSS variables

Default values are in `@priolo/jack/style.css` (`:root`). Every variable can be overridden.

| Variable | Used by | Description |
|----------|---------|-------------|
| `--card-fg` | `.jack-framework` | Text color of the CARD |
| `--card-bg` | `.jack-framework` | Background color of the CARD |
| `--accent` | `FrameworkCard` (focus outline), `Dialog`, tooltip, `Header` | Main color for selections and interactive elements |
| `--accent-text` | `Dialog`, tooltip, `Header` | Text color over `--accent` |
| `--cmp-select-fg` | `Button`, `IconButton`, `FloatButton`, `Table`... | Text color of a selected component |
| `--cmp-select-bg` | `Button`, `IconButton`, `FloatButton`, `Table`, scrollbar... | Background of a selected component |
| `--cmp-bg` | `TextInput`, `Button`, `MarkdownEditor`, `EditList` | Translucent shadow of components that receive clicks or text |
| `--cmp-focus` | inputs, buttons, tables | Outline color of the focused component |
| `--cmp-table-header-bg` | `Table`, `VTable` | Background of the header |
| `--cmp-table-row-even-bg` | `Table`, `VTable` | Background of the even rows |
| `--jack-framework-actions-fg` | `.jack-framework-actions` | Text color of the ACTIONS bar of a CARD |
| `--jack-framework-actions-bg` | `.jack-framework-actions` | Background of the ACTIONS bar of a CARD |
| `--jack-z-resizer`, `--jack-z-zen` | internal | z-index of the resizer and of the ZEN CARD |

`--accent` and `--accent-text` have no default in the library: define them in your theme.

The snackbar colors are not variables: override the classes
`.jack-cmp-snackbar.error`, `.warn`, `.success` and `.info`
(they match the values of `MESSAGE_TYPE`).

## Define a theme

The pattern is:
1. a `base.css` with the default values in `:root`
2. a CSS file for each theme, scoped by the attribute `data-theme` on `<html>`
3. a function that sets the attribute

### base.css

```css title="themes/base.css"
:root {
	/* Fonts */
	--title-font-family: 'Darker Grotesque', sans-serif;
	--text-font-family: 'Inter Variable', sans-serif;

	/* Accent color for selections and interactive components */
	--accent: #EBFB35;
	--accent-text: #393939;

	/* CARD */
	--card-fg: #dedede;
	--card-bg: #3E3E3E;

	/* Selected component */
	--cmp-select-fg: #393939;
	--cmp-select-bg: var(--accent);

	--cmp-bg: rgba(0, 0, 0, 0.05);
	--cmp-focus: color-mix(in srgb, var(--accent) 54%, transparent);

	/* Table */
	--cmp-table-header-bg: #5b5b5b;
	--cmp-table-row-even-bg: rgba(0, 0, 0, 0.5);

	/* ACTIONS bar of the CARD */
	--jack-framework-actions-bg: rgb(0 0 0 / 50%);
	--jack-framework-actions-fg: #dedede;
}

.jack-cmp-snackbar.error   { background: #da0505; color: #dedede; }
.jack-cmp-snackbar.warn    { background: #EBFB35; color: #393939; }
.jack-cmp-snackbar.success { background: #6AFFAB; color: #393939; }
.jack-cmp-snackbar.info    { background: #10F3F3; color: #393939; }
```

### A theme

A theme overrides only what changes.  
The CARDs are targeted with the class `.jack-framework` that `FrameworkCard` always applies.

```css title="themes/mint.css"
[data-theme="mint"] {
	--accent: #07ff77;
}

[data-theme="mint"] .jack-framework {
	--card-fg: #a8f2ff;
	--card-bg: #004d42;

	--cmp-select-fg: #393939;
	--cmp-select-bg: var(--accent);

	--cmp-focus: color-mix(in srgb, var(--accent) 54%, transparent);
	border-radius: 3px;
}
```

Other useful classes to customize:

- `.jack-framework-linked`: a CARD linked to another one
- `.jack-framework-focus`: the CARD with focus
- `.jack-framework-actions`: the ACTIONS bar
- `.jack-framework-header`, `.jack-title`, `.jack-subtitle`: the header

### Apply the theme

```ts title="themes/index.ts"
import "./base.css"
import "./mint.css"
import "./redeye.css"

export const THEMES = [
	{ label: "MINT", value: "mint" },
	{ label: "RED EYE", value: "redeye" },
] as const

export type ThemeType = typeof THEMES[number]["value"]

export function applyTheme(theme: ThemeType) {
	document.documentElement.dataset.theme = theme
}
```

```tsx
applyTheme("mint")
```

Import the theme **after** `@priolo/jack/style.css` so that it overrides the defaults.

## Colors by CARD type (accent)

Instead of fixing a color in each CARD, give the CARD a *role* and let the theme decide the color.  
The theme assigns a different `--accent` to each role:

```ts
export type CardAccent = "streams" | "messages" | "neutral"

/** CSS classes of a CARD */
export function cardCls(accent: CardAccent, filled = false): string {
	return `card-${accent}${filled ? " card--filled" : ""}`
}
```

```css title="themes/redeye.css"
[data-theme="redeye"] .card-streams  { --accent: #EBFB35; }
[data-theme="redeye"] .card-messages { --accent: #10F3F3; }
[data-theme="redeye"] .card-neutral  { --accent: #DEDEDE; }

/* default CARD: dark background, colored selections */
[data-theme="redeye"] .jack-framework {
	--card-fg: #dedede;
	--card-bg: #3E3E3E;
	--cmp-select-fg: #393939;
	--cmp-select-bg: var(--accent);
}

/* "filled" CARD: colored background, dark selections */
[data-theme="redeye"] .jack-framework.card--filled {
	--card-fg: #393939;
	--card-bg: var(--accent);
	--cmp-select-fg: var(--accent);
	--cmp-select-bg: #393939;
}

[data-theme="redeye"] .jack-framework.card--filled .jack-framework-actions {
	--cmp-select-fg: #393939;
	--cmp-select-bg: var(--accent);
}
```

```tsx
<FrameworkCard store={store} className={cardCls("streams", true)}>
```

Changing theme now changes every CARD without touching the components.

## Background of the application

The background is not handled by Jack: style your own container.
For example, a theme can set the image of the main panel:

```css
[data-theme="mint"] #main-panel {
	background-color: #06161a;
	background-image: url(../assets/bg.png);
	background-blend-mode: overlay;
}
```
