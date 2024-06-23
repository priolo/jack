import React, { FunctionComponent, useState } from "react"
import cls from "./IconButton.module.css"



interface Props {
	onClick?: (e: React.MouseEvent) => void
	children?: React.ReactNode
	effect?: boolean
	select?: boolean
	className?: string
	style?: React.CSSProperties
}

const IconButton: FunctionComponent<Props> = ({
	onClick,
	select,
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
	const clsRoot = `${cls.root} ${(mouseOver || select) ? cls.select : ""} ${className}`
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
