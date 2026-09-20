import { COLOR_VAR } from "@/stores/layout"
import viewSetup, { ViewStore } from "@/stores/stacks/viewBase"
import { StoreOf, mixStores } from "@priolo/jon"
import { ViewState } from "../../stores/stacks/viewBase"
import { DOC_TYPE } from "../types"



const setup = {

	state: {

		text: <string>"CIAO!",

		//#region VIEWBASE
		type: DOC_TYPE.EXAMPLE1,
		width: 150,
		colorVar: COLOR_VAR.GENERIC,
		pinnable: false,
		//#endregion
	},

	getters: {
		//#region VIEWBASE
		getTitle: (_: void, store?: ViewStore) => "EXAMPE 1",
		getSubTitle: (_: void, store?: ViewStore) => "Is only a example",
		getSerialization: (_: void, store?: ViewStore) => {
			const state = store.state as Example1State
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

const example1Setup = mixStores(viewSetup, setup)
export type Example1Store = StoreOf<typeof example1Setup>
export type Example1State = Example1Store["state"]
export default example1Setup


