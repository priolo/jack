import SortDownIcon from "@/icons/SortDownIcon"
import SortUpIcon from "@/icons/SortUpIcon"
import { FunctionComponent, useState } from "react"
import IconButton from "../buttons/IconButton"
import { ORDER_TYPE } from "./Header"
import cls from "./Header.module.css"
import { ItemProp } from "./VTable"



interface Props {
	props: ItemProp[]
	order?: ItemProp
	orderType?: ORDER_TYPE
	onOrderChange?: (prop: ItemProp, type: ORDER_TYPE) => void
}

const VHeader: FunctionComponent<Props> = ({
	props,
	order,
	orderType,
	onOrderChange,
}) => {

	// STORE

	// HOOKs
	const [overProp, setOverProp] = useState<ItemProp>(null)

	// HANDLER
	const handleOrder = (prop: ItemProp) => {
		let newOrder = ORDER_TYPE.ASC
		let newProp = prop
		if (prop == order) {
			newOrder = orderType == ORDER_TYPE.ASC ? ORDER_TYPE.DESC : orderType == ORDER_TYPE.DESC ? ORDER_TYPE.NOTHING : ORDER_TYPE.ASC
			if (newOrder == ORDER_TYPE.NOTHING) newProp = null
		}
		onOrderChange(newProp, newOrder)
	}

	// RENDER

	return (
		<div className={`${cls.virtuoso} ${cls.row}`}>
			{props.map((prop, index) => (

				<div key={index}
					className={`${cls.cell} ${cls.cellContainer}`}
					style={{ flex: prop.flex ?? 1 }}
					onMouseLeave={() => setOverProp(null)}
					onMouseEnter={() => setOverProp(prop)}
				>
					{prop == overProp || prop == order ? (
						<IconButton style={{ opacity: prop == order ? 1 : .5 }}
							onClick={() => handleOrder(prop)}
						>
							{prop != order || orderType == ORDER_TYPE.ASC ? (
								<SortDownIcon />
							) : orderType == ORDER_TYPE.DESC ? (
								<SortUpIcon />
							) : (
								<div style={{ width: 14, height: 14 }} />
							)}
						</IconButton>
					) : (
						<div style={{ width: 18, height: 18 }} />
					)}
					<div>{prop.label}</div>
				</div>

			))}
		</div>
	)
}

export default VHeader
