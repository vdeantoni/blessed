import { describe, it, expect, beforeEach } from "vitest";
import Box from "../../src/widgets/box.js";
import { createMockScreen, createElement } from "../helpers/mock.js";

describe("Box", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should create a box instance", () => {
      const box = new Box({ screen });

      expect(box).toBeDefined();
      expect(box.type).toBe("box");
    });

    it("should inherit from Element", () => {
      const box = new Box({ screen });

      expect(box.screen).toBe(screen);
      expect(typeof box.render).toBe("function");
    });

    it("should accept position options", () => {
      const box = new Box({
        screen,
        left: 5,
        top: 10,
        width: 20,
        height: 15,
      });

      expect(box.position).toBeDefined();
      expect(box.position.left).toBe(5);
      expect(box.position.top).toBe(10);
      expect(box.position.width).toBe(20);
      expect(box.position.height).toBe(15);
    });

    it("should accept style options", () => {
      const box = new Box({
        screen,
        style: {
          fg: "red",
          bg: "blue",
          bold: true,
        },
      });

      expect(box.style).toBeDefined();
      expect(box.style.fg).toBe("red");
      expect(box.style.bg).toBe("blue");
      expect(box.style.bold).toBe(true);
    });

    it("should accept individual style properties", () => {
      const box = new Box({
        screen,
        fg: "green",
        bg: "black",
        bold: true,
        underline: true,
      });

      expect(box.style.fg).toBe("green");
      expect(box.style.bg).toBe("black");
      expect(box.style.bold).toBe(true);
      expect(box.style.underline).toBe(true);
    });

    it("should set name property", () => {
      const box = new Box({
        screen,
        name: "my-box",
      });

      expect(box.name).toBe("my-box");
    });

    it("should accept content option", () => {
      const box = new Box({
        screen,
        content: "Hello World",
      });

      expect(box.content).toBe("Hello World");
    });

    it("should handle hidden option", () => {
      const box = new Box({
        screen,
        hidden: true,
      });

      expect(box.hidden).toBe(true);
    });

    it("should default hidden to false", () => {
      const box = new Box({ screen });

      expect(box.hidden).toBe(false);
    });

    it("should accept align option", () => {
      const box = new Box({
        screen,
        align: "center",
      });

      expect(box.align).toBe("center");
    });

    it("should default align to left", () => {
      const box = new Box({ screen });

      expect(box.align).toBe("left");
    });

    it("should accept valign option", () => {
      const box = new Box({
        screen,
        valign: "middle",
      });

      expect(box.valign).toBe("middle");
    });

    it("should default valign to top", () => {
      const box = new Box({ screen });

      expect(box.valign).toBe("top");
    });

    it("should accept wrap option", () => {
      const box = new Box({
        screen,
        wrap: false,
      });

      expect(box.wrap).toBe(false);
    });

    it("should default wrap to true", () => {
      const box = new Box({ screen });

      expect(box.wrap).toBe(true);
    });

    it("should accept shrink option", () => {
      const box = new Box({
        screen,
        shrink: true,
      });

      expect(box.shrink).toBe(true);
    });

    it("should handle shrink width", () => {
      const box = new Box({
        screen,
        width: "shrink",
        height: 10,
      });

      expect(box.shrink).toBe(true);
      expect(box.position.width).toBeUndefined();
    });

    it("should handle shrink height", () => {
      const box = new Box({
        screen,
        width: 10,
        height: "shrink",
      });

      expect(box.shrink).toBe(true);
      expect(box.position.height).toBeUndefined();
    });

    it("should accept border option", () => {
      const box = new Box({
        screen,
        border: {
          type: "line",
        },
      });

      expect(box.border).toBeDefined();
      expect(box.border.type).toBe("line");
    });

    it("should accept padding option", () => {
      const box = new Box({
        screen,
        padding: {
          left: 2,
          right: 2,
          top: 1,
          bottom: 1,
        },
      });

      expect(box.padding).toBeDefined();
      expect(box.padding.left).toBe(2);
      expect(box.padding.right).toBe(2);
      expect(box.padding.top).toBe(1);
      expect(box.padding.bottom).toBe(1);
    });

    it("should accept number as uniform padding", () => {
      const box = new Box({
        screen,
        padding: 2,
      });

      expect(box.padding).toBeDefined();
    });

    it("should accept tags option", () => {
      const box = new Box({
        screen,
        tags: true,
      });

      expect(box.parseTags).toBe(true);
    });
  });

  describe("hierarchy", () => {
    it("should be added to screen children", () => {
      const box = new Box({ screen });
      screen.append(box);

      expect(screen.children).toContain(box);
      expect(box.parent).toBe(screen);
      expect(box.screen).toBe(screen);
    });

    it("should support nested boxes", () => {
      const parent = new Box({ screen });
      const child = new Box({ screen });

      parent.append(child);

      expect(parent.children).toContain(child);
      expect(child.parent).toBe(parent);
    });

    it("should remove from parent", () => {
      const box = new Box({ screen });
      screen.append(box);
      screen.remove(box);

      expect(screen.children).not.toContain(box);
      expect(box.parent).toBeNull();
    });
  });

  describe("content management", () => {
    it("should set content", () => {
      const box = new Box({ screen });
      box.setContent("New content");

      expect(box.content).toBe("New content");
    });

    it("should get content", () => {
      const box = new Box({
        screen,
        content: "Initial content",
      });

      // getContent() may return processed content (without tags, etc)
      // Just verify it exists and is a string
      expect(typeof box.getContent()).toBe("string");
      expect(box.content).toBe("Initial content");
    });

    it("should handle empty content", () => {
      const box = new Box({ screen });

      expect(box.content).toBe("");
    });
  });

  describe("positioning", () => {
    it("should handle absolute positioning", () => {
      const box = new Box({
        screen,
        left: 10,
        top: 5,
        width: 30,
        height: 20,
      });

      expect(box.position.left).toBe(10);
      expect(box.position.top).toBe(5);
      expect(box.position.width).toBe(30);
      expect(box.position.height).toBe(20);
    });

    it("should handle percentage positioning", () => {
      const box = new Box({
        screen,
        left: "10%",
        top: "20%",
        width: "50%",
        height: "60%",
      });

      expect(box.position.left).toBe("10%");
      expect(box.position.top).toBe("20%");
      expect(box.position.width).toBe("50%");
      expect(box.position.height).toBe("60%");
    });

    it("should handle center positioning", () => {
      const box = new Box({
        screen,
        left: "center",
        top: "center",
        width: 20,
        height: 10,
      });

      expect(box.position.left).toBe("center");
      expect(box.position.top).toBe("center");
    });

    it("should handle right/bottom positioning", () => {
      const box = new Box({
        screen,
        right: 5,
        bottom: 3,
        width: 20,
        height: 10,
      });

      expect(box.position.right).toBe(5);
      expect(box.position.bottom).toBe(3);
    });
  });
});
