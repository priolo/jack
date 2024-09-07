import React, { FunctionComponent } from "react"
import cls from "./FloatButton.module.css"



interface Props {
	className?: string
	onClick?: (e: React.MouseEvent) => void
	children?: React.ReactNode
	disabled?: boolean
	style?: React.CSSProperties
}

const FloatButton: FunctionComponent<Props> = ({
	className = "",
	onClick,
	children,
	disabled,
	style,
}) => {
	// STORE

	// HOOK

	// HANDLER
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (disabled) return
		onClick?.(e)
	}

	// RENDER
	const clsDisabled = disabled ? `${cls.disabled} jack-cmp-disabled` : ""
	const clsRoot = `jack-cmp jack-cmp-float ${cls.root} ${clsDisabled} ${className}`

	return (
		<div style={style}
			className={clsRoot}
			onClick={handleClick}
		>
			{children}
		</div>
	)
}

export default FloatButton
