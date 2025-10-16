/**
 * Auto-initialization for blessed-browser
 *
 * This module automatically sets up the browser environment with:
 * 1. Node.js polyfills (process, Buffer, etc.)
 * 2. @tui/core Runtime implementation for browser
 * 3. Global references
 */

import { setRuntime } from '@tui/core';
import type { Runtime } from '@tui/core';
import type { PathLike } from 'fs';
import { Buffer } from 'buffer';
import { EventEmitter } from 'events';
// @ts-ignore
import path from 'path-browserify';
import { StringDecoder } from 'string_decoder';

// Import terminfo and font data
import xtermData from '@tui/core/data/terminfo/xterm-256color.json';
import terU14n from '@tui/core/data/fonts/ter-u14n.json';
import terU14b from '@tui/core/data/fonts/ter-u14b.json';

// Only initialize once
if (typeof (globalThis as any).__BLESSED_BROWSER_INITIALIZED__ === 'undefined') {
  // Step 1: Set up process global
  if (typeof globalThis.process === 'undefined') {
    const listeners = new Map<string, Set<Function>>();

    (globalThis as any).process = {
      platform: 'browser',
      arch: 'x64',
      env: { TERM: 'xterm-256color' },
      cwd: () => '/',
      exit: (code?: number) => {
        console.log(`Process exit called with code: ${code ?? 0}`);
        throw new Error('Process exited');
      },
      pid: 1,
      title: 'browser',
      version: 'v18.0.0',
      stdin: {},
      stdout: {},
      stderr: {},
      on: (event: string, listener: Function) => {
        if (!listeners.has(event)) {
          listeners.set(event, new Set());
        }
        listeners.get(event)!.add(listener);
      },
      once: (event: string, listener: Function) => {
        const wrapper = (...args: any[]) => {
          listener(...args);
          globalThis.process.removeListener(event, wrapper);
        };
        globalThis.process.on(event, wrapper);
      },
      removeListener: (event: string, listener: Function) => {
        const eventListeners = listeners.get(event);
        if (eventListeners) {
          eventListeners.delete(listener);
        }
      },
      removeAllListeners: (event?: string) => {
        if (event) {
          listeners.delete(event);
        } else {
          listeners.clear();
        }
      },
      listeners: (event: string) => {
        const eventListeners = listeners.get(event);
        return eventListeners ? Array.from(eventListeners) : [];
      },
      nextTick: (fn: Function, ...args: any[]) => {
        setTimeout(() => fn(...args), 0);
      },
      kill: () => {
        throw new Error('process.kill not supported in browser');
      }
    };
  }

  // Step 2: Set up Buffer global
  if (typeof globalThis.Buffer === 'undefined') {
    (globalThis as any).Buffer = Buffer;
  }

  // Step 3: Set up global reference
  if (!(globalThis as any).global) {
    (globalThis as any).global = globalThis;
  }

  // Step 4: Browser-compatible util implementation
  const browserUtil = {
    inspect: (obj: any, options?: any): string => {
      try {
        if (obj === null) return 'null';
        if (obj === undefined) return 'undefined';
        if (typeof obj === 'string') return `'${obj}'`;
        if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
        if (typeof obj === 'function') return `[Function: ${obj.name || 'anonymous'}]`;

        const depth = options?.depth ?? 2;
        const seen = new WeakSet();

        const inspect = (value: any, currentDepth: number): string => {
          if (value === null) return 'null';
          if (value === undefined) return 'undefined';
          if (typeof value !== 'object') return JSON.stringify(value);

          if (seen.has(value)) return '[Circular]';
          if (currentDepth >= depth) return '[Object]';

          seen.add(value);

          if (Array.isArray(value)) {
            const items = value.map(v => inspect(v, currentDepth + 1)).join(', ');
            return `[ ${items} ]`;
          }

          const entries = Object.entries(value)
            .map(([k, v]) => `${k}: ${inspect(v, currentDepth + 1)}`)
            .join(', ');
          return `{ ${entries} }`;
        };

        return inspect(obj, 0);
      } catch (e) {
        return String(obj);
      }
    },

    format: (format: string, ...args: any[]): string => {
      let i = 0;
      return format.replace(/%[sdifjoO%]/g, (match) => {
        if (match === '%%') return '%';
        if (i >= args.length) return match;

        const arg = args[i++];
        switch (match) {
          case '%s': return String(arg);
          case '%d':
          case '%i': return String(parseInt(arg, 10));
          case '%f': return String(parseFloat(arg));
          case '%j': return JSON.stringify(arg);
          case '%o':
          case '%O': return browserUtil.inspect(arg);
          default: return match;
        }
      });
    }
  };

  // Step 5: Create and set BrowserRuntime
  class BrowserRuntime implements Runtime {
    fs: Runtime['fs'];
    path: Runtime['path'];
    process: Runtime['process'];
    childProcess: Runtime['childProcess'];
    tty: Runtime['tty'];
    url: Runtime['url'];
    util: Runtime['util'];
    net: Runtime['net'];
    stringDecoder: Runtime['stringDecoder'];
    stream: Runtime['stream'];
    buffer: Runtime['buffer'];
    png: Runtime['png'];
    gif: Runtime['gif'];

    constructor() {
      // @ts-ignore
      this.fs = {
        readFileSync: ((filePath: PathLike, encoding?: any): Buffer | string => {
          const pathStr = filePath.toString();

          // Handle terminfo files
          if (pathStr.includes('xterm')) {
            const base64Data = (xtermData as any).data;
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            const buffer = Buffer.from(bytes);
            return encoding ? buffer.toString(encoding) : buffer;
          }

          // Handle font files - be more lenient with path matching
          if (pathStr.includes('ter-u14n')) {
            const str = JSON.stringify(terU14n);
            return encoding ? str : Buffer.from(str, 'utf8');
          }
          if (pathStr.includes('ter-u14b')) {
            const str = JSON.stringify(terU14b);
            return encoding ? str : Buffer.from(str, 'utf8');
          }

          console.error(`[BrowserRuntime] File not found: ${pathStr}`);
          throw new Error(`fs.readFileSync not supported in browser (path: ${pathStr})`);
        }) as any,

        readdirSync: ((dirPath: PathLike): string[] => {
          const pathStr = dirPath.toString();
          if (pathStr.includes('terminfo')) {
            return ['xterm', 'xterm-256color', 'xterm-color'];
          }
          throw new Error(`fs.readdirSync not supported in browser (path: ${pathStr})`);
        }) as any,

        existsSync: ((filePath: PathLike): boolean => {
          const pathStr = filePath.toString();
          if (pathStr.includes('xterm') || pathStr.includes('terminfo')) {
            return true;
          }
          if (pathStr.endsWith('.json') &&
              (pathStr.includes('ter-u14n') || pathStr.includes('ter-u14b'))) {
            return true;
          }
          return false;
        }) as any,

        statSync: ((filePath: PathLike): any => {
          const pathStr = filePath.toString();
          if (this.fs.existsSync(pathStr)) {
            return {
              isFile: () => true,
              isDirectory: () => false,
              isSymbolicLink: () => false,
            };
          }
          throw new Error(`ENOENT: no such file or directory, stat '${pathStr}'`);
        }) as any,

        lstatSync: ((filePath: PathLike): any => {
          return this.fs.statSync(filePath);
        }) as any,

        readlinkSync: ((_filePath: PathLike): string => {
          throw new Error(`fs.readlinkSync not supported in browser`);
        }) as any,

        mkdirSync: (() => {
          throw new Error('fs.mkdirSync not supported in browser');
        }) as any,

        createWriteStream: (() => {
          throw new Error('fs.createWriteStream not supported in browser');
        }) as any,

        readFile: ((...args: any[]) => {
          const callback = args[args.length - 1];
          if (typeof callback === 'function') {
            callback(new Error('fs.readFile not supported in browser'));
          }
        }) as any,

        readdir: ((...args: any[]) => {
          const callback = args[args.length - 1];
          if (typeof callback === 'function') {
            callback(new Error('fs.readdir not supported in browser'));
          }
        }) as any,

        unlink: ((...args: any[]) => {
          const callback = args[args.length - 1];
          if (typeof callback === 'function') {
            callback(new Error('fs.unlink not supported in browser'));
          }
        }) as any,

        writeFile: ((...args: any[]) => {
          const callback = args[args.length - 1];
          if (typeof callback === 'function') {
            callback(new Error('fs.writeFile not supported in browser'));
          }
        }) as any,

        stat: ((...args: any[]) => {
          const callback = args[args.length - 1];
          if (typeof callback === 'function') {
            callback(new Error('fs.stat not supported in browser'));
          }
        }) as any,
      };

      this.path = path as Runtime['path'];
      // @ts-ignore
      this.process = globalThis.process as Runtime['process'];

      // @ts-ignore
      this.childProcess = {
        spawn: (() => {
          throw new Error('child_process.spawn not supported in browser');
        }) as any,
        execSync: (() => {
          throw new Error('child_process.execSync not supported in browser');
        }) as any,
        execFileSync: (() => {
          throw new Error('child_process.execFileSync not supported in browser');
        }) as any,
      };

      // @ts-ignore
      this.tty = {
        isatty: (() => true) as any,
      };

      // @ts-ignore
      this.url = {
        parse: ((urlString: string) => {
          const u = new URL(urlString);
          return {
            href: u.href,
            protocol: u.protocol,
            hostname: u.hostname,
            port: u.port,
            pathname: u.pathname,
            search: u.search,
            hash: u.hash,
          };
        }) as any,
        format: ((urlObject: any) => {
          return urlObject.href || '';
        }) as any,
        fileURLToPath: ((url: string | URL) => {
          // Handle null/undefined
          if (!url) {
            console.warn('[BrowserRuntime] fileURLToPath called with', url);
            return '/';
          }

          const urlStr = typeof url === 'string' ? url : url.toString();
          if (urlStr.startsWith('file://')) {
            return urlStr.slice(7);
          }
          return urlStr;
        }) as any,
      };

      this.util = browserUtil as Runtime['util'];

      // @ts-ignore
      this.net = {
        createConnection: (() => {
          throw new Error('net.createConnection not supported in browser');
        }) as any,
      };

      this.stringDecoder = { StringDecoder } as Runtime['stringDecoder'];

      this.stream = {
        Readable: EventEmitter as any,
        Writable: EventEmitter as any,
      };

      this.buffer = { Buffer };

      this.png = {
        PNG: class {
          constructor() {
            throw new Error('PNG not supported in browser');
          }
        } as any,
      };

      this.gif = {
        GifReader: class {
          constructor() {
            throw new Error('GIF not supported in browser');
          }
        } as any,
      };
    }
  }

  const runtime = new BrowserRuntime();
  setRuntime(runtime);

  // Mark as initialized
  (globalThis as any).__BLESSED_BROWSER_INITIALIZED__ = true;
  console.log('[blessed-browser] Runtime initialized');
}