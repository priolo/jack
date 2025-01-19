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
			store.setPosition(focusAuto(view))
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
// })
document.addEventListener('keydown', (event) => {
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
			if ( focusSo.state.position == -1 ) {
				focusSo.setPosition(focusAuto(view))
				break
			}
			let nextPosition = focusSo.state.position - 1
			if (!focusPosition(view, nextPosition)) return
			focusSo.setPosition(nextPosition)
			break;
		}
		case 'ArrowDown': {
			if ( focusSo.state.position == -1 ) {
				focusSo.setPosition(focusAuto(view))
				break
			}
			const nextPosition = focusSo.state.position + 1
			if (!focusPosition(view, nextPosition)) return
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
		case "KeyF": {

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
 * Recupera il parent element HTML che abbia class jack-card
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

function getFocusableElements(view: ViewStore): { bodyIndex: number, elements: HTMLElement[] } {
	const elemCard = document.getElementById(view.state.uuid).querySelector('.jack-framework')
	if (!elemCard) return { bodyIndex: -1, elements: [] }

	const elemActions = [...elemCard.querySelectorAll('.jack-framework-actions [tabindex]')]
		.filter((e: HTMLElement) => e.tabIndex >= 0)
	const elemBody = [...elemCard.querySelectorAll('.jack-framework-body [tabindex]')]
		.filter((e: HTMLElement) => e.tabIndex >= 0)

	return {
		bodyIndex: elemActions.length,
		elements: [...elemActions, ...elemBody] as HTMLElement[]
	}
}

function focusPosition(view: ViewStore, position: number): boolean {
	const focusable = getFocusableElements(view)
	if (focusable.elements.length <= position || position < 0) return false
	focusable.elements[position].focus()
	return true
}

function focusAuto(view: ViewStore): number {
	const focusable = getFocusableElements(view)
	if (focusable.elements.length == 0) return -1

	let indexFocus = focusable.elements.findIndex(e => e.autofocus)
	if (indexFocus == -1) indexFocus = focusable.bodyIndex
	if (indexFocus == -1) indexFocus = 0
	focusable.elements[indexFocus].focus()

	return indexFocus
}

