/**
 * integration.test.ts - Integration tests for complex layout scenarios
 */

import { Screen } from "@unblessed/core";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LayoutManager } from "../src/layout-engine.js";

describe("Integration tests", () => {
  let screen: Screen;
  let manager: LayoutManager;

  beforeEach(() => {
    screen = new Screen({ width: 80, height: 24 });
    manager = new LayoutManager({ screen });
  });

  afterEach(() => {
    screen.destroy();
  });

  it("handles nested containers", () => {
    const outer = manager.createNode("outer", {
      flexDirection: "column",
      width: 80,
      height: 24,
    });

    const header = manager.createNode("header", { height: 5, width: 80 });

    const content = manager.createNode("content", {
      flexDirection: "row",
      flexGrow: 1,
      width: 80,
    });

    const sidebar = manager.createNode("sidebar", { width: 20 });
    const main = manager.createNode("main", { flexGrow: 1 });

    manager.appendChild(outer, header);
    manager.appendChild(outer, content);
    manager.appendChild(content, sidebar);
    manager.appendChild(content, main);

    manager.performLayout(outer);

    // Header should be at top
    expect(header.widget!.top).toBe(0);
    expect(header.widget!.height).toBe(5);

    // Content should be below header
    expect(content.widget!.top).toBe(5);

    // Sidebar should be on left
    expect(sidebar.widget!.left).toBe(0);
    expect(sidebar.widget!.width).toBe(20);

    // Main should fill remaining width
    expect(main.widget!.left).toBe(20);
    expect(main.widget!.width).toBeGreaterThan(0);

    manager.destroy(outer);
  });

  it("handles column layout", () => {
    const container = manager.createNode("container", {
      flexDirection: "column",
      width: 40,
      height: 30,
    });

    const top = manager.createNode("top", { height: 10, width: 40 });
    const middle = manager.createNode("middle", { flexGrow: 1, width: 40 });
    const bottom = manager.createNode("bottom", { height: 10, width: 40 });

    manager.appendChild(container, top);
    manager.appendChild(container, middle);
    manager.appendChild(container, bottom);

    manager.performLayout(container);

    expect(top.widget!.top).toBe(0);
    expect(middle.widget!.top).toBe(10);
    expect(middle.widget!.height).toBe(10); // 30 - 10 - 10
    expect(bottom.widget!.top).toBe(20);

    manager.destroy(container);
  });

  it("handles alignItems center", () => {
    const container = manager.createNode("container", {
      flexDirection: "row",
      alignItems: "center",
      width: 80,
      height: 20,
    });

    const small = manager.createNode("small", { width: 20, height: 5 });

    manager.appendChild(container, small);

    manager.performLayout(container);

    // Small box should be vertically centered
    // (20 - 5) / 2 = 7.5, rounded down = 7
    expect(small.widget!.top).toBeGreaterThanOrEqual(7);
    expect(small.widget!.top).toBeLessThanOrEqual(8);

    manager.destroy(container);
  });

  it("updates layout when props change", () => {
    const container = manager.createNode("container", {
      flexDirection: "row",
      width: 80,
    });

    const box = manager.createNode("box", { width: 20, height: 10 });
    manager.appendChild(container, box);

    // Initial layout
    manager.performLayout(container);
    expect(box.widget!.width).toBe(20);

    // Change width and re-layout
    box.props.width = 40;
    box.yogaNode.setWidth(40);
    manager.performLayout(container);

    // Widget should reflect new dimensions
    expect(box.widget!.width).toBe(40);

    manager.destroy(container);
  });

  it("handles minWidth constraint", () => {
    const container = manager.createNode("container", {
      flexDirection: "row",
      width: 80,
    });

    const box = manager.createNode("box", {
      flexGrow: 1,
      minWidth: 50,
      height: 10,
    });

    manager.appendChild(container, box);

    manager.performLayout(container);

    // Box should respect minWidth
    expect(box.widget!.width).toBeGreaterThanOrEqual(50);

    manager.destroy(container);
  });

  it("handles display none", () => {
    const container = manager.createNode("container", {
      flexDirection: "row",
      width: 80,
    });

    const visible = manager.createNode("visible", { width: 20, height: 10 });
    const hidden = manager.createNode("hidden", {
      width: 20,
      height: 10,
      display: "none",
    });

    manager.appendChild(container, visible);
    manager.appendChild(container, hidden);

    manager.performLayout(container);

    // Visible box should render
    expect(visible.widget).toBeDefined();

    // Hidden box should have zero dimensions
    expect(hidden.widget!.width).toBe(0);
    expect(hidden.widget!.height).toBe(0);

    manager.destroy(container);
  });

  it("preserves widgetOptions through layout", () => {
    const node = manager.createNode(
      "box",
      { width: 40, height: 10 },
      {
        content: "Hello World",
        border: { type: "line" },
        style: { fg: "cyan" },
      },
    );

    manager.performLayout(node);

    // Widget should have all the options
    expect(node.widget!.content).toBe("Hello World");
    // Border gets normalized with defaults by unblessed
    expect(node.widget!.border).toBeDefined();
    expect(node.widget!.border!.type).toBe("line");
    expect(node.widget!.style.fg).toBe("cyan");

    manager.destroy(node);
  });
});
