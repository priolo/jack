import { FunctionComponent } from "react"
import { RenderRowBaseProps } from "../lists/EditList"



/**
 * semplice stringa readonly in uppercase
 */
const StringUpRow: FunctionComponent<RenderRowBaseProps<any>> = ({
	item,
	isSelect,
}) => <div className="jack-list-row">{item?.toUpperCase() ?? ""}</div>

export default StringUpRow
