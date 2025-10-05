/**
 * Test utilities for mocking terminal I/O and screen buffers
 */

import { EventEmitter } from 'events';
import { vi } from 'vitest';

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