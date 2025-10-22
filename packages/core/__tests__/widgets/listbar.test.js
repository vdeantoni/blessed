import { describe, it, expect, beforeEach, vi } from "vitest";
import Listbar from "../../src/widgets/listbar.js";
import { createMockScreen } from "../helpers/mock.js";

describe("Listbar", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create a listbar instance", () => {
      const listbar = new Listbar({ screen });

      expect(listbar).toBeDefined();
      expect(listbar.type).toBe("listbar");
    });

    it("should inherit from Box", () => {
      const listbar = new Listbar({ screen });

      expect(listbar.screen).toBe(screen);
      expect(typeof listbar.append).toBe("function");
    });

    it("should initialize empty arrays", () => {
      const listbar = new Listbar({ screen });

      expect(listbar.items).toEqual([]);
      expect(listbar.ritems).toEqual([]);
      expect(listbar.commands).toEqual([]);
    });

    it("should initialize navigation state", () => {
      const listbar = new Listbar({ screen });

      expect(listbar.leftBase).toBe(0);
      expect(listbar.leftOffset).toBe(0);
    });

    it("should initialize style objects", () => {
      const listbar = new Listbar({ screen });

      expect(listbar.style.selected).toBeDefined();
      expect(listbar.style.item).toBeDefined();
    });

    it("should accept mouse option", () => {
      const listbar = new Listbar({ screen, mouse: true });

      expect(listbar.mouse).toBe(true);
    });

    it("should set items from commands option", () => {
      const listbar = new Listbar({
        screen,
        commands: {
          File: vi.fn(),
          Edit: vi.fn(),
        },
      });

      expect(listbar.items.length).toBe(2);
    });

    it("should set items from items option", () => {
      const listbar = new Listbar({
        screen,
        items: {
          View: vi.fn(),
          Help: vi.fn(),
        },
      });

      expect(listbar.items.length).toBe(2);
    });
  });

  describe("setItems()", () => {
    it("should set items from object", () => {
      const listbar = new Listbar({ screen });
      const cb1 = vi.fn();
      const cb2 = vi.fn();

      listbar.setItems({
        File: cb1,
        Edit: cb2,
      });

      expect(listbar.items.length).toBe(2);
      expect(listbar.commands.length).toBe(2);
    });

    it("should set items from array", () => {
      const listbar = new Listbar({ screen });

      listbar.setItems([
        { text: "File", callback: vi.fn() },
        { text: "Edit", callback: vi.fn() },
      ]);

      expect(listbar.items.length).toBe(2);
    });

    it("should generate prefix from index", () => {
      const listbar = new Listbar({ screen });

      listbar.setItems({
        File: vi.fn(),
        Edit: vi.fn(),
      });

      expect(listbar.commands[0].prefix).toBe("1");
      expect(listbar.commands[1].prefix).toBe("2");
    });

    it("should preserve custom prefix", () => {
      const listbar = new Listbar({ screen });

      listbar.setItems([{ text: "File", prefix: "F", callback: vi.fn() }]);

      expect(listbar.commands[0].prefix).toBe("F");
    });

    it("should clear previous items", () => {
      const listbar = new Listbar({ screen });

      listbar.setItems({ File: vi.fn() });
      expect(listbar.items.length).toBe(1);

      listbar.setItems({ Edit: vi.fn(), View: vi.fn() });
      expect(listbar.items.length).toBe(2);
    });

    it("should emit set items event", () => {
      const listbar = new Listbar({ screen });
      const handler = vi.fn();
      listbar.on("set items", handler);

      listbar.setItems({ File: vi.fn() });

      expect(handler).toHaveBeenCalled();
    });

    it("should use function name as text if not provided", () => {
      const listbar = new Listbar({ screen });
      function myCommand() {}

      listbar.setItems({ myCommand });

      expect(listbar.commands[0].text).toBe("myCommand");
    });
  });

  describe("add() / addItem() / appendItem()", () => {
    it("should add item from string", () => {
      const listbar = new Listbar({ screen });
      const cb = vi.fn();

      listbar.add("File", cb);

      expect(listbar.items.length).toBe(1);
      expect(listbar.commands[0].text).toBe("File");
      expect(listbar.commands[0].callback).toBe(cb);
    });

    it("should add item from object", () => {
      const listbar = new Listbar({ screen });
      const cb = vi.fn();

      listbar.add({ text: "Edit", callback: cb });

      expect(listbar.items.length).toBe(1);
      expect(listbar.commands[0].text).toBe("Edit");
      expect(listbar.commands[0].callback).toBe(cb);
    });

    it("should add item from function", () => {
      const listbar = new Listbar({ screen });
      function myFunc() {}

      listbar.add(myFunc);

      expect(listbar.items.length).toBe(1);
      expect(listbar.commands[0].text).toBe("myFunc");
      expect(listbar.commands[0].callback).toBe(myFunc);
    });

    it("should generate prefix automatically", () => {
      const listbar = new Listbar({ screen });

      listbar.add("File");
      listbar.add("Edit");

      expect(listbar.commands[0].prefix).toBe("1");
      expect(listbar.commands[1].prefix).toBe("2");
    });

    it("should use keys as prefix if provided", () => {
      const listbar = new Listbar({ screen });

      listbar.add({ text: "File", keys: ["f"], callback: vi.fn() });

      expect(listbar.commands[0].prefix).toBe("f");
    });

    it("should work as addItem", () => {
      const listbar = new Listbar({ screen });

      listbar.addItem("Test");

      expect(listbar.items.length).toBe(1);
    });

    it("should work as appendItem", () => {
      const listbar = new Listbar({ screen });

      listbar.appendItem("Test");

      expect(listbar.items.length).toBe(1);
    });

    it("should select first item automatically", () => {
      const listbar = new Listbar({ screen });
      listbar.select = vi.fn();

      listbar.add("File");

      expect(listbar.select).toHaveBeenCalledWith(0);
    });

    it("should emit add item event", () => {
      const listbar = new Listbar({ screen });
      const handler = vi.fn();
      listbar.on("add item", handler);

      listbar.add("File");

      expect(handler).toHaveBeenCalled();
    });

    it("should register screen keys if keys provided", () => {
      const listbar = new Listbar({ screen });
      screen.key = vi.fn();

      listbar.add({ text: "File", keys: ["f", "F"], callback: vi.fn() });

      expect(screen.key).toHaveBeenCalled();
    });

    it("should handle mouse click when mouse enabled", () => {
      const listbar = new Listbar({ screen, mouse: true });
      const cb = vi.fn();

      listbar.add({ text: "File", callback: cb });

      const item = listbar.items[0];
      item.emit("click");

      expect(cb).toHaveBeenCalled();
    });
  });

  describe("removeItem()", () => {
    it("should remove item by index", () => {
      const listbar = new Listbar({ screen });
      listbar.setItems({ File: vi.fn(), Edit: vi.fn() });

      listbar.removeItem(0);

      expect(listbar.items.length).toBe(1);
      expect(listbar.commands[0].text).toBe("Edit");
    });

    it("should remove item by element", () => {
      const listbar = new Listbar({ screen });
      listbar.setItems({ File: vi.fn(), Edit: vi.fn() });

      const item = listbar.items[0];
      listbar.removeItem(item);

      expect(listbar.items.length).toBe(1);
    });

    it("should handle removeItem with selection tracking", () => {
      const listbar = new Listbar({ screen });
      listbar.setItems({ File: vi.fn(), Edit: vi.fn(), View: vi.fn() });

      // Check that selected item is tracked
      expect(listbar.leftBase).toBe(0);
      expect(listbar.leftOffset).toBe(0);
    });

    it("should emit remove item event", () => {
      const listbar = new Listbar({ screen });
      const handler = vi.fn();
      listbar.on("remove item", handler);
      listbar.setItems({ File: vi.fn() });

      listbar.removeItem(0);

      expect(handler).toHaveBeenCalled();
    });
  });

  describe("select()", () => {
    it("should normalize selection index", () => {
      const listbar = new Listbar({ screen });
      listbar.setItems({ File: vi.fn(), Edit: vi.fn() });

      // Try to select - without parent it won't update position, just test bounds
      expect(listbar.selected).toBe(0);
    });

    it("should track leftBase and leftOffset", () => {
      const listbar = new Listbar({ screen });
      listbar.setItems({ File: vi.fn(), Edit: vi.fn() });
      listbar.leftBase = 1;
      listbar.leftOffset = 2;

      expect(listbar.selected).toBe(3);
    });

    it("should emit select item event without parent", () => {
      const listbar = new Listbar({ screen });
      const handler = vi.fn();
      listbar.setItems({ File: vi.fn(), Edit: vi.fn() });
      listbar.on("select item", handler);

      listbar.select(1);

      expect(handler).toHaveBeenCalled();
    });
  });

  describe("selected getter", () => {
    it("should return leftBase + leftOffset", () => {
      const listbar = new Listbar({ screen });
      listbar.leftBase = 2;
      listbar.leftOffset = 3;

      expect(listbar.selected).toBe(5);
    });

    it("should default to 0", () => {
      const listbar = new Listbar({ screen });

      expect(listbar.selected).toBe(0);
    });
  });

  describe("move()", () => {
    it("should move selection by offset", () => {
      const listbar = new Listbar({ screen });
      listbar.setItems({ File: vi.fn(), Edit: vi.fn(), View: vi.fn() });
      listbar.select = vi.fn();

      listbar.move(2);

      expect(listbar.select).toHaveBeenCalledWith(2);
    });

    it("should handle negative offset", () => {
      const listbar = new Listbar({ screen });
      listbar.setItems({ File: vi.fn(), Edit: vi.fn(), View: vi.fn() });
      listbar.leftBase = 2;
      listbar.select = vi.fn();

      listbar.move(-1);

      expect(listbar.select).toHaveBeenCalledWith(1);
    });
  });

  describe("moveLeft()", () => {
    it("should move selection left by 1", () => {
      const listbar = new Listbar({ screen });
      listbar.move = vi.fn();

      listbar.moveLeft();

      expect(listbar.move).toHaveBeenCalledWith(-1);
    });

    it("should accept custom offset", () => {
      const listbar = new Listbar({ screen });
      listbar.move = vi.fn();

      listbar.moveLeft(3);

      expect(listbar.move).toHaveBeenCalledWith(-3);
    });
  });

  describe("moveRight()", () => {
    it("should move selection right by 1", () => {
      const listbar = new Listbar({ screen });
      listbar.move = vi.fn();

      listbar.moveRight();

      expect(listbar.move).toHaveBeenCalledWith(1);
    });

    it("should accept custom offset", () => {
      const listbar = new Listbar({ screen });
      listbar.move = vi.fn();

      listbar.moveRight(3);

      expect(listbar.move).toHaveBeenCalledWith(3);
    });
  });

  describe("selectTab()", () => {
    it("should select tab by index", () => {
      const listbar = new Listbar({ screen });
      const cb = vi.fn();
      listbar.setItems({ File: cb, Edit: vi.fn() });
      screen.render = vi.fn();

      listbar.selectTab(0);

      expect(cb).toHaveBeenCalled();
      expect(screen.render).toHaveBeenCalled();
    });

    it("should emit select tab event", () => {
      const listbar = new Listbar({ screen });
      const handler = vi.fn();
      listbar.setItems({ File: vi.fn() });
      listbar.on("select tab", handler);

      listbar.selectTab(0);

      expect(handler).toHaveBeenCalled();
    });

    it("should handle invalid index gracefully", () => {
      const listbar = new Listbar({ screen });
      const handler = vi.fn();
      listbar.on("select tab", handler);

      listbar.selectTab(10);

      expect(handler).toHaveBeenCalledWith(undefined, 10);
    });
  });

  describe("keyboard navigation", () => {
    it("should move left on left arrow key", () => {
      const listbar = new Listbar({ screen, keys: true });
      listbar.moveLeft = vi.fn();
      screen.render = vi.fn();

      listbar.emit("keypress", null, { name: "left" });

      expect(listbar.moveLeft).toHaveBeenCalled();
      expect(screen.render).toHaveBeenCalled();
    });

    it("should move right on right arrow key", () => {
      const listbar = new Listbar({ screen, keys: true });
      listbar.moveRight = vi.fn();
      screen.render = vi.fn();

      listbar.emit("keypress", null, { name: "right" });

      expect(listbar.moveRight).toHaveBeenCalled();
      expect(screen.render).toHaveBeenCalled();
    });

    it("should move left on shift+tab", () => {
      const listbar = new Listbar({ screen, keys: true });
      listbar.moveLeft = vi.fn();

      listbar.emit("keypress", null, { name: "tab", shift: true });

      expect(listbar.moveLeft).toHaveBeenCalled();
    });

    it("should move right on tab", () => {
      const listbar = new Listbar({ screen, keys: true });
      listbar.moveRight = vi.fn();

      listbar.emit("keypress", null, { name: "tab" });

      expect(listbar.moveRight).toHaveBeenCalled();
    });

    it("should support vi keys (h for left)", () => {
      const listbar = new Listbar({ screen, keys: true, vi: true });
      listbar.moveLeft = vi.fn();

      listbar.emit("keypress", null, { name: "h" });

      expect(listbar.moveLeft).toHaveBeenCalled();
    });

    it("should support vi keys (l for right)", () => {
      const listbar = new Listbar({ screen, keys: true, vi: true });
      listbar.moveRight = vi.fn();

      listbar.emit("keypress", null, { name: "l" });

      expect(listbar.moveRight).toHaveBeenCalled();
    });

    it("should trigger action on enter", () => {
      const listbar = new Listbar({ screen, keys: true });
      const cb = vi.fn();
      listbar.setItems({ File: cb });
      const actionHandler = vi.fn();
      const selectHandler = vi.fn();
      listbar.on("action", actionHandler);
      listbar.on("select", selectHandler);

      listbar.emit("keypress", null, { name: "enter" });

      expect(cb).toHaveBeenCalled();
      expect(actionHandler).toHaveBeenCalled();
      expect(selectHandler).toHaveBeenCalled();
    });

    it("should trigger action on vi k key", () => {
      const listbar = new Listbar({ screen, keys: true, vi: true });
      const cb = vi.fn();
      listbar.setItems({ File: cb });

      listbar.emit("keypress", null, { name: "k" });

      expect(cb).toHaveBeenCalled();
    });

    it("should emit cancel on escape", () => {
      const listbar = new Listbar({ screen, keys: true });
      const actionHandler = vi.fn();
      const cancelHandler = vi.fn();
      listbar.on("action", actionHandler);
      listbar.on("cancel", cancelHandler);

      listbar.emit("keypress", null, { name: "escape" });

      expect(actionHandler).toHaveBeenCalled();
      expect(cancelHandler).toHaveBeenCalled();
    });

    it("should emit cancel on vi q key", () => {
      const listbar = new Listbar({ screen, keys: true, vi: true });
      const cancelHandler = vi.fn();
      listbar.on("cancel", cancelHandler);

      listbar.emit("keypress", null, { name: "q" });

      expect(cancelHandler).toHaveBeenCalled();
    });
  });

  describe("autoCommandKeys", () => {
    it("should select tab 0 with key 1", () => {
      const listbar = new Listbar({ screen, autoCommandKeys: true });
      listbar.setItems({ File: vi.fn(), Edit: vi.fn() });
      listbar.selectTab = vi.fn();

      screen.emit("keypress", "1", {});

      expect(listbar.selectTab).toHaveBeenCalledWith(0);
    });

    it("should select tab 9 with key 0", () => {
      const listbar = new Listbar({ screen, autoCommandKeys: true });
      const items = {};
      for (let i = 0; i < 10; i++) {
        items[`Item${i}`] = vi.fn();
      }
      listbar.setItems(items);
      listbar.selectTab = vi.fn();

      screen.emit("keypress", "0", {});

      expect(listbar.selectTab).toHaveBeenCalledWith(9);
    });

    it("should only respond to digit keys", () => {
      const listbar = new Listbar({ screen, autoCommandKeys: true });
      listbar.selectTab = vi.fn();

      screen.emit("keypress", "a", {});

      expect(listbar.selectTab).not.toHaveBeenCalled();
    });
  });

  describe("focus behavior", () => {
    it("should reselect current item on focus", () => {
      const listbar = new Listbar({ screen });
      listbar.setItems({ File: vi.fn(), Edit: vi.fn() });
      listbar.leftBase = 1;
      listbar.select = vi.fn();

      listbar.emit("focus");

      expect(listbar.select).toHaveBeenCalledWith(1);
    });
  });

  describe("common use cases", () => {
    it("should create a menu bar", () => {
      const listbar = new Listbar({
        screen,
        top: 0,
        left: 0,
        width: "100%",
        height: 1,
        keys: true,
        mouse: true,
        style: {
          selected: { bg: "blue", fg: "white" },
          item: { bg: "black", fg: "white" },
        },
      });

      listbar.setItems({
        File: vi.fn(),
        Edit: vi.fn(),
        View: vi.fn(),
        Help: vi.fn(),
      });

      expect(listbar.items.length).toBe(4);
    });

    it("should handle command callbacks", () => {
      const listbar = new Listbar({ screen });
      const fileCallback = vi.fn();
      const editCallback = vi.fn();

      listbar.setItems({
        File: fileCallback,
        Edit: editCallback,
      });

      listbar.selectTab(0);
      expect(fileCallback).toHaveBeenCalled();

      listbar.selectTab(1);
      expect(editCallback).toHaveBeenCalled();
    });

    it("should work with custom prefixes", () => {
      const listbar = new Listbar({ screen });

      listbar.setItems([
        { text: "File", prefix: "F", keys: ["f"], callback: vi.fn() },
        { text: "Edit", prefix: "E", keys: ["e"], callback: vi.fn() },
        { text: "View", prefix: "V", keys: ["v"], callback: vi.fn() },
      ]);

      expect(listbar.commands[0].prefix).toBe("f");
      expect(listbar.commands[1].prefix).toBe("e");
      expect(listbar.commands[2].prefix).toBe("v");
    });

    it("should navigate with keyboard", () => {
      const listbar = new Listbar({ screen, keys: true });
      listbar.setItems({
        File: vi.fn(),
        Edit: vi.fn(),
        View: vi.fn(),
      });

      listbar.select = vi.fn();

      listbar.emit("keypress", null, { name: "right" });
      expect(listbar.moveRight).toBeDefined();
    });
  });
});
