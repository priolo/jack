import { FunctionComponent } from "react"
import cls from "./Component.module.css"



interface Props {
	style?: React.CSSProperties
	preRender?: React.ReactNode
	enterRender?: React.ReactNode
	children?: React.ReactNode
	selected?: boolean
	readOnly?: boolean
	onClick?: (e: React.MouseEvent) => void
}

const Component: FunctionComponent<Props> = ({
	style,
	preRender,
	enterRender,
	children,
	selected,
	readOnly,
	onClick,
}) => {
	// STORE

	// HOOK

	// HANDLER

	// RENDER
	const clsCliccable = !!onClick ? cls.cliccable : ""
	const clsSelected = selected ? cls.selected : ""
	const clsReadonly = readOnly ? cls.readonly : ""
	const clsRoot = `jack-hover-container ${cls.root} ${clsCliccable} ${clsSelected} ${clsReadonly}`

	return (
		<div className={clsRoot}
			style={style}
			onClick={onClick}
		>
			{preRender}
			{children}
			<div className="jack-hover-hide" style={{ position: "absolute", top: 4, right: 4 }}>
				{enterRender}
			</div>
		</div>
	)
}

export default Component
