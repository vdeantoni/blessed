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

  // IMPORTANT: Don't bundle - blessed uses dynamic requires
  // We'll just transpile when we have TypeScript files
  bundle: false,

  // Generate declaration files
  dts: false, // Will enable when we start converting to TS

  // Source maps
  sourcemap: true,

  // Clean output directory before build
  clean: true,

  // Keep original file structure
  splitting: false,

  // Don't bundle dependencies
  external: [
    /^node:.*/,
    'term.js',
    'pty.js',
    'blessed/lib/colors'
  ],

  // Preserve dynamic requires (important for blessed's plugin system)
  shims: true,

  // Target Node.js environment
  platform: 'node',
  target: 'node14',

  // Don't minify for better debugging
  minify: false,

  // Preserve original names
  treeshake: false,

  // Copy other assets
  onSuccess: 'echo "✅ Build complete"'
});