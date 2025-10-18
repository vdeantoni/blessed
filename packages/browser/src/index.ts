/**
 * @tui/browser - Browser runtime for Tui
 *
 * Provides browser-compatible runtime for @tui/core with XTerm.js integration.
 *
 * ## Usage
 *
 * ```typescript
 * import { Screen, Box } from '@tui/browser';
 * import { Terminal } from 'xterm';
 *
 * const term = new Terminal();
 * term.open(document.getElementById('terminal')!);
 *
 * // Screen automatically handles xterm.js integration
 * const screen = new Screen({ terminal: term });
 * const box = new Box({ parent: screen, content: 'Hello!' });
 * screen.render();
 * ```
 */

// Initialize runtime BEFORE importing @tui/core (critical!)
import './runtime/auto-init.js';

// Re-export everything from core EXCEPT Screen
export * from '@tui/core';

// Export browser-specific Screen (overrides core Screen)
export { Screen } from './screen.js';
export type { BrowserScreenOptions } from './screen.js';

// Export browser-specific adapters
export { XTermAdapter } from './adapters/xterm-adapter.js';
export type { XTermAdapterOptions } from './adapters/xterm-adapter.js';
