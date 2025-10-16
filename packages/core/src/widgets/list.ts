/**
 * list.ts - list element for blessed
 */

/**
 * Modules
 */

import type { KeyEvent, ListElementStyle, ListOptions } from '../types';
import helpers from '../lib/helpers.js';
import Box from './box.js';
import ScrollableBox from './scrollablebox.js';

/**
 * List
 *
 * @fires select - Received when an item is selected. Receives the selected item and index.
 * @fires cancel - List was canceled (when esc is pressed with the keys option).
 * @fires action - Received when an item is selected or canceled.
 */

class List extends ScrollableBox {
  override type = 'list';
  declare style: ListElementStyle;
  value: string;
  override items: any[];
  ritems: any[];
  selected: number;
  override _isList: boolean;
  interactive: boolean;
  mouse: boolean;
  _listInitialized: boolean = false; // Initialize to false

  constructor(options: ListOptions = {}) {
    options.ignoreKeys = true;
    // Possibly put this here: this.items = [];
    // Note: Don't set scrollable: true here since List extends ScrollableBox

    super(options);

    this.value = '';
    this.items = [];
    this.ritems = [];
    this.selected = 0;
    this._isList = true;

    if (!this.style.selected) {
      this.style.selected = {};
      this.style.selected.bg = options.selectedBg;
      this.style.selected.fg = options.selectedFg;
      this.style.selected.bold = options.selectedBold;
      this.style.selected.underline = options.selectedUnderline;
      this.style.selected.blink = options.selectedBlink;
      this.style.selected.inverse = options.selectedInverse;
      this.style.selected.invisible = options.selectedInvisible;
    }

    if (!this.style.item) {
      this.style.item = {};
      this.style.item.bg = options.itemBg;
      this.style.item.fg = options.itemFg;
      this.style.item.bold = options.itemBold;
      this.style.item.underline = options.itemUnderline;
      this.style.item.blink = options.itemBlink;
      this.style.item.inverse = options.itemInverse;
      this.style.item.invisible = options.itemInvisible;
    }

    // Legacy: for apps written before the addition of item attributes.
    // Copy base style properties to item style if not already set
    type StyleKey =
      | 'bg'
      | 'fg'
      | 'bold'
      | 'underline'
      | 'blink'
      | 'inverse'
      | 'invisible';
    (
      [
        'bg',
        'fg',
        'bold',
        'underline',
        'blink',
        'inverse',
        'invisible',
      ] as const
    ).forEach((name: StyleKey) => {
      const styleValue = this.style[name];
      const itemValue = this.style.item?.[name];
      if (styleValue != null && itemValue == null && this.style.item) {
        (this.style.item as any)[name] = styleValue;
      }
    });

    if (options.itemHoverBg) {
      options.itemHoverEffects = { bg: options.itemHoverBg };
    }

    if (options.itemHoverEffects) {
      this.style.item.hover = options.itemHoverEffects;
    }

    if (options.itemFocusEffects) {
      this.style.item.focus = options.itemFocusEffects;
    }

    this.interactive = options.interactive !== false;

    this.mouse = options.mouse || false;

    if (options.items) {
      this.ritems = options.items;
      options.items.forEach(this.add.bind(this));
    }

    this.select(0);

    if (options.mouse) {
      this.screen._listenMouse(this);
      this.on('element wheeldown', () => {
        this.select(this.selected + 2);
        this.screen.render();
      });
      this.on('element wheelup', () => {
        this.select(this.selected - 2);
        this.screen.render();
      });
    }

    if (options.keys) {
      this.on('keypress', (_ch: any, key: KeyEvent) => {
        if (key.name === 'up' || (options.vi && key.name === 'k')) {
          this.up();
          this.screen.render();
          return;
        }
        if (key.name === 'down' || (options.vi && key.name === 'j')) {
          this.down();
          this.screen.render();
          return;
        }
        if (
          key.name === 'enter' ||
          (options.vi && key.name === 'l' && !key.shift)
        ) {
          this.enterSelected();
          return;
        }
        if (key.name === 'escape' || (options.vi && key.name === 'q')) {
          this.cancelSelected();
          return;
        }
        if (options.vi && key.name === 'u' && key.ctrl) {
          this.move(-((this.height - this.iheight) / 2) | 0);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'd' && key.ctrl) {
          this.move(((this.height - this.iheight) / 2) | 0);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'b' && key.ctrl) {
          this.move(-(this.height - this.iheight));
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'f' && key.ctrl) {
          this.move(this.height - this.iheight);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'h' && key.shift) {
          this.move((this.childBase || 0) - this.selected);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'm' && key.shift) {
          // TODO: Maybe use Math.min(this.items.length,
          // ... for calculating visible items elsewhere.
          const visible =
            (Math.min(this.height - this.iheight, this.items.length) / 2) | 0;
          this.move((this.childBase || 0) + visible - this.selected);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'l' && key.shift) {
          // XXX This goes one too far on lists with an odd number of items.
          this.down(
            (this.childBase || 0) +
              Math.min(this.height - this.iheight, this.items.length) -
              this.selected
          );
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'g' && !key.shift) {
          this.select(0);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'g' && key.shift) {
          this.select(this.items.length - 1);
          this.screen.render();
          return;
        }

        if (options.vi && (key.ch === '/' || key.ch === '?')) {
          if (typeof options.search !== 'function') {
            return;
          }
          return options.search((err: any, value: any) => {
            if (
              typeof err === 'string' ||
              typeof err === 'function' ||
              typeof err === 'number' ||
              (err && err.test)
            ) {
              value = err;
              err = null;
            }
            if (err || !value) return this.screen.render();
            this.select(this.fuzzyFind(value, key.ch === '?'));
            this.screen.render();
          });
        }
      });
    }

    this.on('resize', () => {
      const visible = this.height - this.iheight;
      // if (this.selected < visible - 1) {
      if (visible >= this.selected + 1) {
        this.childBase = 0;
        this.childOffset = this.selected;
      } else {
        // Is this supposed to be: this.childBase = visible - this.selected + 1; ?
        this.childBase = this.selected - visible + 1;
        this.childOffset = visible - 1;
      }
    });

    this.on('adopt', (el: any) => {
      if (!~this.items.indexOf(el)) {
        el.fixed = true;
      }
    });

    // Ensure children are removed from the
    // item list if they are items.
    this.on('remove', (el: any) => {
      this.removeItem(el);
    });
  }

  createItem(content: any): any {
    // Note: Could potentially use Button here.
    const options: any = {
      screen: this.screen,
      content: content,
      align: this.align || 'left',
      top: 0,
      left: 0,
      right: this.scrollbar ? 1 : 0,
      tags: this.parseTags,
      height: 1,
      hoverEffects: this.mouse ? this.style.item.hover : null,
      focusEffects: this.mouse ? this.style.item.focus : null,
      autoFocus: false,
    };

    if (!this.screen.autoPadding) {
      options.top = 1;
      options.left = this.ileft;
      options.right = this.iright + (this.scrollbar ? 1 : 0);
    }

    // if (this.shrink) {
    // XXX NOTE: Maybe just do this on all shrinkage once autoPadding is default?
    if (this.shrink && options.normalShrink) {
      delete options.right;
      options.width = 'shrink';
    }

    ['bg', 'fg', 'bold', 'underline', 'blink', 'inverse', 'invisible'].forEach(
      name => {
        options[name] = () => {
          let attr =
            this.items[this.selected] === item && this.interactive
              ? this.style.selected[name]
              : this.style.item[name];
          if (typeof attr === 'function') attr = attr(item);
          return attr;
        };
      }
    );

    if (this.style.transparent) {
      options.transparent = true;
    }

    const item = new Box(options);

    if (this.mouse) {
      item.on('click', () => {
        this.focus();
        if (this.items[this.selected] === item) {
          this.emit('action', item, this.selected);
          this.emit('select', item, this.selected);
          return;
        }
        this.select(item);
        this.screen.render();
      });
    }

    this.emit('create item');

    return item;
  }

  /**
   * Add an item to the list based on a string. Appends the item to the end.
   * Alias for addItem.
   *
   * @param content - String content or element with getContent() method
   * @returns The created item element
   * @example
   * list.add('New Item');
   */
  add(content: any): any {
    return this.addItem(content);
  }

  /**
   * Add an item to the list based on a string. Appends the item to the end.
   * Alias for appendItem.
   *
   * @param content - String content or element with getContent() method
   * @returns The created item element
   * @example
   * list.addItem('Another Item');
   */
  addItem(content: any): any {
    return this.appendItem(content);
  }

  appendItem(content: any): any {
    content = typeof content === 'string' ? content : content.getContent();

    const item = this.createItem(content);
    item.position.top = this.items.length;
    if (!this.screen.autoPadding) {
      item.position.top = this.itop + this.items.length;
    }

    this.ritems.push(content);
    this.items.push(item);
    this.append(item);

    if (this.items.length === 1) {
      this.select(0);
    }

    this.emit('add item');

    return item;
  }

  /**
   * Remove an item from the list. Can remove by element, index, or string.
   *
   * @param child - Element, numeric index, or string to match
   * @returns The removed child element
   * @example
   * // Remove by index
   * list.removeItem(0);
   * // Remove by string content
   * list.removeItem('Item Text');
   * // Remove by element reference
   * list.removeItem(itemElement);
   */
  removeItem(child: any): any {
    let i = this.getItemIndex(child);
    if (~i && this.items[i]) {
      child = this.items.splice(i, 1)[0];
      this.ritems.splice(i, 1);
      this.remove(child);
      for (let j = i; j < this.items.length; j++) {
        this.items[j].position.top--;
      }
      if (i === this.selected) {
        this.select(i - 1);
      }
    }
    this.emit('remove item');
    return child;
  }

  /**
   * Insert an item at a specific position in the list.
   *
   * @param child - Index or element to insert after
   * @param content - String content or element with getContent() method
   * @example
   * // Insert at index 2
   * list.insertItem(2, 'New Item');
   */
  insertItem(child: any, content: any): void {
    content = typeof content === 'string' ? content : content.getContent();
    const i = this.getItemIndex(child);
    if (!~i) return;
    if (i >= this.items.length) return this.appendItem(content);
    const item = this.createItem(content);
    for (let j = i; j < this.items.length; j++) {
      this.items[j].position.top++;
    }
    item.position.top = i + (!this.screen.autoPadding ? 1 : 0);
    this.ritems.splice(i, 0, content);
    this.items.splice(i, 0, item);
    this.append(item);
    if (i === this.selected) {
      this.select(i + 1);
    }
    this.emit('insert item');
  }

  /**
   * Get an item element from the list.
   *
   * @param child - Index, string, or element reference
   * @returns The item element at the specified position
   * @example
   * const item = list.getItem(0);
   */
  getItem(child: any): any {
    return this.items[this.getItemIndex(child)];
  }

  /**
   * Set the content of an item at a specific position.
   *
   * @param child - Index, string, or element reference
   * @param content - String content or element with getContent() method
   * @example
   * list.setItem(0, 'Updated Content');
   */
  setItem(child: any, content: any): void {
    content = typeof content === 'string' ? content : content.getContent();
    const i = this.getItemIndex(child);
    if (!~i) return;
    this.items[i].setContent(content);
    this.ritems[i] = content;
  }

  /**
   * Clear all items from the list.
   *
   * @example
   * list.clearItems();
   */
  clearItems(): void {
    return this.setItems([]);
  }

  /**
   * Set the list items to multiple strings. Replaces all existing items.
   *
   * @param items - Array of string items to set
   * @example
   * list.setItems(['Item 1', 'Item 2', 'Item 3']);
   */
  setItems(items: any[]): void {
    const original = this.items.slice();
    const selected = this.selected;
    let sel = this.ritems[this.selected];
    let i = 0;

    items = items.slice();

    this.select(0);

    for (; i < items.length; i++) {
      if (this.items[i]) {
        this.items[i].setContent(items[i]);
      } else {
        this.add(items[i]);
      }
    }

    for (; i < original.length; i++) {
      this.remove(original[i]);
    }

    this.ritems = items;

    // Try to find our old item if it still exists.
    sel = items.indexOf(sel);
    if (~sel) {
      this.select(sel);
    } else if (items.length === original.length) {
      this.select(selected);
    } else {
      this.select(Math.min(selected, items.length - 1));
    }

    this.emit('set items');
  }

  /**
   * Push an item onto the end of the list (array-like operation).
   *
   * @param content - String content or element with getContent() method
   * @returns The new length of the items array
   * @example
   * list.pushItem('Last Item');
   */
  pushItem(content: any): number {
    this.appendItem(content);
    return this.items.length;
  }

  /**
   * Pop an item off the end of the list (array-like operation).
   *
   * @returns The removed item element
   * @example
   * const lastItem = list.popItem();
   */
  popItem(): any {
    return this.removeItem(this.items.length - 1);
  }

  /**
   * Unshift an item onto the beginning of the list (array-like operation).
   *
   * @param content - String content or element with getContent() method
   * @returns The new length of the items array
   * @example
   * list.unshiftItem('First Item');
   */
  unshiftItem(content: any): number {
    this.insertItem(0, content);
    return this.items.length;
  }

  /**
   * Shift an item off the beginning of the list (array-like operation).
   *
   * @returns The removed item element
   * @example
   * const firstItem = list.shiftItem();
   */
  shiftItem(): any {
    return this.removeItem(0);
  }

  /**
   * Remove and insert items at a specific position (array-like operation).
   *
   * @param child - Index or element to start at
   * @param n - Number of items to remove
   * @param items - Items to insert at the position
   * @returns Array of removed items
   * @example
   * // Remove 2 items at index 1 and insert 3 new items
   * list.spliceItem(1, 2, 'Item A', 'Item B', 'Item C');
   */
  spliceItem(child: any, n: number, ...items: any[]): any[] {
    let i = this.getItemIndex(child);
    if (!~i) return [];
    const removed: any[] = [];
    while (n--) {
      removed.push(this.removeItem(i));
    }
    items.forEach(item => {
      this.insertItem(i++, item);
    });
    return removed;
  }

  /**
   * Find an item in the list by text or regex pattern. Alias for fuzzyFind.
   *
   * @param search - String, number, or regex pattern to search for
   * @param back - Whether to search backwards from current selection
   * @returns Index of the found item, or current selection if not found
   * @example
   * const index = list.find('search term');
   */
  find(search: any, back?: boolean): number {
    return this.fuzzyFind(search, back);
  }

  /**
   * Find an item in the list by text or regex pattern.
   * Searches forward or backward from the current selection with wrapping.
   *
   * @param search - String, number, or regex pattern to search for
   * @param back - Whether to search backwards from current selection (Default: false)
   * @returns Index of the found item, or current selection if not found
   * @example
   * // Find forward
   * list.fuzzyFind('Item');
   * // Find backward
   * list.fuzzyFind('Item', true);
   * // Use regex
   * list.fuzzyFind(/^Item \d+$/);
   */
  fuzzyFind(search: any, back?: boolean): number {
    const start = this.selected + (back ? -1 : 1);
    let i: number;

    if (typeof search === 'number') search = search + '';

    if (search && search[0] === '/' && search[search.length - 1] === '/') {
      try {
        search = new RegExp(search.slice(1, -1));
      } catch (e) {}
    }

    const test =
      typeof search === 'string'
        ? (item: string) => !!~item.indexOf(search)
        : search.test
          ? search.test.bind(search)
          : search;

    if (typeof test !== 'function') {
      if (this.screen.options.debug) {
        throw new Error('fuzzyFind(): `test` is not a function.');
      }
      return this.selected;
    }

    if (!back) {
      for (i = start; i < this.ritems.length; i++) {
        if (test(helpers.cleanTags(this.ritems[i]))) return i;
      }
      for (i = 0; i < start; i++) {
        if (test(helpers.cleanTags(this.ritems[i]))) return i;
      }
    } else {
      for (i = start; i >= 0; i--) {
        if (test(helpers.cleanTags(this.ritems[i]))) return i;
      }
      for (i = this.ritems.length - 1; i > start; i--) {
        if (test(helpers.cleanTags(this.ritems[i]))) return i;
      }
    }

    return this.selected;
  }

  /**
   * Get the index of an item in the list.
   * Can resolve from number (passthrough), string (match content), or element reference.
   *
   * @param child - Number, string, or element reference
   * @returns The index of the item, or -1 if not found
   * @example
   * // By string
   * const index = list.getItemIndex('Item Text');
   * // By element
   * const index = list.getItemIndex(itemElement);
   * // By index (passthrough)
   * const index = list.getItemIndex(5);
   */
  getItemIndex(child: any): number {
    if (typeof child === 'number') {
      return child;
    } else if (typeof child === 'string') {
      let i = this.ritems.indexOf(child);
      if (~i) return i;
      for (i = 0; i < this.ritems.length; i++) {
        if (helpers.cleanTags(this.ritems[i]) === child) {
          return i;
        }
      }
      return -1;
    } else {
      return this.items.indexOf(child);
    }
  }

  /**
   * Select an item based on an index.
   * Also scrolls to the selected item to keep it visible.
   *
   * @param index - Index or element reference to select
   * @example
   * // Select by index
   * list.select(0);
   * // Select by element
   * list.select(itemElement);
   */
  select(index: any): void {
    if (!this.interactive) {
      return;
    }

    if (!this.items.length) {
      this.selected = 0;
      this.value = '';
      this.scrollTo?.(0);
      return;
    }

    if (typeof index === 'object') {
      index = this.items.indexOf(index);
    }

    if (index < 0) {
      index = 0;
    } else if (index >= this.items.length) {
      index = this.items.length - 1;
    }

    if (this.selected === index && this._listInitialized) return;
    this._listInitialized = true;

    this.selected = index;
    this.value = helpers.cleanTags(this.ritems[this.selected]);
    if (!this.parent) return;
    this.scrollTo?.(this.selected);

    // XXX Move `action` and `select` events here.
    this.emit('select item', this.items[this.selected], this.selected);
  }

  /**
   * Select an item based on an offset from the current selection.
   *
   * @param offset - Number of items to move (positive or negative)
   * @example
   * // Move down 3 items
   * list.move(3);
   * // Move up 2 items
   * list.move(-2);
   */
  move(offset: number): void {
    this.select(this.selected + offset);
  }

  /**
   * Select the item above the currently selected item.
   *
   * @param offset - Number of items to move up (Default: 1)
   * @example
   * list.up();
   * list.up(5); // Move up 5 items
   */
  up(offset?: number): void {
    this.move(-(offset || 1));
  }

  /**
   * Select the item below the currently selected item.
   *
   * @param offset - Number of items to move down (Default: 1)
   * @example
   * list.down();
   * list.down(3); // Move down 3 items
   */
  down(offset?: number): void {
    this.move(offset || 1);
  }

  /**
   * Show the list, focus it, select the first item, and wait for a selection.
   * Callback receives the selected item text.
   *
   * @param label - Optional label to set while picking (or callback if label omitted)
   * @param callback - Callback function to receive selected item
   * @example
   * list.pick('Select an option:', (err, value) => {
   *   console.log('Selected:', value);
   * });
   */
  pick(label: any, callback?: any): any {
    if (!callback) {
      callback = label;
      label = null;
    }

    if (!this.interactive) {
      return callback();
    }

    const focused = this.screen.focused;
    if (focused && focused._done) focused._done('stop');
    this.screen.saveFocus();

    // XXX Keep above:
    // var parent = this.parent;
    // this.detach();
    // parent.append(this);

    this.focus();
    this.show();
    this.select(0);
    if (label) this.setLabel(label);
    this.screen.render();
    this.once('action', (el: any, selected: number) => {
      if (label) this.removeLabel();
      this.screen.restoreFocus();
      this.hide();
      this.screen.render();
      if (!el) return callback();
      return callback(null, helpers.cleanTags(this.ritems[selected]));
    });
  }

  enterSelected(i?: number): void {
    if (i != null) this.select(i);
    this.emit('action', this.items[this.selected], this.selected);
    this.emit('select', this.items[this.selected], this.selected);
  }

  cancelSelected(i?: number): void {
    if (i != null) this.select(i);
    this.emit('action');
    this.emit('cancel');
  }
}

/**
 * Expose
 */

export default List;
export { List };
