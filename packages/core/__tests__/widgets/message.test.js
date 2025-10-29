import { beforeEach, describe, expect, it, vi } from "vitest";
import Message from "../../src/widgets/message.js";
import { createMockScreen } from "../helpers/mock.js";

describe("Message", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create a message instance", () => {
      const message = new Message({ screen });

      expect(message).toBeDefined();
      expect(message.type).toBe("message");
    });

    it("should inherit from Box", () => {
      const message = new Message({ screen });

      expect(message.screen).toBe(screen);
      expect(typeof message.append).toBe("function");
    });

    it("should enable tags by default", () => {
      const message = new Message({ screen });

      expect(message.parseTags).toBe(true);
    });

    it("should accept standard box options", () => {
      const message = new Message({
        screen,
        width: 40,
        border: "line",
        style: {
          fg: "white",
          bg: "blue",
        },
      });

      expect(message.position.width).toBe(40);
      expect(message.border).toBeDefined();
    });
  });

  describe("display()", () => {
    it("should display message with text", () => {
      const message = new Message({ screen });

      message.display("Hello World", 1);

      expect(message.content).toBe("Hello World");
      // Message calls show() which sets visible, but we just verify content was set
    });

    it("should be aliased as log", () => {
      const message = new Message({ screen });

      expect(message.log).toBe(message.display);
    });

    it("should accept time parameter", () => {
      const message = new Message({ screen });
      const callback = vi.fn();

      message.display("Test", 2, callback);

      expect(message.content).toBe("Test");

      // Fast-forward time
      vi.advanceTimersByTime(2000);

      expect(callback).toHaveBeenCalled();
    });

    it("should default time to 3 seconds", () => {
      const message = new Message({ screen });
      const callback = vi.fn();

      message.display("Test", callback);

      expect(message.content).toBe("Test");

      vi.advanceTimersByTime(3000);

      expect(callback).toHaveBeenCalled();
    });

    it("should handle time as 0 for manual dismissal", () => {
      const message = new Message({ screen });
      const callback = vi.fn();

      message.display("Test", 0, callback);

      vi.advanceTimersByTime(10);

      // Manual dismissal - callback not called yet
      expect(callback).not.toHaveBeenCalled();
    });

    it("should handle Infinity time for manual dismissal", () => {
      const message = new Message({ screen });
      const callback = vi.fn();

      message.display("Test", Infinity, callback);

      vi.advanceTimersByTime(5000);

      // Manual dismissal - callback not called
      expect(callback).not.toHaveBeenCalled();
    });

    it("should handle -1 time for manual dismissal", () => {
      const message = new Message({ screen });
      const callback = vi.fn();

      message.display("Test", -1, callback);

      vi.advanceTimersByTime(5000);

      // Manual dismissal - callback not called
      expect(callback).not.toHaveBeenCalled();
    });

    it("should render screen when displayed", () => {
      const message = new Message({ screen });
      screen.render = vi.fn();

      message.display("Test", 1);

      expect(screen.render).toHaveBeenCalled();
    });

    it("should call callback after timeout", () => {
      const message = new Message({ screen });
      const callback = vi.fn();

      message.display("Test", 1, callback);

      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1000);

      expect(callback).toHaveBeenCalled();
    });
  });

  describe("error()", () => {
    it("should display error message with red styling", () => {
      const message = new Message({ screen });
      const callback = vi.fn();

      message.error("Something went wrong", 1, callback);

      expect(message.content).toContain("Error:");
      expect(message.content).toContain("Something went wrong");
      expect(message.content).toContain("{red-fg}");
    });

    it("should call display internally", () => {
      const message = new Message({ screen });
      message.display = vi.fn();

      message.error("Test error", 2);

      expect(message.display).toHaveBeenCalledWith(
        "{red-fg}Error: Test error{/red-fg}",
        2,
        undefined,
      );
    });

    it("should pass callback to display", () => {
      const message = new Message({ screen });
      const callback = vi.fn();

      message.error("Test", 1, callback);

      vi.advanceTimersByTime(1000);

      expect(callback).toHaveBeenCalled();
    });
  });

  describe("scrollable behavior", () => {
    it("should focus when scrollable", () => {
      const message = new Message({
        screen,
        scrollable: true,
      });

      message.focus = vi.fn();
      screen.saveFocus = vi.fn();

      message.display("Test", 1);

      expect(screen.saveFocus).toHaveBeenCalled();
      expect(message.focus).toHaveBeenCalled();
    });

    it("should scroll to top when displayed", () => {
      const message = new Message({
        screen,
        scrollable: true,
      });

      message.scrollTo = vi.fn();

      message.display("Test", 1);

      expect(message.scrollTo).toHaveBeenCalledWith(0);
    });

    it("should save focus on display", () => {
      const message = new Message({
        screen,
        scrollable: true,
      });

      screen.saveFocus = vi.fn();

      message.display("Test", 1);

      expect(screen.saveFocus).toHaveBeenCalled();
    });
  });

  describe("common use cases", () => {
    it("should create a notification message", () => {
      const message = new Message({
        screen,
        top: "center",
        left: "center",
        width: 50,
        height: 5,
        border: "line",
        style: {
          border: { fg: "blue" },
        },
      });

      message.display("Operation completed successfully!", 3);

      expect(message.content).toBe("Operation completed successfully!");
    });

    it("should create an error notification", () => {
      const message = new Message({
        screen,
        width: 40,
        height: 7,
        border: "line",
      });

      message.error("File not found", 5);

      expect(message.content).toContain("Error:");
      expect(message.content).toContain("File not found");
    });

    it("should create a manual dismiss message", () => {
      const message = new Message({
        screen,
        width: 50,
        border: "line",
        label: " Info ",
      });

      const callback = vi.fn();
      message.display("Press any key to continue...", 0, callback);

      // Content is set
      expect(message.content).toBe("Press any key to continue...");

      vi.advanceTimersByTime(10);

      // Simulate keypress
      message.emit("keypress", "x", { name: "x" });

      // Manual dismiss - callback not automatically called
      expect(callback).not.toHaveBeenCalled();
    });

    it("should handle multiple messages in sequence", () => {
      const message = new Message({
        screen,
        width: 40,
      });

      const callback1 = vi.fn();
      const callback2 = vi.fn();

      message.display("First message", 1, callback1);
      vi.advanceTimersByTime(1000);

      expect(callback1).toHaveBeenCalled();

      message.display("Second message", 1, callback2);
      vi.advanceTimersByTime(1000);

      expect(callback2).toHaveBeenCalled();
    });

    it("should display multiline messages", () => {
      const message = new Message({
        screen,
        width: 50,
        height: 10,
        border: "line",
      });

      const multiline = "Line 1\nLine 2\nLine 3";
      message.display(multiline, 2);

      expect(message.content).toBe(multiline);
    });

    it("should support styled content", () => {
      const message = new Message({
        screen,
        width: 40,
        border: "line",
      });

      message.display(
        "{bold}Important:{/bold} {green-fg}Success!{/green-fg}",
        2,
      );

      expect(message.content).toContain("{bold}");
      expect(message.content).toContain("{green-fg}");
    });
  });
});
