import { DialogProps } from "@/components/dialogs/Dialog"
import Component from "@/components/format/Component"
import { RenderRowBaseProps } from "@/components/lists/EditList"
import List from "@/components/lists/List"
import ArrowRightIcon from "@/icons/ArrowRightIcon"
import { FunctionComponent, useState } from "react"
import ElementDialog from "./ElementDialog"



interface Props extends DialogProps {
	/** array di ITEMS selezionabili */
	items: any[]
	/** id selezionato */
	select?: any
	/** funzione per renderizzare ogni riga della LIST, riceve come parametro l'ITEM */
	//RenderRow?: FunctionComponent<RenderRowBaseProps<string>>
	readOnly?: boolean
	style?: React.CSSProperties

	/** funzione per ottenere l'id dell'oggetto */
	fnGetId?: (item: any) => any
	/** funzione per ottenere la stringa da visualizzare dell'oggetto */
	fnGetString?: (item: any) => string

	onChangeSelect?: (id: any) => void
}

/** 
 * un COMPONENT che se premuto apre una DIALOG con una LIST per poter selezionare un item. 
 * Il COMPONENT mostra l'item selezionato, o null se non c'è selezione
 * a differenza di ListDialog:
 * permette di gestire oggetti, non solo stringhe.
 * */
const ListDialog2: FunctionComponent<Props> = ({
	items,
	select,
	//RenderRow,

	readOnly,
	style,
	
	fnGetId = (item) => item,
	fnGetString = (item) => item?.toString() ?? "",
	
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
