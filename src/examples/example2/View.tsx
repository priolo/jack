import Button from "@/components/buttons/Button"
import FrameworkCard from "@/components/cards/FrameworkCard"
import { Example2State, Example2Store } from "@/examples/example2"
import { useStore } from "@priolo/jon"
import { FunctionComponent, useState } from "react"
import AlertDialog from "../../components/dialogs/AlertDialog"
import ListDialog from "../../components/dialogs/ListDialog"
import TextInput from "../../components/input/TextInput"
import StringUpRow from "../../components/rows/StringUpRow"
import cls from "./View.module.css"
import TooltipWrapCmp from "../../app/tooltip/TooltipWrapCmp"
import EditorIcon from "../../icons/EditorIcon"
import FloatButton from "../../components/buttons/FloatButton"
import SendIcon from "../../icons/SendIcon"
import Table from "../../components/table"
import Header from "../../components/cards/Header"



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
	const [idSelected, setIdSelected] = useState(null)

	// HANDLER
	const handleClick = () => {
		store.alertOpen({
			title: "BUCKET DELETION",
			body: "This action is irreversible.\nAre you sure you want to delete the BUCKET?",
		})
	}

	// RENDER
	return <FrameworkCard
		headerRender={<Header store={store} icon={<EditorIcon />} />}
		className={cls.root}
		store={store}
	>
		<div className="jack-lyt-form">

			<TooltipWrapCmp content="TOOLTIP!!!">
				<div>EXAMPLE 2</div>
			</TooltipWrapCmp>

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

			<TextInput 
				multiline={true}
				value={text} 
				onChange={text => setText(text)} 
			/>

			<AlertDialog store={store} />

			<FloatButton
				style={{ position: "relative" }}
				onClick={() => console.log("click float")}
				disabled={false}
			><SendIcon /></FloatButton>

			
			<Table
				items={[
					{ id: 1, name: "Ivano"},
					{ id: 2, name: "Edoardo"},
					{ id: 3, name: "Alfredo"},
				]}
				props={[
					{ label: "ID", getValue: item => item.id, isMain: true },
					{ label: "NAME", getValue: item => item.name},
				]}
				selectId={idSelected}
				onSelectChange={item=>setIdSelected(item.id)}
				getId={item => item.id}
				singleRow={true}
			/>

		</div>

	</FrameworkCard>
}

export default Example2View

