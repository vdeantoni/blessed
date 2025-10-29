import { cp } from "fs/promises";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    runtime: "src/runtime.ts",
  },

  format: ["cjs", "esm"],
  outDir: "dist",

  bundle: true,
  splitting: false,
  treeshake: true,

  clean: true,
  sourcemap: true,
  dts: {
    entry: "src/index.ts",
  },
  minify: false,
  shims: true,
  cjsInterop: true,

  external: [],

  platform: "neutral",
  target: "es2020",

  onSuccess: async () => {
    await cp("data", "dist/data", { recursive: true });
    console.log("✅ Copied data/ to dist/data/");
    console.log("✅ @unblessed/core build complete");
  },
});
