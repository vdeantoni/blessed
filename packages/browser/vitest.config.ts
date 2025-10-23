import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["__tests__/unit/**/*.test.ts"],
    exclude: ["__tests__/e2e/**/*"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/**",
        "__tests__/**",
        "test/**",
        "examples/**",
        "dist/**",
        "**/*.config.*",
        "**/scripts/**",
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
