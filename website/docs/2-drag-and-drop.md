---
id: "drag-and-drop"
title: 'Drag and Drop'
sidebar_label: 'Drag & Drop'
sidebar_position: 2
---

Let's improve things:  
We'd like to be able to move, delete, or "iconify" the created CARDs.

This can be done "manually," but now we'll use the `Header` component.  
So in the CARD, we add:

```tsx title="App.tsx"
/** the VIEW of the example card */
const CardView: FunctionComponent = ({
  store,
}) => {

  // STORE
  const state = useStore(store)

  // RENDER
  return (
    <div style={cssCard}>
>>>   <Header store={store} icon="ICON" />
      <TextInput
        value={state.text}
        onChange={(text) => store.setText(text)}
      />
    </div>
  )
}
```

So we have a component above the card.  
If we open two CARDs, we can move them by dragging the Header.  
Since each CARD has its own STORE, you can change the TEXT-BOX value to distinguish them.  
You can also iconify the CARD if you press on ICON.  

It would be nice to see a placeholder of where the dragged CARD will be positioned.  
This can be done by inserting the `DragCmp` component into the scene.  
  
```tsx title="App.tsx"
const App: FunctionComponent = () => {

  // HANDLERS
  /** insert a new CARD to the DECK of type EXAMPLE */
  const handleAdd = () => {
    const view = createStore(cardSetup) as ViewStore
    deckCardsSo.add({ view })
  };

  // RENDER
  return (
    <div style={cssRoot}>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button onClick={handleAdd}>ADD CARD</Button>
      </div>

      <div style={cssDeck}>
        <CardsGroup
          cardsStore={deckCardsSo}
          Render={({ view }) => <CardView store={view} />} />
      </div>

>>>   <DragCmp />

    </div>
  )
}
```

Here's the [code](https://codesandbox.io/p/sandbox/drag-drop-fjkddg?file=%2Fsrc%2FApp.tsx%3A14%2C1-41%2C2)
