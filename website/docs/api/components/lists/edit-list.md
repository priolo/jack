# EditList

An editable list component that allows users to add, remove, and modify list items with built-in form controls.

## Import

```tsx
import { EditList } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | `[]` | Array of items to display |
| `onChange` | `(items: T[]) => void` | - | Callback when items array changes |
| `renderItem` | `(item: T, index: number, onEdit: (item: T) => void, onDelete: () => void) => React.ReactNode` | - | Function to render each item with edit/delete actions |
| `renderNewItem` | `(onAdd: (item: T) => void, onCancel: () => void) => React.ReactNode` | - | Function to render new item form |
| `newItemTemplate` | `() => T` | - | Function to create a new item template |
| `allowAdd` | `boolean` | `true` | Whether to allow adding new items |
| `allowEdit` | `boolean` | `true` | Whether to allow editing items |
| `allowDelete` | `boolean` | `true` | Whether to allow deleting items |
| `allowReorder` | `boolean` | `false` | Whether to allow drag-and-drop reordering |
| `maxItems` | `number` | - | Maximum number of items allowed |
| `minItems` | `number` | `0` | Minimum number of items required |
| `validateItem` | `(item: T) => string \| undefined` | - | Function to validate individual items |
| `sortable` | `boolean` | `false` | Whether list items can be sorted |
| `sortBy` | `keyof T \| ((item: T) => any)` | - | Property or function to sort by |
| `sortDirection` | `"asc" \| "desc"` | `"asc"` | Sort direction |
| `emptyMessage` | `string \| React.ReactNode` | `"No items"` | Message when list is empty |
| `addButtonText` | `string` | `"Add Item"` | Text for add button |
| `confirmDelete` | `boolean` | `true` | Whether to confirm before deleting |
| `className` | `string` | - | Additional CSS classes |

## Usage

### Basic Editable List

```tsx
const [tags, setTags] = useState<string[]>(["React", "TypeScript"])

<EditList
  items={tags}
  onChange={setTags}
  renderItem={(tag, index, onEdit, onDelete) => (
    <div className="tag-item">
      <span>{tag}</span>
      <div className="actions">
        <IconButton icon={<EditIcon />} onClick={() => onEdit(tag)} />
        <IconButton icon={<DeleteIcon />} onClick={onDelete} />
      </div>
    </div>
  )}
  renderNewItem={(onAdd, onCancel) => (
    <TagInput onSubmit={onAdd} onCancel={onCancel} />
  )}
  newItemTemplate={() => ""}
/>
```

### Contact List Editor

```tsx
interface Contact {
  id: string
  name: string
  email: string
  phone: string
}

const [contacts, setContacts] = useState<Contact[]>([])

const renderContact = (contact: Contact, index: number, onEdit: (contact: Contact) => void, onDelete: () => void) => (
  <div className="contact-item">
    <div className="contact-info">
      <div className="contact-name">{contact.name}</div>
      <div className="contact-details">
        {contact.email} • {contact.phone}
      </div>
    </div>
    <div className="contact-actions">
      <Button variant="ghost" onClick={() => onEdit(contact)}>Edit</Button>
      <Button variant="ghost" onClick={onDelete}>Delete</Button>
    </div>
  </div>
)

const renderNewContact = (onAdd: (contact: Contact) => void, onCancel: () => void) => (
  <ContactForm 
    onSubmit={onAdd} 
    onCancel={onCancel}
    initialData={{ id: "", name: "", email: "", phone: "" }}
  />
)

<EditList
  items={contacts}
  onChange={setContacts}
  renderItem={renderContact}
  renderNewItem={renderNewContact}
  newItemTemplate={() => ({ id: generateId(), name: "", email: "", phone: "" })}
  validateItem={(contact) => {
    if (!contact.name) return "Name is required"
    if (!contact.email) return "Email is required"
    return undefined
  }}
/>
```

### Todo List with Reordering

```tsx
interface Todo {
  id: string
  text: string
  completed: boolean
  priority: "low" | "medium" | "high"
}

<EditList
  items={todos}
  onChange={setTodos}
  allowReorder={true}
  renderItem={(todo, index, onEdit, onDelete) => (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <DragHandle />
      <Checkbox 
        checked={todo.completed}
        onChange={(completed) => onEdit({ ...todo, completed })}
      />
      <span>{todo.text}</span>
      <Badge variant={todo.priority}>{todo.priority}</Badge>
      <IconButton icon={<EditIcon />} onClick={() => onEdit(todo)} />
      <IconButton icon={<DeleteIcon />} onClick={onDelete} />
    </div>
  )}
  renderNewItem={(onAdd, onCancel) => (
    <TodoForm onSubmit={onAdd} onCancel={onCancel} />
  )}
  newItemTemplate={() => ({ 
    id: generateId(), 
    text: "", 
    completed: false, 
    priority: "medium" 
  })}
/>
```

### Skills List with Limits

```tsx
const [skills, setSkills] = useState<string[]>([])

<EditList
  items={skills}
  onChange={setSkills}
  maxItems={10}
  minItems={1}
  renderItem={(skill, index, onEdit, onDelete) => (
    <div className="skill-item">
      <span>{skill}</span>
      <IconButton icon={<CloseIcon />} onClick={onDelete} />
    </div>
  )}
  renderNewItem={(onAdd, onCancel) => (
    <div className="skill-input">
      <TextInput
        placeholder="Enter skill..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onAdd(e.currentTarget.value)
            e.currentTarget.value = ""
          }
          if (e.key === 'Escape') onCancel()
        }}
        autoFocus
      />
    </div>
  )}
  newItemTemplate={() => ""}
  addButtonText="Add Skill"
/>
```

## Features

- **Full CRUD Operations**: Add, edit, delete, and reorder items
- **Drag-and-Drop**: Optional reordering with visual feedback
- **Validation**: Item-level validation with error messages
- **Limits**: Min/max item constraints
- **Customizable Rendering**: Full control over item and form rendering
- **Confirmation Dialogs**: Optional delete confirmation
- **Keyboard Support**: Full keyboard navigation and shortcuts

## Related Components

- [`List`](./list.md) - Read-only list component
- [`ListObjects`](./list-objects.md) - Object-specific list features
- [`Dialog`](../dialogs/dialog.md) - For edit forms and confirmations

## CSS Classes

- `.edit-list` - Base edit list container
- `.edit-list__item` - Individual editable item
- `.edit-list__item--editing` - Item in edit mode
- `.edit-list__item--dragging` - Item being dragged
- `.edit-list__add-form` - New item form container
- `.edit-list__add-button` - Add new item button
- `.edit-list__actions` - Item action buttons container
- `.edit-list__drag-handle` - Drag handle for reordering
- `.edit-list__validation-error` - Validation error message

## Accessibility

- Uses proper ARIA labels for add/edit/delete actions
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader announcements for changes
- Focus management during edit operations
- Drag-and-drop keyboard alternatives

## Common Patterns

### Form Builder

```tsx
const FormBuilder = () => {
  const [fields, setFields] = useState<FormField[]>([])
  
  const renderField = (field: FormField, index: number, onEdit: (field: FormField) => void, onDelete: () => void) => (
    <div className="form-field-item">
      <div className="field-preview">
        <FormFieldPreview field={field} />
      </div>
      <div className="field-actions">
        <Button onClick={() => onEdit(field)}>Configure</Button>
        <Button onClick={onDelete}>Remove</Button>
      </div>
    </div>
  )
  
  const renderNewField = (onAdd: (field: FormField) => void, onCancel: () => void) => (
    <FieldTypeSelector onSelect={onAdd} onCancel={onCancel} />
  )
  
  return (
    <EditList
      items={fields}
      onChange={setFields}
      renderItem={renderField}
      renderNewItem={renderNewField}
      newItemTemplate={() => ({ id: generateId(), type: 'text', label: '', required: false })}
      allowReorder={true}
      addButtonText="Add Field"
    />
  )
}
```

### Recipe Ingredients

```tsx
const IngredientsList = ({ recipe, onUpdateRecipe }: { recipe: Recipe, onUpdateRecipe: (recipe: Recipe) => void }) => {
  const updateIngredients = (ingredients: Ingredient[]) => {
    onUpdateRecipe({ ...recipe, ingredients })
  }
  
  const renderIngredient = (ingredient: Ingredient, index: number, onEdit: (ingredient: Ingredient) => void, onDelete: () => void) => (
    <div className="ingredient-item">
      <span className="ingredient-amount">{ingredient.amount} {ingredient.unit}</span>
      <span className="ingredient-name">{ingredient.name}</span>
      <div className="ingredient-actions">
        <IconButton icon={<EditIcon />} onClick={() => onEdit(ingredient)} />
        <IconButton icon={<DeleteIcon />} onClick={onDelete} />
      </div>
    </div>
  )
  
  const renderNewIngredient = (onAdd: (ingredient: Ingredient) => void, onCancel: () => void) => (
    <IngredientForm onSubmit={onAdd} onCancel={onCancel} />
  )
  
  return (
    <EditList
      items={recipe.ingredients}
      onChange={updateIngredients}
      renderItem={renderIngredient}
      renderNewItem={renderNewIngredient}
      newItemTemplate={() => ({ id: generateId(), name: "", amount: 0, unit: "" })}
      validateItem={(ingredient) => {
        if (!ingredient.name) return "Ingredient name is required"
        if (ingredient.amount <= 0) return "Amount must be greater than 0"
        return undefined
      }}
      addButtonText="Add Ingredient"
    />
  )
}
```
