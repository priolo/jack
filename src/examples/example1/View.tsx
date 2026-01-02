import FrameworkCard from "@/components/cards/FrameworkCard"
import ListDialog2 from "@/components/dialogs/ListDialog2"
import ListMultiDialog from "@/components/dialogs/ListMultiDialog"
import EditList from "@/components/lists/EditList"
import { MESSAGE_TYPE } from "@/stores/stacks/types"
import { createStore, useStore } from "@priolo/jon"
import { FunctionComponent, useState } from "react"
import { Example1State, ItemExample } from "."
import TooltipWrapCmp from "../../app/tooltip/TooltipWrapCmp"
import Button from "../../components/buttons/Button"
import Header from "../../components/cards/Header"
import Dialog from "../../components/dialogs/Dialog"
import TextInput from "../../components/input/TextInput"
import DoneIcon from "../../icons/DoneIcon"
import example2Setup, { Example2Store } from "../example2"
import { Example1Store } from "./index"
import cls from "./View.module.css"
import EditItemRow from "@/components/rows/EditItemRow"



interface Props {
	store?: Example1Store
}

const Example1View: FunctionComponent<Props> = ({
	store,
}) => {

	// STORE
	useStore<Example1State>(store)

	// HOOKs
	const [open, setOpen] = useState(false)
	const [markdownText, setMarkdownText] = useState("# Welcome to Markdown Editor\n\nThis is a **SlateJS** powered markdown editor with *live preview*.\n\n## Features\n\n- **Bold** and *italic* text\n- `Inline code`\n- Code blocks\n- Lists and more!\n\n> This is a blockquote example\n\n```javascript\nconst hello = 'world';\nconsole.log(hello);\n```")
	const [itemsSelect, setItemsSelect] = useState<number[]>([])
	const [itemSelect, setItemSelect] = useState<number>(-1)

	// HANDLER
	const handleOpenLinked = (e: React.MouseEvent) => {
		const newStore = createStore(example2Setup) as Example2Store
		if (e.shiftKey) {
			store.state.group.add({ view: newStore, index: store.state.group.getIndexByView(store) + 1, anim: true })
		} else {
			store.state.group.addLink({ view: newStore, parent: store, anim: true })
		}
	}
	const handleIconClick = (type: MESSAGE_TYPE) => {
		console.log("icon button click")
		store.setSnackbar({
			open: true, title: "TITLE", body: "!!body!!", type
		})
	}

	// RENDER
	const items = [
		{ id: 1, name: "pippo" },
		{ id: 2, name: "pluto" },
		{ id: 3, name: "paperino" },
		{ id: 4, name: "topolino" },
	]


	return <FrameworkCard
		headerRender={<Header store={store} icon={<DoneIcon />} />}
		actionsRender={<>
			<Button children="SAVE" />
			<Button children="CANCEL" />
		</>}
		className={cls.root}
		store={store}
	>

		<div className="jack-lyt-form">

			{/* TOOLTIP */}
			<TooltipWrapCmp content="TOOLTIP !!!">
				<div className="jack-lbl-prop-title">
					DEFAULT COMPONENTS
				</div>
			</TooltipWrapCmp>

			{/* BUTTONS */}
			<div className="jack-lbl-prop">
				BUTTONS
			</div>

			<Button
				onClick={() => setOpen(true)}
			>OPEN DIALOG</Button>

			<Dialog noCloseOnClickParent
				title="FILTERS"
				store={store}

				//width={140}
				open={open}
				onClose={() => setOpen(false)}
				timeoutClose={-1}
			>
				<div>CIAO</div>
			</Dialog>


			<Button
				onClick={handleOpenLinked}
			>OPEN CARD</Button>

			<Button select={store.state.toogle}
				onClick={() => store.setToggle(!store.state.toogle)}
			>TOGGLE</Button>

			{/* TEXT INPUT */}
			<div className="jack-lbl-prop">
				INPUTS
			</div>
			<TextInput
				value={store.state.text}
				onChange={text => store.setText(text)}
			/>

			<div className="jack-divider-h"/>


			{/* LISTS */}

			<div className="jack-lbl-prop">
				LISTS
			</div>

			<ListMultiDialog
				store={store}
				items={items}
				selects={itemsSelect}
				onChangeSelect={(ids) => setItemsSelect(ids)}
				fnGetId={(item) => item?.id}
				fnGetString={(item) => item?.name}
			/>

			<ListDialog2
				store={store}
				items={items}
				select={itemSelect}
				onChangeSelect={(id) => setItemSelect(id)}
				fnGetId={(item) => item?.id}
				fnGetString={(item) => item?.name}
			/>

			<EditList<ItemExample>
				items={store.state.items}
				RenderRow={(props) => <EditItemRow {...props} item={props.item?.name} />}
				select={store.state.itemSelectedIndex}
				onItemsChange={(itemsNew) => store.setItems(itemsNew)}
				onSelectChange={(index) => store.setItemSelectedIndex(index)}
				onNewItem={(index) => ({ id: Date.now(), name: "new item" })}
			/>
		</div>

	</FrameworkCard>
}

export default Example1View

