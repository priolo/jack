import { StoreCore, createStore } from "@priolo/jon"
import { DOC_ANIM } from "../docs/types"
import { DragDoc, Position } from "./utils"
import { ColorVar } from "../../types/global"
import { ViewStore } from "../stacks/viewBase"
import cardsSetup from "../docs/cards"
import { getById } from "../docs/utils"



/** gestisce il FOCUS */
const setup = {

	state: {
		/** la CARD che attualmente ha il fuoco */
		view: <ViewStore>null,
	},

	getters: {
	},

	actions: {
	},

	mutators: {
		setView: (view: ViewStore) => ({ view }),
	},
}

export type FocusState = typeof setup.state
export type FocsGetters = typeof setup.getters
export type FocusActions = typeof setup.actions
export type FocusMutators = typeof setup.mutators
export interface FocusStore extends StoreCore<FocusState>, FocsGetters, FocusActions, FocusMutators {
	state: FocusState
}
const focusSo = createStore(setup) as FocusStore
export default focusSo


document.addEventListener("focusin", (event) => {
	const id = findClosestJackCard(event.target as HTMLElement)?.id
	if (!id) return
	const card = getById(cardsSetup.GetAllCards(), id)
	if (!card) return
	focusSo.setView(card)
	console.log("Elemento in focus:", event.target);
})
document.addEventListener("focusout", (event) => {
	focusSo.setView(null)
	console.log("Focus perso da:", event.target);
})

export function findClosestJackCard(el: HTMLElement): HTMLElement | null {
	let current: HTMLElement | null = el;
	while (current) {
		if (current.classList.contains('jack-card')) {
			return current;
		}
		current = current.parentElement;
	}
	return null;
}