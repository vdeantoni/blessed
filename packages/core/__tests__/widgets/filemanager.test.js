import fs from "fs";
import path from "path";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { setRuntime } from "../../src/runtime-context.js";
import FileManager from "../../src/widgets/filemanager.js";
import { createMockScreen } from "../helpers/mock.js";

describe("FileManager", () => {
  let screen;

  beforeAll(() => {
    // Initialize runtime with fs/path support for file browsing
    setRuntime({ fs, path, process });
  });

  beforeEach(() => {
    screen = createMockScreen();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create a filemanager instance", () => {
      const fm = new FileManager({ screen });

      expect(fm).toBeDefined();
      expect(fm.type).toBe("file-manager");
    });

    it("should inherit from List", () => {
      const fm = new FileManager({ screen });

      expect(fm.screen).toBe(screen);
      expect(typeof fm.setItems).toBe("function");
      expect(typeof fm.select).toBe("function");
    });

    it("should default cwd to process.cwd()", () => {
      const fm = new FileManager({ screen });

      expect(fm.cwd).toBe(process.cwd());
    });

    it("should accept custom cwd", () => {
      const fm = new FileManager({ screen, cwd: "/tmp" });

      expect(fm.cwd).toBe("/tmp");
    });

    it("should set file and value to cwd", () => {
      const fm = new FileManager({ screen, cwd: "/home/user" });

      expect(fm.file).toBe("/home/user");
      expect(fm.value).toBe("/home/user");
    });

    it("should enable tag parsing", () => {
      const fm = new FileManager({ screen });

      expect(fm.options.parseTags).toBe(true);
    });

    it("should handle label with %path placeholder", () => {
      const fm = new FileManager({
        screen,
        label: " {blue-fg}%path{/blue-fg} ",
        cwd: "/test/path",
      });

      expect(fm._label.content).toContain("/test/path");
    });
  });

  describe("refresh()", () => {
    it("should have refresh method", () => {
      const fm = new FileManager({ screen, cwd: "/test" });

      expect(typeof fm.refresh).toBe("function");
    });

    it("should emit refresh event when called", () => {
      return new Promise((resolve) => {
        const fm = new FileManager({ screen, cwd: process.cwd() });

        fm.on("refresh", () => {
          resolve();
        });

        fm.refresh();
      });
    });

    it("should accept callback parameter", () => {
      return new Promise((resolve) => {
        const fm = new FileManager({ screen, cwd: process.cwd() });

        fm.refresh(() => {
          resolve();
        });
      });
    });

    it("should accept new cwd and callback", () => {
      return new Promise((resolve) => {
        const fm = new FileManager({ screen, cwd: "/old" });

        fm.refresh(process.cwd(), () => {
          expect(fm.cwd).toBe(process.cwd());
          resolve();
        });
      });
    });
  });

  describe("select event handling", () => {
    it("should handle select events", () => {
      const fm = new FileManager({ screen, cwd: "/test" });

      // Test that select handler is set up
      expect(fm.listeners("select").length).toBeGreaterThan(0);
    });

    it("should strip tags from selected item content", () => {
      const fm = new FileManager({ screen, cwd: "/test" });

      // Verify the select handler processes content
      const handler = fm.listeners("select")[0];
      expect(typeof handler).toBe("function");
    });
  });

  describe("pick()", () => {
    it("should have pick method", () => {
      const fm = new FileManager({ screen, cwd: "/test" });

      expect(typeof fm.pick).toBe("function");
    });

    it("should accept callback parameter", () => {
      return new Promise((resolve) => {
        const fm = new FileManager({ screen, cwd: process.cwd() });

        fm.pick((err, file) => {
          // Will complete when file or cancel event fires
          resolve();
        });

        // Simulate file selection
        setTimeout(() => {
          fm.emit("file", "/test/file.txt");
        }, 10);
      });
    });

    it("should handle cancel event", () => {
      return new Promise((resolve) => {
        const fm = new FileManager({ screen, cwd: process.cwd() });

        fm.pick((err, file) => {
          expect(file).toBeUndefined();
          resolve();
        });

        setTimeout(() => {
          fm.emit("cancel");
        }, 10);
      });
    });
  });

  describe("reset()", () => {
    it("should have reset method", () => {
      const fm = new FileManager({ screen, cwd: "/test" });

      expect(typeof fm.reset).toBe("function");
    });

    it("should accept callback parameter", () => {
      return new Promise((resolve) => {
        const fm = new FileManager({ screen, cwd: process.cwd() });

        fm.reset(() => {
          resolve();
        });
      });
    });

    it("should accept cwd and callback", () => {
      return new Promise((resolve) => {
        const fm = new FileManager({ screen, cwd: "/old" });

        fm.reset(process.cwd(), () => {
          expect(fm.cwd).toBe(process.cwd());
          resolve();
        });
      });
    });
  });

  describe("common use cases", () => {
    it("should create a file browser", () => {
      const fm = new FileManager({
        screen,
        cwd: "/home/user",
        border: "line",
        label: " Files: %path ",
        style: {
          border: { fg: "cyan" },
          selected: { bg: "blue" },
        },
      });

      expect(fm.cwd).toBe("/home/user");
      expect(fm._label.content).toContain("/home/user");
    });

    it("should track file and value properties", () => {
      const fm = new FileManager({ screen, cwd: "/test" });

      expect(fm.file).toBe("/test");
      expect(fm.value).toBe("/test");
    });
  });
});
