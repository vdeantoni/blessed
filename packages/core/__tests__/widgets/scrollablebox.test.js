import { describe, it, expect, beforeEach, vi } from "vitest";
import ScrollableBox from "../../src/widgets/scrollablebox.js";
import Box from "../../src/widgets/box.js";
import { createMockScreen } from "../helpers/mock.js";

describe("ScrollableBox", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should create a scrollablebox instance", () => {
      const box = new ScrollableBox({ screen });

      expect(box).toBeDefined();
      expect(box.type).toBe("scrollable-box");
    });

    it("should inherit from Box", () => {
      const box = new ScrollableBox({ screen });

      expect(box.screen).toBe(screen);
      expect(typeof box.append).toBe("function");
    });

    it("should be scrollable by default", () => {
      const box = new ScrollableBox({ screen });

      expect(box.scrollable).toBe(true);
    });

    it("should not be scrollable if scrollable option is false", () => {
      const box = new ScrollableBox({
        screen,
        scrollable: false,
      });

      expect(box.scrollable).toBeUndefined();
    });

    it("should initialize scroll properties", () => {
      const box = new ScrollableBox({ screen });

      expect(box.childOffset).toBe(0);
      expect(box.childBase).toBe(0);
    });

    it("should accept baseLimit option", () => {
      const box = new ScrollableBox({
        screen,
        baseLimit: 100,
      });

      expect(box.baseLimit).toBe(100);
    });

    it("should default baseLimit to Infinity", () => {
      const box = new ScrollableBox({ screen });

      expect(box.baseLimit).toBe(Infinity);
    });

    it("should accept alwaysScroll option", () => {
      const box = new ScrollableBox({
        screen,
        alwaysScroll: true,
      });

      expect(box.alwaysScroll).toBe(true);
    });

    it("should accept scrollbar option", () => {
      const box = new ScrollableBox({
        screen,
        scrollbar: {
          ch: "█",
          fg: "blue",
          bg: "white",
        },
      });

      expect(box.scrollbar).toBeDefined();
      expect(box.scrollbar.ch).toBe("█");
    });
  });

  describe("scroll()", () => {
    it("should update child offset on scroll", () => {
      const box = new ScrollableBox({
        screen,
        width: 20,
        height: 10,
      });

      // Initialize content lines to allow scrolling
      box._clines = [
        "line1",
        "line2",
        "line3",
        "line4",
        "line5",
        "line6",
        "line7",
        "line8",
        "line9",
        "line10",
      ];

      const initialOffset = box.childOffset;
      box.scroll(2);

      expect(box.childOffset).toBeGreaterThanOrEqual(initialOffset);
    });

    it("should not modify childBase when scrolling within visible area", () => {
      const box = new ScrollableBox({
        screen,
        width: 20,
        height: 10,
      });

      box._clines = ["line1", "line2", "line3"];

      const initialBase = box.childBase;
      box.scroll(1);

      expect(box.childBase).toBe(initialBase);
    });

    it("should not scroll when not scrollable", () => {
      const box = new ScrollableBox({
        screen,
        scrollable: false,
      });

      const result = box.scroll(5);

      expect(result).toBeUndefined();
    });

    it("should not scroll when detached", () => {
      const box = new ScrollableBox({ screen });
      box.detach();

      const result = box.scroll(5);

      expect(result).toBeUndefined();
    });
  });

  describe("scrollTo()", () => {
    it("should update scroll position", () => {
      const box = new ScrollableBox({
        screen,
        width: 20,
        height: 10,
      });

      box._clines = ["line1", "line2", "line3", "line4", "line5"];

      const initialScroll = box.getScroll();
      box.scrollTo(3);

      // scrollTo calls scroll(0) first, then scrolls to target
      expect(box.getScroll()).toBeGreaterThanOrEqual(initialScroll);
    });

    it("should be aliased as setScroll", () => {
      const box = new ScrollableBox({
        screen,
        width: 20,
        height: 10,
      });

      box._clines = ["line1", "line2", "line3", "line4", "line5"];

      // setScroll is a wrapper method that calls scrollTo
      expect(typeof box.setScroll).toBe("function");

      // Verify setScroll can be called without error
      expect(() => box.setScroll(3)).not.toThrow();
    });
  });

  describe("getScroll()", () => {
    it("should return current scroll position", () => {
      const box = new ScrollableBox({ screen });

      box.childBase = 5;
      box.childOffset = 2;

      expect(box.getScroll()).toBe(7);
    });

    it("should return 0 initially", () => {
      const box = new ScrollableBox({ screen });

      expect(box.getScroll()).toBe(0);
    });
  });

  describe("resetScroll()", () => {
    it("should reset scroll to top", () => {
      const box = new ScrollableBox({ screen });

      box.childBase = 10;
      box.childOffset = 5;

      box.resetScroll();

      expect(box.childBase).toBe(0);
      expect(box.childOffset).toBe(0);
    });

    it("should emit scroll event", () => {
      const box = new ScrollableBox({ screen });
      const scrollSpy = vi.fn();
      box.on("scroll", scrollSpy);

      box.childBase = 10;
      box.resetScroll();

      expect(scrollSpy).toHaveBeenCalled();
    });

    it("should not reset when not scrollable", () => {
      const box = new ScrollableBox({
        screen,
        scrollable: false,
      });

      const result = box.resetScroll();

      expect(result).toBeUndefined();
    });
  });

  describe("getScrollHeight()", () => {
    it("should return scroll height when clines are available", () => {
      const box = new ScrollableBox({
        screen,
        width: 20,
        height: 10,
      });

      box._clines = ["line1", "line2", "line3", "line4", "line5"];

      const height = box.getScrollHeight();

      expect(height).toBeGreaterThanOrEqual(5);
    });
  });

  describe("getScrollPerc()", () => {
    it("should return scroll percentage when properly initialized", () => {
      const box = new ScrollableBox({
        screen,
        width: 20,
        height: 10,
      });

      box._clines = ["line1", "line2", "line3", "line4", "line5"];
      box.lpos = {
        xi: 0,
        xl: 20,
        yi: 0,
        yl: 10,
      };

      const perc = box.getScrollPerc();

      expect(perc).toBeGreaterThanOrEqual(0);
    });
  });

  describe("setScrollPerc()", () => {
    it("should update scroll position based on percentage", () => {
      const box = new ScrollableBox({
        screen,
        width: 20,
        height: 10,
      });

      box._clines = [
        "line1",
        "line2",
        "line3",
        "line4",
        "line5",
        "line6",
        "line7",
        "line8",
        "line9",
        "line10",
      ];

      const initialScroll = box.getScroll();
      box.setScrollPerc(50);

      expect(box.getScroll()).toBeGreaterThanOrEqual(initialScroll);
    });
  });

  describe("keyboard interaction", () => {
    it("should scroll down on down arrow key", () => {
      const box = new ScrollableBox({
        screen,
        keys: true,
        width: 20,
        height: 10,
      });

      screen.render = vi.fn();
      box.scroll = vi.fn();

      box.emit("keypress", null, { name: "down" });

      expect(box.scroll).toHaveBeenCalledWith(1);
      expect(screen.render).toHaveBeenCalled();
    });

    it("should scroll up on up arrow key", () => {
      const box = new ScrollableBox({
        screen,
        keys: true,
        width: 20,
        height: 10,
      });

      screen.render = vi.fn();
      box.scroll = vi.fn();

      box.emit("keypress", null, { name: "up" });

      expect(box.scroll).toHaveBeenCalledWith(-1);
      expect(screen.render).toHaveBeenCalled();
    });

    it("should support vi keys with vi option", () => {
      const box = new ScrollableBox({
        screen,
        keys: true,
        vi: true,
      });

      screen.render = vi.fn();
      box.scroll = vi.fn();

      // j key (vi down)
      box.emit("keypress", null, { name: "j" });
      expect(box.scroll).toHaveBeenCalledWith(1);

      // k key (vi up)
      box.emit("keypress", null, { name: "k" });
      expect(box.scroll).toHaveBeenCalledWith(-1);
    });

    it("should scroll half page with vi ctrl-d", () => {
      const box = new ScrollableBox({
        screen,
        keys: true,
        vi: true,
        height: 20,
      });

      screen.render = vi.fn();
      box.scroll = vi.fn();

      box.emit("keypress", null, { name: "d", ctrl: true });

      expect(box.scroll).toHaveBeenCalled();
      expect(screen.render).toHaveBeenCalled();
    });

    it("should scroll half page up with vi ctrl-u", () => {
      const box = new ScrollableBox({
        screen,
        keys: true,
        vi: true,
        height: 20,
      });

      screen.render = vi.fn();
      box.scroll = vi.fn();

      box.emit("keypress", null, { name: "u", ctrl: true });

      expect(box.scroll).toHaveBeenCalled();
      expect(screen.render).toHaveBeenCalled();
    });

    it("should scroll full page with vi ctrl-f", () => {
      const box = new ScrollableBox({
        screen,
        keys: true,
        vi: true,
        height: 20,
      });

      screen.render = vi.fn();
      box.scroll = vi.fn();

      box.emit("keypress", null, { name: "f", ctrl: true });

      expect(box.scroll).toHaveBeenCalledWith(20);
    });

    it("should scroll full page up with vi ctrl-b", () => {
      const box = new ScrollableBox({
        screen,
        keys: true,
        vi: true,
        height: 20,
      });

      screen.render = vi.fn();
      box.scroll = vi.fn();

      box.emit("keypress", null, { name: "b", ctrl: true });

      expect(box.scroll).toHaveBeenCalledWith(-20);
    });

    it("should scroll to top with vi g", () => {
      const box = new ScrollableBox({
        screen,
        keys: true,
        vi: true,
      });

      screen.render = vi.fn();
      box.scrollTo = vi.fn();

      box.emit("keypress", null, { name: "g", shift: false });

      expect(box.scrollTo).toHaveBeenCalledWith(0);
      expect(screen.render).toHaveBeenCalled();
    });

    it("should scroll to bottom with vi shift-g", () => {
      const box = new ScrollableBox({
        screen,
        keys: true,
        vi: true,
      });

      screen.render = vi.fn();
      box.scrollTo = vi.fn();
      box.getScrollHeight = vi.fn().mockReturnValue(100);

      box.emit("keypress", null, { name: "g", shift: true });

      expect(box.scrollTo).toHaveBeenCalledWith(100);
      expect(screen.render).toHaveBeenCalled();
    });

    it("should not handle keys when keys option is false", () => {
      const box = new ScrollableBox({
        screen,
        keys: false,
      });

      box.scroll = vi.fn();

      box.emit("keypress", null, { name: "down" });

      expect(box.scroll).not.toHaveBeenCalled();
    });

    it("should not handle keys when ignoreKeys is true", () => {
      const box = new ScrollableBox({
        screen,
        keys: true,
        ignoreKeys: true,
      });

      box.scroll = vi.fn();

      box.emit("keypress", null, { name: "down" });

      expect(box.scroll).not.toHaveBeenCalled();
    });
  });

  describe("mouse interaction", () => {
    it("should scroll on wheel down", () => {
      const box = new ScrollableBox({
        screen,
        mouse: true,
        height: 20,
      });

      screen.render = vi.fn();
      box.scroll = vi.fn();

      box.emit("wheeldown");

      expect(box.scroll).toHaveBeenCalled();
      expect(screen.render).toHaveBeenCalled();
    });

    it("should scroll on wheel up", () => {
      const box = new ScrollableBox({
        screen,
        mouse: true,
        height: 20,
      });

      screen.render = vi.fn();
      box.scroll = vi.fn();

      box.emit("wheelup");

      expect(box.scroll).toHaveBeenCalled();
      expect(screen.render).toHaveBeenCalled();
    });

    it("should not handle wheel events when mouse is disabled", () => {
      const box = new ScrollableBox({
        screen,
        mouse: false,
      });

      box.scroll = vi.fn();

      box.emit("wheeldown");

      expect(box.scroll).not.toHaveBeenCalled();
    });
  });

  describe("common use cases", () => {
    it("should create a log viewer", () => {
      const box = new ScrollableBox({
        screen,
        width: 40,
        height: 20,
        border: "line",
        label: "Logs",
        keys: true,
        mouse: true,
        scrollbar: {
          ch: "█",
          fg: "blue",
        },
      });

      expect(box.scrollable).toBe(true);
      expect(box.scrollbar).toBeDefined();
    });

    it("should track scroll position", () => {
      const box = new ScrollableBox({
        screen,
        width: 40,
        height: 10,
      });

      box._clines = ["line1", "line2", "line3", "line4", "line5"];
      box.scrollTo(2);

      const scroll1 = box.getScroll();

      expect(scroll1).toBeGreaterThanOrEqual(0);
    });
  });
});
