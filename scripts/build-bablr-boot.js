import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';

const inputOptions = {
  input: 'repos/boot/lib/index.js',
  plugins: [commonjs()],
};

const outputOptions = {
  file: './boot.bundle.js',
  format: 'esm',
};

let bundle = await rollup(inputOptions);
await bundle.generate(outputOptions);
