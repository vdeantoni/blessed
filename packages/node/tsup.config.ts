import { cp } from "fs/promises";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },

  format: ["cjs", "esm"],
  outDir: "dist",

  bundle: true,
  splitting: false,
  treeshake: true,

  clean: true,
  sourcemap: true,
  dts: true,
  minify: true,
  shims: true,
  cjsInterop: true,

  noExternal: ["@unblessed/core"],

  platform: "node",
  target: "node22",

  onSuccess: async () => {
    await cp("../core/data", "dist/data", { recursive: true });
    console.log("✅ Copied ../core/data/ to dist/data/");
    console.log("✅ @unblessed/node build complete");
  },
});
