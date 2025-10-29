import * as parserEstree from "prettier/plugins/estree";
import * as parserTypeScript from "prettier/plugins/typescript";
import * as prettier from "prettier/standalone";

export async function formatCode(code: string): Promise<string> {
  return prettier.format(code, {
    parser: "typescript",
    plugins: [parserTypeScript, parserEstree],
  });
}

export async function validateSyntax(code: string): Promise<{
  isValid: boolean;
  formatted?: string;
  error?: Error;
}> {
  try {
    const formatted = await formatCode(code);
    return { isValid: true, formatted };
  } catch (error) {
    return { isValid: false, error: error as Error };
  }
}
