import { DialogProps } from "@/components/dialogs/Dialog"
import Component from "@/components/format/Component"
import { RenderRowBaseProps } from "@/components/lists/EditList"
import List from "@/components/lists/List"
import ArrowRightIcon from "@/icons/ArrowRightIcon"
import { FunctionComponent, useState } from "react"
import ElementDialog from "./ElementDialog"



/** un COMPONENT che se premuto apre una DIALOG con una LIST */
interface Props extends DialogProps {
	items: any[]
	readOnly?: boolean
	select?: any

	style?: React.CSSProperties
	RenderRow?: FunctionComponent<RenderRowBaseProps<string>>
	/** funzione per ottenere l'id dell'oggetto */
	fnGetId?: (item: any) => any
	/** funzione per ottenere la stringa da visualizzare dell'oggetto */
	fnGetString?: (item: any) => string

	onChangeSelect?: (id: any) => void

}

const ListDialog2: FunctionComponent<Props> = ({
	items,
	readOnly,
	select,

	style,
	RenderRow,
	fnGetId = (item) => item,
	fnGetString = (item) => item.toString(),
	
	onChangeSelect,
	...props
}) => {

	// STORE

	// HOOKs

	// HANDLER
	const [element, setElement] = useState<HTMLElement>(null)
	const handleDialogOpen = (e) => setElement(!!element ? null : e.target)
	const handleSelect = (index: number) => {
		setElement(null)
		onChangeSelect(fnGetId?.(items[index]) ?? items[index])
	}

	// RENDER
	if (!items) return null
	const indexSelect = items.findIndex(item => fnGetId?.(item) == select)

	return <>
		<Component
			onClick={handleDialogOpen}
			enterRender={<ArrowRightIcon style={{ opacity: 0.5 }} />}
		>{fnGetString(items[indexSelect])}</Component>

		<ElementDialog
			{...props}
			title={null}
			element={element}
			onClose={() => setElement(null)}
		>
			<List<any>
				select={indexSelect}
				items={items}
				RenderRow={({ item }) => <div className="jack-list-row">{fnGetString(item) ?? ""}</div>}
				onSelect={handleSelect}
				readOnly={readOnly}
			/>
		</ElementDialog>
	</>
}

export default ListDialog2
