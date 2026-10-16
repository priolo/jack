# MarkdownEditor

A rich text editor component with markdown support, preview capabilities, and formatting tools.

## Import

```tsx
import { MarkdownEditor } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current markdown content |
| `onChange` | `(value: string) => void` | - | Callback when content changes |
| `placeholder` | `string` | `"Start writing..."` | Placeholder text for empty editor |
| `height` | `number \| string` | `300` | Editor height |
| `showPreview` | `boolean` | `true` | Whether to show preview toggle |
| `defaultPreview` | `boolean` | `false` | Whether to start in preview mode |
| `showToolbar` | `boolean` | `true` | Whether to show formatting toolbar |
| `toolbarItems` | `ToolbarItem[]` | - | Custom toolbar configuration |
| `disabled` | `boolean` | `false` | Whether editor is disabled |
| `readOnly` | `boolean` | `false` | Whether editor is read-only |
| `autoFocus` | `boolean` | `false` | Whether to auto-focus on mount |
| `tabSize` | `number` | `2` | Tab size for indentation |
| `lineNumbers` | `boolean` | `false` | Whether to show line numbers |
| `lineWrapping` | `boolean` | `true` | Whether to wrap long lines |
| `spellCheck` | `boolean` | `true` | Whether to enable spell checking |
| `syntaxHighlight` | `boolean` | `true` | Whether to highlight markdown syntax |
| `onSave` | `() => void` | - | Callback for save action (Ctrl+S) |
| `className` | `string` | - | Additional CSS classes |

## Usage

### Basic Markdown Editor

```tsx
const [content, setContent] = useState("# Hello World\n\nStart writing your markdown here...")

<MarkdownEditor
  value={content}
  onChange={setContent}
  placeholder="Write something amazing..."
/>
```

### Compact Editor (No Toolbar)

```tsx
<MarkdownEditor
  value={content}
  onChange={setContent}
  showToolbar={false}
  showPreview={false}
  height={200}
  placeholder="Quick note..."
/>
```

### Preview-First Editor

```tsx
<MarkdownEditor
  value={content}
  onChange={setContent}
  defaultPreview={true}
  height="400px"
/>
```

### Custom Toolbar Configuration

```tsx
const customToolbar = [
  'bold', 'italic', 'heading',
  '|',
  'quote', 'code', 'link',
  '|',
  'preview'
]

<MarkdownEditor
  value={content}
  onChange={setContent}
  toolbarItems={customToolbar}
/>
```

### Read-Only Viewer

```tsx
<MarkdownEditor
  value={documentation}
  onChange={() => {}}
  readOnly={true}
  showToolbar={false}
  defaultPreview={true}
/>
```

## Features

- **Live Preview**: Split view with markdown source and rendered preview
- **Formatting Toolbar**: Quick access to common markdown formatting
- **Syntax Highlighting**: Color-coded markdown syntax
- **Keyboard Shortcuts**: Standard text editing shortcuts
- **Auto-completion**: Smart completion for markdown syntax
- **Line Numbers**: Optional line numbering
- **Spell Check**: Built-in spell checking support
- **Export Options**: Save as markdown or HTML

## Toolbar Items

Available toolbar items:
- `bold` - Bold text formatting
- `italic` - Italic text formatting
- `heading` - Heading levels (H1-H6)
- `quote` - Blockquote formatting
- `code` - Inline and block code
- `link` - Link insertion
- `image` - Image insertion
- `list` - Unordered list
- `ordered-list` - Ordered list
- `table` - Table insertion
- `hr` - Horizontal rule
- `preview` - Toggle preview mode
- `fullscreen` - Fullscreen mode
- `|` - Separator

## Related Components

- [`TextInput`](./text-input.md) - Simple text input
- [`FindInput`](./find-input.md) - Search input with filtering

## CSS Classes

- `.markdown-editor` - Base editor container
- `.markdown-editor__toolbar` - Toolbar container
- `.markdown-editor__toolbar-item` - Individual toolbar button
- `.markdown-editor__content` - Main content area
- `.markdown-editor__editor` - Editor pane
- `.markdown-editor__preview` - Preview pane
- `.markdown-editor__line-numbers` - Line numbers container
- `.markdown-editor--split` - Split view mode
- `.markdown-editor--preview-only` - Preview-only mode
- `.markdown-editor--fullscreen` - Fullscreen mode

## Accessibility

- Uses proper ARIA labels for toolbar buttons
- Keyboard navigation for all features
- Screen reader announcements for mode changes
- Focus management between editor and preview
- High contrast support

## Keyboard Shortcuts

- `Ctrl+B` / `Cmd+B` - Bold
- `Ctrl+I` / `Cmd+I` - Italic
- `Ctrl+K` / `Cmd+K` - Insert link
- `Ctrl+S` / `Cmd+S` - Save (triggers onSave)
- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Y` / `Cmd+Y` - Redo
- `Tab` - Indent
- `Shift+Tab` - Outdent
- `Ctrl+/` / `Cmd+/` - Toggle comment

## Common Patterns

### Blog Post Editor

```tsx
const BlogPostEditor = () => {
  const [post, setPost] = useState({
    title: "",
    content: "# New Post\n\nStart writing your blog post here...",
    tags: []
  })
  
  const handleSave = () => {
    // Save post logic
    console.log("Saving post:", post)
  }
  
  return (
    <div className="blog-editor">
      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
        placeholder="Post title..."
        className="title-input"
      />
      
      <MarkdownEditor
        value={post.content}
        onChange={(content) => setPost(prev => ({ ...prev, content }))}
        onSave={handleSave}
        height={500}
        placeholder="Write your blog post..."
      />
    </div>
  )
}
```

### Documentation Editor

```tsx
const DocumentationEditor = ({ doc }: { doc: DocPage }) => {
  const [content, setContent] = useState(doc.content)
  const [isPreview, setIsPreview] = useState(false)
  
  return (
    <div className="doc-editor">
      <div className="doc-header">
        <h2>{doc.title}</h2>
        <button onClick={() => setIsPreview(!isPreview)}>
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      
      <MarkdownEditor
        value={content}
        onChange={setContent}
        defaultPreview={isPreview}
        height="calc(100vh - 200px)"
        lineNumbers={true}
        toolbarItems={[
          'bold', 'italic', 'heading',
          '|',
          'link', 'image', 'code',
          '|',
          'table', 'list', 'ordered-list',
          '|',
          'preview', 'fullscreen'
        ]}
      />
    </div>
  )
}
```

### Comment System

```tsx
const CommentEditor = ({ onSubmit }: { onSubmit: (content: string) => void }) => {
  const [comment, setComment] = useState("")
  
  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment)
      setComment("")
    }
  }
  
  return (
    <div className="comment-editor">
      <MarkdownEditor
        value={comment}
        onChange={setComment}
        height={150}
        showToolbar={true}
        showPreview={false}
        placeholder="Write a comment... (Markdown supported)"
        toolbarItems={['bold', 'italic', 'code', 'link']}
      />
      
      <div className="comment-actions">
        <button onClick={handleSubmit} disabled={!comment.trim()}>
          Post Comment
        </button>
      </div>
    </div>
  )
}
```
