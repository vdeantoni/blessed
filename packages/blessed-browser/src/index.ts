/**
 * blessed-browser main entry point
 *
 * This module adapts the blessed TUI library for browser use by:
 * 1. Auto-initializing Node.js polyfills (no consumer setup needed!)
 * 2. Inlining terminfo/termcap data
 * 3. Excluding non-browser-compatible widgets
 * 4. Providing xterm.js integration
 *
 * Simply import and use - zero configuration required!
 */

// IMPORTANT: Import auto-init first to set up environment
import './runtime/auto-init.js';

// Re-export core blessed (with polyfills applied)
export * from '@vdeantoni/blessed';

// Export xterm adapter
export { XTermAdapter, createXTermScreen, blessed } from './adapters/xterm-adapter.js';

// Note: The following widgets are NOT available in browser build:
// - filemanager (uses fs extensively)
// - video (uses child_process)
// - ansiimage (uses child_process)
// - overlayimage (uses child_process)
// - bigtext (uses fs)
