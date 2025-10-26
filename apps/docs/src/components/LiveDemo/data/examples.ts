export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const CODE_EXAMPLES: CodeExample[] = [
  {
    id: "simple-box",
    title: "Simple Box",
    description: "A basic centered box with styled content and borders",
    code: `import { Box } from "@unblessed/browser";

// Simple centered box
export const box = new Box({
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  content:
    "{bold}{cyan-fg}Hello unblessed!{/cyan-fg}{/bold}\\n\\n" +
    "This is unblessed running in your browser.\\n\\n" +
    "Try the other examples!",
  tags: true,
  border: { type: "line" },
  style: {
    fg: "white",
    bg: "black",
    border: { fg: "cyan" },
  },
});
`,
  },
  {
    id: "interactive-list",
    title: "Interactive List",
    description: "Navigate items with keyboard or mouse, handle selections",
    code: `import { List, Box } from "@unblessed/browser";

// Interactive list with selection
export const list = new List({
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  label: " {bold}{cyan-fg}Menu{/cyan-fg}{/bold} ",
  tags: true,
  keys: true,
  vi: true,
  mouse: true,
  border: { type: "line" },
  style: {
    fg: "white",
    border: { fg: "cyan" },
    selected: {
      bg: "cyan",
      fg: "black",
    },
  },
  items: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
});

export const box = new Box({
  top: 3,
  left: "center",
  width: "50%",
  height: 3,
  content: "Select an item with arrow keys or mouse",
  tags: true,
  style: { fg: "yellow" },
});

list.on("select", (item, index) => {
  box.setContent(
    \`{bold}Selected:{/bold} \${item.getText()} (index: \${index})\`,
  );
});

list.focus();
`,
  },
  {
    id: "table",
    title: "Data Table",
    description: "Display tabular data with headers and rows",
    code: `import { Table } from "@unblessed/browser";

// Data table
export const table = new Table({
  top: "center",
  left: "center",
  width: "80%",
  height: "80%",
  border: { type: "line" },
  style: {
    border: { fg: "cyan" },
    header: { fg: "white", bold: true },
    cell: { fg: "white" },
  },
  label: " {bold}{cyan-fg}User Table{/cyan-fg}{/bold} ",
  tags: true,
  keys: true,
  vi: true,
  mouse: true,
  data: [
    ["Name", "Email", "Role", "Status"],
    ["Alice Johnson", "alice@example.com", "Admin", "Active"],
    ["Bob Smith", "bob@example.com", "User", "Active"],
    ["Carol White", "carol@example.com", "User", "Inactive"],
    ["Dave Brown", "dave@example.com", "Moderator", "Active"],
    ["Eve Davis", "eve@example.com", "User", "Active"],
  ],
});

table.focus();
`,
  },
  {
    id: "form",
    title: "Input Form",
    description: "Create interactive forms with text inputs and buttons",
    code: `import { Form, Textbox, Button, Box } from "@unblessed/browser";

// Interactive form with inputs
export const form = new Form({
  top: "center",
  left: "center",
  width: "50%",
  height: "70%",
  label: " {bold}User Registration{/bold} ",
  tags: true,
  border: { type: "line" },
  keys: true,
  mouse: true,
});

const nameInput = new Textbox({
  parent: form,
  top: 2,
  left: 2,
  width: "80%",
  height: 3,
  label: " Name: ",
  name: "name",
  border: { type: "line" },
  inputOnFocus: true,
  mouse: true,
  keys: true,
});

const emailInput = new Textbox({
  parent: form,
  top: 6,
  left: 2,
  width: "80%",
  height: 3,
  label: " Email: ",
  name: "email",
  border: { type: "line" },
  inputOnFocus: true,
  mouse: true,
  keys: true,
});

const submitBtn = new Button({
  parent: form,
  top: 10,
  left: 2,
  width: 20,
  height: 3,
  content: "Submit",
  mouse: true,
  keys: true,
  style: {
    bg: "green",
    fg: "white",
    focus: { bg: "cyan" },
  },
});

const output = new Box({
  parent: form,
  top: 14,
  left: 2,
  width: "80%",
  height: 3,
  content: "Tab to navigate • Click to focus",
  tags: true,
  style: { fg: "yellow" },
});

submitBtn.on("press", () => {
  form.submit();
});

form.on("submit", (data) => {
  output.setContent(
    \`{bold}Submitted:{/bold}\\nName: \${data.name || "(empty)"}\\nEmail: \${data.email || "(empty)"}\`,
  );
});

form.focus();
`,
  },
  {
    id: "animation",
    title: "Animation",
    description: "Animated progress bars with dynamic status updates",
    code: `import { Box, ProgressBar, Text } from "@unblessed/browser";

// Animated progress bar
export const box = new Box({
  top: "center",
  left: "center",
  width: "60%",
  height: 9,
  border: { type: "line" },
  style: { border: { fg: "cyan" } },
  label: " {bold}{cyan-fg}Loading Animation{/cyan-fg}{/bold} ",
  tags: true,
});

const progressBar = new ProgressBar({
  parent: box,
  top: 1,
  left: 2,
  right: 2,
  height: 3,
  filled: 0,
  pch: " ",
  style: { bar: { bg: "cyan" } },
  border: { type: "line" },
});

const statusText = new Text({
  parent: box,
  top: 5,
  left: "center",
  content: "Starting...",
  tags: true,
  style: { fg: "yellow" },
});

let progress = 0;
const interval = setInterval(() => {
  progress += 5;
  progressBar.setProgress(progress);

  if (progress < 33) {
    statusText.setContent("Loading resources...");
  } else if (progress < 66) {
    statusText.setContent("Processing data...");
  } else if (progress < 100) {
    statusText.setContent("Almost done...");
  } else {
    statusText.setContent("{bold}{green-fg}Complete!{/green-fg}{/bold}");
    clearInterval(interval);
  }
}, 100);
`,
  },
  {
    id: "dashboard",
    title: "Dashboard Layout",
    description: "Multi-pane layout with header, sidebar, and content areas",
    code: `import { Box, List } from "@unblessed/browser";

// Multi-pane layout
export const container = new Box({
  width: "100%",
  height: "100%",
});

// Header
const header = new Box({
  parent: container,
  top: 0,
  left: 0,
  width: "100%",
  height: 3,
  content:
    "{center}{bold}{cyan-fg}unblessed Browser Layout{/cyan-fg}{/bold}{/center}",
  tags: true,
  style: { fg: "white", bg: "blue" },
});

// Sidebar
const sidebar = new List({
  parent: container,
  top: 3,
  left: 0,
  width: "30%",
  height: "100%-6",
  label: " {bold}Menu{/bold} ",
  tags: true,
  keys: true,
  mouse: true,
  border: { type: "line" },
  style: {
    border: { fg: "cyan" },
    selected: { bg: "cyan", fg: "black" },
  },
  items: ["Dashboard", "Users", "Settings", "Reports", "Help"],
});

// Main content area
const content = new Box({
  parent: container,
  top: 3,
  left: "30%",
  width: "70%",
  height: "100%-6",
  border: { type: "line" },
  style: { border: { fg: "cyan" } },
  label: " {bold}Content{/bold} ",
  tags: true,
  content: "{center}Select a menu item{/center}",
  scrollable: true,
  mouse: true,
  keys: true,
});

// Footer
const footer = new Box({
  parent: container,
  bottom: 0,
  left: 0,
  width: "100%",
  height: 3,
  content:
    "{center}Press q to quit | Use arrow keys or mouse to navigate{/center}",
  tags: true,
  style: { fg: "white", bg: "blue" },
});

sidebar.on("select", (item) => {
  const selected = item.getText();
  content.setContent(
    \`{center}{bold}\${selected}{/bold}{/center}\\n\\nThis is the \${selected} page.\`,
  );
});

sidebar.focus();
`,
  },
  {
    id: "ascii-art",
    title: "ASCII Art",
    description: "Display big text and ASCII art graphics",
    code: `import { BigText, Box, List } from "@unblessed/browser";

// ASCII art and big text
export const title = new BigText({
  top: 2,
  left: "center",
  width: "90%",
  height: 10,
  content: "UNBLESSED",
  style: {
    fg: "cyan",
    bold: true,
  },
});

export const subtitle = new Box({
  top: 13,
  left: "center",
  width: "60%",
  height: 3,
  content: "{center}Modern Terminal UI Library{/center}",
  tags: true,
  style: { fg: "white" },
});

export const features = new List({
  top: 17,
  left: "center",
  width: "50%",
  height: 8,
  border: { type: "line" },
  label: " Features ",
  style: {
    border: { fg: "cyan" },
    item: { fg: "green" },
  },
  items: [
    "✓ TypeScript Support",
    "✓ Cross-Platform",
    "✓ 100% blessed Compatible",
    "✓ Browser Support",
  ],
});
`,
  },
  {
    id: "ai-assistant",
    title: "🤖 AI Assistant",
    description: "Full AI assistant terminal interface with conversation, commands, and file browser",
    code: `import { Box, Log, Textbox, List, FileManager } from '@unblessed/browser';

// Header
export const header = new Box({
  top: 0,
  left: 0,
  right: 0,
  height: 3,
  tags: true,
  border: { type: 'line' },
  style: { fg: 'white', bg: 'blue', border: { fg: 'cyan' } },
  content: '{center}{bold}{cyan-fg}🤖 AI ASSISTANT{/cyan-fg}{/bold}  {white-fg}|{/}  {yellow-fg}Type your prompt or try: /help /compact /context /adddir{/yellow-fg}{/center}',
});

// Main conversation area
export const conversation = new Log({
  label: ' 💬 Conversation ',
  top: 3,
  left: 0,
  width: '70%',
  bottom: 6,
  tags: true,
  border: { type: 'line' },
  style: {
    fg: 'white',
    border: { fg: 'cyan' },
    label: { fg: 'yellow', bold: true },
  },
  scrollable: true,
  alwaysScroll: true,
  mouse: true,
  keys: true,
  scrollbar: {
    ch: '█',
    style: { bg: 'cyan' },
  },
});

// Welcome message
conversation.log('{center}{bold}{cyan-fg}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{/}{/center}');
conversation.log('{center}{bold}{yellow-fg}Welcome to AI Assistant!{/yellow-fg}{/bold}{/center}');
conversation.log('{center}{bold}{cyan-fg}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{/}{/center}');
conversation.log('');
conversation.log('{green-fg}[ASSISTANT]{/} Hi! I can help you write code, debug issues,');
conversation.log('            and manage your projects. Try these commands:');
conversation.log('');
conversation.log('            {cyan-fg}/help{/}     - Show available commands');
conversation.log('            {cyan-fg}/compact{/}  - Summarize conversation');
conversation.log('            {cyan-fg}/context{/}  - Show current context');
conversation.log('            {cyan-fg}/adddir{/}   - Add directory to context');
conversation.log('');
conversation.log('            Or just type a prompt and press Enter!');
conversation.log('');

// Sidebar for context/files
export const sidebar = new List({
  label: ' 📁 Context Files ',
  top: 3,
  left: '70%',
  right: 0,
  bottom: 6,
  tags: true,
  border: { type: 'line' },
  style: {
    fg: 'white',
    border: { fg: 'green' },
    label: { fg: 'yellow', bold: true },
    selected: { bg: 'green', fg: 'black' },
  },
  keys: true,
  mouse: true,
  items: [
    '{green-fg}✓{/} src/App.tsx',
    '{green-fg}✓{/} src/components/Button.tsx',
    '{blue-fg}○{/} package.json',
    '{blue-fg}○{/} tsconfig.json',
  ],
  scrollbar: {
    ch: '█',
    style: { bg: 'green' },
  },
});

// Input prompt
export const promptInput = new Textbox({
  label: ' {bold}{cyan-fg}>{/cyan-fg}{/bold} Your Prompt ',
  bottom: 3,
  left: 0,
  right: 0,
  height: 3,
  tags: true,
  border: { type: 'line' },
  style: {
    fg: 'white',
    border: { fg: 'yellow' },
    label: { fg: 'yellow', bold: true },
    focus: { border: { fg: 'cyan' } },
  },
  keys: true,
  mouse: true,
  inputOnFocus: true,
});

// Status bar
export const status = new Box({
  bottom: 0,
  left: 0,
  right: 0,
  height: 3,
  tags: true,
  border: { type: 'line' },
  style: { fg: 'white', bg: 'black', border: { fg: 'white' } },
  content: '{center}{green-fg}●{/} Connected  {gray-fg}|{/}  {cyan-fg}4 files in context{/}  {gray-fg}|{/}  {yellow-fg}Press Ctrl+C to exit{/}{/center}',
});

// File manager (hidden by default)
export const fileMgr = new FileManager({
  top: 'center',
  left: 'center',
  width: '80%',
  height: '80%',
  label: ' {bold}{green-fg}📁 Add Directory to Context{/green-fg}{/bold} ',
  tags: true,
  border: { type: 'double' },
  style: {
    fg: 'white',
    border: { fg: 'green' },
    selected: { bg: 'green', fg: 'black' },
  },
  keys: true,
  mouse: true,
  hidden: true,
  cwd: '/',
});

// Command handling
const commands = {
  '/help': () => {
    conversation.log('');
    conversation.log('{bold}{yellow-fg}Available Commands:{/yellow-fg}{/bold}');
    conversation.log('  {cyan-fg}/help{/}     - Show this help message');
    conversation.log('  {cyan-fg}/compact{/}  - Summarize the conversation');
    conversation.log('  {cyan-fg}/context{/}  - Show current context size');
    conversation.log('  {cyan-fg}/adddir{/}   - Browse and add directory');
    conversation.log('  {cyan-fg}/clear{/}    - Clear conversation history');
    conversation.log('');
  },
  '/compact': () => {
    conversation.log('');
    conversation.log('{yellow-fg}[SYSTEM]{/} Compacting conversation...');
    setTimeout(() => {
      conversation.log('{green-fg}[ASSISTANT]{/} ✓ Compacted! Reduced context by 40%');
      conversation.log('            Summary: Working on React components with TypeScript.');
      conversation.log('');
    }, 800);
  },
  '/context': () => {
    conversation.log('');
    conversation.log('{bold}{cyan-fg}Context Summary:{/cyan-fg}{/bold}');
    conversation.log('  Messages: 12 exchanges');
    conversation.log('  Files: 4 files (2,340 lines)');
    conversation.log('  Tokens: ~8,500 / 200,000');
    conversation.log('');
  },
  '/adddir': () => {
    fileMgr.show();
    fileMgr.focus();
    fileMgr.refresh();
  },
  '/clear': () => {
    conversation.setContent('');
    conversation.log('{green-fg}[SYSTEM]{/} Conversation cleared!');
    conversation.log('');
  },
};

// Handle input submission
promptInput.on('submit', (value) => {
  const input = value.trim();
  if (!input) {
    promptInput.clearValue();
    promptInput.focus();
    return;
  }

  // Log user input
  conversation.log('');
  conversation.log(\`{bold}{blue-fg}[YOU]{/blue-fg}{/bold} \${input}\`);

  // Handle commands
  if (input.startsWith('/')) {
    const cmd = input.split(' ')[0];
    if (commands[cmd]) {
      commands[cmd]();
    } else {
      conversation.log(\`{red-fg}[ERROR]{/} Unknown command: \${cmd}\`);
      conversation.log('        Type {cyan-fg}/help{/} for available commands');
    }
  } else {
    // Simulate Assistant response
    conversation.log('{yellow-fg}[ASSISTANT]{/} {dim}Thinking...{/dim}');
    setTimeout(() => {
      conversation.log('{green-fg}[ASSISTANT]{/} I can help you with that! Here is what I will do:');
      conversation.log('            1. Analyze your codebase structure');
      conversation.log('            2. Create the necessary files');
      conversation.log('            3. Run tests to verify');
      conversation.log('');
      conversation.log('            Would you like me to proceed?');
      conversation.log('');
    }, 1000);
  }

  promptInput.clearValue();
  promptInput.focus();
});

// File manager selection
fileMgr.on('file', (file) => {
  conversation.log('');
  conversation.log(\`{green-fg}[SYSTEM]{/} Added to context: \${file}\`);
  conversation.log('');
  fileMgr.hide();
  promptInput.focus();

  // Add to sidebar
  const items = sidebar.items.slice();
  items.push(\`{green-fg}✓{/} \${file}\`);
  sidebar.setItems(items);
});

fileMgr.key('escape', () => {
  fileMgr.hide();
  promptInput.focus();
});

// Focus input initially
promptInput.focus();
`,
  },
];
