import { defineConfig } from 'tsup';
import { cp } from 'fs/promises';

export default defineConfig({
  // Entry points
  entry: {
    blessed: 'lib/blessed.ts',
    tput: 'bin/tput.ts'
  },

  // Output formats
  format: ['cjs', 'esm'],

  // Output directory
  outDir: 'dist',

  // Bundling strategy
  bundle: true,
  splitting: false,
  treeshake: false,

  // Build options
  clean: true,
  sourcemap: true,
  dts: true,
  minify: true,
  shims: true,

  // CJS/ESM interop
  cjsInterop: true,

  // External dependencies
  external: [
    /^node:.*/,
    'term.js',
    'pty.js'
  ],

  // Target Node.js environment
  platform: 'node',
  target: 'node22',

  // Add footer to make CJS work like traditional CommonJS
  // This allows: const blessed = require('blessed')
  footer: {
    js: 'if (typeof module !== "undefined" && module.exports) { module.exports = module.exports.default || module.exports.blessed || module.exports; }'
  },

  // Copy assets and show success message
  onSuccess: async () => {
    await cp('usr', 'dist/usr', { recursive: true });
    console.log('✅ Copied usr/ to dist/usr/');
    console.log('✅ Build complete');
  }
});