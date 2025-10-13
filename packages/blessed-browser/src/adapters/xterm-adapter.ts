/**
 * xterm.js adapter for blessed
 *
 * This adapter allows blessed applications to run in the browser
 * by mapping blessed's Program interface to xterm.js Terminal.
 */

import type { Terminal } from 'xterm';
import { EventEmitter } from 'events';
import blessed from '@vdeantoni/blessed';

// Re-export blessed for convenience
export { blessed };

export interface XTermAdapterOptions {
  terminal: Terminal;
  /**
   * Enable mouse support (experimental)
   */
  mouse?: boolean;
  /**
   * Terminal type to report (default: 'xterm-256color')
   */
  term?: string;
}

/**
 * XTermAdapter bridges blessed's Program API to xterm.js
 *
 * Usage:
 * ```ts
 * import { Terminal } from 'xterm';
 * import { XTermAdapter, createXTermScreen } from '@vdeantoni/blessed-browser';
 *
 * const term = new Terminal();
 * term.open(document.getElementById('terminal'));
 *
 * const screen = createXTermScreen({ terminal: term });
 * // ... use blessed API as normal
 * ```
 */
export class XTermAdapter extends EventEmitter {
  private terminal: Terminal;
  private options: XTermAdapterOptions;

  constructor(options: XTermAdapterOptions) {
    super();
    this.terminal = options.terminal;
    this.options = {
      mouse: false,
      term: 'xterm-256color',
      ...options,
    };

    this.setupTerminal();
  }

  private setupTerminal() {
    // Capture terminal data events and forward to blessed
    // This includes keyboard input AND mouse events (as escape sequences)
    // Note: blessed will parse the data stream and generate keypresses internally,
    // so we don't need to use terminal.onKey() which would cause double input
    this.terminal.onData((data) => {
      this.emit('data', Buffer.from(data));
    });

    // Capture resize events
    this.terminal.onResize((size) => {
      this.emit('resize');
    });

    // Enable mouse support
    if (this.options.mouse && this.terminal.element) {
      this.setupMouseTracking();
    }
  }

  private setupMouseTracking() {
    const element = this.terminal.element;
    if (!element) return;

    let mouseDown = false;
    let lastButton = 0;
    let lastWheelTime = 0;
    const wheelThrottle = 50; // milliseconds between wheel events

    const encodeMouseEvent = (e: MouseEvent, type: 'mousedown' | 'mouseup' | 'mousemove' | 'wheel') => {
      const rect = element.getBoundingClientRect();
      // Calculate cell position
      const col = Math.floor((e.clientX - rect.left) / (rect.width / this.terminal.cols));
      const row = Math.floor((e.clientY - rect.top) / (rect.height / this.terminal.rows));

      // Clamp to terminal bounds
      const x = Math.max(0, Math.min(col, this.terminal.cols - 1));
      const y = Math.max(0, Math.min(row, this.terminal.rows - 1));

      let button = 0;
      if (type === 'wheel') {
        button = (e as WheelEvent).deltaY > 0 ? 65 : 64;
      } else {
        button = e.button;
      }

      let modifier = 0;
      if (e.shiftKey) modifier |= 4;
      if (e.metaKey || e.altKey) modifier |= 8;
      if (e.ctrlKey) modifier |= 16;

      const cb = button + modifier;

      // SGR mouse format: CSI < Cb ; Cx ; Cy M/m
      const action = (type === 'mouseup') ? 'm' : 'M';
      return `\x1b[<${cb};${x + 1};${y + 1}${action}`;
    };

    element.addEventListener('mousedown', (e: MouseEvent) => {
      mouseDown = true;
      lastButton = e.button;
      const seq = encodeMouseEvent(e, 'mousedown');
      this.emit('data', Buffer.from(seq));
      e.preventDefault();
    });

    element.addEventListener('mouseup', (e: MouseEvent) => {
      mouseDown = false;
      const seq = encodeMouseEvent(e, 'mouseup');
      this.emit('data', Buffer.from(seq));
      e.preventDefault();
    });

    element.addEventListener('mousemove', (e: MouseEvent) => {
      if (mouseDown) {
        const seq = encodeMouseEvent(e, 'mousemove');
        this.emit('data', Buffer.from(seq));
      }
    });

    element.addEventListener('wheel', (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < wheelThrottle) {
        e.preventDefault();
        return;
      }
      lastWheelTime = now;

      const seq = encodeMouseEvent(e, 'wheel');
      this.emit('data', Buffer.from(seq));
      e.preventDefault();
    });
  }

  /**
   * Write data to terminal
   */
  write(data: string | Buffer): boolean {
    const str = typeof data === 'string' ? data : data.toString();
    this.terminal.write(str);
    return true;
  }

  /**
   * Get terminal dimensions
   */
  getWindowSize(): [number, number] {
    return [this.terminal.cols, this.terminal.rows];
  }

  /**
   * Check if stream is writable (always true for browser)
   */
  get writable(): boolean {
    return true;
  }

  /**
   * Check if terminal is a TTY (always true for browser)
   */
  get isTTY(): boolean {
    return true;
  }

  /**
   * Get terminal columns
   */
  get columns(): number {
    return this.terminal.cols;
  }

  /**
   * Get terminal rows
   */
  get rows(): number {
    return this.terminal.rows;
  }

  /**
   * Check if in raw mode (always true for browser)
   */
  get isRaw(): boolean {
    return true;
  }

  /**
   * Set raw mode (no-op in browser)
   */
  setRawMode(mode: boolean): void {
    // No-op in browser context
  }

  /**
   * Resume stream (no-op in browser)
   */
  resume(): void {
    // No-op in browser context
  }

  /**
   * Pause stream (no-op in browser)
   */
  pause(): void {
    // No-op in browser context
  }

  /**
   * Clear terminal
   */
  clear(): void {
    this.terminal.clear();
  }

  /**
   * Reset terminal
   */
  reset(): void {
    this.terminal.reset();
  }
}

/**
 * Helper function to create a blessed screen with xterm.js adapter
 *
 * @param options - XTermAdapter options
 * @returns A blessed Screen instance configured for xterm.js
 */
export function createXTermScreen(options: XTermAdapterOptions) {
  // Enable mouse by default
  const adapterOptions = {
    mouse: true,
    ...options,
  };

  const adapter = new XTermAdapter(adapterOptions);

  // Create screen with xterm adapter as input/output
  const screen = blessed.screen({
    input: adapter as any,
    output: adapter as any,
    terminal: options.term || 'xterm-256color',
    fullUnicode: true,
    dockBorders: false,
    smartCSR: true,
    fastCSR: true,
    sendFocus: true,
    warnings: false,
  });

  // Forward adapter events to screen
  adapter.on('resize', () => {
    screen.emit('resize');
    screen.render();
  });

  return screen;
}
