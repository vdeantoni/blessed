import { describe, it, expect } from "vitest";

describe("runtime/auto-init", () => {
  // Note: auto-init runs via vitest.setup.ts before tests
  // These tests verify that the polyfills were correctly set up

  it("has process global set up", () => {
    expect(globalThis.process).toBeDefined();
    expect(globalThis.process.env).toBeDefined();
  });

  it("has Buffer global set up", () => {
    expect(globalThis.Buffer).toBeDefined();
    expect(typeof globalThis.Buffer.from).toBe("function");
    expect(typeof globalThis.Buffer.isBuffer).toBe("function");
  });

  it("has global reference set up", () => {
    expect((globalThis as any).global).toBe(globalThis);
  });

  it("has process methods mocked", () => {
    expect(globalThis.process.cwd).toBeDefined();
    expect(globalThis.process.exit).toBeDefined();
    expect(globalThis.process.nextTick).toBeDefined();

    expect(typeof globalThis.process.cwd()).toBe("string");
    expect(typeof globalThis.process.exit).toBe("function");
    expect(typeof globalThis.process.nextTick).toBe("function");
  });

  it("can use Buffer methods", () => {
    const buf = Buffer.from("test");
    expect(Buffer.isBuffer(buf)).toBe(true);
    expect(buf.toString()).toBe("test");
  });
});
