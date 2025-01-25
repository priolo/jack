import { StoreCore, createStore } from "@priolo/jon"
import { ViewStore } from "../stacks/viewBase"
import { focusAuto, focusPosition } from "./utils"
import { Shortcut } from "./types"
import { startListener } from "./keyevents"
import { getNear } from "../docs/utils"
import docsSo from "../docs"



/** gestisce il FOCUS */
const setup = {

	state: {
		/** la CARD che attualmente ha il fuoco */
		view: <ViewStore>null,
		/** il focus è visibile */
		show: false,
		/** posizione del componente con fuoco */
		position: -1,
		shortcuts: <Shortcut[]>[],
	},

	getters: {
	},

	actions: {
		focus: (view: ViewStore, store?: FocusStore) => {
			store.setView(view)
			if (!view) return
			store.setPosition(focusAuto(view))
		},
		exeShortcut: (
			event: { code: string, altKey: boolean, shiftKey: boolean, ctrlKey: boolean },
			store?: FocusStore
		) => {
			const shortcuts = store.state.shortcuts?.filter(s => s.code == event.code) ?? []
			if (shortcuts.length == 0) return
			shortcuts.forEach((s) => s.action())
		},
		moveVert(up: boolean, store?: FocusStore) {
			if (store.state.position == -1) {
				store.setPosition(focusAuto(store.state.view))
				return true
			}
			let nextPosition = store.state.position + (up ? -1 : 1)
			if (!focusPosition(store.state.view, nextPosition)) return false
			store.setPosition(nextPosition)
			return true
		},
		moveHoriz(left: boolean, store?: FocusStore) {
			const view = store.state.view
			if (!!view && docsSo.state.zenCard == view) return
			const card = getNear(view, left)
			store.focus(card)
		}
	},

	mutators: {
		setView: (view: ViewStore) => ({ view }),
		setShow: (show: boolean) => ({ show }),
		setPosition: (position: number) => ({ position }),
		setShortcuts: (shortcuts: Shortcut[]) => ({ shortcuts }),
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

startListener()

// document.addEventListener('keydown', (event) => {
// 	if (!event.altKey) return
// 	focusSo.setShow(true)
// 	if (event.code == "AltLeft" || event.code == "AltRight") {
// 		event.preventDefault()
// 		return
// 	}
// 	focusSo.exeShortcut(event)
// })

// document.addEventListener('keyup', (event) => {
// 	if (!event.altKey) focusSo.setShow(false)
// })