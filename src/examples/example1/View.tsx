import FrameworkCard from "@/components/cards/FrameworkCard"
import ListDialog2 from "@/components/dialogs/ListDialog2"
import ListMultiDialog from "@/components/dialogs/ListMultiDialog"
import EditList, { RenderRowBaseProps } from "@/components/lists/EditList"
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
import AlertDialog from "@/components/dialogs/AlertDialog"
import EditStringRow from "@/components/rows/EditStringRow"
import IconToggle from "@/components/buttons/IconToggle"
import ListRow from "@/components/lists/ListRow"
import Box from "@/components/format/Box"
import IconButton from "@/components/buttons/IconButton"
import CloseIcon from "@/icons/CloseIcon"
import ListObjects from "@/components/lists/ListObjects"



interface Props {
	store?: Example1Store
}

const Example1View: FunctionComponent<Props> = ({
	store,
}) => {

	// STORE
	useStore<Example1State>(store)

	// HOOKs
	const [dialogOpened, setDialogOpened] = useState(false)
	const [itemsMultidialogSelect, setItemsMultidialogSelect] = useState<number[]>([])
	const [itemDialog2Select, setItemDilaog2Select] = useState<number>(-1)
	const [itemsKV, setItemsKV] = useState<[string, string][]>([])

	// HANDLER
	const handleOpenLinked = (e: React.MouseEvent) => {
		const newStore = createStore(example2Setup) as Example2Store
		if (e.shiftKey) {
			store.state.group.add({ view: newStore, index: store.state.group.getIndexByView(store) + 1, anim: true })
		} else {
			store.state.group.addLink({ view: newStore, parent: store, anim: true })
		}
	}
	const handleOpenAlert = () => {
		store.alertOpen({
			title: "ALERT TITLE",
			body: "This is the alert body text.",
		})
	}
	const handleIconClick = (type: MESSAGE_TYPE) => {
		console.log("icon button click")
		store.setSnackbar({
			open: true, title: "TITLE", body: "!!body!!", type
		})
	}

	// RENDER
	const items: ItemExample[] = [
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
				onClick={() => setDialogOpened(true)}
			>OPEN DIALOG</Button>
			<Dialog noCloseOnClickParent
				title="FILTERS"
				store={store}

				//width={140}
				open={dialogOpened}
				onClose={() => setDialogOpened(false)}
				timeoutClose={-1}
			>
				<div>CIAO</div>
			</Dialog>

			{/* Apre una DIALOG di ALERT. Ricorda di mettere anche un <AlertDialog /> nel render della CARD */}
			<Button
				onClick={handleOpenAlert}
			>OPEN ALERT</Button>
			<AlertDialog store={store} />

			<Button
				onClick={handleOpenLinked}
			>OPEN CARD</Button>

			<Button select={store.state.toogle}
				onClick={() => store.setToggle(!store.state.toogle)}
			>BUTTON TOGGLE</Button>

			<IconToggle
				check={store.state.toogle}
				onChange={() => store.setToggle(!store.state.toogle)}
			/>




			{/* TEXT INPUT */}
			<div className="jack-lbl-prop">
				INPUTS
			</div>
			<TextInput
				value={store.state.text}
				onChange={text => store.setText(text)}
			/>

			<div className="jack-divider-h" />




			{/* LISTS */}

			<div className="jack-lbl-prop">
				LISTS
			</div>

			<ListMultiDialog
				store={store}
				items={items}
				selects={itemsMultidialogSelect}
				onChangeSelect={(ids) => setItemsMultidialogSelect(ids)}
				fnGetId={(item) => item?.id}
				fnGetString={(item) => item?.name}
			/>

			<ListDialog2
				store={store}
				items={items}
				select={itemDialog2Select}
				onChangeSelect={(id) => setItemDilaog2Select(id)}
				fnGetId={(item) => item?.id}
				fnGetString={(item) => item?.name}
			/>

			<EditList<string>
				items={store.state.strings}
				RenderRow={EditStringRow}
				onItemsChange={(stringsNew) => store.setStrings(stringsNew)}
				onNewItem={() => ""}
				fnIsVoid={i => !i || i.trim().length == 0}
			/>



			<EditList<ItemExample>
				items={items}
				RenderRow={(props) => <EditItemRow {...props} item={props.item?.name} />}
				onItemsChange={(itemsNew) => store.setItems(itemsNew)}
				onSelectChange={(index) => store.setItemSelectedIndex(index)}
				onNewItem={(index) => ({ id: Date.now(), name: "new item" })}
				fnIsVoid={item => !item.name || item.name.trim().length == 0}
			/>

			<EditList<[string, string]>
				items={itemsKV}
				onItemsChange={itemsKV => setItemsKV(itemsKV)}
				//readOnly={inRead}
				placeholder="ex. 10"
				onNewItem={() => ["", ""]}
				fnIsVoid={m => !m || (m[0] == "" && m[1] == "")}
				RenderRow={EditMetadataRow}
			/>

			<ListObjects<ItemExample>
				store={store}
				items={store.state.items}
				//readOnly={inRead}
				width={170}
				RenderLabel={({ item, index }) => (
					<div className="jack-cmp-h">
						{item?.name?.toUpperCase()}
					</div>
				)}
				RenderForm={ItemEditableForm}
				onDelete={(index, item) => {
					store.setItems(store.state.items.filter(i => i.id !== item.id))
				}}
				onChange={(items) => store.setItems(items)}
			/>

		</div>

	</FrameworkCard>
}


// ItemEditableRow: separate component to render/edit an ItemExample
const ItemEditableForm: FunctionComponent<{
	item: ItemExample
	index?: number
	onClose?: () => void
	onChange?: (item: ItemExample) => void

}> = ({ item, index, onClose, onChange }) => {


	return (
		<div className="jack-lyt-form">
			<div>{item?.id ?? "--"}</div>
			<TextInput
				value={item?.name ?? ""}
				onChange={(name) => onChange({ ...item, name })}
			/>
			<div>{item?.name ?? "--"}</div>
		</div>
	)
}

export default Example1View





const EditMetadataRow: FunctionComponent<RenderRowBaseProps<[string, string]>> = ({
	item,
	isSelect,
	readOnly = false,
	placeholder,
	onChange,
	onSelect,
}) => {


	const handleKeyChange = (key: string) => {
		onChange([key, item?.[1] ?? ""])
	}
	const handleValueChange = (value: string) => {
		onChange([item?.[0] ?? "", value])
	}
	const handleDelete = () => onChange?.(null)

	return <Box style={{ display: "flex", alignItems: "center", margin: "3px 0px" }}
		enterRender={!readOnly &&
			<IconButton onClick={handleDelete} >
				<CloseIcon />
			</IconButton>}
	>
		<TextInput style={{ flex: 1 }}
			focus={isSelect}
			value={item?.[0] ?? ""}
			onChange={handleKeyChange}
		/>
		<div>:</div>
		<TextInput style={{ flex: 3 }}
			value={item?.[1] ?? ""}
			onChange={handleValueChange}
		/>
	</Box>
}

