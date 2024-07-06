import cls from "./ListRow.module.css"



interface Props<T> {
	children?: React.ReactNode
	style?: React.CSSProperties
	readOnly?: boolean
	isSelect?: boolean
	onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

/** un WRAP della riga che gestisce la selezione */
function ListRow<T>({
	children,
	style,
	isSelect,
	readOnly = false,
	onClick
}: Props<T>) {

	// STORES

	// HOOKS

	// HANDLERS

	// RENDER
	const clsReadonly = !readOnly ? cls.cliccable : ""
	const clsSelected = isSelect ? cls.select : ""
	const clsRoot = `${cls.root} ${clsReadonly} ${clsSelected}`

	return <div
		className={clsRoot}
		style={style}
		onClick={!readOnly ? onClick : null}
	>
		{children}
	</div>
}

export default ListRow
