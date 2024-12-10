import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const inputOptions = {
  input: 'repos/boot/lib/index.js',
  plugins: [commonjs(), nodeResolve({ exportConditions: ['node'] })],
};

const esmOutputOptions = {
  file: 'repos/boot/dist/esm.bundle.mjs',
  format: 'esm',
};

const cjsOutputOptions = {
  file: 'repos/boot/dist/cjs.bundle.cjs',
  format: 'cjs',
};

let bundle = await rollup(inputOptions);
await bundle.write(esmOutputOptions);
await bundle.write(cjsOutputOptions);
