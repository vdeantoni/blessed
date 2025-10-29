import { beforeEach, describe, expect, it, vi } from "vitest";
import Textarea from "../../src/widgets/textarea.js";
import Textbox from "../../src/widgets/textbox.js";
import { createMockScreen } from "../helpers/mock.js";

// Helper to initialize textarea with required properties
function initTextarea(textarea) {
  textarea._clines = textarea._clines || [""];
  textarea.lpos = {
    xi: 0,
    yi: 0,
    xl: 80,
    yl: 24,
  };
  return textarea;
}

describe("Textarea - inputOnFocus option", () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe("single input with inputOnFocus", () => {
    it("should automatically call readInput on focus", async () => {
      const textarea = new Textarea({ screen, inputOnFocus: true });
      screen.append(textarea);
      initTextarea(textarea);

      // Trigger focus event - inputOnFocus binds readInput in constructor
      textarea.emit("focus");

      // Should have started reading automatically
      expect(textarea._reading).toBe(true);
    });

    it("should not call readInput if already reading", async () => {
      const textarea = new Textarea({ screen, inputOnFocus: true });
      screen.append(textarea);
      initTextarea(textarea);

      // Start reading
      textarea.readInput();
      expect(textarea._reading).toBe(true);

      // Save the original _reading state
      const originalReading = textarea._reading;

      // Focus again (should not start a new readInput since already reading)
      textarea.emit("focus");

      // Should still be reading (readInput returned early due to _reading check)
      expect(textarea._reading).toBe(originalReading);
      expect(textarea._reading).toBe(true);
    });
  });

  describe("multiple inputs with inputOnFocus (FIXED)", () => {
    it("should allow switching focus between two textboxes without recursion", () => {
      const textbox1 = new Textbox({
        screen,
        inputOnFocus: true,
        name: "input1",
        mouse: true,
        keys: true,
      });
      const textbox2 = new Textbox({
        screen,
        inputOnFocus: true,
        name: "input2",
        mouse: true,
        keys: true,
      });

      screen.append(textbox1);
      screen.append(textbox2);
      initTextarea(textbox1);
      initTextarea(textbox2);

      // Simulate focus on first textbox
      screen.focused = textbox1;
      textbox1.emit("focus");
      expect(textbox1._reading).toBe(true);
      expect(textbox2._reading).toBe(false);

      // Now simulate focus switch to second textbox
      // With the fix, this should NOT cause infinite recursion because:
      // 1. textbox1 gets blur event with textbox2 as parameter
      // 2. _done() detects it's a textarea/textbox switch and skips rewindFocus()
      // 3. textbox2 focus event calls readInput() normally

      // Track focus changes to detect recursion
      let focusCount = 0;
      const originalRewindFocus = screen.rewindFocus;
      screen.rewindFocus = vi.fn(() => {
        focusCount++;
        if (focusCount > 10) {
          throw new Error("Infinite recursion detected in rewindFocus!");
        }
        return originalRewindFocus.call(screen);
      });

      // This should NOT cause infinite recursion (bug is fixed!)
      expect(() => {
        // Simulate focus change: blur first with new focused element, focus second
        textbox1.emit("blur", textbox2);
        screen.focused = textbox2;
        textbox2.emit("focus", textbox1);
      }).not.toThrow();

      // After switching, textbox2 should be reading, textbox1 should not
      expect(textbox1._reading).toBe(false);
      expect(textbox2._reading).toBe(true);

      // rewindFocus should NOT have been called (textarea switch detected)
      expect(screen.rewindFocus).not.toHaveBeenCalled();
    });

    it("should allow clicking between inputs without character duplication", () => {
      const textbox1 = new Textbox({
        screen,
        inputOnFocus: true,
        name: "input1",
        mouse: true,
        keys: true,
      });
      const textbox2 = new Textbox({
        screen,
        inputOnFocus: true,
        name: "input2",
        mouse: true,
        keys: true,
      });

      screen.append(textbox1);
      screen.append(textbox2);
      initTextarea(textbox1);
      initTextarea(textbox2);

      // Start input on first textbox
      screen.focused = textbox1;
      textbox1.emit("focus");
      expect(textbox1._reading).toBe(true);

      // Type a character
      textbox1._listener("a", { name: "a" });
      expect(textbox1.value).toBe("a");

      // Simulate click on second textbox (blur first, then focus second)
      textbox1.emit("blur", textbox2);
      screen.focused = textbox2;
      textbox2.emit("focus", textbox1);

      // Now type in second textbox
      textbox2._listener("b", { name: "b" });

      // BUG: If multiple listeners are attached, we get duplication (bb, bbbb, etc.)
      expect(textbox2.value).toBe("b"); // Should be "b", not "bb" or more

      // Type another character to verify no accumulated listeners
      textbox2._listener("c", { name: "c" });
      expect(textbox2.value).toBe("bc"); // Should be "bc", not "bcc" or more
    });

    it("should properly cleanup listeners when switching between inputs", async () => {
      const textbox1 = new Textbox({
        screen,
        inputOnFocus: true,
        name: "input1",
        mouse: true,
        keys: true,
      });
      const textbox2 = new Textbox({
        screen,
        inputOnFocus: true,
        name: "input2",
        mouse: true,
        keys: true,
      });

      screen.append(textbox1);
      screen.append(textbox2);
      initTextarea(textbox1);
      initTextarea(textbox2);

      // Start input on first textbox
      screen.focused = textbox1;
      textbox1.emit("focus");
      expect(textbox1._reading).toBe(true);

      // Wait for nextTick to attach listener
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(textbox1.__listener).toBeDefined();

      // Switch to second textbox
      textbox1.emit("blur", textbox2);
      screen.focused = textbox2;
      textbox2.emit("focus", textbox1);

      // First textbox should have cleaned up its listener
      expect(textbox1._reading).toBe(false);
      expect(textbox1.__listener).toBeUndefined();

      // Wait for nextTick on second textbox
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Second textbox should now have a listener
      expect(textbox2._reading).toBe(true);
      expect(textbox2.__listener).toBeDefined();
    });
  });

  describe("manual focus handlers (ALTERNATIVE PATTERN)", () => {
    it("should work correctly with manual focus handlers instead of inputOnFocus", () => {
      // Manual focus handlers are an alternative pattern that also works
      // Both inputOnFocus:true and manual handlers are now valid approaches
      const textbox1 = new Textbox({
        screen,
        inputOnFocus: false, // Using manual pattern instead
        name: "input1",
        mouse: true,
        keys: true,
      });
      const textbox2 = new Textbox({
        screen,
        inputOnFocus: false, // Using manual pattern instead
        name: "input2",
        mouse: true,
        keys: true,
      });

      screen.append(textbox1);
      screen.append(textbox2);
      initTextarea(textbox1);
      initTextarea(textbox2);

      // Manually attach focus handlers
      textbox1.on("focus", () => {
        textbox1.readInput();
      });
      textbox2.on("focus", () => {
        textbox2.readInput();
      });

      // Simulate focus on first textbox
      screen.focused = textbox1;
      textbox1.emit("focus");
      expect(textbox1._reading).toBe(true);

      // Type a character
      textbox1._listener("a", { name: "a" });
      expect(textbox1.value).toBe("a");

      // Switch to second textbox - should work cleanly
      textbox1.emit("blur", textbox2);
      screen.focused = textbox2;
      textbox2.emit("focus", textbox1);

      expect(textbox1._reading).toBe(false);
      expect(textbox2._reading).toBe(true);

      // Type in second textbox
      textbox2._listener("b", { name: "b" });
      expect(textbox2.value).toBe("b");

      // No duplication
      textbox2._listener("c", { name: "c" });
      expect(textbox2.value).toBe("bc");
    });
  });

  describe("inputOnFocus with rewindFocus behavior", () => {
    it("should call rewindFocus when input completes with inputOnFocus and NOT switching to textarea", () => {
      const textarea = new Textarea({ screen, inputOnFocus: true });
      screen.append(textarea);
      initTextarea(textarea);

      // Spy on rewindFocus
      const rewindSpy = vi.spyOn(screen, "rewindFocus");

      // Start reading
      textarea.readInput();
      expect(textarea._reading).toBe(true);

      // Complete input (escape) without switching to another textarea
      textarea._listener("\x1b", { name: "escape" });

      // Should have called rewindFocus (no textarea switch detected)
      expect(rewindSpy).toHaveBeenCalled();
    });

    it("should NOT call rewindFocus when switching to another textarea with inputOnFocus", () => {
      const textarea1 = new Textarea({ screen, inputOnFocus: true });
      const textarea2 = new Textarea({ screen, inputOnFocus: true });
      screen.append(textarea1);
      screen.append(textarea2);
      initTextarea(textarea1);
      initTextarea(textarea2);

      // Spy on rewindFocus
      const rewindSpy = vi.spyOn(screen, "rewindFocus");

      // Start reading on first textarea
      textarea1.readInput();
      expect(textarea1._reading).toBe(true);

      // Simulate blur to switch to second textarea (both are textarea type)
      textarea1.emit("blur", textarea2);

      // Should NOT have called rewindFocus (textarea switch detected)
      expect(rewindSpy).not.toHaveBeenCalled();
    });

    it("should NOT call rewindFocus when switching to any other widget", () => {
      const textarea = new Textarea({ screen, inputOnFocus: true });
      const otherWidget = { type: "box" };
      screen.append(textarea);
      initTextarea(textarea);

      // Spy on rewindFocus
      const rewindSpy = vi.spyOn(screen, "rewindFocus");

      // Start reading
      textarea.readInput();
      expect(textarea._reading).toBe(true);

      // Simulate blur to switch to another widget (intentional navigation)
      textarea.emit("blur", otherWidget);

      // Should NOT call rewindFocus (newFocusedEl is defined = intentional navigation)
      expect(rewindSpy).not.toHaveBeenCalled();
    });

    it("should NOT call rewindFocus when input completes without inputOnFocus", () => {
      const textarea = new Textarea({ screen, inputOnFocus: false });
      screen.append(textarea);
      initTextarea(textarea);

      // Spy on rewindFocus
      const rewindSpy = vi.spyOn(screen, "rewindFocus");

      // Start reading manually
      textarea.readInput();
      expect(textarea._reading).toBe(true);

      // Complete input (escape)
      textarea._listener("\x1b", { name: "escape" });

      // Should NOT have called rewindFocus
      expect(rewindSpy).not.toHaveBeenCalled();
    });
  });
});
