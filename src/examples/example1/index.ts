import { COLOR_VAR } from "@/stores/layout"
import viewSetup, { ViewStore } from "@/stores/stacks/viewBase"
import { StoreOf, mixStores } from "@priolo/jon"
import { DOC_TYPE } from "../types"


export type ItemExample = { id: number; name: string }

const setup = {

	state: {

		text: <string>"ciao!",
		toogle: <boolean>true,

		items: <ItemExample[]>[
			{ id: 1, name: "pippo" },
			{ id: 2, name: "pluto" },
			{ id: 3, name: "paperino" },
			{ id: 4, name: "topolino" },
		],
		itemSelectedIndex: <number>-1,

		strings: [ "uno", "due", "tre", "quattro" ],

		//#region VIEWBASE
		type: DOC_TYPE.EXAMPLE1,
		width: 150,
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
				text : state.text,
			}
		},
		//#endregion
	},

	actions: {

		//#region VIEWBASE
		setSerialization: (data: any, store?: ViewStore) => {
			viewSetup.actions.setSerialization(data, store)
			const state = store.state as Example1State
			state.text = data.text ?? ""
		},
		//#endregion

	},

	mutators: {
		setText: (text: string) => ({ text }),
		setToggle: (toogle: boolean) => ({ toogle }),

		setItems: (items: ItemExample[]) => ({ items }),
		setItemSelectedIndex: (itemSelectedIndex: number) => ({ itemSelectedIndex }),

		setStrings: (strings: string[]) => ({ strings }),
	},
}

const example1Setup = mixStores(viewSetup, setup)
export type Example1Store = StoreOf<typeof example1Setup>
export type Example1State = Example1Store["state"]
export default example1Setup
