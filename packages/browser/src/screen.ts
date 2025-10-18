/**
 * Browser-specific Screen implementation
 * Automatically detects and handles xterm.js Terminal instances
 */

import { Screen as CoreScreen } from '@tui/core';
import type { ScreenOptions } from '@tui/core';
import { XTermAdapter } from './adapters/xterm-adapter.js';
import type { Terminal } from 'xterm';

export interface BrowserScreenOptions extends Omit<ScreenOptions, 'terminal'> {
  /**
   * xterm.js Terminal instance for browser rendering
   * If provided, automatically creates XTermAdapter
   */
  terminal?: Terminal;

  /**
   * Enable mouse support (default: true when using xterm.js)
   */
  mouse?: boolean;

  /**
   * Terminal type (default: 'xterm-256color' when using xterm.js)
   */
  term?: string;
}

/**
 * Browser-specific Screen that automatically handles xterm.js integration
 *
 * @example
 * ```typescript
 * import { Terminal } from 'xterm';
 * import { Screen } from '@tui/browser';
 *
 * const term = new Terminal();
 * term.open(document.getElementById('terminal')!);
 *
 * // Automatically creates XTermAdapter internally
 * const screen = new Screen({ terminal: term });
 * ```
 */
export class Screen extends CoreScreen {
  private xtermAdapter?: XTermAdapter;

  constructor(options: BrowserScreenOptions = {}) {
    // Detect xterm.js terminal and set up adapter
    if (options.terminal) {
      const adapter = new XTermAdapter({
        terminal: options.terminal,
        mouse: options.mouse !== false, // Default to true
        term: options.term,
      });

      // Extract terminal and create proper ScreenOptions
      const { terminal: _terminal, mouse: _mouse, ...restOptions } = options;

      // Good defaults for browser/xterm.js usage
      const screenOptions: ScreenOptions = {
        ...restOptions,
        input: adapter as any,
        output: adapter as any,
        terminal: options.term || 'xterm-256color',
        // Performance optimizations
        smartCSR: restOptions.smartCSR ?? true,
        fastCSR: restOptions.fastCSR ?? true,
        // Browser/xterm.js has great unicode support
        fullUnicode: restOptions.fullUnicode ?? true,
      };

      super(screenOptions);

      this.xtermAdapter = adapter;

      // Forward resize events
      adapter.on('resize', () => {
        this.emit('resize');
        this.render();
      });
    } else {
      // Standard screen without xterm.js - remove terminal/mouse props
      const { terminal: _terminal, mouse: _mouse, ...restOptions } = options;
      super(restOptions);
    }
  }

  override destroy(): void {
    if (this.xtermAdapter) {
      this.xtermAdapter.removeAllListeners();
      this.xtermAdapter = undefined;
    }
    super.destroy();
  }
}

export default Screen;
