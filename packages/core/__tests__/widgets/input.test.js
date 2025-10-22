import { describe, it, expect, beforeEach } from "vitest";
import Input from "../../src/widgets/input.js";
import { createMockScreen } from "../helpers/mock.js";

describe("Input", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should create an input instance", () => {
      const input = new Input({ screen });

      expect(input).toBeDefined();
      expect(input.type).toBe("input");
    });

    it("should inherit from Box", () => {
      const input = new Input({ screen });

      expect(input.screen).toBe(screen);
      expect(typeof input.render).toBe("function");
    });

    it("should accept all Box options", () => {
      const input = new Input({
        screen,
        top: 5,
        left: 10,
        width: 30,
        height: 3,
        border: "line",
      });

      expect(input.options.top).toBe(5);
      expect(input.options.left).toBe(10);
      expect(input.options.width).toBe(30);
      expect(input.options.height).toBe(3);
      expect(input.border).toBeDefined();
    });

    it("should accept style options", () => {
      const input = new Input({
        screen,
        style: {
          fg: "white",
          bg: "blue",
          border: { fg: "cyan" },
        },
      });

      expect(input.style.fg).toBe("white");
      expect(input.style.bg).toBe("blue");
    });

    it("should accept focusable option", () => {
      const input = new Input({
        screen,
        focusable: true,
      });

      expect(input.options.focusable).toBe(true);
    });

    it("should accept label option", () => {
      const input = new Input({
        screen,
        label: " Input Field ",
      });

      expect(input._label.content).toBe(" Input Field ");
    });
  });

  describe("common use cases", () => {
    it("should serve as abstract base for input widgets", () => {
      const input = new Input({
        screen,
        border: "line",
        style: {
          border: { fg: "cyan" },
        },
      });

      expect(input.type).toBe("input");
      expect(input.border).toBeDefined();
    });

    it("should support all Box inheritance features", () => {
      const input = new Input({ screen });

      // Check for Box methods
      expect(typeof input.setContent).toBe("function");
      expect(typeof input.focus).toBe("function");
      expect(typeof input.render).toBe("function");
    });

    it("should support positioning options", () => {
      const input = new Input({
        screen,
        top: "center",
        left: "center",
        width: "50%",
        height: 3,
      });

      expect(input.options.top).toBe("center");
      expect(input.options.left).toBe("center");
      expect(input.options.width).toBe("50%");
    });
  });
});
