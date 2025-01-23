import tooltipSo from "@/stores/tooltip"
import { FunctionComponent, useEffect, useId } from "react"



interface Props {
	content?: React.ReactNode
	disabled?: boolean
	tabIndex?: number
	style?: React.CSSProperties
	className?: string
	onMouseOver?: (enter: boolean) => void
	onClick?: (e: React.MouseEvent) => void
	onKeyDown?: (e: React.KeyboardEvent) => void
	children: React.ReactNode
}

const TooltipWrapCmp: FunctionComponent<Props> = ({
	content,
	disabled,
	tabIndex = -1,
	style,
	className,
	onMouseOver,
	onClick,
	onKeyDown,
	children
}) => {

	// STORES

	// HOOKS
	const id = useId()
	useEffect(() => {
		if (disabled) handleLeave()
		return () => {
			if (tooltipSo.state.content?.id != id) return
			handleLeave()
		}
	}, [disabled])


	// HANDLERS
	const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		if (disabled) return
		const elem = e.target as Element
		const style = window.getComputedStyle(elem)
		tooltipSo.open({
			content,
			targetRect: elem.getBoundingClientRect(),
			color: {
				bg: style.getPropertyValue('--dialog-bg'),
				fg: style.getPropertyValue('--dialog-fg'),
			},
			id,
		})
		onMouseOver?.(true)
	}
	const handleLeave = (e?: React.MouseEvent<HTMLDivElement>) => {
		tooltipSo.close()
		onMouseOver?.(false)
	}

	// RENDER
	if (!content) return children

	return (
		<div style={style} className={className ?? ""} tabIndex={tabIndex}
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			onClick={onClick}
			onKeyDown={onKeyDown}
		>
			{children}
		</div>
	)
}

export default TooltipWrapCmp
