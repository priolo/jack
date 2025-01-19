import { createStore } from "@priolo/jon"
import { FunctionComponent } from "react"
import CardsGroup from "../app/CardsGroup"
import Button from "../components/buttons/Button"
import { deckCards2So, deckCardsSo } from "./main"
import example1Setup from "./example1"
import example2Setup from "./example2"
import { ViewStore } from "../stores/stacks/viewBase"
import ZenCard from "../app/ZenCard"
import DragCmp from "../app/DragCmp"
import TooltipCmp from "../app/tooltip/TooltipCmp"
import PolymorphicCard from "./PolymorphicCard"
import { DOC_TYPE } from "./types"
import focusSo from "../stores/focus"



const App: FunctionComponent = () => {

	// STORES

	// HOOKS

	// HANDLERS
	const handleAdd1 = () => {
		const view = createStore(example1Setup) as ViewStore
		deckCardsSo.add({ view })
		focusSo.focus(view)
	}
	const handleAdd2 = () => {
		const view = createStore(example2Setup) as ViewStore
		deckCardsSo.add({ view })
		focusSo.focus(view)
	}
	const handleAdd3 = () => {
		const view = createStore(example2Setup) as ViewStore
		view.state.type = DOC_TYPE.EXAMPLE3
		deckCardsSo.add({ view })
		focusSo.focus(view)
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
				<Button
					onClick={handleAdd3}
				>ADD 3</Button>
			</div>

			

			<div style={cssDeck}>
				<CardsGroup 
					cardsStore={deckCardsSo} 
					Render={PolymorphicCard}
				/>
			</div>

			{/* <div style={cssDeck2}>
				<CardsGroup 
					cardsStore={deckCards2So} 
					Render={PolymorphicCard}
				/>
			</div> */}

			<ZenCard />
			<DragCmp />
			<TooltipCmp />

		</div>
	)
}

export default App


const cssRoot: React.CSSProperties = {
	position: "relative",
	height: "100%",
	display: "flex",
	backgroundColor: "gray",
	
}

const cssDeck: React.CSSProperties = {
	flex: 1,
	display: "flex",
	overflowX: "auto",
	padding: "10px 0px 10px 0px",
	backgroundColor: "blue",
}

const cssDeck2: React.CSSProperties = {
	flex: 1,
	display: "flex",
	overflowX: "auto",
	padding: "10px 0px 10px 0px",
	backgroundColor: "#0F0FF0",
}