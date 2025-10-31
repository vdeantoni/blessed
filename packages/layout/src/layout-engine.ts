/**
 * layout-engine.ts - Main layout engine for flexbox calculations
 */

import type { Screen } from "@unblessed/core";
import Yoga from "yoga-layout";
import type { LayoutManagerOptions, LayoutNode } from "./types.js";
import { destroyWidgets, syncTreeAndRender } from "./widget-sync.js";
import { createLayoutNode, destroyLayoutNode } from "./yoga-node.js";

/**
 * LayoutManager - Main API for flexbox layout in unblessed.
 *
 * This class manages the lifecycle of a Yoga layout tree and synchronizes
 * it with unblessed widgets. It's designed to be used by framework integrations
 * like @unblessed/react.
 *
 * @example
 * ```typescript
 * const screen = new Screen();
 * const manager = new LayoutManager({ screen });
 *
 * const root = manager.createNode('container', {
 *   flexDirection: 'row',
 *   gap: 2
 * });
 *
 * const left = manager.createNode('box', { width: 20 });
 * const spacer = manager.createNode('spacer', { flexGrow: 1 });
 * const right = manager.createNode('box', { width: 20 });
 *
 * manager.appendChild(root, left);
 * manager.appendChild(root, spacer);
 * manager.appendChild(root, right);
 *
 * manager.performLayout(root);
 * ```
 */
export class LayoutManager {
  private screen: Screen;
  private debug: boolean;

  constructor(options: LayoutManagerOptions) {
    this.screen = options.screen;
    this.debug = options.debug ?? false;
  }

  /**
   * Creates a new layout node.
   * @param type - Type identifier for the node
   * @param props - Flexbox properties
   * @param widgetOptions - Additional unblessed widget options
   * @returns A new layout node
   */
  createNode(
    type: string,
    props: any = {},
    widgetOptions: any = {},
  ): LayoutNode {
    const node = createLayoutNode(type, props);
    node.widgetOptions = widgetOptions;

    if (this.debug) {
      console.log(`[LayoutManager] Created node: ${type}`, props);
    }

    return node;
  }

  /**
   * Appends a child node to a parent.
   * @param parent - Parent layout node
   * @param child - Child layout node
   */
  appendChild(parent: LayoutNode, child: LayoutNode): void {
    child.parent = parent;
    parent.children.push(child);
    parent.yogaNode.insertChild(child.yogaNode, parent.children.length - 1);

    if (this.debug) {
      console.log(`[LayoutManager] Appended ${child.type} to ${parent.type}`);
    }
  }

  /**
   * Inserts a child node before another child.
   * @param parent - Parent layout node
   * @param child - Child layout node to insert
   * @param beforeChild - Reference child to insert before
   */
  insertBefore(
    parent: LayoutNode,
    child: LayoutNode,
    beforeChild: LayoutNode,
  ): void {
    const index = parent.children.indexOf(beforeChild);
    if (index === -1) {
      throw new Error("Reference child not found in parent");
    }

    child.parent = parent;
    parent.children.splice(index, 0, child);
    parent.yogaNode.insertChild(child.yogaNode, index);

    if (this.debug) {
      console.log(
        `[LayoutManager] Inserted ${child.type} before ${beforeChild.type} in ${parent.type}`,
      );
    }
  }

  /**
   * Removes a child node from its parent.
   * @param parent - Parent layout node
   * @param child - Child layout node to remove
   */
  removeChild(parent: LayoutNode, child: LayoutNode): void {
    const index = parent.children.indexOf(child);
    if (index === -1) return;

    parent.children.splice(index, 1);
    parent.yogaNode.removeChild(child.yogaNode);
    child.parent = null;

    if (this.debug) {
      console.log(`[LayoutManager] Removed ${child.type} from ${parent.type}`);
    }
  }

  /**
   * Calculates layout for a tree and synchronizes with unblessed widgets.
   * This is the main function that bridges Yoga calculations to unblessed rendering.
   *
   * WORKFLOW:
   * 1. Calculate layout with Yoga (flexbox positioning)
   * 2. Extract computed coordinates from Yoga nodes
   * 3. Create/update unblessed widgets with those coordinates
   * 4. Render the screen
   *
   * @param rootNode - Root of the layout tree
   */
  performLayout(rootNode: LayoutNode): void {
    if (this.debug) {
      console.log("[LayoutManager] Starting layout calculation");
    }

    // Step 1: Calculate layout using Yoga
    // Yoga will compute top, left, width, height for every node
    this.calculateLayout(rootNode);

    if (this.debug) {
      this.logLayout(rootNode);
    }

    // Step 2: Sync Yoga output to unblessed widgets
    // This creates/updates widgets with Yoga's computed positions
    syncTreeAndRender(rootNode, this.screen);

    if (this.debug) {
      console.log("[LayoutManager] Layout complete and rendered");
    }
  }

  /**
   * Calculates layout using Yoga.
   * After this, all Yoga nodes will have computed positions.
   * @param rootNode - Root of the layout tree
   */
  private calculateLayout(rootNode: LayoutNode): void {
    // Get terminal dimensions (fallback to 80x24 if not available)
    const terminalWidth = this.screen.width || 80;

    // Only set root width if not already configured
    // This respects explicit dimensions from user while providing defaults
    if (rootNode.props.width === undefined) {
      rootNode.yogaNode.setWidth(terminalWidth);
    }

    // Calculate layout
    // Yoga will figure out positions for the entire tree
    rootNode.yogaNode.calculateLayout(
      undefined, // Let Yoga auto-calculate based on node settings
      undefined,
      Yoga.DIRECTION_LTR,
    );
  }

  /**
   * Logs the computed layout for debugging.
   * @param node - Node to log (recursive)
   * @param depth - Current depth for indentation
   */
  private logLayout(node: LayoutNode, depth = 0): void {
    const indent = "  ".repeat(depth);
    const layout = node.yogaNode.getComputedLayout();

    console.log(
      `${indent}${node.type}: top=${layout.top} left=${layout.left} ` +
        `width=${layout.width} height=${layout.height}`,
    );

    for (const child of node.children) {
      this.logLayout(child, depth + 1);
    }
  }

  /**
   * Destroys a layout tree and cleans up all resources.
   * IMPORTANT: Call this to prevent memory leaks.
   * @param node - Root node to destroy
   */
  destroy(node: LayoutNode): void {
    if (this.debug) {
      console.log(`[LayoutManager] Destroying node tree: ${node.type}`);
    }

    // Destroy all widgets
    destroyWidgets(node);

    // Destroy Yoga nodes
    destroyLayoutNode(node);
  }
}
