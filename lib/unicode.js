/**
 * unicode.js - east asian width and surrogate pairs
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 *
 * Now uses string-width for accurate unicode width calculation.
 * Preserves original API for backward compatibility.
 */

// Import string-width for modern unicode width calculation
var stringWidth = require('string-width').default || require('string-width');

var stringFromCharCode = String.fromCharCode;
var floor = Math.floor;

/**
 * Wide, Surrogates, and Combining
 */

exports.charWidth = function(str, i) {
  // If given a number (code point), convert to character
  if (typeof str === 'number') {
    str = exports.fromCodePoint(str);
    i = 0;
  }

  i = i || 0;

  // Get the character at position i
  var char = str.charAt(i);
  if (!char) return 0;

  // Handle surrogate pairs - if this is a high surrogate, include the low surrogate
  if (exports.isSurrogate(str, i)) {
    char = str.substr(i, 2);
  }

  // Special case: tab width depends on screen settings
  var point = exports.codePointAt(str, i);
  if (point === 0x09) {
    if (!exports.blessed) {
      exports.blessed = require('../');
    }
    return exports.blessed.screen.global
      ? exports.blessed.screen.global.tabc.length
      : 8;
  }

  // Use string-width for accurate width calculation
  return stringWidth(char);
};

exports.strWidth = function(str) {
  // Handle tabs specially since string-width doesn't know about our tab settings
  var hasTab = str.indexOf('\t') !== -1;
  if (!hasTab) {
    return stringWidth(str);
  }

  // Calculate width accounting for tabs
  var width = 0;
  for (var i = 0; i < str.length; i++) {
    width += exports.charWidth(str, i);
    if (exports.isSurrogate(str, i)) i++;
  }
  return width;
};

/**
 * Add padding characters after wide (double-width) characters.
 * Used in fullUnicode mode to prevent wide chars from eating the next character.
 * Only adds padding after characters that have width === 2.
 */
exports.padWideChars = function(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    result += str[i];
    if (exports.charWidth(str, i) === 2) {
      result += '\x03'; // padding char
    }
    if (exports.isSurrogate(str, i)) {
      i++; // skip low surrogate
      if (i < str.length) {
        result += str[i];
      }
    }
  }
  return result;
};

/**
 * Replace wide (double-width) characters with '??'.
 * Used in non-fullUnicode mode for terminals that don't support wide chars.
 * Only replaces characters that have width === 2.
 */
exports.replaceWideChars = function(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    if (exports.charWidth(str, i) === 2) {
      result += '??';
      if (exports.isSurrogate(str, i)) {
        i++; // skip low surrogate
      }
    } else {
      result += str[i];
    }
  }
  return result;
};

exports.isSurrogate = function(str, i) {
  var point = typeof str !== 'number'
    ? exports.codePointAt(str, i || 0)
    : str;
  return point > 0x00ffff;
};

exports.combiningTable = [
  [0x0300, 0x036F],   [0x0483, 0x0486],   [0x0488, 0x0489],
  [0x0591, 0x05BD],   [0x05BF, 0x05BF],   [0x05C1, 0x05C2],
  [0x05C4, 0x05C5],   [0x05C7, 0x05C7],   [0x0600, 0x0603],
  [0x0610, 0x0615],   [0x064B, 0x065E],   [0x0670, 0x0670],
  [0x06D6, 0x06E4],   [0x06E7, 0x06E8],   [0x06EA, 0x06ED],
  [0x070F, 0x070F],   [0x0711, 0x0711],   [0x0730, 0x074A],
  [0x07A6, 0x07B0],   [0x07EB, 0x07F3],   [0x0901, 0x0902],
  [0x093C, 0x093C],   [0x0941, 0x0948],   [0x094D, 0x094D],
  [0x0951, 0x0954],   [0x0962, 0x0963],   [0x0981, 0x0981],
  [0x09BC, 0x09BC],   [0x09C1, 0x09C4],   [0x09CD, 0x09CD],
  [0x09E2, 0x09E3],   [0x0A01, 0x0A02],   [0x0A3C, 0x0A3C],
  [0x0A41, 0x0A42],   [0x0A47, 0x0A48],   [0x0A4B, 0x0A4D],
  [0x0A70, 0x0A71],   [0x0A81, 0x0A82],   [0x0ABC, 0x0ABC],
  [0x0AC1, 0x0AC5],   [0x0AC7, 0x0AC8],   [0x0ACD, 0x0ACD],
  [0x0AE2, 0x0AE3],   [0x0B01, 0x0B01],   [0x0B3C, 0x0B3C],
  [0x0B3F, 0x0B3F],   [0x0B41, 0x0B43],   [0x0B4D, 0x0B4D],
  [0x0B56, 0x0B56],   [0x0B82, 0x0B82],   [0x0BC0, 0x0BC0],
  [0x0BCD, 0x0BCD],   [0x0C3E, 0x0C40],   [0x0C46, 0x0C48],
  [0x0C4A, 0x0C4D],   [0x0C55, 0x0C56],   [0x0CBC, 0x0CBC],
  [0x0CBF, 0x0CBF],   [0x0CC6, 0x0CC6],   [0x0CCC, 0x0CCD],
  [0x0CE2, 0x0CE3],   [0x0D41, 0x0D43],   [0x0D4D, 0x0D4D],
  [0x0DCA, 0x0DCA],   [0x0DD2, 0x0DD4],   [0x0DD6, 0x0DD6],
  [0x0E31, 0x0E31],   [0x0E34, 0x0E3A],   [0x0E47, 0x0E4E],
  [0x0EB1, 0x0EB1],   [0x0EB4, 0x0EB9],   [0x0EBB, 0x0EBC],
  [0x0EC8, 0x0ECD],   [0x0F18, 0x0F19],   [0x0F35, 0x0F35],
  [0x0F37, 0x0F37],   [0x0F39, 0x0F39],   [0x0F71, 0x0F7E],
  [0x0F80, 0x0F84],   [0x0F86, 0x0F87],   [0x0F90, 0x0F97],
  [0x0F99, 0x0FBC],   [0x0FC6, 0x0FC6],   [0x102D, 0x1030],
  [0x1032, 0x1032],   [0x1036, 0x1037],   [0x1039, 0x1039],
  [0x1058, 0x1059],   [0x1160, 0x11FF],   [0x135F, 0x135F],
  [0x1712, 0x1714],   [0x1732, 0x1734],   [0x1752, 0x1753],
  [0x1772, 0x1773],   [0x17B4, 0x17B5],   [0x17B7, 0x17BD],
  [0x17C6, 0x17C6],   [0x17C9, 0x17D3],   [0x17DD, 0x17DD],
  [0x180B, 0x180D],   [0x18A9, 0x18A9],   [0x1920, 0x1922],
  [0x1927, 0x1928],   [0x1932, 0x1932],   [0x1939, 0x193B],
  [0x1A17, 0x1A18],   [0x1B00, 0x1B03],   [0x1B34, 0x1B34],
  [0x1B36, 0x1B3A],   [0x1B3C, 0x1B3C],   [0x1B42, 0x1B42],
  [0x1B6B, 0x1B73],   [0x1DC0, 0x1DCA],   [0x1DFE, 0x1DFF],
  [0x200B, 0x200F],   [0x202A, 0x202E],   [0x2060, 0x2063],
  [0x206A, 0x206F],   [0x20D0, 0x20EF],   [0x302A, 0x302F],
  [0x3099, 0x309A],   [0xA806, 0xA806],   [0xA80B, 0xA80B],
  [0xA825, 0xA826],   [0xFB1E, 0xFB1E],   [0xFE00, 0xFE0F],
  [0xFE20, 0xFE23],   [0xFEFF, 0xFEFF],   [0xFFF9, 0xFFFB],
  [0x10A01, 0x10A03], [0x10A05, 0x10A06], [0x10A0C, 0x10A0F],
  [0x10A38, 0x10A3A], [0x10A3F, 0x10A3F], [0x1D167, 0x1D169],
  [0x1D173, 0x1D182], [0x1D185, 0x1D18B], [0x1D1AA, 0x1D1AD],
  [0x1D242, 0x1D244], [0xE0001, 0xE0001], [0xE0020, 0xE007F],
  [0xE0100, 0xE01EF]
];

exports.combining = exports.combiningTable.reduce(function(out, row) {
  for (var i = row[0]; i <= row[1]; i++) {
    out[i] = true;
  }
  return out;
}, {});

exports.isCombining = function(str, i) {
  var point = typeof str !== 'number'
    ? exports.codePointAt(str, i || 0)
    : str;
  return exports.combining[point] === true;
};

/**
 * Code Point Helpers
 */

exports.codePointAt = function(str, position) {
  if (str == null) {
    throw TypeError();
  }
  var string = String(str);
  if (string.codePointAt) {
    return string.codePointAt(position);
  }
  var size = string.length;
  // `ToInteger`
  var index = position ? Number(position) : 0;
  if (index !== index) { // better `isNaN`
    index = 0;
  }
  // Account for out-of-bounds indices:
  if (index < 0 || index >= size) {
    return undefined;
  }
  // Get the first code unit
  var first = string.charCodeAt(index);
  var second;
  if ( // check if it's the start of a surrogate pair
    first >= 0xD800 && first <= 0xDBFF && // high surrogate
    size > index + 1 // there is a next code unit
  ) {
    second = string.charCodeAt(index + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }
  return first;
};

exports.fromCodePoint = function() {
  if (String.fromCodePoint) {
    return String.fromCodePoint.apply(String, arguments);
  }
  var MAX_SIZE = 0x4000;
  var codeUnits = [];
  var highSurrogate;
  var lowSurrogate;
  var index = -1;
  var length = arguments.length;
  if (!length) {
    return '';
  }
  var result = '';
  while (++index < length) {
    var codePoint = Number(arguments[index]);
    if (
      !isFinite(codePoint) ||       // `NaN`, `+Infinity`, or `-Infinity`
      codePoint < 0 ||              // not a valid Unicode code point
      codePoint > 0x10FFFF ||       // not a valid Unicode code point
      floor(codePoint) !== codePoint // not an integer
    ) {
      throw RangeError('Invalid code point: ' + codePoint);
    }
    if (codePoint <= 0xFFFF) { // BMP code point
      codeUnits.push(codePoint);
    } else { // Astral code point; split in surrogate halves
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      codePoint -= 0x10000;
      highSurrogate = (codePoint >> 10) + 0xD800;
      lowSurrogate = (codePoint % 0x400) + 0xDC00;
      codeUnits.push(highSurrogate, lowSurrogate);
    }
    if (index + 1 === length || codeUnits.length > MAX_SIZE) {
      result += stringFromCharCode.apply(null, codeUnits);
      codeUnits.length = 0;
    }
  }
  return result;
};

/**
 * Regexes
 */

exports.chars = {};

// Double width characters that are _not_ surrogate pairs.
// Note: These regexes are kept for backward compatibility but width
// calculation now uses string-width for better accuracy.
exports.chars.wide = new RegExp('(['
  + '\\u1100-\\u115f' // Hangul Jamo init. consonants
  + '\\u2329\\u232a'
  + '\\u2600-\\u26ff' // Miscellaneous Symbols
  + '\\u2700-\\u27bf' // Dingbats
  + '\\u2e80-\\u303e\\u3040-\\ua4cf' // CJK ... Yi
  + '\\uac00-\\ud7a3' // Hangul Syllables
  + '\\uf900-\\ufaff' // CJK Compatibility Ideographs
  + '\\ufe10-\\ufe19' // Vertical forms
  + '\\ufe30-\\ufe6f' // CJK Compatibility Forms
  + '\\uff00-\\uff60' // Fullwidth Forms
  + '\\uffe0-\\uffe6'
  + '])', 'g');

// All surrogate pair wide chars.
exports.chars.swide = new RegExp('('
  // Emoji ranges (surrogate pairs):
  // 0x1F000 - 0x1F02F (Mahjong Tiles)
  + '\\ud83c[\\udc00-\\udc2f]'
  + '|'
  // 0x1F0A0 - 0x1F0FF (Playing Cards)
  + '\\ud83c[\\udca0-\\udcff]'
  + '|'
  // 0x1F100 - 0x1F64F (Enclosed characters, Emoticons)
  + '\\ud83c[\\udd00-\\uddff]'
  + '|'
  + '\\ud83d[\\udc00-\\ude4f]'
  + '|'
  // 0x1F680 - 0x1F6FF (Transport and Map Symbols)
  + '\\ud83d[\\ude80-\\udeff]'
  + '|'
  // 0x1F700 - 0x1F9FF (Various emoji blocks)
  + '\\ud83d[\\udf00-\\udfff]'
  + '|'
  + '\\ud83e[\\udc00-\\uddff]'
  + '|'
  // 0x1FA00 - 0x1FAFF (Chess, Extended Pictographs)
  + '\\ud83e[\\udd00-\\uddff]'
  + '|'
  // 0x20000 - 0x2fffd:
  + '[\\ud840-\\ud87f][\\udc00-\\udffd]'
  + '|'
  // 0x30000 - 0x3fffd:
  + '[\\ud880-\\ud8bf][\\udc00-\\udffd]'
  + ')', 'g');

// All wide chars including surrogate pairs.
exports.chars.all = new RegExp('('
  + exports.chars.swide.source.slice(1, -1)
  + '|'
  + exports.chars.wide.source.slice(1, -1)
  + ')', 'g');

// Regex to detect a surrogate pair.
exports.chars.surrogate = /[\ud800-\udbff][\udc00-\udfff]/g;

// Regex to find combining characters.
exports.chars.combining = exports.combiningTable.reduce(function(out, row) {
  var low, high, range;
  if (row[0] > 0x00ffff) {
    low = exports.fromCodePoint(row[0]);
    low = [
      hexify(low.charCodeAt(0)),
      hexify(low.charCodeAt(1))
    ];
    high = exports.fromCodePoint(row[1]);
    high = [
      hexify(high.charCodeAt(0)),
      hexify(high.charCodeAt(1))
    ];
    range = '[\\u' + low[0] + '-' + '\\u' + high[0] + ']'
          + '[\\u' + low[1] + '-' + '\\u' + high[1] + ']';
    if (!~out.indexOf('|')) out += ']';
    out += '|' + range;
  } else {
    low = hexify(row[0]);
    high = hexify(row[1]);
    low = '\\u' + low;
    high = '\\u' + high;
    out += low + '-' + high;
  }
  return out;
}, '[');

exports.chars.combining = new RegExp(exports.chars.combining, 'g');

function hexify(n) {
  n = n.toString(16);
  while (n.length < 4) n = '0' + n;
  return n;
}