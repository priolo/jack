import React, { ForwardRefRenderFunction, forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import cls from "./TextInput.module.css"



export interface TextInputProps {
	value?: string | number
	placeholder?: string
	autoFocus?: boolean
	tabIndex?: number
	readOnly?: boolean
	className?: string
	style?: React.CSSProperties
	focus?: boolean
	multiline?: boolean
	rows?: number
	type?: string
	onChange?: (newValue: string) => void
	onFocus?: (e: React.FocusEvent<HTMLInput>) => void
	onBlur?: (e: React.FocusEvent<HTMLInput>) => void
	onKeyDown?: (event: React.KeyboardEvent<HTMLInput>) => void
	onKeyEnter?: (event: React.KeyboardEvent<HTMLInput>) => void
}

const TextInput: ForwardRefRenderFunction<HTMLElement, TextInputProps> = (
	{
		value,
		placeholder,
		autoFocus,
		tabIndex = 0,
		readOnly,
		className,
		style,
		focus,
		multiline,
		rows = 1,
		type,
		onChange,
		onFocus,
		onBlur,
		onKeyDown,
		onKeyEnter,
	},
	ref: any
) => {


	// STORE

	// HOOK
	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
	const multilineUpdate = () => {
		if (!multiline || !inputRef.current) return
		inputRef.current.style.height = 'auto';
		const current = inputRef.current.scrollHeight
		inputRef.current.style.height = `${current - 7}px`;
	}

	useEffect(() => {
		if (!focus) return
		inputRef.current?.select()
	}, [focus])

	useEffect(() => {
		if (!multiline || !inputRef.current) return
		setTimeout(multilineUpdate, 400)
		inputRef.current?.addEventListener('input', multilineUpdate)
		return () => inputRef.current?.removeEventListener('input', multilineUpdate)
	}, [multiline])

	useEffect(() => {
		multilineUpdate()
	}, [readOnly])

	useImperativeHandle(ref, () => inputRef.current, [inputRef.current])

	// HANDLER
	const handleChange = (e: React.ChangeEvent<HTMLInput>) => onChange?.(e.target.value)
	const handleFocus = (e: React.FocusEvent<HTMLInput>) => {
		e.target.select()
		onFocus?.(e)
	}
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInput>) => {
		if (e.key == "Enter") onKeyEnter?.(e)
		onKeyDown?.(e)
	}

	// RENDER
	if (readOnly) {
		if ( type == "password" ) value = "***"
		return (
			<div className={`jack-lbl-readonly ${className ?? ""}`}
				style={style}
			>
				{value ?? ""}
			</div>
		)
	}

	const TagInput = multiline ? "textarea" : "input"
	const clsRoot = `jack-cmp jack-cmp-text-input ${cls.root} ${className ?? ""}`

	return <TagInput ref={inputRef as any}
		className={clsRoot}
		style={style}
		placeholder={placeholder}
		autoFocus={autoFocus} 
		tabIndex={tabIndex}
		spellCheck="false"
		autoComplete="_off"
		value={value ?? ""}
		onChange={handleChange}
		onFocus={handleFocus}
		onBlur={onBlur}
		onKeyDown={handleKeyDown}
		rows={rows}
		type={type}
	/>
}

export default forwardRef(TextInput)

type HTMLInput = HTMLInputElement | HTMLTextAreaElement