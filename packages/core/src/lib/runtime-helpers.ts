/**
 * runtime-helpers.ts - Shared runtime helper functions
 *
 * These helpers provide lazy access to runtime APIs with proper initialization.
 */

import * as runtime from '../runtime-context.js';

// Re-export for convenience
export * from '../runtime-context.js';

/**
 * Get environment variable from runtime
 * Cached for performance
 * @param varName - Name of the environment variable
 * @returns Value of the environment variable or empty string if not set
 */
const envCache = new Map<string, string>();
export function getEnvVar(varName: string): string {
  if (envCache.has(varName)) {
    return envCache.get(varName)!;
  }
  const value = runtime.getRuntime().process.env[varName] || '';
  envCache.set(varName, value);
  return value;
}

/**
 * Clear the environment variable cache
 * Useful for testing when env vars change
 */
export function clearEnvCache(): void {
  envCache.clear();
}

/**
 * Get nextTick function from runtime
 * Lazily initialized on first access
 */
let nextTick: ((callback: () => void) => void) | null = null;
export function getNextTick(): (callback: () => void) => void {
  if (!nextTick) {
    nextTick = (callback: () => void) => runtime.getRuntime().process.nextTick(callback);
  }
  return nextTick;
}

/**
 * Get current working directory from runtime
 * Lazily initialized on first access
 */
let __dirname: string | null = null;
export function getDir(): string {
  if (!__dirname) {
    const rt = runtime.getRuntime();
    __dirname = rt.path.dirname(
      rt.url.fileURLToPath(import.meta.url)
    );
  }
  return __dirname;
}

/**
 * Get path to data directory (fonts, terminfo, etc.)
 * Returns absolute path to the data directory in @tui/core package
 */
let __dataPath: string | null = null;
export function getDataPath(): string {
  if (!__dataPath) {
    const rt = runtime.getRuntime();
    const dir = getDir();
    // Go up from src/lib to package root, then into data
    __dataPath = rt.path.resolve(rt.path.join(dir, '../../data'));
  }
  return __dataPath;
}
