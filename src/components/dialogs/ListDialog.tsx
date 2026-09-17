import { DialogProps } from "@/components/dialogs/Dialog"
import Component from "@/components/format/Component"
import { RenderRowBaseProps } from "@/components/lists/EditList"
import List from "@/components/lists/List"
import ArrowRightIcon from "@/icons/ArrowRightIcon"
import { FunctionComponent, useState } from "react"
import ElementDialog from "./ElementDialog"



interface Props extends DialogProps {
	items: string[]
	/** funzione per renderizzare ogni riga della LIST, riceve come parametro l'ITEM */
	RenderRow?: FunctionComponent<RenderRowBaseProps<string>>
	readOnly?: boolean
	/** indice selezionato */
	select?: number
	onSelect?: (index: number) => void
	style?: React.CSSProperties
}

/** 
 * un COMPONENT che se premuto apre una DIALOG con una LIST per poter selezionare un item. 
 * Il COMPONENT mostra l'item selezionato, o null se non c'è selezione
 * */
const ListDialog: FunctionComponent<Props> = ({
	items,
	RenderRow = ({ item }) => <div className="jack-list-row">{item?.toString() ?? ""}</div>,
	select,
	style,
	readOnly,
	onSelect,
	...props
}) => {

	// STORE

	// HOOKs

	// HANDLER
	const [element, setElement] = useState<HTMLElement>(null)
	const handleDialogOpen = (e) => setElement(!!element ? null : e.target)
	const handleSelect = (index: number) => {
		setElement(null)
		onSelect(index)
	}

	// RENDER
	if (!items) return null

	return <>
		<Component
			onClick={handleDialogOpen}
			enterRender={<ArrowRightIcon style={{ opacity: 0.5 }} />}
		>
			<RenderRow item={items[select]} />
		</Component>

		<ElementDialog
			{...props}
			title={null}
			element={element}
			onClose={() => setElement(null)}
		>
			<List<string>
				select={select}
				items={items}
				RenderRow={RenderRow}
				onSelect={handleSelect}
				readOnly={readOnly}
			/>
		</ElementDialog>
	</>
}

export default ListDialog
