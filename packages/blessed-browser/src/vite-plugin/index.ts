/**
 * Vite plugin for @vdeantoni/blessed-browser
 *
 * Optional plugin that optimizes blessed-browser integration in Vite projects.
 * Provides better dev mode experience with HMR and optimized builds.
 *
 * Usage:
 * ```ts
 * // vite.config.ts
 * import blessedBrowser from '@vdeantoni/blessed-browser/vite-plugin';
 *
 * export default defineConfig({
 *   plugins: [blessedBrowser()]
 * });
 * ```
 *
 * Note: This plugin is OPTIONAL. blessed-browser works without it,
 * but the plugin provides optimizations for Vite users.
 */

import type { Plugin, UserConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

export interface BlessedBrowserPluginOptions {
  /**
   * Whether to apply Node.js polyfill aliases
   * @default true
   */
  polyfills?: boolean;

  /**
   * Whether to optimize dependencies
   * @default true
   */
  optimizeDeps?: boolean;
}

export default function blessedBrowserPlugin(
  options: BlessedBrowserPluginOptions = {}
): Plugin {
  const { polyfills = true, optimizeDeps = true } = options;

  return {
    name: 'vite-plugin-blessed-browser',

    // Inject polyfills early via HTML transform
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(
          '<head>',
          `<head>
    <script type="module">
      // blessed-browser polyfill injection - runs before any modules
      import process from 'process/browser.js';
      import { Buffer } from 'buffer';

      globalThis.process = process;
      globalThis.Buffer = Buffer;
      globalThis.global = globalThis;

      if (!globalThis.process.env) globalThis.process.env = {};
      globalThis.process.env.TERM = 'xterm-256color';
      globalThis.process.env.NODE_ENV = 'development';
      globalThis.process.cwd = () => '/';
      globalThis.process.exit = (code) => console.log('Process exit:', code);
      globalThis.process.nextTick = (fn, ...args) => setTimeout(() => fn(...args), 0);
    </script>`
        );
      },
    },

    config(): UserConfig {
      // Get absolute path to polyfills directory
      // In development (from source): src/vite-plugin -> src/polyfills
      // In production (from dist): dist/vite-plugin -> src/polyfills
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      // Try to find the package root by looking for src or going up
      let polyfillsPath: string;
      if (__dirname.includes('/src/')) {
        // Development mode - resolve from src
        polyfillsPath = resolve(__dirname, '../polyfills');
      } else {
        // Production mode - resolve from dist back to src
        polyfillsPath = resolve(__dirname, '../../src/polyfills');
      }

      const resolveAliases = polyfills
        ? ({
            // Map Node.js built-ins to browser polyfills with absolute paths
            fs: resolve(polyfillsPath, 'fs.ts'),
            child_process: resolve(polyfillsPath, 'empty.ts'),
            net: resolve(polyfillsPath, 'empty.ts'),
            tty: resolve(polyfillsPath, 'tty.ts'),
            module: resolve(polyfillsPath, 'module.ts'),
            zlib: resolve(polyfillsPath, 'empty.ts'),
            url: resolve(polyfillsPath, 'empty.ts'),
            pngjs: resolve(polyfillsPath, 'pngjs.ts'),
          } as const)
        : undefined;

      const optimizeDepsConfig = optimizeDeps
        ? {
            // Don't pre-bundle blessed-browser - it's already bundled
            exclude: ['@vdeantoni/blessed-browser'],
            include: ['@vdeantoni/blessed'],
            esbuildOptions: {
              define: {
                global: 'globalThis',
              },
            },
          }
        : undefined;

      return {
        resolve: {
          alias: resolveAliases,
          mainFields: ['module', 'browser', 'main'],
          conditions: ['import', 'module', 'browser', 'default'],
        },
        optimizeDeps: optimizeDepsConfig,
      };
    },
  };
}

// Named export for convenience
export { blessedBrowserPlugin };
