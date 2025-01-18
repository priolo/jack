import React, { FunctionComponent, useState } from "react"
import cls from "./Button.module.css"



interface Props {
	select?: boolean
	children?: React.ReactNode
	tabIndex?: number

	className?: string
	style?: React.CSSProperties

	disabled?: boolean
	onClick?: (e: React.MouseEvent<HTMLDivElement>, select: boolean) => void
}

const Button: FunctionComponent<Props> = ({
	select,
	children,
	tabIndex = 0,

	className = "",
	style,

	disabled,
	onClick,
}) => {

	// STORE
	const [mouseOver, setMouseOver] = useState(false)

	// HOOK

	// HANDLER
	const handleEnter = () => setMouseOver(true)
	const handleLeave = () => setMouseOver(false)
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		onClick?.(e, select)
	}
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if ( disabled ) return
		if (e.code === "Space") {
			onClick?.(e as any, select);
		}
	}

	// RENDER
	const clsSelect = mouseOver || select ? `${cls.selected} jack-cmp-select` : ""
	const clsDisabled = disabled ? `${cls.disabled} jack-cmp-disabled` : ""
	const clsRoot = `jack-cmp jack-cmp-button ${cls.root} ${clsSelect} ${clsDisabled} ${className}`

	return (
		<div style={style} className={clsRoot}
			tabIndex={tabIndex}
			onClick={handleClick}
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			onKeyDown={handleKeyDown}
		>
			{children}
		</div>
	)
}

export default Button
