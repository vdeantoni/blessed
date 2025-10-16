import { defineConfig } from 'tsup';
import { cp } from 'fs/promises';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    tput: 'bin/tput.ts',
  },

  format: ['cjs', 'esm'],
  outDir: 'dist',

  bundle: true,
  splitting: false,
  treeshake: false,

  clean: true,
  sourcemap: true,
  dts: {
    entry: 'src/index.ts',
  },
  minify: true,
  shims: true,
  cjsInterop: true,

  external: [
    '@tui/node'
  ],

  platform: 'node',
  target: 'node22',

  onSuccess: async () => {
    await cp('../core/data', 'dist/usr', { recursive: true });
    console.log('✅ Copied ../core/data/ to dist/usr/');
    console.log('✅ @tui/blessed build complete');
  }
});
