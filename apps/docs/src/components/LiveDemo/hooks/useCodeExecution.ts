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

        // Parse export statements to track what should be attached to screen
        const exportedNames = new Set<string>();

        // Match: export const foo = ...
        const exportConstMatches = code.matchAll(/export\s+const\s+(\w+)\s*=/g);
        for (const match of exportConstMatches) {
          exportedNames.add(match[1]);
        }

        // Match: export { foo, bar }
        const exportBlockMatches = code.matchAll(/export\s*\{([^}]+)\}/g);
        for (const match of exportBlockMatches) {
          const names = match[1].split(",").map((n) => n.trim());
          names.forEach((name) => exportedNames.add(name));
        }

        // Remove import statements and export keywords
        let cleanCode = code
          .replace(/import.*from.*['"];?\s*/g, "")
          .replace(/export\s+const\s+/g, "const ")
          .replace(/export\s*\{[^}]+\}\s*;?\s*/g, "");

        // Build scope with tui namespace and individual imports
        const scope: Record<string, any> = {
          tui, // Keep tui for backward compatibility
        };

        // Add each imported widget to scope
        for (const name of importedNames) {
          if (name in tui) {
            scope[name] = (tui as any)[name];
          }
        }

        // Add return statement to capture exported values
        if (exportedNames.size > 0) {
          const exportVars = Array.from(exportedNames).join(", ");
          cleanCode += `\n\nreturn { ${exportVars} };`;
        }

        // Create function with dynamic scope
        const paramNames = Object.keys(scope);
        const paramValues = Object.values(scope);
        const userFunction = new Function(...paramNames, cleanCode);

        const exports = await userFunction(...paramValues);

        // Attach all exported components to screen
        if (exports) {
          for (const [name, component] of Object.entries(exports)) {
            if (component && typeof component === "object") {
              screen.current.append(component);
            }
          }
        }

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
