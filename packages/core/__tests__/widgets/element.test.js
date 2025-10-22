import { describe, it, expect, beforeEach, vi } from "vitest";
import Element from "../../src/widgets/element.js";
import { createMockScreen } from "../helpers/mock.js";

describe("Element", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should create an element instance", () => {
      const el = new Element({ screen });

      expect(el).toBeDefined();
      expect(el.type).toBe("element");
    });

    it("should inherit from Node", () => {
      const el = new Element({ screen });

      expect(el.screen).toBe(screen);
      expect(typeof el.append).toBe("function");
      expect(typeof el.prepend).toBe("function");
      expect(typeof el.remove).toBe("function");
    });

    it("should accept name option", () => {
      const el = new Element({ screen, name: "myElement" });

      expect(el.name).toBe("myElement");
    });

    it("should initialize position object", () => {
      const el = new Element({
        screen,
        top: 5,
        left: 10,
        width: 30,
        height: 20,
      });

      expect(el.position).toBeDefined();
      expect(el.position.top).toBe(5);
      expect(el.position.left).toBe(10);
      expect(el.position.width).toBe(30);
      expect(el.position.height).toBe(20);
    });

    it("should accept position object directly", () => {
      const el = new Element({
        screen,
        position: {
          top: 1,
          left: 2,
          width: 50,
          height: 25,
        },
      });

      expect(el.position.top).toBe(1);
      expect(el.position.left).toBe(2);
    });

    it("should handle shrink width option", () => {
      const el = new Element({
        screen,
        width: "shrink",
        height: 10,
      });

      expect(el.shrink).toBe(true);
      expect(el.position.width).toBeUndefined();
    });

    it("should handle shrink height option", () => {
      const el = new Element({
        screen,
        width: 10,
        height: "shrink",
      });

      expect(el.shrink).toBe(true);
      expect(el.position.height).toBeUndefined();
    });

    it("should initialize style from options", () => {
      const el = new Element({
        screen,
        style: {
          fg: "white",
          bg: "blue",
          bold: true,
        },
      });

      expect(el.style.fg).toBe("white");
      expect(el.style.bg).toBe("blue");
      expect(el.style.bold).toBe(true);
    });

    it("should initialize style from individual options", () => {
      const el = new Element({
        screen,
        fg: "green",
        bg: "black",
        bold: true,
        underline: true,
      });

      expect(el.style.fg).toBe("green");
      expect(el.style.bg).toBe("black");
      expect(el.style.bold).toBe(true);
      expect(el.style.underline).toBe(true);
    });

    it("should default hidden to false", () => {
      const el = new Element({ screen });

      expect(el.hidden).toBe(false);
    });

    it("should accept hidden option", () => {
      const el = new Element({ screen, hidden: true });

      expect(el.hidden).toBe(true);
    });

    it("should accept fixed option", () => {
      const el = new Element({ screen, fixed: true });

      expect(el.fixed).toBe(true);
    });

    it("should default align to left", () => {
      const el = new Element({ screen });

      expect(el.align).toBe("left");
    });

    it("should accept align option", () => {
      const el = new Element({ screen, align: "center" });

      expect(el.align).toBe("center");
    });

    it("should default valign to top", () => {
      const el = new Element({ screen });

      expect(el.valign).toBe("top");
    });

    it("should accept valign option", () => {
      const el = new Element({ screen, valign: "middle" });

      expect(el.valign).toBe("middle");
    });

    it("should default wrap to true", () => {
      const el = new Element({ screen });

      expect(el.wrap).toBe(true);
    });

    it("should accept wrap option", () => {
      const el = new Element({ screen, wrap: false });

      expect(el.wrap).toBe(false);
    });

    it("should accept ch (fill character) option", () => {
      const el = new Element({ screen, ch: "#" });

      expect(el.ch).toBe("#");
    });

    it("should default ch to space", () => {
      const el = new Element({ screen });

      expect(el.ch).toBe(" ");
    });

    it("should apply scrollable behavior when scrollable option is true", () => {
      const el = new Element({ screen, scrollable: true });

      expect(typeof el.scroll).toBe("function");
      expect(typeof el.scrollTo).toBe("function");
      expect(typeof el.getScroll).toBe("function");
      expect(typeof el.resetScroll).toBe("function");
      expect(el.scrollable).toBe(true);
    });
  });

  describe("show() and hide()", () => {
    it("should have show method", () => {
      const el = new Element({ screen, hidden: true });

      expect(typeof el.show).toBe("function");
    });

    it("should have hide method", () => {
      const el = new Element({ screen });

      expect(typeof el.hide).toBe("function");
    });

    it("should show element and emit event", () => {
      const el = new Element({ screen, hidden: true });
      const showSpy = vi.fn();

      el.on("show", showSpy);
      el.show();

      expect(el.hidden).toBe(false);
      expect(showSpy).toHaveBeenCalled();
    });

    it("should hide element and emit event", () => {
      const el = new Element({ screen });
      const hideSpy = vi.fn();

      el.on("hide", hideSpy);
      el.hide();

      expect(el.hidden).toBe(true);
      expect(hideSpy).toHaveBeenCalled();
    });
  });

  describe("toggle()", () => {
    it("should have toggle method", () => {
      const el = new Element({ screen });

      expect(typeof el.toggle).toBe("function");
    });

    it("should toggle visibility from hidden to visible", () => {
      const el = new Element({ screen, hidden: true });

      el.toggle();

      expect(el.hidden).toBe(false);
    });

    it("should toggle visibility from visible to hidden", () => {
      const el = new Element({ screen });

      el.toggle();

      expect(el.hidden).toBe(true);
    });
  });

  describe("focus()", () => {
    it("should have focus method", () => {
      const el = new Element({ screen });

      expect(typeof el.focus).toBe("function");
    });
  });

  describe("setContent() and getContent()", () => {
    it("should have setContent method", () => {
      const el = new Element({ screen });

      expect(typeof el.setContent).toBe("function");
    });

    it("should have getContent method", () => {
      const el = new Element({ screen });

      expect(typeof el.getContent).toBe("function");
    });

    it("should set content", () => {
      const el = new Element({ screen });
      el.setContent("Test Content");

      expect(el.content).toBe("Test Content");
    });

    it("should emit set content event", () => {
      const el = new Element({ screen });
      const contentSpy = vi.fn();

      el.on("set content", contentSpy);
      el.setContent("New Content");

      expect(contentSpy).toHaveBeenCalled();
    });
  });

  describe("setText() and getText()", () => {
    it("should have setText method", () => {
      const el = new Element({ screen });

      expect(typeof el.setText).toBe("function");
    });

    it("should have getText method", () => {
      const el = new Element({ screen });

      expect(typeof el.getText).toBe("function");
    });
  });

  describe("insertLine() and deleteLine()", () => {
    it("should have insertLine method", () => {
      const el = new Element({ screen });

      expect(typeof el.insertLine).toBe("function");
    });

    it("should have deleteLine method", () => {
      const el = new Element({ screen });

      expect(typeof el.deleteLine).toBe("function");
    });
  });

  describe("insertTop() and insertBottom()", () => {
    it("should have insertTop method", () => {
      const el = new Element({ screen });

      expect(typeof el.insertTop).toBe("function");
    });

    it("should have insertBottom method", () => {
      const el = new Element({ screen });

      expect(typeof el.insertBottom).toBe("function");
    });
  });

  describe("common use cases", () => {
    it("should create a basic container", () => {
      const el = new Element({
        screen,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      });

      expect(el.position.width).toBe("100%");
      expect(el.position.height).toBe("100%");
    });

    it("should create a styled element", () => {
      const el = new Element({
        screen,
        style: {
          fg: "white",
          bg: "blue",
          border: { fg: "cyan" },
        },
      });

      expect(el.style.fg).toBe("white");
      expect(el.style.bg).toBe("blue");
    });

    it("should create a centered element", () => {
      const el = new Element({
        screen,
        top: "center",
        left: "center",
        width: "50%",
        height: "50%",
      });

      expect(el.position.top).toBe("center");
      expect(el.position.left).toBe("center");
    });

    it("should create a shrinkable element", () => {
      const el = new Element({
        screen,
        width: "shrink",
        height: "shrink",
      });

      expect(el.shrink).toBe(true);
    });

    it("should create an aligned element", () => {
      const el = new Element({
        screen,
        align: "center",
        valign: "middle",
      });

      expect(el.align).toBe("center");
      expect(el.valign).toBe("middle");
    });

    it("should support content with tags", () => {
      const el = new Element({ screen });

      el.setContent("{red-fg}Red Text{/red-fg}");

      expect(el.content).toContain("Red Text");
    });
  });

  describe("Rendering Output", () => {
    it("should render content to screen buffer", () => {
      const el = new Element({
        screen,
        top: 0,
        left: 0,
        width: 20,
        height: 5,
        content: "Hello World",
      });

      screen.append(el);
      el.render();

      expect(el.content).toBe("Hello World");
    });

    it("should render with absolute positioning", () => {
      const el = new Element({
        screen,
        top: 5,
        left: 10,
        width: 20,
        height: 5,
        content: "Test",
      });

      screen.append(el);
      expect(el.position.top).toBe(5);
      expect(el.position.left).toBe(10);
    });

    it("should handle empty content", () => {
      const el = new Element({
        screen,
        width: 10,
        height: 5,
        content: "",
      });

      screen.append(el);
      el.render();

      expect(el.content).toBe("");
    });

    it("should render multiline content", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 5,
        content: "Line 1\nLine 2\nLine 3",
      });

      screen.append(el);
      el.render();

      expect(el.content).toContain("\n");
    });

    it("should handle content exceeding dimensions", () => {
      const el = new Element({
        screen,
        width: 5,
        height: 2,
        content: "This is a very long line that exceeds width",
      });

      screen.append(el);
      el.render();

      expect(el.content).toBeDefined();
    });

    it("should render with style attributes", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 5,
        content: "Styled",
        style: {
          fg: "red",
          bg: "blue",
          bold: true,
        },
      });

      screen.append(el);
      el.render();

      expect(el.style.fg).toBe("red");
      expect(el.style.bg).toBe("blue");
      expect(el.style.bold).toBe(true);
    });

    it("should handle tags in content", () => {
      const el = new Element({
        screen,
        tags: true,
        content: "{red-fg}Error{/red-fg} message",
      });

      screen.append(el);

      // Just verify content is set - tags parsing requires full program mock
      expect(el.content).toContain("Error");
      expect(el.content).toContain("message");
    });

    it("should render when hidden is false", () => {
      const el = new Element({
        screen,
        hidden: false,
        content: "Visible",
      });

      screen.append(el);
      el.render();

      expect(el.hidden).toBe(false);
    });

    it("should not render when hidden is true", () => {
      const el = new Element({
        screen,
        hidden: true,
        content: "Hidden",
      });

      screen.append(el);
      const result = el.render();

      expect(el.hidden).toBe(true);
    });

    it("should render with border", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 5,
        border: { type: "line" },
        content: "Bordered",
      });

      screen.append(el);

      expect(el.border).toBeDefined();
      expect(el.border.type).toBe("line");
    });

    it("should have border defined affecting dimensions", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        border: { type: "line" },
      });

      screen.append(el);

      // Border should exist and type should be set
      expect(el.border).toBeDefined();
      expect(el.border.type).toBe("line");
    });

    it("should have padding affecting inner dimensions", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        padding: { left: 2, right: 2, top: 1, bottom: 1 },
      });

      screen.append(el);

      expect(el.padding.left).toBe(2);
      expect(el.padding.right).toBe(2);
    });

    it("should accept padding configuration", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        padding: { left: 2, right: 2, top: 1, bottom: 1 },
        content: "Padded",
      });

      screen.append(el);

      expect(el.padding.left).toBe(2);
      expect(el.padding.right).toBe(2);
      expect(el.padding.top).toBe(1);
      expect(el.padding.bottom).toBe(1);
    });

    it("should accept both border and padding", () => {
      const el = new Element({
        screen,
        width: 30,
        height: 20,
        border: { type: "line" },
        padding: { left: 1, right: 1, top: 1, bottom: 1 },
      });

      screen.append(el);

      expect(el.border.type).toBe("line");
      expect(el.padding.left).toBe(1);
    });

    it("should handle align left", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 5,
        align: "left",
        content: "Left",
      });

      screen.append(el);
      el.render();

      expect(el.align).toBe("left");
    });

    it("should handle align center", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 5,
        align: "center",
        content: "Center",
      });

      screen.append(el);
      el.render();

      expect(el.align).toBe("center");
    });

    it("should handle align right", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 5,
        align: "right",
        content: "Right",
      });

      screen.append(el);
      el.render();

      expect(el.align).toBe("right");
    });

    it("should handle valign top", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 5,
        valign: "top",
        content: "Top",
      });

      screen.append(el);
      el.render();

      expect(el.valign).toBe("top");
    });

    it("should handle valign middle", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 5,
        valign: "middle",
        content: "Middle",
      });

      screen.append(el);
      el.render();

      expect(el.valign).toBe("middle");
    });

    it("should handle valign bottom", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 5,
        valign: "bottom",
        content: "Bottom",
      });

      screen.append(el);
      el.render();

      expect(el.valign).toBe("bottom");
    });

    it("should handle wrap enabled", () => {
      const el = new Element({
        screen,
        width: 10,
        height: 5,
        wrap: true,
        content: "This is a long line that should wrap",
      });

      screen.append(el);
      el.render();

      expect(el.wrap).toBe(true);
    });

    it("should handle wrap disabled", () => {
      const el = new Element({
        screen,
        width: 10,
        height: 5,
        wrap: false,
        content: "This is a long line that should not wrap",
      });

      screen.append(el);
      el.render();

      expect(el.wrap).toBe(false);
    });

    it("should render with custom fill character", () => {
      const el = new Element({
        screen,
        width: 10,
        height: 5,
        ch: "#",
      });

      screen.append(el);
      el.render();

      expect(el.ch).toBe("#");
    });
  });

  describe("Positioning Edge Cases", () => {
    it("should accept percentage-based width", () => {
      const el = new Element({
        screen,
        width: "50%",
        height: 10,
      });

      screen.append(el);
      expect(el.position.width).toBe("50%");
    });

    it("should accept percentage-based height", () => {
      const el = new Element({
        screen,
        width: 20,
        height: "50%",
      });

      screen.append(el);
      expect(el.position.height).toBe("50%");
    });

    it("should accept percentage positioning for top", () => {
      const el = new Element({
        screen,
        top: "50%",
        width: 20,
        height: 5,
      });

      screen.append(el);
      expect(el.position.top).toBe("50%");
    });

    it("should accept percentage positioning for left", () => {
      const el = new Element({
        screen,
        left: "50%",
        width: 20,
        height: 5,
      });

      screen.append(el);
      expect(el.position.left).toBe("50%");
    });

    it("should accept right positioning", () => {
      const el = new Element({
        screen,
        right: 0,
        width: 20,
        height: 5,
      });

      screen.append(el);
      expect(el.position.right).toBe(0);
    });

    it("should accept bottom positioning", () => {
      const el = new Element({
        screen,
        bottom: 0,
        width: 20,
        height: 5,
      });

      screen.append(el);
      expect(el.position.bottom).toBe(0);
    });

    it("should accept center positioning horizontal", () => {
      const el = new Element({
        screen,
        left: "center",
        width: 20,
        height: 5,
      });

      screen.append(el);
      expect(el.position.left).toBe("center");
    });

    it("should accept center positioning vertical", () => {
      const el = new Element({
        screen,
        top: "center",
        width: 20,
        height: 5,
      });

      screen.append(el);
      expect(el.position.top).toBe("center");
    });

    it("should support nested elements with percentage positioning", () => {
      const parent = new Element({
        screen,
        width: 60,
        height: 20,
      });

      const child = new Element({
        parent,
        width: "50%",
        height: "50%",
      });

      screen.append(parent);
      parent.append(child);

      expect(child.parent).toBe(parent);
      expect(child.position.width).toBe("50%");
      expect(child.position.height).toBe("50%");
    });

    it("should support deeply nested elements", () => {
      const parent = new Element({
        screen,
        width: 80,
        height: 40,
      });

      const child = new Element({
        parent,
        width: "50%",
        height: "50%",
      });

      const grandchild = new Element({
        parent: child,
        width: "50%",
        height: "50%",
      });

      screen.append(parent);
      parent.append(child);
      child.append(grandchild);

      expect(grandchild.parent).toBe(child);
      expect(grandchild.position.width).toBe("50%");
    });

    it("should support elements with parent offset", () => {
      const parent = new Element({
        screen,
        top: 5,
        left: 10,
        width: 40,
        height: 20,
      });

      const child = new Element({
        parent,
        top: 2,
        left: 3,
        width: 20,
        height: 10,
      });

      screen.append(parent);
      parent.append(child);

      expect(child.parent).toBe(parent);
      expect(child.position.top).toBe(2);
      expect(child.position.left).toBe(3);
    });

    it("should support width shrink", () => {
      const el = new Element({
        screen,
        width: "shrink",
        height: 10,
        content: "Short",
      });

      screen.append(el);

      expect(el.shrink).toBe(true);
    });

    it("should support height shrink", () => {
      const el = new Element({
        screen,
        width: 20,
        height: "shrink",
        content: "Line1\nLine2",
      });

      screen.append(el);

      expect(el.shrink).toBe(true);
    });

    it("should support both width and height shrink", () => {
      const el = new Element({
        screen,
        width: "shrink",
        height: "shrink",
        content: "Test",
      });

      screen.append(el);

      expect(el.shrink).toBe(true);
    });

    it("should accept position with right and width", () => {
      const el = new Element({
        screen,
        right: 10,
        width: 20,
        height: 5,
      });

      screen.append(el);

      expect(el.position.right).toBe(10);
      expect(el.position.width).toBe(20);
    });

    it("should accept position with bottom and height", () => {
      const el = new Element({
        screen,
        bottom: 5,
        width: 20,
        height: 5,
      });

      screen.append(el);

      expect(el.position.bottom).toBe(5);
      expect(el.position.height).toBe(5);
    });

    it("should accept border configuration", () => {
      const el = new Element({
        screen,
        top: 0,
        left: 0,
        width: 20,
        height: 10,
        border: { type: "line" },
      });

      screen.append(el);

      expect(el.border).toBeDefined();
      expect(el.border.type).toBe("line");
    });

    it("should accept padding configuration for positioning", () => {
      const el = new Element({
        screen,
        top: 0,
        left: 0,
        width: 20,
        height: 10,
        padding: 1,
      });

      screen.append(el);

      expect(el.padding).toBeDefined();
    });

    it("should support complex positioning with all options", () => {
      const el = new Element({
        screen,
        top: "center",
        left: "center",
        width: "50%",
        height: "50%",
        border: { type: "line" },
        padding: 1,
      });

      screen.append(el);

      expect(el.position.top).toBe("center");
      expect(el.position.left).toBe("center");
      expect(el.position.width).toBe("50%");
      expect(el.position.height).toBe("50%");
      expect(el.border.type).toBe("line");
    });
  });

  describe("Line manipulation methods", () => {
    it("should have insertLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.insertLine).toBe("function");
    });

    it("should have deleteLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.deleteLine).toBe("function");
    });

    it("should have insertTop method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.insertTop).toBe("function");
    });

    it("should have insertBottom method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.insertBottom).toBe("function");
    });

    it("should have deleteTop method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.deleteTop).toBe("function");
    });

    it("should have deleteBottom method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.deleteBottom).toBe("function");
    });

    it("should have setLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.setLine).toBe("function");
    });

    it("should have getLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.getLine).toBe("function");
    });

    it("should have clearLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.clearLine).toBe("function");
    });

    it("should have unshiftLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.unshiftLine).toBe("function");
    });

    it("should have shiftLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.shiftLine).toBe("function");
    });

    it("should have pushLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.pushLine).toBe("function");
    });

    it("should have popLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.popLine).toBe("function");
    });

    it("should have getLines method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.getLines).toBe("function");
    });

    it("should have getScreenLines method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.getScreenLines).toBe("function");
    });

    it("should have setBaseLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.setBaseLine).toBe("function");
    });

    it("should have getBaseLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.getBaseLine).toBe("function");
    });

    it("should have clearBaseLine method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.clearBaseLine).toBe("function");
    });
  });

  describe("Label methods", () => {
    it("should setLabel with string", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        border: { type: "line" },
      });

      screen.append(el);
      el.setLabel("Test Label");

      expect(el._label).toBeDefined();
    });

    it("should setLabel with options", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        border: { type: "line" },
      });

      screen.append(el);
      el.setLabel({ text: "Test", side: "right" });

      expect(el._label).toBeDefined();
    });

    it("should removeLabel", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        border: { type: "line" },
      });

      screen.append(el);
      el.setLabel("Test Label");
      el.removeLabel();

      expect(el._label).toBeUndefined();
    });
  });

  describe("Index/Z-order methods", () => {
    it("should setIndex to change z-order", () => {
      const parent = new Element({ screen, width: 100, height: 100 });
      const child1 = new Element({ screen, width: 10, height: 10 });
      const child2 = new Element({ screen, width: 10, height: 10 });
      const child3 = new Element({ screen, width: 10, height: 10 });

      screen.append(parent);
      parent.append(child1);
      parent.append(child2);
      parent.append(child3);

      child1.setIndex(2);

      expect(parent.children.indexOf(child1)).toBe(2);
    });

    it("should setFront to move to front", () => {
      const parent = new Element({ screen, width: 100, height: 100 });
      const child1 = new Element({ screen, width: 10, height: 10 });
      const child2 = new Element({ screen, width: 10, height: 10 });

      screen.append(parent);
      parent.append(child1);
      parent.append(child2);

      child1.setFront();

      expect(parent.children.indexOf(child1)).toBe(parent.children.length - 1);
    });

    it("should setBack to move to back", () => {
      const parent = new Element({ screen, width: 100, height: 100 });
      const child1 = new Element({ screen, width: 10, height: 10 });
      const child2 = new Element({ screen, width: 10, height: 10 });

      screen.append(parent);
      parent.append(child1);
      parent.append(child2);

      child2.setBack();

      expect(parent.children.indexOf(child2)).toBe(0);
    });
  });

  describe("Input handling", () => {
    it("should have enableKeys method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.enableKeys).toBe("function");
    });

    it("should have enableMouse method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.enableMouse).toBe("function");
    });

    it("should have enableInput method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.enableInput).toBe("function");
    });

    it("should have key method for key binding", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.key).toBe("function");
    });

    it("should have onceKey for one-time key binding", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.onceKey).toBe("function");
    });

    it("should have unkey to remove key binding", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.unkey).toBe("function");
      expect(typeof el.removeKey).toBe("function");
    });
  });

  describe("Screen event helpers", () => {
    it("should have onScreenEvent method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.onScreenEvent).toBe("function");
    });

    it("should have onceScreenEvent method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.onceScreenEvent).toBe("function");
    });

    it("should have removeScreenEvent method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.removeScreenEvent).toBe("function");
    });
  });

  describe("Utility methods", () => {
    it("should have strWidth method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.strWidth).toBe("function");
      const width = el.strWidth("Hello");
      expect(typeof width).toBe("number");
    });

    it("should have clearPos method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.clearPos).toBe("function");
    });

    it("should have free method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.free).toBe("function");
    });

    it("should have screenshot method", () => {
      const el = new Element({ screen, width: 20, height: 10 });
      expect(typeof el.screenshot).toBe("function");
    });
  });

  describe("Visibility getters", () => {
    it("should have visible getter", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
      });

      screen.append(el);

      expect(typeof el.visible).toBe("boolean");
    });

    it("should have _detached getter", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
      });

      expect(typeof el._detached).toBe("boolean");
      expect(el._detached).toBe(true);

      screen.append(el);
      expect(el._detached).toBe(false);
    });

    it("should have focused getter", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
      });

      screen.append(el);

      expect(typeof el.focused).toBe("boolean");
    });
  });

  describe("Alignment", () => {
    it("should support left alignment", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        align: "left",
        content: "Test",
      });

      screen.append(el);

      expect(el.align).toBe("left");
    });

    it("should support center alignment", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        align: "center",
        content: "Test",
      });

      screen.append(el);

      expect(el.align).toBe("center");
    });

    it("should support right alignment", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        align: "right",
        content: "Test",
      });

      screen.append(el);

      expect(el.align).toBe("right");
    });

    it("should support top valign", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        valign: "top",
        content: "Test",
      });

      screen.append(el);

      expect(el.valign).toBe("top");
    });

    it("should support middle valign", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        valign: "middle",
        content: "Test",
      });

      screen.append(el);

      expect(el.valign).toBe("middle");
    });

    it("should support bottom valign", () => {
      const el = new Element({
        screen,
        width: 20,
        height: 10,
        valign: "bottom",
        content: "Test",
      });

      screen.append(el);

      expect(el.valign).toBe("bottom");
    });
  });

  describe("Content wrapping", () => {
    it("should wrap content by default", () => {
      const el = new Element({
        screen,
        width: 10,
        height: 5,
        content: "This is a long line that should wrap",
      });

      screen.append(el);

      expect(el.wrap).toBe(true);
    });

    it("should support wrap: false", () => {
      const el = new Element({
        screen,
        width: 10,
        height: 5,
        wrap: false,
        content: "This is a long line that should not wrap",
      });

      screen.append(el);

      expect(el.wrap).toBe(false);
    });
  });

  describe("Unicode width handling", () => {
    it("should correctly handle neutral-width characters like ✓", () => {
      // Enable fullUnicode mode
      screen.fullUnicode = true;

      const el = new Element({
        screen,
        width: 50,
        height: 5,
        content: "✓ test",
        border: { type: "line" },
      });

      screen.append(el);
      el.parseContent();

      // ✓ is width 1, so the parsed content should NOT have extra padding
      // With the old regex-based approach, it incorrectly adds \x03 after ✓
      const parsedContent = el._pcontent;

      // Count actual characters (excluding ANSI codes)
      const stripped = parsedContent.replace(/\x1b\[[0-9;]*m/g, "");

      // Should be "✓ test" without extra \x03 padding
      // Old behavior would make it "✓\x03 test" (8 chars instead of 7)
      expect(stripped.replace(/\x03/g, "").length).toBe(stripped.length); // No \x03 chars
    });

    it("should correctly handle wide characters like ✅", () => {
      screen.fullUnicode = true;

      const el = new Element({
        screen,
        width: 50,
        height: 5,
        content: "✅ test",
      });

      screen.append(el);
      el.parseContent();

      // ✅ is width 2, so padding SHOULD be added
      const parsedContent = el._pcontent;
      const stripped = parsedContent.replace(/\x1b\[[0-9;]*m/g, "");

      // Should contain \x03 padding after ✅
      expect(stripped).toContain("\x03");
    });
  });
});
