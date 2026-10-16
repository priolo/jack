---
id: "quick-start"
title: 'Quick start'
sidebar_label: 'Quick start'
sidebar_position: 1
---

## Installation

Install Jack in your new project

```bash title="npm"
npm install @priolo/jack
```

Also install [Jon](https://github.com/priolo/jon)

```bash title="npm"
npm install @priolo/jon
```

Jack uses Jon for state management  
You don't need to know Jon perfectly to use Jack

## Quick start

You can do everything in `App.tsx`

```tsx title="App.tsx"
import { Button, CardsGroup } from "@priolo/jack";
import { createStore } from "@priolo/jon";
import { FunctionComponent } from "react";

import './index.css';
import "@priolo/jack/dist/style.css";

const App: FunctionComponent = () => {

  // HANDLERS
  /** add a new CARD to the DECK */
  const handleAdd = () => {
    const view = createStore(cardSetup) as ViewStore;
    deckCardsSo.add({ view });
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
          Render={({ view }) => <ExampleView store={view} />} />
      </div>

    </div>
  );
};
```

We have a `cssRoot` div that contains a simple menu to add CARDs  
and a `cssDeck` div that contains the CARDs  

`CardsGroup` connects with the `deckCardsSo` STORE  
Let's create the STORE that contains all the CARDs  

```tsx
const deckCardsSo = createStore(cardsSetup) as CardsStore
```

Let's create the STORE to manage the state of a single CARD

```tsx
const setup = {
  state: {
    text: "init value",
  },
  mutators: {
    setText: (text: string) => ({ text }),
  },
}
const cardSetup = mixStores(viewSetup, setup)
```

Note that this STORE derives from `viewSetup` but we'll see that later

And, finally, the VIEW component of the CARD

```tsx
const CardView: FunctionComponent = ({
  store,
}) => {

  // STORE
  const state = useStore(store)

  // RENDER
  return (
    <div style={cssCard}>
      <TextInput
        value={state.text}
        onChange={(text) => store.setText(text)}
      />
    </div>
  )
}
```

Don't worry and click [here](https://codesandbox.io/p/sandbox/01-quick-start-qj86sr?file=%2Fsrc%2FApp.tsx)  
there's all the complete code

Of course, it's ugly.  
But we know that a bit of CSS turns crap into GOLD!  

Anyway, the "ADD CARD" button adds a new `CardView` component to the DECK  
And each `CardView` has a `TextInput` that displays/modifies the state of the CARD's STORE  
(STORE generated from the `cardSetup` template)  