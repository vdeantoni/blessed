/**
 * runtime-context.ts - Global runtime context for @tui/core
 *
 * Provides global access to the platform Runtime.
 * Runtime is stateless (just platform APIs), so safe to share globally.
 *
 * One Runtime per process:
 * - Node.js process → NodeRuntime (all screens share)
 * - Browser tab → BrowserRuntime (all screens share)
 */

import type { Runtime } from './runtime.js';

// Re-export for convenience
export * from './runtime.js';

let runtime: Runtime | null = null;

/**
 * Initialize @tui/core with a platform runtime
 *
 * This is the primary API for platform packages to set up the runtime.
 * End users should call platform-specific init functions instead:
 * - @tui/node: `initNode()`
 * - @tui/browser: `initBrowser()`
 *
 * @param rt - Platform runtime implementation (NodeRuntime, BrowserRuntime, etc.)
 *
 * @example
 * ```typescript
 * // Platform package (internal use)
 * import { initCore } from '@tui/core';
 * import { NodeRuntime } from './runtime.js';
 *
 * export function initNode() {
 *   initCore(new NodeRuntime());
 * }
 * ```
 */
export function initCore(rt: Runtime): void {
  if (runtime && runtime !== rt) {
    // In test environment, allow replacing runtime
    const isTest = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';
    if (!isTest) {
      throw new Error('Runtime already initialized with a different instance');
    }
  }
  runtime = rt;
}

/**
 * Set the global runtime (internal API)
 *
 * @deprecated Use initCore() instead. This function is kept for backward compatibility
 * but will be removed in a future version.
 *
 * @internal
 */
export function setRuntime(rt: Runtime): void {
  initCore(rt);
}

/**
 * Get the global runtime
 * Throws if runtime not initialized
 *
 * @internal - Most code should not need to access runtime directly.
 * Platform packages handle initialization via initCore().
 */
export function getRuntime(): Runtime {
  if (!runtime) {
    throw new Error(
      'Runtime not initialized. ' +
      'Call initNode() from @tui/node or initBrowser() from @tui/browser first.\n\n' +
      'Example:\n' +
      '  import { initNode, Screen } from \'@tui/node\';\n' +
      '  initNode();\n' +
      '  const screen = new Screen();'
    );
  }
  return runtime;
}

/**
 * Clear the runtime
 * FOR TESTING ONLY - allows tests to reset runtime between test cases
 * @internal
 */
export function _clearRuntime(): void {
  runtime = null;
}
