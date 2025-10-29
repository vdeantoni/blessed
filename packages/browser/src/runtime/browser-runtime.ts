/**
 * Browser Runtime Implementation
 *
 * Provides browser-compatible implementations of Node.js APIs
 * for @unblessed/core to run in the browser.
 */

import type { Runtime } from "@unblessed/core";
import { Buffer } from "buffer";
import { EventEmitter } from "events";
import type { PathLike } from "fs";
// @ts-ignore
import path from "path-browserify";
import { StringDecoder } from "string_decoder";

// Import terminfo and font data
import terU14b from "@unblessed/core/data/fonts/ter-u14b.json";
import terU14n from "@unblessed/core/data/fonts/ter-u14n.json";
import xtermData from "@unblessed/core/data/terminfo/xterm-256color.json";

/**
 * Browser-compatible util implementation
 *
 * We use a custom implementation instead of the 'util' npm package because:
 * - The 'util' package checks process.env.NODE_DEBUG at module load time
 * - This causes "process is not defined" errors in browser environments
 * - Our custom implementation is simple, has no dependencies, and works reliably
 */
export const browserUtil = {
  inspect: (obj: any, options?: any): string => {
    try {
      if (obj === null) return "null";
      if (obj === undefined) return "undefined";
      if (typeof obj === "string") return `'${obj}'`;
      if (typeof obj === "number" || typeof obj === "boolean")
        return String(obj);
      if (typeof obj === "function")
        return `[Function: ${obj.name || "anonymous"}]`;

      const depth = options?.depth ?? 2;
      const seen = new WeakSet();

      const inspect = (value: any, currentDepth: number): string => {
        if (value === null) return "null";
        if (value === undefined) return "undefined";
        if (typeof value !== "object") return JSON.stringify(value);

        if (seen.has(value)) return "[Circular]";
        if (currentDepth >= depth) return "[Object]";

        seen.add(value);

        if (Array.isArray(value)) {
          const items = value
            .map((v) => inspect(v, currentDepth + 1))
            .join(", ");
          return `[ ${items} ]`;
        }

        const entries = Object.entries(value)
          .map(([k, v]) => `${k}: ${inspect(v, currentDepth + 1)}`)
          .join(", ");
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
      if (match === "%%") return "%";
      if (i >= args.length) return match;

      const arg = args[i++];
      switch (match) {
        case "%s":
          return String(arg);
        case "%d":
        case "%i":
          return String(parseInt(arg, 10));
        case "%f":
          return String(parseFloat(arg));
        case "%j":
          return JSON.stringify(arg);
        case "%o":
        case "%O":
          return browserUtil.inspect(arg);
        default:
          return match;
      }
    });
  },
};

/**
 * BrowserRuntime
 *
 * Implements the Runtime interface with browser-compatible polyfills.
 * Provides virtual filesystem, process stubs, and other Node.js API replacements.
 */
export class BrowserRuntime implements Runtime {
  fs: Runtime["fs"];
  path: Runtime["path"];
  process: Runtime["process"];
  buffer: Runtime["buffer"];
  url: Runtime["url"];
  utils: Runtime["utils"];

  // Optional grouped APIs
  images?: Runtime["images"];
  processes?: Runtime["processes"];
  networking?: Runtime["networking"];

  constructor() {
    // Virtual filesystem - returns bundled data
    // @ts-ignore
    this.fs = {
      readFileSync: ((filePath: PathLike, encoding?: any): Buffer | string => {
        const pathStr = filePath.toString();

        // Handle terminfo files
        if (pathStr.includes("xterm")) {
          const base64Data = (xtermData as any).data;
          const binaryString = atob(base64Data);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const buffer = Buffer.from(bytes);
          return encoding ? buffer.toString(encoding) : buffer;
        }

        // Handle font files
        if (pathStr.includes("ter-u14n")) {
          const str = JSON.stringify(terU14n);
          return encoding ? str : Buffer.from(str, "utf8");
        }
        if (pathStr.includes("ter-u14b")) {
          const str = JSON.stringify(terU14b);
          return encoding ? str : Buffer.from(str, "utf8");
        }

        console.error(`[BrowserRuntime] File not found: ${pathStr}`);
        throw new Error(
          `fs.readFileSync not supported in browser (path: ${pathStr})`,
        );
      }) as any,

      readdirSync: ((dirPath: PathLike): string[] => {
        const pathStr = dirPath.toString();
        if (pathStr.includes("terminfo")) {
          return ["xterm", "xterm-256color", "xterm-color"];
        }
        throw new Error(
          `fs.readdirSync not supported in browser (path: ${pathStr})`,
        );
      }) as any,

      existsSync: ((filePath: PathLike): boolean => {
        const pathStr = filePath.toString();
        if (pathStr.includes("xterm") || pathStr.includes("terminfo")) {
          return true;
        }
        if (
          pathStr.endsWith(".json") &&
          (pathStr.includes("ter-u14n") || pathStr.includes("ter-u14b"))
        ) {
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
        throw new Error("fs.mkdirSync not supported in browser");
      }) as any,

      createWriteStream: (() => {
        throw new Error("fs.createWriteStream not supported in browser");
      }) as any,

      readFile: ((...args: any[]) => {
        const callback = args[args.length - 1];
        if (typeof callback === "function") {
          callback(new Error("fs.readFile not supported in browser"));
        }
      }) as any,

      readdir: ((...args: any[]) => {
        const callback = args[args.length - 1];
        if (typeof callback === "function") {
          callback(new Error("fs.readdir not supported in browser"));
        }
      }) as any,

      unlink: ((...args: any[]) => {
        const callback = args[args.length - 1];
        if (typeof callback === "function") {
          callback(new Error("fs.unlink not supported in browser"));
        }
      }) as any,

      writeFile: ((...args: any[]) => {
        const callback = args[args.length - 1];
        if (typeof callback === "function") {
          callback(new Error("fs.writeFile not supported in browser"));
        }
      }) as any,

      stat: ((...args: any[]) => {
        const callback = args[args.length - 1];
        if (typeof callback === "function") {
          callback(new Error("fs.stat not supported in browser"));
        }
      }) as any,
    };

    // Path operations
    this.path = path as Runtime["path"];

    // Process (uses global polyfill)
    // @ts-ignore
    this.process = globalThis.process as Runtime["process"];

    // Buffer
    this.buffer = { Buffer };

    // URL operations
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
        return urlObject.href || "";
      }) as any,
      fileURLToPath: ((url: string | URL) => {
        if (!url) {
          console.warn("[BrowserRuntime] fileURLToPath called with", url);
          return "/";
        }

        const urlStr = typeof url === "string" ? url : url.toString();
        if (urlStr.startsWith("file://")) {
          return urlStr.slice(7);
        }
        return urlStr;
      }) as any,
    };

    // Utilities (util, stringDecoder, stream)
    // Using custom browserUtil to avoid "process is not defined" errors from npm util package
    // Using EventEmitter for stream stubs (simple and works)
    this.utils = {
      util: browserUtil as any,
      stringDecoder: { StringDecoder } as any,
      stream: {
        Readable: EventEmitter as any,
        Writable: EventEmitter as any,
      },
      events: {
        EventEmitter,
      },
    };

    // Optional API groups

    // Processes API group (childProcess stubs)
    this.processes = {
      childProcess: {
        spawn: (() => {
          throw new Error("child_process.spawn not supported in browser");
        }) as any,
        execSync: (() => {
          throw new Error("child_process.execSync not supported in browser");
        }) as any,
        execFileSync: (() => {
          throw new Error(
            "child_process.execFileSync not supported in browser",
          );
        }) as any,
      },
    };

    // Networking API group (net + tty stubs)
    this.networking = {
      tty: {
        isatty: (() => true) as any,
      },
      net: {
        createConnection: (() => {
          throw new Error("net.createConnection not supported in browser");
        }) as any,
      },
    };

    // Images API group (png + gif stubs)
    this.images = {
      png: {
        PNG: class {
          constructor() {
            throw new Error("PNG not supported in browser");
          }
        } as any,
      },
      gif: {
        GifReader: class {
          constructor() {
            throw new Error("GIF not supported in browser");
          }
        } as any,
      },
    };
  }
}
