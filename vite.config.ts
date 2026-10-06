/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts';
import path from 'path'
import fs from 'fs'
import pkg from './package.json'
import type { Plugin } from 'vite'


/**
 * mette tutto il CSS della libreria in `@layer jack`:
 * le regole non in layer (quelle dell'app che usa jack) vincono sempre,
 * indipendentemente da specificita' e ordine di import
 */
function cssLayer(name: string): Plugin {
	return {
		name: 'css-layer',
		apply: 'build',
		enforce: 'post',
		writeBundle(options, bundle) {
			for (const fileName of Object.keys(bundle)) {
				if (!fileName.endsWith('.css')) continue
				const filePath = path.resolve(options.dir!, fileName)
				const css = fs.readFileSync(filePath, 'utf-8')
				if (css.startsWith(`@layer ${name}`)) continue
				fs.writeFileSync(filePath, `@layer ${name} {\n${css}\n}\n`)
			}
		},
	}
}



// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({ rollupTypes: true }),
		cssLayer('jack'),
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
			external: (id) => Object.keys(pkg.peerDependencies || {}).some((dependency) =>
			id === dependency || id.startsWith(`${dependency}/`)
		),
			output: {
				globals: {
					'react': 'React',
					'react/jsx-runtime': 'ReactJSXRuntime',
					'react/jsx-dev-runtime': 'ReactJSXRuntime',
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
