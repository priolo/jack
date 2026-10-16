# LinksStore

A store for managing card linking relationships and dependencies in the Jack framework. LinksStore handles the creation, management, and visualization of connections between cards, enabling complex card hierarchies and data flow relationships.

## Import

```javascript
import { LinksStore } from '@priolo/jack'
import { useStore } from '@priolo/jon'
```

## Overview

LinksStore provides a centralized system for managing relationships between cards in the Jack framework. It handles parent-child relationships, dependency tracking, link visualization, and automatic layout adjustments based on card connections.

## State Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `links` | `Link[]` | `[]` | Array of all link relationships |
| `linksByCard` | `Map<string, Link[]>` | `new Map()` | Links indexed by card ID |
| `parentChildMap` | `Map<string, string[]>` | `new Map()` | Parent to children mapping |
| `childParentMap` | `Map<string, string>` | `new Map()` | Child to parent mapping |
| `linkTypes` | `LinkType[]` | `[]` | Registered link type definitions |
| `visualSettings` | `VisualSettings` | `defaultSettings` | Link visualization configuration |
| `layoutMode` | `'auto' \| 'manual' \| 'tree' \| 'flow'` | `'auto'` | Automatic layout behavior |
| `isLayouting` | `boolean` | `false` | Whether auto-layout is in progress |
| `selectedLinks` | `string[]` | `[]` | Currently selected link IDs |
| `linkAnimations` | `Map<string, Animation>` | `new Map()` | Active link animations |

## Data Structures

### Link Interface

```javascript
interface Link {
  id: string                    // Unique link identifier
  parentId: string             // Parent card ID
  childId: string              // Child card ID
  type: string                 // Link type ('parent-child', 'dependency', etc.)
  label?: string               // Optional link label
  data?: any                   // Custom link data
  style?: LinkStyle            // Visual styling options
  createdAt: Date              // Creation timestamp
  updatedAt: Date              // Last update timestamp
  isVisible: boolean           // Whether link is currently visible
  isActive: boolean            // Whether link is active/enabled
}
```

### LinkType Interface

```javascript
interface LinkType {
  name: string                 // Type identifier
  label: string                // Display label
  description?: string         // Type description
  defaultStyle: LinkStyle      // Default visual style
  allowMultiple: boolean       // Allow multiple links of this type
  constraints?: Constraint[]   // Link creation constraints
  onCreated?: (link: Link) => void      // Creation callback
  onDestroyed?: (link: Link) => void    // Destruction callback
}
```

## Methods

### Link Management

#### `createLink(parentId, childId, options)`
Creates a new link between two cards.

```javascript
const link = linksStore.createLink('card-1', 'card-2', {
  type: 'parent-child',
  label: 'Details',
  data: { cascade: true },
  style: { color: '#007acc', width: 2 }
})
```

**Parameters:**
- `parentId` (string): ID of the parent card
- `childId` (string): ID of the child card
- `options` (object): Link configuration
  - `type` (string): Link type name
  - `label` (string): Optional display label
  - `data` (any): Custom link data
  - `style` (LinkStyle): Visual styling options

**Returns:** Link object or null if creation failed

#### `removeLink(linkId)`
Removes a specific link by ID.

```javascript
linksStore.removeLink('link-123')
```

#### `removeLinksBetween(parentId, childId, type?)`
Removes all links between two cards, optionally filtered by type.

```javascript
// Remove all links between cards
linksStore.removeLinksBetween('card-1', 'card-2')

// Remove only parent-child links
linksStore.removeLinksBetween('card-1', 'card-2', 'parent-child')
```

#### `removeLinksForCard(cardId)`
Removes all links associated with a specific card.

```javascript
linksStore.removeLinksForCard('card-1')
```

### Link Queries

#### `getLink(linkId)`
Retrieves a specific link by ID.

```javascript
const link = linksStore.getLink('link-123')
```

#### `getLinksBetween(parentId, childId, type?)`
Gets all links between two cards.

```javascript
const links = linksStore.getLinksBetween('card-1', 'card-2')
const parentChildLinks = linksStore.getLinksBetween('card-1', 'card-2', 'parent-child')
```

#### `getLinksForCard(cardId, direction?)`
Gets all links for a specific card.

```javascript
// All links (incoming and outgoing)
const allLinks = linksStore.getLinksForCard('card-1')

// Only outgoing links (where card is parent)
const outgoing = linksStore.getLinksForCard('card-1', 'outgoing')

// Only incoming links (where card is child)
const incoming = linksStore.getLinksForCard('card-1', 'incoming')
```

#### `getChildren(parentId, type?)`
Gets all child cards for a parent.

```javascript
const children = linksStore.getChildren('card-1')
const directChildren = linksStore.getChildren('card-1', 'parent-child')
```

#### `getParent(childId, type?)`
Gets the parent card for a child.

```javascript
const parent = linksStore.getParent('card-2')
const directParent = linksStore.getParent('card-2', 'parent-child')
```

#### `getAncestors(cardId)`
Gets all ancestor cards in the hierarchy.

```javascript
const ancestors = linksStore.getAncestors('card-3')
// Returns: ['card-1', 'card-2'] if card-3 -> card-2 -> card-1
```

#### `getDescendants(cardId)`
Gets all descendant cards in the hierarchy.

```javascript
const descendants = linksStore.getDescendants('card-1')
// Returns all cards in the subtree rooted at card-1
```

### Link Types

#### `registerLinkType(linkType)`
Registers a new link type.

```javascript
linksStore.registerLinkType({
  name: 'dependency',
  label: 'Dependency',
  description: 'Indicates one card depends on another',
  defaultStyle: {
    color: '#ff6b6b',
    width: 1,
    dashArray: '5,5'
  },
  allowMultiple: true,
  constraints: [
    { type: 'no-cycles' },
    { type: 'max-parents', value: 1 }
  ]
})
```

#### `unregisterLinkType(typeName)`
Removes a link type registration.

```javascript
linksStore.unregisterLinkType('dependency')
```

#### `getLinkTypes()`
Gets all registered link types.

```javascript
const types = linksStore.getLinkTypes()
```

### Layout Management

#### `setLayoutMode(mode)`
Sets the automatic layout mode.

```javascript
linksStore.setLayoutMode('tree')  // 'auto', 'manual', 'tree', 'flow'
```

#### `triggerLayout(options?)`
Manually triggers layout recalculation.

```javascript
linksStore.triggerLayout({
  animated: true,
  duration: 300,
  preservePositions: ['card-1', 'card-2']
})
```

#### `calculateOptimalLayout()`
Calculates optimal positions for all linked cards.

```javascript
const layout = linksStore.calculateOptimalLayout()
// Returns: Map<cardId, {x: number, y: number}>
```

### Validation

#### `validateLink(parentId, childId, type)`
Validates if a link can be created.

```javascript
const validation = linksStore.validateLink('card-1', 'card-2', 'parent-child')
// Returns: { valid: boolean, errors: string[] }
```

#### `detectCycles()`
Detects circular dependencies in the link graph.

```javascript
const cycles = linksStore.detectCycles()
// Returns: string[][] (array of card ID cycles)
```

## Usage Examples

### Basic Link Creation

```javascript
import { LinksStore, CardsStore } from '@priolo/jack'

const MyDeck = ({ cardsStore }) => {
  const linksState = useStore(LinksStore)
  
  const handleLinkCards = (parentCard, childCard) => {
    LinksStore.createLink(parentCard.id, childCard.id, {
      type: 'parent-child',
      label: 'Details',
      data: { autoPosition: true }
    })
  }
  
  return (
    <div>
      {linksState.links.map(link => (
        <div key={link.id}>
          Link: {link.parentId} → {link.childId}
        </div>
      ))}
    </div>
  )
}
```

### Implementing Card Linking UI

```javascript
import { LinksStore } from '@priolo/jack'
import { useState } from 'react'

const LinkingInterface = ({ selectedCards }) => {
  const [linkType, setLinkType] = useState('parent-child')
  const linksState = useStore(LinksStore)
  
  const handleCreateLink = () => {
    if (selectedCards.length === 2) {
      const [parent, child] = selectedCards
      LinksStore.createLink(parent.id, child.id, { type: linkType })
    }
  }
  
  return (
    <div className="linking-interface">
      <select 
        value={linkType} 
        onChange={(e) => setLinkType(e.target.value)}
      >
        {linksState.linkTypes.map(type => (
          <option key={type.name} value={type.name}>
            {type.label}
          </option>
        ))}
      </select>
      
      <button 
        onClick={handleCreateLink}
        disabled={selectedCards.length !== 2}
      >
        Create Link
      </button>
    </div>
  )
}
```

### Auto-Layout with Links

```javascript
import { LinksStore, CardsStore } from '@priolo/jack'

const AutoLayoutDeck = ({ cardsStore }) => {
  const linksState = useStore(LinksStore)
  
  // Trigger layout when links change
  useEffect(() => {
    if (linksState.layoutMode === 'auto') {
      LinksStore.triggerLayout({ animated: true })
    }
  }, [linksState.links.length])
  
  const handleLayoutModeChange = (mode) => {
    LinksStore.setLayoutMode(mode)
    if (mode !== 'manual') {
      LinksStore.triggerLayout()
    }
  }
  
  return (
    <div>
      <div className="layout-controls">
        <button onClick={() => handleLayoutModeChange('tree')}>
          Tree Layout
        </button>
        <button onClick={() => handleLayoutModeChange('flow')}>
          Flow Layout
        </button>
        <button onClick={() => handleLayoutModeChange('manual')}>
          Manual
        </button>
      </div>
      
      {/* Deck content */}
    </div>
  )
}
```

### Link Visualization

```javascript
import { LinksStore } from '@priolo/jack'
import { useStore } from '@priolo/jon'

const LinkRenderer = () => {
  const linksState = useStore(LinksStore)
  
  const renderLink = (link) => {
    // Get card positions (assuming you have access to card stores)
    const parentPos = getCardPosition(link.parentId)
    const childPos = getCardPosition(link.childId)
    
    return (
      <svg key={link.id} className="link-svg">
        <line
          x1={parentPos.x}
          y1={parentPos.y}
          x2={childPos.x}
          y2={childPos.y}
          stroke={link.style?.color || '#007acc'}
          strokeWidth={link.style?.width || 1}
          strokeDasharray={link.style?.dashArray}
        />
        
        {link.label && (
          <text
            x={(parentPos.x + childPos.x) / 2}
            y={(parentPos.y + childPos.y) / 2}
            textAnchor="middle"
            className="link-label"
          >
            {link.label}
          </text>
        )}
      </svg>
    )
  }
  
  return (
    <div className="links-overlay">
      {linksState.links
        .filter(link => link.isVisible)
        .map(renderLink)}
    </div>
  )
}
```

### Hierarchical Card Navigation

```javascript
import { LinksStore } from '@priolo/jack'

const CardHierarchy = ({ rootCardId }) => {
  const buildHierarchy = (cardId, visited = new Set()) => {
    if (visited.has(cardId)) return null // Prevent infinite loops
    visited.add(cardId)
    
    const children = LinksStore.getChildren(cardId)
    
    return {
      cardId,
      children: children.map(childId => 
        buildHierarchy(childId, new Set(visited))
      ).filter(Boolean)
    }
  }
  
  const hierarchy = buildHierarchy(rootCardId)
  
  const renderNode = (node, level = 0) => (
    <div key={node.cardId} style={{ marginLeft: level * 20 }}>
      <div>Card: {node.cardId}</div>
      {node.children.map(child => renderNode(child, level + 1))}
    </div>
  )
  
  return (
    <div className="card-hierarchy">
      {hierarchy && renderNode(hierarchy)}
    </div>
  )
}
```

## Integration with CardsStore

### Automatic Link Management

```javascript
import { LinksStore, CardsStore } from '@priolo/jack'

// Listen for card removal and clean up links
CardsStore.on('card:removed', (cardId) => {
  LinksStore.removeLinksForCard(cardId)
})

// Handle linked card addition
const addLinkedCard = (parentCardId, childCardData) => {
  // Create the child card
  const childCard = CardsStore.add(childCardData)
  
  // Create the link
  LinksStore.createLink(parentCardId, childCard.id, {
    type: 'parent-child',
    data: { autoCreated: true }
  })
  
  // Position child relative to parent
  const parentPos = CardsStore.getCard(parentCardId).position
  childCard.setPosition(parentPos.x + 300, parentPos.y)
}
```

### Link-Aware Card Operations

```javascript
const closeCardWithChildren = (cardId) => {
  const children = LinksStore.getChildren(cardId)
  
  // Ask user if they want to close children too
  const closeChildren = confirm(
    `Close ${children.length} linked cards too?`
  )
  
  if (closeChildren) {
    children.forEach(childId => CardsStore.remove(childId))
  }
  
  CardsStore.remove(cardId)
}
```

## Event Handling

### Link Events

```javascript
// Listen for link creation
LinksStore.on('link:created', (link) => {
  console.log('Link created:', link)
  
  // Auto-position child card
  if (link.type === 'parent-child') {
    const parentCard = CardsStore.getCard(link.parentId)
    const childCard = CardsStore.getCard(link.childId)
    
    childCard.setPosition(
      parentCard.position.x + 300,
      parentCard.position.y
    )
  }
})

// Listen for link removal
LinksStore.on('link:removed', (link) => {
  console.log('Link removed:', link)
})

// Listen for layout changes
LinksStore.on('layout:complete', (newPositions) => {
  console.log('Layout updated:', newPositions)
})
```

### Validation Events

```javascript
// Listen for validation errors
LinksStore.on('validation:error', (error, linkData) => {
  console.warn('Link validation failed:', error, linkData)
  
  // Show user-friendly error message
  showNotification(`Cannot create link: ${error.message}`)
})

// Listen for cycle detection
LinksStore.on('cycle:detected', (cycles) => {
  console.warn('Circular dependencies detected:', cycles)
  
  // Highlight problematic cards
  cycles.flat().forEach(cardId => {
    CardsStore.getCard(cardId).highlight('error')
  })
})
```

## Visual Configuration

### Link Styling

```javascript
// Configure default visual settings
LinksStore.setVisualSettings({
  defaultLinkStyle: {
    color: '#007acc',
    width: 2,
    opacity: 0.8
  },
  
  selectedLinkStyle: {
    color: '#ff6b6b',
    width: 3,
    opacity: 1
  },
  
  animationDuration: 300,
  showLabels: true,
  showArrows: true,
  
  linkTypes: {
    'parent-child': {
      color: '#28a745',
      dashArray: null
    },
    'dependency': {
      color: '#ffc107',
      dashArray: '5,5'
    },
    'reference': {
      color: '#6c757d',
      dashArray: '2,3'
    }
  }
})
```

## Advanced Features

### Custom Link Types

```javascript
// Register a custom bidirectional link type
LinksStore.registerLinkType({
  name: 'bidirectional',
  label: 'Two-Way Link',
  defaultStyle: {
    color: '#e83e8c',
    width: 2,
    arrowStyle: 'both'
  },
  
  constraints: [
    {
      type: 'custom',
      validate: (parentId, childId) => {
        // Don't allow bidirectional links to same card
        return parentId !== childId
      },
      message: 'Cannot create bidirectional link to same card'
    }
  ],
  
  onCreated: (link) => {
    // Automatically create reverse link
    LinksStore.createLink(link.childId, link.parentId, {
      type: 'bidirectional-reverse',
      parentLinkId: link.id
    })
  }
})
```

### Link Analytics

```javascript
const getLinkMetrics = () => ({
  totalLinks: LinksStore.state.links.length,
  linksByType: LinksStore.state.links.reduce((acc, link) => {
    acc[link.type] = (acc[link.type] || 0) + 1
    return acc
  }, {}),
  
  orphanCards: CardsStore.state.cards.filter(card => 
    LinksStore.getLinksForCard(card.id).length === 0
  ),
  
  maxDepth: Math.max(...CardsStore.state.cards.map(card =>
    LinksStore.getAncestors(card.id).length
  )),
  
  cycles: LinksStore.detectCycles()
})
```

## TypeScript Support

```typescript
interface Link {
  id: string
  parentId: string
  childId: string
  type: string
  label?: string
  data?: any
  style?: LinkStyle
  createdAt: Date
  updatedAt: Date
  isVisible: boolean
  isActive: boolean
}

interface LinkType {
  name: string
  label: string
  description?: string
  defaultStyle: LinkStyle
  allowMultiple: boolean
  constraints?: Constraint[]
  onCreated?: (link: Link) => void
  onDestroyed?: (link: Link) => void
}

interface LinkStyle {
  color?: string
  width?: number
  opacity?: number
  dashArray?: string
  arrowStyle?: 'none' | 'forward' | 'backward' | 'both'
}

declare class LinksStore {
  state: LinksState
  createLink(parentId: string, childId: string, options?: LinkOptions): Link | null
  removeLink(linkId: string): void
  getLinksForCard(cardId: string, direction?: 'incoming' | 'outgoing'): Link[]
  // ... other methods
}
```

LinksStore provides a powerful foundation for creating complex, interconnected card relationships in the Jack framework, enabling rich data visualization, hierarchical navigation, and automated layout management.
