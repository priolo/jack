# DocsStore

A specialized store for managing document-related functionality in the Jack framework. DocsStore handles document metadata, content management, version control, and document-specific operations.

## Import

```typescript
import { DocsStore, docsSetup } from "@priolo/jack"
import { createStore } from "@priolo/jon"
```

## Creating a DocsStore

### Basic Setup

```typescript
// Create a docs store instance
const docStore = createStore(docsSetup) as DocsStore

// Use in a document management card
const DocumentCard = ({ store }: { store: DocsStore }) => {
  const state = useStore(store)
  
  return (
    <FrameworkCard store={store}>
      <div className="document-manager">
        <h3>{state.title}</h3>
        <div>Status: {state.status}</div>
        <div>Modified: {state.lastModified}</div>
      </div>
    </FrameworkCard>
  )
}
```

### With Custom Configuration

```typescript
import { docsSetup, viewSetup } from "@priolo/jack"
import { mixStores } from "@priolo/jon"

const customDocsSetup = mixStores(viewSetup, docsSetup, {
  state: {
    customMetadata: {},
    permissions: {
      read: true,
      write: false,
      delete: false,
    },
  },
  mutators: {
    setCustomMetadata: (metadata: any) => ({ customMetadata: metadata }),
    setPermissions: (permissions: any) => ({ permissions }),
  },
})

const docStore = createStore(customDocsSetup) as DocsStore
```

## State Properties

| Property | Type | Description |
|----------|------|-------------|
| `title` | `string` | Document title |
| `content` | `string` | Document content/body |
| `status` | `DocumentStatus` | Current document status |
| `lastModified` | `Date` | Last modification timestamp |
| `author` | `string` | Document author |
| `version` | `number` | Document version number |
| `tags` | `string[]` | Associated tags |
| `path` | `string` | Document file path or URL |
| `size` | `number` | Document size in bytes |
| `isDirty` | `boolean` | Whether document has unsaved changes |
| `isLoading` | `boolean` | Loading state indicator |
| `error` | `string \| null` | Error message if any |

## Document Status Types

```typescript
type DocumentStatus = 
  | "draft"
  | "published"
  | "archived"
  | "deleted"
  | "locked"
  | "review"
```

## Mutators

### Content Management

#### `setTitle(title: string): void`
Sets the document title.

```typescript
docStore.setTitle("New Document Title")
```

#### `setContent(content: string): void`
Updates the document content.

```typescript
docStore.setContent("# My Document\n\nThis is the content...")
```

#### `appendContent(content: string): void`
Appends content to the existing document.

```typescript
docStore.appendContent("\n\nAdditional paragraph.")
```

#### `setStatus(status: DocumentStatus): void`
Changes the document status.

```typescript
docStore.setStatus("published")
```

### Metadata Management

#### `setAuthor(author: string): void`
Sets the document author.

```typescript
docStore.setAuthor("John Doe")
```

#### `setTags(tags: string[]): void`
Updates document tags.

```typescript
docStore.setTags(["javascript", "react", "documentation"])
```

#### `addTag(tag: string): void`
Adds a single tag to the document.

```typescript
docStore.addTag("typescript")
```

#### `removeTag(tag: string): void`
Removes a tag from the document.

```typescript
docStore.removeTag("deprecated")
```

### File Operations

#### `setPath(path: string): void`
Sets the document file path.

```typescript
docStore.setPath("/documents/my-doc.md")
```

#### `setSize(size: number): void`
Updates the document size.

```typescript
docStore.setSize(1024) // Size in bytes
```

### State Management

#### `setDirty(isDirty: boolean): void`
Marks document as having unsaved changes.

```typescript
docStore.setDirty(true) // Has unsaved changes
docStore.setDirty(false) // All changes saved
```

#### `setLoading(isLoading: boolean): void`
Sets the loading state.

```typescript
docStore.setLoading(true) // Start loading
docStore.setLoading(false) // Loading complete
```

#### `setError(error: string | null): void`
Sets or clears error state.

```typescript
docStore.setError("Failed to save document")
docStore.setError(null) // Clear error
```

### Version Control

#### `incrementVersion(): void`
Increments the document version number.

```typescript
docStore.incrementVersion() // version: 1 -> 2
```

#### `setVersion(version: number): void`
Sets a specific version number.

```typescript
docStore.setVersion(3)
```

## Advanced Usage

### Document Loading and Saving

```typescript
const DocumentManager = ({ store }: { store: DocsStore }) => {
  const state = useStore(store)

  const loadDocument = async (path: string) => {
    store.setLoading(true)
    store.setError(null)
    
    try {
      const response = await fetch(`/api/documents${path}`)
      const docData = await response.json()
      
      store.setTitle(docData.title)
      store.setContent(docData.content)
      store.setAuthor(docData.author)
      store.setTags(docData.tags)
      store.setVersion(docData.version)
      store.setPath(path)
      store.setDirty(false)
    } catch (error) {
      store.setError("Failed to load document")
    } finally {
      store.setLoading(false)
    }
  }

  const saveDocument = async () => {
    if (!state.isDirty) return

    store.setLoading(true)
    store.setError(null)

    try {
      const response = await fetch(`/api/documents${state.path}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: state.title,
          content: state.content,
          tags: state.tags,
          version: state.version + 1,
        }),
      })

      if (response.ok) {
        store.incrementVersion()
        store.setDirty(false)
      } else {
        throw new Error('Save failed')
      }
    } catch (error) {
      store.setError("Failed to save document")
    } finally {
      store.setLoading(false)
    }
  }

  return (
    <FrameworkCard store={store}>
      <div className="document-editor">
        <div className="toolbar">
          <input
            value={state.title}
            onChange={(e) => {
              store.setTitle(e.target.value)
              store.setDirty(true)
            }}
            placeholder="Document title"
          />
          <button onClick={saveDocument} disabled={!state.isDirty}>
            Save {state.isDirty && "*"}
          </button>
          <span>v{state.version}</span>
        </div>
        
        <textarea
          value={state.content}
          onChange={(e) => {
            store.setContent(e.target.value)
            store.setDirty(true)
          }}
          placeholder="Document content..."
          className="content-editor"
        />
        
        <div className="metadata">
          <div>Author: {state.author}</div>
          <div>Status: {state.status}</div>
          <div>Tags: {state.tags.join(", ")}</div>
          <div>Size: {state.size} bytes</div>
        </div>
        
        {state.error && (
          <div className="error">{state.error}</div>
        )}
        
        {state.isLoading && (
          <div className="loading">Loading...</div>
        )}
      </div>
    </FrameworkCard>
  )
}
```

### Document Browser

```typescript
const DocumentBrowser = ({ store }: { store: DocsStore }) => {
  const [documents, setDocuments] = useState<any[]>([])

  const openDocument = (doc: any) => {
    // Create new document card
    const docCard = createStore(docsSetup) as DocsStore
    docCard.setTitle(doc.title)
    docCard.setContent(doc.content)
    docCard.setPath(doc.path)
    docCard.setAuthor(doc.author)
    docCard.setTags(doc.tags)
    docCard.setVersion(doc.version)
    
    // Add to deck
    const deck = store.state.group
    deck.add({ view: docCard, anim: true })
  }

  return (
    <FrameworkCard store={store}>
      <div className="document-browser">
        <h3>Documents</h3>
        <div className="document-list">
          {documents.map(doc => (
            <div 
              key={doc.id}
              className="document-item"
              onClick={() => openDocument(doc)}
            >
              <div className="title">{doc.title}</div>
              <div className="meta">
                {doc.author} • {doc.status} • v{doc.version}
              </div>
              <div className="tags">
                {doc.tags.map((tag: string) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FrameworkCard>
  )
}
```

### Auto-Save Functionality

```typescript
const useAutoSave = (store: DocsStore, interval: number = 30000) => {
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (store.state.isDirty && !store.state.isLoading) {
        // Auto-save logic
        saveDocument(store)
      }
    }, interval)

    return () => clearInterval(autoSave)
  }, [store, interval])
}

const AutoSaveDocument = ({ store }: { store: DocsStore }) => {
  useAutoSave(store) // Auto-save every 30 seconds

  return <DocumentManager store={store} />
}
```

### Document Search and Filtering

```typescript
const DocumentSearch = ({ store }: { store: DocsStore }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredDocs, setFilteredDocs] = useState<any[]>([])

  const searchDocuments = async (term: string) => {
    if (!term.trim()) {
      setFilteredDocs([])
      return
    }

    store.setLoading(true)
    try {
      const response = await fetch(`/api/documents/search?q=${term}`)
      const results = await response.json()
      setFilteredDocs(results)
    } catch (error) {
      store.setError("Search failed")
    } finally {
      store.setLoading(false)
    }
  }

  return (
    <FrameworkCard store={store}>
      <div className="document-search">
        <FindInput
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value)
            searchDocuments(value)
          }}
          placeholder="Search documents..."
        />
        
        <div className="search-results">
          {filteredDocs.map(doc => (
            <div key={doc.id} className="search-result">
              <div className="title">{doc.title}</div>
              <div className="snippet">{doc.snippet}</div>
              <div className="path">{doc.path}</div>
            </div>
          ))}
        </div>
      </div>
    </FrameworkCard>
  )
}
```

## Integration Patterns

### With Markdown Editor

```typescript
const MarkdownDocument = ({ store }: { store: DocsStore }) => {
  const state = useStore(store)

  return (
    <FrameworkCard store={store}>
      <div className="markdown-document">
        <TextInput
          value={state.title}
          onChange={(title) => {
            store.setTitle(title)
            store.setDirty(true)
          }}
          placeholder="Document title"
        />
        
        <MarkdownEditor
          value={state.content}
          onChange={(content) => {
            store.setContent(content)
            store.setDirty(true)
            store.setSize(content.length)
          }}
          placeholder="Write your markdown content..."
        />
        
        <div className="status-bar">
          <span>Words: {state.content.split(/\s+/).length}</span>
          <span>Characters: {state.content.length}</span>
          <span>Status: {state.status}</span>
          {state.isDirty && <span className="dirty">•</span>}
        </div>
      </div>
    </FrameworkCard>
  )
}
```

### Document Collaboration

```typescript
const CollaborativeDocument = ({ store }: { store: DocsStore }) => {
  const [collaborators, setCollaborators] = useState<string[]>([])
  
  useEffect(() => {
    // WebSocket connection for real-time collaboration
    const ws = new WebSocket(`/ws/documents/${store.state.path}`)
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      switch (data.type) {
        case 'content-update':
          store.setContent(data.content)
          break
        case 'collaborators-update':
          setCollaborators(data.collaborators)
          break
        case 'version-update':
          store.setVersion(data.version)
          break
      }
    }
    
    return () => ws.close()
  }, [store])

  return (
    <FrameworkCard store={store}>
      <div className="collaborative-document">
        <div className="collaborators">
          Active: {collaborators.join(", ")}
        </div>
        <MarkdownDocument store={store} />
      </div>
    </FrameworkCard>
  )
}
```

## Performance Optimization

### Debounced Updates

```typescript
import { debounce } from "lodash"

const useDebounceContentUpdate = (store: DocsStore) => {
  const debouncedSave = useMemo(
    () => debounce((content: string) => {
      store.setContent(content)
      store.setDirty(true)
    }, 300),
    [store]
  )

  return debouncedSave
}
```

### Content Chunking for Large Documents

```typescript
const LargeDocumentEditor = ({ store }: { store: DocsStore }) => {
  const [currentChunk, setCurrentChunk] = useState(0)
  const chunkSize = 10000 // Characters per chunk

  const getChunk = (content: string, chunkIndex: number) => {
    const start = chunkIndex * chunkSize
    const end = start + chunkSize
    return content.slice(start, end)
  }

  const updateChunk = (chunkContent: string) => {
    const fullContent = store.state.content
    const start = currentChunk * chunkSize
    const end = start + chunkSize
    
    const newContent = 
      fullContent.slice(0, start) + 
      chunkContent + 
      fullContent.slice(end)
    
    store.setContent(newContent)
    store.setDirty(true)
  }

  return (
    <FrameworkCard store={store}>
      <div className="large-document-editor">
        <div className="chunk-navigation">
          <button 
            onClick={() => setCurrentChunk(Math.max(0, currentChunk - 1))}
            disabled={currentChunk === 0}
          >
            Previous
          </button>
          <span>Chunk {currentChunk + 1}</span>
          <button 
            onClick={() => setCurrentChunk(currentChunk + 1)}
          >
            Next
          </button>
        </div>
        
        <textarea
          value={getChunk(store.state.content, currentChunk)}
          onChange={(e) => updateChunk(e.target.value)}
          className="chunk-editor"
        />
      </div>
    </FrameworkCard>
  )
}
```

## TypeScript Support

### Type Definitions

```typescript
interface DocsStore extends ViewStore {
  state: ViewStore['state'] & {
    title: string
    content: string
    status: DocumentStatus
    lastModified: Date
    author: string
    version: number
    tags: string[]
    path: string
    size: number
    isDirty: boolean
    isLoading: boolean
    error: string | null
  }
  
  // Content mutators
  setTitle(title: string): void
  setContent(content: string): void
  appendContent(content: string): void
  setStatus(status: DocumentStatus): void
  
  // Metadata mutators
  setAuthor(author: string): void
  setTags(tags: string[]): void
  addTag(tag: string): void
  removeTag(tag: string): void
  
  // File mutators
  setPath(path: string): void
  setSize(size: number): void
  
  // State mutators
  setDirty(isDirty: boolean): void
  setLoading(isLoading: boolean): void
  setError(error: string | null): void
  
  // Version mutators
  incrementVersion(): void
  setVersion(version: number): void
}

type DocumentStatus = 
  | "draft"
  | "published" 
  | "archived"
  | "deleted"
  | "locked"
  | "review"
```

### Generic Document Types

```typescript
interface TypedDocument<T = any> extends DocsStore {
  state: DocsStore['state'] & {
    documentType: string
    metadata: T
  }
}

// Usage with specific document types
interface ArticleMetadata {
  publishDate: Date
  readingTime: number
  category: string
}

const createArticleDocument = (): TypedDocument<ArticleMetadata> => {
  const setup = mixStores(docsSetup, {
    state: {
      documentType: "article",
      metadata: {
        publishDate: new Date(),
        readingTime: 0,
        category: "general",
      }
    }
  })
  
  return createStore(setup) as TypedDocument<ArticleMetadata>
}
```

## Best Practices

1. **Use isDirty flag for unsaved changes tracking**
2. **Implement auto-save for better user experience**
3. **Handle large documents with chunking or pagination**
4. **Use debouncing for content updates**
5. **Implement proper error handling**
6. **Track document versions for history**
7. **Use meaningful document status values**
8. **Implement collaborative features when needed**
9. **Optimize for performance with large content**
10. **Provide clear user feedback for operations**

## Related Components

- [`ViewStore`](./view-store.md) - Base store functionality
- [`MarkdownEditor`](../components/inputs/markdown-editor.md) - Content editing
- [`TextInput`](../components/inputs/text-input.md) - Title and metadata editing
- [`FindInput`](../components/inputs/find-input.md) - Document search functionality
