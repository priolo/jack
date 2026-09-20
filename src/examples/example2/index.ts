import { COLOR_VAR } from "@/stores/layout"
import viewSetup, { ViewStore } from "@/stores/stacks/viewBase"
import { StoreOf, mixStores } from "@priolo/jon"
import { DOC_TYPE } from "../types"



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

const example2Setup = mixStores(viewSetup, setup)
export type Example2Store = StoreOf<typeof example2Setup>
export type Example2State = Example2Store["state"]
export default example2Setup


