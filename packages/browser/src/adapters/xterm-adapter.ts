/**
 * xterm.js adapter for @unblessed/core
 *
 * This adapter bridges @unblessed/core's Program interface to xterm.js Terminal,
 * enabling terminal UI applications to run in the browser.
 */

import type { Terminal } from "xterm";
import { EventEmitter } from "events";

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
 * XTermAdapter bridges @unblessed/core's Program API to xterm.js
 *
 * Usage:
 * ```ts
 * import { Terminal } from 'xterm';
 * import { XTermAdapter } from '@unblessed/browser';
 *
 * const term = new Terminal();
 * term.open(document.getElementById('terminal'));
 *
 * const adapter = new XTermAdapter({ terminal: term });
 * // Use adapter as input/output for Screen
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
      term: "xterm-256color",
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
      this.emit("data", Buffer.from(data));
    });

    // Capture resize events
    this.terminal.onResize(() => {
      this.emit("resize");
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
    let lastWheelTime = 0;
    const wheelThrottle = 50; // milliseconds between wheel events

    const encodeMouseEvent = (
      e: MouseEvent,
      type: "mousedown" | "mouseup" | "mousemove" | "wheel",
    ) => {
      const rect = element.getBoundingClientRect();
      // Calculate cell position
      const col = Math.floor(
        (e.clientX - rect.left) / (rect.width / this.terminal.cols),
      );
      const row = Math.floor(
        (e.clientY - rect.top) / (rect.height / this.terminal.rows),
      );

      // Clamp to terminal bounds
      const x = Math.max(0, Math.min(col, this.terminal.cols - 1));
      const y = Math.max(0, Math.min(row, this.terminal.rows - 1));

      let button = 0;
      if (type === "wheel") {
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
      const action = type === "mouseup" ? "m" : "M";
      return `\x1b[<${cb};${x + 1};${y + 1}${action}`;
    };

    element.addEventListener("mousedown", (e: MouseEvent) => {
      mouseDown = true;
      const seq = encodeMouseEvent(e, "mousedown");
      this.emit("data", Buffer.from(seq));
      e.preventDefault();
    });

    element.addEventListener("mouseup", (e: MouseEvent) => {
      mouseDown = false;
      const seq = encodeMouseEvent(e, "mouseup");
      this.emit("data", Buffer.from(seq));
      e.preventDefault();
    });

    element.addEventListener("mousemove", (e: MouseEvent) => {
      if (mouseDown) {
        const seq = encodeMouseEvent(e, "mousemove");
        this.emit("data", Buffer.from(seq));
      }
    });

    element.addEventListener("wheel", (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < wheelThrottle) {
        e.preventDefault();
        return;
      }
      lastWheelTime = now;

      const seq = encodeMouseEvent(e, "wheel");
      this.emit("data", Buffer.from(seq));
      e.preventDefault();
    });
  }

  /**
   * Write data to terminal
   */
  write(data: string | Buffer): boolean {
    const str = typeof data === "string" ? data : data.toString();
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
  setRawMode(_mode: boolean): void {
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
