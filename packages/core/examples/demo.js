#!/usr/bin/env node

/**
 * @tui/core Demo Application
 *
 * A creative demo showcasing various widgets and features:
 * - Multiple panel layouts
 * - Real-time updates
 * - Interactive widgets
 * - Mouse and keyboard handling
 * - Colors and styling
 * - Progress animations
 *
 * To run: node examples/demo.js
 */

import { Screen, Box, List, Log, ProgressBar, Text, Table, Button, Input, Form, Layout, setRuntime } from '../dist/index.js';
import { createReadStream, createWriteStream, readFileSync, readdirSync, existsSync, statSync, mkdirSync, readFile, unlink, writeFile, stat, readdir, lstatSync, readlinkSync } from 'fs';
import { join, resolve, dirname, basename, normalize, extname, sep, delimiter } from 'path';
import { spawn, execSync, execFileSync } from 'child_process';
import { isatty } from 'tty';
import { parse as urlParse, format as urlFormat, fileURLToPath } from 'url';
import { inspect, format } from 'util';
import { createConnection } from 'net';
import { StringDecoder } from 'string_decoder';
import { Readable, Writable } from 'stream';
import { Buffer } from 'buffer';
import { PNG } from 'pngjs';
import { GifReader } from 'omggif';

// Initialize Node.js runtime for @tui/core
setRuntime({
  fs: {
    readFileSync,
    readdirSync,
    existsSync,
    statSync,
    mkdirSync,
    createWriteStream,
    readFile,
    unlink,
    writeFile,
    stat,
    readdir,
    lstatSync,
    readlinkSync
  },
  path: {
    join,
    resolve,
    dirname,
    basename,
    normalize,
    extname,
    sep,
    delimiter
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
    nextTick: process.nextTick.bind(process),
    kill: process.kill.bind(process)
  },
  childProcess: {
    spawn,
    execSync,
    execFileSync
  },
  tty: {
    isatty
  },
  url: {
    parse: urlParse,
    format: urlFormat,
    fileURLToPath
  },
  util: {
    inspect,
    format
  },
  net: {
    createConnection
  },
  stringDecoder: {
    StringDecoder
  },
  stream: {
    Readable,
    Writable
  },
  buffer: {
    Buffer
  },
  png: {
    PNG
  },
  gif: {
    GifReader
  }
});

// Create the main screen
const screen = new Screen({
  smartCSR: true,
  title: '@tui/core Demo - Press ESC or q to exit',
  fullUnicode: true,
  dockBorders: true
});

// Header bar
const header = new Box({
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: 3,
  content: '{center}{bold}🎨 @tui/core Interactive Demo 🎨{/bold}{/center}',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue',
    bold: true
  }
});

// Footer with instructions
const footer = new Box({
  parent: screen,
  bottom: 0,
  left: 0,
  width: '100%',
  height: 3,
  content: '{center}Arrow Keys: Navigate | Enter: Select | Tab: Next Widget | ESC/q: Quit{/center}',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue'
  }
});

// Left panel - Interactive list
const leftPanel = new Box({
  parent: screen,
  top: 3,
  left: 0,
  width: '33%',
  bottom: 3,
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: 'cyan'
    }
  },
  label: ' 📋 Widget Gallery '
});

const widgetList = new List({
  parent: leftPanel,
  top: 0,
  left: 0,
  width: '100%-2',
  height: '50%-1',
  keys: true,
  mouse: true,
  vi: true,
  items: [
    '🎨 Colorful Box',
    '📊 Progress Bar',
    '📝 Text Editor',
    '🔘 Buttons',
    '📋 Table View',
    '🌈 Color Palette',
    '⚡ Animated Spinner',
    '🎯 Focus Demo'
  ],
  style: {
    selected: {
      bg: 'blue',
      fg: 'white',
      bold: true
    },
    item: {
      fg: 'white'
    }
  },
  border: {
    type: 'line'
  },
  label: ' Select Demo '
});

// Status box showing current selection
const statusBox = new Box({
  parent: leftPanel,
  top: '50%',
  left: 0,
  width: '100%-2',
  height: '50%-1',
  border: {
    type: 'line'
  },
  label: ' 📊 Stats ',
  content: 'Selected: None\nMouse: (0, 0)\nUpdates: 0',
  tags: true
});

// Middle panel - Dynamic content area
const middlePanel = new Box({
  parent: screen,
  top: 3,
  left: '33%',
  width: '34%',
  bottom: 3,
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: 'yellow'
    }
  },
  label: ' 🎪 Demo Area '
});

// Right panel - Log viewer
const rightPanel = new Box({
  parent: screen,
  top: 3,
  left: '67%',
  width: '33%',
  bottom: 3,
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: 'green'
    }
  },
  label: ' 📜 Activity Log '
});

const logBox = new Log({
  parent: rightPanel,
  top: 0,
  left: 0,
  width: '100%-2',
  height: '100%-2',
  tags: true,
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    ch: '█',
    style: {
      fg: 'green'
    }
  }
});

// Dynamic content containers (hidden by default)
let currentDemo = null;

// Demo 1: Colorful Box
function showColorfulBox() {
  clearMiddlePanel();

  const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
  let colorIndex = 0;

  currentDemo = new Box({
    parent: middlePanel,
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%',
    content: '{center}{bold}🌈 Rainbow Box 🌈{/bold}\n\nColors cycle every second!\n\nWatch the border change...{/center}',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: colors[0]
      },
      bg: 'black'
    }
  });

  const interval = setInterval(() => {
    colorIndex = (colorIndex + 1) % colors.length;
    currentDemo.style.border.fg = colors[colorIndex];
    screen.render();
  }, 1000);

  currentDemo.on('destroy', () => clearInterval(interval));

  logBox.add('{yellow-fg}Colorful Box demo started{/yellow-fg}');
  screen.render();
}

// Demo 2: Progress Bar
function showProgressBar() {
  clearMiddlePanel();

  const container = new Box({
    parent: middlePanel,
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%',
    content: '',
    tags: true
  });

  const title = new Text({
    parent: container,
    top: 2,
    left: 'center',
    content: '{bold}⚡ Loading Progress ⚡{/bold}',
    tags: true
  });

  const progressBar = new ProgressBar({
    parent: container,
    top: 5,
    left: 2,
    width: '100%-4',
    height: 3,
    border: {
      type: 'line'
    },
    style: {
      bar: {
        bg: 'green'
      },
      border: {
        fg: 'blue'
      }
    },
    filled: 0
  });

  const percentText = new Text({
    parent: container,
    top: 9,
    left: 'center',
    content: '0%',
    tags: true
  });

  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    if (progress > 100) progress = 0;

    progressBar.setProgress(progress);
    percentText.setContent(`{bold}${progress}%{/bold}`);
    screen.render();
  }, 100);

  currentDemo = container;
  container.on('destroy', () => clearInterval(interval));

  logBox.add('{green-fg}Progress bar demo started{/green-fg}');
  screen.render();
}

// Demo 3: Text Editor
function showTextEditor() {
  clearMiddlePanel();

  const form = new Form({
    parent: middlePanel,
    top: 1,
    left: 1,
    width: '100%-2',
    height: '100%-2',
    keys: true,
    vi: true
  });

  const label = new Text({
    parent: form,
    top: 0,
    left: 0,
    content: '{bold}✍️  Type something:{/bold}',
    tags: true
  });

  const input = new Input({
    parent: form,
    top: 2,
    left: 0,
    width: '100%',
    height: 3,
    border: {
      type: 'line'
    },
    style: {
      focus: {
        border: {
          fg: 'green'
        }
      }
    },
    inputOnFocus: true
  });

  const output = new Box({
    parent: form,
    top: 6,
    left: 0,
    width: '100%',
    height: '100%-7',
    border: {
      type: 'line'
    },
    label: ' Preview ',
    content: '{center}(your text will appear here){/center}',
    tags: true,
    scrollable: true
  });

  input.on('submit', (value) => {
    output.setContent(`{bold}You typed:{/bold}\n\n${value}`);
    logBox.add(`{cyan-fg}Input: ${value}{/cyan-fg}`);
    screen.render();
  });

  input.focus();
  currentDemo = form;

  logBox.add('{blue-fg}Text editor demo started{/blue-fg}');
  screen.render();
}

// Demo 4: Buttons
function showButtons() {
  clearMiddlePanel();

  const container = new Box({
    parent: middlePanel,
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%'
  });

  let counter = 0;

  const counterDisplay = new Box({
    parent: container,
    top: 2,
    left: 'center',
    width: 30,
    height: 5,
    content: `{center}{bold}Counter: ${counter}{/bold}{/center}`,
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'cyan'
      }
    }
  });

  const incrementBtn = new Button({
    parent: container,
    top: 9,
    left: 5,
    width: 15,
    height: 3,
    content: '{center}➕ Add{/center}',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      focus: {
        bg: 'green',
        fg: 'black'
      },
      hover: {
        bg: 'green'
      }
    },
    mouse: true
  });

  const decrementBtn = new Button({
    parent: container,
    top: 9,
    left: 22,
    width: 15,
    height: 3,
    content: '{center}➖ Sub{/center}',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      focus: {
        bg: 'red',
        fg: 'black'
      },
      hover: {
        bg: 'red'
      }
    },
    mouse: true
  });

  const resetBtn = new Button({
    parent: container,
    top: 9,
    right: 5,
    width: 15,
    height: 3,
    content: '{center}🔄 Reset{/center}',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      focus: {
        bg: 'yellow',
        fg: 'black'
      },
      hover: {
        bg: 'yellow'
      }
    },
    mouse: true
  });

  incrementBtn.on('press', () => {
    counter++;
    counterDisplay.setContent(`{center}{bold}Counter: ${counter}{/bold}{/center}`);
    logBox.add(`{green-fg}Counter increased to ${counter}{/green-fg}`);
    screen.render();
  });

  decrementBtn.on('press', () => {
    counter--;
    counterDisplay.setContent(`{center}{bold}Counter: ${counter}{/bold}{/center}`);
    logBox.add(`{red-fg}Counter decreased to ${counter}{/red-fg}`);
    screen.render();
  });

  resetBtn.on('press', () => {
    counter = 0;
    counterDisplay.setContent(`{center}{bold}Counter: ${counter}{/bold}{/center}`);
    logBox.add(`{yellow-fg}Counter reset to ${counter}{/yellow-fg}`);
    screen.render();
  });

  incrementBtn.focus();
  currentDemo = container;

  logBox.add('{magenta-fg}Button demo started{/magenta-fg}');
  screen.render();
}

// Demo 5: Table View
function showTable() {
  clearMiddlePanel();

  const table = new Table({
    parent: middlePanel,
    top: 1,
    left: 1,
    width: '100%-2',
    height: '100%-2',
    border: {
      type: 'line'
    },
    style: {
      header: {
        fg: 'yellow',
        bold: true
      },
      cell: {
        fg: 'white'
      }
    }
  });

  table.setData([
    ['Name', 'Status', 'Progress'],
    ['Task 1', '✅ Done', '100%'],
    ['Task 2', '⚠️  Pending', '45%'],
    ['Task 3', '🔄 Running', '78%'],
    ['Task 4', '❌ Failed', '12%'],
    ['Task 5', '✅ Done', '100%']
  ]);

  currentDemo = table;

  logBox.add('{cyan-fg}Table view demo started{/cyan-fg}');
  screen.render();
}

// Demo 6: Color Palette
function showColorPalette() {
  clearMiddlePanel();

  const container = new Box({
    parent: middlePanel,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  });

  const title = new Text({
    parent: container,
    top: 1,
    left: 'center',
    content: '{bold}🎨 256 Color Palette 🎨{/bold}',
    tags: true
  });

  const colors = [
    'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
    'gray', 'light-red', 'light-green', 'light-yellow', 'light-blue', 'light-magenta', 'light-cyan'
  ];

  let y = 3;
  colors.forEach((color, i) => {
    new Box({
      parent: container,
      top: y + Math.floor(i / 3) * 2,
      left: 2 + (i % 3) * 20,
      width: 18,
      height: 1,
      content: `{${color}-bg}     ${color}     {/}`,
      tags: true
    });
  });

  currentDemo = container;

  logBox.add('{yellow-fg}Color palette demo started{/yellow-fg}');
  screen.render();
}

// Demo 7: Animated Spinner
function showSpinner() {
  clearMiddlePanel();

  const spinners = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let spinnerIndex = 0;

  const container = new Box({
    parent: middlePanel,
    top: 'center',
    left: 'center',
    width: 40,
    height: 10,
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'cyan'
      }
    }
  });

  const spinnerBox = new Text({
    parent: container,
    top: 2,
    left: 'center',
    content: spinners[0],
    style: {
      fg: 'green',
      bold: true
    }
  });

  const statusText = new Text({
    parent: container,
    top: 4,
    left: 'center',
    content: 'Loading awesome things...',
    tags: true
  });

  const interval = setInterval(() => {
    spinnerIndex = (spinnerIndex + 1) % spinners.length;
    spinnerBox.setContent(spinners[spinnerIndex]);
    screen.render();
  }, 80);

  currentDemo = container;
  container.on('destroy', () => clearInterval(interval));

  logBox.add('{green-fg}Spinner demo started{/green-fg}');
  screen.render();
}

// Demo 8: Focus Demo
function showFocusDemo() {
  clearMiddlePanel();

  const container = new Box({
    parent: middlePanel,
    top: 1,
    left: 1,
    width: '100%-2',
    height: '100%-2'
  });

  const instruction = new Text({
    parent: container,
    top: 0,
    left: 'center',
    content: '{bold}Press Tab to cycle through boxes{/bold}',
    tags: true
  });

  const boxes = [];
  const colors = ['red', 'green', 'blue', 'yellow'];
  const labels = ['Box A', 'Box B', 'Box C', 'Box D'];

  for (let i = 0; i < 4; i++) {
    const box = new Box({
      parent: container,
      top: 3 + Math.floor(i / 2) * 8,
      left: 2 + (i % 2) * 25,
      width: 22,
      height: 6,
      content: `{center}${labels[i]}{/center}`,
      tags: true,
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: 'white'
        },
        focus: {
          border: {
            fg: colors[i]
          }
        }
      },
      keys: true,
      mouse: true
    });

    box.on('focus', () => {
      logBox.add(`{${colors[i]}-fg}${labels[i]} focused{/}`);
      screen.render();
    });

    boxes.push(box);
  }

  boxes[0].focus();
  currentDemo = container;

  logBox.add('{blue-fg}Focus demo started{/blue-fg}');
  screen.render();
}

// Helper to clear middle panel
function clearMiddlePanel() {
  if (currentDemo) {
    currentDemo.destroy();
    currentDemo = null;
  }
}

// Set up list selection
widgetList.on('select', (item, index) => {
  const demos = [
    showColorfulBox,
    showProgressBar,
    showTextEditor,
    showButtons,
    showTable,
    showColorPalette,
    showSpinner,
    showFocusDemo
  ];

  if (demos[index]) {
    demos[index]();
  }

  updateStatus();
});

// Track mouse position and updates
let updateCount = 0;
screen.on('mouse', (data) => {
  updateCount++;
  updateStatus(data);
});

function updateStatus(mouseData) {
  const selected = widgetList.selected;
  const selectedItem = widgetList.items[selected]?.content || 'None';

  let content = `{bold}Selected:{/bold} ${selectedItem}\n`;

  if (mouseData) {
    content += `{bold}Mouse:{/bold} (${mouseData.x}, ${mouseData.y})\n`;
  }

  content += `{bold}Updates:{/bold} ${updateCount}`;

  statusBox.setContent(content);
  screen.render();
}

// Keyboard shortcuts
screen.key(['escape', 'q', 'C-c'], () => {
  return process.exit(0);
});

// Initial log messages
logBox.add('{green-fg}━━━━━━━━━━━━━━━━━━━━━━━━━{/green-fg}');
logBox.add('{bold}@tui/core Demo Started!{/bold}');
logBox.add('{green-fg}━━━━━━━━━━━━━━━━━━━━━━━━━{/green-fg}');
logBox.add('');
logBox.add('Select a demo from the list');
logBox.add('');

// Focus the list
widgetList.focus();

// Initial render
screen.render();

// Show first demo
showColorfulBox();
