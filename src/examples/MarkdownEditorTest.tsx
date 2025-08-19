import React, { useState } from 'react'
import MarkdownEditor from '../components/input/MarkdownEditor'

const MarkdownEditorTest: React.FC = () => {
	const [value, setValue] = useState('# Hello World\n\nThis is a **test** markdown.')
	const [externalValue, setExternalValue] = useState('# External Value\n\nThis value is set *externally*.')

	return (
		<div style={{ padding: '20px', maxWidth: '800px' }}>
			<h2>MarkdownEditor Test</h2>
			
			<div style={{ marginBottom: '20px' }}>
				<h3>Controlled MarkdownEditor</h3>
				<MarkdownEditor 
					value={value} 
					onChange={setValue}
					placeholder="Type your markdown here..."
				/>
				<div style={{ marginTop: '10px' }}>
					<strong>Current value:</strong>
					<pre style={{ background: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
						{value}
					</pre>
				</div>
			</div>

			<div style={{ marginBottom: '20px' }}>
				<h3>Test External Value Updates</h3>
				<button 
					onClick={() => setValue('# Updated Externally!\n\nThis content was set from **outside** the component.')}
					style={{ marginRight: '10px', padding: '8px 16px' }}
				>
					Update to "Updated Externally"
				</button>
				<button 
					onClick={() => setValue('## Another Update\n\n- Item 1\n- Item 2\n- Item 3')}
					style={{ marginRight: '10px', padding: '8px 16px' }}
				>
					Update to List
				</button>
				<button 
					onClick={() => setValue('')}
					style={{ padding: '8px 16px' }}
				>
					Clear Content
				</button>
			</div>

			<div style={{ marginBottom: '20px' }}>
				<h3>Second Editor (Independent)</h3>
				<MarkdownEditor 
					value={externalValue} 
					onChange={setExternalValue}
					placeholder="This is a separate editor..."
				/>
				<div style={{ marginTop: '10px' }}>
					<strong>Second editor value:</strong>
					<pre style={{ background: '#f0f8ff', padding: '10px', fontSize: '12px' }}>
						{externalValue}
					</pre>
				</div>
			</div>
		</div>
	)
}

export default MarkdownEditorTest
