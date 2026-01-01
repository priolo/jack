import FrameworkCard from "@/components/cards/FrameworkCard"
import ListDialog2 from "@/components/dialogs/ListDialog2"
import ListMultiDialog from "@/components/dialogs/ListMultiDialog"
import MarkdownEditor from "@/components/input/MarkdownEditor"
import DirectionDownIcon from "@/icons/DirectionDownIcon"
import DirectionLeftIcon from "@/icons/DirectionLeftIcon"
import DirectionUpIcon from "@/icons/DirectionUpIcon"
import { MESSAGE_TYPE } from "@/stores/stacks/types"
import { createStore, useStore } from "@priolo/jon"
import { FunctionComponent, useState } from "react"
import { Example1State } from "."
import TooltipWrapCmp from "../../app/tooltip/TooltipWrapCmp"
import Button from "../../components/buttons/Button"
import IconButton from "../../components/buttons/IconButton"
import Header from "../../components/cards/Header"
import Dialog from "../../components/dialogs/Dialog"
import TextInput from "../../components/input/TextInput"
import DirectionRightIcon from "../../icons/DirectionRightIcon"
import DoneIcon from "../../icons/DoneIcon"
import example2Setup, { Example2Store } from "../example2"
import MarkdownEditorTest from "../MarkdownEditorTest"
import { Example1Store } from "./index"
import cls from "./View.module.css"



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
			<TooltipWrapCmp content="TOOLTIP 1!!!">
				<div>EXAMPLE 1</div>
			</TooltipWrapCmp>

			<Button
				onClick={() => setOpen(true)}
			>OPEN DIALOG</Button>

			<Button select className="jack-focus-1"
				onClick={handleOpenLinked}
			>OPEN CARD 2</Button>

			{/* TEXT INPUT collegata alla STORE */}
			<TextInput
				value={store.state.text}
				onChange={text => store.setText(text)}
			/>

			<MarkdownEditor
				value={markdownText}
				onChange={text => setMarkdownText(text)}
				placeholder="Enter your markdown here..."
				style={{ minHeight: '200px', marginTop: '10px' }}
			/>

			<MarkdownEditorTest />

			<div className="jack-cmp-h">
				<IconButton effect tabIndex={3}
					onClick={() => handleIconClick(MESSAGE_TYPE.SUCCESS)}
				><DirectionRightIcon /></IconButton>
				<IconButton effect tabIndex={3}
					onClick={() => handleIconClick(MESSAGE_TYPE.INFO)}
				><DirectionUpIcon /></IconButton>
				<IconButton effect tabIndex={3}
					onClick={() => handleIconClick(MESSAGE_TYPE.WARNING)}
				><DirectionDownIcon /></IconButton>
				<IconButton effect tabIndex={3}
					onClick={() => handleIconClick(MESSAGE_TYPE.ERROR)}
				><DirectionLeftIcon /></IconButton>
			</div>


			{/* DIALOGS */}

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


		</div>

	</FrameworkCard>
}

export default Example1View

