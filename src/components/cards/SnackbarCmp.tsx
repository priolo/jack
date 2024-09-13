import CloseIcon from "@/icons/CloseIcon"
import InfoIcon from "@/icons/InfoIcon"
import SkullIcon from "@/icons/SkullIcon"
import SuccessIcon from "@/icons/SuccessIcon"
import WarnIcon from "@/icons/WarnIcon"
import { VIEW_SIZE } from "@/stores/stacks/utils"
import { MESSAGE_TYPE, ViewState, ViewStore } from "@/stores/stacks/viewBase"
import { useStore } from "@priolo/jon"
import { FunctionComponent, useEffect, useMemo, useState } from "react"
import TooltipWrapCmp from "../../app/tooltip/TooltipWrapCmp"
import IconButton from "../buttons/IconButton"
import cls from "./SnackbarCmp.module.css"



interface Props {
	view?: ViewStore
}

/** Il contenitore CARD. Gestisce il drag e posizionamento del DECK */
const SnackbarCmp: FunctionComponent<Props> = ({
	view,
}) => {

	// STORES
	const viewSa = useStore(view) as ViewState
	const { open, title, body, type, timeout } = viewSa.snackbar
	const [hide, setHide] = useState(true)

	// HOOKS
	useEffect(() => {
		let timeoutId = null
		if (open) {
			setHide(false)
			if (timeout) timeoutId = setTimeout(handleClose, timeout)
		}
		return () => clearTimeout(timeoutId)
	}, [open])

	// HANDLER
	const handleClose = () => {
		view.setSnackbar({ ...view.state.snackbar, open: false })
		setTimeout(() => setHide(true), 300)
	}

	// RENDER
	const icon = useMemo(() => ({
		[MESSAGE_TYPE.INFO]: <InfoIcon className={cls.icon} />,
		[MESSAGE_TYPE.SUCCESS]: <SuccessIcon className={cls.icon} />,
		[MESSAGE_TYPE.WARNING]: <WarnIcon className={cls.icon} />,
		[MESSAGE_TYPE.ERROR]: <SkullIcon className={cls.icon} />,
	}[type]), [type])

	const inRoot = !view.state.parent
	const clsBox = `${viewSa.size == VIEW_SIZE.COMPACT ? cls.box_icon : cls.box} ${!inRoot ? cls.linked : ""} ${open ? cls.open : cls.close} ${cls[type]}`

	if (viewSa.size == VIEW_SIZE.COMPACT) {
		return (
			<TooltipWrapCmp content={title} className={cls.root_icon}>
				<div className={clsBox} 
					onClick={handleClose}
				>{icon}</div>
			</TooltipWrapCmp>
		)
	}

	return (
		<div className={cls.root}>
			<div className={clsBox}>
				{!hide && <>
					<div className={cls.header}>
						{icon}
						<div className={cls.title}>{title}</div>
						<div style={{ flex: 1 }} />
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</div>
					<div className={cls.body}>
						{body}
					</div>
				</>}
			</div>
		</div>
	)
}

export default SnackbarCmp
