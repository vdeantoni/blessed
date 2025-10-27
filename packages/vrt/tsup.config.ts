import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "cli/index": "src/cli/index.ts",
  },
  format: ["esm", "cjs"],
  dts: {
    entry: "src/index.ts", // Only generate types for the library, not CLI
  },
  sourcemap: true,
  clean: true,
  splitting: false,
  target: "node22",
  external: ["@unblessed/core"],
});
