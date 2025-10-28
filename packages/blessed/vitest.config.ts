import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  test: {
    globals: true,
    environment: "node",
    include: ["__tests__/**/*.test.ts"],
    server: {
      deps: {
        inline: true,
      },
    },
    coverage: {
      enabled: false, // This is a thin wrapper package - no code coverage needed
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/**",
        "__tests__/**",
        "dist/**",
        "**/*.config.*",
        "example/**",
        "test/**",
        "img/**",
        "bin/**", // CLI tools
        "src/blessed.ts", // Module initialization code
        "src/index.ts", // Module initialization code
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
