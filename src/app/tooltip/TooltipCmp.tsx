import tooltipSo from "@/stores/tooltip"
import { useStore } from "@priolo/jon"
import { FunctionComponent, useEffect, useRef, useState } from "react"
import { Position } from "../../stores/mouse/types"
import cls from "./TooltipCmp.module.css"



enum TOOLTIP_HOOK {
	UP,
	DOWN,
}

interface TooltipPos {
	position: Position
	hook: TOOLTIP_HOOK
	offset: number
}

const TooltipCmp: FunctionComponent = () => {

	// STORES
	const tooltipSa = useStore(tooltipSo)

	// HOOKS
	const ref = useRef(null)
	const [position, setPosition] = useState<TooltipPos>(null)

	useEffect(() => {
		const targetRect = tooltipSo.state.content?.targetRect
		if (!tooltipSa.show || !targetRect || !ref.current) return

		const contentRect = ref.current.getBoundingClientRect()
		const pos: TooltipPos = {
			position: { x: targetRect.x + (targetRect.width / 2), y: targetRect.y },
			hook: TOOLTIP_HOOK.UP,
			offset: 0,
		}
		const tipHeight = contentRect.height + 20
		if (targetRect.y - tipHeight < 0) {
			pos.position.y = targetRect.bottom + tipHeight
			pos.hook = TOOLTIP_HOOK.DOWN
		}
		const offset = (contentRect.width - targetRect.width) / 2
		if (targetRect.left - offset < 0) pos.offset = offset
		if (targetRect.right + offset > window.innerWidth) pos.offset = -offset
		setPosition(pos)
	}, [tooltipSa.show, tooltipSo.state.content])

	// HANDLERS

	// RENDER
	const content = tooltipSa.content?.content
	const show = tooltipSa.show
	const color = tooltipSa.content?.color
	const clsRoot = `${cls.root} ${show ? cls.show : ""}`

	return (
		<div 
			ref={ref} 
			style={cssRoot(position)}
			className={clsRoot} 			
		>
			{!!content && (
				<div 
					style={cssContent(color)}
					className={cls.content}
				>
					{content}
					<div 
						style={cssArrow(position, color)} 
						className={`${cls.arrow} ${cls[position?.hook]}`}
					/>
				</div>
			)}
		</div>
	)
}

export default TooltipCmp

const cssRoot = (pos: TooltipPos, show: boolean = false): React.CSSProperties => ({
	left: pos ? pos.position.x + pos.offset : null,
	top: pos ? pos.position.y : null,
})

const cssContent = (color: any): React.CSSProperties => ({
	color: color?.fg,
	backgroundColor: color?.bg,
})

const cssArrow = (pos: TooltipPos, color: any): React.CSSProperties => ({
	...pos?.hook == TOOLTIP_HOOK.UP ? {
		bottom: -10,
		borderColor: `${color?.bg} transparent transparent transparent`
	} : {
		top: -10,
		borderColor: `transparent transparent ${color?.bg} transparent`,
	},
	right: `calc( 50% - ${5 - (pos?.offset ?? 0)}px )`,
})