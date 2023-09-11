// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/index.js', // Path to your Express app's main file
  output: {
    file: 'dist/bundle.js',
    format: 'cjs' // CommonJS format for Node.js
  },
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    commonjs(),
    builtins(),
    globals()
  ],
  external: ['express'] // Add other external libraries if needed
};