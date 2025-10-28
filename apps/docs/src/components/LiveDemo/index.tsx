import React, { useEffect, useState, useCallback } from "react";
import DraggableResizableBox from "../DraggableResizableBox";
import CodeSnippetsCarousel from "../CodeSnippetsCarousel";
import CodeEditor from "./components/CodeEditor";
import TerminalView from "./components/TerminalView";
import { useTerminal } from "./hooks/useTerminal";
import { useCodeExecution } from "./hooks/useCodeExecution";
import { displayError } from "./utils/errorDisplay";
import { validateSyntax } from "./utils/prettier";
import { CODE_EXAMPLES } from "./data/examples";
import "xterm/css/xterm.css";
import "./styles.css";

export default function LiveDemo() {
  const terminalRef = React.useRef<HTMLDivElement>(null);
  const { terminal, screen, fit } = useTerminal(terminalRef);

  const [activeExample, setActiveExample] = useState<string>(
    CODE_EXAMPLES[0].id,
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [editorCode, setEditorCode] = useState<string>(CODE_EXAMPLES[0].code);
  const [editorZIndex, setEditorZIndex] = useState(1);
  const [terminalZIndex, setTerminalZIndex] = useState(2);

  // Error display handler
  const handleError = useCallback(
    async (
      errorType: "Syntax Error" | "Runtime Error",
      error: Error,
      code?: string,
    ) => {
      await displayError(
        terminal.current,
        screen,
        () => {
          if (screen.current) {
            screen.current.destroy();
            screen.current = null;
          }
        },
        errorType,
        error,
        code,
      );
    },
    [terminal, screen],
  );

  const { runDemo, isLoaded, lastExecutedCodeRef, setIsLoaded } =
    useCodeExecution(terminal, screen, handleError);

  // Run demo when terminal is ready
  useEffect(() => {
    if (terminal.current && !isLoaded) {
      const example = CODE_EXAMPLES.find((e) => e.id === activeExample);
      if (example) {
        runDemo(example.code);
      }
    }
  }, [runDemo, isLoaded, activeExample, terminal]);

  // Handle example selection
  const handleExampleClick = (exampleId: string) => {
    if (exampleId === activeExample || isTransitioning) return;

    setActiveExample(exampleId);
    setIsTransitioning(true);

    const example = CODE_EXAMPLES.find((e) => e.id === exampleId);
    if (example) {
      setEditorCode(example.code);
    }

    // Defer heavy work to next frame to allow UI to update
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (example) {
          runDemo(example.code).finally(() => {
            setIsTransitioning(false);
          });
        } else {
          setIsTransitioning(false);
        }
      });
    });
  };

  // Handle editor code change with validation
  const handleEditorChange = useCallback(
    async (value: string | undefined) => {
      if (value !== undefined) {
        try {
          // Validate syntax with Prettier
          const { isValid, formatted, error } = await validateSyntax(value);

          if (!isValid && error) {
            // Display syntax error
            await handleError("Syntax Error", error, value);
            return;
          }

          // Only run demo if formatted code changed from last execution
          if (formatted && formatted !== lastExecutedCodeRef.current) {
            lastExecutedCodeRef.current = formatted;
            runDemo(value);
          }
        } catch (error: any) {
          console.error("Syntax error detected:", error);
          await handleError("Syntax Error", error, value);
        }
      }
    },
    [runDemo, handleError, lastExecutedCodeRef],
  );

  // Handle terminal resize
  const handleTerminalResize = useCallback(() => {
    setTimeout(() => fit(), 0);
  }, [fit]);

  // Z-index management
  const handleEditorFocus = useCallback(() => {
    setEditorZIndex(Math.max(editorZIndex, terminalZIndex) + 1);
  }, [editorZIndex, terminalZIndex]);

  const handleTerminalFocus = useCallback(() => {
    setTerminalZIndex(Math.max(editorZIndex, terminalZIndex) + 1);
  }, [editorZIndex, terminalZIndex]);

  return (
    <div className="desktop-demo">
      <div className="desktop-background">
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

        <div className="split-view-container">
          {/* Code Editor Box */}
          <div className="editor-box-container">
            <DraggableResizableBox
              responsive={true}
              className="editor-box"
              zIndex={editorZIndex}
              onFocus={handleEditorFocus}
              header={
                <div className="window-title">
                  {CODE_EXAMPLES.find((e) => e.id === activeExample)?.title ||
                    "Code Editor"}
                </div>
              }
            >
              <CodeEditor
                value={editorCode}
                onChange={handleEditorChange}
                title={
                  CODE_EXAMPLES.find((e) => e.id === activeExample)?.title ||
                  "Code Editor"
                }
              />
            </DraggableResizableBox>
          </div>

          {/* Terminal Box */}
          <div className="terminal-box-container">
            <DraggableResizableBox
              responsive={true}
              className={`terminal-box ${isTransitioning ? "transitioning" : ""}`}
              zIndex={terminalZIndex}
              onFocus={handleTerminalFocus}
              onSizeChange={handleTerminalResize}
              header={
                <>
                  <div className="window-title">Terminal</div>
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

        <CodeSnippetsCarousel
          examples={CODE_EXAMPLES}
          activeExampleId={activeExample}
          onExampleClick={handleExampleClick}
        />
      </div>
    </div>
  );
}
