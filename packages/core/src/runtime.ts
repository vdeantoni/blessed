/**
 * Runtime abstraction layer for @tui/core
 *
 * This module defines the Runtime interface that all platform adapters must implement.
 * It abstracts Node.js-specific APIs so that @tui/core remains platform-agnostic.
 *
 * Platform adapters:
 * - @tui/node: Wraps Node.js fs, path, process, child_process, tty, etc.
 * - @tui/browser: Provides browser polyfills for these APIs
 */

// Type-only imports from @types/node
import type * as fs from 'fs';
import type * as path from 'path';
import type * as child_process from 'child_process';
import type * as tty from 'tty';
import type * as url from 'url';
import type * as util from 'util';
import type * as net from 'net';
import type { StringDecoder } from 'string_decoder';
import type { Readable, Writable } from 'stream';
import type { Buffer } from 'buffer';

/**
 * Complete runtime abstraction interface
 * All @tui/core modules accept this interface for platform operations
 */
export interface Runtime {
  /** File system operations */
  fs: FileSystemAPI;
  /** Path manipulation operations */
  path: PathAPI;
  /** Process operations (stdin/stdout/env/etc) */
  process: ProcessAPI;
  /** Child process spawning */
  childProcess: ChildProcessAPI;
  /** TTY operations */
  tty: TtyAPI;
  /** URL operations */
  url: UrlAPI;
  /** Utility functions (inspect, format, etc) */
  util: UtilAPI;
  net: NetAPI;
  /** String decoder for buffer/string conversion */
  stringDecoder: StringDecoderAPI;
  /** Stream operations (Readable, Writable) */
  stream: StreamAPI;
  /** Buffer operations */
  buffer: BufferAPI;
  /** PNG image library (pngjs) */
  png: PngAPI;
  /** GIF image library (omggif) */
  gif: GifAPI;
}

/**
 * File system operations interface
 * Subset of Node.js fs module needed by blessed
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
 * Subset of Node.js process global
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
export type ReadableType = InstanceType<StreamAPI['Readable']>;

/**
 * Writable type alias for use throughout the codebase
 */
export type WritableType = InstanceType<StreamAPI['Writable']>;

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
export type BufferType = InstanceType<BufferAPI['Buffer']>;

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
        callback?: (error: Error | null, data: any) => void
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
