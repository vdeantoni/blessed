import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts'
  },

  format: ['cjs', 'esm'],
  outDir: 'dist',

  bundle: true,
  splitting: false,
  treeshake: true,

  clean: true,
  sourcemap: true,
  dts: true,
  minify: true,
  shims: true,
  cjsInterop: true,

  external: [
    /^node:.*/,
    '@tuxe/core'
  ],

  platform: 'node',
  target: 'node22',

  onSuccess: async () => {
    console.log('✅ @tuxe/node build complete');
  }
});
