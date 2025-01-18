import React, { FunctionComponent, useMemo, useState, useEffect } from "react"
import CopyButton from "../buttons/CopyButton"
import Header, { ORDER_TYPE } from "./Header"
import cls from "./Table.module.css"



export interface ItemProp {
	label?: string
	getValue?: (item: any) => any
	getShow?: (item: any) => string
	isMain?: boolean
}

interface Props {
	/** le prop da visualizzare nelle colonne */
	props: ItemProp[]
	/** i dati */
	items?: any[]
	/** l'id selezionato */
	selectId?: string
	/** stessa riga per propMain e props */
	singleRow?: boolean
	/** evento cambio selezione */
	onSelectChange?: (item: any) => void
	/** callback per determinare un id di un item */
	getId?: (item: any) => string
	style?: React.CSSProperties
	tabIndex?: number
}

const Table: FunctionComponent<Props> = ({
	props,
	items = [],
	selectId,
	singleRow,
	onSelectChange,
	getId = (item) => item.toString(),
	style,
	tabIndex = 0,
}) => {

	// STORE
	const [propOrder, setPropOrder] = useState<ItemProp>(null)
	const [typeOrder, setTypeOrder] = useState<ORDER_TYPE>(ORDER_TYPE.ASC)

	// HOOKs
	const propMain = useMemo(() => props.find(p => p.isMain), [props])
	const propToShow = useMemo(() => singleRow ? props : props.filter(p => !p.isMain), [props, singleRow])
	const itemsSort: any[] = useMemo(() => {
		if (!propOrder || typeOrder == ORDER_TYPE.NOTHING) {
			return items.sort((i1, i2) => {
				const v1 = getValueString(i1, propMain)
				const v2 = getValueString(i2, propMain)
				return v1?.toString()?.localeCompare?.(v2?.toString()) ?? 0
			})
		}
		return items.sort((i1, i2) => {
			const v1 = propOrder.getValue(i1)
			const v2 = propOrder.getValue(i2)
			return typeOrder == ORDER_TYPE.ASC ? v1 - v2 : v2 - v1
		})
	}, [items, propOrder, typeOrder])

	// HANDLER
	const handleSelect = (item: any) => onSelectChange(item)
	const handleOrderChange = (prop: ItemProp, type: ORDER_TYPE) => {
		setPropOrder(prop)
		setTypeOrder(type)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTableElement>) => {
		if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			e.preventDefault();
			const currentIndex = itemsSort.findIndex((itm) => getId(itm) === selectId);
			if (currentIndex == -1) return
			const newIndex = e.key === "ArrowUp" ? Math.max(currentIndex - 1, 0) : Math.min(currentIndex + 1, itemsSort.length - 1);
			if (newIndex == currentIndex) return
			const nextItem = itemsSort[newIndex]
			onSelectChange(nextItem)
			const rowEl = (e.target as HTMLTableElement).querySelector(`#${CSS.escape(getId(nextItem))}`);
			rowEl?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		}
	}

	// RENDER
	const isSelected = (item: any) => getId(item) == selectId
	const colspan = props.length
	function getValueString(item: any, prop: ItemProp): string {
		if (!prop) return
		return prop.getShow?.(item) ?? prop.getValue?.(item)
	}

	return <table className={cls.root} style={style} tabIndex={tabIndex} onKeyDown={handleKeyDown}>

		<Header
			props={propToShow}
			order={propOrder}
			orderType={typeOrder}
			onOrderChange={handleOrderChange}
		/>

		<tbody>
			{itemsSort.map((item, index) => {
				const id = getId(item)
				const selected = isSelected(item)
				const mainText = getValueString(item, propMain)

				const clsSelected = selected ? `${cls.selected} jack-cmp-select` : ""
				const clsRow = `jack-cmp-tbl-row ${cls.row} ${clsSelected} jack-hover-container`
				const clsCellMain = `${cls.cell} ${cls.main}`

				return <React.Fragment key={id}>

					{!!propMain && !singleRow && (
						<tr
							className={clsRow}
							onClick={() => handleSelect(item)}
						>
							<td colSpan={colspan}
								className={clsCellMain}
							>
								{mainText}
							</td>
							<CopyButton absolute value={mainText} />
						</tr>
					)}

					<tr id={id}
						className={clsRow}
						onClick={() => handleSelect(item)}
					>
						{propToShow.map((prop, index) => !(!singleRow && prop.isMain) && (
							<td key={index}
								className={prop.isMain ? clsCellMain : cls.cell}
							>
								{getValueString(item, prop)}
							</td>
						))}
					</tr>

				</React.Fragment>
			})}
		</tbody>
	</table>
}

export default Table
