import React, { FunctionComponent, useState } from "react"
import cls from "./IconButton.module.css"



interface Props {
	onClick?: (e: React.MouseEvent) => void
	children?: React.ReactNode
	effect?: boolean
	select?: boolean
	disabled?: boolean
	className?: string
	style?: React.CSSProperties
}

const IconButton: FunctionComponent<Props> = ({
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

	// RENDER
	const clsSelect = mouseOver || select ? `${cls.select} jack-cmp-select` : ""
	const clsDisabled = disabled ? `${cls.disabled} jack-cmp-disabled` : ""
	const clsRoot = `jack-cmp jack-cmp-button ${cls.root} ${clsSelect} ${clsDisabled} ${className}`

	return (
		<div style={style} className={clsRoot}
			onClick={onClick}
			onMouseEnter={effect ? () => setMouseOver(true) : null}
			onMouseLeave={effect ? () => setMouseOver(false) : null}
		>
			{children}
		</div>
	)
}

export default IconButton
