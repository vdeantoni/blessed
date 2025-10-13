/**
 * Auto-initialization for blessed-browser
 *
 * This module automatically sets up the browser environment with necessary
 * Node.js polyfills and globals. It runs automatically when blessed-browser
 * is imported, requiring zero configuration from consumers.
 *
 * Sets up:
 * - process global with env, cwd, exit, nextTick, etc.
 * - Buffer global
 * - global pointing to globalThis
 */

// @ts-ignore - process/browser.js doesn't have types
import process from 'process/browser.js';
import { Buffer } from 'buffer';

// Only initialize if not already done
if (typeof (globalThis as any).__BLESSED_BROWSER_INITIALIZED__ === 'undefined') {
  // Set up process global
  if (!globalThis.process) {
    globalThis.process = process as any;
  }

  // Set up Buffer global
  if (!globalThis.Buffer) {
    globalThis.Buffer = Buffer as any;
  }

  // Set up global reference
  if (!(globalThis as any).global) {
    (globalThis as any).global = globalThis;
  }

  // Ensure process.env exists
  if (!globalThis.process.env) {
    globalThis.process.env = {};
  }

  // Set default environment variables for blessed
  if (!globalThis.process.env.TERM) {
    globalThis.process.env.TERM = 'xterm-256color';
  }
  if (!globalThis.process.env.NODE_ENV) {
    globalThis.process.env.NODE_ENV = 'production';
  }

  // Mock essential process methods if not present
  if (!globalThis.process.cwd) {
    globalThis.process.cwd = () => '/';
  }

  if (!globalThis.process.exit) {
    globalThis.process.exit = ((code?: number) => {
      console.log(`Process exit called with code: ${code ?? 0}`);
    }) as any;
  }

  if (!globalThis.process.nextTick) {
    globalThis.process.nextTick = (fn: Function, ...args: any[]) => {
      setTimeout(() => fn(...args), 0);
    };
  }

  // Mark as initialized to prevent double initialization
  (globalThis as any).__BLESSED_BROWSER_INITIALIZED__ = true;
}

// Re-export for consumers who may want to access them directly
export { process, Buffer };
