import { DialogProps } from "@/components/dialogs/Dialog"
import Component from "@/components/format/Component"
import ArrowRightIcon from "@/icons/ArrowRightIcon"
import { FunctionComponent, useMemo, useState } from "react"
import ListMultiWithFilter2 from "../lists/ListMultiWithFilter2"
import ElementDialog from "./ElementDialog"



/** un COMPONENT che se premuto apre una DIALOG con una LIST */
interface Props extends DialogProps {
	/** tutti gli oggetti presenti il lista */
	items: any[]
	readOnly?: boolean
	/** array di id degli oggetti selezionati */
	selects: any[]
	/** funzione che viene chiamata quando cambia la selezione */
	onChangeSelect?: (ids: any[]) => void

	style?: React.CSSProperties
	/** funzione per ottenere l'id dell'oggetto */
	fnGetId?: (item: any) => any
	/** funzione per ottenere la stringa da visualizzare dell'oggetto */
	fnGetString?: (item: any) => string
}

const ListMultiDialog: FunctionComponent<Props> = ({
	items,
	readOnly,

	selects,
	onChangeSelect,

	style,
	fnGetId = (item) => item,
	fnGetString = (item) => item?.toString() ?? "",

	...props
}) => {

	// STORE

	// HOOKs

	// HANDLER
	const [element, setElement] = useState<HTMLElement>(null)
	const handleDialogOpen = (e) => setElement(!!element ? null : e.target)
	

	// RENDER
	if (!items) return null
	const value = useMemo(() => {
		return selects.map((id) => {
			const item = items.find(item => fnGetId?.(item) == id)
			return fnGetString?.(item) ?? item
		}).join(", ")
	}, [selects, items])
	

	return <>
		<Component
			onClick={handleDialogOpen}
			enterRender={<ArrowRightIcon style={{ opacity: 0.5 }} />}
			readOnly={readOnly}
		>{value}</Component>

		<ElementDialog
			{...props}
			title={null}
			element={element}
			onClose={() => setElement(null)}
		>
			<ListMultiWithFilter2
				selects={selects}
				items={items}
				readOnly={readOnly}
				onChangeSelects={onChangeSelect}
				fnGetId={fnGetId}
				fnGetString={fnGetString}
			/>
		</ElementDialog>
	</>
}

export default ListMultiDialog
