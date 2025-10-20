/**
 * Tui Playground
 * Interactive code execution environment for @unblessed/browser
 */

import { Terminal } from 'https://cdn.jsdelivr.net/npm/xterm@5.3.0/+esm';
import { FitAddon } from 'https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/+esm';
import * as tui from '../../dist/index.js';

export class BlessedPlayground {
  constructor(terminalElement, options = {}) {
    this.terminalElement = terminalElement;
    this.terminal = null;
    this.screen = null;
    this.fitAddon = null;
    this.intervals = [];
    this.timeouts = [];
    this.debounceDelay = options.debounceDelay ?? 300;
    this.debounceTimer = null;
  }

  /**
   * Initialize the terminal
   */
  init() {
    // Create xterm terminal
    this.terminal = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#ffffff'
      }
    });

    // Add fit addon for responsive sizing
    this.fitAddon = new FitAddon();
    this.terminal.loadAddon(this.fitAddon);

    // Open terminal
    this.terminal.open(this.terminalElement);
    this.fitAddon.fit();

    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.fitAddon) {
        this.fitAddon.fit();
      }
    });

    // Show welcome message
    this.showWelcome();
  }

  /**
   * Show welcome message
   */
  showWelcome() {
    this.terminal.writeln('\x1b[1;36m╔══════════════════════════════════════════╗\x1b[0m');
    this.terminal.writeln('\x1b[1;36m║    blessed-browser Interactive Playground    ║\x1b[0m');
    this.terminal.writeln('\x1b[1;36m╚══════════════════════════════════════════╝\x1b[0m');
    this.terminal.writeln('');
    this.terminal.writeln('Write blessed code on the left and click Run');
    this.terminal.writeln('');
  }

  /**
   * Clear the terminal and cleanup
   */
  clear() {
    // Clear all timers
    this.intervals.forEach(id => clearInterval(id));
    this.timeouts.forEach(id => clearTimeout(id));
    this.intervals = [];
    this.timeouts = [];

    // Destroy screen
    if (this.screen) {
      try {
        this.screen.destroy();
      } catch (e) {
        // Ignore errors during cleanup
      }
      this.screen = null;
    }

    // Dispose terminal
    if (this.terminal) {
      this.terminal.dispose();
      this.terminal = null;
    }

    if (this.fitAddon) {
      this.fitAddon = null;
    }

    // Reinitialize
    this.init();
  }

  /**
   * Run user code with debouncing
   */
  debounceRun(code) {
    // Clear existing debounce timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new debounce timer
    this.debounceTimer = setTimeout(() => {
      this.run(code);
      this.debounceTimer = null;
    }, this.debounceDelay);
  }

  /**
   * Run user code
   */
  async run(code) {
    try {
      // Clear previous execution
      this.intervals.forEach(id => clearInterval(id));
      this.timeouts.forEach(id => clearTimeout(id));
      this.intervals = [];
      this.timeouts = [];

      // Destroy previous screen if exists
      if (this.screen) {
        try {
          this.screen.destroy();
        } catch (e) {
          // Ignore
        }
      }

      // Clear terminal
      this.terminal.clear();

      // Create new screen
      this.screen = new tui.Screen({
        terminal: this.terminal
      });

      // Handle quit key
      this.screen.key(['escape', 'q', 'C-c'], () => {
        this.clear();
      });

      // Create wrapped setInterval/setTimeout that we can track
      const wrappedSetInterval = (fn, delay) => {
        const id = setInterval(fn, delay);
        this.intervals.push(id);
        return id;
      };

      const wrappedSetTimeout = (fn, delay) => {
        const id = setTimeout(fn, delay);
        this.timeouts.push(id);
        return id;
      };

      // Create sandboxed function with tui and screen in scope
      const userFunction = new Function(
        'tui',
        'screen',
        'setInterval',
        'setTimeout',
        'clearInterval',
        'clearTimeout',
        code
      );

      // Execute user code
      await userFunction(
        tui,
        this.screen,
        wrappedSetInterval,
        wrappedSetTimeout,
        clearInterval,
        clearTimeout
      );

    } catch (error) {
      // Display error
      this.showError(error);
    }
  }

  /**
   * Show error message
   */
  showError(error) {
    this.terminal.clear();
    this.terminal.writeln('\x1b[1;31m╔══════════════════════════════════════════╗\x1b[0m');
    this.terminal.writeln('\x1b[1;31m║              ERROR                       ║\x1b[0m');
    this.terminal.writeln('\x1b[1;31m╚══════════════════════════════════════════╝\x1b[0m');
    this.terminal.writeln('');
    this.terminal.writeln(`\x1b[1;31m${error.message}\x1b[0m`);
    this.terminal.writeln('');

    if (error.stack) {
      this.terminal.writeln('\x1b[90mStack trace:\x1b[0m');
      const stackLines = error.stack.split('\n').slice(1, 6); // First 5 lines
      stackLines.forEach(line => {
        this.terminal.writeln(`\x1b[90m${line}\x1b[0m`);
      });
    }

    this.terminal.writeln('');
    this.terminal.writeln('\x1b[33mFix the error and click Run again\x1b[0m');
  }

  /**
   * Cleanup resources
   */
  destroy() {
    // Clear debounce timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }

    this.intervals.forEach(id => clearInterval(id));
    this.timeouts.forEach(id => clearTimeout(id));

    if (this.screen) {
      this.screen.destroy();
    }

    if (this.terminal) {
      this.terminal.dispose();
    }
  }
}

export default BlessedPlayground;
