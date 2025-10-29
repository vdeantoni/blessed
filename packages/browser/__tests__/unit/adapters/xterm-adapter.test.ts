import { EventEmitter } from "events";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock blessed before importing XTermAdapter
vi.mock("@unblessed/blessed", () => ({
  default: {},
}));

// Now import XTermAdapter
import { XTermAdapter } from "../../../src";

// Mock xterm.js Terminal
class MockTerminal extends EventEmitter {
  cols = 80;
  rows = 24;
  element = null;

  write = vi.fn();
  clear = vi.fn();
  reset = vi.fn();

  // Mock xterm event methods
  onData(callback: (data: string) => void) {
    this.on("data", callback);
    return { dispose: vi.fn() };
  }

  onResize(callback: (size: { cols: number; rows: number }) => void) {
    this.on("resize", callback);
    return { dispose: vi.fn() };
  }
}

describe("adapters/XTermAdapter", () => {
  let mockTerminal: MockTerminal;
  let adapter: XTermAdapter;

  beforeEach(() => {
    mockTerminal = new MockTerminal();
    adapter = new XTermAdapter({ terminal: mockTerminal as any });
  });

  it("initializes with terminal", () => {
    expect(adapter).toBeDefined();
  });

  it("forwards onData events as data", async () => {
    const dataPromise = new Promise<Buffer>((resolve) => {
      adapter.on("data", (data) => {
        resolve(data);
      });
    });

    mockTerminal.emit("data", "hello");

    const data = await dataPromise;
    expect(Buffer.isBuffer(data)).toBe(true);
    expect(data.toString()).toBe("hello");
  });

  it("forwards onResize events", async () => {
    const resizePromise = new Promise<void>((resolve) => {
      adapter.on("resize", () => {
        resolve();
      });
    });

    mockTerminal.emit("resize", { cols: 100, rows: 30 });

    await resizePromise;
  });

  it("implements write method", () => {
    adapter.write("test");
    expect(mockTerminal.write).toHaveBeenCalledWith("test");

    adapter.write(Buffer.from("buffer"));
    expect(mockTerminal.write).toHaveBeenCalledWith("buffer");
  });

  it("implements getWindowSize", () => {
    const [cols, rows] = adapter.getWindowSize();
    expect(cols).toBe(80);
    expect(rows).toBe(24);
  });

  it("reports as writable and TTY", () => {
    expect(adapter.writable).toBe(true);
    expect(adapter.isTTY).toBe(true);
    expect(adapter.isRaw).toBe(true);
  });

  it("provides terminal dimensions via properties", () => {
    expect(adapter.columns).toBe(80);
    expect(adapter.rows).toBe(24);
  });

  it("implements terminal control methods", () => {
    adapter.clear();
    expect(mockTerminal.clear).toHaveBeenCalled();

    adapter.reset();
    expect(mockTerminal.reset).toHaveBeenCalled();
  });

  it("no-op methods do not throw", () => {
    expect(() => adapter.setRawMode(true)).not.toThrow();
    expect(() => adapter.resume()).not.toThrow();
    expect(() => adapter.pause()).not.toThrow();
  });
});
