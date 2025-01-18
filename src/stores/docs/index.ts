import { DOC_TYPE } from "@/examples/types"
import { StoreCore, createStore } from "@priolo/jon"
import { ViewStore } from "../stacks/viewBase"
import { delay, delayAnim } from "@/utils/time"
import { CardsStore } from "./cards"



export enum DRAWER_POSITION {
	RIGHT = "right",
	BOTTOM = "bottom",
}

export enum FIXED_CARD {
	CONNECTIONS = 0,
	LOGS = 1,
	ABOUT = 2,
}

/**
 * Gestisce la lista di DOCS presenti
 */
const setup = {

	state: {
		fixedViews: <ViewStore[]>null,
		allDeck: <CardsStore[]>[],
		/** la CARD attualmente in ZEN */
		zenCard: <ViewStore>null,
		zenOpen: false,
		/** indica quale tipo di CARD era aperta precedentemente  */
		cardOptions: <{ [type: string]: string }>{},
		drawerPosition: DRAWER_POSITION.RIGHT,
	},

	getters: {
		getSerialization: (_: void, store?: DocStore) => {
			return {
				drawerPosition: store.state.drawerPosition,
			}
		},
		getAllCards: (_:void, store?: DocStore) => store.state.allDeck.reduce<ViewStore[]>((acc, store) => [...acc, ...store.state.all], []),
	},

	actions: {
		setSerialization: (state: any, store?: DocStore) => {
			store.state.drawerPosition = state.drawerPosition
		},
		zenOpen: async (card: ViewStore, store?: DocStore) => {
			if ( !card ) return
			store.setZenCard(card)
			await delayAnim()
			store.setZenOpen(true)
		},
		zenClose: async (_: void, store?: DocStore) => {
			store.setZenOpen(false)
			await delay(300)
			store.state.zenCard._update()
			store.setZenCard(null)
		}
	},

	mutators: {
		setZenCard: (zenCard: ViewStore) => ({ zenCard }),
		setZenOpen: (zenOpen: boolean) => ({ zenOpen }),
		setDrawerPosition: (drawerPosition: DRAWER_POSITION) => ({ drawerPosition }),

		setFixedViews: (fixedViews: ViewStore[]) => ({ fixedViews }),
		setAllDeck: (allDeck: CardsStore[]) => ({ allDeck }),
	},
}

export type DocState = typeof setup.state
export type DocGetters = typeof setup.getters
export type DocActions = typeof setup.actions
export type DocMutators = typeof setup.mutators
export interface DocStore extends StoreCore<DocState>, DocGetters, DocActions, DocMutators {
	state: DocState
}
const docsSo = createStore(setup) as DocStore

export default docsSo
