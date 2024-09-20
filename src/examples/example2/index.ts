import { COLOR_VAR } from "@/stores/layout"
import viewSetup, { ViewStore } from "@/stores/stacks/viewBase"
import { StoreCore, mixStores } from "@priolo/jon"
import { ViewState } from "../../stores/stacks/viewBase"
import { DOC_TYPE } from "../../stores/docs/types"



const setup = {

	state: {

		text: <string>"CIAO 2!",

		//#region VIEWBASE
		type: DOC_TYPE.EXAMPLE2,
		width: 150,
		colorVar: COLOR_VAR.GENERIC,
		pinnable: false,
		//#endregion
	},

	getters: {
		//#region VIEWBASE
		getTitle: (_: void, store?: ViewStore) => "EXAMPE 2",
		getSubTitle: (_: void, store?: ViewStore) => "Is only a example",
		getSerialization: (_: void, store?: ViewStore) => {
			const state = store.state as Example2State
			return {
				...viewSetup.getters.getSerialization(null, store),
			}
		},
		//#endregion
	},

	actions: {

		//#region VIEWBASE
		setSerialization: (data: any, store?: ViewStore) => {
			viewSetup.actions.setSerialization(data, store)
		},
		//#endregion

	},

	mutators: {
		setText: (text: string) => ({ text }),
	},
}

export type Example2State = typeof setup.state & ViewState
export type Example2Getters = typeof setup.getters
export type Example2Actions = typeof setup.actions
export type Example2Mutators = typeof setup.mutators
export interface Example2Store extends ViewStore, StoreCore<Example2State>, Example2Getters, Example2Actions, Example2Mutators {
	state: Example2State
}
const example2Setup = mixStores(viewSetup, setup)
export default example2Setup


