import FrameworkCard from "@/components/cards/FrameworkCard"
import { Example1Store } from "@/stores/stacks/example1"
import { useStore } from "@priolo/jon"
import { FunctionComponent, useState } from "react"
import Button from "../../JackTest"
import Dialog from "../../components/dialogs/Dialog"
import TextInput from "../../components/input/TextInput"
import { Example1State } from "../../stores/stacks/example1"
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

	// RENDER
	return <FrameworkCard
		className={cls.root}
		store={store}
	>
		<div>EXAMPLE 1</div>

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

	</FrameworkCard>
}

export default Example1View

