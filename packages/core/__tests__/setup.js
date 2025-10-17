/**
 * Vitest setup file
 * Initializes the runtime before all tests
 */

import { beforeAll } from 'vitest';
import { initCore } from '../src/runtime-context.js';
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

// Initialize runtime once before all tests
beforeAll(() => {
  initCore({
    // Core APIs (required)
    fs: {
      readFileSync: fs.readFileSync,
      readdirSync: fs.readdirSync,
      existsSync: fs.existsSync,
      statSync: fs.statSync,
      lstatSync: fs.lstatSync,
      readlinkSync: fs.readlinkSync,
      mkdirSync: fs.mkdirSync,
      createWriteStream: fs.createWriteStream,
      readFile: fs.readFile,
      readdir: fs.readdir,
      unlink: fs.unlink,
      writeFile: fs.writeFile,
      stat: fs.stat,
    },
    path: {
      join: path.join,
      resolve: path.resolve,
      dirname: path.dirname,
      basename: path.basename,
      normalize: path.normalize,
      extname: path.extname,
      sep: path.sep,
      delimiter: path.delimiter,
    },
    process: {
      stdin: process.stdin,
      stdout: process.stdout,
      stderr: process.stderr,
      platform: process.platform,
      arch: process.arch,
      env: process.env,
      cwd: process.cwd.bind(process),
      exit: process.exit.bind(process),
      pid: process.pid,
      title: process.title,
      version: process.version,
      on: process.on.bind(process),
      once: process.once.bind(process),
      removeListener: process.removeListener.bind(process),
      removeAllListeners: process.removeAllListeners?.bind(process),
      listeners: process.listeners.bind(process),
      nextTick: process.nextTick.bind(process),
      kill: process.kill.bind(process),
    },
    buffer: {
      Buffer,
    },
    url: {
      parse: url.parse,
      format: url.format,
      fileURLToPath: url.fileURLToPath,
    },
    utils: {
      util: {
        inspect: util.inspect,
        format: util.format,
      },
      stream: {
        Readable,
        Writable,
      },
      stringDecoder: {
        StringDecoder,
      },
    },

    // Optional APIs
    processes: {
      childProcess: {
        spawn: child_process.spawn,
        execSync: child_process.execSync,
        execFileSync: child_process.execFileSync,
      },
    },
    networking: {
      tty: {
        isatty: tty.isatty,
      },
      net: {
        createConnection: net.createConnection,
      },
    },
    images: {
      png: {
        PNG,
      },
      gif: {
        GifReader,
      },
    },
  });
});
