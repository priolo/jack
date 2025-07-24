import CloseIcon from "@/icons/CloseIcon"
import docsSo from "@/stores/docs"
import { VIEW_SIZE } from "@/stores/stacks/types"
import { ViewStore } from "@/stores/stacks/viewBase"
import { DOC_ANIM } from "@/types"
import { useStore } from "@priolo/jon"
import { FunctionComponent } from "react"
import focusSo from "../../stores/focus"
import IconButton from "../buttons/IconButton"
import ErrorBoundary from "./ErrorBoundary"
import cls from "./FrameworkCard.module.css"
import SnackbarCmp from "./SnackbarCmp"



interface Props {
	store: ViewStore

	className?: string
	style?: React.CSSProperties
	styleBody?: React.CSSProperties

	headerRender?: React.ReactNode
	actionsRender?: React.ReactNode
	iconizedRender?: React.ReactNode
	children: React.ReactNode
}

/** struttura standard di una CARD */
const FrameworkCard: FunctionComponent<Props> = ({
	store,

	className,
	style,
	styleBody,

	headerRender,
	actionsRender,
	iconizedRender,
	children,
}) => {

	// STORES
	useStore(store)
	useStore(focusSo)

	// HANDLER
	const handleClose = () => store.onRemoveFromDeck()
	const handleClick = () => focusSo.setView(store)

	// RENDER
	const inZen = docsSo.state.zenCard == store
	const inRoot = inZen || !store.state.parent
	const haveFocus = !inZen && focusSo.state.view == store
	const haveFocusCtrl = focusSo.state.show
	const isIconized = store.state.size == VIEW_SIZE.COMPACT
	const inDrag = store.state.docAnim == DOC_ANIM.DRAGGING
	const dialogId = `dialog_${store.state.uuid}`

	const clsFocus = `${haveFocus ? `${cls.focus} jack-framework-focus` : ""} ${haveFocusCtrl ? `${cls.ctrl} jack-framework-focus-ctrl` : ""}`
	const clsRoot = `${cls.root} ${!inRoot ? cls.linked : ""} ${inDrag ? cls.drag : ""} ${isIconized ? cls.iconized : ""} ${clsFocus} ${className} jack-framework`
	const clsChildren = `${cls.children} ${store.state.disabled ? cls.disabled : ""}`

	return <div className={clsRoot} style={style} tabIndex={0}
		onClick={handleClick}
	>

		{headerRender}



		{isIconized ? <>

			<div
				className={`${cls.actions} ${cls.hovercontainer} jack-framework-actions`}
			>
				<IconButton
					onClick={handleClose}
				><CloseIcon /></IconButton>
			</div>

			{iconizedRender}

		</> : <>
			{!!actionsRender && (
				<div className={`${cls.actions} jack-framework-actions`}
				>
					{actionsRender}
				</div>
			)}
			<div className={`${clsChildren} jack-framework-body`} style={styleBody}
			>
				{children}
			</div>
		</>}



		{/* DIALOG PORTAL */}
		<div
			className={cls.dialog}
			id={dialogId}
		/>

		<SnackbarCmp view={store} />

	</div>
}

export default FrameworkCard
