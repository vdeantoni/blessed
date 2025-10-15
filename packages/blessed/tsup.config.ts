import { defineConfig } from 'tsup';
import { cp } from 'fs/promises';

export default defineConfig({
  entry: {
    blessed: 'lib/blessed.ts',
    tput: 'bin/tput.ts'
  },

  format: ['cjs', 'esm'],
  outDir: 'dist',

  bundle: true,
  splitting: false,
  treeshake: false,

  clean: true,
  sourcemap: true,
  dts: true,
  minify: true,
  shims: true,
  cjsInterop: true,

  external: [
    /^node:.*/,
    'term.js',
    'pty.js'
  ],

  platform: 'node',
  target: 'node22',

  onSuccess: async () => {
    await cp('usr', 'dist/usr', { recursive: true });
    console.log('✅ Copied usr/ to dist/usr/');
    console.log('✅ Build complete');
  }
});