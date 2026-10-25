# MarkdownEditor

A plain-text markdown editor built on Slate, with Prism syntax highlighting of the markdown source. There is no toolbar and no preview: the value is the raw markdown string (one Slate paragraph per line).

## Import

```tsx
import { MarkdownEditor } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Current markdown content |
| `onChange` | `(value: string) => void` | - | Called with the markdown text when the user edits the content |
| `autofocus` | `boolean` | - | Whether to auto-focus on mount |
| `placeholder` | `string` | `"Enter markdown text..."` | Placeholder text for empty editor |
| `readOnly` | `boolean` | `false` | Whether editor is read-only |
| `style` | `React.CSSProperties` | - | Inline styles of the container |
| `className` | `string` | `""` | Additional CSS classes of the container |

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

### Read-Only Viewer

```tsx
<MarkdownEditor
  value={documentation}
  readOnly
/>
```

### Sized Editor

```tsx
<MarkdownEditor
  value={content}
  onChange={setContent}
  style={{ height: 300 }}
/>
```

## Features

- **Syntax Highlighting**: Prism tokens (bold, italic, code, link, title, strikethrough, punctuation, blockquote, hr) are styled
- **Controlled value**: Changing `value` from outside resets the editor content
- **Undo/Redo**: History provided by `slate-history`
- **Enter key**: Inserts a new paragraph (line)
- **Spell check**: Disabled

## Related Components

- [`TextInput`](./text-input.md) - Simple text input (supports `multiline`)
- [`FindInput`](./find-input.md) - Search input

## Common Patterns

### Blog Post Editor

```tsx
const BlogPostEditor = () => {
  const [post, setPost] = useState({
    title: "",
    content: "# New Post\n\nStart writing your blog post here...",
  })
  
  return (
    <div className="blog-editor">
      <TextInput
        value={post.title}
        onChange={(title) => setPost(prev => ({ ...prev, title }))}
        placeholder="Post title..."
      />
      
      <MarkdownEditor
        value={post.content}
        onChange={(content) => setPost(prev => ({ ...prev, content }))}
        placeholder="Write your blog post..."
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
        placeholder="Write a comment... (Markdown supported)"
      />
      <Button onClick={handleSubmit} disabled={!comment.trim()}>
        Post Comment
      </Button>
    </div>
  )
}
```
