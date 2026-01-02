# Jack Library - AI Coding Instructions

## Big Picture Architecture
Jack is a React-based "CARD" interface library

- **State Management**: Built on `@priolo/jon`. Every card is a "Store" created by mixing a base view (`viewBase`) setup with specific card logic.
Il riferimento alla libreria `@priolo/jon` è nel repository `jon` di questo "workspace" nel file `jon.github/copilot-instructions.md`

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



# ESEMPI

## SETUP BASE
- Esempio per impostare un progetto in generale
- Altri esempi si trovano nella cartella `src/examples/`

### Nel APP main creazione di una CardsGroup
```tsx
import { cardsSetup } from "@priolo/jack"

const deckCardsSo = createStore(cardsSetup) as CardsStore

const App: FunctionComponent = () => {

	const handleAdd = () => {
		const view = createStore(cardSetup) as ViewStore
		deckCardsSo.add({ view })
	}

	// RENDER
	return (
		<div style={cssRoot}>

			<div style={{ display: "flex", flexDirection: "column" }}>
				<Button onClick={handleAdd}>ADD CARD</Button>
			</div>

			<div style={cssDeck}>
				<CardsGroup 
					cardsStore={deckCardsSo} 
					Render={PolymorphicCard}
				/>
			</div>

			<DragCmp />

		</div>
	)
}
export default App
```

### Creazione di una CARD Polimorfica
- Usata per selezionare quale CARD specifica mostrare 
- In questo esempio e generalmente sulla base del valore dello STORE `view.state.type`

```ts
interface DocCmpProps { view: ViewStore }

const PolymorphicCard: FunctionComponent<DocCmpProps> = ({
	view,
}) => {
	const content = useMemo(() => {
		switch (view.state.type) {
			case DOC_TYPE.EXAMPLE1:
				return <Example1View store={view as Example1Store} />
			case DOC_TYPE.EXAMPLE2:
				return <Example2View store={view as Example2Store} />
			case DOC_TYPE.EXAMPLE3:
				return <Example3View store={view as Example2Store} />
	
		}
	}, [view])
	return content
}
export default PolymorphicCard
```

### Creazione di una CARD Specifica
- Il componente CARD riceve come prop lo STORE specifico della CARD
- Generalmente una CARD usa come componente root `FrameworkCard` che si occupa di gestire l'aspetto grafico comune a tutte le CARD (es. bordi, ombre, ecc..)

```tsx
import clsCard from "../CardCyan.module.css"

const Example1View: FunctionComponent<Props> = ({
	store,
}) => {

	const state = useStore(store)

	return <FrameworkCard store={store} className={clsCard.root}>
		{state.content}
	</FrameworkCard>
}

export default Example1View
```

### Creazione dello Store passato alla CARD Specifica
- Lo store specifico della CARD viene creato mixando il setup base `viewSetup` con le specifiche della CARD
- In questo esempio la CARD di tipo `EXAMPLE1` ha uno stato con un campo `content`, un getter `getTitle` e un'azione `onInsertion` che viene chiamata quando la CARD viene inserita nel mazzo.

```ts
export const example1Setup = mixStores(viewSetup, {
  state: {
    type: DOC_TYPE.EXAMPLE1,
    content: "This is an example content",
  },
  getters: {
    getTitle: (store) => "Example 1 Card",
  },
  actions: {
    onInsertion: (store) => {
      console.log("Example1 Card inserted", store.state.uuid)
    },
  },
})
export type Example1Store = typeof example1Setup & StoreCore<Example1State>
```



# COMPONENTS
Esempi per utilizzare i componenti JACK all'interno delle CARD.

## Tooltip 
Per inserire un Tooltip collegato ad un componente:
```tsx
// "style" fa riferimento al "childen" del tooltip 
<TooltipWrapCmp content="CONTENUTO DEL TOOLTIP" style={{ display: "flex", alignItems: "center" }}>
	<div>CHILDEN</div>
</TooltipWrapCmp>
```

## Snackbar
Per inserire uno Snackbar bisogna avere il riferimento allo store della CARD
```tsx
store.setSnackbar({
	open: true, 
	type: MESSAGE_TYPE.WARNING, 
	timeout: 5000,
	body: "Please enter your email before requesting a verification code.",
})
```

## Dialog
Una dialog ha bisogno del riferimento allo store della CARD e di una variabile booleana per l'apertura/chiusura.
```tsx
const [dialogIsOpen, setDialogIsOpen] = useState(false);
...

<Dialog store={store}
	title="CODE"
	width={280}
	open={emailDialogIsOpen}
	onClose={handleClose}
>
  CONTENT
	<Button onClick={()=>setDialogIsOpen(false)}>
		CLOSE
	</Button>
</Dialog>
```

Per aprire una dialog che mostra un messaggio di conferma:
```tsx
if (!await store.alertOpen({
	title: "DELETION",
    body: "This action is irreversible.\nAre you sure?",
})) return
```

## Accordion

per aprire e chiudere a comando si puo' usare una variabile booleana:
```tsx
<Accordion open={open}>
		{children}
</Accordion>
```
oppure semplicemente wrap sugli altri oggetti
```tsx
<Accordion>
		<div>CONTENT</div>
</Accordion>
```

per inserire un Accordion con un titolo:
```tsx
<AccordionTitle title="AGENTS" open={true}>
		<div>CONTENT</div>
</AccordionTitle>
```

## List
Per creare una lista con JACK usare il componente `List`:
```tsx

```

# STYLING CONVENTIONS

## Temi per le CARD
Tipicamente creare un CSS che definisce i colori per un tipo di CARD
Poi si passa come `className` al componente `FrameworkCard` usato come root della CARD.
In pratica si sovrascrivono dei CSS Variables definite in `src/css/graph.css`
Esempio di CSS per una CARD con tema CYAN:

```css
.root {
	--card-fg: #393939;
	--card-bg: #10F3F3;
	
	/* button icon button */
	--cmp-select-fg: #10F3F3;
	--cmp-select-bg: #393939;
	
	/* ombra perimetrale inputtext buttton */
	--cmp-bg: rgba(0, 0, 0, 0.05);

	/* tooltip drag dialog float-button snackbar*/
	--dialog-fg: #393939;
	--dialog-bg: #10F3F3;

	--cmp-focus: #39393989;
}

.root :global(.jack-framework-actions) {
	--cmp-select-fg: #393939;
	--cmp-select-bg: #10F3F3;
}
```


## class per i COMPONENTS

### LABELS
Permettono di definire dei testi statici all'interno delle CARDS
Controllare il file `src/css/label.css` per le definizioni.

### LAYOUTS
Permettono di definire dei layout comuni dento le CARDS
Controllare il file `src/css/layout.css` per le definizioni.