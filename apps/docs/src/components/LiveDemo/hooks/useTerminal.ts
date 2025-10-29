import { FitAddon } from "@xterm/addon-fit";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";

export function useTerminal(containerRef: React.RefObject<HTMLDivElement>) {
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const screen = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || terminal.current) return;

    // Initialize terminal
    terminal.current = new Terminal({
      allowProposedApi: true,
      fontSize: 13,
      fontFamily:
        'Monaco, Menlo, "Ubuntu Mono", Consolas, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", monospace',
      cursorBlink: false,
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
    });

    fitAddon.current = new FitAddon();
    terminal.current.loadAddon(fitAddon.current);
    terminal.current.open(containerRef.current);
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
  }, [containerRef]);

  const fit = () => {
    if (fitAddon.current && terminal.current) {
      fitAddon.current.fit();
    }
  };

  return { terminal, screen, fit };
}
