import React, { useRef, useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { formatCode } from "../utils/prettier";

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  title: string;
}

export default function CodeEditor({
  value,
  onChange,
  title,
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const [needsFormatting, setNeedsFormatting] = useState(false);

  const handleEditorMount = useCallback(async (editor: any, monaco: any) => {
    editorRef.current = editor;

    try {
      // Register Prettier formatter
      monaco.languages.registerDocumentFormattingEditProvider("typescript", {
        async provideDocumentFormattingEdits(model: any) {
          try {
            const text = model.getValue();
            const formatted = await formatCode(text);
            return [{ range: model.getFullModelRange(), text: formatted }];
          } catch (error) {
            console.error("Prettier formatting error:", error);
            return [];
          }
        },
      });

      // Add types from @unblessed/browser
      try {
        const res = await fetch(
          "https://unpkg.com/@unblessed/browser/dist/index.d.ts",
        );
        const types = await res.text();
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          types,
          "file:///node_modules/@unblessed/browser/index.d.ts",
        );
      } catch (error) {
        console.error("Failed to fetch @unblessed/browser types:", error);
      }

      // Add Cmd+S / Ctrl+S for format
      editor.addAction({
        id: "format-and-save",
        label: "Format Document",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: async (ed: any) => {
          await ed.getAction("editor.action.formatDocument").run();
        },
      });

      // Listen for content changes to detect if formatting is needed
      editor.onDidChangeModelContent(() => {
        const newValue = editor.getValue();
        if (newValue !== value) {
          checkFormatting(newValue);
        }
      });
    } catch (error) {
      console.error("Failed to configure Monaco Editor:", error);
    }
  }, [value]);

  const checkFormatting = useCallback(async (code: string) => {
    try {
      const formatted = await formatCode(code);
      setNeedsFormatting(formatted !== code);
    } catch {
      setNeedsFormatting(false);
    }
  }, []);

  const handleFormatClick = useCallback(async () => {
    if (!editorRef.current) return;

    try {
      const currentCode = editorRef.current.getValue();
      const formatted = await formatCode(currentCode);
      editorRef.current.setValue(formatted);
      setNeedsFormatting(false);
    } catch (error) {
      console.error("Prettier error:", error);
    }
  }, []);

  return (
    <div className="editor-container">
      {needsFormatting && (
        <button
          className="format-button"
          onClick={handleFormatClick}
          title="Format code (Cmd+S)"
          aria-label="Format code"
        >
          {"{}"}
        </button>
      )}
      <Editor
        height="100%"
        defaultLanguage="typescript"
        value={value}
        onChange={onChange}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          tabSize: 2,
        }}
      />
    </div>
  );
}
