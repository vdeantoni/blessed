import { describe, it, expect } from "vitest";
import {
  generateRainbow,
  generateGradient,
  rotateColors,
} from "../../src/lib/border-colors.js";

describe("border-colors utilities", () => {
  describe("generateRainbow()", () => {
    it("should generate array of hex colors", () => {
      const colors = generateRainbow(10);

      expect(colors).toHaveLength(10);
      colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it("should generate different colors across spectrum", () => {
      const colors = generateRainbow(360);

      // Should have significant color variation
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBeGreaterThan(300);
    });

    it("should generate valid colors for small lengths", () => {
      const colors = generateRainbow(3);
      expect(colors).toHaveLength(3);
      expect(colors[0]).toMatch(/^#[0-9a-f]{6}$/);
      expect(colors[1]).toMatch(/^#[0-9a-f]{6}$/);
      expect(colors[2]).toMatch(/^#[0-9a-f]{6}$/);
    });

    it("should generate valid colors for large lengths", () => {
      const colors = generateRainbow(1000);
      expect(colors).toHaveLength(1000);
      expect(colors[0]).toMatch(/^#[0-9a-f]{6}$/);
      expect(colors[999]).toMatch(/^#[0-9a-f]{6}$/);
    });

    it("should start with red hue (0°)", () => {
      const colors = generateRainbow(360);
      // First color should be red (H=0, S=100%, L=50%) = #ff0000
      expect(colors[0]).toBe("#ff0000");
    });

    it("should cycle through hues evenly", () => {
      const colors = generateRainbow(12);
      // Should have 12 evenly spaced hues (every 30°)
      expect(colors).toHaveLength(12);
      // Red (0°), orange (30°), yellow (60°), green (120°), cyan (180°), blue (240°), etc.
      expect(colors[0]).toBe("#ff0000"); // red
      expect(colors[6]).toBe("#00ffff"); // cyan (180°)
    });
  });

  describe("generateGradient()", () => {
    it("should generate gradient from named colors", () => {
      const colors = generateGradient("red", "blue", 10);

      expect(colors).toHaveLength(10);
      colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it("should generate gradient from hex colors", () => {
      const colors = generateGradient("#ff0000", "#0000ff", 5);

      expect(colors).toHaveLength(5);
      expect(colors[0]).toBe("#ff0000"); // red
      expect(colors[4]).toBe("#0000ff"); // blue
    });

    it("should generate gradient from numeric color codes", () => {
      const colors = generateGradient(1, 4, 5); // red to blue

      expect(colors).toHaveLength(5);
      colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it("should interpolate colors smoothly", () => {
      const colors = generateGradient("#ff0000", "#0000ff", 5);

      // First should be red
      expect(colors[0]).toBe("#ff0000");
      // Last should be blue
      expect(colors[4]).toBe("#0000ff");
      // Middle colors should be transitions
      expect(colors[2]).not.toBe("#ff0000");
      expect(colors[2]).not.toBe("#0000ff");
    });

    it("should handle length of 1", () => {
      const colors = generateGradient("red", "blue", 1);
      expect(colors).toHaveLength(1);
      expect(colors[0]).toMatch(/^#[0-9a-f]{6}$/);
    });

    it("should handle length of 2", () => {
      const colors = generateGradient("#ff0000", "#00ff00", 2);
      expect(colors).toHaveLength(2);
      expect(colors[0]).toBe("#ff0000"); // red
      expect(colors[1]).toBe("#00ff00"); // green
    });

    it("should generate gradient with large length", () => {
      const colors = generateGradient("cyan", "magenta", 100);
      expect(colors).toHaveLength(100);
      colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it("should handle same start and end colors", () => {
      const colors = generateGradient("#ff0000", "#ff0000", 5);
      expect(colors).toHaveLength(5);
      // All should be the same color
      colors.forEach((color) => {
        expect(color).toBe("#ff0000");
      });
    });
  });

  describe("rotateColors()", () => {
    it("should rotate array right by 1 step", () => {
      const colors = ["red", "green", "blue"];
      const rotated = rotateColors(colors, 1);

      // Rotates RIGHT: last element moves to front
      expect(rotated).toEqual(["blue", "red", "green"]);
    });

    it("should rotate array right by multiple steps", () => {
      const colors = ["a", "b", "c", "d", "e"];
      const rotated = rotateColors(colors, 2);

      // Rotates RIGHT: last 2 elements move to front
      expect(rotated).toEqual(["d", "e", "a", "b", "c"]);
    });

    it("should rotate array left with negative steps", () => {
      const colors = ["a", "b", "c", "d"];
      const rotated = rotateColors(colors, -1);

      // Rotates LEFT: first element moves to end
      expect(rotated).toEqual(["b", "c", "d", "a"]);
    });

    it("should not mutate original array", () => {
      const colors = ["red", "green", "blue"];
      const original = [...colors];
      const rotated = rotateColors(colors, 1);

      expect(colors).toEqual(original);
      expect(rotated).not.toBe(colors);
    });

    it("should handle rotation larger than array length", () => {
      const colors = ["a", "b", "c"];
      const rotated = rotateColors(colors, 4); // 4 % 3 = 1

      expect(rotated).toEqual(["c", "a", "b"]);
    });

    it("should handle negative rotation larger than array length", () => {
      const colors = ["a", "b", "c"];
      const rotated = rotateColors(colors, -4); // -4 % 3 = -1

      expect(rotated).toEqual(["b", "c", "a"]);
    });

    it("should handle zero rotation", () => {
      const colors = ["red", "green", "blue"];
      const rotated = rotateColors(colors, 0);

      expect(rotated).toEqual(["red", "green", "blue"]);
      expect(rotated).not.toBe(colors); // Should still return a copy
    });

    it("should handle single element array", () => {
      const colors = ["red"];
      const rotated = rotateColors(colors, 5);

      expect(rotated).toEqual(["red"]);
    });

    it("should handle empty array", () => {
      const colors = [];
      const rotated = rotateColors(colors, 1);

      expect(rotated).toEqual([]);
    });

    it("should work with numeric color codes", () => {
      const colors = [1, 2, 3, 4, 5];
      const rotated = rotateColors(colors, 2);

      // Last 2 elements move to front
      expect(rotated).toEqual([4, 5, 1, 2, 3]);
    });

    it("should work with hex colors", () => {
      const colors = ["#ff0000", "#00ff00", "#0000ff"];
      const rotated = rotateColors(colors, 1);

      // Last element moves to front
      expect(rotated).toEqual(["#0000ff", "#ff0000", "#00ff00"]);
    });

    it("should work with mixed color formats", () => {
      const colors = ["red", 2, "#0000ff", "cyan"];
      const rotated = rotateColors(colors, 1);

      // Last element moves to front
      expect(rotated).toEqual(["cyan", "red", 2, "#0000ff"]);
    });

    it("should handle full rotation (equals array length)", () => {
      const colors = ["a", "b", "c"];
      const rotated = rotateColors(colors, 3);

      expect(rotated).toEqual(["a", "b", "c"]);
    });

    it("should handle double full rotation", () => {
      const colors = ["a", "b", "c"];
      const rotated = rotateColors(colors, 6);

      expect(rotated).toEqual(["a", "b", "c"]);
    });
  });

  describe("Integration tests", () => {
    it("should work together - rainbow + rotate", () => {
      const rainbow = generateRainbow(10);
      const rotated = rotateColors(rainbow, 1);

      expect(rotated).toHaveLength(10);
      // Rotates RIGHT: last element moves to front
      expect(rotated[0]).toBe(rainbow[9]);
      expect(rotated[9]).toBe(rainbow[8]);
    });

    it("should work together - gradient + rotate", () => {
      const gradient = generateGradient("red", "blue", 5);
      const rotated = rotateColors(gradient, 2);

      expect(rotated).toHaveLength(5);
      // Rotates RIGHT: last 2 elements move to front
      expect(rotated[0]).toBe(gradient[3]);
      expect(rotated[1]).toBe(gradient[4]);
    });

    it("should work together - multiple rotations", () => {
      const colors = generateRainbow(8);
      const rotated1 = rotateColors(colors, 1);
      const rotated2 = rotateColors(rotated1, 1);
      const rotated3 = rotateColors(colors, 2);

      // Rotating twice by 1 should equal rotating once by 2
      expect(rotated2).toEqual(rotated3);
    });

    it("should create animation-ready color sequences", () => {
      // This is how the examples use these functions
      const borderLength = 56; // Example 20x10 box border
      const rainbow = generateRainbow(borderLength);

      expect(rainbow).toHaveLength(borderLength);

      // Simulate animation frames
      const frame1 = rotateColors(rainbow, 0);
      const frame2 = rotateColors(rainbow, 1);
      const frame3 = rotateColors(rainbow, 2);

      expect(frame1[0]).toBe(rainbow[0]);
      // Rotates RIGHT each time
      expect(frame2[0]).toBe(rainbow[borderLength - 1]); // Last element
      expect(frame3[0]).toBe(rainbow[borderLength - 2]); // Second-to-last element
    });
  });
});
