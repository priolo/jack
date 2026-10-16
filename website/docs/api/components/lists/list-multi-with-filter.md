# ListMultiWithFilter

A multi-selection list component with built-in filtering, search capabilities, and advanced selection management.

## Import

```tsx
import { ListMultiWithFilter } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | `[]` | Array of items to display and filter |
| `selectedItems` | `T[]` | `[]` | Currently selected items |
| `onSelectionChange` | `(selected: T[]) => void` | - | Callback when selection changes |
| `renderItem` | `(item: T, selected: boolean, onToggle: () => void) => React.ReactNode` | - | Function to render each item |
| `filterFunction` | `(item: T, query: string) => boolean` | - | Custom filter function |
| `searchProperties` | `(keyof T)[]` | - | Properties to search within |
| `itemKey` | `string \| ((item: T) => string)` | `"id"` | Key property for item identification |
| `placeholder` | `string` | `"Search items..."` | Search input placeholder |
| `showSelectAll` | `boolean` | `true` | Whether to show select all checkbox |
| `showSelectedCount` | `boolean` | `true` | Whether to show count of selected items |
| `showClearAll` | `boolean` | `true` | Whether to show clear all button |
| `maxSelections` | `number` | - | Maximum number of selections allowed |
| `groupBy` | `keyof T \| ((item: T) => string)` | - | Property or function to group items |
| `sortBy` | `keyof T \| ((item: T) => any)` | - | Property or function to sort by |
| `sortDirection` | `"asc" \| "desc"` | `"asc"` | Sort direction |
| `caseSensitive` | `boolean` | `false` | Whether search is case sensitive |
| `debounceMs` | `number` | `300` | Search debounce delay |
| `emptyMessage` | `string \| React.ReactNode` | `"No items found"` | Message when no items match filter |
| `height` | `number \| string` | `300` | List container height |
| `className` | `string` | - | Additional CSS classes |

## Usage

### Basic Multi-Select with Filter

```tsx
const [selectedTags, setSelectedTags] = useState<Tag[]>([])

const tags = [
  { id: "1", name: "React", category: "Frontend" },
  { id: "2", name: "TypeScript", category: "Language" },
  { id: "3", name: "Node.js", category: "Backend" }
]

<ListMultiWithFilter
  items={tags}
  selectedItems={selectedTags}
  onSelectionChange={setSelectedTags}
  searchProperties={["name", "category"]}
  renderItem={(tag, selected, onToggle) => (
    <div className="tag-item">
      <Checkbox checked={selected} onChange={onToggle} />
      <span className="tag-name">{tag.name}</span>
      <Badge variant="secondary">{tag.category}</Badge>
    </div>
  )}
/>
```

### User Assignment List

```tsx
interface User {
  id: string
  name: string
  email: string
  department: string
  role: string
}

const [assignedUsers, setAssignedUsers] = useState<User[]>([])

<ListMultiWithFilter
  items={allUsers}
  selectedItems={assignedUsers}
  onSelectionChange={setAssignedUsers}
  searchProperties={["name", "email", "department"]}
  groupBy="department"
  maxSelections={5}
  renderItem={(user, selected, onToggle) => (
    <div className="user-item">
      <Checkbox checked={selected} onChange={onToggle} />
      <Avatar src={user.avatar} />
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-details">{user.email} • {user.role}</div>
      </div>
    </div>
  )}
/>
```

### Permission Selector

```tsx
interface Permission {
  id: string
  name: string
  description: string
  category: string
  level: "read" | "write" | "admin"
}

const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([])

<ListMultiWithFilter
  items={availablePermissions}
  selectedItems={selectedPermissions}
  onSelectionChange={setSelectedPermissions}
  searchProperties={["name", "description"]}
  groupBy="category"
  sortBy="name"
  filterFunction={(permission, query) => {
    return permission.name.toLowerCase().includes(query.toLowerCase()) ||
           permission.description.toLowerCase().includes(query.toLowerCase())
  }}
  renderItem={(permission, selected, onToggle) => (
    <div className="permission-item">
      <Checkbox checked={selected} onChange={onToggle} />
      <div className="permission-content">
        <div className="permission-name">{permission.name}</div>
        <div className="permission-description">{permission.description}</div>
      </div>
      <Badge variant={permission.level}>{permission.level}</Badge>
    </div>
  )}
  height={400}
/>
```

### Skills Selection

```tsx
const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])

<ListMultiWithFilter
  items={skillsDatabase}
  selectedItems={selectedSkills}
  onSelectionChange={setSelectedSkills}
  searchProperties={["name", "tags"]}
  groupBy="category"
  maxSelections={10}
  placeholder="Search skills..."
  renderItem={(skill, selected, onToggle) => (
    <div className={`skill-item ${selected ? 'selected' : ''}`}>
      <Checkbox checked={selected} onChange={onToggle} />
      <div className="skill-content">
        <span className="skill-name">{skill.name}</span>
        <div className="skill-tags">
          {skill.tags.map(tag => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="skill-level">
        <StarRating value={skill.difficulty} readOnly />
      </div>
    </div>
  )}
/>
```

### Product Categories Filter

```tsx
const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

<ListMultiWithFilter
  items={productCategories}
  selectedItems={selectedCategories}
  onSelectionChange={setSelectedCategories}
  searchProperties={["name", "description"]}
  sortBy="name"
  showSelectAll={true}
  showSelectedCount={true}
  renderItem={(category, selected, onToggle) => (
    <div className="category-item">
      <Checkbox checked={selected} onChange={onToggle} />
      <div className="category-icon">
        <CategoryIcon type={category.type} />
      </div>
      <div className="category-info">
        <div className="category-name">{category.name}</div>
        <div className="category-count">{category.productCount} products</div>
      </div>
    </div>
  )}
/>
```

## Features

- **Multi-Selection**: Select multiple items with checkboxes
- **Real-time Filtering**: Instant search with debouncing
- **Flexible Search**: Search across multiple properties
- **Group Support**: Group items by any property
- **Selection Limits**: Optional maximum selection constraints
- **Select All/Clear**: Bulk selection operations
- **Custom Filtering**: Override default filter logic
- **Sorting**: Sort items by any property

## Related Components

- [`List`](./list.md) - Basic list component
- [`ListObjects`](./list-objects.md) - Object-specific list features
- [`FindInput`](../inputs/find-input.md) - Search input component

## CSS Classes

- `.list-multi-filter` - Base component container
- `.list-multi-filter__header` - Header with search and controls
- `.list-multi-filter__search` - Search input container
- `.list-multi-filter__controls` - Selection controls (select all, clear)
- `.list-multi-filter__count` - Selected items count
- `.list-multi-filter__list` - Main list container
- `.list-multi-filter__group` - Group header
- `.list-multi-filter__item` - Individual list item
- `.list-multi-filter__item--selected` - Selected item styling
- `.list-multi-filter__empty` - Empty state message

## Accessibility

- Full keyboard navigation support
- Screen reader announcements for selection changes
- Proper ARIA labels and roles
- Focus management for search and selection
- Group headers with proper semantics

## Common Patterns

### Team Member Assignment

```tsx
const ProjectMemberSelector = ({ project, onAssign }: { project: Project, onAssign: (users: User[]) => void }) => {
  const [selectedMembers, setSelectedMembers] = useState<User[]>(project.members)
  const [availableUsers] = useState<User[]>(getAllUsers())
  
  const handleSelectionChange = (selected: User[]) => {
    setSelectedMembers(selected)
    onAssign(selected)
  }
  
  return (
    <div className="member-selector">
      <h3>Assign Team Members</h3>
      <ListMultiWithFilter
        items={availableUsers}
        selectedItems={selectedMembers}
        onSelectionChange={handleSelectionChange}
        searchProperties={["name", "email", "department"]}
        groupBy="department"
        maxSelections={project.maxMembers}
        renderItem={(user, selected, onToggle) => (
          <div className="member-option">
            <Checkbox checked={selected} onChange={onToggle} />
            <Avatar src={user.avatar} size="sm" />
            <div className="member-info">
              <div className="member-name">{user.name}</div>
              <div className="member-role">{user.role} • {user.department}</div>
            </div>
            <div className="member-availability">
              <AvailabilityIndicator user={user} />
            </div>
          </div>
        )}
      />
    </div>
  )
}
```

### Feature Flags Configuration

```tsx
const FeatureFlagSelector = ({ currentFlags, onFlagsChange }: { currentFlags: FeatureFlag[], onFlagsChange: (flags: FeatureFlag[]) => void }) => {
  return (
    <div className="feature-flags">
      <h3>Enable Features</h3>
      <ListMultiWithFilter
        items={allFeatureFlags}
        selectedItems={currentFlags}
        onSelectionChange={onFlagsChange}
        searchProperties={["name", "description", "category"]}
        groupBy="category"
        renderItem={(flag, selected, onToggle) => (
          <div className="feature-flag">
            <Checkbox checked={selected} onChange={onToggle} />
            <div className="flag-content">
              <div className="flag-header">
                <span className="flag-name">{flag.name}</span>
                <Badge variant={flag.stability}>{flag.stability}</Badge>
              </div>
              <div className="flag-description">{flag.description}</div>
            </div>
            <div className="flag-impact">
              <ImpactIndicator level={flag.impact} />
            </div>
          </div>
        )}
      />
    </div>
  )
}
```

### Content Tagging System

```tsx
const ContentTagger = ({ content, onTagsChange }: { content: Content, onTagsChange: (tags: Tag[]) => void }) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(content.tags)
  
  return (
    <div className="content-tagger">
      <h4>Add Tags</h4>
      <ListMultiWithFilter
        items={availableTags}
        selectedItems={selectedTags}
        onSelectionChange={(tags) => {
          setSelectedTags(tags)
          onTagsChange(tags)
        }}
        searchProperties={["name", "description"]}
        groupBy="category"
        maxSelections={15}
        placeholder="Search tags..."
        renderItem={(tag, selected, onToggle) => (
          <div className="tag-option">
            <Checkbox checked={selected} onChange={onToggle} />
            <div className="tag-color" style={{ backgroundColor: tag.color }} />
            <div className="tag-info">
              <span className="tag-name">{tag.name}</span>
              <span className="tag-usage">{tag.usageCount} uses</span>
            </div>
          </div>
        )}
        height={250}
      />
    </div>
  )
}
```
