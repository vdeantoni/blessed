import React from "react";
import "xterm/css/xterm.css";

interface TerminalViewProps {
  terminalRef: React.RefObject<HTMLDivElement>;
  isLoaded: boolean;
}

export default function TerminalView({
  terminalRef,
  isLoaded,
}: TerminalViewProps) {
  return (
    <>
      <div className="window-title">Terminal</div>
      <div className="window-status">
        {isLoaded && <span className="status-indicator">● Live</span>}
      </div>
      <div className="terminal-container" ref={terminalRef} />
    </>
  );
}
