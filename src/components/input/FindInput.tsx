import CloseIcon from "@/icons/CloseIcon"
import FindIcon from "@/icons/FindIcon"
import React, { FunctionComponent } from "react"
import IconButton from "../buttons/IconButton"
import cls from "./FindInput.module.css"
import TextInput from "./TextInput"

interface Props {
	value?: string
	onChange?: (newValue: string) => void
	style?: React.CSSProperties
	className?: string
}

const FindInput: FunctionComponent<Props> = ({
	value,
	onChange,
	style,
	className = "",
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
	const clsRoot = `jack-cmp-txt-finder ${cls.root} ${className}`

	return (
		<div
			className={clsRoot}
			style={style}
		>
			<TextInput
				placeholder="search..."
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

export default FindInput