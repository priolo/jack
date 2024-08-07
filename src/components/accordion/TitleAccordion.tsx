import React, { CSSProperties, FunctionComponent, useEffect, useState } from "react"
import Accordion from "./Accordion"
import ArrowDownIcon from "@/icons/ArrowDownIcon"
import ArrowUpIcon from "@/icons/ArrowUpIcon"
import cls from "./Accordion.module.css"



interface Props {
	title?: string
	children?: React.ReactNode
	open?: boolean
	disabled?: boolean
	style?: CSSProperties
}

const TitleAccordion: FunctionComponent<Props> = ({
	title,
	children,
	open: openExt,
	disabled,
	style,
}) => {

	// STORE

	// HOOK
	const [open, setOpen] = useState(openExt ?? true)
	useEffect(() => {
		if (openExt == null) return
		setOpen(openExt)
	}, [openExt])

	// HANDLER
	const handleClick = () => { if (!disabled) setOpen(!open) }

	// RENDER
	return <div className={cls.root_title} style={style}>

		<div className={`jack-lbl-prop-title ${cls.title} ${disabled ? cls.disabled : ""}`}
			style={{ alignItems: "center", display: "flex", justifyContent: "center", cursor: "pointer" }}
			onClick={handleClick}
		>
			<div className={cls.title_text}>{title}</div>

			{!disabled && (
				<div className={cls.title_icon}>
					{open ? <ArrowDownIcon /> : <ArrowUpIcon />}
				</div>
			)}
		</div>

		<Accordion
			open={open}
			className={cls.title_accordion}
		>
			{children}
		</Accordion>

	</div>
}

export default TitleAccordion
