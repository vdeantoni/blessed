import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points
  entry: {
    blessed: 'lib/blessed.js',
    tput: 'bin/tput.js'
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
  dts: false,
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

  // Success message
  onSuccess: 'echo "✅ Build complete"'
});