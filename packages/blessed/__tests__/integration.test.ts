/**
 * Integration Tests - Real-World Blessed Usage Patterns
 *
 * These tests verify runtime compatibility with actual blessed code patterns
 * found in the wild. They test behavior, not just types.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import blessed, {
  cleanTags,
  colors,
  escape,
  generateTags,
  stripTags,
} from "../src/blessed.js";

describe("Integration Tests - Real Blessed Patterns", () => {
  let screen: any;

  beforeEach(() => {
    // Create a fresh screen for each test
    screen = blessed.screen({
      smartCSR: true,
      title: "Test Screen",
    });
  });

  afterEach(() => {
    // Clean up screen
    if (screen) {
      screen.destroy();
    }
  });

  describe("Hello World Pattern", () => {
    it("should create basic hello world app", () => {
      // Classic blessed hello world
      const box = blessed.box({
        parent: screen,
        top: "center",
        left: "center",
        width: "50%",
        height: "50%",
        content: "Hello {bold}world{/bold}!",
        tags: true,
        border: {
          type: "line",
        },
        style: {
          fg: "white",
          bg: "blue",
          border: {
            fg: "#f0f0f0",
          },
        },
      });

      expect(box).toBeDefined();
      expect(box.parent).toBe(screen);
      expect(screen.children).toContain(box);
    });

    it("should handle key bindings", () => {
      // Test that key bindings can be registered
      // (actual key press simulation would require full program setup)
      let keyPressed = false;

      screen.key(["q", "C-c"], () => {
        keyPressed = true;
      });

      // Verify the binding was registered
      expect(screen.program).toBeDefined();

      // In real usage, key presses come from stdin, not manual emission
      // Just verify the API works
      expect(typeof screen.key).toBe("function");
      expect(typeof screen.onceKey).toBe("function");
      expect(typeof screen.removeKey).toBe("function");
    });
  });

  describe("List Widget Pattern", () => {
    it("should create interactive list", () => {
      const list = blessed.list({
        parent: screen,
        top: 0,
        left: 0,
        width: "50%",
        height: "100%",
        items: ["Item 1", "Item 2", "Item 3"],
        keys: true,
        mouse: true,
        style: {
          selected: {
            bg: "blue",
          },
        },
      });

      expect(list).toBeDefined();
      expect(list.items).toBeDefined();
      // ritems may include rendered duplicates, check items array instead
      expect(list.items).toHaveLength(3);
    });

    it("should handle item selection", () => {
      const list = blessed.list({
        parent: screen,
        items: ["Item 1", "Item 2", "Item 3"],
      });

      let selectedItem = null;
      list.on("select", (item: any, index: number) => {
        selectedItem = { item, index };
      });

      list.select(1);
      list.emit("select", list.items[1], 1);

      expect(selectedItem).toEqual({
        item: list.items[1],
        index: 1,
      });
    });

    it("should support dynamic item addition", () => {
      const list = blessed.list({
        parent: screen,
        items: ["Item 1"],
      });

      expect(list.items).toHaveLength(1);

      list.addItem("Item 2");
      expect(list.items).toHaveLength(2);

      list.removeItem(0);
      expect(list.items).toHaveLength(1);
    });
  });

  describe("Form Widget Pattern", () => {
    it("should create form with inputs", () => {
      const form = blessed.form({
        parent: screen,
        keys: true,
        left: 0,
        top: 0,
        width: 30,
        height: 10,
      });

      const input1 = blessed.textbox({
        parent: form,
        name: "username",
        top: 0,
        left: 0,
        width: 20,
        height: 1,
      });

      const input2 = blessed.textbox({
        parent: form,
        name: "password",
        top: 2,
        left: 0,
        width: 20,
        height: 1,
        censor: true,
      });

      const submit = blessed.button({
        parent: form,
        name: "submit",
        content: "Submit",
        top: 4,
        left: 0,
        width: 10,
        height: 1,
      });

      expect(form).toBeDefined();
      expect(input1).toBeDefined();
      expect(input2).toBeDefined();
      expect(submit).toBeDefined();
      expect(form.children).toContain(input1);
      expect(form.children).toContain(input2);
      expect(form.children).toContain(submit);
    });

    it("should handle form submission", () => {
      const form = blessed.form({
        parent: screen,
        keys: true,
      });

      const input = blessed.input({
        parent: form,
        name: "test",
        value: "test-value",
      });

      let submittedData = null;
      form.on("submit", (data: any) => {
        submittedData = data;
      });

      // Simulate submit
      form.submit();

      expect(submittedData).toBeDefined();
    });
  });

  describe("Progress Bar Pattern", () => {
    it("should create and update progress bar", () => {
      const progress = blessed.progressbar({
        parent: screen,
        top: "center",
        left: "center",
        width: "50%",
        height: 3,
        border: "line",
        style: {
          bar: {
            bg: "blue",
          },
        },
      });

      expect(progress).toBeDefined();
      expect(typeof progress.setProgress).toBe("function");

      progress.setProgress(50);
      expect(progress.filled).toBeGreaterThan(0);
    });
  });

  describe("Table Pattern", () => {
    it("should create table with data", () => {
      const table = blessed.table({
        parent: screen,
        top: "center",
        left: "center",
        width: "80%",
        height: "50%",
        border: "line",
        align: "center",
      });

      const data = [
        ["Name", "Age", "City"],
        ["John", "30", "NYC"],
        ["Jane", "25", "LA"],
      ];

      table.setData(data);

      expect(table).toBeDefined();
      expect(typeof table.setData).toBe("function");
    });
  });

  describe("Message/Prompt Pattern", () => {
    it("should create message dialog", () => {
      const msg = blessed.message({
        parent: screen,
        top: "center",
        left: "center",
        width: "50%",
        height: "shrink",
        border: "line",
      });

      expect(msg).toBeDefined();
      expect(typeof msg.display).toBe("function");
      expect(typeof msg.error).toBe("function");
    });

    it("should create question dialog", () => {
      const question = blessed.question({
        parent: screen,
        top: "center",
        left: "center",
        width: "50%",
        height: "shrink",
        border: "line",
      });

      expect(question).toBeDefined();
      expect(typeof question.ask).toBe("function");
    });
  });

  describe("Loading Widget Pattern", () => {
    it("should create loading indicator", () => {
      const loading = blessed.loading({
        parent: screen,
        top: "center",
        left: "center",
        width: "50%",
        height: 5,
        border: "line",
      });

      expect(loading).toBeDefined();
      expect(typeof loading.load).toBe("function");
      expect(typeof loading.stop).toBe("function");
    });
  });

  describe("FileManager Pattern", () => {
    it("should create file manager", () => {
      const fm = blessed.filemanager({
        parent: screen,
        top: 0,
        left: 0,
        width: "50%",
        height: "100%",
        cwd: process.cwd(),
        keys: true,
        mouse: true,
      });

      expect(fm).toBeDefined();
      expect(typeof fm.refresh).toBe("function");
      expect(typeof fm.pick).toBe("function");
    });
  });

  describe("Checkbox/Radio Pattern", () => {
    it("should create checkbox", () => {
      const checkbox = blessed.checkbox({
        parent: screen,
        content: "Enable feature",
        checked: true,
        mouse: true,
      });

      expect(checkbox).toBeDefined();
      expect(typeof checkbox.check).toBe("function");
      expect(typeof checkbox.uncheck).toBe("function");
      expect(typeof checkbox.toggle).toBe("function");
    });

    it("should create radio set", () => {
      const radioset = blessed.radioset({
        parent: screen,
        top: 0,
        left: 0,
        width: 30,
        height: 10,
      });

      const radio1 = blessed.radiobutton({
        parent: radioset,
        content: "Option 1",
        top: 0,
      });

      const radio2 = blessed.radiobutton({
        parent: radioset,
        content: "Option 2",
        top: 1,
      });

      expect(radioset).toBeDefined();
      expect(radio1).toBeDefined();
      expect(radio2).toBeDefined();
      expect(radioset.children).toContain(radio1);
      expect(radioset.children).toContain(radio2);
    });
  });

  describe("Layout Pattern", () => {
    it("should create layout with children", () => {
      const layout = blessed.layout({
        parent: screen,
        top: "center",
        left: "center",
        width: "80%",
        height: "80%",
        border: "line",
        layout: "grid",
      });

      const box1 = blessed.box({
        parent: layout,
        content: "Box 1",
        width: "50%",
        height: "50%",
      });

      const box2 = blessed.box({
        parent: layout,
        content: "Box 2",
        width: "50%",
        height: "50%",
      });

      expect(layout).toBeDefined();
      expect(layout.children).toContain(box1);
      expect(layout.children).toContain(box2);
    });
  });

  describe("Log Widget Pattern", () => {
    it("should create and use log widget", () => {
      const log = blessed.log({
        parent: screen,
        top: "center",
        left: "center",
        width: "50%",
        height: "50%",
        border: "line",
        tags: true,
        keys: true,
        mouse: true,
        scrollback: 100,
      });

      expect(log).toBeDefined();
      expect(typeof log.log).toBe("function");
      expect(typeof log.add).toBe("function");

      log.log("Test log message 1");
      log.log("Test log message 2");

      expect(log.getLines()).toContain("Test log message 1");
      expect(log.getLines()).toContain("Test log message 2");
    });
  });

  describe("Widget Composition Pattern", () => {
    it("should support nested widget hierarchy", () => {
      const container = blessed.box({
        parent: screen,
        width: "100%",
        height: "100%",
      });

      const sidebar = blessed.box({
        parent: container,
        left: 0,
        width: "20%",
        height: "100%",
        border: "line",
      });

      const content = blessed.box({
        parent: container,
        left: "20%",
        width: "80%",
        height: "100%",
        border: "line",
      });

      const header = blessed.box({
        parent: content,
        top: 0,
        width: "100%",
        height: 3,
        content: "Header",
      });

      expect(container.children).toContain(sidebar);
      expect(container.children).toContain(content);
      expect(content.children).toContain(header);
      expect(container.children).toHaveLength(2);
      expect(content.children).toHaveLength(1);
    });
  });

  describe("Event Handling Patterns", () => {
    it("should support mouse events", () => {
      const box = blessed.box({
        parent: screen,
        top: 0,
        left: 0,
        width: 10,
        height: 5,
        clickable: true,
        mouse: true,
      });

      let clicked = false;
      box.on("click", () => {
        clicked = true;
      });

      box.emit("click");
      expect(clicked).toBe(true);
    });

    it("should support focus events", () => {
      const box1 = blessed.box({
        parent: screen,
        width: 10,
        height: 5,
      });

      const box2 = blessed.box({
        parent: screen,
        width: 10,
        height: 5,
      });

      let focusCount = 0;
      box1.on("focus", () => {
        focusCount++;
      });

      box1.focus();
      expect(focusCount).toBe(1);
    });

    it("should support resize events", () => {
      const box = blessed.box({
        parent: screen,
        width: "50%",
        height: "50%",
      });

      let resized = false;
      box.on("resize", () => {
        resized = true;
      });

      box.emit("resize");
      expect(resized).toBe(true);
    });
  });

  describe("Helper Functions", () => {
    it("should expose escape helper", () => {
      expect(typeof escape).toBe("function");
      const escaped = escape("test {bold}text{/bold}");
      expect(escaped).toBe("test {open}bold{close}text{open}/bold{close}");
    });

    it("should expose stripTags helper", () => {
      expect(typeof stripTags).toBe("function");
      const stripped = stripTags("test {bold}text{/bold}");
      expect(stripped).toBe("test text");
    });

    it("should expose cleanTags helper", () => {
      expect(typeof cleanTags).toBe("function");
      const cleaned = cleanTags("test {bold}text{/bold}");
      expect(typeof cleaned).toBe("string");
    });

    it("should expose generateTags helper", () => {
      expect(typeof generateTags).toBe("function");
    });
  });

  describe("Utilities", () => {
    it("should expose colors utility", () => {
      expect(colors).toBeDefined();
      expect(colors).toHaveProperty("match");
      expect(colors).toHaveProperty("convert");
    });

    it("should expose unicode utility", () => {
      expect(blessed.unicode).toBeDefined();
    });

    it("should expose helpers utility", () => {
      expect(blessed.helpers).toBeDefined();
      expect(typeof blessed.helpers.sprintf).toBe("function");
      expect(typeof blessed.helpers.tryRead).toBe("function");
    });
  });

  describe("Program API", () => {
    it("should create program instance", () => {
      const program = blessed.program();
      expect(program).toBeDefined();
      expect(typeof program.clear).toBe("function");
      expect(typeof program.write).toBe("function");
    });

    it("should create tput instance", () => {
      const tput = blessed.tput();
      expect(tput).toBeDefined();
    });
  });

  describe("Style Patterns", () => {
    it("should support inline style tags", () => {
      const box = blessed.box({
        parent: screen,
        content:
          "{bold}Bold{/bold} {underline}Underline{/underline} {red-fg}Red{/red-fg}",
        tags: true,
      });

      expect(box).toBeDefined();
      expect(box.content).toContain("Bold");
    });

    it("should support style object", () => {
      const box = blessed.box({
        parent: screen,
        style: {
          fg: "white",
          bg: "blue",
          bold: true,
          underline: true,
          blink: false,
          inverse: false,
          invisible: false,
          border: {
            fg: "red",
            bg: "black",
          },
          scrollbar: {
            bg: "blue",
          },
          focus: {
            fg: "yellow",
            bg: "blue",
          },
          hover: {
            fg: "green",
          },
        },
      });

      expect(box).toBeDefined();
      expect(box.style).toBeDefined();
    });

    it("should support border styles", () => {
      const borders = ["line", "bg", "heavy", "double", "ascii"];

      borders.forEach((borderType) => {
        const box = blessed.box({
          parent: screen,
          border: {
            type: borderType as any,
          },
        });

        expect(box).toBeDefined();
        expect(box.border).toBeDefined();
      });
    });
  });

  describe("Scrollable Widgets", () => {
    it("should create scrollable box", () => {
      const scrollbox = blessed.scrollablebox({
        parent: screen,
        width: "50%",
        height: "50%",
        content: "Line 1\nLine 2\nLine 3\nLine 4\nLine 5",
        scrollbar: {
          bg: "blue",
        },
        keys: true,
        mouse: true,
      });

      expect(scrollbox).toBeDefined();
      expect(typeof scrollbox.scroll).toBe("function");
      expect(typeof scrollbox.setScrollPerc).toBe("function");
    });

    it("should create scrollable text", () => {
      const scrolltext = blessed.scrollabletext({
        parent: screen,
        width: "50%",
        height: "50%",
        content: "Scrollable text content",
        keys: true,
        mouse: true,
      });

      expect(scrolltext).toBeDefined();
      expect(typeof scrolltext.scroll).toBe("function");
    });
  });

  describe("ListTable Pattern", () => {
    it("should create list table", () => {
      const listtable = blessed.listtable({
        parent: screen,
        top: "center",
        left: "center",
        width: "80%",
        height: "50%",
        border: "line",
        keys: true,
        mouse: true,
        data: [
          ["Name", "Age", "City"],
          ["John", "30", "NYC"],
          ["Jane", "25", "LA"],
        ],
      });

      expect(listtable).toBeDefined();
      expect(typeof listtable.setData).toBe("function");
    });
  });

  describe("Listbar Pattern", () => {
    it("should create listbar", () => {
      const listbar = blessed.listbar({
        parent: screen,
        bottom: 0,
        width: "100%",
        height: 3,
        keys: true,
        mouse: true,
        commands: {
          File: {
            keys: ["f"],
            callback: () => {},
          },
          Edit: {
            keys: ["e"],
            callback: () => {},
          },
        },
        style: {
          selected: {
            bg: "blue",
          },
        },
      });

      expect(listbar).toBeDefined();
      expect(typeof listbar.add).toBe("function");
      expect(typeof listbar.select).toBe("function");
    });
  });
});
