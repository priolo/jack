import SnackbarCmp from "@/components/cards/SnackbarCmp"
import docsSo from "@/stores/docs"
import { CardsState } from "@/stores/docs/cards"
import { ViewStore } from "@/stores/stacks/viewBase"
import { useStore, useStoreNext } from "@priolo/jon"
import React, { FunctionComponent } from "react"
import cls from "./BaseCard.module.css"



interface RenderProps { 
	view: ViewStore 
}

interface Props {
	view?: ViewStore
	children?: React.ReactNode
}

/** Il contenitore CARD. Gestisce il drag e posizionamento del DECK */
const BaseCard: FunctionComponent<Props> = ({
	view,
	children,
}) => {

	// STORES
	const viewSa = useStore(view)
	useStoreNext(view.state.group, (state: CardsState, stateOld: CardsState) => state.focus != stateOld.focus)

	// HOOKS
	
	// HANDLER

	// RENDER
	if (!view) return null
	const inZen = docsSo.state.zenCard == view
	const inRoot = inZen || !view.state.parent
	const haveFocus = !inZen && view.state.group.state.focus == view
	const variant = view.state.colorVar

	// styles
	const clsDoc = `var${variant} ${haveFocus ? cls.focus : ""} ${cls.doc} ${!inRoot ? cls.is_linked : ""}`

	return <div className={clsDoc}>
		{children}
		<SnackbarCmp view={view} />
	</div>
}

export default BaseCard
