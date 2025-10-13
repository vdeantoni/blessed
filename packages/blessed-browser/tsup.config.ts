import { defineConfig } from 'tsup';

export default defineConfig([
  // Main blessed-browser bundle for browser
  {
    // Entry point
    entry: {
      'blessed-browser': 'src/index.ts',
    },

    // Output formats - browser-friendly
    format: ['esm', 'cjs', 'iife'],

    // Output directory
    outDir: 'dist',

    // Platform and target
    platform: 'browser',
    target: 'es2020',

    // Build options
    bundle: true,
    splitting: false,
    treeshake: true,
    clean: true,
    sourcemap: true,
    dts: true,
    minify: false, // Disable for debugging

    // Define environment variables
    define: {
      'process.env.NODE_ENV': '"production"',
      'process.platform': '"browser"',
      'process.env.TERM': '"xterm-256color"',
      global: 'globalThis',
    },

    // Node.js polyfills for browser
    // Don't bundle blessed - let it be an external dependency
    // This allows the consuming bundler (like Vite) to handle it properly
    external: [],
    noExternal: [/@vdeantoni\/blessed/],

    // Global name for IIFE format
    globalName: 'BlessedBrowser',

    // No Node.js shims (we're targeting browser)
    shims: false,

    // esbuild options for browser optimizations
    esbuildOptions(options) {
      // Prefer ESM builds
      options.mainFields = ['module', 'browser', 'main'];
      options.conditions = ['import', 'module', 'browser', 'default'];

      // Replace Node.js built-ins with browser polyfills
      options.alias = {
        child_process: './src/polyfills/empty.ts',
        fs: './src/polyfills/fs.ts',
        module: './src/polyfills/module.ts',
        net: './src/polyfills/empty.ts',
        pngjs: './src/polyfills/pngjs.ts',
        tty: './src/polyfills/tty.ts',
        url: './src/polyfills/url.ts',
        zlib: './src/polyfills/empty.ts',
        path: 'path-browserify',
        stream: 'stream-browserify',
        util: 'util',
        events: 'events',
        buffer: 'buffer',
        process: 'process',
        string_decoder: 'string_decoder',
        assert: 'assert',
      };
    },

    onSuccess: async () => {
      console.log('✅ blessed-browser build complete');
      console.log('📦 Output: dist/blessed-browser.js (ESM)');
      console.log('📦 Output: dist/blessed-browser.cjs (CJS)');
      console.log('📦 Output: dist/blessed-browser.global.js (IIFE)');
    },
  },

  // Vite plugin for Node.js
  {
    entry: {
      'vite-plugin/index': 'src/vite-plugin/index.ts',
    },

    format: ['esm'],
    outDir: 'dist',
    platform: 'node',
    target: 'node18',

    bundle: true,
    splitting: true,
    treeshake: true,
    sourcemap: true,
    dts: true,
    minify: true,

    // External Vite
    external: ['vite', 'path', 'url'],

    onSuccess: async () => {
      console.log('✅ Vite plugin build complete');
      console.log('📦 Output: dist/vite-plugin/index.js');
    },
  },
]);
