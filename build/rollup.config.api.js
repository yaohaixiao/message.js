import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const PLUGIN_CONFIG = [
  nodeResolve({
    mainFields: ['module', 'jsnext', 'main', 'browser']
  }),
  commonjs(),
  terser()
]

export default [
  {
    input: './api/js/main.js',
    output: {
      name: 'outline',
      file: './docs/js/docs.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: PLUGIN_CONFIG
  }
]
