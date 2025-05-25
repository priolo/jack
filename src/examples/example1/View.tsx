import FrameworkCard from "@/components/cards/FrameworkCard"
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
import { MESSAGE_TYPE } from "@/stores/stacks/types"
import example2Setup, { Example2Store } from "../example2"
import { Example1Store } from "./index"
import cls from "./View.module.css"
import ListMultiDialog from "@/components/dialogs/ListMultiDialog"
import MarkdownEditor from "@/components/input/MarkdownEditor"



interface Props {
	store?: Example1Store
}

const Example1View: FunctionComponent<Props> = ({
	store,
}) => {

	// STORE
	const state = useStore<Example1State>(store)

	// HOOKs
	const [open, setOpen] = useState(false)
	const [text, setText] = useState("")
	const [markdownText, setMarkdownText] = useState("# Welcome to Markdown Editor\n\nThis is a **SlateJS** powered markdown editor with *live preview*.\n\n## Features\n\n- **Bold** and *italic* text\n- `Inline code`\n- Code blocks\n- Lists and more!\n\n> This is a blockquote example\n\n```javascript\nconst hello = 'world';\nconsole.log(hello);\n```")
	const [itemsSelect, setItemsSelect] = useState<number[]>([])

	// HANDLER
	const handleOpenLinked = (e: React.MouseEvent) => {
		const newStore = createStore(example2Setup) as Example2Store
		if (e.shiftKey) {
			store.state.group.add({ view: newStore, index: store.state.group.getIndexByView(store) + 1, anim: true })
		} else {
			store.state.group.addLink({ view: newStore, parent: store, anim: true })
		}
	}
	const handleIconClick = () => {
		console.log("icon button click")
		store.setSnackbar({
			open: true, title: "TITLE", body: "!!body!!", type: MESSAGE_TYPE.ERROR
		})
	}

	// RENDER
const items = [
	{ id: 1, name: "pippo"},
	{ id: 2, name: "pluto"},
	{ id: 3, name: "paperino"},
	{ id: 4, name: "topolino"},
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

			<TooltipWrapCmp content="TOOLTIP 1!!!">
				<div>EXAMPLE 1</div>
			</TooltipWrapCmp>

			<div>{state.text}</div>

			<Button
				onClick={() => setOpen(true)}
			>CLICK ME</Button>

			<TextInput
				value={text}
				onChange={text => setText(text)}
			/>

			<MarkdownEditor
				value={markdownText}
				onChange={text => setMarkdownText(text)}
				placeholder="Enter your markdown here..."
				style={{ minHeight: '200px', marginTop: '10px' }}
			/>

			<Button select className="jack-focus-1"
				onClick={handleOpenLinked}
			>OPEN</Button>

			<IconButton effect tabIndex={3}
				onClick={handleIconClick}
			><DirectionRightIcon /></IconButton>


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


		</div>

	</FrameworkCard>
}

export default Example1View

