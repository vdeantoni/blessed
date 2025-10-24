/**
 * Runtime abstraction layer for @unblessed/core
 *
 * @remarks
 * The Runtime interface provides platform-specific APIs through dependency injection.
 * This allows unblessed to work across different platforms (Node.js, browsers, Deno, etc.)
 * by abstracting platform-specific operations behind a common interface.
 *
 * **Key Concepts**:
 * - **Runtime Interface**: Defines what platforms must provide
 * - **Runtime Context**: Global singleton holding the current runtime
 * - **Platform Implementations**: Node.js runtime, browser runtime, etc.
 * - **Dependency Injection**: Core code uses runtime instead of direct imports
 *
 * **Platform adapters**:
 * - `@unblessed/node`: Wraps real Node.js APIs (fs, path, process, child_process, tty, etc.)
 * - `@unblessed/browser`: Provides browser polyfills and virtual filesystem
 * - Tests: Uses real Node.js APIs for testing
 *
 * @example Using runtime in code
 * ```typescript
 * import { getRuntime } from '@unblessed/core/runtime-context';
 *
 * function loadTerminfo(term: string): Buffer {
 *   const runtime = getRuntime();
 *
 *   // Use runtime.fs instead of import fs
 *   const path = runtime.path.join('/usr/share/terminfo', term[0], term);
 *
 *   if (!runtime.fs.existsSync(path)) {
 *     throw new Error(`Terminfo not found: ${term}`);
 *   }
 *
 *   return runtime.fs.readFileSync(path);
 * }
 * ```
 *
 * @example Feature detection for optional APIs
 * ```typescript
 * import { getRuntime, hasImageSupport } from '@unblessed/core';
 *
 * function canRenderImages(): boolean {
 *   const runtime = getRuntime();
 *   return runtime.images !== undefined;
 * }
 *
 * function parseImage(buffer: Buffer) {
 *   const runtime = getRuntime();
 *
 *   if (!runtime.images) {
 *     throw new Error('Image support not available');
 *   }
 *
 *   const png = runtime.images.png.PNG.sync.read(buffer);
 *   return png;
 * }
 * ```
 *
 * @example Type-safe feature detection
 * ```typescript
 * const runtime = getRuntime();
 *
 * if (hasImageSupport(runtime)) {
 *   // TypeScript knows runtime.images exists here!
 *   const png = runtime.images.png.PNG.sync.read(buffer);
 * }
 * ```
 *
 * @example Platform detection
 * ```typescript
 * import { getRuntime } from '@unblessed/core/runtime-context';
 *
 * const runtime = getRuntime();
 *
 * if (runtime.process.platform === 'browser') {
 *   console.log('Running in browser');
 * } else {
 *   console.log('Running in Node.js');
 * }
 * ```
 *
 * @see {@link getRuntime} for accessing the current runtime
 * @see {@link setRuntime} for platform initialization
 */

// Type-only imports from @types/node
import type * as fs from "fs";
import type * as path from "path";
import type * as child_process from "child_process";
import type * as tty from "tty";
import type * as url from "url";
import type * as util from "util";
import type * as net from "net";
import type { StringDecoder } from "string_decoder";
import type { Readable, Writable } from "stream";
import type { Buffer } from "buffer";
import type EventEmitter from "events";

/**
 * Complete runtime abstraction interface
 * All @unblessed/core modules accept this interface for platform operations
 *
 * Core APIs (always required):
 * - fs, path, process, buffer, url, utils
 *
 * Optional APIs (use feature detection):
 * - images: PNG/GIF rendering (only needed by Image widgets)
 * - processes: Child process spawning (Terminal widget, image tools)
 * - networking: Network and TTY operations (GPM mouse - very rare)
 */
export interface Runtime {
  // ============================================================
  // CORE APIs (Always Required)
  // ============================================================

  /** File system operations */
  fs: FileSystemAPI;
  /** Path manipulation operations */
  path: PathAPI;
  /** Process operations (stdin/stdout/env/etc) */
  process: ProcessAPI;
  /** Buffer operations */
  buffer: BufferAPI;
  /** URL operations (fileURLToPath for module resolution) */
  url: UrlAPI;
  /** Utility functions and streams */
  utils: UtilsAPI;

  // ============================================================
  // OPTIONAL APIs (Feature Detection)
  // ============================================================

  /** Image processing (PNG/GIF rendering) - Optional */
  images?: ImageAPI;
  /** Process spawning - Optional */
  processes?: ProcessesAPI;
  /** Networking and TTY operations - Optional */
  networking?: NetworkingAPI;
}

/**
 * File system operations interface
 *
 * @remarks
 * Subset of Node.js fs module needed by unblessed for:
 * - Reading terminfo/termcap files
 * - Loading font definitions
 * - Logging and debugging
 * - Temporary file operations
 *
 * @example Reading terminfo files
 * ```typescript
 * const runtime = getRuntime();
 * const data = runtime.fs.readFileSync('/usr/share/terminfo/x/xterm');
 * ```
 *
 * @example Checking file existence
 * ```typescript
 * const runtime = getRuntime();
 * if (runtime.fs.existsSync('/path/to/file')) {
 *   const content = runtime.fs.readFileSync('/path/to/file', 'utf8');
 * }
 * ```
 */
export interface FileSystemAPI {
  readFileSync: typeof fs.readFileSync;
  readdirSync: typeof fs.readdirSync;
  existsSync: typeof fs.existsSync;
  statSync: typeof fs.statSync;
  mkdirSync: typeof fs.mkdirSync;
  createWriteStream: typeof fs.createWriteStream;
  readFile: typeof fs.readFile;
  unlink: typeof fs.unlink;
  writeFile: typeof fs.writeFile;
  stat: typeof fs.stat;
  readdir: typeof fs.readdir;
  lstatSync: typeof fs.lstatSync;
  readlinkSync: typeof fs.readlinkSync;
}

/**
 * Path manipulation interface
 * Subset of Node.js path module
 */
export interface PathAPI {
  join: typeof path.join;
  resolve: typeof path.resolve;
  dirname: typeof path.dirname;
  basename: typeof path.basename;
  normalize: typeof path.normalize;
  extname: typeof path.extname;
  sep: typeof path.sep;
  delimiter: typeof path.delimiter;
}

/**
 * Process operations interface
 *
 * @remarks
 * Subset of Node.js process global used for:
 * - I/O streams (stdin/stdout/stderr)
 * - Environment variables (TERM, EDITOR, HOME, etc.)
 * - Process events (exit, SIGTSTP, etc.)
 * - Platform detection (platform, arch)
 *
 * @example Accessing I/O streams
 * ```typescript
 * const runtime = getRuntime();
 * const { Readable, Writable } = runtime.utils.stream;
 *
 * const readable = new Readable();
 * readable.push('Hello\n');
 * readable.push(null);
 * readable.pipe(runtime.process.stdout);
 * ```
 *
 * @example Environment variables
 * ```typescript
 * const runtime = getRuntime();
 * const term = runtime.process.env.TERM || 'xterm-256color';
 * const editor = runtime.process.env.EDITOR || 'vi';
 * const home = runtime.process.env.HOME || '/';
 * ```
 */
export interface ProcessAPI {
  stdin: NodeJS.ReadStream & { fd: 0 };
  stdout: NodeJS.WriteStream & { fd: 1 };
  stderr: NodeJS.WriteStream & { fd: 2 };
  platform: NodeJS.Platform;
  arch: NodeJS.Architecture;
  env: NodeJS.ProcessEnv;
  cwd: () => string;
  exit: (code?: number) => never;
  pid: number;
  title: string;
  version: string;
  on: (event: string, listener: (...args: any[]) => void) => any;
  once: (event: string, listener: (...args: any[]) => void) => any;
  removeListener: (event: string, listener: (...args: any[]) => void) => any;
  listeners: (event: string) => Function[];
  nextTick: (callback: Function, ...args: any[]) => void;
  kill: (pid: number, signal?: string | number) => boolean;
}

/**
 * Child process operations interface
 * Subset of Node.js child_process module
 */
export interface ChildProcessAPI {
  spawn: typeof child_process.spawn;
  execSync: typeof child_process.execSync;
  execFileSync: typeof child_process.execFileSync;
}

/**
 * TTY operations interface
 * Subset of Node.js tty module
 */
export interface TtyAPI {
  isatty: typeof tty.isatty;
}

/**
 * URL operations interface
 * Subset of Node.js url module
 */
export interface UrlAPI {
  parse: typeof url.parse;
  format: typeof url.format;
  fileURLToPath: typeof url.fileURLToPath;
}

/**
 * Utility functions interface
 * Subset of Node.js util module
 */
export interface UtilAPI {
  inspect: typeof util.inspect;
  format: typeof util.format;
}

export interface NetAPI {
  createConnection: typeof net.createConnection;
}

/**
 * String decoder interface
 * Subset of Node.js string_decoder module
 */
export interface StringDecoderAPI {
  StringDecoder: typeof StringDecoder;
}

/**
 * Stream operations interface
 * Subset of Node.js stream module
 */
export interface StreamAPI {
  Readable: typeof Readable;
  Writable: typeof Writable;
}

/**
 * Readable type alias for use throughout the codebase
 */
export type ReadableType = InstanceType<StreamAPI["Readable"]>;

/**
 * Writable type alias for use throughout the codebase
 */
export type WritableType = InstanceType<StreamAPI["Writable"]>;

export interface EventsAPI {
  EventEmitter: typeof EventEmitter;
}

/**
 * EventEmitter type alias for use throughout the codebase
 */
export interface EventEmitterType
  extends InstanceType<EventsAPI["EventEmitter"]> {}

/**
 * Buffer operations interface
 * Subset of Node.js buffer module
 */
export interface BufferAPI {
  Buffer: typeof Buffer;
}

/**
 * Buffer type alias for use throughout the codebase
 */
export type BufferType = InstanceType<BufferAPI["Buffer"]>;

/**
 * PNG image library interface (pngjs)
 */
export interface PngAPI {
  PNG: {
    new (options?: any): {
      width: number;
      height: number;
      data: BufferType;
      gamma: number;
      parse(
        data: BufferType,
        callback?: (error: Error | null, data: any) => void,
      ): any;
      pack(): any;
      on(event: string, callback: (...args: any[]) => void): any;
    };
    sync: {
      read(data: BufferType): {
        width: number;
        height: number;
        data: BufferType;
        gamma: number;
      };
    };
  };
}

/**
 * GIF image library interface (omggif)
 */
export interface GifAPI {
  GifReader: new (buffer: BufferType) => {
    width: number;
    height: number;
    numFrames(): number;
    loopCount(): number;
    frameInfo(frameNum: number): {
      x: number;
      y: number;
      width: number;
      height: number;
      has_local_palette: boolean;
      palette_offset: number;
      palette_size: number;
      data_offset: number;
      data_length: number;
      transparent_index: number;
      interlaced: boolean;
      delay: number;
      disposal: number;
    };
    decodeAndBlitFrameRGBA(frameNum: number, pixels: Uint8Array): void;
  };
}

/**
 * Create a runtime context from individual APIs
 * Helper for constructing Runtime implementations
 */
export function createRuntime(options: Runtime): Runtime {
  return options;
}

// ============================================================
// Grouped Optional APIs
// ============================================================

/**
 * Image processing API group (optional)
 * Combines PNG and GIF libraries for image rendering
 */
export interface ImageAPI {
  /** PNG image library (pngjs) */
  png: PngAPI;
  /** GIF image library (omggif) */
  gif: GifAPI;
}

/**
 * Process spawning API group (optional)
 * Child process operations for specialized widgets
 */
export interface ProcessesAPI {
  /** Child process spawning */
  childProcess: ChildProcessAPI;
}

/**
 * Networking API group (optional)
 * Network connections and TTY operations
 */
export interface NetworkingAPI {
  /** Network socket operations */
  net: NetAPI;
  /** TTY operations */
  tty: TtyAPI;
}

/**
 * Utilities API group (optional)
 * Utility functions, streams, and string decoding
 */
export interface UtilsAPI {
  /** Utility functions (inspect, format) */
  util: UtilAPI;
  /** Stream operations (Readable, Writable) */
  stream: StreamAPI;
  /** String decoder for buffer/string conversion */
  stringDecoder: StringDecoderAPI;
  /** Event emitter for event-driven programming */
  events: EventsAPI;
}

// ============================================================
// Backward Compatibility Helpers
// ============================================================

/**
 * Check if runtime has image processing support
 *
 * @remarks
 * Type guard to check if the current runtime supports PNG/GIF rendering.
 * Use this before accessing `runtime.images` to avoid runtime errors.
 *
 * @param runtime - Runtime instance to check
 * @returns True if image support is available
 *
 * @example Type-safe feature detection
 * ```typescript
 * const runtime = getRuntime();
 *
 * if (hasImageSupport(runtime)) {
 *   // TypeScript knows runtime.images exists here!
 *   const png = runtime.images.png.PNG.sync.read(buffer);
 * }
 * ```
 */
export function hasImageSupport(
  runtime: Runtime,
): runtime is Runtime & { images: ImageAPI } {
  return runtime.images !== undefined;
}

/**
 * Check if runtime has process spawning support
 *
 * @remarks
 * Type guard to check if the current runtime can spawn child processes.
 * Needed for Terminal widget, text editors (vi, nano), and image tools.
 *
 * @param runtime - Runtime instance to check
 * @returns True if process support is available
 *
 * @example Conditional feature usage
 * ```typescript
 * const runtime = getRuntime();
 *
 * if (hasProcessSupport(runtime)) {
 *   // TypeScript knows runtime.processes exists
 *   const proc = runtime.processes.childProcess.spawn('vi', ['file.txt']);
 * } else {
 *   console.warn('Cannot spawn processes in this environment');
 * }
 * ```
 */
export function hasProcessSupport(
  runtime: Runtime,
): runtime is Runtime & { processes: ProcessesAPI } {
  return runtime.processes !== undefined;
}

/**
 * Check if runtime has networking support
 *
 * @remarks
 * Type guard for network and TTY operations. Currently only used for
 * GPM mouse protocol on Linux console (very rare).
 *
 * @param runtime - Runtime instance to check
 * @returns True if networking support is available
 */
export function hasNetworkSupport(
  runtime: Runtime,
): runtime is Runtime & { networking: NetworkingAPI } {
  return runtime.networking !== undefined;
}

/**
 * Check if runtime has utility functions
 *
 * @remarks
 * Type guard for util, stream, and string decoder operations.
 *
 * @param runtime - Runtime instance to check
 * @returns True if utils support is available
 */
export function hasUtilsSupport(
  runtime: Runtime,
): runtime is Runtime & { utils: UtilsAPI } {
  return runtime.utils !== undefined;
}
