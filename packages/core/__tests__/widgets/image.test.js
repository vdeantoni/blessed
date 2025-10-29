import childProcess from "child_process";
import fs from "fs";
import path from "path";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { setRuntime } from "../../src/runtime-context.js";
import Image from "../../src/widgets/image.js";
import { createMockScreen } from "../helpers/mock.js";

describe("Image", () => {
  let screen;

  beforeAll(() => {
    // Initialize runtime with fs/path/childProcess for image widgets
    setRuntime({ fs, path, childProcess, process });
  });

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should have Image constructor", () => {
      expect(typeof Image).toBe("function");
    });

    it("should default type to ansi", () => {
      const image = new Image({ screen });

      expect(image.options.type).toBe("ansi");
    });

    it("should accept itype option", () => {
      const image = new Image({
        screen,
        itype: "overlay",
        search: false, // Prevent filesystem search for w3mimgdisplay in CI
      });

      expect(image.options.type).toBe("overlay");
    });

    it("should accept type option", () => {
      const image = new Image({
        screen,
        type: "overlay",
        search: false, // Prevent filesystem search for w3mimgdisplay in CI
      });

      expect(image.options.type).toBe("overlay");
    });

    it("should throw error for invalid type", () => {
      expect(() => {
        new Image({
          screen,
          type: "invalid",
        });
      }).toThrow("`type` must either be `ansi` or `overlay`.");
    });
  });

  describe("common use cases", () => {
    it("should pass file option", () => {
      const image = new Image({
        screen,
        file: "/path/to/image.png",
      });

      expect(image.options.file).toBe("/path/to/image.png");
    });

    it("should pass dimensions", () => {
      const image = new Image({
        screen,
        width: 40,
        height: 20,
      });

      expect(image.options.width).toBe(40);
      expect(image.options.height).toBe(20);
    });
  });
});
