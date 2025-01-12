import CloseIcon from "@/icons/CloseIcon"
import DetachIcon from "@/icons/DetachIcon"
import DirectionLeftIcon from "@/icons/DirectionLeftIcon"
import DirectionRightIcon from "@/icons/DirectionRightIcon"
import docsSo from "@/stores/docs"
import { menuSo } from "@/stores/docs/links"
import { findParent, getRoot } from "@/stores/docs/utils"
import mouseSo from "@/stores/mouse"
import { VIEW_SIZE } from "@/stores/stacks/types"
import { ViewStore } from "@/stores/stacks/viewBase"
import { useStore } from "@priolo/jon"
import React, { FunctionComponent, useMemo, useState } from "react"
import TooltipWrapCmp from "../../app/tooltip/TooltipWrapCmp"
import IconButton from "../buttons/IconButton"
import cls from "./Header.module.css"



interface Props {
	icon?: React.ReactNode
	store?: ViewStore
	extraRender?: React.ReactNode
}

/** Tipico HEADER con icona e titolo. Lo trovi nel tipico FrameworkCard */
const Header: FunctionComponent<Props> = ({
	icon,
	store,
	extraRender,
}) => {

	// STORE
	const docSo = store.state.group
	useStore(docSo)

	// HOOK
	const [enter, setEnter] = useState(false)

	// HANDLER
	const handleClose = () => {
		if (inZen) {
			docsSo.zenClose()
		} else {
			store.onRemoveFromDeck()
		}
	}
	const handleDragStart: React.DragEventHandler = (e) => {
		e.preventDefault()
		const style = window.getComputedStyle(e.target as Element)
		mouseSo.setPosition({ x: e.clientX, y: e.clientY })
		mouseSo.setColor({
			bg: style.getPropertyValue('--dialog-bg'),
			fg: style.getPropertyValue('--dialog-fg'),
		})
		mouseSo.startDrag({ source: { view: store } })
	}
	const handleDetach = () => docSo.detach(store)
	const handleLinkDetach = () => {
		if (!store.state.linked) return
		const root = getRoot(store) ?? store
		const rootIndex = docSo.getIndexByView(root)
		docSo.move({ view: store.state.linked, index: rootIndex + 1, anim: false })
	}
	const handleSizeClick = () => {
		store.setSize(
			store.state.size == VIEW_SIZE.NORMAL ? VIEW_SIZE.COMPACT : VIEW_SIZE.NORMAL
		)
	}
	// const handleMoveInDrawer = () => {
	// 	if (!inDrawer) {
	// 		store.state.group.move({ view: store, groupDest: drawerCardsSo })
	// 	} else {
	// 		store.state.group.move({ view: store, groupDest: deckCardsSo })
	// 	}
	// }
	const handleFocus = () => {
		//e.stopPropagation()
		docSo.focus(store)
	}
	const handleComprime = () => {
		findParent(store, (view) => view.setSize(VIEW_SIZE.COMPACT))
	}
	const handleExpand = () => {
		findParent(store, (view) => view.setSize(VIEW_SIZE.NORMAL))
	}
	const handleDClick = () => {
		if (inZen) return
		docsSo.zenOpen(store)
	}

	// RENDER
	const inZen = docsSo.state.zenCard == store
	//const inDrawer = !inZen && store.state.group == drawerCardsSo
	const inMenu = !inZen && menuSo.find(store)
	const [title, subTitle] = useMemo(() => [
		store.getTitle(),
		store.getSubTitle(),
	], [store.state])
	const isDraggable = !inZen && store.state.draggable
	const haveLinkDetachable = store.state.linked?.state.draggable
	const inRoot = inZen || !store.state.parent
	const isCompact = !inZen && store.state.size == VIEW_SIZE.COMPACT
	const allCompact = !inZen && !findParent(store, view => view.state.size != VIEW_SIZE.COMPACT)

	//const showBttAnchor = !inZen && inRoot && (enter || inDrawer)
	const showDetachable = !inZen && !inRoot && enter
	const showBttClose = !store.state.unclosable
	const showBttExpand = !inZen && allCompact && !inRoot && enter
	const showBttComprime = !inZen && !allCompact && !inRoot && enter

	const clsCompact = store.state.size == VIEW_SIZE.COMPACT ? cls.compact : ""
	const clsRoot = `${cls.root} ${clsCompact}`
	const clsTitle = `${cls.titleBox} ${clsCompact}`


	return (
		<div className={clsRoot}
			draggable={isDraggable}
			onDragStart={!inZen ? handleDragStart : undefined}
			onMouseEnter={() => setEnter(true)}
			onMouseLeave={() => setEnter(false)}
		>

			{/* ICON */}
			<div
				onClick={!inZen ? handleSizeClick : undefined}
				className={cls.icon}
			>
				<TooltipWrapCmp
					disabled={!isCompact}
					content={<div>
						<div className={cls.title}>{title}</div>
						<div className={cls.subtitle}>{subTitle}</div>
					</div>}
				>
					{icon}
				</TooltipWrapCmp>
			</div>

			{/* NOT ICON */}
			{!isCompact && <>

				<div className={clsTitle}
					onDoubleClick={handleDClick}
				>
					<div className={`${cls.title} ${cls.draggable} jack-title`}
						onClick={!inZen ? handleFocus : undefined}
					>{title}</div>
					{subTitle && (
						<div className={cls.subtitle}>
							{subTitle}
						</div>
					)}
				</div>

				<div className={cls.buttons}>
					<div style={{ display: "flex" }}>
						{showBttExpand && (
							<IconButton
								onClick={handleExpand}
							><DirectionRightIcon /></IconButton>
						)}
						{showBttComprime && (
							<IconButton
								onClick={handleComprime}
							><DirectionLeftIcon /></IconButton>
						)}
						{/* {showBttAnchor && (
							<IconButton
								onClick={handleMoveInDrawer}
							><AnchorIcon /></IconButton>
						)} */}
						{showDetachable && (
							<IconButton
								onClick={handleDetach}
							><DetachIcon /></IconButton>
						)}

						{enter && (extraRender)}

						{showBttClose && (
							<IconButton
								onClick={handleClose}
							><CloseIcon /></IconButton>
						)}

					</div>
					{/* {haveLinkDetachable && <IconButton
						onClick={handleLinkDetach}
					><DetachIcon /></IconButton>} */}
				</div>

			</>}

		</div>
	)
}

export default Header
