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

	// HANDLER
	const handleOpenLinked = () => {
		const newStore = createStore(example2Setup) as Example2Store
		store.state.group.addLink({ view: newStore, parent: store, anim: true })
	}
	const handleIconClick = () => {
		console.log("icon button click")
		store.setSnackbar({
			open: true, title: "TITLE", body: "!!body!!", type: MESSAGE_TYPE.ERROR
		})
	}

	// RENDER
	return <FrameworkCard
		headerRender={<Header store={store} icon={<DoneIcon />} />}
		actionsRender={<div />}
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

			<Button select
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

		</div>

	</FrameworkCard>
}

export default Example1View

