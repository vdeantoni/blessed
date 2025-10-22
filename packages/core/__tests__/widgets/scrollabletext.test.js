import { describe, it, expect, beforeEach } from "vitest";
import ScrollableText from "../../src/widgets/scrollabletext.js";
import { createMockScreen } from "../helpers/mock.js";

describe("ScrollableText", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should create a scrollabletext instance", () => {
      const st = new ScrollableText({ screen });

      expect(st).toBeDefined();
      expect(st.type).toBe("scrollable-text");
    });

    it("should inherit from ScrollableBox", () => {
      const st = new ScrollableText({ screen });

      expect(st.screen).toBe(screen);
      expect(typeof st.render).toBe("function");
      expect(typeof st.scroll).toBe("function");
      expect(typeof st.setScrollPerc).toBe("function");
    });

    it("should always enable alwaysScroll option", () => {
      const st = new ScrollableText({ screen });

      expect(st.alwaysScroll).toBe(true);
    });

    it("should enable alwaysScroll even if explicitly disabled", () => {
      const st = new ScrollableText({
        screen,
        alwaysScroll: false,
      });

      expect(st.alwaysScroll).toBe(true);
    });

    it("should accept content option", () => {
      const st = new ScrollableText({
        screen,
        content: "Hello\nWorld\n!",
      });

      expect(st.content).toBe("Hello\nWorld\n!");
    });

    it("should accept dimensions", () => {
      const st = new ScrollableText({
        screen,
        width: 40,
        height: 20,
      });

      expect(st.options.width).toBe(40);
      expect(st.options.height).toBe(20);
    });

    it("should accept border option", () => {
      const st = new ScrollableText({
        screen,
        border: "line",
      });

      expect(st.border).toBeDefined();
    });

    it("should accept style options", () => {
      const st = new ScrollableText({
        screen,
        style: {
          fg: "white",
          bg: "blue",
          border: { fg: "cyan" },
        },
      });

      expect(st.style.fg).toBe("white");
      expect(st.style.bg).toBe("blue");
    });

    it("should be scrollable by default", () => {
      const st = new ScrollableText({ screen });

      expect(st.scrollable).toBe(true);
    });
  });

  describe("scrolling behavior", () => {
    it("should have scroll method", () => {
      const st = new ScrollableText({ screen });

      expect(typeof st.scroll).toBe("function");
    });

    it("should have setScrollPerc method", () => {
      const st = new ScrollableText({ screen });

      expect(typeof st.setScrollPerc).toBe("function");
    });

    it("should have getScrollPerc method", () => {
      const st = new ScrollableText({ screen });

      expect(typeof st.getScrollPerc).toBe("function");
    });

    it("should have getScrollHeight method", () => {
      const st = new ScrollableText({ screen });

      expect(typeof st.getScrollHeight).toBe("function");
    });

    it("should have getScroll method", () => {
      const st = new ScrollableText({ screen });

      expect(typeof st.getScroll).toBe("function");
    });

    it("should have setScroll method", () => {
      const st = new ScrollableText({ screen });

      expect(typeof st.setScroll).toBe("function");
    });
  });

  describe("content management", () => {
    it("should set content", () => {
      const st = new ScrollableText({ screen });

      st.setContent("Test content");

      expect(st.content).toBe("Test content");
    });

    it("should handle multi-line content", () => {
      const st = new ScrollableText({ screen });
      const content = "Line 1\nLine 2\nLine 3";

      st.setContent(content);

      expect(st.content).toBe(content);
    });

    it("should have getContent method", () => {
      const st = new ScrollableText({ screen });

      expect(typeof st.getContent).toBe("function");
    });
  });

  describe("common use cases", () => {
    it("should create a text viewer", () => {
      const st = new ScrollableText({
        screen,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "line",
        label: " Text Viewer ",
      });

      expect(st.alwaysScroll).toBe(true);
      expect(st._label.content).toBe(" Text Viewer ");
    });

    it("should create a log viewer", () => {
      const st = new ScrollableText({
        screen,
        border: "line",
        label: " Logs ",
        style: {
          border: { fg: "cyan" },
        },
      });

      st.setContent("Log entry 1\nLog entry 2\nLog entry 3");

      expect(st.content).toContain("Log entry");
    });

    it("should support scrollbar option", () => {
      const st = new ScrollableText({
        screen,
        scrollbar: {
          ch: " ",
          style: {
            bg: "blue",
          },
        },
      });

      expect(st.scrollbar).toBeDefined();
    });

    it("should handle long text content", () => {
      const st = new ScrollableText({ screen });
      const longText = Array(100).fill("Line").join("\n");

      st.setContent(longText);

      expect(st.content.split("\n").length).toBe(100);
    });

    it("should support mouse scrolling", () => {
      const st = new ScrollableText({
        screen,
        mouse: true,
        scrollable: true,
      });

      expect(st.options.mouse).toBe(true);
      expect(st.scrollable).toBe(true);
    });

    it("should support keys option for keyboard scrolling", () => {
      const st = new ScrollableText({
        screen,
        keys: true,
        vi: true,
      });

      expect(st.options.keys).toBe(true);
      expect(st.options.vi).toBe(true);
    });

    it("should work with percentage dimensions", () => {
      const st = new ScrollableText({
        screen,
        width: "50%",
        height: "50%",
      });

      expect(st.options.width).toBe("50%");
      expect(st.options.height).toBe("50%");
    });

    it("should work with absolute positioning", () => {
      const st = new ScrollableText({
        screen,
        top: 5,
        left: 10,
        width: 40,
        height: 20,
      });

      expect(st.options.top).toBe(5);
      expect(st.options.left).toBe(10);
    });
  });
});
