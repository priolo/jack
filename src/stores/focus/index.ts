import { StoreCore, createStore } from "@priolo/jon"
import docsSo from "../docs"
import { getById, getNear } from "../docs/utils"
import { VIEW_SIZE } from "../stacks/types"
import { ViewStore } from "../stacks/viewBase"



/** gestisce il FOCUS */
const setup = {

	state: {
		/** la CARD che attualmente ha il fuoco */
		view: <ViewStore>null,
		ctrl: false,
	},

	getters: {
	},

	actions: {
		focus: (view: ViewStore, store?: FocusStore) => {
			store.setView(view)
			if (!view) return

			const elemCard = document.getElementById(view.state.uuid)
			if (!elemCard) return
			elemCard.scrollIntoView({ behavior: "smooth", inline: "center" })
			const elemBody = elemCard.querySelector('.jack-framework-body') as HTMLElement
			const elemFocus = elemBody.querySelector('[tabindex]') as HTMLElement
			elemFocus?.focus()
		}
	},

	mutators: {
		setView: (view: ViewStore) => ({ view }),
		setCtrl: (ctrl: boolean) => ({ ctrl }),
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
	const id = findParentJackCard(event.target as HTMLElement)?.id
	if (!id) {
		focusSo.setView(null)
		return
	}
	const card = getById(docsSo.getAllCards(), id)
	if (!card) return
	focusSo.setView(card)
})
// document.addEventListener("focusout", (event) => {
// 	focusSo.setView(null)
// 	console.log("Focus perso da:", event.target);
// })
document.addEventListener('keydown', (event) => {
	console.log(`Tasto premuto: "${event.code}"`);

	if (!event.ctrlKey) return
	focusSo.setCtrl(true)
	if (event.code == "ControlLeft" || event.code == "ControlRight") return

	const view = focusSo.state.view
	if (!view) return
	const inZen = docsSo.state.zenCard == view
	event.preventDefault()

	if (event.shiftKey) {
		if (event.code == "ArrowLeft") {
			const group = view.state.group
			const index = group.getIndexByView(view)
			group.move({ view, index: index - 1 })
			return
		} else if (event.code == "ArrowRight") {
			const group = view.state.group
			const index = group.getIndexByView(view)
			group.move({ view, index: index + 2 })
			return
		}
	}

	switch (event.code) {
		case 'ArrowUp':
			if (view.state.size == VIEW_SIZE.COMPACT) {
				view.setSize(VIEW_SIZE.NORMAL)
			} else {
				docsSo.zenOpen(view)
			}
			break;
		case 'ArrowDown':
			if (inZen) { docsSo.zenClose(); break }
			focusSo.state.view.setSize(VIEW_SIZE.COMPACT)
			break;
		case 'ArrowLeft': {
			if (inZen) break
			const card = getNear(view, true)
			focusSo.focus(card)
			break;
		}
		case 'ArrowRight': {
			if (inZen) break
			const card = getNear(view)
			focusSo.focus(card)
			break;
		}
		case "Delete": {
			if (inZen) { docsSo.zenClose(); break }
			const card = getNear(view) ?? getNear(view, true)
			if (!!card) focusSo.setView(card)
			view?.onRemoveFromDeck()
			break
		}
		case "Escape": {
			if (inZen) { docsSo.zenClose(); break }
			break;
		}
		case "Space": {
			if (inZen) { docsSo.zenClose(); break }
			view.state.group.detach(view)
			break;
		}
		default:
			break;
	}

});
document.addEventListener('keyup', (event) => {
	if (!event.ctrlKey) focusSo.setCtrl(false)
});




function findParentJackCard(el: HTMLElement): HTMLElement | null {
	let current: HTMLElement | null = el;
	while (current) {
		if (current.classList.contains('jack-card')) {
			return current;
		}
		current = current.parentElement;
	}
	return null;
}
