/**
 * Blessed playground examples
 */

export const examples = {
  'Simple Box': `// Simple centered box
const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: '{bold}{cyan-fg}Hello blessed-browser!{/cyan-fg}{/bold}\\n\\n' +
           'This is blessed running in your browser.\\n\\n' +
           'Try the other examples!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: 'cyan'
    }
  }
});

screen.render();`,

  'Interactive List': `// Interactive list with selection
const list = blessed.list({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  label: ' {bold}{cyan-fg}Menu{/cyan-fg}{/bold} ',
  tags: true,
  keys: true,
  vi: true,
  mouse: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: { fg: 'cyan' },
    selected: {
      bg: 'cyan',
      fg: 'black'
    }
  },
  items: [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5'
  ]
});

const box = blessed.box({
  parent: screen,
  top: 3,
  left: 'center',
  width: '50%',
  height: 3,
  content: 'Select an item with arrow keys or mouse',
  tags: true,
  style: {
    fg: 'yellow'
  }
});

list.on('select', (item, index) => {
  box.setContent(\`{bold}Selected:{/bold} \${item.getText()} (index: \${index})\`);
  screen.render();
});

list.focus();
screen.render();`,

  'Form Input': `// Form with text input
const form = blessed.form({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '60%',
  height: '60%',
  keys: true,
  vi: true,
  border: {
    type: 'line'
  },
  style: {
    border: { fg: 'cyan' }
  },
  label: ' {bold}{cyan-fg}Form Demo{/cyan-fg}{/bold} ',
  tags: true,
});

blessed.text({
  parent: form,
  top: 1,
  left: 2,
  content: 'Name:'
});

const nameInput = blessed.textbox({
  parent: form,
  name: 'name',
  top: 1,
  left: 10,
  width: '50%',
  height: 1,
  inputOnFocus: true,
  keys: true,
  mouse: true,
  style: {
    fg: 'white',
    bg: 'blue',
    focus: {
      bg: 'red'
    }
  }
});

blessed.text({
  parent: form,
  top: 3,
  left: 2,
  content: 'Email:'
});

const emailInput = blessed.textbox({
  parent: form,
  name: 'email',
  top: 3,
  left: 10,
  width: '50%',
  height: 1,
  inputOnFocus: true,
  keys: true,
  mouse: true,
  style: {
    fg: 'white',
    bg: 'blue',
    focus: {
      bg: 'red'
    }
  }
});

const submitBtn = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  top: 5,
  left: 10,
  padding: {
    left: 2,
    right: 2
  },
  content: 'Submit',
  style: {
    fg: 'white',
    bg: 'green',
    focus: {
      bg: 'red'
    }
  }
});

const output = blessed.box({
  parent: form,
  top: 7,
  left: 2,
  right: 2,
  height: 3,
  content: 'Fill the form and press Submit',
  tags: true,
  style: {
    fg: 'yellow'
  }
});

submitBtn.on('press', () => {
  form.submit();
});

form.on('submit', (data) => {
  output.setContent(\`{bold}Submitted:{/bold}\\nName: \${data.name}\\nEmail: \${data.email}\`);
  screen.render();
});

nameInput.focus();
screen.render();`,

  'Table': `// Data table
const table = blessed.table({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '80%',
  height: '80%',
  border: {
    type: 'line'
  },
  style: {
    border: { fg: 'cyan' },
    header: {
      fg: 'white',
      bold: true
    },
    cell: {
      fg: 'white'
    }
  },
  label: ' {bold}{cyan-fg}User Table{/cyan-fg}{/bold} ',
  tags: true,
  keys: true,
  vi: true,
  mouse: true,
  data: [
    ['Name', 'Email', 'Role', 'Status'],
    ['Alice Johnson', 'alice@example.com', 'Admin', 'Active'],
    ['Bob Smith', 'bob@example.com', 'User', 'Active'],
    ['Carol White', 'carol@example.com', 'User', 'Inactive'],
    ['Dave Brown', 'dave@example.com', 'Moderator', 'Active'],
    ['Eve Davis', 'eve@example.com', 'User', 'Active']
  ]
});

table.focus();
screen.render();`,

  'Layout': `// Multi-pane layout
const container = blessed.box({
  parent: screen,
  width: '100%',
  height: '100%'
});

// Header
const header = blessed.box({
  parent: container,
  top: 0,
  left: 0,
  width: '100%',
  height: 3,
  content: '{center}{bold}{cyan-fg}Blessed Browser Layout Demo{/cyan-fg}{/bold}{/center}',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue'
  }
});

// Sidebar
const sidebar = blessed.list({
  parent: container,
  top: 3,
  left: 0,
  width: '30%',
  height: '100%-6',
  label: ' {bold}Menu{/bold} ',
  tags: true,
  keys: true,
  mouse: true,
  border: {
    type: 'line'
  },
  style: {
    border: { fg: 'cyan' },
    selected: {
      bg: 'cyan',
      fg: 'black'
    }
  },
  items: ['Dashboard', 'Users', 'Settings', 'Reports', 'Help']
});

// Main content area
const content = blessed.box({
  parent: container,
  top: 3,
  left: '30%',
  width: '70%',
  height: '100%-6',
  border: {
    type: 'line'
  },
  style: {
    border: { fg: 'cyan' }
  },
  label: ' {bold}Content{/bold} ',
  tags: true,
  content: '{center}Select a menu item{/center}',
  scrollable: true,
  mouse: true,
  keys: true
});

// Footer
const footer = blessed.box({
  parent: container,
  bottom: 0,
  left: 0,
  width: '100%',
  height: 3,
  content: '{center}Press q to quit | Use arrow keys or mouse to navigate{/center}',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue'
  }
});

sidebar.on('select', (item) => {
  const selected = item.getText();
  content.setContent(\`{center}{bold}\${selected}{/bold}{/center}\\n\\nThis is the \${selected} page.\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\`);
  screen.render();
});

sidebar.focus();
screen.render();`,

  'Animation': `// Animated progress bar
const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '60%',
  height: 9,
  border: {
    type: 'line'
  },
  style: {
    border: { fg: 'cyan' }
  },
  label: ' {bold}{cyan-fg}Loading Animation{/cyan-fg}{/bold} ',
  tags: true
});

const progressBar = blessed.progressbar({
  parent: box,
  top: 1,
  left: 2,
  right: 2,
  height: 3,
  filled: 0,
  pch: ' ',
  style: {
    bar: {
      bg: 'cyan'
    }
  },
  border: {
    type: 'line'
  }
});

const statusText = blessed.text({
  parent: box,
  top: 5,
  left: 'center',
  content: 'Starting...',
  tags: true,
  style: {
    fg: 'yellow'
  }
});

let progress = 0;
const interval = setInterval(() => {
  progress += 5;
  progressBar.setProgress(progress);

  if (progress < 33) {
    statusText.setContent('Loading resources...');
  } else if (progress < 66) {
    statusText.setContent('Processing data...');
  } else if (progress < 100) {
    statusText.setContent('Almost done...');
  } else {
    statusText.setContent('{bold}{green-fg}Complete!{/green-fg}{/bold}');
    clearInterval(interval);
  }

  screen.render();
}, 100);

screen.render();`,

  'BigText': `// Large ASCII art text
const bigtext = blessed.bigtext({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '90%',
  height: 'shrink',
  style: {
    fg: 'cyan',
    bg: 'black'
  }
});

const messages = ['HELLO', 'WORLD', 'TUI', 'ROCKS'];
let currentIndex = 0;

// Initial display
bigtext.setContent(messages[currentIndex]);

// Rotate messages every 2 seconds
const interval = setInterval(() => {
  currentIndex = (currentIndex + 1) % messages.length;
  bigtext.setContent(messages[currentIndex]);
  screen.render();
}, 2000);

// Cleanup on screen destroy
screen.on('destroy', () => {
  clearInterval(interval);
});

// Instructions box
const instructions = blessed.box({
  parent: screen,
  bottom: 2,
  left: 'center',
  width: 'shrink',
  height: 'shrink',
  content: 'Press q or ESC to quit',
  style: {
    fg: 'gray'
  }
});

screen.render();`,

  'Full Demo': `// Complete interactive demo with multiple widgets
// Based on @tui/core demo.js

// Header bar
const header = blessed.box({
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: 3,
  content: '{center}{bold}🎨 Interactive Demo 🎨{/bold}{/center}',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue',
    bold: true
  }
});

// Footer with instructions
const footer = blessed.box({
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
const leftPanel = blessed.box({
  parent: screen,
  top: 3,
  left: 0,
  width: '33%',
  bottom: 3,
  border: { type: 'line' },
  style: { border: { fg: 'cyan' } },
  label: ' 📋 Widget Gallery '
});

const widgetList = blessed.list({
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
    '🔘 Buttons',
    '📋 Table View',
    '🌈 Color Palette',
    '⚡ Animated Spinner'
  ],
  style: {
    selected: { bg: 'blue', fg: 'white', bold: true },
    item: { fg: 'white' }
  },
  border: { type: 'line' },
  label: ' Select Demo '
});

// Status box
const statusBox = blessed.box({
  parent: leftPanel,
  top: '50%',
  left: 0,
  width: '100%-2',
  height: '50%-1',
  border: { type: 'line' },
  label: ' 📊 Stats ',
  content: 'Selected: None\\nUpdates: 0',
  tags: true
});

// Middle panel - Demo area
const middlePanel = blessed.box({
  parent: screen,
  top: 3,
  left: '33%',
  width: '34%',
  bottom: 3,
  border: { type: 'line' },
  style: { border: { fg: 'yellow' } },
  label: ' 🎪 Demo Area '
});

// Right panel - Log viewer
const rightPanel = blessed.box({
  parent: screen,
  top: 3,
  left: '67%',
  width: '33%',
  bottom: 3,
  border: { type: 'line' },
  style: { border: { fg: 'green' } },
  label: ' 📜 Activity Log '
});

const logBox = blessed.log({
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
    style: { fg: 'green' }
  }
});

let currentDemo = null;
let updateCount = 0;

// Demo 1: Colorful Box
function showColorfulBox() {
  if (currentDemo) currentDemo.destroy();

  const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
  let colorIndex = 0;

  currentDemo = blessed.box({
    parent: middlePanel,
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%',
    content: '{center}{bold}🌈 Rainbow Box 🌈{/bold}\\n\\nColors cycle every second!{/center}',
    tags: true,
    border: { type: 'line' },
    style: { border: { fg: colors[0] }, bg: 'black' }
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
  if (currentDemo) currentDemo.destroy();

  const container = blessed.box({
    parent: middlePanel,
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%'
  });

  blessed.text({
    parent: container,
    top: 2,
    left: 'center',
    content: '{bold}⚡ Loading Progress ⚡{/bold}',
    tags: true
  });

  const progressBar = blessed.progressbar({
    parent: container,
    top: 5,
    left: 2,
    width: '100%-4',
    height: 3,
    border: { type: 'line' },
    style: { bar: { bg: 'green' }, border: { fg: 'blue' } },
    filled: 0
  });

  const percentText = blessed.text({
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
    percentText.setContent(\`{bold}\${progress}%{/bold}\`);
    screen.render();
  }, 100);

  currentDemo = container;
  container.on('destroy', () => clearInterval(interval));
  logBox.add('{green-fg}Progress bar demo started{/green-fg}');
  screen.render();
}

// Demo 3: Buttons
function showButtons() {
  if (currentDemo) currentDemo.destroy();

  const container = blessed.box({
    parent: middlePanel,
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%'
  });

  let counter = 0;

  const counterDisplay = blessed.box({
    parent: container,
    top: 2,
    left: 'center',
    width: 30,
    height: 5,
    content: \`{center}{bold}Counter: \${counter}{/bold}{/center}\`,
    tags: true,
    border: { type: 'line' },
    style: { border: { fg: 'cyan' } }
  });

  const incrementBtn = blessed.button({
    parent: container,
    top: 9,
    left: 5,
    width: 15,
    height: 3,
    content: '{center}➕ Add{/center}',
    tags: true,
    border: { type: 'line' },
    style: { focus: { bg: 'green', fg: 'black' } },
    mouse: true
  });

  const decrementBtn = blessed.button({
    parent: container,
    top: 9,
    left: 22,
    width: 15,
    height: 3,
    content: '{center}➖ Sub{/center}',
    tags: true,
    border: { type: 'line' },
    style: { focus: { bg: 'red', fg: 'black' } },
    mouse: true
  });

  incrementBtn.on('press', () => {
    counter++;
    counterDisplay.setContent(\`{center}{bold}Counter: \${counter}{/bold}{/center}\`);
    logBox.add(\`{green-fg}Counter increased to \${counter}{/green-fg}\`);
    screen.render();
  });

  decrementBtn.on('press', () => {
    counter--;
    counterDisplay.setContent(\`{center}{bold}Counter: \${counter}{/bold}{/center}\`);
    logBox.add(\`{red-fg}Counter decreased to \${counter}{/red-fg}\`);
    screen.render();
  });

  incrementBtn.focus();
  currentDemo = container;
  logBox.add('{magenta-fg}Button demo started{/magenta-fg}');
  screen.render();
}

// Demo 4: Table
function showTable() {
  if (currentDemo) currentDemo.destroy();

  currentDemo = blessed.table({
    parent: middlePanel,
    top: 1,
    left: 1,
    width: '100%-2',
    height: '100%-2',
    border: { type: 'line' },
    style: {
      header: { fg: 'yellow', bold: true },
      cell: { fg: 'white' }
    },
    data: [
      ['Name', 'Status', 'Progress'],
      ['Task 1', '✅ Done', '100%'],
      ['Task 2', '⚠️  Pending', '45%'],
      ['Task 3', '🔄 Running', '78%'],
      ['Task 4', '❌ Failed', '12%'],
      ['Task 5', '✅ Done', '100%']
    ]
  });

  logBox.add('{cyan-fg}Table view demo started{/cyan-fg}');
  screen.render();
}

// Demo 5: Color Palette
function showColorPalette() {
  if (currentDemo) currentDemo.destroy();

  const container = blessed.box({
    parent: middlePanel,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  });

  blessed.text({
    parent: container,
    top: 1,
    left: 'center',
    content: '{bold}🎨 Color Palette 🎨{/bold}',
    tags: true
  });

  const colors = [
    'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
    'gray', 'light-red', 'light-green', 'light-yellow'
  ];

  let y = 3;
  colors.forEach((color, i) => {
    blessed.box({
      parent: container,
      top: y + Math.floor(i / 2) * 2,
      left: 2 + (i % 2) * 24,
      width: 22,
      height: 1,
      content: \`{\${color}-bg}     \${color}     {/}\`,
      tags: true
    });
  });

  currentDemo = container;
  logBox.add('{yellow-fg}Color palette demo started{/yellow-fg}');
  screen.render();
}

// Demo 6: Spinner
function showSpinner() {
  if (currentDemo) currentDemo.destroy();

  const spinners = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let spinnerIndex = 0;

  const container = blessed.box({
    parent: middlePanel,
    top: 'center',
    left: 'center',
    width: 40,
    height: 10,
    border: { type: 'line' },
    style: { border: { fg: 'cyan' } }
  });

  const spinnerBox = blessed.text({
    parent: container,
    top: 2,
    left: 'center',
    content: spinners[0],
    style: { fg: 'green', bold: true }
  });

  blessed.text({
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

// Set up list selection
const demos = [
  showColorfulBox,
  showProgressBar,
  showButtons,
  showTable,
  showColorPalette,
  showSpinner
];

widgetList.on('select', (item, index) => {
  if (demos[index]) {
    demos[index]();
    const selectedItem = widgetList.items[index].content;
    statusBox.setContent(\`{bold}Selected:{/bold} \${selectedItem}\\n{bold}Updates:{/bold} \${updateCount}\`);
    screen.render();
  }
});

// Track mouse
screen.on('mouse', () => {
  updateCount++;
  const selected = widgetList.selected;
  const selectedItem = widgetList.items[selected]?.content || 'None';
  statusBox.setContent(\`{bold}Selected:{/bold} \${selectedItem}\\n{bold}Updates:{/bold} \${updateCount}\`);
  screen.render();
});

// Initial log messages
logBox.add('{green-fg}━━━━━━━━━━━━━━━━━━━━━━━━━{/green-fg}');
logBox.add('{bold}Interactive Demo Started!{/bold}');
logBox.add('{green-fg}━━━━━━━━━━━━━━━━━━━━━━━━━{/green-fg}');
logBox.add('');
logBox.add('Select a demo from the list');

// Focus and show first demo
widgetList.focus();
showColorfulBox();
screen.render();`
};

export default examples;
