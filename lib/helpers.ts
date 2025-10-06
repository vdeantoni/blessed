/**
 * helpers.ts - helpers for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import * as fs from 'fs';
import unicode from './unicode.js';

/**
 * Types
 */

interface SortableItem {
  name: string;
}

interface IndexedItem {
  index: number;
}

interface StyleTags {
  [key: string]: string | boolean;
}

interface TagResult {
  open: string;
  close: string;
}

/**
 * Helpers object type with lazy-loaded properties
 * Note: Screen and Element getters are added by the CommonJS shim (helpers.js)
 * to avoid circular dependencies
 */
interface HelpersType {
  merge<T extends object>(a: T, b: Partial<T>): T;
  asort<T extends SortableItem>(obj: T[]): T[];
  hsort<T extends IndexedItem>(obj: T[]): T[];
  findFile(start: string, target: string): string | null;
  escape(text: string): string;
  parseTags(text: string, screen?: any): string;
  generateTags(style: StyleTags | null | undefined, text?: string): string | TagResult;
  attrToBinary(style: any, element?: any): number;
  stripTags(text: string | null | undefined): string;
  cleanTags(text: string): string;
  dropUnicode(text: string | null | undefined): string;

  // Lazy-loaded properties (added by CommonJS shim)
  Screen: any;
  Element: any;
  _screen: any;
  _element: any;
}

/**
 * Helpers
 */

const helpers: HelpersType = {
  /**
   * Merge object b into object a
   */
  merge<T extends object>(a: T, b: Partial<T>): T {
    Object.keys(b).forEach((key) => {
      (a as any)[key] = (b as any)[key];
    });
    return a;
  },

  /**
   * Sort array by name property (alphabetically)
   */
  asort<T extends SortableItem>(obj: T[]): T[] {
    return obj.sort((a, b) => {
      let aName = a.name.toLowerCase();
      let bName = b.name.toLowerCase();

      if (aName[0] === '.' && bName[0] === '.') {
        aName = aName[1];
        bName = bName[1];
      } else {
        aName = aName[0];
        bName = bName[0];
      }

      return aName > bName ? 1 : (aName < bName ? -1 : 0);
    });
  },

  /**
   * Sort array by index property (highest first)
   */
  hsort<T extends IndexedItem>(obj: T[]): T[] {
    return obj.sort((a, b) => {
      return b.index - a.index;
    });
  },

  /**
   * Recursively find a file by name starting from a directory
   */
  findFile(start: string, target: string): string | null {
    function read(dir: string): string | null {
      if (dir === '/dev' || dir === '/sys' || dir === '/proc' || dir === '/net') {
        return null;
      }

      let files: string[];
      try {
        files = fs.readdirSync(dir);
      } catch (e) {
        files = [];
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file === target) {
          return (dir === '/' ? '' : dir) + '/' + file;
        }

        let stat: fs.Stats | null;
        try {
          stat = fs.lstatSync((dir === '/' ? '' : dir) + '/' + file);
        } catch (e) {
          stat = null;
        }

        if (stat && stat.isDirectory() && !stat.isSymbolicLink()) {
          const out = read((dir === '/' ? '' : dir) + '/' + file);
          if (out) return out;
        }
      }

      return null;
    }

    return read(start);
  },

  /**
   * Escape text for tag-enabled elements
   */
  escape(text: string): string {
    return text.replace(/[{}]/g, (ch) => {
      return ch === '{' ? '{open}' : '{close}';
    });
  },

  /**
   * Parse blessed tags in text
   */
  parseTags(text: string, screen?: any): string {
    return helpers.Element.prototype._parseTags.call(
      { parseTags: true, screen: screen || helpers.Screen.global },
      text
    );
  },

  /**
   * Generate opening and closing tags from a style object
   */
  generateTags(style: StyleTags | null | undefined, text?: string): string | TagResult {
    let open = '';
    let close = '';

    Object.keys(style || {}).forEach((key) => {
      let val = (style as StyleTags)[key];
      if (typeof val === 'string') {
        val = val.replace(/^light(?!-)/, 'light-');
        val = val.replace(/^bright(?!-)/, 'bright-');
        open = '{' + val + '-' + key + '}' + open;
        close += '{/' + val + '-' + key + '}';
      } else {
        if (val === true) {
          open = '{' + key + '}' + open;
          close += '{/' + key + '}';
        }
      }
    });

    if (text != null) {
      return open + text + close;
    }

    return {
      open: open,
      close: close
    };
  },

  /**
   * Convert style object to binary attribute
   */
  attrToBinary(style: any, element?: any): number {
    return helpers.Element.prototype.sattr.call(element || {}, style);
  },

  /**
   * Strip blessed tags from text
   */
  stripTags(text: string | null | undefined): string {
    if (!text) return '';
    return text
      .replace(/{(\/?)([\w\-,;!#]*)}/g, '')
      .replace(/\x1b\[[\d;]*m/g, '');
  },

  /**
   * Strip tags and trim whitespace
   */
  cleanTags(text: string): string {
    return helpers.stripTags(text).trim();
  },

  /**
   * Replace unicode characters with ??
   */
  dropUnicode(text: string | null | undefined): string {
    if (!text) return '';
    return text
      .replace(unicode.chars.all, '??')
      .replace(unicode.chars.combining, '')
      .replace(unicode.chars.surrogate, '?');
  },

  // Lazy-loaded widget classes (added by CommonJS shim to avoid circular dependencies)
  // These are defined in helpers.js and populated at runtime
  Screen: undefined as any,
  Element: undefined as any,
  _screen: null as any,
  _element: null as any
};

/**
 * Exports
 */

export default helpers;
export { helpers };