import { describe, it, expect } from 'vitest';
import unicode from '../../lib/unicode.js';

describe('unicode', () => {
  describe('strWidth', () => {
    it('should calculate width of ASCII string', () => {
      expect(unicode.strWidth('hello')).toBe(5);
    });

    it('should count wide characters as 2', () => {
      // Chinese character (wide)
      expect(unicode.strWidth('你好')).toBe(4);
    });

    it('should handle mixed ASCII and wide chars', () => {
      expect(unicode.strWidth('Hi你好')).toBe(6); // Hi=2, 你好=4
    });

    it('should handle empty string', () => {
      expect(unicode.strWidth('')).toBe(0);
    });

    it('should handle combining characters', () => {
      // Combining characters should have width 0
      const text = 'é'; // e + combining accent
      const width = unicode.strWidth(text);
      expect(typeof width).toBe('number');
      expect(width).toBeGreaterThanOrEqual(0);
    });
  });

  describe('charWidth', () => {
    it('should return 1 for ASCII character', () => {
      expect(unicode.charWidth('hello', 0)).toBe(1);
    });

    it('should return 2 for wide character', () => {
      expect(unicode.charWidth('你', 0)).toBe(2);
    });

    it('should return 0 for combining character', () => {
      // Test with a string that has combining marks
      const text = 'e\u0301'; // e with combining acute accent
      expect(unicode.charWidth(text, 1)).toBe(0);
    });

    it('should handle surrogate pairs', () => {
      // Emoji as surrogate pair
      const emoji = '😀';
      const width = unicode.charWidth(emoji, 0);
      expect(width).toBeGreaterThanOrEqual(1);
    });
  });

  describe('isSurrogate', () => {
    it('should return false for ASCII', () => {
      expect(unicode.isSurrogate('hello', 0)).toBe(false);
    });

    it('should return false for regular unicode', () => {
      expect(unicode.isSurrogate('你好', 0)).toBe(false);
    });

    it('should return true for surrogate pair', () => {
      const emoji = '😀';
      expect(unicode.isSurrogate(emoji, 0)).toBe(true);
    });

    it('should handle high surrogate', () => {
      const highSurrogate = '\uD800\uDC00';
      expect(unicode.isSurrogate(highSurrogate, 0)).toBe(true);
    });
  });

  describe('isCombining', () => {
    it('should return false for ASCII', () => {
      expect(unicode.isCombining('hello', 0)).toBe(false);
    });

    it('should return true for combining character', () => {
      const text = 'e\u0301'; // e + combining acute accent
      expect(unicode.isCombining(text, 1)).toBe(true);
    });

    it('should return false for non-combining unicode', () => {
      expect(unicode.isCombining('你', 0)).toBe(false);
    });
  });

  describe('codePointAt', () => {
    it('should get code point for ASCII', () => {
      expect(unicode.codePointAt('A', 0)).toBe(65);
    });

    it('should get code point for unicode', () => {
      expect(unicode.codePointAt('你', 0)).toBe(0x4F60);
    });

    it('should handle surrogate pairs', () => {
      const emoji = '😀';
      const codePoint = unicode.codePointAt(emoji, 0);
      expect(codePoint).toBeGreaterThan(0xFFFF); // Astral plane
      expect(codePoint).toBe(0x1F600);
    });

    it('should return undefined for out of bounds', () => {
      expect(unicode.codePointAt('hello', 10)).toBeUndefined();
    });
  });

  describe('fromCodePoint', () => {
    it('should convert code point to character', () => {
      expect(unicode.fromCodePoint(65)).toBe('A');
    });

    it('should handle unicode code points', () => {
      expect(unicode.fromCodePoint(0x4F60)).toBe('你');
    });

    it('should handle astral plane (surrogate pairs)', () => {
      const result = unicode.fromCodePoint(0x1F600);
      expect(result).toBe('😀');
    });

    it('should handle multiple code points', () => {
      const result = unicode.fromCodePoint(65, 66, 67);
      expect(result).toBe('ABC');
    });

    it('should handle mixed BMP and astral code points', () => {
      const result = unicode.fromCodePoint(65, 0x1F600, 66);
      expect(result).toContain('A');
      expect(result).toContain('😀');
      expect(result).toContain('B');
    });
  });

  describe('chars regex patterns', () => {
    it('should have wide character regex', () => {
      expect(unicode.chars.wide).toBeInstanceOf(RegExp);
    });

    it('should match wide characters', () => {
      const match = '你'.match(unicode.chars.wide);
      expect(match).not.toBeNull();
    });

    it('should have surrogate pair regex', () => {
      expect(unicode.chars.surrogate).toBeInstanceOf(RegExp);
    });

    it('should match surrogate pairs', () => {
      const emoji = '😀';
      const match = emoji.match(unicode.chars.surrogate);
      expect(match).not.toBeNull();
    });

    it('should have combining character regex', () => {
      expect(unicode.chars.combining).toBeInstanceOf(RegExp);
    });

    it('should match combining characters', () => {
      const combining = '\u0301'; // combining acute accent
      const match = combining.match(unicode.chars.combining);
      expect(match).not.toBeNull();
    });

    it('should have all wide chars regex', () => {
      expect(unicode.chars.all).toBeInstanceOf(RegExp);
    });

    it('should not match ASCII with wide regex', () => {
      const match = 'ABC'.match(unicode.chars.wide);
      expect(match).toBeNull();
    });
  });

  describe('combiningTable', () => {
    it('should be an array', () => {
      expect(Array.isArray(unicode.combiningTable)).toBe(true);
    });

    it('should have combining character ranges', () => {
      expect(unicode.combiningTable.length).toBeGreaterThan(0);
    });

    it('should have arrays of [low, high] ranges', () => {
      const firstRange = unicode.combiningTable[0];
      expect(Array.isArray(firstRange)).toBe(true);
      expect(firstRange.length).toBe(2);
      expect(typeof firstRange[0]).toBe('number');
      expect(typeof firstRange[1]).toBe('number');
    });
  });

  describe('East Asian Width handling', () => {
    it('should treat CHECK MARK (U+2713) as width 1 (neutral)', () => {
      // ✓ (U+2713) has East Asian Width "N" (Neutral), should be 1 column
      const checkmark = '\u2713'; // ✓
      expect(unicode.charWidth(checkmark, 0)).toBe(1);
      expect(unicode.strWidth('  ✓ test')).toBe(8); // 2 spaces + 1 (✓) + 1 space + 4 (test)
    });

    it('should treat WHITE HEAVY CHECK MARK (U+2705) as width 2 (wide)', () => {
      // ✅ (U+2705) has East Asian Width "W" (Wide), should be 2 columns
      const heavyCheckmark = '\u2705'; // ✅
      expect(unicode.charWidth(heavyCheckmark, 0)).toBe(2);
    });

    it('should handle text alignment with neutral characters', () => {
      // This test demonstrates the fix: lines with ✓ should align properly with borders
      const line1 = '  ✓ blessed.screen() works';
      const line2 = '  X blessed.screen() works';

      // Both lines should have the same width since ✓ and X are both single-width
      expect(unicode.strWidth(line1)).toBe(unicode.strWidth(line2));
    });
  });

  describe('padWideChars', () => {
    it('should NOT add padding after neutral-width characters', () => {
      const result = unicode.padWideChars('✓ test');
      // ✓ is width 1, so no \x03 padding should be added
      expect(result).toBe('✓ test');
      expect(result).not.toContain('\x03');
    });

    it('should add padding after wide characters', () => {
      const result = unicode.padWideChars('✅ test');
      // ✅ is width 2, so \x03 padding should be added after it
      expect(result).toBe('✅\x03 test');
      expect(result).toContain('\x03');
    });

    it('should handle surrogate pair emojis correctly', () => {
      const result = unicode.padWideChars('🎉 test');
      // 🎉 is a surrogate pair (2 JS chars) with width 2
      // Padding must come AFTER both surrogate parts, not in the middle
      // Bug: high + \x03 + low → broken emoji ��
      // Fix: high + low + \x03 → correct emoji 🎉

      // Check that padding is after the complete emoji
      expect(result.charCodeAt(0)).toBe(0xd83c); // high surrogate
      expect(result.charCodeAt(1)).toBe(0xdf89); // low surrogate
      expect(result.charCodeAt(2)).toBe(0x0003); // padding AFTER complete emoji
      expect(result.charCodeAt(3)).toBe(0x0020); // space

      // Visual check
      expect(result).toBe('🎉\x03 test');
    });

    it('should handle mixed content correctly', () => {
      const result = unicode.padWideChars('✓ normal ✅ wide 你好');
      // ✓ = no padding, ✅ = padding, 你 = padding, 好 = padding
      expect(result).toBe('✓ normal ✅\x03 wide 你\x03好\x03');
    });

    it('should handle empty string', () => {
      expect(unicode.padWideChars('')).toBe('');
    });
  });

  describe('replaceWideChars', () => {
    it('should NOT replace neutral-width characters', () => {
      const result = unicode.replaceWideChars('✓ test');
      // ✓ is width 1, so it should not be replaced
      expect(result).toBe('✓ test');
    });

    it('should replace wide characters with ??', () => {
      const result = unicode.replaceWideChars('✅ test');
      // ✅ is width 2, so it should be replaced with ??
      expect(result).toBe('?? test');
    });

    it('should handle surrogate pair emojis correctly', () => {
      const result = unicode.replaceWideChars('🎉 test');
      // 🎉 is a surrogate pair (2 JS chars) with width 2
      // Should replace the entire emoji (both surrogates) with ??
      // Bug: would process each surrogate separately → broken output
      // Fix: process as complete character → correct ??
      expect(result).toBe('?? test');
    });

    it('should handle mixed content correctly', () => {
      const result = unicode.replaceWideChars('✓ normal ✅ wide 你好');
      // ✓ stays, ✅ → ??, 你 → ??, 好 → ??
      expect(result).toBe('✓ normal ?? wide ????');
    });

    it('should handle empty string', () => {
      expect(unicode.replaceWideChars('')).toBe('');
    });
  });
});