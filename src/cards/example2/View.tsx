import Button from "@/components/buttons/Button"
import FrameworkCard from "@/components/cards/FrameworkCard"
import { Example2State, Example2Store } from "@/stores/stacks/example2"
import { useStore } from "@priolo/jon"
import { FunctionComponent, useState } from "react"
import AlertDialog from "../../components/dialogs/AlertDialog"
import ListDialog from "../../components/dialogs/ListDialog"
import TextInput from "../../components/input/TextInput"
import StringUpRow from "../../components/rows/StringUpRow"
import cls from "./View.module.css"



interface Props {
	store?: Example2Store
}

const Example2View: FunctionComponent<Props> = ({
	store,
}) => {

	// STORE
	const state = useStore<Example2State>(store)

	// HOOKs
	const [index, setIndex] = useState(-1)
	const [text, setText] = useState("")

	// HANDLER
	const handleClick = ()=>{
		store.alertOpen({
			title: "BUCKET DELETION",
			body: "This action is irreversible.\nAre you sure you want to delete the BUCKET?",
		})
	}

	// RENDER
	return <FrameworkCard
		className={cls.root}
		store={store}
	>
		<div className="lyt-form">

			<div>EXAMPLE 2</div>

			<Button
				onClick={handleClick}
			>CLICK ME</Button>

			<ListDialog width={100}
				store={store}
				select={index}
				items={["primo", "secondo", "terzo", "quarto"]}
				RenderRow={StringUpRow}
				onSelect={(index) => setIndex(index)}
			/>

			<TextInput value={text} onChange={text => setText(text)} />

			<AlertDialog store={store} />

		</div>

	</FrameworkCard>
}

export default Example2View

