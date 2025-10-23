import React, { useEffect, useRef, useState, useCallback } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import Editor from "@monaco-editor/react";
import DraggableResizableBox from "../DraggableResizableBox";
import "xterm/css/xterm.css";
import "./styles.css";

interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
}

const CODE_EXAMPLES: CodeExample[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Multi-pane layout with header, sidebar, and content",
    code: `// Multi-pane dashboard layout
const header = new tui.Box({
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: 3,
  content: '{center}{bold}{cyan-fg}Dashboard{/cyan-fg}{/bold}{/center}',
  tags: true,
  style: { fg: 'white', bg: 'blue' }
});

const sidebar = new tui.List({
  parent: screen,
  top: 3,
  left: 0,
  width: '30%',
  height: '100%-6',
  label: ' Menu ',
  border: { type: 'line' },
  style: {
    border: { fg: 'cyan' },
    selected: { bg: 'cyan', fg: 'black' }
  },
  keys: true,
  mouse: true,
  items: ['Dashboard', 'Analytics', 'Settings']
});

const content = new tui.Box({
  parent: screen,
  top: 3,
  left: '30%',
  width: '70%',
  height: '100%-6',
  border: { type: 'line' },
  content: '{center}Main Content{/center}',
  tags: true
});

const footer = new tui.Box({
  parent: screen,
  bottom: 0,
  width: '100%',
  height: 3,
  content: '{center}Status Bar{/center}',
  style: { fg: 'white', bg: 'blue' }
});

sidebar.on('select', (item) => {
  content.setContent(\`{center}{bold}\${item.getText()}{/bold}{/center}\`);
  screen.render();
});

sidebar.focus();
screen.render();`,
  },
  {
    id: "table",
    title: "Data Table",
    description: "Display tabular data with headers and rows",
    code: `// Interactive data table
const table = new tui.Table({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '80%',
  height: '80%',
  border: { type: 'line' },
  style: {
    border: { fg: 'cyan' },
    header: { fg: 'white', bold: true },
    cell: { fg: 'white' }
  },
  keys: true,
  mouse: true,
  data: {
    headers: ['ID', 'Name', 'Status', 'Progress'],
    data: [
      ['1', 'Task Alpha', 'Active', '75%'],
      ['2', 'Task Beta', 'Pending', '30%'],
      ['3', 'Task Gamma', 'Complete', '100%'],
      ['4', 'Task Delta', 'Active', '50%'],
      ['5', 'Task Epsilon', 'Active', '90%']
    ]
  }
});

table.focus();
screen.render();`,
  },
  {
    id: "form",
    title: "Input Form",
    description: "Create interactive forms with text inputs and buttons",
    code: `// Interactive form with inputs
const form = new tui.Form({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '60%',
  label: ' {bold}User Registration{/bold} ',
  tags: true,
  border: { type: 'line' },
  keys: true
});

const nameInput = new tui.Textbox({
  parent: form,
  top: 2,
  left: 2,
  width: '80%',
  height: 3,
  label: ' Name: ',
  border: { type: 'line' },
  inputOnFocus: true
});

const emailInput = new tui.Textbox({
  parent: form,
  top: 6,
  left: 2,
  width: '80%',
  height: 3,
  label: ' Email: ',
  border: { type: 'line' },
  inputOnFocus: true
});

const submitBtn = new tui.Button({
  parent: form,
  top: 10,
  left: 2,
  width: 20,
  height: 3,
  content: 'Submit',
  style: {
    bg: 'green',
    fg: 'white',
    focus: { bg: 'cyan' }
  }
});

submitBtn.on('press', () => {
  // Handle form submission
  screen.render();
});

form.focus();
screen.render();`,
  },
  {
    id: "progress",
    title: "Progress Bars",
    description: "Animated progress indicators and loading states",
    code: `// Animated progress bars
const boxes = [];
const bars = [];

for (let i = 0; i < 3; i++) {
  const box = new tui.Box({
    parent: screen,
    top: 3 + (i * 6),
    left: 'center',
    width: '70%',
    height: 5,
    border: { type: 'line' },
    label: \` Task \${i + 1} \`
  });

  const bar = new tui.ProgressBar({
    parent: box,
    top: 1,
    left: 1,
    width: '100%-2',
    height: 1,
    filled: 0,
    style: {
      bar: { bg: 'cyan' },
      bg: 'black'
    }
  });

  boxes.push(box);
  bars.push(bar);
}

// Animate progress
let progress = 0;
const interval = setInterval(() => {
  progress += 5;
  bars.forEach((bar, i) => {
    bar.setProgress(Math.min(100, progress + (i * 10)));
  });
  screen.render();

  if (progress >= 100) clearInterval(interval);
}, 100);

screen.render();`,
  },
  {
    id: "ascii-art",
    title: "ASCII Art",
    description: "Display big text and ASCII art graphics",
    code: `// ASCII art and big text
const title = new tui.BigText({
  parent: screen,
  top: 2,
  left: 'center',
  width: '90%',
  height: 10,
  content: 'UNBLESSED',
  style: {
    fg: 'cyan',
    bold: true
  }
});

const subtitle = new tui.Box({
  parent: screen,
  top: 13,
  left: 'center',
  width: '60%',
  height: 3,
  content: '{center}Modern Terminal UI Library{/center}',
  tags: true,
  style: { fg: 'white' }
});

const features = new tui.List({
  parent: screen,
  top: 17,
  left: 'center',
  width: '50%',
  height: 8,
  border: { type: 'line' },
  label: ' Features ',
  style: {
    border: { fg: 'cyan' },
    item: { fg: 'green' }
  },
  items: [
    '✓ TypeScript Support',
    '✓ Cross-Platform',
    '✓ 100% blessed Compatible',
    '✓ Browser Support'
  ]
});

screen.render();`,
  },
];

interface Size {
  width: number;
  height: number;
}

export default function LiveDemo() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const screen = useRef<any>(null);
  const [activeExample, setActiveExample] = useState<string>(
    CODE_EXAMPLES[0].id,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [editorCode, setEditorCode] = useState<string>(CODE_EXAMPLES[0].code);
  const [editorZIndex, setEditorZIndex] = useState(1);
  const [terminalZIndex, setTerminalZIndex] = useState(2);

  useEffect(() => {
    if (!terminalRef.current || terminal.current) return;

    // Initialize terminal
    terminal.current = new Terminal({
      cursorBlink: false,
      fontSize: 13,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
      theme: {
        background: "#0a0a0a",
        foreground: "#d4d4d4",
        cursor: "#d4d4d4",
        black: "#1e1e1e",
        red: "#f48771",
        green: "#0dbc79",
        yellow: "#e5c07b",
        blue: "#61afef",
        magenta: "#c678dd",
        cyan: "#56b6c2",
        white: "#d4d4d4",
        brightBlack: "#5c6370",
        brightRed: "#f48771",
        brightGreen: "#0dbc79",
        brightYellow: "#e5c07b",
        brightBlue: "#61afef",
        brightMagenta: "#c678dd",
        brightCyan: "#56b6c2",
        brightWhite: "#d4d4d4",
      },
      rows: 25,
      cols: 100,
    });

    fitAddon.current = new FitAddon();
    terminal.current.loadAddon(fitAddon.current);
    terminal.current.open(terminalRef.current);
    fitAddon.current.fit();

    // Handle resize
    const handleResize = () => {
      if (fitAddon.current && terminal.current) {
        fitAddon.current.fit();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (screen.current) {
        screen.current.destroy();
      }
      if (terminal.current) {
        terminal.current.dispose();
      }
    };
  }, []);

  const cleanup = useCallback(() => {
    if (screen.current) {
      screen.current.destroy();
      screen.current = null;
    }
  }, []);

  const runDemo = useCallback(
    async (code: string) => {
      try {
        cleanup();

        if (!terminal.current) return;

        terminal.current.clear();
        const tui = await import("@unblessed/browser");

        screen.current = new tui.Screen({ terminal: terminal.current });

        // Execute user code
        const userFunction = new Function(
          "tui",
          "screen",
          code.replace(/import.*from.*['"];?\s*/g, ""),
        );
        await userFunction(tui, screen.current);

        setIsLoaded(true);
      } catch (error) {
        console.error("Error running demo:", error);
        if (terminal.current) {
          terminal.current.write(
            `\r\n\x1b[31mError: ${error.message}\x1b[0m\r\n`,
          );
        }
      }
    },
    [cleanup],
  );

  // Run demo when terminal is ready
  useEffect(() => {
    if (terminal.current && !isLoaded) {
      const example = CODE_EXAMPLES.find((e) => e.id === activeExample);
      if (example) {
        runDemo(example.code);
      }
    }
  }, [runDemo, isLoaded, activeExample]);

  const handleExampleClick = (exampleId: string) => {
    if (exampleId === activeExample || isTransitioning) return;

    setIsTransitioning(true);

    // Fade out transition
    setTimeout(() => {
      setActiveExample(exampleId);
      const example = CODE_EXAMPLES.find((e) => e.id === exampleId);
      if (example) {
        setEditorCode(example.code);
        runDemo(example.code);
      }

      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  // Handle terminal resize
  const handleTerminalResize = useCallback(() => {
    setTimeout(() => {
      if (fitAddon.current && terminal.current) {
        fitAddon.current.fit();
      }
    }, 0);
  }, []);

  // Handle editor code change
  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (value !== undefined) {
        setEditorCode(value);
        runDemo(value);
      }
    },
    [runDemo],
  );

  // Bring editor to front
  const handleEditorFocus = useCallback(() => {
    setEditorZIndex(Math.max(editorZIndex, terminalZIndex) + 1);
  }, [editorZIndex, terminalZIndex]);

  // Bring terminal to front
  const handleTerminalFocus = useCallback(() => {
    setTerminalZIndex(Math.max(editorZIndex, terminalZIndex) + 1);
  }, [editorZIndex, terminalZIndex]);

  return (
    <div className="desktop-demo">
      <div className="desktop-background">
        {/* Animated gradient background */}
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="desktop-content">
        <h1 className="desktop-title">
          <span className="title-gradient">unblessed</span>
        </h1>
        <p className="desktop-subtitle">
          Modern, TypeScript-first terminal UI library for Node.js and browsers
        </p>

        {/* Split view: Editor and Terminal */}
        <div className="split-view-container">
          {/* Code Editor Box - 40% */}
          <div className="editor-box-container">
            <DraggableResizableBox
              responsive={true}
              className="editor-box"
              zIndex={editorZIndex}
              onFocus={handleEditorFocus}
              header={
                <>
                  <div className="window-title">Code Editor</div>
                  <div className="window-status">
                    <span className="status-indicator">● TypeScript</span>
                  </div>
                </>
              }
            >
              <div className="editor-container">
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  value={editorCode}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    renderLineHighlight: 'all',
                    tabSize: 2,
                  }}
                />
              </div>
            </DraggableResizableBox>
          </div>

          {/* Terminal Box - 60% */}
          <div className="terminal-box-container">
            <DraggableResizableBox
              responsive={true}
              className={`terminal-box ${isTransitioning ? "transitioning" : ""}`}
              zIndex={terminalZIndex}
              onFocus={handleTerminalFocus}
              onSizeChange={handleTerminalResize}
              header={
                <>
                  <div className="window-title">
                    {CODE_EXAMPLES.find((e) => e.id === activeExample)?.title ||
                      "Terminal"}
                  </div>
                  <div className="window-status">
                    {isLoaded && <span className="status-indicator">● Live</span>}
                  </div>
                </>
              }
            >
              <div className="terminal-container" ref={terminalRef} />
            </DraggableResizableBox>
          </div>
        </div>

        {/* Code snippet previews */}
        <div className="code-snippets">
          {CODE_EXAMPLES.map((example, index) => (
            <div
              key={example.id}
              className={`snippet-card ${activeExample === example.id ? "active" : ""}`}
              onClick={() => handleExampleClick(example.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="snippet-header">
                <h3>{example.title}</h3>
                {activeExample === example.id && (
                  <span className="active-badge">Active</span>
                )}
              </div>
              <p className="snippet-description">{example.description}</p>
              <div className="snippet-preview">
                <code>
                  {example.code.split("\n").slice(0, 3).join("\n")}...
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
