import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import html  from '@rollup/plugin-html';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import alias from '@rollup/plugin-alias';
import path from 'path'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'

const projectRootDir = path.resolve(__dirname);
const production = process.env.NODE_ENV === 'production';

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
    html({
      title: 'Swarm'
		}),

		json(),

    babel({
			babelrc: false,
			exclude: ['node_modules/**'],
      presets: [
        ['@babel/preset-env', { modules: false }]
      ],
		}),

		sass({
			insert: true,
			processor: css => postcss([autoprefixer])
				.process(css)
				.then(result => result.css)
		}),
		
		postcss({
      plugins: []
    }),

		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('public/bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			jsnext: true,
			browser: true,
			dedupe: ['svelte']
		}),

		commonjs({
			transformMixedEsModules: true
		}),

		alias({
      resolve: ['.svelte', '.js'],
      entries: [
				{find: '@', replacement: path.resolve(projectRootDir, 'src')},
				{find: 'ui', replacement: path.resolve(projectRootDir, 'src/ui')}
			]
		}),
		
		copy({
			targets: [
				{ src: 'src/assets/fonts', dest: 'public' }
			]
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('yarn', ['start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
