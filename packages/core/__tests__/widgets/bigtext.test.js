import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import BigText from "../../src/widgets/bigtext.js";
import { createMockScreen, initTestRuntime } from "../helpers/mock.js";

describe("BigText", () => {
  let screen;

  // Initialize runtime before all tests
  beforeAll(() => {
    initTestRuntime();
  });

  beforeEach(() => {
    screen = createMockScreen({ skipRuntimeInit: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create a bigtext instance", () => {
      const bigtext = new BigText({ screen });

      expect(bigtext).toBeDefined();
      expect(bigtext.type).toBe("bigtext");
    });

    it("should inherit from Box", () => {
      const bigtext = new BigText({ screen });

      expect(bigtext.screen).toBe(screen);
      expect(typeof bigtext.render).toBe("function");
    });

    it("should have default font path", () => {
      const bigtext = new BigText({ screen });

      expect(bigtext.font).toBeDefined();
    });

    it("should accept custom font", () => {
      const bigtext = new BigText({
        screen,
        font: __dirname + "/data/fonts/ter-u14n.json",
      });

      expect(bigtext.font).toBeDefined();
    });

    it("should initialize ratio object", () => {
      const bigtext = new BigText({ screen });

      expect(bigtext.ratio).toBeDefined();
      expect(typeof bigtext.ratio).toBe("object");
    });

    it("should load font with width and height", () => {
      const bigtext = new BigText({ screen });

      expect(bigtext.ratio.width).toBeDefined();
      expect(bigtext.ratio.height).toBeDefined();
    });

    it("should accept fch option for fill character", () => {
      const bigtext = new BigText({
        screen,
        fch: "#",
      });

      expect(bigtext.fch).toBe("#");
    });

    it("should use bold font when style.bold is true", () => {
      const bigtext = new BigText({
        screen,
        style: { bold: true },
      });

      expect(bigtext.font).toBe(bigtext.fontBold);
    });

    it("should create bigtext with content", () => {
      const bigtext = new BigText({
        parent: screen,
        content: "Hello",
        top: "center",
        left: "center",
        width: "80%",
        height: "50%",
      });

      expect(bigtext).toBeDefined();
      expect(bigtext.text).toBe("Hello");
    });
  });

  describe("loadFont()", () => {
    it("should have loadFont method", () => {
      const bigtext = new BigText({ screen });

      expect(typeof bigtext.loadFont).toBe("function");
    });

    it("should return font object", () => {
      const bigtext = new BigText({ screen });

      const font = bigtext.loadFont(__dirname + "/data/fonts/ter-u14n.json");

      expect(typeof font).toBe("object");
    });

    it("should set ratio width and height", () => {
      const bigtext = new BigText({ screen });

      expect(bigtext.ratio.width).toBeGreaterThan(0);
      expect(bigtext.ratio.height).toBeGreaterThan(0);
    });

    it("should remove space character from font", () => {
      const bigtext = new BigText({ screen });

      expect(bigtext.font[" "]).toBeUndefined();
    });
  });

  describe("setContent()", () => {
    it("should set text property", () => {
      const bigtext = new BigText({ screen });

      bigtext.setContent("HELLO");

      expect(bigtext.text).toBe("HELLO");
    });

    it("should clear content property", () => {
      const bigtext = new BigText({ screen });

      bigtext.setContent("TEST");

      expect(bigtext.content).toBe("");
    });

    it("should handle empty content", () => {
      const bigtext = new BigText({ screen });

      bigtext.setContent();

      expect(bigtext.text).toBe("");
    });

    it("should handle null content", () => {
      const bigtext = new BigText({ screen });

      bigtext.setContent(null);

      expect(bigtext.text).toBe("");
    });
  });

  describe("render()", () => {
    it("should have render method", () => {
      const bigtext = new BigText({ screen });

      expect(typeof bigtext.render).toBe("function");
    });

    it("should calculate width based on text length", () => {
      const bigtext = new BigText({ screen });
      bigtext.setContent("ABC");

      const renderSpy = vi
        .spyOn(Object.getPrototypeOf(Object.getPrototypeOf(bigtext)), "render")
        .mockReturnValue({ xi: 0, xl: 80, yi: 0, yl: 24 });

      bigtext.render();

      expect(bigtext.position.width).toBe(bigtext.ratio.width * 3 + 1);
      renderSpy.mockRestore();
    });

    it("should calculate height based on ratio", () => {
      const bigtext = new BigText({ screen });
      bigtext.setContent("TEST");

      const renderSpy = vi
        .spyOn(Object.getPrototypeOf(Object.getPrototypeOf(bigtext)), "render")
        .mockReturnValue({ xi: 0, xl: 80, yi: 0, yl: 24 });

      bigtext.render();

      expect(bigtext.position.height).toBe(bigtext.ratio.height);
      renderSpy.mockRestore();
    });

    it("should set shrink flags", () => {
      const bigtext = new BigText({ screen });
      bigtext.setContent("X");

      const renderSpy = vi
        .spyOn(Object.getPrototypeOf(Object.getPrototypeOf(bigtext)), "render")
        .mockReturnValue({ xi: 0, xl: 80, yi: 0, yl: 24 });

      bigtext.render();

      expect(bigtext._shrinkWidth).toBe(true);
      expect(bigtext._shrinkHeight).toBe(true);
      renderSpy.mockRestore();
    });
  });

  describe("common use cases", () => {
    it("should create a banner widget", () => {
      const bigtext = new BigText({
        screen,
        top: 0,
        left: "center",
        shrink: true,
        style: {
          fg: "yellow",
          bold: true,
        },
      });

      bigtext.setContent("WELCOME");

      expect(bigtext.text).toBe("WELCOME");
      expect(bigtext.style.fg).toBe("yellow");
    });

    it("should create a title display", () => {
      const bigtext = new BigText({
        screen,
        top: "center",
        left: "center",
        shrink: true,
        fch: "#",
      });

      bigtext.setContent("TITLE");

      expect(bigtext.text).toBe("TITLE");
      expect(bigtext.fch).toBe("#");
    });

    it("should support custom fill character", () => {
      const bigtext = new BigText({
        screen,
        fch: "*",
      });

      bigtext.setContent("STAR");

      expect(bigtext.fch).toBe("*");
      expect(bigtext.text).toBe("STAR");
    });

    it("should render with bold style", () => {
      const bigtext = new BigText({
        screen,
        style: {
          bold: true,
          fg: "red",
        },
      });

      bigtext.setContent("BOLD");

      expect(bigtext.font).toBe(bigtext.fontBold);
    });

    it("should calculate dimensions for text", () => {
      const bigtext = new BigText({ screen });
      bigtext.setContent("TEST");

      const renderSpy = vi
        .spyOn(Object.getPrototypeOf(Object.getPrototypeOf(bigtext)), "render")
        .mockReturnValue({ xi: 0, xl: 80, yi: 0, yl: 24 });
      bigtext.render();

      expect(bigtext.position.width).toBeGreaterThan(0);
      expect(bigtext.position.height).toBeGreaterThan(0);
      renderSpy.mockRestore();
    });

    it("should handle long text", () => {
      const bigtext = new BigText({ screen });

      bigtext.setContent("HELLO WORLD");

      expect(bigtext.text).toBe("HELLO WORLD");
    });

    it("should handle single character", () => {
      const bigtext = new BigText({ screen });

      bigtext.setContent("A");

      expect(bigtext.text).toBe("A");
      expect(bigtext.text.length).toBe(1);
    });

    it("should update text dynamically", () => {
      const bigtext = new BigText({ screen });

      bigtext.setContent("FIRST");
      expect(bigtext.text).toBe("FIRST");

      bigtext.setContent("SECOND");
      expect(bigtext.text).toBe("SECOND");
    });
  });
});
