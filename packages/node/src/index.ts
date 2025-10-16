/**
 * @tui/node - Node.js runtime adapter for @tui/core
 *
 * This package wraps Node.js APIs and provides them to @tui/core through
 * the Runtime interface. It also exposes a modern, tree-shakeable API.
 */

import type { Runtime } from '@tui/core';
import { setRuntime, Screen } from '@tui/core';
import fs from 'fs';
import path from 'path';
import process from 'process';
import * as child_process from 'child_process';
import tty from 'tty';
import * as url from 'url';
import * as util from 'util';
import net from 'net';
import { Readable, Writable } from 'stream';
import { Buffer } from 'buffer';
import { StringDecoder } from 'string_decoder';
import { PNG } from 'pngjs';
import { GifReader } from 'omggif';

/**
 * Node.js runtime implementation
 * Wraps Node.js fs, path, process, child_process, tty, etc.
 */
export class NodeRuntime implements Runtime {
  fs = fs as Runtime['fs'];
  path = path as Runtime['path'];
  process = process as Runtime['process'];
  childProcess = child_process as Runtime['childProcess'];
  tty = tty as Runtime['tty'];
  url = url as Runtime['url'];
  util = util as Runtime['util'];
  net = net as Runtime['net'];
  stream = { Readable, Writable } as Runtime['stream'];
  buffer = { Buffer } as Runtime['buffer'];
  stringDecoder = { StringDecoder } as Runtime['stringDecoder'];
  png = { PNG } as Runtime['png'];
  gif = { GifReader } as Runtime['gif'];

  constructor() {
    // Runtime is ready to use
  }
}

// Global singleton runtime instance
let nodeRuntime: NodeRuntime | null = null;

/**
 * Get or create the Node.js runtime instance
 */
export function getNodeRuntime(): NodeRuntime {
  if (!nodeRuntime) {
    nodeRuntime = new NodeRuntime();
    setRuntime(nodeRuntime);
  }
  return nodeRuntime;
}

/**
 * Create a screen with Node.js runtime
 * Modern API - clean, TypeScript-first
 */
export function createScreen(options: any = {}): Screen {
  // Ensure runtime is initialized
  getNodeRuntime();

  // Create and return screen
  return new Screen(options);
}

// Re-export all widgets from @tui/core
export * from '@tui/core';
