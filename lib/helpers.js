"use strict";
/**
 * helpers.ts - helpers for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */
/**
 * Modules
 */
const fs = require("fs");
const unicode_js_1 = require("./unicode.js");
/**
 * Helpers
 */
const helpers = {
    /**
     * Merge object b into object a
     */
    merge(a, b) {
        Object.keys(b).forEach((key) => {
            a[key] = b[key];
        });
        return a;
    },
    /**
     * Sort array by name property (alphabetically)
     */
    asort(obj) {
        return obj.sort((a, b) => {
            let aName = a.name.toLowerCase();
            let bName = b.name.toLowerCase();
            if (aName[0] === '.' && bName[0] === '.') {
                aName = aName[1];
                bName = bName[1];
            }
            else {
                aName = aName[0];
                bName = bName[0];
            }
            return aName > bName ? 1 : (aName < bName ? -1 : 0);
        });
    },
    /**
     * Sort array by index property (highest first)
     */
    hsort(obj) {
        return obj.sort((a, b) => {
            return b.index - a.index;
        });
    },
    /**
     * Recursively find a file by name starting from a directory
     */
    findFile(start, target) {
        function read(dir) {
            if (dir === '/dev' || dir === '/sys' || dir === '/proc' || dir === '/net') {
                return null;
            }
            let files;
            try {
                files = fs.readdirSync(dir);
            }
            catch (e) {
                files = [];
            }
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file === target) {
                    return (dir === '/' ? '' : dir) + '/' + file;
                }
                let stat;
                try {
                    stat = fs.lstatSync((dir === '/' ? '' : dir) + '/' + file);
                }
                catch (e) {
                    stat = null;
                }
                if (stat && stat.isDirectory() && !stat.isSymbolicLink()) {
                    const out = read((dir === '/' ? '' : dir) + '/' + file);
                    if (out)
                        return out;
                }
            }
            return null;
        }
        return read(start);
    },
    /**
     * Escape text for tag-enabled elements
     */
    escape(text) {
        return text.replace(/[{}]/g, (ch) => {
            return ch === '{' ? '{open}' : '{close}';
        });
    },
    /**
     * Parse blessed tags in text
     */
    parseTags(text, screen) {
        return helpers.Element.prototype._parseTags.call({ parseTags: true, screen: screen || helpers.Screen.global }, text);
    },
    /**
     * Generate opening and closing tags from a style object
     */
    generateTags(style, text) {
        let open = '';
        let close = '';
        Object.keys(style || {}).forEach((key) => {
            let val = style[key];
            if (typeof val === 'string') {
                val = val.replace(/^light(?!-)/, 'light-');
                val = val.replace(/^bright(?!-)/, 'bright-');
                open = '{' + val + '-' + key + '}' + open;
                close += '{/' + val + '-' + key + '}';
            }
            else {
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
    attrToBinary(style, element) {
        return helpers.Element.prototype.sattr.call(element || {}, style);
    },
    /**
     * Strip blessed tags from text
     */
    stripTags(text) {
        if (!text)
            return '';
        return text
            .replace(/{(\/?)([\w\-,;!#]*)}/g, '')
            .replace(/\x1b\[[\d;]*m/g, '');
    },
    /**
     * Strip tags and trim whitespace
     */
    cleanTags(text) {
        return helpers.stripTags(text).trim();
    },
    /**
     * Replace unicode characters with ??
     */
    dropUnicode(text) {
        if (!text)
            return '';
        return text
            .replace(unicode_js_1.default.chars.all, '??')
            .replace(unicode_js_1.default.chars.combining, '')
            .replace(unicode_js_1.default.chars.surrogate, '?');
    },
    // Lazy-loaded widget classes (added by CommonJS shim to avoid circular dependencies)
    // These are defined in helpers.js and populated at runtime
    Screen: undefined,
    Element: undefined,
    _screen: null,
    _element: null
};

/**
 * Exports
 */
module.exports = helpers;
