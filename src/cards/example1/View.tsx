import FrameworkCard from "@/components/cards/FrameworkCard"
import { Example1Store } from "@/stores/stacks/example1"
import { createStore, useStore } from "@priolo/jon"
import { FunctionComponent, useState } from "react"
import Button from "../../JackTest"
import Dialog from "../../components/dialogs/Dialog"
import TextInput from "../../components/input/TextInput"
import { Example1State } from "../../stores/stacks/example1"
import cls from "./View.module.css"
import { buildStore } from "../../stores/docs/utils/factory"
import example2Setup, { Example2Store } from "../../stores/stacks/example2"
import { ViewStore } from "../../stores/stacks/viewBase"
import TooltipWrapCmp from "../../components/tooltip/TooltipWrapCmp"
import DoneIcon from "../../icons/DoneIcon"



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

	// RENDER
	return <FrameworkCard
		icon={<DoneIcon/>}
		className={cls.root}
		store={store}
	>

		<div className="lyt-form">

			<TooltipWrapCmp content="TOOLTIP 1!!!">
				<div>EXAMPLE 1</div>
			</TooltipWrapCmp>

			<div>{state.text}</div>

			<Button
				onClick={() => setOpen(true)}
			>CLICK ME</Button>

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

			<TextInput value={text} onChange={text => setText(text)} />

			<Button
				onClick={handleOpenLinked}
			>OPEN</Button>

		</div>

	</FrameworkCard>
}

export default Example1View

