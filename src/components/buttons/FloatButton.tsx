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
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (!disabled && (e.code === "Space" || e.code == "Enter")) onClick?.(e as any);
	}

	// RENDER
	const clsDisabled = disabled ? `${cls.disabled} jack-cmp-disabled` : ""
	const clsRoot = `jack-cmp jack-cmp-float ${cls.root} ${clsDisabled} ${className}`

	return (
		<div style={style} tabIndex={-1}
			className={clsRoot}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{children}
		</div>
	)
}

export default FloatButton
