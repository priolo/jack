import React, { FunctionComponent } from "react"
import cls from "./FloatButton.module.css"



interface Props {
	onClick?: (e: React.MouseEvent) => void
	children?: React.ReactNode
	disabled?: boolean
	style?: React.CSSProperties
}

const FloatButton: FunctionComponent<Props> = ({
	onClick,
	children,
	disabled,
	style,
}) => {
	// STORE

	// HOOK

	// HANDLER
	const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
		if ( disabled ) return
		onClick?.(e)
	}

	// RENDER
	const clsRoot = `${cls.root} ${disabled ? cls.disabled : ""}`
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
