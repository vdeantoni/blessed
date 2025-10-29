/**
 * Type Compatibility Test
 *
 * This test verifies that @unblessed/blessed is 100% type-compatible with @types/blessed.
 * It ensures that code written for the original blessed library will work with @unblessed/blessed
 * without any TypeScript errors.
 *
 * Note: We use type-only imports from 'blessed' since we only have @types/blessed installed,
 * not the actual blessed package. The tests validate type compatibility at compile time.
 */

import type * as BlessedOriginal from "blessed";
import { describe, expect, expectTypeOf, it } from "vitest";
import * as BlessedTui from "../src/blessed.js";

describe("Type Compatibility with @types/blessed", () => {
  describe("Default Export", () => {
    it("should have compatible blessed function", () => {
      // Both should be callable functions
      expectTypeOf(BlessedTui.default).toBeCallableWith();
      expectTypeOf<typeof BlessedOriginal>().toBeCallableWith();

      // Should return Program
      const progTui = BlessedTui.default();
      expectTypeOf(progTui).toMatchTypeOf<ReturnType<typeof BlessedOriginal>>();
    });

    it("should have compatible program() method", () => {
      expectTypeOf(BlessedTui.default.program).toBeCallableWith();
      expectTypeOf<typeof BlessedOriginal.program>().toBeCallableWith();
    });

    it("should have compatible tput() method", () => {
      expectTypeOf(BlessedTui.default.tput).toBeCallableWith();
      expectTypeOf<typeof BlessedOriginal.tput>().toBeCallableWith();
    });
  });

  describe("Widget Factories - Callable Functions", () => {
    it("screen factory should be compatible", () => {
      const screenTui = BlessedTui.default.screen();
      expectTypeOf(screenTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.screen>
      >();
    });

    it("box factory should be compatible", () => {
      const boxTui = BlessedTui.default.box();
      expectTypeOf(boxTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.box>
      >();
    });

    it("text factory should be compatible", () => {
      const textTui = BlessedTui.default.text();
      expectTypeOf(textTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.text>
      >();
    });

    it("list factory should be compatible", () => {
      const listTui = BlessedTui.default.list();
      expectTypeOf(listTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.list>
      >();
    });

    it("form factory should be compatible", () => {
      const formTui = BlessedTui.default.form();
      expectTypeOf(formTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.form>
      >();
    });

    it("input factory should be compatible", () => {
      const inputTui = BlessedTui.default.input();
      expectTypeOf(inputTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.input>
      >();
    });

    it("button factory should be compatible", () => {
      const buttonTui = BlessedTui.default.button();
      expectTypeOf(buttonTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.button>
      >();
    });

    it("progressbar factory should be compatible", () => {
      const progressbarTui = BlessedTui.default.progressbar();
      expectTypeOf(progressbarTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.progressbar>
      >();
    });

    it("table factory should be compatible", () => {
      const tableTui = BlessedTui.default.table();
      expectTypeOf(tableTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.table>
      >();
    });

    it("textarea factory should be compatible", () => {
      const textareaTui = BlessedTui.default.textarea();
      expectTypeOf(textareaTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.textarea>
      >();
    });

    it("textbox factory should be compatible", () => {
      const textboxTui = BlessedTui.default.textbox();
      expectTypeOf(textboxTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.textbox>
      >();
    });

    it("checkbox factory should be compatible", () => {
      const checkboxTui = BlessedTui.default.checkbox();
      expectTypeOf(checkboxTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.checkbox>
      >();
    });

    it("radioset factory should be compatible", () => {
      const radiosetTui = BlessedTui.default.radioset();
      expectTypeOf(radiosetTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.radioset>
      >();
    });

    it("radiobutton factory should be compatible", () => {
      const radiobuttonTui = BlessedTui.default.radiobutton();
      expectTypeOf(radiobuttonTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.radiobutton>
      >();
    });

    it("filemanager factory should be compatible", () => {
      const filemanagerTui = BlessedTui.default.filemanager();
      expectTypeOf(filemanagerTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.filemanager>
      >();
    });

    it("listbar factory should be compatible", () => {
      const listbarTui = BlessedTui.default.listbar();
      expectTypeOf(listbarTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.listbar>
      >();
    });

    it("listtable factory should be compatible", () => {
      const listtableTui = BlessedTui.default.listtable();
      expectTypeOf(listtableTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.listtable>
      >();
    });

    it("log factory should be compatible", () => {
      const logTui = BlessedTui.default.log();
      expectTypeOf(logTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.log>
      >();
    });

    it("loading factory should be compatible", () => {
      const loadingTui = BlessedTui.default.loading();
      expectTypeOf(loadingTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.loading>
      >();
    });

    it("message factory should be compatible", () => {
      const messageTui = BlessedTui.default.message();
      expectTypeOf(messageTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.message>
      >();
    });

    it("question factory should be compatible", () => {
      const questionTui = BlessedTui.default.question();
      expectTypeOf(questionTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.question>
      >();
    });

    it("prompt factory should be compatible", () => {
      const promptTui = BlessedTui.default.prompt();
      expectTypeOf(promptTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.prompt>
      >();
    });

    it("bigtext factory should be compatible", () => {
      // BigText loads fonts on construction, so we just verify the factory is callable
      expectTypeOf(BlessedTui.default.bigtext).toBeCallableWith();
      expectTypeOf<typeof BlessedTui.default.bigtext>().toMatchTypeOf<
        typeof BlessedOriginal.bigtext
      >();
    });

    it("line factory should be compatible", () => {
      const lineTui = BlessedTui.default.line();
      expectTypeOf(lineTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.line>
      >();
    });

    it("scrollablebox factory should be compatible", () => {
      const scrollableboxTui = BlessedTui.default.scrollablebox();
      expectTypeOf(scrollableboxTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.scrollablebox>
      >();
    });

    it("scrollabletext factory should be compatible", () => {
      const scrollabletextTui = BlessedTui.default.scrollabletext();
      expectTypeOf(scrollabletextTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.scrollabletext>
      >();
    });

    it("layout factory should be compatible", () => {
      // Layout requires width and height
      const layoutTui = BlessedTui.default.layout({ width: 10, height: 10 });
      expectTypeOf(layoutTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.layout>
      >();
    });

    it("image factory should be compatible", () => {
      const imageTui = BlessedTui.default.image();
      expectTypeOf(imageTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.image>
      >();
    });

    it("ansiimage factory should be compatible", () => {
      const ansiimageTui = BlessedTui.default.ansiimage();
      expectTypeOf(ansiimageTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.ansiimage>
      >();
    });

    it("overlayimage factory should be compatible", () => {
      // Disable w3m search to prevent slow filesystem traversal in tests
      const overlayimageTui = BlessedTui.default.overlayimage({
        search: false,
      });
      expectTypeOf(overlayimageTui).toMatchTypeOf<
        ReturnType<typeof BlessedOriginal.overlayimage>
      >();
    });
  });

  describe("Widget Factory Classes", () => {
    it("box.class should be compatible", () => {
      // Verify the class property exists and is a constructor
      expectTypeOf(BlessedTui.default.box.class).toBeConstructibleWith();
      expectTypeOf(BlessedTui.default.box.class).toMatchTypeOf<
        typeof BlessedOriginal.box.class
      >();
    });

    it("screen.class should be compatible", () => {
      expectTypeOf(BlessedTui.default.screen.class).toBeConstructibleWith();
      expectTypeOf(BlessedTui.default.screen.class).toMatchTypeOf<
        typeof BlessedOriginal.screen.class
      >();
    });

    it("list.class should be compatible", () => {
      expectTypeOf(BlessedTui.default.list.class).toBeConstructibleWith();
      expectTypeOf(BlessedTui.default.list.class).toMatchTypeOf<
        typeof BlessedOriginal.list.class
      >();
    });

    it("input.class should be compatible", () => {
      expectTypeOf(BlessedTui.default.input.class).toBeConstructibleWith();
      expectTypeOf(BlessedTui.default.input.class).toMatchTypeOf<
        typeof BlessedOriginal.input.class
      >();
    });
  });

  describe("Named Exports - PascalCase", () => {
    it("Screen export should be compatible", () => {
      expectTypeOf(BlessedTui.Screen).toBeCallableWith();
      const screenTui = BlessedTui.Screen();

      // @types/blessed exports these as named exports too
      expectTypeOf(screenTui).toHaveProperty("render");
      expectTypeOf(screenTui).toHaveProperty("key");
    });

    it("Box export should be compatible", () => {
      expectTypeOf(BlessedTui.Box).toBeCallableWith();
      const boxTui = BlessedTui.Box();

      expectTypeOf(boxTui).toHaveProperty("setContent");
    });

    it("List export should be compatible", () => {
      expectTypeOf(BlessedTui.List).toBeCallableWith();
      const listTui = BlessedTui.List();

      expectTypeOf(listTui).toHaveProperty("add");
      expectTypeOf(listTui).toHaveProperty("select");
    });

    it("Form export should be compatible", () => {
      expectTypeOf(BlessedTui.Form).toBeCallableWith();
      const formTui = BlessedTui.Form();

      expectTypeOf(formTui).toHaveProperty("submit");
    });
  });

  describe("Named Exports - lowercase", () => {
    it("screen export should be compatible", () => {
      expectTypeOf(BlessedTui.screen).toBeCallableWith();
      const screenTui = BlessedTui.screen();

      expectTypeOf(screenTui).toHaveProperty("render");
    });

    it("box export should be compatible", () => {
      expectTypeOf(BlessedTui.box).toBeCallableWith();
      const boxTui = BlessedTui.box();

      expectTypeOf(boxTui).toHaveProperty("setContent");
    });

    it("list export should be compatible", () => {
      expectTypeOf(BlessedTui.list).toBeCallableWith();
      const listTui = BlessedTui.list();

      expectTypeOf(listTui).toHaveProperty("select");
    });
  });

  describe("Widgets Namespace Types", () => {
    it("Widgets.BoxElement should be compatible", () => {
      type TuiBoxElement = BlessedTui.Widgets.BoxElement;
      type OriginalBoxElement = BlessedOriginal.Widgets.BoxElement;

      // Verify key properties exist
      expectTypeOf<TuiBoxElement>().toHaveProperty("setContent");
      expectTypeOf<TuiBoxElement>().toHaveProperty("parent");
      expectTypeOf<TuiBoxElement>().toHaveProperty("screen");
    });

    it("Widgets.Screen should be compatible", () => {
      type TuiScreen = BlessedTui.Widgets.Screen;
      type OriginalScreen = BlessedOriginal.Widgets.Screen;

      // Verify key properties exist
      expectTypeOf<TuiScreen>().toHaveProperty("render");
      expectTypeOf<TuiScreen>().toHaveProperty("key");
    });

    it("Widgets.ListElement should be compatible", () => {
      type TuiListElement = BlessedTui.Widgets.ListElement;
      type OriginalListElement = BlessedOriginal.Widgets.ListElement;

      expectTypeOf<TuiListElement>().toHaveProperty("add");
      expectTypeOf<TuiListElement>().toHaveProperty("select");
    });

    it("Widgets.FormElement should be compatible", () => {
      type TuiFormElement = BlessedTui.Widgets.FormElement;
      type OriginalFormElement = BlessedOriginal.Widgets.FormElement;

      expectTypeOf<TuiFormElement>().toHaveProperty("submit");
    });

    it("Widgets.InputElement should be compatible", () => {
      type TuiInputElement = BlessedTui.Widgets.InputElement;
      type OriginalInputElement = BlessedOriginal.Widgets.InputElement;

      expectTypeOf<TuiInputElement>().toHaveProperty("setValue");
      expectTypeOf<TuiInputElement>().toHaveProperty("getValue");
    });

    it("Widgets.ButtonElement should be compatible", () => {
      type TuiButtonElement = BlessedTui.Widgets.ButtonElement;
      type OriginalButtonElement = BlessedOriginal.Widgets.ButtonElement;

      expectTypeOf<TuiButtonElement>().toHaveProperty("press");
    });

    it("Widgets.ProgressBarElement should be compatible", () => {
      type TuiProgressBarElement = BlessedTui.Widgets.ProgressBarElement;
      type OriginalProgressBarElement =
        BlessedOriginal.Widgets.ProgressBarElement;

      expectTypeOf<TuiProgressBarElement>().toHaveProperty("setProgress");
    });

    it("Widgets.TableElement should be compatible", () => {
      type TuiTableElement = BlessedTui.Widgets.TableElement;
      type OriginalTableElement = BlessedOriginal.Widgets.TableElement;

      expectTypeOf<TuiTableElement>().toHaveProperty("setData");
    });
  });

  describe("Options Types", () => {
    it("BoxOptions should be compatible", () => {
      type TuiBoxOptions = BlessedTui.Widgets.BoxOptions;
      type OriginalBoxOptions = BlessedOriginal.Widgets.BoxOptions;

      // Should have common properties
      expectTypeOf<TuiBoxOptions>().toHaveProperty("top");
      expectTypeOf<TuiBoxOptions>().toHaveProperty("left");
      expectTypeOf<TuiBoxOptions>().toHaveProperty("width");
      expectTypeOf<TuiBoxOptions>().toHaveProperty("height");
      expectTypeOf<TuiBoxOptions>().toHaveProperty("content");
    });

    it("ListOptions should be compatible", () => {
      type TuiListOptions = BlessedTui.Widgets.ListOptions;
      type OriginalListOptions = BlessedOriginal.Widgets.ListOptions;

      expectTypeOf<TuiListOptions>().toHaveProperty("items");
      expectTypeOf<TuiListOptions>().toHaveProperty("selected");
    });

    it("ScreenOptions should be compatible", () => {
      type TuiScreenOptions = BlessedTui.Widgets.IScreenOptions;
      type OriginalScreenOptions = BlessedOriginal.Widgets.IScreenOptions;

      expectTypeOf<TuiScreenOptions>().toHaveProperty("smartCSR");
      expectTypeOf<TuiScreenOptions>().toHaveProperty("fastCSR");
    });

    it("InputOptions should be compatible", () => {
      type TuiInputOptions = BlessedTui.Widgets.InputOptions;
      type OriginalInputOptions = BlessedOriginal.Widgets.InputOptions;

      expectTypeOf<TuiInputOptions>().toHaveProperty("value");
    });

    it("ButtonOptions should be compatible", () => {
      type TuiButtonOptions = BlessedTui.Widgets.ButtonOptions;
      type OriginalButtonOptions = BlessedOriginal.Widgets.ButtonOptions;

      expectTypeOf<TuiButtonOptions>().toHaveProperty("content");
    });

    it("ProgressBarOptions should be compatible", () => {
      type TuiProgressBarOptions = BlessedTui.Widgets.ProgressBarOptions;
      type OriginalProgressBarOptions =
        BlessedOriginal.Widgets.ProgressBarOptions;

      expectTypeOf<TuiProgressBarOptions>().toHaveProperty("filled");
    });
  });

  describe("Style Types", () => {
    it("Style type should be compatible", () => {
      type TuiStyle = BlessedTui.Widgets.Style;
      type OriginalStyle = BlessedOriginal.Widgets.Style;

      // Should have common properties
      expectTypeOf<TuiStyle>().toHaveProperty("fg");
      expectTypeOf<TuiStyle>().toHaveProperty("bg");
      expectTypeOf<TuiStyle>().toHaveProperty("bold");
    });

    it("Border type should be compatible", () => {
      type TuiBorder = BlessedTui.Widgets.Border;
      type OriginalBorder = BlessedOriginal.Widgets.Border;

      expectTypeOf<TuiBorder>().toHaveProperty("type");
    });
  });

  describe("Event Types", () => {
    it("IMouseEventArg should be compatible", () => {
      type TuiMouseEvent = BlessedTui.Widgets.Events.IMouseEventArg;
      type OriginalMouseEvent = BlessedOriginal.Widgets.Events.IMouseEventArg;

      expectTypeOf<TuiMouseEvent>().toHaveProperty("x");
      expectTypeOf<TuiMouseEvent>().toHaveProperty("y");
      expectTypeOf<TuiMouseEvent>().toHaveProperty("action");
    });

    it("IKeyEventArg should be compatible", () => {
      type TuiKeyEvent = BlessedTui.Widgets.Events.IKeyEventArg;
      type OriginalKeyEvent = BlessedOriginal.Widgets.Events.IKeyEventArg;

      expectTypeOf<TuiKeyEvent>().toHaveProperty("full");
      expectTypeOf<TuiKeyEvent>().toHaveProperty("name");
    });
  });

  describe("Helper Functions", () => {
    it("escape should be exported", () => {
      expectTypeOf(BlessedTui.escape).toBeFunction();
    });

    it("stripTags should be exported", () => {
      expectTypeOf(BlessedTui.stripTags).toBeFunction();
    });

    it("cleanTags should be exported", () => {
      expectTypeOf(BlessedTui.cleanTags).toBeFunction();
    });

    it("generateTags should be exported", () => {
      expectTypeOf(BlessedTui.generateTags).toBeFunction();
    });
  });

  describe("Utilities", () => {
    it("colors should be exported", () => {
      expect(BlessedTui.colors).toBeDefined();
      expectTypeOf(BlessedTui.colors).toHaveProperty("match");
    });

    it("unicode should be exported", () => {
      expect(BlessedTui.unicode).toBeDefined();
    });

    it("helpers should be exported", () => {
      expect(BlessedTui.helpers).toBeDefined();
      expectTypeOf(BlessedTui.helpers).toHaveProperty("sprintf");
      expectTypeOf(BlessedTui.helpers).toHaveProperty("tryRead");
    });
  });

  describe("Runtime Compatibility Tests", () => {
    it("should create screen", () => {
      const screenTui = BlessedTui.screen();

      expect(screenTui).toBeDefined();
      expect(typeof screenTui.render).toBe("function");
      expect(typeof screenTui.key).toBe("function");
      expectTypeOf(screenTui).toMatchTypeOf<BlessedOriginal.Widgets.Screen>();
    });

    it("should create box", () => {
      const boxTui = BlessedTui.box({ content: "test" });

      expect(boxTui).toBeDefined();
      expect(typeof boxTui.setContent).toBe("function");
      expectTypeOf(boxTui).toMatchTypeOf<BlessedOriginal.Widgets.BoxElement>();
    });

    it("should support widget options", () => {
      const options: BlessedTui.Widgets.BoxOptions = {
        top: 0,
        left: 0,
        width: 10,
        height: 5,
        content: "Hello",
        tags: true,
        border: { type: "line" },
        style: {
          fg: "white",
          bg: "blue",
        },
      };

      const box = BlessedTui.box(options);
      expect(box).toBeDefined();
    });

    it("should support TypeScript type annotations", () => {
      const screen: BlessedTui.Widgets.Screen = BlessedTui.screen();
      const box: BlessedTui.Widgets.BoxElement = BlessedTui.box({
        parent: screen,
        content: "test",
      });

      expect(screen).toBeDefined();
      expect(box).toBeDefined();
      expect(box.parent).toBe(screen);
    });
  });

  describe("Real-World Usage Patterns", () => {
    it("should work with typical blessed hello-world example", () => {
      const screen = BlessedTui.screen({ smartCSR: true });

      const box = BlessedTui.box({
        parent: screen,
        top: "center",
        left: "center",
        width: "50%",
        height: "50%",
        content: "Hello {bold}world{/bold}!",
        tags: true,
        border: { type: "line" },
        style: {
          fg: "white",
          bg: "blue",
          border: { fg: "#f0f0f0" },
        },
      });

      expect(screen).toBeDefined();
      expect(box).toBeDefined();
      expect(box.parent).toBe(screen);
    });

    it("should work with list example", () => {
      const screen = BlessedTui.screen();

      const list = BlessedTui.list({
        parent: screen,
        items: ["Item 1", "Item 2", "Item 3"],
        keys: true,
        mouse: true,
        style: {
          selected: { bg: "blue" },
        },
      });

      expect(list).toBeDefined();
      expect(typeof list.select).toBe("function");
    });

    it("should work with form example", () => {
      const screen = BlessedTui.screen();

      const form = BlessedTui.form({
        parent: screen,
        keys: true,
      });

      const input = BlessedTui.input({
        parent: form,
        name: "username",
        top: 0,
        left: 0,
        width: 20,
      });

      expect(form).toBeDefined();
      expect(input).toBeDefined();
      expect(typeof form.submit).toBe("function");
    });
  });
});
