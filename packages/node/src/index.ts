/**
 * @tui/node - Node.js runtime adapter for @tui/core
 *
 * This package provides Node.js-specific implementations and makes it easy
 * to use @tui/core in Node.js environments.
 *
 * ## Usage
 *
 * Simply import widgets and use them - runtime auto-initializes:
 *
 * ```typescript
 * import { Screen, Box } from '@tui/node';
 *
 * const screen = new Screen({ smartCSR: true });
 * const box = new Box({ screen, content: 'Hello!' });
 * screen.render();
 * ```
 */

import type { Runtime } from '@tui/core';
import { initCore } from '@tui/core';
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
 * Node.js runtime implementation (internal)
 * @internal
 */
class NodeRuntime implements Runtime {
  fs = fs as Runtime['fs'];
  path = path as Runtime['path'];
  process = process as Runtime['process'];
  buffer = { Buffer } as Runtime['buffer'];
  url = url as Runtime['url'];
  utils = {
    util: util,
    stream: { Readable, Writable },
    stringDecoder: { StringDecoder },
  } as Runtime['utils'];

  images = {
    png: { PNG },
    gif: { GifReader },
  } as Runtime['images'];

  processes = {
    childProcess: child_process
  } as Runtime['processes'];

  networking = {
    net: net,
    tty: tty,
  } as Runtime['networking'];
}

initCore(new NodeRuntime());

// Re-export all from @tui/core
export * from '@tui/core';
