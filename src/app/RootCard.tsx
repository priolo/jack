import docsSo from "@/stores/docs"
import mouseSo from "@/stores/mouse"
import { VIEW_SIZE } from "@/stores/stacks/types"
import { ViewStore } from "@/stores/stacks/viewBase"
import { DOC_ANIM } from "@/types"
import { useStore } from "@priolo/jon"
import React, { FunctionComponent, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { RenderProps } from "./CardsGroup"
import ResizerCmp from "./ResizerCmp"
import cls from "./RootCard.module.css"



interface Props {
	view?: ViewStore
	Render: FunctionComponent<RenderProps>
	deep?: number
	className?: string
	style?: React.CSSProperties
}

/** Il contenitore CARD. Gestisce il drag e posizionamento del DECK */
const RootCard: FunctionComponent<Props> = ({
	view,
	Render,
	deep = 100,
	className = "",
	style = {},
}) => {

	// STORES
	const viewSa = useStore(view)
	const docsSa = useStore(docsSo)
	//useStoreNext(view.state.group, (state: CardsState, stateOld: CardsState) => state.focus != stateOld.focus)

	// HOOKS
	useEffect(() => {
		window.requestAnimationFrame(() => view.docAnim(DOC_ANIM.SHOWING));
	}, [view])
	const refZen = useMemo(() => document.getElementById(`zen-card`), [])

	// HANDLER
	const handleDragMove = (pos: number, diff: number) => view.setWidth(pos - diff)
	const handleDetach = () => view.state.group.detach(view.state.linked)
	const handleMouseOver = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (mouseSo.state.drag?.source?.view == null || mouseSo.state.drag?.source?.view == view) return
		mouseSo.setDrag({ ...mouseSo.state.drag, destination: { view } })
	}
	const handleMouseLeave = () => {
		if (mouseSo.state.drag?.source?.view == null) return
		mouseSo.setDrag({ ...mouseSo.state.drag, destination: null })
	}

	// RENDER
	if (!view) return null
	const animation = view.state.docAnim
	const inZen = docsSa.zenCard == view
	const isCompact = !inZen && viewSa.size == VIEW_SIZE.COMPACT
	const isResizable = !isCompact && !inZen
	const haveLinked = !inZen && !!view.state.linked

	// styles
	const clsRoot = `${cls.root} ${cls[animation] ?? ""} ${className} jack-card`
	const width = view.getWidth()
	const styContainerDoc: React.CSSProperties = {
		zIndex: deep,
		width,
		maxWidth: view.state.widthMax,
		minWidth: isCompact ? view.state.widthCompact : view.state.widthMin,
	}
	if (animation == DOC_ANIM.EXITING || animation == DOC_ANIM.EXIT) {
		styContainerDoc.width = 0
		styContainerDoc.minWidth = 0
		styContainerDoc.transform = `translate(-100%, 0px)`
		styContainerDoc.overflowX = "hidden"
	}
	if (animation == DOC_ANIM.SHOWING) {
		styContainerDoc.minWidth = 0
	}

	const card = (
		<div draggable={false}
			id={view.state.uuid}
			className={clsRoot}
			style={{ zIndex: deep, ...style }}
			onMouseOver={viewSa.droppable ? handleMouseOver : undefined}
			onMouseLeave={viewSa.droppable ? handleMouseLeave : undefined}
		>

			{/* DOC BODY WITH RESIZER */}
			<div style={styContainerDoc} className={cls.doc}>
				<Render view={view} />
			</div>

			{isResizable
				? <ResizerCmp
					className={cls.resizer}
					onStart={(pos: number) => view.state.width}
					onMove={handleDragMove}
					onDClick={handleDetach}
				/>
				: haveLinked && (
					<div className={cls.resizer} style={{ cursor: "col-resize" }}
						onDoubleClick={handleDetach}
					/>
				)
			}

			{/* LINKED */}
			{!inZen && haveLinked && (
				<RootCard className={cls.desk}
					deep={deep - 2}
					view={view.state.linked}
					Render={Render}
				/>
			)}

		</div>
	)

	if (inZen) {
		return <>
			<div style={{ width: view.state.width }} />
			{createPortal(
				card,
				refZen
			)}
		</>
	}
	return card
}

export default RootCard
