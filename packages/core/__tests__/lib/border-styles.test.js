/**
 * border-styles.test.js - tests for border style definitions
 */

import { describe, expect, it } from "vitest";
import {
  borderStyles,
  getBorderChars,
  isValidBorderStyle,
} from "../../src/lib/border-styles.js";

describe("borderStyles", () => {
  it("should define all required border styles", () => {
    expect(borderStyles).toHaveProperty("single");
    expect(borderStyles).toHaveProperty("double");
    expect(borderStyles).toHaveProperty("round");
    expect(borderStyles).toHaveProperty("bold");
    expect(borderStyles).toHaveProperty("singleDouble");
    expect(borderStyles).toHaveProperty("doubleSingle");
    expect(borderStyles).toHaveProperty("classic");
    expect(borderStyles).toHaveProperty("arrow");
  });

  it("should have correct properties for each style", () => {
    Object.entries(borderStyles).forEach(([name, chars]) => {
      expect(chars).toHaveProperty("topLeft");
      expect(chars).toHaveProperty("top");
      expect(chars).toHaveProperty("topRight");
      expect(chars).toHaveProperty("right");
      expect(chars).toHaveProperty("bottomRight");
      expect(chars).toHaveProperty("bottom");
      expect(chars).toHaveProperty("bottomLeft");
      expect(chars).toHaveProperty("left");
    });
  });

  describe("single style", () => {
    it("should use Unicode box drawing characters", () => {
      const chars = borderStyles.single;
      expect(chars.topLeft).toBe("┌");
      expect(chars.top).toBe("─");
      expect(chars.topRight).toBe("┐");
      expect(chars.right).toBe("│");
      expect(chars.bottomRight).toBe("┘");
      expect(chars.bottom).toBe("─");
      expect(chars.bottomLeft).toBe("└");
      expect(chars.left).toBe("│");
    });
  });

  describe("double style", () => {
    it("should use double-line box drawing characters", () => {
      const chars = borderStyles.double;
      expect(chars.topLeft).toBe("╔");
      expect(chars.top).toBe("═");
      expect(chars.topRight).toBe("╗");
      expect(chars.right).toBe("║");
      expect(chars.bottomRight).toBe("╝");
      expect(chars.bottom).toBe("═");
      expect(chars.bottomLeft).toBe("╚");
      expect(chars.left).toBe("║");
    });
  });

  describe("round style", () => {
    it("should use rounded corners", () => {
      const chars = borderStyles.round;
      expect(chars.topLeft).toBe("╭");
      expect(chars.top).toBe("─");
      expect(chars.topRight).toBe("╮");
      expect(chars.right).toBe("│");
      expect(chars.bottomRight).toBe("╯");
      expect(chars.bottom).toBe("─");
      expect(chars.bottomLeft).toBe("╰");
      expect(chars.left).toBe("│");
    });
  });

  describe("bold style", () => {
    it("should use heavy/bold box drawing characters", () => {
      const chars = borderStyles.bold;
      expect(chars.topLeft).toBe("┏");
      expect(chars.top).toBe("━");
      expect(chars.topRight).toBe("┓");
      expect(chars.right).toBe("┃");
      expect(chars.bottomRight).toBe("┛");
      expect(chars.bottom).toBe("━");
      expect(chars.bottomLeft).toBe("┗");
      expect(chars.left).toBe("┃");
    });
  });

  describe("singleDouble style", () => {
    it("should use single horizontal and double vertical lines", () => {
      const chars = borderStyles.singleDouble;
      expect(chars.topLeft).toBe("╓");
      expect(chars.top).toBe("─");
      expect(chars.topRight).toBe("╖");
      expect(chars.right).toBe("║");
      expect(chars.bottomRight).toBe("╜");
      expect(chars.bottom).toBe("─");
      expect(chars.bottomLeft).toBe("╙");
      expect(chars.left).toBe("║");
    });
  });

  describe("doubleSingle style", () => {
    it("should use double horizontal and single vertical lines", () => {
      const chars = borderStyles.doubleSingle;
      expect(chars.topLeft).toBe("╒");
      expect(chars.top).toBe("═");
      expect(chars.topRight).toBe("╕");
      expect(chars.right).toBe("│");
      expect(chars.bottomRight).toBe("╛");
      expect(chars.bottom).toBe("═");
      expect(chars.bottomLeft).toBe("╘");
      expect(chars.left).toBe("│");
    });
  });

  describe("classic style", () => {
    it("should use ASCII characters", () => {
      const chars = borderStyles.classic;
      expect(chars.topLeft).toBe("+");
      expect(chars.top).toBe("-");
      expect(chars.topRight).toBe("+");
      expect(chars.right).toBe("|");
      expect(chars.bottomRight).toBe("+");
      expect(chars.bottom).toBe("-");
      expect(chars.bottomLeft).toBe("+");
      expect(chars.left).toBe("|");
    });
  });

  describe("arrow style", () => {
    it("should use arrow characters", () => {
      const chars = borderStyles.arrow;
      expect(chars.topLeft).toBe("↘");
      expect(chars.top).toBe("↓");
      expect(chars.topRight).toBe("↙");
      expect(chars.right).toBe("←");
      expect(chars.bottomRight).toBe("↖");
      expect(chars.bottom).toBe("↑");
      expect(chars.bottomLeft).toBe("↗");
      expect(chars.left).toBe("→");
    });
  });
});

describe("getBorderChars", () => {
  it("should return characters for valid style names", () => {
    const chars = getBorderChars("single");
    expect(chars).toEqual(borderStyles.single);
  });

  it("should return characters for all valid style names", () => {
    [
      "single",
      "double",
      "round",
      "bold",
      "singleDouble",
      "doubleSingle",
      "classic",
      "arrow",
    ].forEach((style) => {
      const chars = getBorderChars(style);
      expect(chars).toEqual(borderStyles[style]);
    });
  });

  it("should throw error for invalid style names", () => {
    expect(() => getBorderChars("invalid")).toThrow(
      'Invalid border style: "invalid"',
    );
  });

  it("should accept custom border characters object", () => {
    const custom = {
      topLeft: "*",
      top: "-",
      topRight: "*",
      right: "|",
      bottomRight: "*",
      bottom: "-",
      bottomLeft: "*",
      left: "|",
    };
    const chars = getBorderChars(custom);
    expect(chars).toEqual(custom);
  });
});

describe("isValidBorderStyle", () => {
  it("should return true for valid style names", () => {
    expect(isValidBorderStyle("single")).toBe(true);
    expect(isValidBorderStyle("double")).toBe(true);
    expect(isValidBorderStyle("round")).toBe(true);
    expect(isValidBorderStyle("bold")).toBe(true);
    expect(isValidBorderStyle("singleDouble")).toBe(true);
    expect(isValidBorderStyle("doubleSingle")).toBe(true);
    expect(isValidBorderStyle("classic")).toBe(true);
    expect(isValidBorderStyle("arrow")).toBe(true);
  });

  it("should return false for invalid style names", () => {
    expect(isValidBorderStyle("invalid")).toBe(false);
    expect(isValidBorderStyle("")).toBe(false);
    expect(isValidBorderStyle("SINGLE")).toBe(false);
  });
});
