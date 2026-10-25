# IconToggle

A toggle button component that switches between two states with visual feedback and icon changes.

## Import

```tsx
import { IconToggle } from "@priolo/jack"
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `check` | `boolean` | Yes | - | Current toggle state |
| `onChange` | `(check: boolean, e?: React.MouseEvent) => void` | No | - | Called with the new (inverted) value on click |
| `trueIcon` | `React.ReactNode` | No | `<CheckOnIcon />` | Icon shown when `check` is true |
| `falseIcon` | `React.ReactNode` | No | `<CheckOffIcon />` | Icon shown when `check` is false |
| `tabIndex` | `number` | No | `-1` | Tab index |
| `readOnly` | `boolean` | No | - | Ignores clicks and removes the pointer cursor |
| `style` | `React.CSSProperties` | No | - | Inline styles (merged over the defaults) |
| `className` | `string` | No | - | CSS classes |

## Usage

### Basic Toggle

```tsx
const [isLiked, setIsLiked] = useState(false)

<IconToggle
  check={isLiked}
  onChange={setIsLiked}
  trueIcon={<HeartFilled />}
  falseIcon={<HeartOutline />}
/>
```

### Default Icons

```tsx
const [done, setDone] = useState(false)

<IconToggle check={done} onChange={setDone} />
```

### Read Only

```tsx
<IconToggle check={true} readOnly />
```

### Visibility Toggle

```tsx
const [isVisible, setIsVisible] = useState(false)

<IconToggle
  check={isVisible}
  onChange={setIsVisible}
  trueIcon={<EyeOpen />}
  falseIcon={<EyeClosed />}
/>
```

`HeartFilled`, `HeartOutline`, `EyeOpen` and `EyeClosed` are your own icon components (only `icons.EditorIcon` is exported by the package).

## Features

- **Dual State Icons**: Different icons for on/off states
- **Default check icons**: Built-in check on/off icons
- **Opacity feedback**: Inline `opacity` is `1` when checked or hovered (unless read-only), otherwise `0.5`
- **Read-only mode**: `readOnly` disables interaction

## Related Components

- [`Button`](./button.md) - Base button component
- [`IconButton`](./icon-button.md) - Single-state icon button

## Styling

The component applies no built-in CSS classes; use `className` and `style`.

## Common Patterns

### Settings Panel

```tsx
const SettingsPanel = () => {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  
  return (
    <div className="settings-panel">
      <div className="setting-item">
        <span>Notifications</span>
        <IconToggle check={notifications} onChange={setNotifications} />
      </div>
      <div className="setting-item">
        <span>Dark Mode</span>
        <IconToggle check={darkMode} onChange={setDarkMode} />
      </div>
    </div>
  )
}
```

### Social Actions

```tsx
const SocialActions = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(post.isLiked)
  const [bookmarked, setBookmarked] = useState(post.isBookmarked)
  
  return (
    <div className="social-actions">
      <IconToggle
        check={liked}
        onChange={setLiked}
        trueIcon={<HeartFilled className="text-red-500" />}
        falseIcon={<HeartOutline />}
      />
      <IconToggle
        check={bookmarked}
        onChange={setBookmarked}
        trueIcon={<BookmarkFilled className="text-blue-500" />}
        falseIcon={<BookmarkOutline />}
      />
    </div>
  )
}
```
