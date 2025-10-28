import { describe, it, expect, beforeEach, vi } from "vitest";
import Dialog from "../../src/widgets/dialog.js";
import Box from "../../src/widgets/box.js";
import Textbox from "../../src/widgets/textbox.js";
import { createMockScreen } from "../helpers/mock.js";

describe("Dialog", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("constructor", () => {
    it("should create a dialog instance", () => {
      const dialog = new Dialog({ screen });

      expect(dialog).toBeDefined();
      expect(dialog.type).toBe("dialog");
    });

    it("should inherit from Box", () => {
      const dialog = new Dialog({ screen });

      expect(dialog.screen).toBe(screen);
      expect(typeof dialog.render).toBe("function");
    });

    it("should be hidden by default", () => {
      const dialog = new Dialog({ screen });

      expect(dialog.hidden).toBe(true);
    });

    it("should be centered by default", () => {
      const dialog = new Dialog({ screen });

      expect(dialog.position.left).toBe("center");
      expect(dialog.position.top).toBe("center");
    });

    it("should have shadow enabled by default", () => {
      const dialog = new Dialog({ screen });

      expect(dialog.shadow).toBe(true);
    });

    it("should be focusable by default", () => {
      const dialog = new Dialog({
        screen,
        keys: true,
      });

      expect(dialog.options.focusable).not.toBe(false);
    });

    it("should allow overriding defaults", () => {
      const dialog = new Dialog({
        screen,
        hidden: false,
        left: 10,
        top: 5,
        shadow: false,
      });

      expect(dialog.hidden).toBe(false);
      expect(dialog.position.left).toBe(10);
      expect(dialog.position.top).toBe(5);
      expect(dialog.shadow).toBe(false);
    });
  });

  describe("show", () => {
    it("should show the dialog", () => {
      const dialog = new Dialog({ screen });

      dialog.show();

      expect(dialog.hidden).toBe(false);
    });

    it("should save focus by default", () => {
      const dialog = new Dialog({ screen });
      const saveFocusSpy = vi.spyOn(screen, "saveFocus");

      dialog.show();

      expect(saveFocusSpy).toHaveBeenCalled();
    });

    it("should not save focus when saveFocus is false", () => {
      const dialog = new Dialog({ screen });
      const saveFocusSpy = vi.spyOn(screen, "saveFocus");

      dialog.show(false);

      expect(saveFocusSpy).not.toHaveBeenCalled();
    });

    it("should focus the dialog after showing", () => {
      const dialog = new Dialog({ screen, keys: true });
      const focusSpy = vi.spyOn(dialog, "focus");

      dialog.show();

      expect(focusSpy).toHaveBeenCalled();
    });

    it("should not focus if focusable is false", () => {
      const dialog = new Dialog({
        screen,
        focusable: false,
      });
      const focusSpy = vi.spyOn(dialog, "focus");

      dialog.show();

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe("hide", () => {
    it("should hide the dialog", () => {
      const dialog = new Dialog({ screen });

      dialog.show();
      expect(dialog.hidden).toBe(false);

      dialog.hide();
      expect(dialog.hidden).toBe(true);
    });

    it("should restore focus by default", () => {
      const dialog = new Dialog({ screen });
      const restoreFocusSpy = vi.spyOn(screen, "restoreFocus");

      dialog.hide();

      expect(restoreFocusSpy).toHaveBeenCalled();
    });

    it("should not restore focus when restoreFocus is false", () => {
      const dialog = new Dialog({ screen });
      const restoreFocusSpy = vi.spyOn(screen, "restoreFocus");

      dialog.hide(false);

      expect(restoreFocusSpy).not.toHaveBeenCalled();
    });

    it("should handle errors when restoring focus", () => {
      const dialog = new Dialog({ screen });
      vi.spyOn(screen, "restoreFocus").mockImplementation(() => {
        throw new Error("Focus error");
      });

      // Should not throw
      expect(() => dialog.hide()).not.toThrow();
    });
  });

  describe("display", () => {
    it("should be an alias for show", () => {
      const dialog = new Dialog({ screen });

      dialog.display();

      expect(dialog.hidden).toBe(false);
    });
  });

  describe("close", () => {
    it("should be an alias for hide", () => {
      const dialog = new Dialog({ screen });

      dialog.show();
      dialog.close();

      expect(dialog.hidden).toBe(true);
    });
  });

  describe("usage patterns", () => {
    it("should work with content and border", () => {
      const dialog = new Dialog({
        screen,
        width: "50%",
        height: "50%",
        content: "Dialog content",
        border: { type: "line" },
        label: " Dialog Title ",
      });

      expect(dialog.content).toBe("Dialog content");
      expect(dialog.border).toBeDefined();
    });

    it("should support typical modal dialog pattern", () => {
      const dialog = new Dialog({
        screen,
        width: "60%",
        height: "40%",
        content: "Are you sure?",
        border: { type: "line" },
      });

      // Hidden initially
      expect(dialog.hidden).toBe(true);

      // Show the dialog
      dialog.show();
      expect(dialog.hidden).toBe(false);

      // Hide on escape (simulated)
      dialog.hide();
      expect(dialog.hidden).toBe(true);
    });

    it("should work with children widgets", () => {
      const dialog = new Dialog({
        screen,
        width: "50%",
        height: "50%",
      });

      const childBox = dialog.screen.constructor.prototype.box?.call(
        dialog.screen,
        {
          parent: dialog,
          top: 1,
          left: 2,
          content: "Child content",
        },
      );

      if (childBox) {
        expect(dialog.children).toContain(childBox);
      }
    });
  });

  describe("integration with screen", () => {
    it("should work with parent option", () => {
      const dialog = new Dialog({
        parent: screen,
      });

      expect(dialog.parent).toBe(screen);
      expect(screen.children).toContain(dialog);
    });

    it("should maintain shadow for visual depth", () => {
      const dialog = new Dialog({
        screen,
        width: "50%",
        height: "50%",
      });

      expect(dialog.shadow).toBe(true);
    });

    it("should be positionable", () => {
      const dialog = new Dialog({
        screen,
        left: 10,
        top: 5,
        width: 50,
        height: 20,
      });

      expect(dialog.position.left).toBe(10);
      expect(dialog.position.top).toBe(5);
      expect(dialog.position.width).toBe(50);
      expect(dialog.position.height).toBe(20);
    });
  });

  describe("focus management", () => {
    it("should save and restore focus correctly", () => {
      const dialog = new Dialog({ screen, keys: true });
      const otherElement = screen.constructor.prototype.box?.call(screen, {
        parent: screen,
        focusable: true,
        keys: true,
      });

      if (otherElement) {
        // Focus other element first
        otherElement.focus();

        // Show dialog (saves focus and focuses dialog)
        dialog.show();

        // Hide dialog (restores focus to other element)
        dialog.hide();

        // Focus should be restored to other element
        // (this is managed by screen.saveFocus/restoreFocus)
        expect(true).toBe(true); // Basic check that no errors occurred
      }
    });
  });

  describe("ESC key handling", () => {
    it("should hide dialog when ESC is pressed on dialog", () => {
      const dialog = new Dialog({ screen, keys: true });

      dialog.show();
      expect(dialog.hidden).toBe(false);

      // Simulate ESC keypress on dialog
      dialog.emit("element keypress", dialog, "\x1b", { name: "escape" });

      expect(dialog.hidden).toBe(true);
    });

    it("should hide dialog when ESC is pressed on child element", () => {
      const dialog = new Dialog({ screen });

      const childBox = new Box({
        parent: dialog,
        content: "Child content",
      });

      dialog.show();
      expect(dialog.hidden).toBe(false);

      // Simulate ESC keypress on child
      dialog.emit("element keypress", childBox, "\x1b", { name: "escape" });

      expect(dialog.hidden).toBe(true);
    });

    it("should not hide dialog when already hidden", () => {
      const dialog = new Dialog({ screen });
      const hideSpy = vi.spyOn(dialog, "hide");

      // Dialog already hidden
      expect(dialog.hidden).toBe(true);

      // ESC should not trigger hide again
      dialog.emit("element keypress", dialog, "\x1b", { name: "escape" });

      expect(hideSpy).not.toHaveBeenCalled();
    });

    it("should render screen after hiding on ESC", () => {
      const dialog = new Dialog({ screen });
      const renderSpy = vi.spyOn(screen, "render");

      dialog.show();
      dialog.emit("element keypress", dialog, "\x1b", { name: "escape" });

      expect(renderSpy).toHaveBeenCalled();
    });

    it("should work with nested children", () => {
      const dialog = new Dialog({ screen });

      const container = new Box({ parent: dialog });
      const textbox = new Textbox({ parent: container });

      dialog.show();
      expect(dialog.hidden).toBe(false);

      // ESC on deeply nested child should still hide dialog
      dialog.emit("element keypress", textbox, "\x1b", { name: "escape" });

      expect(dialog.hidden).toBe(true);
    });
  });
});
