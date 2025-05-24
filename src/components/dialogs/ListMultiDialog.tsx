import { DialogProps } from "@/components/dialogs/Dialog"
import Component from "@/components/format/Component"
import { RenderRowBaseProps } from "@/components/lists/EditList"
import List from "@/components/lists/List"
import ArrowRightIcon from "@/icons/ArrowRightIcon"
import { FunctionComponent, useMemo, useState } from "react"
import ElementDialog from "./ElementDialog"
import ListMultiWithFilter2 from "../lists/ListMultiWithFilter2"



/** un COMPONENT che se premuto apre una DIALOG con una LIST */
interface Props extends DialogProps {
	items: any[]
	readOnly?: boolean

	selects: any[]
	onChangeSelect?: (ids: any[]) => void

	style?: React.CSSProperties
	fnGetId?: (item: any) => any
	fnGetString?: (item: any) => string
}

const ListMultiDialog: FunctionComponent<Props> = ({
	items,
	readOnly,

	selects,
	onChangeSelect,

	style,
	fnGetId = (item) => item,
	fnGetString = (item) => item.toString(),

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
				onChangeSelects={onChangeSelect}
				fnGetId={fnGetId}
				fnGetString={fnGetString}
			/>
		</ElementDialog>
	</>
}

export default ListMultiDialog
