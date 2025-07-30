import CloseIcon from "@/icons/CloseIcon"
import FindIcon from "@/icons/FindIcon"
import React, { FunctionComponent } from "react"
import IconButton from "../buttons/IconButton"
import cls from "./FindInputHeader.module.css"
import TextInput from "./TextInput"



interface Props {
	value?: string
	placeholder?: string
	onChange?: (newValue: string) => void
	style?: React.CSSProperties
}

const FindInputHeader: FunctionComponent<Props> = ({
	value,
	placeholder = "search...",
	onChange,
	style,
}) => {
	// STORE

	// HOOK

	// HANDLER
	const handleChange = (value: string) => onChange?.(value)
	const handleClear = () => onChange?.("")
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Escape") handleClear()
	}

	// RENDER
	const haveValue = value?.length > 0
	const clsRoot = `jack-cmp-txt-finder ${cls.root}`

	return (
		<div
			className={clsRoot}
			style={style}
		>
			<TextInput
				placeholder={placeholder}
				className={cls.input}
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>

			{haveValue ? (
				<IconButton tabIndex={-1}
					onClick={handleClear}
				>
					<CloseIcon />
				</IconButton>
			) : (
				<FindIcon />
			)}

		</div>
	)
}

export default FindInputHeader