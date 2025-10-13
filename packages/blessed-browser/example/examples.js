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

screen.render();`
};

export default examples;
