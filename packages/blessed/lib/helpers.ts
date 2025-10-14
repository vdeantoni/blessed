/**
 * helpers.ts - helpers for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import fs from 'fs';
import unicode from './unicode.js';

/**
 * Helpers
 */

const helpers: any = {};

helpers.merge = (a: any, b: any): any => {
  Object.keys(b).forEach((key) => {
    a[key] = b[key];
  });
  return a;
};

helpers.asort = (obj: any[]): any[] => {
  return obj.sort((a: any, b: any) => {
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();

    if (a[0] === '.' && b[0] === '.') {
      a = a[1];
      b = b[1];
    } else {
      a = a[0];
      b = b[0];
    }

    return a > b ? 1 : (a < b ? -1 : 0);
  });
};

helpers.hsort = (obj: any[]): any[] => {
  return obj.sort((a: any, b: any) => {
    return b.index - a.index;
  });
};

helpers.findFile = (start: string, target: string): string | null => {
  return (function read(dir: string): string | null {
    let files: string[], file: string, stat: fs.Stats | null, out: string | null;

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
};

// Escape text for tag-enabled elements.
helpers.escape = (text: string): string => {
  return text.replace(/[{}]/g, (ch) => {
    return ch === '{' ? '{open}' : '{close}';
  });
};

helpers.parseTags = (text: string, screen?: any): any => {
  return helpers.Element.prototype._parseTags.call(
    { parseTags: true, screen: screen || helpers.Screen.global }, text);
};

helpers.generateTags = (style: any, text?: string): any => {
  let open = '';
  let close = '';

  Object.keys(style || {}).forEach((key) => {
    let val = style[key];
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
};

helpers.attrToBinary = (style: any, element?: any): any => {
  return helpers.Element.prototype.sattr.call(element || {}, style);
};

helpers.stripTags = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/{(\/?)([\w\-,;!#]*)}/g, '')
    .replace(/\x1b\[[\d;]*m/g, '');
};

helpers.cleanTags = (text: string): string => {
  return helpers.stripTags(text).trim();
};

helpers.dropUnicode = (text: string): string => {
  if (!text) return '';
  return text
    .split('')
    .map((char: string, _i: number, _arr: string[]) => {
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
};

let _screen: any;
let _element: any;

Object.defineProperty(helpers, 'Screen', {
  get() {
    if (!_screen) {
      _screen = require('./widgets/screen');
    }
    return _screen;
  }
});

Object.defineProperty(helpers, 'Element', {
  get() {
    if (!_element) {
      _element = require('./widgets/element');
    }
    return _element;
  }
});

export default helpers;
