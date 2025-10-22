/**
 * Vitest setup file for @unblessed/vrt tests
 * Manually initializes Node.js runtime (avoids circular dependency with @unblessed/node)
 */

import { beforeAll } from 'vitest';
import { initCore } from '@unblessed/core';
import type { Runtime } from '@unblessed/core';
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
import { EventEmitter } from 'events';
import { PNG } from 'pngjs';
import { GifReader } from 'omggif';

// Initialize Node.js runtime manually before all tests
beforeAll(() => {
  const nodeRuntime: Runtime = {
    fs: fs as Runtime['fs'],
    path: path as Runtime['path'],
    process: process as Runtime['process'],
    buffer: { Buffer } as Runtime['buffer'],
    url: url as Runtime['url'],
    utils: {
      util: util,
      stream: { Readable, Writable },
      stringDecoder: { StringDecoder },
      events: { EventEmitter },
    } as Runtime['utils'],

    images: {
      png: { PNG },
      gif: { GifReader },
    } as Runtime['images'],

    processes: {
      childProcess: child_process
    } as Runtime['processes'],

    networking: {
      net: net,
      tty: tty,
    } as Runtime['networking'],
  };

  initCore(nodeRuntime);
});
