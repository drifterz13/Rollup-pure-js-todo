import serve from 'rollup-plugin-serve'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/main.ts',
  output: {
    file: 'build/bundle.js',
    format: 'esm',
  },
  plugins: [
    typescript(),
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    postcss({
      extract: true,
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [terser()]
      : [
          serve({
            contentBase: ['build'],
            host: 'localhost',
            port: 1234,
          }),
          livereload(),
        ]),
  ],
}
