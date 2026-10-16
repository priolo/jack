# FindInput

A specialized search input component with filtering capabilities and search suggestions.

## Import

```tsx
import { FindInput } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current search value |
| `onChange` | `(value: string) => void` | - | Callback when value changes |
| `onSearch` | `(query: string) => void` | - | Callback when search is triggered |
| `placeholder` | `string` | `"Search..."` | Placeholder text |
| `suggestions` | `string[]` | - | Search suggestions to display |
| `onSuggestionSelect` | `(suggestion: string) => void` | - | Callback when suggestion is selected |
| `showClearButton` | `boolean` | `true` | Whether to show clear button |
| `debounceMs` | `number` | `300` | Debounce delay for search |
| `minSearchLength` | `number` | `0` | Minimum characters before search |
| `maxSuggestions` | `number` | `10` | Maximum suggestions to show |
| `caseSensitive` | `boolean` | `false` | Whether search is case sensitive |
| `highlightMatch` | `boolean` | `true` | Whether to highlight matching text |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Input style variant |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `autoFocus` | `boolean` | `false` | Whether to auto-focus on mount |
| `className` | `string` | - | Additional CSS classes |

## Usage

### Basic Search Input

```tsx
const [searchQuery, setSearchQuery] = useState("")

<FindInput
  value={searchQuery}
  onChange={setSearchQuery}
  onSearch={(query) => console.log("Searching for:", query)}
  placeholder="Search products..."
/>
```

### Search with Suggestions

```tsx
const [query, setQuery] = useState("")
const [suggestions] = useState([
  "React components",
  "React hooks",
  "React tutorial",
  "JavaScript",
  "TypeScript"
])

<FindInput
  value={query}
  onChange={setQuery}
  suggestions={suggestions}
  onSuggestionSelect={setQuery}
  placeholder="Search documentation..."
/>
```

### Advanced Search Configuration

```tsx
<FindInput
  value={searchTerm}
  onChange={setSearchTerm}
  onSearch={handleSearch}
  debounceMs={500}
  minSearchLength={2}
  maxSuggestions={5}
  caseSensitive={false}
  highlightMatch={true}
  showClearButton={true}
/>
```

### Compact Search

```tsx
<FindInput
  value={query}
  onChange={setQuery}
  size="sm"
  variant="filled"
  placeholder="Quick search"
  showClearButton={false}
/>
```

### Disabled Search

```tsx
<FindInput
  value=""
  onChange={() => {}}
  disabled={true}
  placeholder="Search disabled"
/>
```

## Features

- **Debounced Search**: Configurable debounce timing
- **Auto-suggestions**: Display and select from suggestions
- **Clear Button**: Quick clear functionality
- **Highlight Matching**: Visual highlighting of search terms
- **Keyboard Navigation**: Arrow keys for suggestion navigation
- **Minimum Length**: Configurable minimum search length
- **Case Sensitivity**: Toggle case-sensitive search

## Related Components

- [`TextInput`](./text-input.md) - General text input component
- [`NumberInput`](./number-input.md) - Numeric input component

## CSS Classes

- `.find-input` - Base search container class
- `.find-input__field` - Input field styling
- `.find-input__icon` - Search icon styling
- `.find-input__clear` - Clear button styling
- `.find-input__suggestions` - Suggestions dropdown
- `.find-input__suggestion` - Individual suggestion item
- `.find-input__suggestion--highlighted` - Highlighted suggestion
- `.find-input__match` - Highlighted matching text
- `.find-input--sm`, `.find-input--md`, `.find-input--lg` - Size variants
- `.find-input--outline`, `.find-input--filled`, `.find-input--ghost` - Style variants

## Accessibility

- Uses `role="searchbox"` for proper semantics
- Includes `aria-expanded` for suggestion dropdown
- Keyboard navigation (Tab, Arrow keys, Enter, Escape)
- Screen reader announcements for suggestions
- Focus management and indicators

## Common Patterns

### Document Search

```tsx
const DocumentSearch = ({ documents }: { documents: Document[] }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Document[]>([])
  
  const searchDocuments = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    
    const filtered = documents.filter(doc =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setResults(filtered)
  }, [documents])
  
  const suggestions = documents
    .map(doc => doc.title)
    .filter(title => title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)
  
  return (
    <div>
      <FindInput
        value={query}
        onChange={setQuery}
        onSearch={searchDocuments}
        suggestions={suggestions}
        onSuggestionSelect={setQuery}
        placeholder="Search documents..."
      />
      <SearchResults results={results} />
    </div>
  )
}
```

### Live Filter

```tsx
const LiveFilter = ({ items }: { items: Item[] }) => {
  const [filter, setFilter] = useState("")
  
  const filteredItems = useMemo(() => {
    if (!filter) return items
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [items, filter])
  
  return (
    <div>
      <FindInput
        value={filter}
        onChange={setFilter}
        placeholder="Filter items..."
        debounceMs={100}
        size="sm"
      />
      <ItemList items={filteredItems} />
    </div>
  )
}
```

### Command Palette

```tsx
const CommandPalette = ({ commands }: { commands: Command[] }) => {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  
  const suggestions = commands
    .filter(cmd => cmd.name.toLowerCase().includes(query.toLowerCase()))
    .map(cmd => cmd.name)
  
  const handleCommandSelect = (commandName: string) => {
    const command = commands.find(cmd => cmd.name === commandName)
    if (command) {
      command.execute()
      setIsOpen(false)
      setQuery("")
    }
  }
  
  return (
    <div className={`command-palette ${isOpen ? 'open' : ''}`}>
      <FindInput
        value={query}
        onChange={setQuery}
        suggestions={suggestions}
        onSuggestionSelect={handleCommandSelect}
        placeholder="Type a command..."
        autoFocus={isOpen}
        variant="ghost"
      />
    </div>
  )
}
```
