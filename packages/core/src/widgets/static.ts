/**
 * static.ts - static element for blessed
 * Inspired by ink's <Static> component
 */

/**
 * Modules
 */

import type { StaticOptions } from "../types";
import Box from "./box.js";

/**
 * Static widget for rendering items once without re-rendering.
 *
 * A container that renders items once and never re-renders previous content.
 * Perfect for displaying logs, completed tasks, or any content that should
 * remain immutable once rendered.
 *
 * Inspired by ink's `<Static>` component, this provides a way to build up
 * permanent output above dynamic content.
 *
 * @example Basic usage
 * ```typescript
 * const completedTasks = [];
 * const staticWidget = new Static({
 *   parent: screen,
 *   top: 0,
 *   left: 0,
 *   width: '100%',
 *   renderItem: (item, index) => `✓ Task ${index + 1}: ${item}`
 * });
 *
 * // Add new tasks - only new items render
 * completedTasks.push('Setup project');
 * staticWidget.setItems(completedTasks);
 * screen.render();
 *
 * completedTasks.push('Write code');
 * staticWidget.setItems(completedTasks);
 * screen.render();
 * ```
 */
class Static<T = any> extends Box {
  override type = "static";
  declare options: StaticOptions<T>;

  /**
   * Array of items to render.
   */
  private _items: T[] = [];

  /**
   * Index of last rendered item.
   * Items before this index have been permanently rendered.
   */
  private _lastRenderedIndex: number = 0;

  /**
   * Function to render each item.
   */
  private _renderItem: (item: T, index: number) => string;

  /**
   * Rendered content cache.
   * Stores all previously rendered content.
   */
  private _renderedContent: string[] = [];

  constructor(options: StaticOptions<T> = {}) {
    super(options);

    this._items = options.items || [];
    this._renderItem = options.renderItem || ((item: T) => String(item));
    this._renderNewItems();
  }

  /**
   * Set items array and render new items.
   * Only items added since last render will be rendered.
   *
   * @param items - New items array
   */
  setItems(items: T[]): void {
    this._items = items;
    this._renderNewItems();
  }

  /**
   * Get current items array (read-only copy).
   * Returns a shallow copy to prevent external modifications.
   *
   * @returns Read-only copy of items array
   */
  getItems(): readonly T[] {
    return [...this._items];
  }

  /**
   * Add a single item and render it.
   *
   * @param item - Item to add
   */
  addItem(item: T): void {
    this._items.push(item);
    this._renderNewItems();
  }

  /**
   * Add multiple items and render them.
   *
   * @param items - Items to add
   */
  addItems(items: T[]): void {
    this._items.push(...items);
    this._renderNewItems();
  }

  /**
   * Clear all items and rendered content.
   * This is the only way to "reset" the static widget.
   */
  clearItems(): void {
    this._items = [];
    this._lastRenderedIndex = 0;
    this._renderedContent = [];
    this.setContent("");
  }

  /**
   * Render only new items (items added since last render).
   * Previous items are never re-rendered.
   */
  private _renderNewItems(): void {
    const newItems = this._items.slice(this._lastRenderedIndex);

    if (newItems.length === 0) {
      return;
    }

    for (let i = 0; i < newItems.length; i++) {
      const globalIndex = this._lastRenderedIndex + i;
      const item = newItems[i];
      const rendered = this._renderItem(item, globalIndex);
      this._renderedContent.push(rendered);
    }

    this._lastRenderedIndex = this._items.length;
    this.setContent(this._renderedContent.join("\n"));
  }

  /**
   * Get the number of items that have been rendered.
   *
   * @returns Number of rendered items
   */
  getRenderedCount(): number {
    return this._lastRenderedIndex;
  }

  /**
   * Get the total number of items.
   *
   * @returns Total item count
   */
  getItemCount(): number {
    return this._items.length;
  }

  /**
   * Check if all items have been rendered.
   *
   * @returns True if all items are rendered
   */
  isFullyRendered(): boolean {
    return this._lastRenderedIndex === this._items.length;
  }
}

/**
 * Expose
 */

export default Static;
export { Static };
