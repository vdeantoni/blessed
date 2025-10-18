/**
 * Vite plugin for @tui/browser
 *
 * Optional plugin that provides optimized build configuration for @tui/browser in Vite projects.
 * Configures dependency optimization and module resolution for better dev/build performance.
 *
 * Note: This plugin is OPTIONAL. @tui/browser works without it, but the plugin
 * provides optimizations for Vite users.
 *
 * Usage:
 * ```ts
 * // vite.config.ts
 * import blessedBrowser from '@tui/browser/vite-plugin';
 *
 * export default defineConfig({
 *   plugins: [blessedBrowser()]
 * });
 * ```
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
    name: 'vite-plugin-tui-browser',

    config(): UserConfig {
      // Get absolute path to polyfills directory
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
            // Don't pre-bundle @tui/browser - it's already bundled
            exclude: ['@tui/browser'],
            include: ['@tui/core'],
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
