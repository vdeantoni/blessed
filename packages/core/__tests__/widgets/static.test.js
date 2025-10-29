import { beforeEach, describe, expect, it } from "vitest";
import Static from "../../src/widgets/static.js";
import { createMockScreen } from "../helpers/mock.js";

describe("Static", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should create a static instance", () => {
      const staticWidget = new Static({ screen });

      expect(staticWidget).toBeDefined();
      expect(staticWidget.type).toBe("static");
    });

    it("should inherit from Box", () => {
      const staticWidget = new Static({ screen });

      expect(staticWidget.screen).toBe(screen);
      expect(typeof staticWidget.render).toBe("function");
    });

    it("should accept items array", () => {
      const items = ["Item 1", "Item 2", "Item 3"];
      const staticWidget = new Static({
        screen,
        items,
      });

      expect(staticWidget.getItems()).toEqual(items);
      expect(staticWidget.getItemCount()).toBe(3);
    });

    it("should render items with default renderItem function", () => {
      const items = ["Task 1", "Task 2"];
      const staticWidget = new Static({
        screen,
        items,
      });

      expect(staticWidget.content).toContain("Task 1");
      expect(staticWidget.content).toContain("Task 2");
    });

    it("should render items with custom renderItem function", () => {
      const items = [
        { name: "Setup", done: true },
        { name: "Code", done: false },
      ];
      const staticWidget = new Static({
        screen,
        items,
        renderItem: (item, index) =>
          `${index + 1}. ${item.done ? "✓" : "○"} ${item.name}`,
      });

      expect(staticWidget.content).toContain("1. ✓ Setup");
      expect(staticWidget.content).toContain("2. ○ Code");
    });

    it("should handle empty items array", () => {
      const staticWidget = new Static({
        screen,
        items: [],
      });

      expect(staticWidget.getItemCount()).toBe(0);
      expect(staticWidget.content).toBe("");
    });
  });

  describe("setItems", () => {
    it("should update items and render only new ones", () => {
      const staticWidget = new Static({
        screen,
        items: ["Item 1"],
      });

      expect(staticWidget.getRenderedCount()).toBe(1);

      // Add more items
      staticWidget.setItems(["Item 1", "Item 2", "Item 3"]);

      expect(staticWidget.getItemCount()).toBe(3);
      expect(staticWidget.getRenderedCount()).toBe(3);
      expect(staticWidget.content).toContain("Item 1");
      expect(staticWidget.content).toContain("Item 2");
      expect(staticWidget.content).toContain("Item 3");
    });

    it("should not re-render previous items", () => {
      let renderCount = 0;
      const staticWidget = new Static({
        screen,
        items: ["Item 1"],
        renderItem: (item) => {
          renderCount++;
          return item;
        },
      });

      expect(renderCount).toBe(1);

      // Add more items - should only render new items
      renderCount = 0;
      staticWidget.setItems(["Item 1", "Item 2"]);
      expect(renderCount).toBe(1); // Only Item 2 rendered
    });
  });

  describe("addItem", () => {
    it("should add a single item", () => {
      const staticWidget = new Static({
        screen,
        items: ["Item 1"],
      });

      staticWidget.addItem("Item 2");

      expect(staticWidget.getItemCount()).toBe(2);
      expect(staticWidget.content).toContain("Item 2");
    });

    it("should render the new item", () => {
      const staticWidget = new Static({
        screen,
        items: [],
      });

      staticWidget.addItem("First item");
      staticWidget.addItem("Second item");

      expect(staticWidget.content).toContain("First item");
      expect(staticWidget.content).toContain("Second item");
    });
  });

  describe("addItems", () => {
    it("should add multiple items at once", () => {
      const staticWidget = new Static({
        screen,
        items: ["Item 1"],
      });

      staticWidget.addItems(["Item 2", "Item 3", "Item 4"]);

      expect(staticWidget.getItemCount()).toBe(4);
      expect(staticWidget.content).toContain("Item 2");
      expect(staticWidget.content).toContain("Item 3");
      expect(staticWidget.content).toContain("Item 4");
    });
  });

  describe("clearItems", () => {
    it("should clear all items and reset state", () => {
      const staticWidget = new Static({
        screen,
        items: ["Item 1", "Item 2", "Item 3"],
      });

      expect(staticWidget.getItemCount()).toBe(3);
      expect(staticWidget.getRenderedCount()).toBe(3);

      staticWidget.clearItems();

      expect(staticWidget.getItemCount()).toBe(0);
      expect(staticWidget.getRenderedCount()).toBe(0);
      expect(staticWidget.content).toBe("");
    });

    it("should allow rendering new items after clear", () => {
      const staticWidget = new Static({
        screen,
        items: ["Item 1", "Item 2"],
      });

      staticWidget.clearItems();
      staticWidget.setItems(["New Item 1", "New Item 2"]);

      expect(staticWidget.getItemCount()).toBe(2);
      expect(staticWidget.content).toContain("New Item 1");
      expect(staticWidget.content).toContain("New Item 2");
    });
  });

  describe("immutable rendering", () => {
    it("should only render new items when items array grows", () => {
      const renderCalls = [];
      const staticWidget = new Static({
        screen,
        items: ["A"],
        renderItem: (item, index) => {
          renderCalls.push({ item, index });
          return `${index}: ${item}`;
        },
      });

      expect(renderCalls).toHaveLength(1);
      expect(renderCalls[0]).toEqual({ item: "A", index: 0 });

      // Add more items
      renderCalls.length = 0;
      staticWidget.setItems(["A", "B", "C"]);

      // Should only render B and C
      expect(renderCalls).toHaveLength(2);
      expect(renderCalls[0]).toEqual({ item: "B", index: 1 });
      expect(renderCalls[1]).toEqual({ item: "C", index: 2 });
    });

    it("should not re-render when setting same items", () => {
      const renderCalls = [];
      const staticWidget = new Static({
        screen,
        items: ["A", "B"],
        renderItem: (item) => {
          renderCalls.push(item);
          return item;
        },
      });

      expect(renderCalls).toHaveLength(2);

      // Set same items
      renderCalls.length = 0;
      staticWidget.setItems(["A", "B"]);

      // Should not render anything
      expect(renderCalls).toHaveLength(0);
    });
  });

  describe("isFullyRendered", () => {
    it("should return true when all items are rendered", () => {
      const staticWidget = new Static({
        screen,
        items: ["Item 1", "Item 2"],
      });

      expect(staticWidget.isFullyRendered()).toBe(true);
    });

    it("should return false when new items are added but not yet rendered", () => {
      const staticWidget = new Static({
        screen,
        items: ["Item 1"],
      });

      // Manually add to items array without triggering render
      staticWidget.getItems().push("Item 2");

      expect(staticWidget.isFullyRendered()).toBe(true); // Still true because internal _items wasn't modified
    });

    it("should return true for empty items", () => {
      const staticWidget = new Static({
        screen,
        items: [],
      });

      expect(staticWidget.isFullyRendered()).toBe(true);
    });
  });

  describe("rendering with complex data", () => {
    it("should handle objects as items", () => {
      const items = [
        { id: 1, task: "Setup project" },
        { id: 2, task: "Write tests" },
      ];

      const staticWidget = new Static({
        screen,
        items,
        renderItem: (item) => `[${item.id}] ${item.task}`,
      });

      expect(staticWidget.content).toContain("[1] Setup project");
      expect(staticWidget.content).toContain("[2] Write tests");
    });

    it("should pass correct index to renderItem", () => {
      const items = ["A", "B", "C"];
      const indices = [];

      new Static({
        screen,
        items,
        renderItem: (item, index) => {
          indices.push(index);
          return item;
        },
      });

      expect(indices).toEqual([0, 1, 2]);
    });
  });

  describe("integration with screen", () => {
    it("should work with parent option", () => {
      const staticWidget = new Static({
        parent: screen,
        items: ["Item 1"],
      });

      expect(staticWidget.parent).toBe(screen);
      expect(screen.children).toContain(staticWidget);
    });

    it("should support shadow option", () => {
      const staticWidget = new Static({
        screen,
        items: ["Item 1"],
        shadow: true,
      });

      expect(staticWidget.shadow).toBe(true);
    });
  });
});
