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
		position: -1,
	},

	getters: {
	},

	actions: {
		focus: (view: ViewStore, store?: FocusStore) => {
			store.setView(view)
			if (!view) return

			if ( focusByElementPosition(0, view) ) {
				store.setPosition(0)
			} else {
				store.setPosition(-1)
			}

			// const elemCard = document.getElementById(view.state.uuid)
			// if (!elemCard) return
			// elemCard.scrollIntoView({ behavior: "smooth", inline: "center" })
			// const elemBody = elemCard.querySelector('.jack-framework-body') as HTMLElement
			// const elemFocus = elemBody.querySelector('[tabindex]') as HTMLElement
			// elemFocus?.focus()
			// store.setPosition(0)
		}
	},

	mutators: {
		setView: (view: ViewStore) => ({ view }),
		setCtrl: (ctrl: boolean) => ({ ctrl }),
		setPosition: (position: number) => ({ position }),
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
	// if (id == null) {
	// 	focusSo.setView(null)
	// 	return
	// }
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
	event.stopPropagation()

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
		} else if (event.code == "ArrowUp") {
			if (view.state.size == VIEW_SIZE.COMPACT) {
				view.setSize(VIEW_SIZE.NORMAL)
			} else {
				docsSo.zenOpen(view)
			}
		} else if (event.code == "ArrowDown") {
			if (inZen) { 
				docsSo.zenClose()
			} else {
				focusSo.state.view.setSize(VIEW_SIZE.COMPACT)
			}
		}
	}

	switch (event.code) {
		case 'ArrowUp': {
			let nextPosition = focusSo.state.position - 1
			if (!focusByElementPosition(nextPosition, view)) return
			focusSo.setPosition(nextPosition)
			break;
		}
		case 'ArrowDown': {
			const nextPosition = focusSo.state.position + 1
			if (!focusByElementPosition(nextPosition, view)) return
			focusSo.setPosition(nextPosition)
			break;
		}
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



/**
 * Recupera l'elem HTML jack-card genitore
 */
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

function getHTMLElemByView(view: ViewStore): HTMLElement {
	const elemCard = document.getElementById(view.state.uuid)
	if (!elemCard) return null
	const elemBody = elemCard.querySelector('.jack-framework-body') as HTMLElement
	return elemBody
}

function focusByElementPosition(position: number, view: ViewStore): boolean {
	if (position < 0) return false
	const elemBody = getHTMLElemByView(view)
	const elemsFocusable = [...elemBody.querySelectorAll('[tabindex]')].filter((e: HTMLElement) => e.tabIndex >= 0)
	if (elemsFocusable.length <= position) return false
	const elemFocus = elemsFocusable[position] as HTMLElement
	elemFocus.focus()
	return true
}