import React, { useEffect, useRef, useState, useCallback } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import Editor from "@monaco-editor/react";
import DraggableResizableBox from "../DraggableResizableBox";
import CodeSnippetsCarousel from "../CodeSnippetsCarousel";
import * as prettier from "prettier/standalone";
import * as parserTypeScript from "prettier/plugins/typescript";
import * as parserEstree from "prettier/plugins/estree";
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
  const editorRef = useRef<any>(null);
  const [needsFormatting, setNeedsFormatting] = useState(false);
  const lastExecutedCodeRef = useRef<string>("");

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

  // Display error with a fun unblessed UI
  const displayError = useCallback(
    async (
      errorType: "Syntax Error" | "Runtime Error",
      error: Error,
      code?: string,
    ) => {
      try {
        cleanup();

        if (!terminal.current) return;

        terminal.current.clear();
        const tui = await import("@unblessed/browser");

        screen.current = new tui.Screen({ terminal: terminal.current });

        // Main error container
        const errorBox = new tui.Box({
          parent: screen.current,
          top: "center",
          left: "center",
          width: "90%",
          height: "90%",
          border: { type: "line" },
          style: {
            fg: "white",
            border: { fg: "red" },
          },
          label: ` {bold}{red-fg}⚠ ${errorType}{/red-fg}{/bold} `,
          tags: true,
        });

        // ASCII art header
        const header = new tui.Box({
          parent: errorBox,
          top: 1,
          left: "center",
          width: "80%",
          height: 7,
          content:
            "{center}{red-fg}{bold}" +
            "    ___                       \n" +
            "   / _ \\ ___   ___  _ __  ___ \n" +
            "  | | | / _ \\ / _ \\| '_ \\/ __|\n" +
            "  | |_| | (_) | (_) | |_) \\__ \\\n" +
            "   \\___/ \\___/ \\___/| .__/|___/\n" +
            "                    |_|        {/bold}{/red-fg}" +
            "{/center}",
          tags: true,
          style: { fg: "red" },
        });

        // Funny message
        const funnyMessages = [
          "Well, that didn't go as planned... 🤷",
          "Houston, we have a problem... 🚀",
          "Oops! Someone divided by zero... 🔢",
          "The code gremlins strike again! 👹",
          "Error 404: Success not found... 🔍",
          "This is why we can't have nice things... 🎭",
          "Plot twist: The code was the villain all along... 🎬",
          "Achievement unlocked: Break the code! 🏆",
        ];

        const funnyMessage = new tui.Box({
          parent: errorBox,
          top: 8,
          left: "center",
          width: "80%",
          height: 3,
          content: `{center}{yellow-fg}${funnyMessages[Math.floor(Math.random() * funnyMessages.length)]}{/yellow-fg}{/center}`,
          tags: true,
          style: { fg: "yellow" },
        });

        // Error type and message
        const errorInfo = new tui.Box({
          parent: errorBox,
          top: 11,
          left: 2,
          right: 2,
          height: 5,
          border: { type: "line" },
          style: {
            border: { fg: "yellow" },
          },
          label: " {bold}{yellow-fg}Error Details{/yellow-fg}{/bold} ",
          tags: true,
          content: `{bold}Type:{/bold} ${errorType}\n\n{bold}Message:{/bold} ${error.message}`,
        });

        // Code snippet if available (for syntax errors)
        let codeBox;
        if (code && errorType === "Syntax Error") {
          const match = error.message.match(/\((\d+):(\d+)\)/);
          if (match) {
            const lineNum = parseInt(match[1]);
            const colNum = parseInt(match[2]);
            const lines = code.split("\n");
            const contextLines = 2;
            const startLine = Math.max(0, lineNum - contextLines - 1);
            const endLine = Math.min(lines.length, lineNum + contextLines);

            let snippet = "";
            for (let i = startLine; i < endLine; i++) {
              const lineNo = String(i + 1).padStart(3, " ");
              const prefix =
                i === lineNum - 1
                  ? `{red-fg}▶ ${lineNo}{/red-fg}`
                  : `  ${lineNo}`;
              const line = lines[i] || "";
              snippet += `${prefix} │ ${line}\n`;

              if (i === lineNum - 1) {
                const pointer = " ".repeat(7 + colNum) + "{red-fg}^{/red-fg}";
                snippet += `${pointer}\n`;
              }
            }

            codeBox = new tui.Box({
              parent: errorBox,
              top: 17,
              left: 2,
              right: 2,
              height: Math.min(12, endLine - startLine + 3),
              border: { type: "line" },
              style: {
                border: { fg: "cyan" },
              },
              label: " {bold}{cyan-fg}Code Location{/cyan-fg}{/bold} ",
              tags: true,
              content: snippet,
              scrollable: true,
              mouse: true,
            });
          }
        }

        // Help message
        const helpBox = new tui.Box({
          parent: errorBox,
          bottom: 1,
          left: "center",
          width: "80%",
          height: 3,
          content:
            "{center}{green-fg}{bold}💡 Tip:{/bold} Fix the error in the code editor and save (Cmd+S) to try again{/green-fg}{/center}",
          tags: true,
          style: { fg: "green" },
        });

        screen.current.render();
      } catch (displayError) {
        console.error("Error displaying error screen:", displayError);
        // Fallback to plain text error
        if (terminal.current) {
          terminal.current.write(
            `\r\n\x1b[31m${errorType}: ${error.message}\x1b[0m\r\n`,
          );
        }
      }
    },
    [cleanup],
  );

  // Configure Monaco Editor with unblessed types
  const handleEditorMount = useCallback(async (editor: any, monaco: any) => {
    editorRef.current = editor;

    try {
      // Fetch type definitions from static folder
      const [browserTypes, coreTypes] = await Promise.all([
        fetch("/types/browser.d.ts").then((r) => r.text()).catch(() => ""),
        fetch("/types/core.d.ts").then((r) => r.text()).catch(() => ""),
      ]);

      // Add types to Monaco's TypeScript compiler
      if (browserTypes) {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          browserTypes,
          "file:///node_modules/@unblessed/browser/index.d.ts",
        );
      }

      if (coreTypes) {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          coreTypes,
          "file:///node_modules/@unblessed/core/index.d.ts",
        );
      }

      // Add global screen variable
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `declare const screen: import('@unblessed/browser').Screen;`,
        "file:///globals.d.ts",
      );

      // Register Prettier formatter
      monaco.languages.registerDocumentFormattingEditProvider("typescript", {
        async provideDocumentFormattingEdits(model: any) {
          try {
            const text = model.getValue();
            const formatted = await prettier.format(text, {
              parser: "typescript",
              plugins: [parserTypeScript, parserEstree],
            });
            return [{ range: model.getFullModelRange(), text: formatted }];
          } catch (error) {
            console.error("Prettier formatting error:", error);
            return [];
          }
        },
      });

      // Add Cmd+S / Ctrl+S for format
      editor.addAction({
        id: "format-and-save",
        label: "Format Document",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: async (ed: any) => {
          await ed.getAction("editor.action.formatDocument").run();
        },
      });

      // Listen for formatting events to update state
      editor.onDidChangeModelContent(() => {
        const newValue = editor.getValue();
        if (newValue !== editorCode) {
          setEditorCode(newValue);
        }
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
      } catch (error: any) {
        console.error("Runtime error:", error);

        // Display runtime error in terminal with unblessed UI
        displayError("Runtime Error", error);
      }
    },
    [cleanup, displayError],
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
          // Try to format the code to check for syntax errors
          const formatted = await prettier.format(value, {
            parser: "typescript",
            plugins: [parserTypeScript, parserEstree],
          });

          // Check if needs formatting
          setNeedsFormatting(formatted !== value);

          // Only run demo if formatted code changed from last execution
          if (formatted !== lastExecutedCodeRef.current) {
            lastExecutedCodeRef.current = formatted;
            runDemo(value);
          }
        } catch (error: any) {
          // Syntax error detected by Prettier
          console.error("Syntax error detected:", error);
          setNeedsFormatting(false);

          // Display syntax error in terminal with unblessed UI
          displayError("Syntax Error", error, value);
        }
      }
    },
    [runDemo, displayError],
  );

  // Format code manually
  const formatCode = useCallback(async () => {
    if (!editorRef.current) return;

    try {
      const currentCode = editorRef.current.getValue();
      const formatted = await prettier.format(currentCode, {
        parser: "typescript",
        plugins: [parserTypeScript, parserEstree],
      });

      editorRef.current.setValue(formatted);
      setNeedsFormatting(false);
    } catch (error) {
      console.error("Prettier error:", error);
    }
  }, []);

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
                {needsFormatting && (
                  <button
                    className="format-button"
                    onClick={formatCode}
                    title="Format code (Cmd+S)"
                    aria-label="Format code"
                  >
                    {"{}"}
                  </button>
                )}
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
        <CodeSnippetsCarousel
          examples={CODE_EXAMPLES}
          activeExampleId={activeExample}
          onExampleClick={handleExampleClick}
        />
      </div>
    </div>
  );
}
