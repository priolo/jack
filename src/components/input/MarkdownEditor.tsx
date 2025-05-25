import Prism from "prismjs"
import "prismjs/components/prism-markdown"
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'
import { createEditor, Descendant, Node, Text, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, RenderLeafProps, Slate, withReact } from 'slate-react'
import cls from './MarkdownEditor.module.css'



interface MarkdownEditorProps {
	value?: string
	onChange?: (value: string) => void
	autofocus?: boolean
	placeholder?: string
	readOnly?: boolean
	style?: React.CSSProperties
	className?: string
}

// Helper function to convert markdown string to Slate value
const markdownToSlate = (markdown: string): Descendant[] => {
	if (!markdown.trim()) {
		return [{ children: [{ text: "" }] }]
	}

	// Split by lines and create paragraph nodes
	const lines = markdown.split('\n')
	return lines.map(line => ({
		type: "paragraph" as const,
		children: [{ text: line }]
	}))
}

// Helper function to convert Slate value to markdown string
const slateToMarkdown = (value: Descendant[]): string => {
	return value
		.map(node => Node.string(node))
		.join('\n')
}

const MarkdownEditor: FunctionComponent<MarkdownEditorProps> = ({
	value = '',
	onChange,
	autofocus,
	placeholder = 'Enter markdown text...',
	readOnly = false,
	style,
	className = '',
}) => {
	// Create editor instance
	const editor = useMemo(() => withHistory(withReact(createEditor())), [])

	// Initialize editor value from props
	const [slateValue, setSlateValue] = useState<Descendant[]>(() =>
		markdownToSlate(value)
	)

	// Update slate value when external value prop changes
	useEffect(() => {
		const newSlateValue = markdownToSlate(value)
		setSlateValue(newSlateValue)
	}, [value])
	// Handle editor changes
	const handleChange = (newValue: Descendant[]) => {
		setSlateValue(newValue)

		// Convert Slate value to markdown string if onChange prop provided
		if (onChange) {
			const markdown = slateToMarkdown(newValue)
			onChange(markdown)
		}
	}

	// Handle keyboard events
	const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault()

			// Insert a new paragraph
			Transforms.insertNodes(editor, {
				children: [{ text: '' }]
			})
		}
	}, [editor])

	return (
		<div className={`${cls.root} ${className}`} style={style}>
			<Slate
				editor={editor}
				initialValue={slateValue}
				onChange={handleChange}
			>
				<Editable
					className={cls.editable}
					decorate={decorateMarkdown}
					//renderElement={renderElement}
					renderLeaf={renderLeaf}
					placeholder={placeholder}
					readOnly={readOnly}
					spellCheck={false}
					autoFocus={autofocus}
					onKeyDown={handleKeyDown}
				/>
			</Slate>
		</div>
	)
}

export default MarkdownEditor

// Decoration function for markdown syntax highlighting
const decorateMarkdown = ([node, path]: [Node, number[]]) => {
	const ranges: any[] = []
	if (!Text.isText(node)) return ranges

	// Helper function to calculate token length
	const getLength = (token: any): number =>
		typeof token === 'string'
			? token.length
			: typeof token.content === 'string'
				? token.content.length
				: Array.isArray(token.content)
					? token.content.reduce((l: number, t: any) => l + getLength(t), 0)
					: 0

	// Tokenize text using Prism markdown grammar
	const tokens = Prism.tokenize(node.text, Prism.languages.markdown)
	let start = 0

	for (const token of tokens) {
		const length = getLength(token)
		const end = start + length

		if (typeof token !== 'string') {
			console.log("TOKEN: ", token)
			ranges.push({
				[token.type]: true,
				anchor: { path, offset: start },
				focus: { path, offset: end }
			})
		}
		start = end
	}

	return ranges
}

// Render leaf component for text formatting
const renderLeaf = ({
	attributes,
	leaf,
	children,
}: RenderLeafProps) => {
	const leafStyles = leaf as any
	const classes = []

	if (leafStyles.bold) classes.push(cls.bold)
	if (leafStyles.italic) classes.push(cls.italic)
	if (leafStyles.code) classes.push(cls.code)
	if (leafStyles.link) classes.push(cls.link)
	if (leafStyles.title) classes.push(cls.title)
	if (leafStyles.strikethrough) classes.push(cls.strikethrough)
	if (leafStyles.punctuation) classes.push(cls.punctuation)
	if (leafStyles.blockquote) classes.push(cls.blockquote)
	if (leafStyles.hr) classes.push(cls.hr)

	return (
		<span
			{...attributes}
			className={classes.join(' ')}
		>
			{children}
		</span>
	)
}

// // Render element component for block elements
// const renderElement = ({
// 	attributes,
// 	element,
// 	children,
// }: RenderElementProps) => {

// 	return <div {...attributes} className={cls.paragraph}>{children}</div>

// 	// switch (element.type) {
// 	// 	case 'heading':
// 	// 		return <div {...attributes} className={cls.heading}>{children}</div>
// 	// 	case 'block-quote':
// 	// 		return <div {...attributes} className={cls.blockquote}>{children}</div>
// 	// 	case 'code-block':
// 	// 		return <div {...attributes} className={cls.codeBlock}>{children}</div>
// 	// 	case 'bulleted-list':
// 	// 	case 'numbered-list':
// 	// 		return <div {...attributes} className={cls.list}>{children}</div>
// 	// 	case 'list-item':
// 	// 		return <div {...attributes}>{children}</div>
// 	// 	default:
// 	// 		return <div {...attributes} className={cls.paragraph}>{children}</div>
// 	// }
// }
