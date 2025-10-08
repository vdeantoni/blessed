/**
 * helpers.ts - helpers for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const fs: any = require('fs');
const unicode: any = require('./unicode');

/**
 * Helpers
 */

const helpers = {
  merge(a: any, b: any): any {
    Object.keys(b).forEach(function(key) {
      a[key] = b[key];
    });
    return a;
  },

  asort(obj: any[]): any[] {
    return obj.sort(function(a, b) {
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

  hsort(obj: any[]): any[] {
    return obj.sort(function(a, b) {
      return b.index - a.index;
    });
  },

  findFile(start: string, target: string): string | null {
    return (function read(dir: string): string | null {
      let files: string[];
      let file: string;
      let stat: any;
      let out: string | null;

      if (dir === '/dev' || dir === '/sys'
          || dir === '/proc' || dir === '/net') {
        return null;
      }

      try {
        files = fs.readdirSync(dir);
      } catch (e) {
        files = [];
      }

      for (let i = 0; i < files.length; i++) {
        file = files[i];

        if (file === target) {
          return (dir === '/' ? '' : dir) + '/' + file;
        }

        try {
          stat = fs.lstatSync((dir === '/' ? '' : dir) + '/' + file);
        } catch (e) {
          stat = null;
        }

        if (stat && stat.isDirectory() && !stat.isSymbolicLink()) {
          out = read((dir === '/' ? '' : dir) + '/' + file);
          if (out) return out;
        }
      }

      return null;
    })(start);
  },

  // Escape text for tag-enabled elements.
  escape(text: string): string {
    return text.replace(/[{}]/g, function(ch) {
      return ch === '{' ? '{open}' : '{close}';
    });
  },

  parseTags(text: string, screen?: any): any {
    return helpers.Element.prototype._parseTags.call(
      { parseTags: true, screen: screen || helpers.Screen.global }, text);
  },

  generateTags(style: any, text?: string): any {
    let open = '';
    let close = '';

    Object.keys(style || {}).forEach(function(key) {
      const val = style[key];
      if (typeof val === 'string') {
        let valStr = val.replace(/^light(?!-)/, 'light-');
        valStr = valStr.replace(/^bright(?!-)/, 'bright-');
        open = '{' + valStr + '-' + key + '}' + open;
        close += '{/' + valStr + '-' + key + '}';
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

  attrToBinary(style: any, element?: any): any {
    return helpers.Element.prototype.sattr.call(element || {}, style);
  },

  stripTags(text: string): string {
    if (!text) return '';
    return text
      .replace(/{(\/?)([\w\-,;!#]*)}/g, '')
      .replace(/\x1b\[[\d;]*m/g, '');
  },

  cleanTags(text: string): string {
    return helpers.stripTags(text).trim();
  },

  dropUnicode(text: string): string {
    if (!text) return '';
    return text
      .split('')
      .map((char: string, i: number, arr: string[]) => {
        // Use unicode.replaceWideChars logic inline for better performance with chaining
        const width = unicode.charWidth(char, 0);
        if (width === 2) {
          return '??';
        }
        return char;
      })
      .join('')
      .replace(unicode.chars.combining, '')
      .replace(unicode.chars.surrogate, '?');
  },

  // Lazy-loaded properties
  _screen: null as any,
  _element: null as any,

  get Screen(): any {
    if (!helpers._screen) {
      helpers._screen = require('./widgets/screen');
    }
    return helpers._screen;
  },

  get Element(): any {
    if (!helpers._element) {
      helpers._element = require('./widgets/element');
    }
    return helpers._element;
  }
};

// Use standard CommonJS export for compatibility
module.exports = helpers;