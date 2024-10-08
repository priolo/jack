import mouseSo, { MouseState } from "@/stores/mouse"
import { useStore } from "@priolo/jon"
import { DragEvent, FunctionComponent } from "react"
import { ViewState, ViewStore } from "../stores/stacks/viewBase"
import { DOC_ANIM } from "../types"
import cls from "./DropArea.module.css"
import { CardsStore } from "@/stores/docs/cards"



interface Props {
	groupDest: CardsStore
	index?: number
	isLast?: boolean
	viewSo?: ViewStore
	style?: React.CSSProperties
}

const DropArea: FunctionComponent<Props> = ({
	groupDest,
	index,
	isLast,
	viewSo,
	style,
}) => {

	// STORES
	const mouseSa = useStore(mouseSo) as MouseState
	const viewSa = viewSo ? useStore(viewSo) as ViewState : null

	// HOOKS

	// HANDLERS
	const handleMouseOver = (_: DragEvent<HTMLDivElement>) => {
		if (!mouseSa.drag?.source?.view) return
		mouseSo.setDrag({ ...mouseSa.drag, destination: { group: groupDest, index } })
	}
	const handleMouseLeave = () => {
		if (!mouseSa.drag?.source?.view) return
		mouseSo.setDrag({ ...mouseSo.state.drag, destination: null })
	}

	// RENDER
	const dragOver = mouseSa.drag?.destination?.index == index && mouseSa.drag?.destination?.group == groupDest
	const inExit = viewSa?.docAnim == DOC_ANIM.EXIT || viewSa?.docAnim == DOC_ANIM.EXITING
	const clsRoot = `${cls.root} ${dragOver ? cls.in_dragover : ""} ${inExit ? cls.in_exit : ""} ${isLast ? cls.is_last : ""}`
	const clsLine = cls.line
	const styLine: React.CSSProperties = { backgroundColor: dragOver ? mouseSa.color?.bg : null }
	
	return <div draggable={false}
		className={clsRoot}
		style={style}
		onMouseOver={handleMouseOver}
		onMouseLeave={handleMouseLeave}
	>
		<div
			style={styLine}
			className={clsLine}

		/>
	</div>
}

export default DropArea
