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
  // For full functions module
  {
    input: './message.js',
    output: {
      name: 'icons',
      file: './message.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: PLUGIN_CONFIG
  }
]
