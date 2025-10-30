import { useCallback, useRef, useState } from "react";
import type { Terminal } from "xterm";

type ErrorDisplayFn = (
  errorType: "Syntax Error" | "Runtime Error",
  error: Error,
  code?: string,
) => Promise<void>;

export function useCodeExecution(
  terminal: React.RefObject<Terminal | null>,
  screen: React.RefObject<any>,
  onError: ErrorDisplayFn,
) {
  const [isLoaded, setIsLoaded] = useState(false);
  const lastExecutedCodeRef = useRef<string>("");

  const cleanup = useCallback(() => {
    if (screen.current) {
      screen.current.destroy();
      screen.current = null;
    }
  }, [screen]);

  const runDemo = useCallback(
    async (code: string) => {
      try {
        cleanup();

        if (!terminal.current) return;

        terminal.current.clear();
        const tui = await import("@unblessed/browser");

        screen.current = new tui.Screen({ terminal: terminal.current });

        // Parse import statements to extract requested widgets (handles multi-line)
        const importMatches = code.matchAll(
          /import\s*\{([^}]+)\}\s*from\s*['"]@unblessed\/browser['"]/gs,
        );
        const importedNames = new Set<string>();

        for (const match of importMatches) {
          // Split by comma and handle line breaks
          const names = match[1]
            .split(",")
            .map((n) => n.trim())
            .filter((n) => n.length > 0);
          names.forEach((name) => importedNames.add(name));
        }

        // Remove import and export statements (handles multi-line)
        let cleanCode = code
          .replace(/import\s*\{[^}]+\}\s*from\s*['"][^'"]+['"];?\s*/gs, "")
          .replace(/export\s+const\s+/g, "const ")
          .replace(/export\s+/g, "")
          .replace(/export\s*\{[^}]+\}\s*;?\s*/g, "");

        // Build scope with screen and individual imports
        const scope: Record<string, any> = {
          screen: screen.current,
          tui,
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

        // Render the screen
        screen.current.render();

        setIsLoaded(true);
      } catch (error: any) {
        console.error("Runtime error:", error);

        // Display runtime error in terminal with unblessed UI
        await onError("Runtime Error", error);
      }
    },
    [cleanup, terminal, screen, onError],
  );

  return { runDemo, isLoaded, setIsLoaded, lastExecutedCodeRef, cleanup };
}
