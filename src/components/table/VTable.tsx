import React, { FunctionComponent, useMemo, useState } from "react"
import { Virtuoso } from "react-virtuoso"
import CopyButton from "../buttons/CopyButton"
import { ORDER_TYPE } from "./Header"
import VHeader from "./VHeader"
import cls from "./VTable.module.css"



export interface ItemProp {
	label?: string
	flex?: number,
	getValue?: (item: any) => any
	getShow?: (item: any) => string
	notOrderable?: boolean
}

interface Props {
	props: ItemProp[]
	propMain?: ItemProp
	items?: any[]
	selectId?: string
	/** stessa riga per propMain e props */
	singleRow?: boolean
	onSelectChange?: (item: any) => void
	getId?: (item: any) => string
	style?: React.CSSProperties
}

const VTable: FunctionComponent<Props> = ({
	props,
	propMain,
	items = [],
	selectId,
	singleRow,
	onSelectChange,
	getId = (item) => item.toString(),
	style,
}) => {

	// STORE
	const [propOrder, setPropOrder] = useState<ItemProp>(null)
	const [typeOrder, setTypeOrder] = useState<ORDER_TYPE>(ORDER_TYPE.ASC)

	// HOOKs
	const itemsSort: any[] = useMemo(() => {
		if (!propOrder || typeOrder == ORDER_TYPE.NOTHING) {
			return items.sort((i1, i2) => {
				const v1 = getValueString(i1, propMain)
				const v2 = getValueString(i2, propMain)
				return v1?.localeCompare(v2) ?? 0
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

	// RENDER
	const isSelected = (item: any) => getId(item) == selectId
	function getValueString(item: any, prop: ItemProp): string {
		if (!prop) return
		return prop.getShow?.(item) ?? prop.getValue?.(item)
	}


	return (
		<div className={cls.root}>

			<VHeader
				props={props}
				order={propOrder}
				orderType={typeOrder}
				onOrderChange={handleOrderChange}
			/>

			<Virtuoso
				className={cls.virtuoso}
				style={style}
				data={itemsSort}
				totalCount={itemsSort.length}
				itemContent={(index, item) => {
					//const id = getId(item)
					const selected = isSelected(item)
					const mainText = getValueString(item, propMain)

					const clsSelected = selected ? `${cls.selected} jack-cmp-select` : ""
					const clsRow = `jack-cmp-tbl-row ${cls.row} ${clsSelected} jack-hover-container`
					const clsCellMain = `${cls.cell} ${cls.main}`

					return <div
						className={clsRow}
						onClick={() => handleSelect(item)}
					>

						{!!propMain && (
							<div className={clsCellMain}>
								{mainText}
								<CopyButton absolute value={mainText} />
							</div>
						)}

						<div className={cls.row2}>
							{props.map((prop, index) => (
								<div key={index}
									style={{ flex: prop.flex ?? 1 }}
									className={cls.cell}
								>{getValueString(item, prop)}</div>
							))}
						</div>
					</div>

				}}
			/>

		</div>
	)
}

export default VTable
