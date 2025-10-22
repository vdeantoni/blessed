import { describe, it, expect } from "vitest";
import {
  readFileSync,
  readdirSync,
  existsSync,
} from "../../../src/polyfills/fs";

describe("polyfills/fs", () => {
  describe("readFileSync", () => {
    it("returns terminfo data for xterm paths", () => {
      const result = readFileSync("/usr/share/terminfo/x/xterm-256color");
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Uint8Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result.toString()).toBeTruthy();
    });

    it("throws for non-terminfo paths", () => {
      expect(() => readFileSync("/etc/passwd")).toThrow();
      expect(() => readFileSync("/home/user/file.txt")).toThrow();
    });
  });

  describe("readdirSync", () => {
    it("returns xterm variants for terminfo directories", () => {
      const result = readdirSync("/usr/share/terminfo/x");
      expect(result).toEqual(["xterm", "xterm-256color", "xterm-color"]);
    });

    it("throws for non-terminfo directories", () => {
      expect(() => readdirSync("/etc")).toThrow();
      expect(() => readdirSync("/home")).toThrow();
    });
  });

  describe("existsSync", () => {
    it("returns true for xterm terminfo paths", () => {
      expect(existsSync("/usr/share/terminfo/x/xterm")).toBe(true);
      expect(existsSync("/usr/share/terminfo/x/xterm-256color")).toBe(true);
      expect(existsSync("/some/terminfo/path")).toBe(true);
    });

    it("returns false for other paths", () => {
      expect(existsSync("/etc/passwd")).toBe(false);
      expect(existsSync("/home/user/file.txt")).toBe(false);
    });
  });
});
