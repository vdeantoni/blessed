import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./__tests__/setup.js"],
    include: ["__tests__/**/*.test.{ts,js}"],
    env: {
      NODE_ENV: "test",
    },
    server: {
      deps: {
        inline: true,
      },
    },
    coverage: {
      enabled: false, // Coverage collection has technical issues - disabled for now
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/**",
        "__tests__/**",
        "dist/**",
        "**/*.config.*",
        "data/**",
      ],
      thresholds: {
        lines: 0,
        functions: 0,
        branches: 0,
        statements: 0,
      },
    },
  },
});
