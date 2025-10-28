import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./__tests__/setup.ts"],
    include: ["__tests__/**/*.test.ts"],
    server: {
      deps: {
        inline: true,
      },
    },
    coverage: {
      enabled: false, // This is a thin runtime adapter - no code coverage needed
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/**",
        "__tests__/**",
        "dist/**",
        "**/*.config.*",
        "examples/**",
        "src/index.ts", // Module initialization code
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
