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
        await onError("Runtime Error", error);
      }
    },
    [cleanup, terminal, screen, onError],
  );

  return { runDemo, isLoaded, setIsLoaded, lastExecutedCodeRef, cleanup };
}
