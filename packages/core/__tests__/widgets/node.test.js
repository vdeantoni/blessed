import { describe, it, expect, beforeEach, vi } from "vitest";
import Node from "../../src/widgets/node.js";
import { createMockScreen } from "../helpers/mock.js";

// Helper to create a node with clearPos method (required by remove())
function createNode(options) {
  const node = new Node(options);
  node.clearPos = vi.fn(); // Mock clearPos which is defined in Element
  return node;
}

describe("Node", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should create a node instance", () => {
      const node = new Node({ screen });

      expect(node).toBeDefined();
      expect(node.type).toBe("node");
    });

    it("should inherit from EventEmitter", () => {
      const node = new Node({ screen });

      expect(typeof node.on).toBe("function");
      expect(typeof node.emit).toBe("function");
    });

    it("should set screen reference", () => {
      const node = new Node({ screen });

      expect(node.screen).toBe(screen);
    });

    it("should initialize children array", () => {
      const node = new Node({ screen });

      expect(node.children).toEqual([]);
    });

    it("should assign unique uid", () => {
      const node1 = new Node({ screen });
      const node2 = new Node({ screen });

      expect(node1.uid).toBeDefined();
      expect(node2.uid).toBeDefined();
      expect(node1.uid).not.toBe(node2.uid);
    });

    it("should initialize data object", () => {
      const node = new Node({ screen });

      expect(node.$).toBeDefined();
      expect(node._).toBe(node.$);
      expect(node.data).toBe(node.$);
    });

    it("should set parent if provided", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen, parent });

      expect(child.parent).toBe(parent);
      expect(parent.children).toContain(child);
    });

    it("should start as detached", () => {
      const node = new Node({ screen });

      expect(node.detached).toBe(true);
    });

    it("should accept children in constructor", () => {
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });
      const parent = new Node({
        screen,
        children: [child1, child2],
      });

      expect(parent.children.length).toBe(2);
      expect(parent.children).toContain(child1);
      expect(parent.children).toContain(child2);
    });
  });

  describe("append()", () => {
    it("should append child to end", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });

      parent.append(child);

      expect(parent.children).toContain(child);
      expect(child.parent).toBe(parent);
    });

    it("should append multiple children in order", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });
      const child3 = new Node({ screen });

      parent.append(child1);
      parent.append(child2);
      parent.append(child3);

      expect(parent.children).toEqual([child1, child2, child3]);
    });

    it("should emit adopt event", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });
      const spy = vi.fn();

      parent.on("adopt", spy);
      parent.append(child);

      expect(spy).toHaveBeenCalledWith(child);
    });

    it("should emit reparent event on child", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });
      const spy = vi.fn();

      child.on("reparent", spy);
      parent.append(child);

      expect(spy).toHaveBeenCalledWith(parent);
    });

    it("should set screen reference on child", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen }); // Must use same screen

      parent.append(child);

      expect(child.screen).toBe(screen);
    });
  });

  describe("prepend()", () => {
    it("should prepend child to beginning", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });

      parent.append(child1);
      parent.prepend(child2);

      expect(parent.children[0]).toBe(child2);
      expect(parent.children[1]).toBe(child1);
    });
  });

  describe("insert()", () => {
    it("should insert child at specific index", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });
      const child3 = new Node({ screen });

      parent.append(child1);
      parent.append(child3);
      parent.insert(child2, 1);

      expect(parent.children).toEqual([child1, child2, child3]);
    });

    it("should insert at beginning with index 0", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });

      parent.append(child1);
      parent.insert(child2, 0);

      expect(parent.children[0]).toBe(child2);
    });

    it("should insert at end with length index", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });

      parent.append(child1);
      parent.insert(child2, parent.children.length);

      expect(parent.children[parent.children.length - 1]).toBe(child2);
    });
  });

  describe("insertBefore()", () => {
    it("should insert before target element", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });
      const child3 = new Node({ screen });

      parent.append(child1);
      parent.append(child3);
      parent.insertBefore(child2, child3);

      expect(parent.children).toEqual([child1, child2, child3]);
    });

    it("should do nothing if target not found", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });
      const child3 = new Node({ screen });

      parent.append(child1);
      parent.insertBefore(child2, child3);

      expect(parent.children).toEqual([child1]);
    });
  });

  describe("insertAfter()", () => {
    it("should insert after target element", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });
      const child3 = new Node({ screen });

      parent.append(child1);
      parent.append(child3);
      parent.insertAfter(child2, child1);

      expect(parent.children).toEqual([child1, child2, child3]);
    });

    it("should do nothing if target not found", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });
      const child3 = new Node({ screen });

      parent.append(child1);
      parent.insertAfter(child2, child3);

      expect(parent.children).toEqual([child1]);
    });
  });

  describe("remove()", () => {
    it("should remove child from parent", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });

      parent.append(child);
      parent.remove(child);

      expect(parent.children).not.toContain(child);
      expect(child.parent).toBeNull();
    });

    it("should emit remove event", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });
      const spy = vi.fn();

      parent.append(child);
      parent.on("remove", spy);
      parent.remove(child);

      expect(spy).toHaveBeenCalledWith(child);
    });

    it("should emit reparent event on child with null", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });
      const spy = vi.fn();

      parent.append(child);
      child.on("reparent", spy);
      parent.remove(child);

      expect(spy).toHaveBeenCalledWith(null);
    });

    it("should do nothing if child not in parent", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });

      parent.remove(child);

      expect(parent.children).toEqual([]);
    });
  });

  describe("detach()", () => {
    it("should detach from parent", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });

      parent.append(child);
      child.detach();

      expect(parent.children).not.toContain(child);
      expect(child.parent).toBeNull();
    });

    it("should do nothing if no parent", () => {
      const node = createNode({ screen });

      expect(() => {
        node.detach();
      }).not.toThrow();
    });
  });

  describe("destroy()", () => {
    it("should detach and mark as destroyed", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });

      parent.append(child);
      child.destroy();

      expect(child.destroyed).toBe(true);
      expect(parent.children).not.toContain(child);
    });

    it("should emit destroy event", () => {
      const node = createNode({ screen });
      const spy = vi.fn();

      node.on("destroy", spy);
      node.destroy();

      expect(spy).toHaveBeenCalled();
    });

    it("should destroy descendants", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });
      const grandchild = createNode({ screen });

      parent.append(child);
      child.append(grandchild);

      parent.destroy();

      expect(parent.destroyed).toBe(true);
      expect(child.destroyed).toBe(true);
      expect(grandchild.destroyed).toBe(true);
    });
  });

  describe("forDescendants()", () => {
    it("should iterate over all descendants", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });
      const grandchild = new Node({ screen });

      parent.append(child1);
      parent.append(child2);
      child1.append(grandchild);

      const visited = [];
      parent.forDescendants((el) => visited.push(el));

      expect(visited).toContain(child1);
      expect(visited).toContain(child2);
      expect(visited).toContain(grandchild);
    });

    it("should include self when second param is true", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });

      parent.append(child);

      const visited = [];
      parent.forDescendants((el) => visited.push(el), true);

      expect(visited).toContain(parent);
      expect(visited).toContain(child);
    });
  });

  describe("forAncestors()", () => {
    it("should iterate over all ancestors", () => {
      const grandparent = new Node({ screen });
      const parent = new Node({ screen });
      const child = new Node({ screen });

      grandparent.append(parent);
      parent.append(child);

      const visited = [];
      child.forAncestors((el) => visited.push(el));

      expect(visited).toContain(parent);
      expect(visited).toContain(grandparent);
      expect(visited).not.toContain(child);
    });

    it("should include self when second param is true", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });

      parent.append(child);

      const visited = [];
      child.forAncestors((el) => visited.push(el), true);

      expect(visited).toContain(child);
      expect(visited).toContain(parent);
    });
  });

  describe("hierarchy", () => {
    it("should maintain parent-child relationships", () => {
      const grandparent = createNode({ screen });
      const parent = createNode({ screen });
      const child = createNode({ screen });

      grandparent.append(parent);
      parent.append(child);

      expect(child.parent).toBe(parent);
      expect(parent.parent).toBe(grandparent);
      expect(grandparent.children).toContain(parent);
      expect(parent.children).toContain(child);
    });

    it("should handle reparenting", () => {
      const parent1 = createNode({ screen });
      const parent2 = createNode({ screen });
      const child = createNode({ screen });

      parent1.append(child);
      expect(child.parent).toBe(parent1);

      parent2.append(child);
      expect(child.parent).toBe(parent2);
      expect(parent1.children).not.toContain(child);
      expect(parent2.children).toContain(child);
    });
  });

  describe("collectDescendants()", () => {
    it("should collect all descendants", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });
      const grandchild = new Node({ screen });

      parent.append(child1);
      parent.append(child2);
      child1.append(grandchild);

      const descendants = parent.collectDescendants();

      expect(descendants).toContain(child1);
      expect(descendants).toContain(child2);
      expect(descendants).toContain(grandchild);
      expect(descendants.length).toBe(3);
    });

    it("should include self when param is true", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });

      parent.append(child);

      const descendants = parent.collectDescendants(true);

      expect(descendants).toContain(parent);
      expect(descendants).toContain(child);
      expect(descendants.length).toBe(2);
    });
  });

  describe("collectAncestors()", () => {
    it("should collect all ancestors", () => {
      const grandparent = new Node({ screen });
      const parent = new Node({ screen });
      const child = new Node({ screen });

      grandparent.append(parent);
      parent.append(child);

      const ancestors = child.collectAncestors();

      expect(ancestors).toContain(parent);
      expect(ancestors).toContain(grandparent);
      expect(ancestors.length).toBe(2);
    });

    it("should include self when param is true", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });

      parent.append(child);

      const ancestors = child.collectAncestors(true);

      expect(ancestors).toContain(child);
      expect(ancestors).toContain(parent);
      expect(ancestors.length).toBe(2);
    });
  });

  describe("emitDescendants()", () => {
    it("should have emitDescendants method", () => {
      const node = new Node({ screen });

      expect(typeof node.emitDescendants).toBe("function");
    });
  });

  describe("emitAncestors()", () => {
    it("should have emitAncestors method", () => {
      const node = new Node({ screen });

      expect(typeof node.emitAncestors).toBe("function");
    });
  });

  describe("hasDescendant()", () => {
    it("should return true for direct child", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });

      parent.append(child);

      expect(parent.hasDescendant(child)).toBe(true);
    });

    it("should return true for grandchild", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });
      const grandchild = new Node({ screen });

      parent.append(child);
      child.append(grandchild);

      expect(parent.hasDescendant(grandchild)).toBe(true);
    });

    it("should return false for non-descendant", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });
      const other = new Node({ screen });

      parent.append(child);

      expect(parent.hasDescendant(other)).toBe(false);
    });

    it("should return false for self", () => {
      const parent = new Node({ screen });

      expect(parent.hasDescendant(parent)).toBe(false);
    });
  });

  describe("hasAncestor()", () => {
    it("should return true for direct parent", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });

      parent.append(child);

      expect(child.hasAncestor(parent)).toBe(true);
    });

    it("should return true for grandparent", () => {
      const grandparent = new Node({ screen });
      const parent = new Node({ screen });
      const child = new Node({ screen });

      grandparent.append(parent);
      parent.append(child);

      expect(child.hasAncestor(grandparent)).toBe(true);
    });

    it("should return false for non-ancestor", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });
      const other = new Node({ screen });

      parent.append(child);

      expect(child.hasAncestor(other)).toBe(false);
    });

    it("should return false for self", () => {
      const node = new Node({ screen });

      expect(node.hasAncestor(node)).toBe(false);
    });
  });

  describe("get() and set()", () => {
    it("should set and get data", () => {
      const node = new Node({ screen });

      node.set("key", "value");

      expect(node.get("key")).toBe("value");
    });

    it("should return default value if key not found", () => {
      const node = new Node({ screen });

      expect(node.get("nonexistent", "default")).toBe("default");
    });

    it("should return undefined if key not found and no default", () => {
      const node = new Node({ screen });

      expect(node.get("nonexistent")).toBeUndefined();
    });

    it("should store data in $ and data properties", () => {
      const node = new Node({ screen });

      node.set("key", "value");

      expect(node.$["key"]).toBe("value");
      expect(node.data["key"]).toBe("value");
      expect(node._["key"]).toBe("value");
    });
  });

  describe("free()", () => {
    it("should have free method", () => {
      const node = new Node({ screen });

      expect(typeof node.free).toBe("function");
    });

    it("should be callable without error", () => {
      const node = new Node({ screen });

      expect(() => {
        node.free();
      }).not.toThrow();
    });
  });

  describe("attach/detach events", () => {
    it("should emit attach when attached to attached parent", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });
      const spy = vi.fn();

      // Parent must be attached first
      screen.append(parent);
      parent.detached = false;

      child.on("attach", spy);
      parent.append(child);

      expect(spy).toHaveBeenCalled();
      expect(child.detached).toBe(false);
    });

    it("should emit detach when removed from parent", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });
      const spy = vi.fn();

      // Attach both first
      screen.append(parent);
      parent.detached = false;
      parent.append(child);

      child.on("detach", spy);
      parent.remove(child);

      expect(spy).toHaveBeenCalled();
      expect(child.detached).toBe(true);
    });

    it("should propagate attach to descendants", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });
      const grandchild = new Node({ screen });

      child.append(grandchild);

      const childSpy = vi.fn();
      const grandchildSpy = vi.fn();

      child.on("attach", childSpy);
      grandchild.on("attach", grandchildSpy);

      // Parent must be attached
      screen.append(parent);
      parent.detached = false;
      parent.append(child);

      expect(childSpy).toHaveBeenCalled();
      expect(grandchildSpy).toHaveBeenCalled();
    });

    it("should propagate detach to descendants", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });
      const grandchild = createNode({ screen });

      // Attach all first
      screen.append(parent);
      parent.detached = false;
      parent.append(child);
      child.append(grandchild);

      const childSpy = vi.fn();
      const grandchildSpy = vi.fn();

      child.on("detach", childSpy);
      grandchild.on("detach", grandchildSpy);

      parent.remove(child);

      expect(childSpy).toHaveBeenCalled();
      expect(grandchildSpy).toHaveBeenCalled();
    });
  });

  describe("screen reference", () => {
    it("should inherit screen from parent", () => {
      const parent = new Node({ screen });
      const child = new Node({ parent });

      expect(child.screen).toBe(screen);
    });

    it("should set initial focused element", () => {
      const parent = new Node({ screen });
      const child = new Node({ screen });

      screen.focused = null;
      parent.append(child);

      expect(screen.focused).toBe(child);
    });

    it("should not override existing focused element", () => {
      const parent = new Node({ screen });
      const child1 = new Node({ screen });
      const child2 = new Node({ screen });

      screen.focused = null;
      parent.append(child1);
      parent.append(child2);

      expect(screen.focused).toBe(child1);
    });
  });

  describe("index property", () => {
    it("should default index to -1", () => {
      const node = new Node({ screen });

      expect(node.index).toBe(-1);
    });

    it("should preserve custom index if set", () => {
      const node = new Node({ screen });
      node.index = 5;

      expect(node.index).toBe(5);
    });
  });

  describe("options property", () => {
    it("should store options", () => {
      const options = { screen, custom: "value" };
      const node = new Node(options);

      expect(node.options).toBe(options);
      expect(node.options.custom).toBe("value");
    });
  });

  describe("screen management", () => {
    it("should remove from clickable array on remove", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });

      screen.clickable = [child];
      parent.append(child);
      parent.remove(child);

      expect(screen.clickable).not.toContain(child);
    });

    it("should remove from keyable array on remove", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });

      screen.keyable = [child];
      parent.append(child);
      parent.remove(child);

      expect(screen.keyable).not.toContain(child);
    });

    it("should rewind focus when removing focused element", () => {
      const parent = createNode({ screen });
      const child = createNode({ screen });

      screen.rewindFocus = vi.fn();
      parent.append(child);
      screen.focused = child;

      parent.remove(child);

      expect(screen.rewindFocus).toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("should throw error when switching screens", () => {
      const screen1 = createMockScreen();
      const screen2 = createMockScreen();
      const parent = new Node({ screen: screen1 });
      const child = new Node({ screen: screen2 });

      expect(() => {
        parent.append(child);
      }).toThrow("Cannot switch a node's screen.");
    });
  });
});
