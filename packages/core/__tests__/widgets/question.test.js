import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Question from "../../src/widgets/question.js";
import { createMockScreen } from "../helpers/mock.js";

describe("Question", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create a question instance", () => {
      const question = new Question({ screen });

      expect(question).toBeDefined();
      expect(question.type).toBe("question");
    });

    it("should inherit from Box", () => {
      const question = new Question({ screen });

      expect(question.screen).toBe(screen);
      expect(typeof question.append).toBe("function");
    });

    it("should be hidden by default", () => {
      const question = new Question({ screen });

      expect(question.options.hidden).toBe(true);
    });

    it("should preserve methods when scrollable is true", () => {
      const question = new Question({ screen, scrollable: true });

      expect(question.type).toBe("question");
      expect(typeof question.ask).toBe("function");
    });

    it("should create okay button", () => {
      const question = new Question({ screen });

      expect(question._.okay).toBeDefined();
      expect(question._.okay.content).toBe("Okay");
      expect(question._.okay.width).toBe(6);
    });

    it("should create cancel button", () => {
      const question = new Question({ screen });

      expect(question._.cancel).toBeDefined();
      expect(question._.cancel.content).toBe("Cancel");
      expect(question._.cancel.width).toBe(8);
    });

    it("should position buttons at same height", () => {
      const question = new Question({ screen });

      expect(question._.okay.options.top).toBe(2);
      expect(question._.cancel.options.top).toBe(2);
    });

    it("should position okay button on left", () => {
      const question = new Question({ screen });

      expect(question._.okay.options.left).toBe(2);
    });

    it("should position cancel button after okay", () => {
      const question = new Question({ screen });

      expect(question._.cancel.options.left).toBe(10);
    });

    it("should enable mouse on buttons", () => {
      const question = new Question({ screen });

      expect(question._.okay.options.mouse).toBe(true);
      expect(question._.cancel.options.mouse).toBe(true);
    });

    it("should set button hover styles", () => {
      const question = new Question({ screen });

      expect(question._.okay.options.hoverBg).toBe("blue");
      expect(question._.cancel.options.hoverBg).toBe("blue");
    });

    it("should disable auto focus on buttons", () => {
      const question = new Question({ screen });

      expect(question._.okay.options.autoFocus).toBe(false);
      expect(question._.cancel.options.autoFocus).toBe(false);
    });
  });

  describe("ask()", () => {
    it("should show the question", () => {
      const question = new Question({ screen });
      question.show = vi.fn();

      question.ask("Are you sure?", vi.fn());

      expect(question.show).toHaveBeenCalled();
    });

    it("should set question text", () => {
      const question = new Question({ screen });

      question.ask("Delete file?", vi.fn());

      expect(question.content).toBe(" Delete file?");
    });

    it("should save focus", () => {
      const question = new Question({ screen });
      screen.saveFocus = vi.fn();

      question.ask("Continue?", vi.fn());

      expect(screen.saveFocus).toHaveBeenCalled();
    });

    it("should focus question widget", () => {
      const question = new Question({ screen });
      question.focus = vi.fn();

      question.ask("Proceed?", vi.fn());

      expect(question.focus).toHaveBeenCalled();
    });

    it("should render screen", () => {
      const question = new Question({ screen });
      screen.render = vi.fn();

      question.ask("Confirm?", vi.fn());

      expect(screen.render).toHaveBeenCalled();
    });

    it("should register keypress handler", () => {
      const question = new Question({ screen });
      question.onScreenEvent = vi.fn();

      question.ask("Continue?", vi.fn());

      expect(question.onScreenEvent).toHaveBeenCalledWith(
        "keypress",
        expect.any(Function),
      );
    });
  });

  describe("keyboard responses", () => {
    it("should return true on enter key", () => {
      const question = new Question({ screen });
      const callback = vi.fn();
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      question.ask("Continue?", callback);

      pressHandler(null, { name: "enter" });

      expect(callback).toHaveBeenCalledWith(null, true);
    });

    it("should return true on y key", () => {
      const question = new Question({ screen });
      const callback = vi.fn();
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      question.ask("Continue?", callback);

      pressHandler(null, { name: "y" });

      expect(callback).toHaveBeenCalledWith(null, true);
    });

    it("should return false on escape key", () => {
      const question = new Question({ screen });
      const callback = vi.fn();
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      question.ask("Continue?", callback);

      pressHandler(null, { name: "escape" });

      expect(callback).toHaveBeenCalledWith(null, false);
    });

    it("should return false on q key", () => {
      const question = new Question({ screen });
      const callback = vi.fn();
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      question.ask("Continue?", callback);

      pressHandler(null, { name: "q" });

      expect(callback).toHaveBeenCalledWith(null, false);
    });

    it("should return false on n key", () => {
      const question = new Question({ screen });
      const callback = vi.fn();
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      question.ask("Continue?", callback);

      pressHandler(null, { name: "n" });

      expect(callback).toHaveBeenCalledWith(null, false);
    });

    it("should ignore mouse keypress", () => {
      const question = new Question({ screen });
      const callback = vi.fn();
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      question.ask("Continue?", callback);

      pressHandler(null, { name: "mouse" });

      expect(callback).not.toHaveBeenCalled();
    });

    it("should ignore other keys", () => {
      const question = new Question({ screen });
      const callback = vi.fn();
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      question.ask("Continue?", callback);

      pressHandler(null, { name: "a" });
      pressHandler(null, { name: "space" });
      pressHandler(null, { name: "tab" });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("button responses", () => {
    it("should return true on okay button press", () => {
      const question = new Question({ screen });
      const callback = vi.fn();

      question.ask("Continue?", callback);

      question._.okay.emit("press");

      expect(callback).toHaveBeenCalledWith(null, true);
    });

    it("should return false on cancel button press", () => {
      const question = new Question({ screen });
      const callback = vi.fn();

      question.ask("Continue?", callback);

      question._.cancel.emit("press");

      expect(callback).toHaveBeenCalledWith(null, false);
    });
  });

  describe("cleanup", () => {
    it("should hide on completion", () => {
      const question = new Question({ screen });
      question.hide = vi.fn();

      question.ask("Continue?", vi.fn());

      question._.okay.emit("press");

      expect(question.hide).toHaveBeenCalled();
    });

    it("should restore focus on completion", () => {
      const question = new Question({ screen });
      screen.restoreFocus = vi.fn();

      question.ask("Continue?", vi.fn());

      question._.okay.emit("press");

      expect(screen.restoreFocus).toHaveBeenCalled();
    });

    it("should remove keypress listener", () => {
      const question = new Question({ screen });
      question.removeScreenEvent = vi.fn();

      question.ask("Continue?", vi.fn());

      question._.okay.emit("press");

      expect(question.removeScreenEvent).toHaveBeenCalledWith(
        "keypress",
        expect.any(Function),
      );
    });

    it("should remove okay button listener", () => {
      const question = new Question({ screen });
      question._.okay.removeListener = vi.fn();

      question.ask("Continue?", vi.fn());

      question._.okay.emit("press");

      expect(question._.okay.removeListener).toHaveBeenCalledWith(
        "press",
        expect.any(Function),
      );
    });

    it("should remove cancel button listener", () => {
      const question = new Question({ screen });
      question._.cancel.removeListener = vi.fn();

      question.ask("Continue?", vi.fn());

      question._.cancel.emit("press");

      expect(question._.cancel.removeListener).toHaveBeenCalledWith(
        "press",
        expect.any(Function),
      );
    });
  });

  describe("common use cases", () => {
    it("should create a confirmation dialog", () => {
      const question = new Question({
        screen,
        top: "center",
        left: "center",
        width: 50,
        height: 5,
        border: "line",
        label: " Confirm ",
      });

      const callback = vi.fn();

      question.ask("Are you sure you want to delete this file?", callback);

      expect(question.content).toContain(
        "Are you sure you want to delete this file?",
      );
    });

    it("should handle yes response", () => {
      const question = new Question({ screen });
      const callback = vi.fn();
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      question.ask("Save changes?", callback);

      pressHandler(null, { name: "y" });

      expect(callback).toHaveBeenCalledWith(null, true);
    });

    it("should handle no response", () => {
      const question = new Question({ screen });
      const callback = vi.fn();
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      question.ask("Discard changes?", callback);

      pressHandler(null, { name: "n" });

      expect(callback).toHaveBeenCalledWith(null, false);
    });

    it("should create exit confirmation", () => {
      const question = new Question({
        screen,
        border: "line",
        style: {
          border: { fg: "red" },
        },
      });

      const callback = vi.fn((err, answer) => {
        if (answer) {
          // Exit application
        }
      });

      question.ask("Are you sure you want to exit?", callback);

      question._.okay.emit("press");

      expect(callback).toHaveBeenCalledWith(null, true);
    });

    it("should handle conditional actions", () => {
      const question = new Question({ screen });
      const action = vi.fn();

      question.ask("Proceed with operation?", (err, answer) => {
        if (answer) {
          action();
        }
      });

      question._.okay.emit("press");

      expect(action).toHaveBeenCalled();
    });

    it("should skip action on cancel", () => {
      const question = new Question({ screen });
      const action = vi.fn();

      question.ask("Proceed with operation?", (err, answer) => {
        if (answer) {
          action();
        }
      });

      question._.cancel.emit("press");

      expect(action).not.toHaveBeenCalled();
    });

    it("should support multiple questions in sequence", () => {
      const question = new Question({ screen });
      const results = [];

      question.ask("Question 1?", (err, answer1) => {
        results.push(answer1);

        question.ask("Question 2?", (err, answer2) => {
          results.push(answer2);
        });
      });

      question._.okay.emit("press");
      question._.cancel.emit("press");

      expect(results).toEqual([true, false]);
    });

    it("should create a styled question dialog", () => {
      const question = new Question({
        screen,
        top: "center",
        left: "center",
        width: 60,
        height: 6,
        border: "line",
        label: " Warning ",
        style: {
          border: { fg: "yellow" },
          bg: "black",
        },
      });

      question.ask("This action cannot be undone. Continue?", vi.fn());

      expect(question.content).toContain("This action cannot be undone");
    });

    it("should handle keyboard shortcuts", () => {
      const question = new Question({ screen });
      const results = [];
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      // Test enter for yes
      question.ask("Confirm?", (err, answer) => {
        results.push(answer);
      });
      pressHandler(null, { name: "enter" });

      // Test escape for no
      question.ask("Confirm?", (err, answer) => {
        results.push(answer);
      });
      pressHandler(null, { name: "escape" });

      expect(results).toEqual([true, false]);
    });

    it("should work as yes/no dialog", () => {
      const question = new Question({ screen });
      let pressHandler;

      question.onScreenEvent = vi.fn((event, handler) => {
        if (event === "keypress") pressHandler = handler;
      });

      const yesAction = vi.fn();
      const noAction = vi.fn();

      question.ask("Enable feature X?", (err, answer) => {
        if (answer) {
          yesAction();
        } else {
          noAction();
        }
      });

      pressHandler(null, { name: "y" });

      expect(yesAction).toHaveBeenCalled();
      expect(noAction).not.toHaveBeenCalled();
    });
  });
});
