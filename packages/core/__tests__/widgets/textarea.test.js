import { describe, it, expect, beforeEach, vi } from "vitest";
import Textarea from "../../src/widgets/textarea.js";
import { createMockScreen } from "../helpers/mock.js";

// Helper to initialize textarea with required properties
function initTextarea(textarea) {
  // Initialize _clines array (used by _updateCursor and _typeScroll)
  textarea._clines = textarea._clines || [""];
  // Initialize lpos for _updateCursor
  textarea.lpos = {
    xi: 0,
    yi: 0,
    xl: 80,
    yl: 24,
  };
  return textarea;
}

describe("Textarea", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should create a textarea instance", () => {
      const textarea = new Textarea({ screen });

      expect(textarea).toBeDefined();
      expect(textarea.type).toBe("textarea");
    });

    it("should inherit from Input", () => {
      const textarea = new Textarea({ screen });

      expect(textarea.screen).toBe(screen);
      expect(typeof textarea.readInput).toBe("function");
    });

    it("should set scrollable to true by default", () => {
      const textarea = new Textarea({ screen });

      expect(textarea.options.scrollable).toBe(true);
    });

    it("should allow disabling scrollable", () => {
      const textarea = new Textarea({ screen, scrollable: false });

      expect(textarea.options.scrollable).toBe(false);
    });

    it("should initialize with empty value", () => {
      const textarea = new Textarea({ screen });

      expect(textarea.value).toBe("");
    });

    it("should initialize with provided value", () => {
      const textarea = new Textarea({ screen, value: "Initial text" });

      expect(textarea.value).toBe("Initial text");
    });

    it("should setup resize listener for cursor updates", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      expect(textarea.__updateCursor).toBeDefined();
      expect(typeof textarea.__updateCursor).toBe("function");
    });

    it("should support inputOnFocus option", () => {
      const textarea = new Textarea({ screen, inputOnFocus: true });
      screen.append(textarea);

      // inputOnFocus binds readInput to focus event in constructor
      // So we just verify the option is set
      expect(textarea.options.inputOnFocus).toBe(true);
    });
  });

  describe("getValue() / setValue()", () => {
    it("should get current value", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.value = "Test value";

      expect(textarea.getValue()).toBe("Test value");
    });

    it("should set value", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.setValue("New value");

      expect(textarea.value).toBe("New value");
    });

    it("should update content when value changes", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      textarea.setContent = vi.fn();
      textarea.setValue("Content");

      expect(textarea.setContent).toHaveBeenCalledWith("Content");
    });

    it("should not update if value is the same", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.setValue("Same");
      textarea.setContent = vi.fn();
      textarea.setValue("Same");

      expect(textarea.setContent).not.toHaveBeenCalled();
    });

    it("should use current value when no argument provided", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      textarea.value = "existing";
      textarea.setContent = vi.fn();
      textarea.setValue();

      expect(textarea.setContent).toHaveBeenCalledWith("existing");
    });

    it("should handle null value", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.value = "initial";
      textarea.setValue(null);

      expect(textarea.value).toBe("initial");
    });

    it("should handle multi-line text", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.setValue("Line 1\nLine 2\nLine 3");

      expect(textarea.value).toBe("Line 1\nLine 2\nLine 3");
    });
  });

  describe("clearValue()", () => {
    it("should clear the value", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.setValue("Some text");
      textarea.clearValue();

      expect(textarea.value).toBe("");
    });

    it("should be aliased as clearInput", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.setValue("Some text");
      textarea.clearInput();

      expect(textarea.value).toBe("");
    });
  });

  describe("readInput()", () => {
    it("should start reading input", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      textarea.readInput();

      expect(textarea._reading).toBe(true);
    });

    it("should not start if already reading", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea._reading = true;
      const result = textarea.readInput();

      expect(result).toBeUndefined();
    });

    it("should focus element if not focused", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      screen.focused = null;
      textarea.readInput();

      expect(screen.focused).toBe(textarea);
    });

    it("should grab keys", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      textarea.readInput();

      expect(screen.grabKeys).toBe(true);
    });

    it("should show cursor", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      textarea.readInput();

      expect(screen.program.hideCursor).not.toHaveBeenCalled();
    });

    it("should accept callback", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      const callback = vi.fn();
      textarea.readInput(callback);

      expect(textarea._callback).toBe(callback);
    });

    it("should be aliased as input and setInput", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      expect(textarea.input).toBe(textarea.readInput);
      expect(textarea.setInput).toBe(textarea.readInput);
    });
  });

  describe("_listener()", () => {
    it("should handle character input", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea._done = vi.fn();
      textarea._listener("a", { name: "a" });

      expect(textarea.value).toBe("a");
    });

    it("should handle multiple characters", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea._done = vi.fn();
      textarea._listener("h", { name: "h" });
      textarea._listener("i", { name: "i" });

      expect(textarea.value).toBe("hi");
    });

    it("should handle enter as newline", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea._done = vi.fn();
      textarea._listener("\r", { name: "enter" });

      expect(textarea.value).toBe("\n");
    });

    it("should handle backspace", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.value = "hello";
      textarea._done = vi.fn();
      textarea._listener("\b", { name: "backspace" });

      expect(textarea.value).toBe("hell");
    });

    it("should handle backspace on empty value", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.value = "";
      textarea._done = vi.fn();
      textarea._listener("\b", { name: "backspace" });

      expect(textarea.value).toBe("");
    });

    it("should call done on escape", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea._done = vi.fn();
      textarea._listener("\x1b", { name: "escape" });

      expect(textarea._done).toHaveBeenCalledWith(null, null);
    });

    it("should ignore return key", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea._done = vi.fn();
      textarea._listener("\r", { name: "return" });

      // Should not add anything to value
      expect(textarea.value).toBe("");
    });

    it("should ignore control characters", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea._listener("\x01", { name: "unknown" });

      expect(textarea.value).toBe("");
    });

    it("should handle directional keys without error", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.value = "test";
      textarea._listener("", { name: "left" });
      textarea._listener("", { name: "right" });
      textarea._listener("", { name: "up" });
      textarea._listener("", { name: "down" });

      // Should not crash or modify value
      expect(textarea.value).toBe("test");
    });
  });

  describe("submit() / cancel()", () => {
    it("should trigger escape handler on submit", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.__listener = vi.fn();
      textarea.submit();

      expect(textarea.__listener).toHaveBeenCalledWith("\x1b", {
        name: "escape",
      });
    });

    it("should trigger escape handler on cancel", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.__listener = vi.fn();
      textarea.cancel();

      expect(textarea.__listener).toHaveBeenCalledWith("\x1b", {
        name: "escape",
      });
    });

    it("should do nothing if no listener attached", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.__listener = null;
      const result = textarea.submit();

      expect(result).toBeUndefined();
    });
  });

  describe("render()", () => {
    it("should call setValue and parent render", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.setValue = vi.fn();
      // Spy on the parent's render method
      const renderSpy = vi
        .spyOn(Object.getPrototypeOf(Object.getPrototypeOf(textarea)), "render")
        .mockReturnValue("rendered");

      const result = textarea.render();

      expect(textarea.setValue).toHaveBeenCalled();
      expect(renderSpy).toHaveBeenCalled();
      expect(result).toBe("rendered");

      renderSpy.mockRestore();
    });
  });

  describe("readEditor()", () => {
    it("should call screen.readEditor", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      screen.readEditor = vi.fn((options, callback) => {
        callback(null, "edited value");
      });

      textarea.setValue("initial");
      textarea.readEditor();

      expect(screen.readEditor).toHaveBeenCalled();
      expect(screen.readEditor.mock.calls[0][0]).toEqual({ value: "initial" });
    });

    it("should update value after editing", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      screen.readEditor = vi.fn((options, callback) => {
        callback(null, "edited content");
      });

      textarea.readInput = vi.fn();
      textarea.setValue("initial");
      textarea.readEditor();

      expect(textarea.value).toBe("edited content");
    });

    it("should call readInput after editing", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      screen.readEditor = vi.fn((options, callback) => {
        callback(null, "edited");
      });

      textarea.readInput = vi.fn();
      textarea.readEditor();

      expect(textarea.readInput).toHaveBeenCalled();
    });

    it("should be aliased as editor and setEditor", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      expect(textarea.editor).toBe(textarea.readEditor);
      expect(textarea.setEditor).toBe(textarea.readEditor);
    });

    it("should handle editor errors", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      const error = new Error("Editor failed");
      screen.readEditor = vi.fn((options, callback) => {
        callback(error);
      });

      const callback = vi.fn();
      textarea.readInput = vi.fn();
      textarea.readEditor(callback);

      expect(callback).toHaveBeenCalledWith(error);
      expect(textarea.readInput).toHaveBeenCalled();
    });

    it("should handle unsuccessful editor exit", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      const error = new Error("Unsuccessful.");
      screen.readEditor = vi.fn((options, callback) => {
        callback(error);
      });

      textarea.readInput = vi.fn();
      screen.render = vi.fn();
      textarea.readEditor();

      expect(screen.render).toHaveBeenCalled();
      expect(textarea.readInput).toHaveBeenCalled();
    });
  });

  describe("events", () => {
    it("should emit submit event on completion", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      const spy = vi.fn();
      textarea.on("submit", spy);

      textarea.value = "submitted text";
      textarea.readInput();

      // Simulate completion
      if (textarea._done) {
        textarea._done(null, "submitted text");
      }

      expect(spy).toHaveBeenCalledWith("submitted text");
    });

    it("should emit cancel event on cancellation", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      const spy = vi.fn();
      textarea.on("cancel", spy);

      textarea.readInput();

      if (textarea._done) {
        textarea._done(null, null);
      }

      expect(spy).toHaveBeenCalledWith(null);
    });

    it("should emit action event", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      const spy = vi.fn();
      textarea.on("action", spy);

      textarea.readInput();

      if (textarea._done) {
        textarea._done(null, "action value");
      }

      expect(spy).toHaveBeenCalledWith("action value");
    });

    it("should emit error event on error", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      const error = new Error("Test error");
      const spy = vi.fn();
      textarea.on("error", spy);

      textarea.readInput();

      if (textarea._done) {
        textarea._done(error);
      }

      expect(spy).toHaveBeenCalledWith(error);
    });
  });

  describe("keyboard shortcuts", () => {
    it("should open editor with Ctrl+E when keys enabled", () => {
      const textarea = new Textarea({ screen, keys: true });
      screen.append(textarea);

      textarea.readEditor = vi.fn();
      textarea._done = vi.fn();
      textarea._listener("e", { name: "e", ctrl: true });

      expect(textarea.readEditor).toHaveBeenCalled();
    });

    it('should open editor with "e" key when not reading', () => {
      const textarea = new Textarea({ screen, keys: true });
      screen.append(textarea);

      textarea.readEditor = vi.fn();
      textarea.emit("keypress", "e", { name: "e" });

      expect(textarea.readEditor).toHaveBeenCalled();
    });

    it('should start input with "i" key in vi mode', () => {
      const textarea = new Textarea({ screen, keys: true, vi: true });
      screen.append(textarea);

      textarea.readInput = vi.fn();
      textarea.emit("keypress", "i", { name: "i" });

      expect(textarea.readInput).toHaveBeenCalled();
    });

    it("should start input with enter key", () => {
      const textarea = new Textarea({ screen, keys: true });
      screen.append(textarea);

      textarea.readInput = vi.fn();
      textarea.emit("keypress", "\r", { name: "enter" });

      expect(textarea.readInput).toHaveBeenCalled();
    });
  });

  describe("mouse support", () => {
    it("should open editor on right click", () => {
      const textarea = new Textarea({ screen, mouse: true });
      screen.append(textarea);

      textarea.readEditor = vi.fn();
      textarea.emit("click", { button: "right" });

      expect(textarea.readEditor).toHaveBeenCalled();
    });

    it("should not open editor on left click", () => {
      const textarea = new Textarea({ screen, mouse: true });
      screen.append(textarea);

      textarea.readEditor = vi.fn();
      textarea.emit("click", { button: "left" });

      expect(textarea.readEditor).not.toHaveBeenCalled();
    });

    it("should not open editor when already reading", () => {
      const textarea = new Textarea({ screen, mouse: true });
      screen.append(textarea);

      textarea._reading = true;
      textarea.readEditor = vi.fn();
      textarea.emit("click", { button: "right" });

      expect(textarea.readEditor).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should handle very long text", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      const longText = "a".repeat(10000);
      textarea.setValue(longText);

      expect(textarea.value).toBe(longText);
    });

    it("should handle unicode characters", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.setValue("Hello 世界 🌍");

      expect(textarea.value).toBe("Hello 世界 🌍");
    });

    it("should handle special characters", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.setValue("!@#$%^&*()_+-=[]{}|;:'\",./<>?`~");

      expect(textarea.value).toBe("!@#$%^&*()_+-=[]{}|;:'\",./<>?`~");
    });

    it("should handle empty string", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.setValue("");

      expect(textarea.value).toBe("");
    });

    it("should handle text with tabs", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);

      textarea.setValue("Line1\tTabbed\tText");

      expect(textarea.value).toBe("Line1\tTabbed\tText");
    });

    it("should handle backspace with surrogate pairs", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      screen.fullUnicode = true;

      textarea.value = "test\uD83D\uDE00"; // test😀
      textarea._done = vi.fn();
      textarea._listener("\b", { name: "backspace" });

      // Should remove the emoji (2 characters)
      expect(textarea.value).toBe("test");
    });
  });

  describe("integration scenarios", () => {
    it("should work as simple text area", () => {
      const textarea = new Textarea({
        screen,
        width: 40,
        height: 10,
      });
      screen.append(textarea);

      textarea.setValue("Multi-line\ntext\narea");

      expect(textarea.value).toBe("Multi-line\ntext\narea");
    });

    it("should work with input/output cycle", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      textarea.readInput();

      // Simulate typing
      textarea._listener("H", { name: "h" });
      textarea._listener("i", { name: "i" });

      expect(textarea.value).toBe("Hi");

      // Submit
      textarea._done(null, textarea.value);

      expect(textarea._reading).toBe(false);
    });

    it("should handle callback-based input", () => {
      const textarea = new Textarea({ screen });
      screen.append(textarea);
      initTextarea(textarea);

      const callback = vi.fn();
      textarea.readInput(callback);

      textarea.value = "callback test";

      if (textarea._done) {
        textarea._done(null, "callback test");
      }

      expect(callback).toHaveBeenCalledWith(null, "callback test");
    });
  });
});
