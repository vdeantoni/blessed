import { describe, it, expect, vi, beforeAll } from "vitest";
import { EventEmitter } from "events";
import { initTestRuntime } from "../helpers/mock.js";
import keys from "../../src/lib/keys.js";
import { Buffer } from "buffer";

describe("keys", () => {
  beforeAll(() => {
    // Initialize runtime with all required APIs
    initTestRuntime();
  });

  describe("emitKeypressEvents", () => {
    it("should add keypress handling to stream", () => {
      const stream = new EventEmitter();
      stream.setEncoding = vi.fn();

      keys.emitKeypressEvents(stream);

      expect(stream._keypressDecoder).toBeDefined();
    });

    it("should only add decoder once", () => {
      const stream = new EventEmitter();
      stream.setEncoding = vi.fn();

      keys.emitKeypressEvents(stream);
      const decoder1 = stream._keypressDecoder;

      keys.emitKeypressEvents(stream);
      const decoder2 = stream._keypressDecoder;

      expect(decoder1).toBe(decoder2);
    });

    it("should emit keypress events for simple characters", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(ch).toBe("a");
          expect(key).toBeDefined();
          expect(key.name).toBe("a");
          expect(key.sequence).toBe("a");
          expect(key.ctrl).toBe(false);
          expect(key.meta).toBe(false);
          expect(key.shift).toBe(false);
          resolve();
        });

        stream.emit("data", Buffer.from("a"));
      });
    });

    it("should emit keypress for enter key", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(key.name).toBe("enter");
          resolve();
        });

        stream.emit("data", Buffer.from("\n"));
      });
    });

    it("should emit keypress for return key", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(key.name).toBe("return");
          resolve();
        });

        stream.emit("data", Buffer.from("\r"));
      });
    });

    it("should emit keypress for tab key", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(key.name).toBe("tab");
          resolve();
        });

        stream.emit("data", Buffer.from("\t"));
      });
    });

    it("should emit keypress for backspace", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(key.name).toBe("backspace");
          resolve();
        });

        stream.emit("data", Buffer.from("\x7f"));
      });
    });

    it("should emit keypress for escape", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(key.name).toBe("escape");
          resolve();
        });

        stream.emit("data", Buffer.from("\x1b"));
      });
    });

    it("should detect ctrl modifier", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(key.name).toBe("a");
          expect(key.ctrl).toBe(true);
          resolve();
        });

        // Ctrl+A is \x01
        stream.emit("data", Buffer.from("\x01"));
      });
    });

    it("should handle uppercase letters", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(ch).toBe("A");
          expect(key.name).toBe("a");
          expect(key.shift).toBe(true);
          resolve();
        });

        stream.emit("data", Buffer.from("A"));
      });
    });

    it("should handle arrow keys", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        let count = 0;
        stream.on("keypress", (ch, key) => {
          count++;
          if (count === 1) {
            expect(key.name).toBe("up");
            // Emit down arrow
            stream.emit("data", Buffer.from("\x1b[B"));
          } else if (count === 2) {
            expect(key.name).toBe("down");
            resolve();
          }
        });

        // Up arrow: ESC[A
        stream.emit("data", Buffer.from("\x1b[A"));
      });
    });

    it("should handle function keys", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(key.name).toBe("f1");
          resolve();
        });

        // F1: ESC OP
        stream.emit("data", Buffer.from("\x1bOP"));
      });
    });

    it("should handle home key", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(key.name).toBe("home");
          resolve();
        });

        // Home: ESC[H
        stream.emit("data", Buffer.from("\x1b[H"));
      });
    });

    it("should handle end key", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        stream.on("keypress", (ch, key) => {
          expect(key.name).toBe("end");
          resolve();
        });

        // End: ESC[F
        stream.emit("data", Buffer.from("\x1b[F"));
      });
    });

    it("should not emit when no listeners", () => {
      const stream = new EventEmitter();
      stream.setEncoding = vi.fn();

      keys.emitKeypressEvents(stream);

      // Remove any listeners
      stream.removeAllListeners("keypress");

      // Should not throw
      expect(() => {
        stream.emit("data", Buffer.from("a"));
      }).not.toThrow();
    });

    it("should handle multiple characters in one buffer", () => {
      return new Promise((resolve) => {
        const stream = new EventEmitter();
        stream.setEncoding = vi.fn();

        keys.emitKeypressEvents(stream);

        const received = [];
        stream.on("keypress", (ch, key) => {
          received.push(key.name);
          if (received.length === 3) {
            expect(received).toEqual(["a", "b", "c"]);
            resolve();
          }
        });

        stream.emit("data", Buffer.from("abc"));
      });
    });
  });
});
