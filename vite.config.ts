/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts';
import path from 'path'
import pkg from './package.json'



// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({ rollupTypes: true }),
	],
	build: {
		outDir: 'dist',
		sourcemap: true,
		lib: {
			entry: 'src/index.ts',
			name: 'Jack',
			formats: ['es', 'umd'],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: Object.keys(pkg.peerDependencies || {}),
			output: {
				globals: {
					'react': 'React',
					'react-dom': 'ReactDOM',
					'@priolo/jon': 'Jon',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	test: {
		globals: true,
		environment: 'jsdom',
		// you might want to disable it, if you don't have tests that rely on CSS
		// since parsing CSS is slow
		css: false,
	},
})
