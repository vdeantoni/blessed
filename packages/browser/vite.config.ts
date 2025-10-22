import { defineConfig } from "vite";
import blessedBrowser from "./dist/vite-plugin/index.js";

export default defineConfig({
  plugins: [blessedBrowser()],
  server: {
    port: 8080,
  },
});
