import type { Terminal } from "xterm";

export async function displayError(
  terminal: Terminal | null,
  screen: React.MutableRefObject<any>,
  cleanup: () => void,
  errorType: "Syntax Error" | "Runtime Error",
  error: Error,
  code?: string,
) {
  try {
    cleanup();

    if (!terminal) return;

    terminal.clear();
    const tui = await import("@unblessed/browser");

    screen.current = new tui.Screen({ terminal });

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

        const codeBox = new tui.Box({
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
    if (terminal) {
      terminal.write(`\r\n\x1b[31m${errorType}: ${error.message}\x1b[0m\r\n`);
    }
  }
}
