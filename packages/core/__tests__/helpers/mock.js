/**
 * Test utilities for mocking terminal I/O and screen buffers
 */

import { EventEmitter } from 'events';
import { vi } from 'vitest';
import { setRuntime, getRuntime, _clearRuntime } from '../../src/runtime-context.js';
import { clearEnvCache } from '../../src/lib/runtime-helpers.js';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { StringDecoder } from 'string_decoder';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Readable, Writable } from 'stream';
import { Buffer } from 'buffer';
import { PNG } from 'pngjs';
import { GifReader } from 'omggif';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Create a mock environment with clean defaults
 */
function createMockEnv() {
  return {
    // Basic environment - no terminal detection variables
    HOME: process.env.HOME || '/home/test',
    USER: process.env.USER || 'test',
    PATH: process.env.PATH || '/usr/bin:/bin',
    TERM: 'xterm-256color',  // Default to standard xterm
    // Explicitly unset terminal detection variables
    TERM_PROGRAM: undefined,
    ITERM_SESSION_ID: undefined,
    VTE_VERSION: undefined,
    COLORTERM: undefined,
    TERMINATOR_UUID: undefined,
    TMUX: undefined,
    COLUMNS: undefined,
    LINES: undefined,
  };
}

/**
 * Create a mock runtime for testing
 */
function createMockRuntime(options = {}) {
  const mockEnv = options.env || createMockEnv();

  return {
    // Core APIs (always required)
    fs: {
      readFileSync: fs.readFileSync,
      readdirSync: fs.readdirSync,
      existsSync: fs.existsSync,
      statSync: fs.statSync,
      lstatSync: fs.lstatSync,
      mkdirSync: fs.mkdirSync,
      createWriteStream: fs.createWriteStream,
      readFile: fs.readFile,
      readdir: fs.readdir,
    },
    path: {
      join: path.join,
      resolve: path.resolve,
      dirname: path.dirname,
      basename: path.basename,
      extname: path.extname,
      normalize: path.normalize,
      sep: path.sep,
    },
    process: {
      platform: process.platform,
      env: mockEnv,  // Use mock environment
      cwd: vi.fn(() => path.resolve(__dirname, '../..')),
      exit: vi.fn(),
      stdin: process.stdin,
      stdout: process.stdout,
      stderr: process.stderr,
      nextTick: vi.fn((callback) => {
        // Use setImmediate for mock nextTick
        if (typeof setImmediate !== 'undefined') {
          setImmediate(callback);
        } else {
          setTimeout(callback, 0);
        }
      }),
    },
    buffer: {
      Buffer,
    },
    url: {
      fileURLToPath: vi.fn((url) => {
        // Return path to core/src for proper font resolution
        if (typeof url === 'string' && url.includes('runtime-helpers')) {
          return path.join(__dirname, '../../src/lib/runtime-helpers.js');
        }
        return path.join(__dirname, '../..');
      }),
    },
    utils: {
      util: {
        inspect: vi.fn((obj) => JSON.stringify(obj)),
        format: vi.fn((...args) => {
          // Implement basic util.format behavior
          if (args.length === 0) return '';
          let str = String(args[0]);
          let i = 1;
          str = str.replace(/%[sdifjoO%]/g, (match) => {
            if (i >= args.length) return match;
            if (match === '%%') return '%';
            const arg = args[i++];
            switch (match) {
              case '%s': return String(arg);
              case '%d': return Number(arg);
              case '%i': return parseInt(arg);
              case '%f': return parseFloat(arg);
              case '%j': return JSON.stringify(arg);
              case '%o':
              case '%O': return JSON.stringify(arg);
              default: return match;
            }
          });
          // Append remaining arguments
          while (i < args.length) {
            str += ' ' + args[i++];
          }
          return str;
        }),
      },
      stringDecoder: {
        StringDecoder,
      },
      stream: {
        Readable,
        Writable,
      },
    },

    // Optional API groups
    processes: {
      childProcess: {
        spawn: vi.fn(),
        exec: vi.fn(),
        execSync: vi.fn(),
      },
    },
    networking: {
      tty: {
        isatty: vi.fn(() => true),
      },
      net: {
        Socket: vi.fn(),
        createConnection: vi.fn(),
      },
    },
    images: {
      png: {
        PNG,  // Use real PNG library for tests
      },
      gif: {
        GifReader,  // Use real GifReader for tests
      },
    },
  };
}

/**
 * Initialize runtime for tests
 * Call this before creating any widgets
 */
export function initTestRuntime(options = {}) {
  _clearRuntime();
  clearEnvCache(); // Clear env cache to allow tests to set env vars
  const runtime = createMockRuntime(options);
  setRuntime(runtime);
  return runtime;
}

/**
 * Helper to get the current runtime's environment
 * Use this to modify environment variables in tests
 */
export function getTestEnv() {
  const runtime = getRuntime();
  return runtime.process.env;
}

/**
 * Helper to set environment variable in the test runtime
 */
export function setTestEnv(key, value) {
  const runtime = getRuntime();
  if (value === undefined) {
    delete runtime.process.env[key];
  } else {
    runtime.process.env[key] = value;
  }
  clearEnvCache(); // Clear cache so changes take effect
}

/**
 * Reset the runtime environment to clean defaults
 * Useful for tests that need to isolate environment variables
 */
export function resetTestEnvironment() {
  const runtime = createMockRuntime();
  setRuntime(runtime);
  clearEnvCache();
  return runtime;
}

/**
 * Create a mock program for testing widgets without real terminal I/O
 */
export function createMockProgram(options = {}) {
  const program = new EventEmitter();

  program.cols = options.cols || 80;
  program.rows = options.rows || 24;
  program.output = {
    isTTY: true,
    columns: program.cols,
    rows: program.rows,
    write: vi.fn(),
    on: vi.fn(),
    once: vi.fn(),
    emit: vi.fn(),
    setRawMode: vi.fn(),
  };

  program.input = {
    isTTY: true,
    isRaw: false,
    on: vi.fn(),
    once: vi.fn(),
    emit: vi.fn(),
    setRawMode: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
  };

  program.useBuffer = true;
  program.zero = true;
  program.x = 0;
  program.y = 0;

  // Mock tput
  program.tput = {
    features: {
      unicode: options.unicode !== false,
    },
    unicode: options.unicode !== false,
    numbers: {
      colors: 256,
      pairs: 32767,
      U8: 1,
    },
    strings: {},
    bools: {},
    padding: false,
    extended: false,
    printf: vi.fn(),
    write: vi.fn(),
    echo: vi.fn(),
    setx: vi.fn(),
    setaf: vi.fn(),
    setab: vi.fn(),
    sgr: vi.fn(),
    setupCursor: vi.fn(),
  };

  program.setupTput = vi.fn();
  program.setx = vi.fn();
  program.cup = vi.fn();
  program.cursorPos = vi.fn();
  program.showCursor = vi.fn();
  program.hideCursor = vi.fn();
  program.normalBuffer = vi.fn();
  program.alternateBuffer = vi.fn();
  program.clear = vi.fn();
  program.write = vi.fn();
  program.flush = vi.fn();
  program.term = vi.fn().mockReturnValue('xterm-256color');

  // Mock positioning methods
  program.move = vi.fn();
  program.omove = vi.fn();
  program.rsetx = vi.fn();
  program.rmove = vi.fn();

  // Mock attributes
  program.attr = vi.fn();
  program._attr = vi.fn((param) => {
    // Basic mock of _attr for tags parsing
    if (typeof param === 'string') {
      // Return some mock attribute code
      return '\x1b[0m'; // reset
    }
    return null;
  });
  program.fg = vi.fn();
  program.bg = vi.fn();

  // Mock cursor methods
  program.cup = vi.fn();
  program.cuf = vi.fn(); // Cursor forward
  program.cub = vi.fn(); // Cursor backward
  program.cud = vi.fn(); // Cursor down
  program.cuu = vi.fn(); // Cursor up
  program.lsaveCursor = vi.fn();
  program.lrestoreCursor = vi.fn();

  // Mock terminal capabilities
  program.enableMouse = vi.fn();
  program.disableMouse = vi.fn();
  program.setMouse = vi.fn();

  return program;
}

/**
 * Create a mock screen for testing widgets
 */
export function createMockScreen(options = {}) {
  // Initialize runtime if not already done
  if (!options.skipRuntimeInit) {
    initTestRuntime();
  }

  const program = options.program || createMockProgram(options);

  const screen = new EventEmitter();

  screen.program = program;
  screen.tput = program.tput;
  screen.type = 'screen'; // Needed for detached check
  screen.detached = false; // Screen is never detached

  screen.width = options.width || program.cols || 80;
  screen.height = options.height || program.rows || 24;
  screen.cols = screen.width;
  screen.rows = screen.height;

  screen.left = 0;
  screen.right = 0;
  screen.top = 0;
  screen.bottom = 0;
  screen.aleft = 0;
  screen.aright = 0;
  screen.atop = 0;
  screen.abottom = 0;
  screen.rleft = 0;
  screen.rright = 0;
  screen.rtop = 0;
  screen.rbottom = 0;

  screen.position = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    get height() { return screen.height; },
    get width() { return screen.width; }
  };

  screen.ileft = 0;
  screen.itop = 0;
  screen.iright = 0;
  screen.ibottom = 0;
  screen.iheight = screen.height;
  screen.iwidth = screen.width;

  screen.autoPadding = options.autoPadding !== false;
  screen.tabc = '    '; // 4 spaces for tab
  screen.dockBorders = options.dockBorders || false;
  screen.ignoreLocked = options.ignoreLocked || [];
  screen.fullUnicode = options.fullUnicode || false;
  screen._unicode = program.tput.unicode;
  screen._borderStops = {};

  screen.dattr = ((0 << 18) | (0x1ff << 9)) | 0x1ff;
  screen.renders = 0;
  screen.tput = program.tput;

  screen.children = [];
  screen.parent = null;
  screen.focused = null;
  screen.clickable = [];
  screen.keyable = [];
  screen.grabKeys = false;
  screen.lockKeys = false;
  screen.hover = null;
  screen.history = [];
  screen.cleanSides = vi.fn();

  // Mock _getPos for positioning calculations
  screen._getPos = vi.fn(function() {
    return {
      xi: this.left || 0,
      xl: this.width,
      yi: this.top || 0,
      yl: this.height,
      aleft: this.left || 0,
      aright: 0,
      atop: this.top || 0,
      abottom: 0,
      width: this.width,
      height: this.height
    };
  });

  // Screen buffer
  screen.lines = [];
  for (let i = 0; i < screen.height; i++) {
    screen.lines[i] = [];
    for (let j = 0; j < screen.width; j++) {
      screen.lines[i][j] = [screen.dattr, ' '];
    }
  }

  screen.olines = [];
  for (let i = 0; i < screen.height; i++) {
    screen.olines[i] = [];
    for (let j = 0; j < screen.width; j++) {
      screen.olines[i][j] = [screen.dattr, ' '];
    }
  }

  // Mock methods
  screen.append = vi.fn(function(element) {
    element.parent = this;
    element.screen = this;
    element.detached = false; // Mark element as attached
    this.children.push(element);

    // Add focus() method to elements if they don't have one
    if (!element.focus) {
      element.focus = function() {
        this.screen.focused = this;
      };
    }

    // Recursively mark all descendants as attached
    function markAttached(el) {
      el.detached = false;
      if (el.children) {
        el.children.forEach(markAttached);
      }
    }
    markAttached(element);
    return element;
  });

  screen.remove = vi.fn(function(element) {
    const index = this.children.indexOf(element);
    if (index !== -1) {
      this.children.splice(index, 1);
      element.parent = null;
    }
  });

  screen.render = vi.fn();
  screen.draw = vi.fn();
  screen.clearRegion = vi.fn();
  screen.fillRegion = vi.fn();
  screen.focusNext = vi.fn();
  screen.focusPrevious = vi.fn();
  screen.focusPush = vi.fn();
  screen.focusPop = vi.fn();
  screen.saveFocus = vi.fn();
  screen.restoreFocus = vi.fn();
  screen.rewindFocus = vi.fn();
  screen.key = vi.fn();
  screen.onceKey = vi.fn();
  screen.unkey = vi.fn();
  screen.spawn = vi.fn();
  screen.exec = vi.fn();
  screen.readEditor = vi.fn();
  screen.setEffects = vi.fn();
  screen.insertLine = vi.fn();
  screen.deleteLine = vi.fn();
  screen.insertBottom = vi.fn();
  screen.insertTop = vi.fn();
  screen.deleteBottom = vi.fn();
  screen.deleteTop = vi.fn();
  screen.log = vi.fn();
  screen.debug = vi.fn();
  screen._listenMouse = vi.fn();
  screen._listenKeys = vi.fn();
  screen.destroy = vi.fn();
  screen.free = vi.fn();

  return screen;
}

/**
 * Get text content from screen buffer at a specific position
 */
export function getScreenText(screen, x, y, width) {
  if (y < 0 || y >= screen.lines.length) return '';
  const line = screen.lines[y];
  let text = '';
  for (let i = x; i < x + width && i < line.length; i++) {
    text += line[i][1];
  }
  return text;
}

/**
 * Get entire line of text from screen buffer
 */
export function getScreenLine(screen, y) {
  if (y < 0 || y >= screen.lines.length) return '';
  return screen.lines[y].map(cell => cell[1]).join('');
}

/**
 * Helper to create a basic element for testing
 */
export function createElement(ElementClass, options = {}) {
  const screen = options.screen || createMockScreen();
  const element = new ElementClass({
    screen,
    ...options
  });
  return element;
}