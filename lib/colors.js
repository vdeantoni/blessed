"use strict";
/**
 * colors.ts - color-related functions for blessed.
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */
/**
 * Color matching and conversion functions
 */
const colors = {};
colors.match = function (r1, g1, b1) {
    if (typeof r1 === 'string') {
        const hex = r1;
        if (hex[0] !== '#') {
            return -1;
        }
        const rgb = colors.hexToRGB(hex);
        r1 = rgb[0];
        g1 = rgb[1];
        b1 = rgb[2];
    }
    else if (Array.isArray(r1)) {
        b1 = r1[2];
        g1 = r1[1];
        r1 = r1[0];
    }
    const hash = (r1 << 16) | (g1 << 8) | b1;
    if (colors._cache[hash] != null) {
        return colors._cache[hash];
    }
    let ldiff = Infinity;
    let li = -1;
    for (let i = 0; i < colors.vcolors.length; i++) {
        const c = colors.vcolors[i];
        const r2 = c[0];
        const g2 = c[1];
        const b2 = c[2];
        const diff = colorDistance(r1, g1, b1, r2, g2, b2);
        if (diff === 0) {
            li = i;
            break;
        }
        if (diff < ldiff) {
            ldiff = diff;
            li = i;
        }
    }
    return colors._cache[hash] = li;
};
colors.RGBToHex = function (r, g, b) {
    if (Array.isArray(r)) {
        b = r[2];
        g = r[1];
        r = r[0];
    }
    function hex(n) {
        let s = n.toString(16);
        if (s.length < 2)
            s = '0' + s;
        return s;
    }
    return '#' + hex(r) + hex(g) + hex(b);
};
colors.hexToRGB = function (hex) {
    let h = hex;
    if (h.length === 4) {
        h = h[0]
            + h[1] + h[1]
            + h[2] + h[2]
            + h[3] + h[3];
    }
    const col = parseInt(h.substring(1), 16);
    const r = (col >> 16) & 0xff;
    const g = (col >> 8) & 0xff;
    const b = col & 0xff;
    return [r, g, b];
};
// As it happens, comparing how similar two colors are is really hard. Here is
// one of the simplest solutions, which doesn't require conversion to another
// color space, posted on stackoverflow[1]. Maybe someone better at math can
// propose a superior solution.
// [1] http://stackoverflow.com/questions/1633828
function colorDistance(r1, g1, b1, r2, g2, b2) {
    return Math.pow(30 * (r1 - r2), 2)
        + Math.pow(59 * (g1 - g2), 2)
        + Math.pow(11 * (b1 - b2), 2);
}
// This might work well enough for a terminal's colors: treat RGB as XYZ in a
// 3-dimensional space and go midway between the two points.
colors.mixColors = function (c1, c2, alpha) {
    let color1 = c1;
    let color2 = c2;
    // if (c1 === 0x1ff) return c1;
    // if (c2 === 0x1ff) return c1;
    if (color1 === 0x1ff)
        color1 = 0;
    if (color2 === 0x1ff)
        color2 = 0;
    if (alpha == null)
        alpha = 0.5;
    const rgb1 = colors.vcolors[color1];
    let r1 = rgb1[0];
    let g1 = rgb1[1];
    let b1 = rgb1[2];
    const rgb2 = colors.vcolors[color2];
    const r2 = rgb2[0];
    const g2 = rgb2[1];
    const b2 = rgb2[2];
    r1 += (r2 - r1) * alpha | 0;
    g1 += (g2 - g1) * alpha | 0;
    b1 += (b2 - b1) * alpha | 0;
    return colors.match([r1, g1, b1]);
};
colors.blend = function blend(attr, attr2, alpha) {
    let name;
    let i;
    let c;
    let nc;
    let bg = attr & 0x1ff;
    if (attr2 != null) {
        let bg2 = attr2 & 0x1ff;
        if (bg === 0x1ff)
            bg = 0;
        if (bg2 === 0x1ff)
            bg2 = 0;
        bg = colors.mixColors(bg, bg2, alpha);
    }
    else {
        if (blend._cache[bg] != null) {
            bg = blend._cache[bg];
            // } else if (bg < 8) {
            //   bg += 8;
        }
        else if (bg >= 8 && bg <= 15) {
            bg -= 8;
        }
        else {
            name = colors.ncolors[bg];
            if (name) {
                for (i = 0; i < colors.ncolors.length; i++) {
                    if (name === colors.ncolors[i] && i !== bg) {
                        c = colors.vcolors[bg];
                        nc = colors.vcolors[i];
                        if (nc[0] + nc[1] + nc[2] < c[0] + c[1] + c[2]) {
                            blend._cache[bg] = i;
                            bg = i;
                            break;
                        }
                    }
                }
            }
        }
    }
    attr &= ~0x1ff;
    attr |= bg;
    let fg = (attr >> 9) & 0x1ff;
    if (attr2 != null) {
        let fg2 = (attr2 >> 9) & 0x1ff;
        // 0, 7, 188, 231, 251
        if (fg === 0x1ff) {
            // XXX workaround
            fg = 248;
        }
        else {
            if (fg === 0x1ff)
                fg = 7;
            if (fg2 === 0x1ff)
                fg2 = 7;
            fg = colors.mixColors(fg, fg2, alpha);
        }
    }
    else {
        if (blend._cache[fg] != null) {
            fg = blend._cache[fg];
            // } else if (fg < 8) {
            //   fg += 8;
        }
        else if (fg >= 8 && fg <= 15) {
            fg -= 8;
        }
        else {
            name = colors.ncolors[fg];
            if (name) {
                for (i = 0; i < colors.ncolors.length; i++) {
                    if (name === colors.ncolors[i] && i !== fg) {
                        c = colors.vcolors[fg];
                        nc = colors.vcolors[i];
                        if (nc[0] + nc[1] + nc[2] < c[0] + c[1] + c[2]) {
                            blend._cache[fg] = i;
                            fg = i;
                            break;
                        }
                    }
                }
            }
        }
    }
    attr &= ~(0x1ff << 9);
    attr |= fg << 9;
    return attr;
};
colors.blend._cache = {};
colors._cache = {};
colors.reduce = function (color, total) {
    let c = color;
    if (c >= 16 && total <= 16) {
        c = colors.ccolors[c];
    }
    else if (c >= 8 && total <= 8) {
        c -= 8;
    }
    else if (c >= 2 && total <= 2) {
        c %= 2;
    }
    return c;
};
// XTerm Colors
// These were actually tough to track down. The xterm source only uses color
// keywords. The X11 source needed to be examined to find the actual values.
// They then had to be mapped to rgb values and then converted to hex values.
colors.xterm = [
    '#000000', // black
    '#cd0000', // red3
    '#00cd00', // green3
    '#cdcd00', // yellow3
    '#0000ee', // blue2
    '#cd00cd', // magenta3
    '#00cdcd', // cyan3
    '#e5e5e5', // gray90
    '#7f7f7f', // gray50
    '#ff0000', // red
    '#00ff00', // green
    '#ffff00', // yellow
    '#5c5cff', // rgb:5c/5c/ff
    '#ff00ff', // magenta
    '#00ffff', // cyan
    '#ffffff' // white
];
// Seed all 256 colors. Assume xterm defaults.
// Ported from the xterm color generation script.
colors.colors = (function () {
    const cols = [];
    const _cols = [];
    function hex(n) {
        let s = n.toString(16);
        if (s.length < 2)
            s = '0' + s;
        return s;
    }
    function push(i, r, g, b) {
        cols[i] = '#' + hex(r) + hex(g) + hex(b);
        _cols[i] = [r, g, b];
    }
    // 0 - 15
    colors.xterm.forEach((c, i) => {
        const col = parseInt(c.substring(1), 16);
        push(i, (col >> 16) & 0xff, (col >> 8) & 0xff, col & 0xff);
    });
    // 16 - 231
    for (let r = 0; r < 6; r++) {
        for (let g = 0; g < 6; g++) {
            for (let b = 0; b < 6; b++) {
                const i = 16 + (r * 36) + (g * 6) + b;
                push(i, r ? (r * 40 + 55) : 0, g ? (g * 40 + 55) : 0, b ? (b * 40 + 55) : 0);
            }
        }
    }
    // 232 - 255 are grey.
    for (let g = 0; g < 24; g++) {
        const l = (g * 10) + 8;
        const i = 232 + g;
        push(i, l, l, l);
    }
    colors.vcolors = _cols;
    return cols;
})();
// Map higher colors to the first 8 colors.
// This allows translation of high colors to low colors on 8-color terminals.
colors.ccolors = (function () {
    const _cols = colors.vcolors.slice();
    const cols = colors.colors.slice();
    colors.vcolors = colors.vcolors.slice(0, 8);
    colors.colors = colors.colors.slice(0, 8);
    const out = cols.map(colors.match);
    colors.colors = cols;
    colors.vcolors = _cols;
    return out;
})();
colors.colorNames = {
    // special
    default: -1,
    normal: -1,
    bg: -1,
    fg: -1,
    // normal
    black: 0,
    red: 1,
    green: 2,
    yellow: 3,
    blue: 4,
    magenta: 5,
    cyan: 6,
    white: 7,
    // light
    lightblack: 8,
    lightred: 9,
    lightgreen: 10,
    lightyellow: 11,
    lightblue: 12,
    lightmagenta: 13,
    lightcyan: 14,
    lightwhite: 15,
    // bright
    brightblack: 8,
    brightred: 9,
    brightgreen: 10,
    brightyellow: 11,
    brightblue: 12,
    brightmagenta: 13,
    brightcyan: 14,
    brightwhite: 15,
    // alternate spellings
    grey: 8,
    gray: 8,
    lightgrey: 7,
    lightgray: 7,
    brightgrey: 7,
    brightgray: 7
};
colors.convert = function (color) {
    let c = color;
    if (typeof c === 'number') {
        ;
    }
    else if (typeof c === 'string') {
        c = c.replace(/[\- ]/g, '');
        if (colors.colorNames[c] != null) {
            c = colors.colorNames[c];
        }
        else {
            c = colors.match(c);
        }
    }
    else if (Array.isArray(c)) {
        c = colors.match(c);
    }
    else {
        c = -1;
    }
    return c !== -1 ? c : 0x1ff;
};
// Map higher colors to the first 8 colors.
// This allows translation of high colors to low colors on 8-color terminals.
// Why the hell did I do this by hand?
const ccolorsMap = {
    blue: [
        4,
        12,
        [17, 21],
        [24, 27],
        [31, 33],
        [38, 39],
        45,
        [54, 57],
        [60, 63],
        [67, 69],
        [74, 75],
        81,
        [91, 93],
        [97, 99],
        [103, 105],
        [110, 111],
        117,
        [128, 129],
        [134, 135],
        [140, 141],
        [146, 147],
        153,
        165,
        171,
        177,
        183,
        189
    ],
    green: [
        2,
        10,
        22,
        [28, 29],
        [34, 36],
        [40, 43],
        [46, 50],
        [64, 65],
        [70, 72],
        [76, 79],
        [82, 86],
        [106, 108],
        [112, 115],
        [118, 122],
        [148, 151],
        [154, 158],
        [190, 194]
    ],
    cyan: [
        6,
        14,
        23,
        30,
        37,
        44,
        51,
        66,
        73,
        80,
        87,
        109,
        116,
        123,
        152,
        159,
        195
    ],
    red: [
        1,
        9,
        52,
        [88, 89],
        [94, 95],
        [124, 126],
        [130, 132],
        [136, 138],
        [160, 163],
        [166, 169],
        [172, 175],
        [178, 181],
        [196, 200],
        [202, 206],
        [208, 212],
        [214, 218],
        [220, 224]
    ],
    magenta: [
        5,
        13,
        53,
        90,
        96,
        127,
        133,
        139,
        164,
        170,
        176,
        182,
        201,
        207,
        213,
        219,
        225
    ],
    yellow: [
        3,
        11,
        58,
        [100, 101],
        [142, 144],
        [184, 187],
        [226, 230]
    ],
    black: [
        0,
        8,
        16,
        59,
        102,
        [232, 243]
    ],
    white: [
        7,
        15,
        145,
        188,
        231,
        [244, 255]
    ]
};
colors.ncolors = [];
Object.keys(ccolorsMap).forEach((name) => {
    ccolorsMap[name].forEach((offset) => {
        if (typeof offset === 'number') {
            colors.ncolors[offset] = name;
            colors.ccolors[offset] = colors.colorNames[name];
            return;
        }
        for (let i = offset[0], l = offset[1]; i <= l; i++) {
            colors.ncolors[i] = name;
            colors.ccolors[i] = colors.colorNames[name];
        }
    });
});
/**
 * Exports
 */
module.exports = colors;
