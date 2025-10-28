/**
 * node.ts - base abstract node for blessed
 */

/**
 * Modules
 */

import { EventEmitter } from "../lib/events.js";
import type { NodeOptions } from "../types";
import { type Runtime, getRuntime, getNextTick } from "../lib/runtime-helpers";

/**
 * Screen Registry - breaks circular dependency
 * Screen will populate this when it's loaded
 */
const ScreenRegistry: any = {
  instances: [],
  global: null,
  get total() {
    return this.instances.length;
  },
};

/**
 * Node
 */

class Node extends EventEmitter {
  static uid = 0;
  static ScreenRegistry = ScreenRegistry; // Expose for Screen to use

  /**
   * Type of the node (e.g. box, list, form, etc.).
   * Used to identify the widget type at runtime.
   */
  override type = "node";
  options: NodeOptions;
  /**
   * Reference to the parent Screen instance.
   * Type: Screen (subclass of Node)
   *
   * Kept as any due to circular dependency between Node and Screen,
   * and to preserve access to Screen-specific methods like clearRegion(),
   * render(), and the program property without complex generic typing.
   */
  screen: any;
  /**
   * Reference to the parent element in the widget tree.
   * Type: Node (can be any Element/Box/List/etc subclass)
   *
   * Kept as any to avoid complex generic typing and preserve access
   * to subclass-specific methods. Attempting to type as Node loses
   * methods from subclasses like Box, List, Form, etc.
   */
  override parent: any;
  /**
   * Array of child elements.
   * Type: Node[] (can contain any Node subclasses)
   *
   * Kept as any[] to preserve flexibility with mixed widget types.
   */
  children: any[];

  /**
   * An object for any miscellaneous user data.
   */
  $: Record<string, unknown>;

  /**
   * An object for any miscellaneous user data.
   */
  _: Record<string, unknown>;

  /**
   * An object for any miscellaneous user data.
   */
  data: Record<string, unknown>;

  uid: number;
  /**
   * Render index (document order index) of the last render call.
   * Indicates the order in which this element was rendered relative to others.
   * Set to -1 initially, updated during rendering.
   */
  index: number = -1; // Initialize to -1, may be updated when appended to parent
  detached?: boolean;
  destroyed?: boolean;

  runtime: Runtime;

  constructor(options: NodeOptions = {}) {
    super();

    this.runtime = getRuntime();

    this.options = options;
    this.screen = this.screen || options.screen;

    if (!this.screen) {
      if (this.type === "screen" || options._isScreen) {
        this.screen = this;
      } else if (ScreenRegistry.total === 1) {
        this.screen = ScreenRegistry.global;
      } else if (options.parent) {
        this.screen = options.parent;
        while (this.screen && this.screen.type !== "screen") {
          this.screen = this.screen.parent;
        }
      } else if (ScreenRegistry.total) {
        // This _should_ work in most cases as long as the element is appended
        // synchronously after the screen's creation. Throw error if not.
        this.screen =
          ScreenRegistry.instances[ScreenRegistry.instances.length - 1];
        getNextTick()(() => {
          if (!this.parent) {
            throw new Error(
              `Element (${this.type})` +
                " was not appended synchronously after the" +
                " screen's creation. Please set a `parent`" +
                " or `screen` option in the element's constructor" +
                " if you are going to use multiple screens and" +
                " append the element later.",
            );
          }
        });
      } else {
        throw new Error("No active screen.");
      }
    }

    this.parent = options.parent || null;
    this.children = [];
    this.$ = this._ = this.data = {};
    this.uid = Node.uid++;
    // index is initialized to -1 in declaration, will be updated when appended

    // Don't mark screen as detached (check options._isScreen since child class
    // field 'type' is not set until after super() returns in ES6)
    if (this.type !== "screen" && !options._isScreen) {
      this.detached = true;
    }

    if (this.parent) {
      this.parent.append(this);
    }

    (options.children || []).forEach(this.append.bind(this));
  }

  /**
   * Insert a node to this node's children at index i.
   */
  insert(element: any, i: number): void {
    if (element.screen && element.screen !== this.screen) {
      throw new Error("Cannot switch a node's screen.");
    }

    element.detach();
    element.parent = this;
    element.screen = this.screen;

    if (i === 0) {
      this.children.unshift(element);
    } else if (i === this.children.length) {
      this.children.push(element);
    } else {
      this.children.splice(i, 0, element);
    }

    element.emit("reparent", this);
    this.emit("adopt", element);

    const emit = (el: any): void => {
      const n = el.detached !== this.detached;
      el.detached = this.detached;
      if (n) el.emit("attach");
      el.children.forEach(emit);
    };
    emit(element);

    // Only auto-focus elements that are actually focusable
    if (!this.screen.focused && element.isFocusable && element.isFocusable()) {
      this.screen.focused = element;
    }
  }

  /**
   * Prepend a node to this node's children.
   */
  prepend(element: any): void {
    this.insert(element, 0);
  }

  /**
   * Append a node to this node's children.
   */
  append(element: any): void {
    this.insert(element, this.children.length);
  }

  /**
   * Insert a node to this node's children before the reference node.
   */
  insertBefore(element: any, other: any): void {
    const i = this.children.indexOf(other);
    if (~i) this.insert(element, i);
  }

  /**
   * Insert a node from node after the reference node.
   */
  insertAfter(element: any, other: any): void {
    const i = this.children.indexOf(other);
    if (~i) this.insert(element, i + 1);
  }

  /**
   * Remove child node from node.
   */
  remove(element: any): void {
    if (element.parent !== this) return;

    let i = this.children.indexOf(element);
    if (!~i) return;

    element.clearPos();
    element.parent = null;
    this.children.splice(i, 1);

    i = this.screen.clickable.indexOf(element);
    if (~i) this.screen.clickable.splice(i, 1);
    i = this.screen.keyable.indexOf(element);
    if (~i) this.screen.keyable.splice(i, 1);

    element.emit("reparent", null);
    this.emit("remove", element);

    const emit = (el: any): void => {
      const n = el.detached !== true;
      el.detached = true;
      if (n) el.emit("detach");
      el.children.forEach(emit);
    };
    emit(element);

    if (this.screen.focused === element) {
      this.screen.rewindFocus();
    }
  }

  /**
   * Remove node from its parent.
   */
  detach(): void {
    if (this.parent) this.parent.remove(this);
  }

  /**
   * Free up the element. Automatically unbind all events that may have been bound
   * to the screen object. This prevents memory leaks.
   */
  free(): void {
    return;
  }

  /**
   * Same as the detach() method, except this will automatically call free() and unbind any screen
   * events to prevent memory leaks. For use with onScreenEvent(), removeScreenEvent(), and free().
   */
  destroy(): void {
    this.detach();
    this.forDescendants((el: any) => {
      el.free();
      el.destroyed = true;
      el.emit("destroy");
    }, this);
  }

  /**
   * Iterate over all descendants, calling iter(el) for each.
   */
  forDescendants(iter: (el: any) => void, s?: any): void {
    if (s) iter(this);
    this.children.forEach((el: any) => {
      iter(el);
      el.children.forEach((child: any) => iter(child));
    });
  }

  /**
   * Iterate over all ancestors, calling iter(el) for each.
   */
  forAncestors(iter: (el: any) => void, s?: any): void {
    let el: any = this;
    if (s) iter(this);
    while ((el = el.parent)) {
      iter(el);
    }
  }

  /**
   * Collect all descendants into an array.
   */
  collectDescendants(s?: any): any[] {
    const out: any[] = [];
    this.forDescendants((el: any) => {
      out.push(el);
    }, s);
    return out;
  }

  /**
   * Collect all ancestors into an array.
   */
  collectAncestors(s?: any): any[] {
    const out: any[] = [];
    this.forAncestors((el: any) => {
      out.push(el);
    }, s);
    return out;
  }

  /**
   * Emit event for element, and recursively emit same event for all descendants.
   */
  emitDescendants(...args: any[]): void {
    let iter: ((el: any) => void) | undefined;

    if (typeof args[args.length - 1] === "function") {
      iter = args.pop();
    }

    return this.forDescendants((el: any) => {
      if (iter) iter(el);
      el.emit(...args);
    }, true);
  }

  /**
   * Emit event for element, and recursively emit same event for all ancestors.
   */
  emitAncestors(...args: any[]): void {
    let iter: ((el: any) => void) | undefined;

    if (typeof args[args.length - 1] === "function") {
      iter = args.pop();
    }

    return this.forAncestors((el: any) => {
      if (iter) iter(el);
      el.emit(...args);
    }, true);
  }

  /**
   * Check if target is a descendant of this node.
   */
  hasDescendant(target: any): boolean {
    const find = (el: any): boolean => {
      for (let i = 0; i < el.children.length; i++) {
        if (el.children[i] === target) {
          return true;
        }
        if (find(el.children[i]) === true) {
          return true;
        }
      }
      return false;
    };
    return find(this);
  }

  /**
   * Check if target is an ancestor of this node.
   */
  hasAncestor(target: any): boolean {
    let el: any = this;
    while ((el = el.parent)) {
      if (el === target) return true;
    }
    return false;
  }

  /**
   * Get user property with a potential default value.
   */
  get(name: string, value?: any): any {
    if (this.data.hasOwnProperty(name)) {
      return this.data[name];
    }
    return value;
  }

  /**
   * Set user property to value.
   */
  set(name: string, value: any): any {
    return (this.data[name] = value);
  }
}

/**
 * Expose
 */

export default Node;
export { Node };
