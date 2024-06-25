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
import TooltipWrapCmp from "../../components/tooltip/TooltipWrapCmp"
import EditorIcon from "../../icons/EditorIcon"
import FloatButton from "../../components/buttons/FloatButton"
import SendIcon from "../../icons/SendIcon"
import LinkButton from "../../components/buttons/LinkButton"
import Table from "../../components/table"



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
		icon={<EditorIcon />}
		className={cls.root}
		store={store}
	>
		<div className="lyt-form">

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

			<TextInput value={text} onChange={text => setText(text)} />

			<AlertDialog store={store} />

			<FloatButton
				style={{ position: "relative" }}
				onClick={() => console.log("click float")}
				disabled={false}
			><SendIcon /></FloatButton>

			<LinkButton
				icon={<SendIcon />}
				tooltip="KVENTRIES"
				selected={true}
				onClick={() => console.log("click link button")}
				renderExtra={<div>CIAO</div>}
			/>

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

