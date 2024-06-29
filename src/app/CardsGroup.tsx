import { CardsState, CardsStore } from "@/stores/docs/cards"
import { useStore } from "@priolo/jon"
import { FunctionComponent } from "react"
import { ViewStore } from "../stores/stacks/viewBase"
import DropArea from "./DropArea"
import RootCard from "./RootCard"



export interface RenderProps { view: ViewStore }

interface Props {
	cardsStore?: CardsStore
	Render: FunctionComponent<RenderProps>
}

/** componente generico per raggruppare delle CARDS */
const CardsGroup: FunctionComponent<Props> = ({
	cardsStore,
	Render,
}) => {

	// STORES
	const deckCardsSa: CardsState = useStore(cardsStore)

	// HOOKS

	// HANDLERS

	// RENDER
	const cards = deckCardsSa.all

	return <>
		{cards.map((store, index) => (
			<div key={store.state.uuid}
				style={cssCol(cards.length - index)}
			>
				<DropArea
					groupDest={cardsStore}
					index={index}
					viewSo={store}
				/>
				<RootCard view={store} Render={Render}/>
			</div>
		))}
		<DropArea isLast 
			groupDest={cardsStore}
			index={cards.length} 
		/>
	</>
}

export default CardsGroup

const cssCol = (zIndex: number): React.CSSProperties => ({
	display: "flex",
	zIndex,
})

