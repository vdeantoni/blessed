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
const box = new Box({
  parent: screen,
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
const list = new List({
  parent: screen,
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

const box = new Box({
  parent: screen,
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
  list.screen.render();
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
const table = new Table({
  parent: screen,
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
    title: "Animated Login Form",
    description:
      "Beautiful login UI with BigText, animated borders, validation, and loading states",
    code: `import {
  Box, BigText, Form, Textbox, Button, Text,
  generateGradient, rotateColors
} from "@unblessed/browser";

// Container with animated breathing border
const container = new Box({
  parent: screen,
  top: "center",
  left: "center",
  width: Math.min(screen.width - 4, 70),
  height: Math.min(screen.height - 2, 40),
  border: {
    type: "line",
    colors: [], // Will be set below
    repeatColors: true,
  },
  style: { bg: "black" },
  shadow: true,
  tags: true,
});

// BigText title
const title = new BigText({
  parent: container,
  top: 1,
  left: "center",
  height: 13,
  content: "LOGIN",
  style: { fg: "cyan", bold: true },
});

// Subtitle
const subtitle = new Text({
  parent: container,
  top: 15,
  left: "center",
  content: "{dim}Secure Terminal Access{/dim}",
  tags: true,
  style: { fg: "white" },
});

// Login form
const form = new Form({
  parent: container,
  top: 18,
  left: "center",
  width: Math.min(container.width - 6, 50),
  height: 14,
  tags: true,
  keys: true,
  mouse: true,
});

// Username input
const usernameInput = new Textbox({
  parent: form,
  top: 0,
  left: 0,
  width: "100%",
  height: 3,
  label: " 👤 Username ",
  name: "username",
  border: { type: "line" },
  style: {
    fg: "white",
    border: { fg: "cyan" },
    focus: { border: { fg: "yellow" } },
  },
  inputOnFocus: true,
  mouse: true,
  keys: true,
});

// Password input
const passwordInput = new Textbox({
  parent: form,
  top: 4,
  left: 0,
  width: "100%",
  height: 3,
  label: " 🔒 Password ",
  name: "password",
  censor: true,
  border: { type: "line" },
  style: {
    fg: "white",
    border: { fg: "cyan" },
    focus: { border: { fg: "yellow" } },
  },
  inputOnFocus: true,
  mouse: true,
  keys: true,
});

// Status message
const statusBox = new Box({
  parent: form,
  top: 8,
  left: 0,
  width: "100%",
  height: 1,
  tags: true,
  style: { fg: "yellow" },
  content: "{center}{dim}Tab to navigate • Enter to submit{/dim}{/center}",
});

// Login button
const loginBtn = new Button({
  parent: form,
  top: 10,
  left: "center",
  width: 20,
  height: 3,
  content: "{center}LOGIN{/center}",
  tags: true,
  mouse: true,
  keys: true,
  style: {
    bg: "cyan",
    fg: "black",
    bold: true,
    focus: { bg: "yellow", fg: "black" },
  },
  border: { type: "line" },
});

// Animated border setup
const borderLength = container.getBorderLength();
const baseGradient = generateGradient("cyan", "blue", borderLength);
let breathPhase = 0;
let isLoading = false;
let loadingProgress = 0;

function updateBorder() {
  if (isLoading) {
    // Loading animation: chase effect
    const colors = new Array(borderLength).fill("#1a1a1a");
    for (let i = 0; i < 8; i++) {
      const pos = (loadingProgress - i + borderLength) % borderLength;
      const intensity = 1 - i / 8;
      const c = Math.round(255 * intensity);
      colors[pos] = \`#00\${c.toString(16).padStart(2, '0')}00\`;
    }
    container.setBorderColors(colors);
    loadingProgress = (loadingProgress + 1) % borderLength;
  } else {
    // Breathing gradient
    breathPhase += 0.05;
    const intensity = (Math.sin(breathPhase) + 1) / 2;  
    const colors = baseGradient.map(hex => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const nr = Math.round(r * (0.3 + intensity * 0.7));
      const ng = Math.round(g * (0.3 + intensity * 0.7));
      const nb = Math.round(b * (0.3 + intensity * 0.7));
      return \`#\${[nr, ng, nb].map(n => n.toString(16).padStart(2, '0')).join('')}\`;
    });
    container.setBorderColors(colors);
  }
}

updateBorder();

const animInterval = setInterval(() => {
  updateBorder();
  screen.render();
}, 1000 / 30);

function validatePassword(password) {
  return password.length >= 6;
}

// Submit handler
function handleSubmit() {
  const username = usernameInput.getValue();
  const password = passwordInput.getValue();

  // Validation
  if (!username || username.trim().length === 0) {
    statusBox.style.fg = "red";
    statusBox.setContent("{center}{red-fg}{bold}⚠ Username is required{/bold}{/red-fg}{/center}");
    screen.render();
    return;
  }

  if (!validatePassword(password)) {
    statusBox.style.fg = "red";
    statusBox.setContent("{center}{red-fg}{bold}⚠ Password must be at least 6 characters{/bold}{/red-fg}{/center}");
    screen.render();
    return;
  }

  // Start loading
  isLoading = true;
  loginBtn.setContent("{center}LOADING...{/center}");
  loginBtn.style.bg = "yellow";
  statusBox.style.fg = "yellow";
  statusBox.setContent("{center}{yellow-fg}🔄 Authenticating...{/yellow-fg}{/center}");
  usernameInput.readOnly = true;
  passwordInput.readOnly = true;
  screen.render();

  // Simulate authentication
  setTimeout(() => {
    // Random success/failure (70% success rate)
    const success = Math.random() > 0.3;

    if (success) {
      // Success state
      isLoading = false;
      loginBtn.setContent("{center}✓ SUCCESS{/center}");
      loginBtn.style.bg = "green";
      loginBtn.style.fg = "white";
      statusBox.style.fg = "green";
      statusBox.setContent("{center}{green-fg}{bold}✓ Login successful! Redirecting...{/bold}{/green-fg}{/center}");

      // Update border to green
      const greenGradient = generateGradient("green", "#00ff00", borderLength);
      container.setBorderColors(greenGradient);
      screen.render();

      // Simulate redirect
      setTimeout(() => {
        title.setContent("WELCOME");
        subtitle.setContent(\`{center}{green-fg}{bold}Hello, \${username.split('@')[0]}!{/bold}{/green-fg}{/center}\`);
        form.hide();

        const welcomeMsg = new Box({
          parent: container,
          top: 18,
          left: "center",
          width: "80%",
          height: 8,
          border: { type: "line" },
          style: { border: { fg: "green" } },
          tags: true,
          content:
            "{center}\\n" +
            "{green-fg}✓{/green-fg} Authentication successful\\n" +
            "{green-fg}✓{/green-fg} Session established\\n" +
            "{green-fg}✓{/green-fg} Loading dashboard...\\n\\n" +
            "{dim}Redirecting in 3 seconds...{/dim}",
        });
        screen.render();
      }, 1500);
    } else {
      // Error state
      isLoading = false;
      loginBtn.setContent("{center}LOGIN{/center}");
      loginBtn.style.bg = "red";
      loginBtn.style.fg = "white";
      statusBox.style.fg = "red";
      statusBox.setContent("{center}{red-fg}{bold}✗ Invalid credentials. Please try again.{/bold}{/red-fg}{/center}");

      // Shake effect with red border
      const redColors = new Array(borderLength).fill("#ff0000");
      container.setBorderColors(redColors);
      screen.render();

      // Reset after 2 seconds
      setTimeout(() => {
        loginBtn.style.bg = "cyan";
        loginBtn.style.fg = "black";
        statusBox.style.fg = "yellow";
        statusBox.setContent("{center}{dim}Tab to navigate • Enter to submit{/dim}{/center}");
        usernameInput.readOnly = false;
        passwordInput.readOnly = false;
        passwordInput.clearValue();
        screen.render();
      }, 2000);
    }
  }, 2000);
}

loginBtn.on("press", handleSubmit);
form.on("submit", handleSubmit);

// Initial focus
usernameInput.focus();
`,
  },
  {
    id: "animation",
    title: "Animation",
    description: "Animated progress bars with dynamic status updates",
    code: `import { Box, ProgressBar, Text } from "@unblessed/browser";

// Animated progress bar
const box = new Box({
  parent: screen,
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

  box.screen.render();
}, 100);
`,
  },
  {
    id: "dashboard",
    title: "Dashboard Layout",
    description: "Multi-pane layout with header, sidebar, and content areas",
    code: `import { Box, List } from "@unblessed/browser";

// Multi-pane layout
const container = new Box({
  parent: screen,
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
  container.screen.render();
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
const title = new BigText({
  parent: screen,
  top: 2,
  left: "center",
  height: 20,
  content: "UNBLESSED",
  style: {
    fg: "cyan",
    bold: true,
  },
});

const subtitle = new Box({
  parent: screen,
  top: 16,
  left: "center",
  width: "60%",
  height: 3,
  content: "{center}Modern Terminal UI Library{/center}",
  tags: true,
  style: { fg: "white" },
});

const features = new List({
  parent: screen,
  top: 20,
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
    id: "border-styles",
    title: "Border Styles",
    description:
      "Showcase of all available border styles (single, double, round, bold, etc.)",
    code: `import { Box } from "@unblessed/browser";

// Border styles showcase - 8 different styles
const styles = [
  { name: "single", style: "single", col: 0, row: 0 },
  { name: "double", style: "double", col: 22, row: 0 },
  { name: "round", style: "round", col: 44, row: 0 },
  { name: "bold", style: "bold", col: 66, row: 0 },
  { name: "singleDouble", style: "singleDouble", col: 0, row: 9 },
  { name: "doubleSingle", style: "doubleSingle", col: 22, row: 9 },
  { name: "classic", style: "classic", col: 44, row: 9 },
  { name: "arrow", style: "arrow", col: 66, row: 9 },
];

styles.forEach(({ name, style, col, row }) => {
  new Box({
    parent: screen,
    top: row,
    left: col,
    width: 20,
    height: 7,
    content: \`{center}{bold}\${name}{/bold}{/center}\`,
    tags: true,
    border: {
      type: "line",
      style: style,
    },
    style: {
      border: { fg: "cyan" },
      fg: "white",
    },
  });
});

// Per-side colors example
new Box({
  parent: screen,
  top: 18,
  left: "center",
  width: 50,
  height: 5,
  content: "{center}Per-side Border Colors{/center}",
  tags: true,
  border: {
    type: "line",
    style: "single",
    topColor: "red",
    bottomColor: "green",
    leftColor: "blue",
    rightColor: "yellow",
  },
  style: { fg: "white" },
});
`,
  },
  {
    id: "ai-assistant",
    title: "🤖 AI Assistant",
    description:
      "Full AI assistant terminal interface with conversation, commands, and file browser",
    code: `import { Box, Log, Textbox, List, FileManager } from '@unblessed/browser';

// Header
const header = new Box({
  parent: screen,
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
const conversation = new Log({
  parent: screen,
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
const sidebar = new List({
  parent: screen,
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
const promptInput = new Textbox({
  parent: screen,
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
const status = new Box({
  parent: screen,
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
const fileMgr = new FileManager({
  parent: screen,
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
    conversation.screen.render();
  },
  '/compact': () => {
    conversation.log('');
    conversation.log('{yellow-fg}[SYSTEM]{/} Compacting conversation...');
    setTimeout(() => {
      conversation.log('{green-fg}[ASSISTANT]{/} ✓ Compacted! Reduced context by 40%');
      conversation.log('            Summary: Working on React components with TypeScript.');
      conversation.log('');
      conversation.screen.render();
    }, 800);
  },
  '/context': () => {
    conversation.log('');
    conversation.log('{bold}{cyan-fg}Context Summary:{/cyan-fg}{/bold}');
    conversation.log('  Messages: 12 exchanges');
    conversation.log('  Files: 4 files (2,340 lines)');
    conversation.log('  Tokens: ~8,500 / 200,000');
    conversation.log('');
    conversation.screen.render();
  },
  '/adddir': () => {
    fileMgr.show();
    fileMgr.focus();
    fileMgr.refresh();
    fileMgr.screen.render();
  },
  '/clear': () => {
    conversation.setContent('');
    conversation.log('{green-fg}[SYSTEM]{/} Conversation cleared!');
    conversation.log('');
    conversation.screen.render();
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
      conversation.screen.render();
    }
  } else {
    // Simulate Assistant response
    conversation.log('{yellow-fg}[ASSISTANT]{/} {dim}Thinking...{/dim}');
    conversation.screen.render();
    setTimeout(() => {
      conversation.log('{green-fg}[ASSISTANT]{/} I can help you with that! Here is what I will do:');
      conversation.log('            1. Analyze your codebase structure');
      conversation.log('            2. Create the necessary files');
      conversation.log('            3. Run tests to verify');
      conversation.log('');
      conversation.log('            Would you like me to proceed?');
      conversation.log('');
      conversation.screen.render();
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

  fileMgr.screen.render();
});

fileMgr.key('escape', () => {
  fileMgr.hide();
  promptInput.focus();
  fileMgr.screen.render();
});

// Focus input initially
promptInput.focus();
`,
  },
];
