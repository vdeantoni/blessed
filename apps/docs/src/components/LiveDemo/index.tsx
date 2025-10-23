import React, { useEffect, useRef, useState, useCallback } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import Editor from "@monaco-editor/react";
import DraggableResizableBox from "../DraggableResizableBox";
import prettier from "prettier/standalone";
import parserTypeScript from "prettier/parser-typescript";
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

screen.render();
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
  screen.render();
});

list.focus();
screen.render();
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
screen.render();
`,
  },
  {
    id: "form",
    title: "Input Form",
    description: "Create interactive forms with text inputs and buttons",
    code: `import { Form, Textbox, Button, Box } from "@unblessed/browser";

// Interactive form with inputs
const form = new Form({
  parent: screen,
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
  screen.render();
});

form.focus();
screen.render();
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

  screen.render();
}, 100);

screen.render();
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
  screen.render();
});

sidebar.focus();
screen.render();
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
  width: "90%",
  height: 10,
  content: "UNBLESSED",
  style: {
    fg: "cyan",
    bold: true,
  },
});

const subtitle = new Box({
  parent: screen,
  top: 13,
  left: "center",
  width: "60%",
  height: 3,
  content: "{center}Modern Terminal UI Library{/center}",
  tags: true,
  style: { fg: "white" },
});

const features = new List({
  parent: screen,
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

screen.render();
`,
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

  // Configure Monaco Editor with unblessed types
  const handleEditorMount = useCallback(async (editor: any, monaco: any) => {
    try {
      // Declare @unblessed/browser module with core widget types
      const unblessedTypes = `
declare module '@unblessed/browser' {
  export interface NodeOptions {
    screen?: Screen;
    parent?: Node;
    children?: Node[];
    left?: number | string;
    right?: number | string;
    top?: number | string;
    bottom?: number | string;
    width?: number | string;
    height?: number | string;
  }

  export interface Style {
    fg?: string;
    bg?: string;
    bold?: boolean;
    underline?: boolean;
    blink?: boolean;
    inverse?: boolean;
    invisible?: boolean;
    border?: {
      fg?: string;
      bg?: string;
    };
    scrollbar?: {
      fg?: string;
      bg?: string;
    };
    focus?: Style;
    selected?: Style;
    item?: Style;
    bar?: Style;
    header?: Style;
    cell?: Style;
  }

  export interface ElementOptions extends NodeOptions {
    style?: Style;
    border?: 'line' | 'bg' | { type: 'line' | 'bg' };
    padding?: number | { left?: number; right?: number; top?: number; bottom?: number };
    tags?: boolean;
    content?: string;
    clickable?: boolean;
    input?: boolean;
    keyable?: boolean;
    focused?: any;
    hidden?: boolean;
    label?: string;
    align?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
    shrink?: boolean;
    draggable?: boolean;
    scrollable?: boolean;
    mouse?: boolean;
    keys?: boolean;
    vi?: boolean;
  }

  export class Screen {
    constructor(options?: any);
    render(): void;
    destroy(): void;
    key(keys: string | string[], listener: (ch: any, key: any) => void): void;
    on(event: string, listener: (...args: any[]) => void): void;
  }

  export class Node {
    constructor(options?: NodeOptions);
    screen: Screen;
    parent?: Node;
    children: Node[];
    on(event: string, listener: (...args: any[]) => void): void;
    emit(event: string, ...args: any[]): void;
  }

  export class Element extends Node {
    constructor(options?: ElementOptions);
    render(): void;
    focus(): void;
    setContent(content: string): void;
  }

  export class Box extends Element {
    constructor(options?: ElementOptions);
  }

  export class Text extends Element {
    constructor(options?: ElementOptions);
  }

  export interface ListOptions extends ElementOptions {
    items?: string[];
    selected?: number;
  }

  export class List extends Box {
    constructor(options?: ListOptions);
    select(index: number): void;
    focus(): void;
  }

  export interface TableOptions extends ElementOptions {
    data?: string[][];
  }

  export class Table extends Box {
    constructor(options?: TableOptions);
    setData(data: string[][]): void;
  }

  export interface FormOptions extends ElementOptions {
    keys?: boolean;
  }

  export class Form extends Box {
    constructor(options?: FormOptions);
    submit(): void;
    on(event: 'submit', listener: (data: any) => void): void;
  }

  export interface InputOptions extends ElementOptions {
    name?: string;
    value?: string;
    inputOnFocus?: boolean;
  }

  export class Textbox extends Element {
    constructor(options?: InputOptions);
    getValue(): string;
    setValue(value: string): void;
    readInput(callback?: (err: any, value: string) => void): void;
  }

  export class Textarea extends Textbox {
    constructor(options?: InputOptions);
  }

  export interface ButtonOptions extends ElementOptions {
    content?: string;
  }

  export class Button extends Element {
    constructor(options?: ButtonOptions);
    on(event: 'press', listener: () => void): void;
    press(): void;
  }

  export interface ProgressBarOptions extends ElementOptions {
    filled?: number;
    pch?: string;
  }

  export class ProgressBar extends Element {
    constructor(options?: ProgressBarOptions);
    setProgress(percent: number): void;
  }

  export class BigText extends Box {
    constructor(options?: ElementOptions);
  }
}

declare const screen: import('@unblessed/browser').Screen;
`;

      // Add the type definitions to Monaco's TypeScript compiler
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        unblessedTypes,
        "ts:filename/unblessed.d.ts",
      );

      // Configure compiler options
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        noEmit: true,
        esModuleInterop: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
        allowJs: true,
        typeRoots: ["node_modules/@types"],
      });

      // Enable diagnostics and suggestions
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
        noSuggestionDiagnostics: false,
      });

      // Enable eager model sync for better IntelliSense
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

      // Register Prettier as document formatting provider
      monaco.languages.registerDocumentFormattingEditProvider("typescript", {
        async provideDocumentFormattingEdits(model: any) {
          try {
            const text = model.getValue();
            const formatted = await prettier.format(text, {
              parser: "typescript",
              plugins: [parserTypeScript],
            });

            return [
              {
                range: model.getFullModelRange(),
                text: formatted,
              },
            ];
          } catch (error) {
            console.error("Prettier formatting error:", error);
            return [];
          }
        },
      });

      // Add keyboard shortcut for formatting (Cmd+S / Ctrl+S)
      editor.addAction({
        id: "format-and-save",
        label: "Format Document",
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, // Cmd+S / Ctrl+S
        ],
        run: async (ed: any) => {
          await ed.getAction("editor.action.formatDocument").run();
        },
      });

      // Also support Shift+Alt+F (default format shortcut)
      editor.addAction({
        id: "prettier-format",
        label: "Format with Prettier",
        keybindings: [
          monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
        ],
        run: async (ed: any) => {
          await ed.getAction("editor.action.formatDocument").run();
        },
      });
    } catch (error) {
      console.error("Failed to configure type definitions:", error);
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

        // Parse import statements to extract requested widgets
        const importMatches = code.matchAll(
          /import\s*\{([^}]+)\}\s*from\s*['"]@unblessed\/browser['"]/g,
        );
        const importedNames = new Set<string>();

        for (const match of importMatches) {
          const names = match[1].split(",").map((n) => n.trim());
          names.forEach((name) => importedNames.add(name));
        }

        // Remove import statements
        const cleanCode = code.replace(/import.*from.*['"];?\s*/g, "");

        // Build scope with both tui namespace and individual imports
        const scope: Record<string, any> = {
          screen: screen.current,
          tui, // Keep tui for backward compatibility
        };

        // Add each imported widget to scope
        for (const name of importedNames) {
          if (name in tui) {
            scope[name] = (tui as any)[name];
          }
        }

        // Create function with dynamic scope
        const paramNames = Object.keys(scope);
        const paramValues = Object.values(scope);
        const userFunction = new Function(...paramNames, cleanCode);

        await userFunction(...paramValues);

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
    async (value: string | undefined) => {
      if (value !== undefined) {
        try {
          // Format with Prettier
          const formatted = await prettier.format(value, {
            parser: "typescript",
            plugins: [parserTypeScript],
          });

          // Update editor with formatted code
          setEditorCode(formatted);

          // Run the demo with formatted code
          runDemo(formatted);
        } catch (error) {
          // If formatting fails, just use original value
          console.error("Prettier error:", error);
          setEditorCode(value);
          runDemo(value);
        }
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
                  onMount={handleEditorMount}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily:
                      'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    renderLineHighlight: "all",
                    tabSize: 2,
                    // Enable autocomplete and suggestions
                    quickSuggestions: {
                      other: true,
                      comments: false,
                      strings: false,
                    },
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: "on",
                    tabCompletion: "on",
                    wordBasedSuggestions: "matchingDocuments",
                    suggest: {
                      showMethods: true,
                      showFunctions: true,
                      showConstructors: true,
                      showFields: true,
                      showVariables: true,
                      showClasses: true,
                      showStructs: true,
                      showInterfaces: true,
                      showModules: true,
                      showProperties: true,
                      showKeywords: true,
                      showSnippets: true,
                    },
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
                    {isLoaded && (
                      <span className="status-indicator">● Live</span>
                    )}
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
