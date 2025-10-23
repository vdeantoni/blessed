import React, { useEffect, useRef, useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import type * as tui from '@unblessed/browser';
import { EXAMPLES, DEFAULT_EXAMPLE } from './examples';
import 'xterm/css/xterm.css';
import './styles.css';

declare global {
  interface Window {
    tui: typeof tui;
  }
}

export default function Playground() {
  const [code, setCode] = useState(EXAMPLES[DEFAULT_EXAMPLE]);
  const [selectedExample, setSelectedExample] = useState(DEFAULT_EXAMPLE);
  const [isRunning, setIsRunning] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const screen = useRef<any>(null);
  const intervals = useRef<number[]>([]);
  const timeouts = useRef<number[]>([]);

  // Initialize terminal
  useEffect(() => {
    if (!terminalRef.current || terminal.current) return;

    terminal.current = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Monaco, Menlo, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#ffffff',
      },
    });

    fitAddon.current = new FitAddon();
    terminal.current.loadAddon(fitAddon.current);
    terminal.current.open(terminalRef.current);
    fitAddon.current.fit();

    // Show welcome message
    terminal.current.writeln('\x1b[1;36m╔══════════════════════════════════════════════╗\x1b[0m');
    terminal.current.writeln('\x1b[1;36m║    unblessed Interactive Playground    ║\x1b[0m');
    terminal.current.writeln('\x1b[1;36m╚══════════════════════════════════════════════╝\x1b[0m');
    terminal.current.writeln('');
    terminal.current.writeln('Select an example or write your own code, then click Run');
    terminal.current.writeln('');

    // Handle window resize
    const handleResize = () => {
      if (fitAddon.current) {
        fitAddon.current.fit();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (terminal.current) {
        terminal.current.dispose();
        terminal.current = null;
      }
    };
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    // Clear timers
    intervals.current.forEach(id => clearInterval(id));
    timeouts.current.forEach(id => clearTimeout(id));
    intervals.current = [];
    timeouts.current = [];

    // Destroy screen
    if (screen.current) {
      try {
        screen.current.destroy();
      } catch (e) {
        // Ignore errors
      }
      screen.current = null;
    }
  }, []);

  // Run code
  const runCode = useCallback(async () => {
    if (!terminal.current || !code.trim()) return;

    setIsRunning(true);
    cleanup();

    // Clear terminal
    terminal.current.clear();

    try {
      // Dynamically import unblessed/browser
      const tuiModule = await import('@unblessed/browser');

      // Create screen
      screen.current = new tuiModule.Screen({
        terminal: terminal.current,
      });

      // Handle quit key
      screen.current.key(['escape', 'q', 'C-c'], () => {
        cleanup();
        terminal.current?.clear();
        terminal.current?.writeln('\x1b[33mScreen cleared. Select an example or modify code, then click Run.\x1b[0m');
      });

      // Wrapped timing functions
      const wrappedSetInterval = (fn: Function, delay: number) => {
        const id = window.setInterval(fn, delay);
        intervals.current.push(id);
        return id;
      };

      const wrappedSetTimeout = (fn: Function, delay: number) => {
        const id = window.setTimeout(fn, delay);
        timeouts.current.push(id);
        return id;
      };

      // Execute user code
      const userFunction = new Function(
        'tui',
        'screen',
        'setInterval',
        'setTimeout',
        'clearInterval',
        'clearTimeout',
        code
      );

      await userFunction(
        tuiModule,
        screen.current,
        wrappedSetInterval,
        wrappedSetTimeout,
        clearInterval,
        clearTimeout
      );
    } catch (error: any) {
      // Display error
      terminal.current?.clear();
      terminal.current?.writeln('\x1b[1;31m╔══════════════════════════════════════════════╗\x1b[0m');
      terminal.current?.writeln('\x1b[1;31m║              ERROR                           ║\x1b[0m');
      terminal.current?.writeln('\x1b[1;31m╚══════════════════════════════════════════════╝\x1b[0m');
      terminal.current?.writeln('');
      terminal.current?.writeln(`\x1b[1;31m${error.message}\x1b[0m`);
      terminal.current?.writeln('');

      if (error.stack) {
        terminal.current?.writeln('\x1b[90mStack trace:\x1b[0m');
        const stackLines = error.stack.split('\n').slice(1, 6);
        stackLines.forEach((line: string) => {
          terminal.current?.writeln(`\x1b[90m${line}\x1b[0m`);
        });
      }

      terminal.current?.writeln('');
      terminal.current?.writeln('\x1b[33mFix the error and click Run again\x1b[0m');
    } finally {
      setIsRunning(false);
    }
  }, [code, cleanup]);

  // Handle example change
  const handleExampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const exampleName = e.target.value;
    if (exampleName && EXAMPLES[exampleName]) {
      setSelectedExample(exampleName);
      setCode(EXAMPLES[exampleName]);
    }
  };

  // Clear terminal
  const handleClear = () => {
    cleanup();
    if (terminal.current) {
      terminal.current.clear();
      terminal.current.writeln('Terminal cleared. Select an example or write code, then click Run.');
    }
  };

  return (
    <div className="playground-wrapper">
      <div className="playground-controls">
        <select
          value={selectedExample}
          onChange={handleExampleChange}
          className="playground-select"
        >
          {Object.keys(EXAMPLES).map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="playground-button playground-button-run"
        >
          {isRunning ? 'Running...' : 'Run'}
        </button>
        <button
          onClick={handleClear}
          className="playground-button playground-button-clear"
        >
          Clear
        </button>
      </div>

      <div className="playground-container">
        <div className="playground-editor">
          <div className="playground-header">Code Editor</div>
          <div className="playground-content">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        <div className="playground-terminal">
          <div className="playground-header">Terminal Output</div>
          <div className="playground-content">
            <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>

      <div className="playground-footer">
        Press <strong>q</strong> or <strong>ESC</strong> to clear the terminal | Use arrow keys and mouse to interact
      </div>
    </div>
  );
}
