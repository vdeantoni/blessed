/**
 * helpers.js - helpers for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import fs from 'fs';
import unicode from './unicode.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/**
 * Helpers
 */

const helpers = {};

helpers.merge = (a, b) => {
  Object.keys(b).forEach((key) => {
    a[key] = b[key];
  });
  return a;
};

helpers.asort = (obj) => {
  return obj.sort((a, b) => {
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

helpers.hsort = (obj) => {
  return obj.sort((a, b) => {
    return b.index - a.index;
  });
};

helpers.findFile = (start, target) => {
  return (function read(dir) {
    let files, file, stat, out;

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
helpers.escape = (text) => {
  return text.replace(/[{}]/g, (ch) => {
    return ch === '{' ? '{open}' : '{close}';
  });
};

helpers.parseTags = (text, screen) => {
  return helpers.Element.prototype._parseTags.call(
    { parseTags: true, screen: screen || helpers.Screen.global }, text);
};

helpers.generateTags = (style, text) => {
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

helpers.attrToBinary = (style, element) => {
  return helpers.Element.prototype.sattr.call(element || {}, style);
};

helpers.stripTags = (text) => {
  if (!text) return '';
  return text
    .replace(/{(\/?)([\w\-,;!#]*)}/g, '')
    .replace(/\x1b\[[\d;]*m/g, '');
};

helpers.cleanTags = (text) => {
  return helpers.stripTags(text).trim();
};

helpers.dropUnicode = (text) => {
  if (!text) return '';
  return text
    .split('')
    .map((char, i, arr) => {
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

Object.defineProperty(helpers, 'Screen', {
  get() {
    if (!helpers._screen) {
      helpers._screen = require('./widgets/screen');
    }
    return helpers._screen;
  }
});

Object.defineProperty(helpers, 'Element', {
  get() {
    if (!helpers._element) {
      helpers._element = require('./widgets/element');
    }
    return helpers._element;
  }
});

export default helpers;
