/**
 * layout-engine.test.ts - Tests for LayoutManager
 */

import { Screen } from "@unblessed/core";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LayoutManager } from "../src/layout-engine.js";
import { destroyLayoutNode } from "../src/yoga-node.js";

describe("LayoutManager", () => {
  let screen: Screen;
  let manager: LayoutManager;

  beforeEach(() => {
    screen = new Screen({ width: 80, height: 24 });
    manager = new LayoutManager({ screen });
  });

  afterEach(() => {
    screen.destroy();
  });

  it("creates nodes", () => {
    const node = manager.createNode("box", { width: 20 });

    expect(node.type).toBe("box");
    expect(node.props.width).toBe(20);
    expect(node.yogaNode).toBeDefined();
  });

  it("appends children", () => {
    const parent = manager.createNode("parent", {});
    const child = manager.createNode("child", {});

    manager.appendChild(parent, child);

    expect(parent.children).toContain(child);
    expect(child.parent).toBe(parent);
  });

  it("removes children", () => {
    const parent = manager.createNode("parent", {});
    const child = manager.createNode("child", {});

    manager.appendChild(parent, child);
    manager.removeChild(parent, child);

    expect(parent.children).not.toContain(child);
    expect(child.parent).toBeNull();
  });

  it("inserts before", () => {
    const parent = manager.createNode("parent", {});
    const child1 = manager.createNode("child1", {});
    const child2 = manager.createNode("child2", {});
    const child3 = manager.createNode("child3", {});

    manager.appendChild(parent, child1);
    manager.appendChild(parent, child3);
    manager.insertBefore(parent, child2, child3);

    expect(parent.children).toEqual([child1, child2, child3]);
  });

  it("calculates simple layout", () => {
    const root = manager.createNode("root", {
      width: 80,
      height: 24,
    });

    manager.performLayout(root);

    // Widget should be created with exact dimensions from Yoga
    expect(root.widget).toBeDefined();
    expect(root.widget!.width).toBe(80);
    expect(root.widget!.height).toBe(24);

    manager.destroy(root);
    screen.destroy();
  });

  it("calculates flexbox row layout", () => {
    const container = manager.createNode("container", {
      flexDirection: "row",
      width: 80,
      height: 10,
    });

    const left = manager.createNode("left", { width: 20, height: 10 });
    const right = manager.createNode("right", { width: 20, height: 10 });

    manager.appendChild(container, left);
    manager.appendChild(container, right);

    manager.performLayout(container);

    // Left box should be at left side
    expect(left.widget).toBeDefined();
    expect(left.widget!.left).toBe(0);

    // Right box should be after left box
    expect(right.widget).toBeDefined();
    expect(right.widget!.left).toBe(20);

    manager.destroy(container);
    screen.destroy();
  });

  it("calculates flexGrow correctly", () => {
    const container = manager.createNode("container", {
      flexDirection: "row",
      width: 80,
      height: 10,
    });

    const left = manager.createNode("left", { width: 20, height: 10 });
    const spacer = manager.createNode("spacer", { flexGrow: 1, height: 10 });
    const right = manager.createNode("right", { width: 20, height: 10 });

    manager.appendChild(container, left);
    manager.appendChild(container, spacer);
    manager.appendChild(container, right);

    manager.performLayout(container);

    // Left should be at position 0
    expect(left.widget!.left).toBe(0);
    expect(left.widget!.width).toBe(20);

    // Spacer should fill the remaining space (80 - 20 - 20 = 40)
    expect(spacer.widget!.left).toBe(20);
    expect(spacer.widget!.width).toBe(40);

    // Right should be at the end
    expect(right.widget!.left).toBe(60); // 20 + 40
    expect(right.widget!.width).toBe(20);

    manager.destroy(container);
    screen.destroy();
  });

  it("calculates space-between correctly", () => {
    const container = manager.createNode("container", {
      flexDirection: "row",
      justifyContent: "space-between",
      width: 80,
      height: 10,
    });

    const left = manager.createNode("left", { width: 20, height: 10 });
    const right = manager.createNode("right", { width: 20, height: 10 });

    manager.appendChild(container, left);
    manager.appendChild(container, right);

    manager.performLayout(container);

    // Left should be at start
    expect(left.widget!.left).toBe(0);
    expect(left.widget!.width).toBe(20);

    // Right should be at end (space-between pushes it to far right)
    expect(right.widget!.left).toBe(60); // 80 - 20 = 60
    expect(right.widget!.width).toBe(20);

    manager.destroy(container);
    screen.destroy();
  });

  it("applies padding correctly", () => {
    const container = manager.createNode("container", {
      padding: 2,
      width: 80,
      height: 10,
    });

    const child = manager.createNode("child", {
      width: 20,
      height: 5,
    });

    manager.appendChild(container, child);

    manager.performLayout(container);

    // Child should be offset by padding
    expect(child.widget!.left).toBe(2);
    expect(child.widget!.top).toBe(2);

    manager.destroy(container);
    screen.destroy();
  });

  it("applies gap correctly", () => {
    const container = manager.createNode("container", {
      flexDirection: "row",
      gap: 5,
      width: 80,
      height: 10,
    });

    const box1 = manager.createNode("box1", { width: 10, height: 10 });
    const box2 = manager.createNode("box2", { width: 10, height: 10 });
    const box3 = manager.createNode("box3", { width: 10, height: 10 });

    manager.appendChild(container, box1);
    manager.appendChild(container, box2);
    manager.appendChild(container, box3);

    manager.performLayout(container);

    // Boxes should be separated by gap
    expect(box1.widget!.left).toBe(0);
    expect(box2.widget!.left).toBe(15); // 10 + 5 gap
    expect(box3.widget!.left).toBe(30); // 10 + 5 + 10 + 5

    manager.destroy(container);
    screen.destroy();
  });
});

describe("destroyLayoutNode", () => {
  let screen: Screen;
  let manager: LayoutManager;

  beforeEach(() => {
    screen = new Screen();
    manager = new LayoutManager({ screen });
  });

  it("cleans up resources", () => {
    const parent = manager.createNode("parent", {});
    const child = manager.createNode("child", {});

    manager.appendChild(parent, child);

    const parentYoga = parent.yogaNode;
    const childYoga = child.yogaNode;

    destroyLayoutNode(parent);

    // References should be cleared
    expect(parent.children).toEqual([]);
    expect(child.parent).toBeNull();
  });
});
