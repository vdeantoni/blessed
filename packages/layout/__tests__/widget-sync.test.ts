/**
 * widget-sync.test.ts - Tests for Yoga to widget synchronization
 */

import { Screen } from "@unblessed/core";
import { beforeEach, describe, expect, it } from "vitest";
import { LayoutManager } from "../src/layout-engine.js";
import { getComputedLayout } from "../src/widget-sync.js";

describe("widget sync", () => {
  let screen: Screen;
  let manager: LayoutManager;

  beforeEach(() => {
    screen = new Screen();
    manager = new LayoutManager({ screen });
  });

  afterEach(() => {
    screen.destroy();
  });

  it("creates widgets from layout nodes", () => {
    const node = manager.createNode(
      "box",
      { width: 20, height: 5 },
      { content: "Hello", border: { type: "line" } },
    );

    manager.performLayout(node);

    expect(node.widget).toBeDefined();
    expect(node.widget!.content).toBe("Hello");
    expect(node.widget!.border).toBeDefined();

    manager.destroy(node);
    screen.destroy();
  });

  it("updates existing widgets on re-layout", () => {
    const container = manager.createNode("container", {
      flexDirection: "row",
      width: 80,
    });

    const box = manager.createNode("box", { width: 20 });
    manager.appendChild(container, box);

    // First layout
    manager.performLayout(container);
    const firstWidget = box.widget;
    expect(firstWidget).toBeDefined();
    expect(firstWidget!.left).toBe(0);

    // Update props and re-layout
    box.props.width = 30;
    box.yogaNode.setWidth(30);

    manager.performLayout(container);

    // Widget should be reused and updated
    expect(box.widget).toBe(firstWidget); // Same widget instance
    expect(box.widget!.width).toBe(30); // Updated width

    manager.destroy(container);
    screen.destroy();
  });

  it("maintains parent-child relationships", () => {
    const parent = manager.createNode("parent", {});
    const child = manager.createNode("child", {});

    manager.appendChild(parent, child);
    manager.performLayout(parent);

    expect(child.widget!.parent).toBe(parent.widget);

    manager.destroy(parent);
    screen.destroy();
  });

  it("extracts correct computed layout", () => {
    const node = manager.createNode("box", {
      width: 50,
      height: 10,
    });

    // Calculate layout
    node.yogaNode.calculateLayout(80, 24, 0);

    const layout = getComputedLayout(node);

    expect(layout.width).toBe(50);
    expect(layout.height).toBe(10);
    expect(layout.top).toBeGreaterThanOrEqual(0);
    expect(layout.left).toBeGreaterThanOrEqual(0);

    manager.destroy(node);
  });
});
