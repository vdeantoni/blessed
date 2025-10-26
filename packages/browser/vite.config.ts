import { defineConfig } from "vite";
import { resolve } from "path";
import blessedBrowser from "./dist/vite-plugin/index.js";

export default defineConfig({
  plugins: [blessedBrowser()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@unblessed/core/data/terminfo/xterm-256color.json": resolve(
        __dirname,
        "../core/dist/data/terminfo/xterm-256color.json",
      ),
      "@unblessed/core/data/fonts/ter-u14n.json": resolve(
        __dirname,
        "../core/dist/data/fonts/ter-u14n.json",
      ),
      "@unblessed/core/data/fonts/ter-u14b.json": resolve(
        __dirname,
        "../core/dist/data/fonts/ter-u14b.json",
      ),
      "@unblessed/core": resolve(__dirname, "../core/dist/index.js"),
    },
  },
});
