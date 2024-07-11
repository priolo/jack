import mouseSo, { MouseState } from "@/stores/mouse"
import { useStore } from "@priolo/jon"
import { FunctionComponent, useEffect, useState } from "react"
import { Position } from "../stores/mouse/utils"
import { ANIM_TIME } from "../types"
import cls from "./DragCmp.module.css"
import { ColorVar } from "../types/global"



const DragCmp: FunctionComponent = () => {

	// STORES
	const mouseSa = useStore(mouseSo) as MouseState

	// HOOKS
	const [hide, setHide] = useState(true)
	const inShow = mouseSa.drag != null
	useEffect(() => {
		if (inShow == false) {
			setTimeout(() => setHide(true), ANIM_TIME)
		} else {
			setHide(false)
		}
	}, [inShow])

	// HANDLERS

	// RENDER
	const pos = mouseSa.position
	const color = mouseSa.color
	const clsRoot = `${cls.root} ${inShow ? cls.show : ""} ${hide ? cls.hide : ""}`

	return <div
		className={clsRoot}
		style={cssRoot(pos, color)}
	>
		{mouseSa.drag?.source?.view?.getTitle() ?? "..."}
	</div>
}

export default DragCmp

const cssRoot = (pos: Position, color: ColorVar): React.CSSProperties => ({
	left: pos?.x,
	top: pos?.y,
	color: color?.fg,
	backgroundColor: color?.bg,
})
