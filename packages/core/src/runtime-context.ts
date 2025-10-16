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
 * Set the global runtime
 * Should be called once at application startup by platform entry point
 * (@tui/node or @tui/browser)
 *
 * In test environments, calling setRuntime() multiple times with the same
 * runtime instance is allowed (idempotent). Different instances will cause an error.
 */
export function setRuntime(rt: Runtime): void {
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
 * Get the global runtime
 * Throws if runtime not initialized
 */
export function getRuntime(): Runtime {
  if (!runtime) {
    throw new Error(
      'Runtime not initialized. ' +
      'Platform entry point (@tui/node or @tui/browser) must call setRuntime() first.'
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
