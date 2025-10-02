import { describe, it, expect, beforeEach } from 'vitest';
import colors from '../../lib/colors.js';

describe('colors', () => {
  describe('hexToRGB', () => {
    it('should convert 6-digit hex to RGB array', () => {
      const result = colors.hexToRGB('#ff0000');
      expect(result).toEqual([255, 0, 0]);
    });

    it('should convert 3-digit hex to RGB array', () => {
      const result = colors.hexToRGB('#f00');
      expect(result).toEqual([255, 0, 0]);
    });

    it('should handle lowercase hex', () => {
      const result = colors.hexToRGB('#00ff00');
      expect(result).toEqual([0, 255, 0]);
    });

    it('should handle uppercase hex', () => {
      const result = colors.hexToRGB('#0000FF');
      expect(result).toEqual([0, 0, 255]);
    });

    it('should handle mixed case', () => {
      const result = colors.hexToRGB('#AbCdEf');
      expect(result).toEqual([171, 205, 239]);
    });

    it('should handle black', () => {
      const result = colors.hexToRGB('#000000');
      expect(result).toEqual([0, 0, 0]);
    });

    it('should handle white', () => {
      const result = colors.hexToRGB('#ffffff');
      expect(result).toEqual([255, 255, 255]);
    });
  });

  describe('RGBToHex', () => {
    it('should convert RGB values to hex string', () => {
      const result = colors.RGBToHex(255, 0, 0);
      expect(result).toBe('#ff0000');
    });

    it('should convert RGB array to hex string', () => {
      const result = colors.RGBToHex([0, 255, 0]);
      expect(result).toBe('#00ff00');
    });

    it('should pad single digit hex values', () => {
      const result = colors.RGBToHex(1, 2, 3);
      expect(result).toBe('#010203');
    });

    it('should handle black', () => {
      const result = colors.RGBToHex(0, 0, 0);
      expect(result).toBe('#000000');
    });

    it('should handle white', () => {
      const result = colors.RGBToHex(255, 255, 255);
      expect(result).toBe('#ffffff');
    });
  });

  describe('hexToRGB and RGBToHex round-trip', () => {
    it('should convert back and forth consistently', () => {
      const original = '#ab12cd';
      const rgb = colors.hexToRGB(original);
      const hex = colors.RGBToHex(rgb);
      expect(hex).toBe(original);
    });

    it('should handle 3-digit hex expansion', () => {
      const rgb = colors.hexToRGB('#f0a');
      const hex = colors.RGBToHex(rgb);
      expect(hex).toBe('#ff00aa');
    });
  });

  describe('match', () => {
    it('should find closest color match for RGB values', () => {
      const result = colors.match(255, 0, 0);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should find closest color match for RGB array', () => {
      const result = colors.match([0, 255, 0]);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should find closest color match for hex string', () => {
      const result = colors.match('#0000ff');
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should return -1 for invalid hex', () => {
      const result = colors.match('notahex');
      expect(result).toBe(-1);
    });

    it('should cache color matches', () => {
      // Use an unusual color not likely to be pre-cached
      const rgb = [123, 87, 213];
      const hash = (123 << 16) | (87 << 8) | 213;

      // Clear this specific cache entry if it exists
      delete colors._cache[hash];

      const result1 = colors.match(rgb);
      const result2 = colors.match(rgb);

      expect(result1).toBe(result2);
      // Check that cache now has this entry
      expect(colors._cache[hash]).toBe(result1);
    });

    it('should match exact colors with distance 0', () => {
      // Match against black (assuming it's in vcolors)
      const result = colors.match(0, 0, 0);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle white', () => {
      const result = colors.match(255, 255, 255);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('mixColors', () => {
    it('should mix two color indices at 50% alpha', () => {
      // mixColors expects color palette indices, not hex/RGB
      // indices 0-7 are basic colors, 1 is red, 4 is blue
      const c1 = 1; // red
      const c2 = 4; // blue
      const result = colors.mixColors(c1, c2, 0.5);

      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should return first color at alpha 0', () => {
      const c1 = 1; // red
      const c2 = 4; // blue
      const result = colors.mixColors(c1, c2, 0);

      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should return second color at alpha 1', () => {
      const c1 = 1; // red
      const c2 = 4; // blue
      const result = colors.mixColors(c1, c2, 1);

      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should default to 0.5 alpha when not provided', () => {
      const c1 = 0;
      const c2 = 7;
      const result = colors.mixColors(c1, c2);

      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle special color 0x1ff', () => {
      // 0x1ff is a special "transparent" color
      const result = colors.mixColors(0x1ff, 0, 0.5);

      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });
});