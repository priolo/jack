import { createStore } from "@priolo/jon"
import { FunctionComponent } from "react"
import CardsGroup from "./app/CardsGroups"
import Button from "./components/buttons/Button"
import { deckCardsSo } from "./main"
import example1Setup from "./stores/stacks/example1"
import example2Setup from "./stores/stacks/example2"
import { ViewStore } from "./stores/stacks/viewBase"



const App: FunctionComponent = () => {

	// STORES

	// HOOKS

	// HANDLERS
	const handleAdd1 = () => {
		const view = createStore(example1Setup) as ViewStore
		deckCardsSo.add({ view })
	}
	const handleAdd2 = () => {
		const view = createStore(example2Setup) as ViewStore
		deckCardsSo.add({ view })
	}

	// RENDER
	return (
		<div style={cssRoot}>

			<div style={{ display: "flex", flexDirection: "column" }}>
				<Button
					onClick={handleAdd1}
				>ADD 1</Button>
				<Button
					onClick={handleAdd2}
				>ADD 2</Button>
			</div>

			<div style={cssDeck}>
				<CardsGroup cardsStore={deckCardsSo} />
			</div>

		</div>
	)
}

export default App


const cssRoot: React.CSSProperties = {
	position: "relative",
	height: "100%",
	display: "flex",
	backgroundColor: "blue",
}

const cssDeck: React.CSSProperties = {
	flex: 1,
	display: "flex",
	overflowX: "auto",
	padding: "10px 0px 10px 0px",
}