# Jack Library - AI Coding Instructions

## Big Picture Architecture
Jack is a React-based "CARD" interface library derived from the NUI project.
- **State Management**: Built on `@priolo/jon`. Every card is a "Store" created by mixing a base view setup with specific card logic.
- **Card System**:
  - `viewBase` ([src/stores/stacks/viewBase.ts](src/stores/stacks/viewBase.ts)): The foundation for all cards. Contains state like `uuid`, `type`, `size`, `width`, and `linked` cards.
  - `CardsStore` ([src/stores/docs/cards.ts](src/stores/docs/cards.ts)): Manages a collection of cards.
  - `CardsGroup` ([src/app/CardsGroup.tsx](src/app/CardsGroup.tsx)): The main container for rendering a deck of cards.
  - `RootCard` ([src/app/RootCard.tsx](src/app/RootCard.tsx)): Handles the common card UI (resizing, dragging, animations).
  - `PolymorphicCard` ([src/examples/PolymorphicCard.tsx](src/examples/PolymorphicCard.tsx)): A pattern for rendering different card content based on `view.state.type`.
- **Interaction Stores**:
  - `focusSo` ([src/stores/focus/index.ts](src/stores/focus/index.ts)): Manages which card has focus and keyboard shortcuts.
  - `mouseSo` ([src/stores/mouse/index.ts](src/stores/mouse/index.ts)): Manages drag-and-drop operations.

## Project Conventions
- **Store Creation**: Use `mixStores(viewSetup, setup)` to create card stores.
  ```typescript
  const exampleSetup = mixStores(viewSetup, {
    state: { type: DOC_TYPE.EXAMPLE, ... },
    getters: { getTitle: () => "Example", ... },
    actions: { 
      onInsertion: (store) => { /* called when added to deck */ },
      onDrop: (drag, store) => { /* called when something is dropped on it */ },
    },
  })
  ```
- **React Integration**: Use the `useStore(store)` hook from `@priolo/jon` to subscribe to store changes in components.
- **Styling**: 
  - Use **CSS Modules** (`.module.css`) for component-specific styles.
  - Global layout, animations, and shared UI variables are in [src/css](src/css).
- **Icons**: Custom SVG icons are located in [src/icons](src/icons) as React components.

## Critical Workflows
- **Development**: `npm run dev` (runs on port 5174).
- **Testing**: `npm run test` (uses Vitest).
- **Build**: `npm run build` (generates UMD and ES modules in `dist/`).

## Integration Points
- **@priolo/jon**: Core dependency for state.
- **Slate**: Used for rich text/markdown editing ([src/components/input/MarkdownEditor.tsx](src/components/input/MarkdownEditor.tsx)).
- **React Virtuoso**: Used for efficient list rendering ([src/components/lists/List.tsx](src/components/lists/List.tsx)).
- **Peer Dependencies**: `react`, `react-dom`, and `@priolo/jon` must be provided by the consumer.

## Key Files to Reference
- [src/stores/stacks/viewBase.ts](src/stores/stacks/viewBase.ts): Base card state and actions.
- [src/app/RootCard.tsx](src/app/RootCard.tsx): Main card wrapper logic.
- [src/index.ts](src/index.ts): Public API and component exports.
