import { describe, it, expect, beforeEach } from "vitest";
import Line from "../../src/widgets/line.js";
import Box from "../../src/widgets/box.js";
import { createMockScreen } from "../helpers/mock.js";

describe("Line", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should create a line instance", () => {
      const line = new Line({ screen });

      expect(line).toBeDefined();
      expect(line.type).toBe("line");
    });

    it("should inherit from Box", () => {
      const line = new Line({ screen });

      expect(line.screen).toBe(screen);
      expect(typeof line.render).toBe("function");
    });

    it("should default to vertical orientation", () => {
      const line = new Line({ screen });

      expect(line.position.width).toBe(1);
      expect(line.ch).toBe("│");
    });

    it("should handle vertical orientation explicitly", () => {
      const line = new Line({
        screen,
        orientation: "vertical",
      });

      expect(line.position.width).toBe(1);
      expect(line.ch).toBe("│");
    });

    it("should handle horizontal orientation", () => {
      const line = new Line({
        screen,
        orientation: "horizontal",
      });

      expect(line.position.height).toBe(1);
      expect(line.ch).toBe("─");
    });

    it("should accept position options", () => {
      const line = new Line({
        screen,
        left: 5,
        top: 10,
        height: 20,
      });

      expect(line.position.left).toBe(5);
      expect(line.position.top).toBe(10);
      expect(line.position.height).toBe(20);
    });

    it("should accept style options", () => {
      const line = new Line({
        screen,
        style: {
          fg: "red",
          bg: "blue",
        },
      });

      expect(line.style.fg).toBe("red");
      expect(line.style.bg).toBe("blue");
    });

    it("should use custom character when type is not line", () => {
      const line = new Line({
        screen,
        type: "custom",
        ch: "*",
      });

      expect(line.ch).toBe("*");
    });

    it("should use default character for line type", () => {
      const line = new Line({
        screen,
        type: "line",
        orientation: "horizontal",
      });

      expect(line.ch).toBe("─");
    });

    it("should have border property", () => {
      const line = new Line({ screen });

      expect(line.border).toBeDefined();
      expect(line.border.type).toBe("bg");
    });

    it("should link border style to element style", () => {
      const line = new Line({ screen });

      expect(line.style.border).toBe(line.style);
    });
  });

  describe("orientation", () => {
    it("should create vertical line with width 1", () => {
      const line = new Line({
        screen,
        orientation: "vertical",
        height: 10,
      });

      expect(line.position.width).toBe(1);
      expect(line.position.height).toBe(10);
    });

    it("should create horizontal line with height 1", () => {
      const line = new Line({
        screen,
        orientation: "horizontal",
        width: 20,
      });

      expect(line.position.height).toBe(1);
      expect(line.position.width).toBe(20);
    });

    it("should not allow overriding width for vertical line", () => {
      const line = new Line({
        screen,
        orientation: "vertical",
        width: 10, // Should be ignored
      });

      expect(line.position.width).toBe(1);
    });

    it("should not allow overriding height for horizontal line", () => {
      const line = new Line({
        screen,
        orientation: "horizontal",
        height: 10, // Should be ignored
      });

      expect(line.position.height).toBe(1);
    });
  });

  describe("characters", () => {
    it("should use vertical bar for vertical line", () => {
      const line = new Line({
        screen,
        orientation: "vertical",
      });

      expect(line.ch).toBe("│");
    });

    it("should use horizontal bar for horizontal line", () => {
      const line = new Line({
        screen,
        orientation: "horizontal",
      });

      expect(line.ch).toBe("─");
    });

    it("should accept custom character", () => {
      const line = new Line({
        screen,
        orientation: "vertical",
        type: "custom",
        ch: "|",
      });

      expect(line.ch).toBe("|");
    });

    it("should default to space if no type and no ch", () => {
      const line = new Line({
        screen,
        type: "bg",
      });

      expect(line.ch).toBe(" ");
    });
  });

  describe("hierarchy", () => {
    it("should be added to screen", () => {
      const line = new Line({ screen });
      screen.append(line);

      expect(screen.children).toContain(line);
      expect(line.parent).toBe(screen);
    });

    it("should be added to box", () => {
      const box = new Box({ screen });
      const line = new Line({ screen });

      box.append(line);

      expect(box.children).toContain(line);
      expect(line.parent).toBe(box);
    });

    it("should be removed from parent", () => {
      const line = new Line({ screen });
      screen.append(line);
      screen.remove(line);

      expect(screen.children).not.toContain(line);
      expect(line.parent).toBeNull();
    });
  });

  describe("styling", () => {
    it("should accept fg color", () => {
      const line = new Line({
        screen,
        fg: "green",
      });

      expect(line.style.fg).toBe("green");
    });

    it("should accept bg color", () => {
      const line = new Line({
        screen,
        bg: "blue",
      });

      expect(line.style.bg).toBe("blue");
    });

    it("should share style with border", () => {
      const line = new Line({
        screen,
        fg: "red",
      });

      expect(line.style.border).toBe(line.style);
      expect(line.style.border.fg).toBe("red");
    });
  });

  describe("common use cases", () => {
    it("should create vertical divider", () => {
      const divider = new Line({
        screen,
        orientation: "vertical",
        left: 10,
        top: 0,
        height: "100%",
      });

      expect(divider.position.width).toBe(1);
      expect(divider.ch).toBe("│");
    });

    it("should create horizontal separator", () => {
      const separator = new Line({
        screen,
        orientation: "horizontal",
        left: 0,
        top: 5,
        width: "100%",
      });

      expect(separator.position.height).toBe(1);
      expect(separator.ch).toBe("─");
    });

    it("should create colored line", () => {
      const line = new Line({
        screen,
        orientation: "horizontal",
        fg: "blue",
        bg: "white",
      });

      expect(line.style.fg).toBe("blue");
      expect(line.style.bg).toBe("white");
    });
  });
});
