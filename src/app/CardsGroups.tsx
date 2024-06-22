import { CardsState, CardsStore } from "@/stores/docs/cards"
import { FunctionComponent } from "react"
import RootCard from "./RootCard"
import DropArea from "./DropArea"
import { useStore } from "@priolo/jon"
import PolymorphicCard from "../cards/PolymorphicCard"



interface Props {
	cardsStore?: CardsStore
}

/** componente generico per raggruppare delle CARDS */
const CardsGroup: FunctionComponent<Props> = ({
	cardsStore,
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
				<RootCard view={store} Render={PolymorphicCard}/>
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

