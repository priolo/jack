import React, { FunctionComponent, useState } from "react"
import cls from "./IconButton.module.css"



interface Props {
	tabIndex?: number
	onClick?: (e: React.MouseEvent) => void
	children?: React.ReactNode
	effect?: boolean
	select?: boolean
	disabled?: boolean
	className?: string
	style?: React.CSSProperties
}

const IconButton: FunctionComponent<Props> = ({
	tabIndex = 0,
	onClick,
	select,
	disabled,
	children,
	effect,
	className = "",
	style,
}) => {
	// STORE

	// HOOK
	const [mouseOver, setMouseOver] = useState(false)

	// HANDLER
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (!disabled && (e.code === "Space" || e.code == "Enter")) onClick?.(e as any);
	}

	// RENDER
	const clsSelect = mouseOver || select ? `${cls.select} jack-cmp-select` : ""
	const clsDisabled = disabled ? `${cls.disabled} jack-cmp-disabled` : ""
	const clsRoot = `jack-cmp jack-cmp-button ${cls.root} ${clsSelect} ${clsDisabled} ${className}`

	return (
		<div style={style} className={clsRoot} tabIndex={tabIndex}
			onClick={onClick}
			onMouseEnter={effect ? () => setMouseOver(true) : null}
			onMouseLeave={effect ? () => setMouseOver(false) : null}
			onKeyDown={handleKeyDown}
		>
			{children}
		</div>
	)
}

export default IconButton
