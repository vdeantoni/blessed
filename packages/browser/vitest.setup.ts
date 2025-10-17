/**
 * Vitest setup file
 * Runs before each test file
 */

import { Buffer } from 'buffer';

// Mock globals that the browser polyfills would normally set
if (typeof globalThis.process === 'undefined') {
  globalThis.process = {
    env: {},
    cwd: () => '/',
    exit: () => {},
    nextTick: (fn: Function, ...args: any[]) => setTimeout(() => fn(...args), 0),
  } as any;
}

if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer as any;
}

if (typeof (globalThis as any).global === 'undefined') {
  (globalThis as any).global = globalThis;
}
