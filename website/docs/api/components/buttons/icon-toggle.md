# IconToggle

A toggle button component that switches between two states with visual feedback and icon changes.

## Import

```tsx
import { IconToggle } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | `false` | Current toggle state |
| `onChange` | `(value: boolean) => void` | - | Callback when state changes |
| `iconOn` | `React.ReactNode` | - | Icon to show when toggled on |
| `iconOff` | `React.ReactNode` | - | Icon to show when toggled off |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Button size |
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"ghost"` | Button style variant |
| `disabled` | `boolean` | `false` | Whether the toggle is disabled |
| `className` | `string` | - | Additional CSS classes |
| `title` | `string` | - | Tooltip text |

## Usage

### Basic Toggle

```tsx
const [isLiked, setIsLiked] = useState(false)

<IconToggle
  value={isLiked}
  onChange={setIsLiked}
  iconOn={<HeartFilled />}
  iconOff={<HeartOutline />}
/>
```

### Bookmark Toggle

```tsx
const [isBookmarked, setIsBookmarked] = useState(false)

<IconToggle
  value={isBookmarked}
  onChange={setIsBookmarked}
  iconOn={<BookmarkFilled />}
  iconOff={<BookmarkOutline />}
  title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
/>
```

### Theme Toggle

```tsx
const [isDark, setIsDark] = useState(false)

<IconToggle
  value={isDark}
  onChange={setIsDark}
  iconOn={<SunIcon />}
  iconOff={<MoonIcon />}
  size="lg"
  variant="primary"
/>
```

### Visibility Toggle

```tsx
const [isVisible, setIsVisible] = useState(false)

<IconToggle
  value={isVisible}
  onChange={setIsVisible}
  iconOn={<EyeIcon />}
  iconOff={<EyeOffIcon />}
  disabled={!canToggle}
/>
```

## Features

- **Dual State Icons**: Different icons for on/off states
- **Smooth Transitions**: Animated state changes
- **Accessibility**: Full keyboard and screen reader support
- **Size Variants**: Multiple size options
- **Disabled State**: Support for disabled interaction
- **Custom Styling**: Flexible appearance customization

## Related Components

- [`Button`](./button.md) - Base button component
- [`IconButton`](./icon-button.md) - Single-state icon button

## CSS Classes

- `.icon-toggle` - Base toggle class
- `.icon-toggle--xs`, `.icon-toggle--sm`, `.icon-toggle--md`, `.icon-toggle--lg` - Size variants
- `.icon-toggle--primary`, `.icon-toggle--secondary`, `.icon-toggle--ghost` - Style variants
- `.icon-toggle--on` - Applied when toggle is active
- `.icon-toggle--off` - Applied when toggle is inactive
- `.icon-toggle--disabled` - Applied when disabled

## Accessibility

- Uses `role="switch"` for proper semantics
- Includes `aria-checked` attribute
- Keyboard accessible (Space/Enter to toggle)
- Focus indicators for keyboard navigation
- Screen reader announcements for state changes

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
        <IconToggle
          value={notifications}
          onChange={setNotifications}
          iconOn={<BellIcon />}
          iconOff={<BellOffIcon />}
        />
      </div>
      <div className="setting-item">
        <span>Dark Mode</span>
        <IconToggle
          value={darkMode}
          onChange={setDarkMode}
          iconOn={<SunIcon />}
          iconOff={<MoonIcon />}
        />
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
        value={liked}
        onChange={setLiked}
        iconOn={<HeartFilled className="text-red-500" />}
        iconOff={<HeartOutline />}
        size="sm"
      />
      <IconToggle
        value={bookmarked}
        onChange={setBookmarked}
        iconOn={<BookmarkFilled className="text-blue-500" />}
        iconOff={<BookmarkOutline />}
        size="sm"
      />
    </div>
  )
}
```
