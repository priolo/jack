import { Button, CardsGroup, cardsSetup, CardsStore, FrameworkCard, TextInput, viewSetup, ViewStore } from "@priolo/jack";
import { createStore, mixStores, useStore } from "@priolo/jon";
import { FunctionComponent } from "react";
import cls from "./ExampleView.module.css";

import './index.css';
import "@priolo/jack/dist/style.css";




/**
 * applicazione che contiene il deck co le cards
 */
const App: FunctionComponent = () => {

  // HANDLERS
  /** inserisco una nuova CARD al DECK di tipo EXAMPLE */
  const handleAdd = () => {
    const view = createStore(exampleSetup) as ViewStore;
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

export default App;

const cssRoot: React.CSSProperties = {
  position: "relative",
  height: "100%",
  display: "flex",
  backgroundColor: "gray",
};
const cssDeck: React.CSSProperties = {
  flex: 1,
  display: "flex",
  overflowX: "auto",
  padding: "10px 0px 10px 0px",
  backgroundColor: "blue",
};



/** è il DECK che contiene tutte le CARDS visualizzate */
const deckCardsSo = createStore(cardsSetup) as CardsStore;


/** lo STORE che tiene lo stato della CARD example */
const setup = {
  state: {
    text: "init value",
  },
  mutators: {
    setText: (text: string) => ({ text }),
  },
};
const exampleSetup = mixStores(viewSetup, setup);


/** la VIEW della card example */
const ExampleView: FunctionComponent = ({
  store,
}) => {

  // STORE
  const state = useStore(store)

  // RENDER
  return (
    <FrameworkCard
      className={cls.root}
      store={store}
    >
      <TextInput
        value={state.text}
        onChange={(text) => store.setText(text)}
      />
    </FrameworkCard>
  );
};