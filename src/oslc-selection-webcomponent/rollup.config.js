import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';

export default [
  // ES Module and CommonJS builds
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [typescript()],
    external: ['@oslc/postmessage-helper']
  },
  // Browser-friendly bundle with dependencies included
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.browser.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({
        preferBuiltins: false,
        browser: true
      }),
      typescript()
    ],
    // No external dependencies - bundle everything for browser use
  },
  // TypeScript declarations
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
