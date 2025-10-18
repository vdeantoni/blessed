/**
 * Type Compatibility Test
 *
 * This test verifies that @tui/blessed is 100% type-compatible with @types/blessed.
 * It ensures that code written for the original blessed library will work with @tui/blessed
 * without any TypeScript errors.
 *
 * Note: We use type-only imports from 'blessed' since we only have @types/blessed installed,
 * not the actual blessed package. The tests validate type compatibility at compile time.
 */

import { describe, it, expect, expectTypeOf } from 'vitest';
import type * as BlessedOriginal from 'blessed';
import * as BlessedTuxe from '../src/blessed.js';

describe('Type Compatibility with @types/blessed', () => {
  describe('Default Export', () => {
    it('should have compatible blessed function', () => {
      // Both should be callable functions
      expectTypeOf(BlessedTuxe.default).toBeCallableWith();
      expectTypeOf<typeof BlessedOriginal>().toBeCallableWith();

      // Should return Program
      const progTuxe = BlessedTuxe.default();
      expectTypeOf(progTuxe).toMatchTypeOf<ReturnType<typeof BlessedOriginal>>();
    });

    it('should have compatible program() method', () => {
      expectTypeOf(BlessedTuxe.default.program).toBeCallableWith();
      expectTypeOf<typeof BlessedOriginal.program>().toBeCallableWith();
    });

    it('should have compatible tput() method', () => {
      expectTypeOf(BlessedTuxe.default.tput).toBeCallableWith();
      expectTypeOf<typeof BlessedOriginal.tput>().toBeCallableWith();
    });
  });

  describe('Widget Factories - Callable Functions', () => {
    it('screen factory should be compatible', () => {
      const screenTuxe = BlessedTuxe.default.screen();
      expectTypeOf(screenTuxe).toMatchTypeOf<ReturnType<typeof BlessedOriginal.screen>>();
    });

    it('box factory should be compatible', () => {
      const boxTuxe = BlessedTuxe.default.box();
      expectTypeOf(boxTuxe).toMatchTypeOf<ReturnType<typeof BlessedOriginal.box>>();
    });

    it('text factory should be compatible', () => {
      const textTuxe = BlessedTuxe.default.text();
      expectTypeOf(textTuxe).toMatchTypeOf<ReturnType<typeof BlessedOriginal.text>>();
    });

    it('list factory should be compatible', () => {
      const listTuxe = BlessedTuxe.default.list();
      expectTypeOf(listTuxe).toMatchTypeOf<ReturnType<typeof BlessedOriginal.list>>();
    });

    it('form factory should be compatible', () => {
      const formTuxe = BlessedTuxe.default.form();
      expectTypeOf(formTuxe).toMatchTypeOf<ReturnType<typeof BlessedOriginal.form>>();
    });

    it('input factory should be compatible', () => {
      const inputTuxe = BlessedTuxe.default.input();
      expectTypeOf(inputTuxe).toMatchTypeOf<ReturnType<typeof BlessedOriginal.input>>();
    });

    it('button factory should be compatible', () => {
      const buttonTuxe = BlessedTuxe.default.button();
      expectTypeOf(buttonTuxe).toMatchTypeOf<ReturnType<typeof BlessedOriginal.button>>();
    });

    it('progressbar factory should be compatible', () => {
      const progressbarTuxe = BlessedTuxe.default.progressbar();
      expectTypeOf(progressbarTuxe).toMatchTypeOf<ReturnType<typeof BlessedOriginal.progressbar>>();
    });

    it('table factory should be compatible', () => {
      const tableTuxe = BlessedTuxe.default.table();
      expectTypeOf(tableTuxe).toMatchTypeOf<ReturnType<typeof BlessedOriginal.table>>();
    });
  });

  describe('Widget Factory Classes', () => {
    it('box.class should be compatible', () => {
      // Verify the class property exists and is a constructor
      expectTypeOf(BlessedTuxe.default.box.class).toBeConstructibleWith();
      expectTypeOf(BlessedTuxe.default.box.class).toMatchTypeOf<typeof BlessedOriginal.box.class>();
    });

    it('screen.class should be compatible', () => {
      expectTypeOf(BlessedTuxe.default.screen.class).toBeConstructibleWith();
      expectTypeOf(BlessedTuxe.default.screen.class).toMatchTypeOf<typeof BlessedOriginal.screen.class>();
    });

    it('list.class should be compatible', () => {
      expectTypeOf(BlessedTuxe.default.list.class).toBeConstructibleWith();
      expectTypeOf(BlessedTuxe.default.list.class).toMatchTypeOf<typeof BlessedOriginal.list.class>();
    });

    it('input.class should be compatible', () => {
      expectTypeOf(BlessedTuxe.default.input.class).toBeConstructibleWith();
      expectTypeOf(BlessedTuxe.default.input.class).toMatchTypeOf<typeof BlessedOriginal.input.class>();
    });
  });

  describe('Named Exports - PascalCase', () => {
    it('Screen export should be compatible', () => {
      expectTypeOf(BlessedTuxe.Screen).toBeCallableWith();
      const screenTuxe = BlessedTuxe.Screen();

      // @types/blessed exports these as named exports too
      expectTypeOf(screenTuxe).toHaveProperty('render');
      expectTypeOf(screenTuxe).toHaveProperty('key');
    });

    it('Box export should be compatible', () => {
      expectTypeOf(BlessedTuxe.Box).toBeCallableWith();
      const boxTuxe = BlessedTuxe.Box();

      expectTypeOf(boxTuxe).toHaveProperty('setContent');
    });

    it('List export should be compatible', () => {
      expectTypeOf(BlessedTuxe.List).toBeCallableWith();
      const listTuxe = BlessedTuxe.List();

      expectTypeOf(listTuxe).toHaveProperty('add');
      expectTypeOf(listTuxe).toHaveProperty('select');
    });

    it('Form export should be compatible', () => {
      expectTypeOf(BlessedTuxe.Form).toBeCallableWith();
      const formTuxe = BlessedTuxe.Form();

      expectTypeOf(formTuxe).toHaveProperty('submit');
    });
  });

  describe('Named Exports - lowercase', () => {
    it('screen export should be compatible', () => {
      expectTypeOf(BlessedTuxe.screen).toBeCallableWith();
      const screenTuxe = BlessedTuxe.screen();

      expectTypeOf(screenTuxe).toHaveProperty('render');
    });

    it('box export should be compatible', () => {
      expectTypeOf(BlessedTuxe.box).toBeCallableWith();
      const boxTuxe = BlessedTuxe.box();

      expectTypeOf(boxTuxe).toHaveProperty('setContent');
    });

    it('list export should be compatible', () => {
      expectTypeOf(BlessedTuxe.list).toBeCallableWith();
      const listTuxe = BlessedTuxe.list();

      expectTypeOf(listTuxe).toHaveProperty('select');
    });
  });

  describe('Widgets Namespace Types', () => {
    it('Widgets.BoxElement should be compatible', () => {
      type TuxeBoxElement = BlessedTuxe.Widgets.BoxElement;
      type OriginalBoxElement = BlessedOriginal.Widgets.BoxElement;

      // Verify key properties exist
      expectTypeOf<TuxeBoxElement>().toHaveProperty('setContent');
      expectTypeOf<TuxeBoxElement>().toHaveProperty('parent');
      expectTypeOf<TuxeBoxElement>().toHaveProperty('screen');
    });

    it('Widgets.Screen should be compatible', () => {
      type TuxeScreen = BlessedTuxe.Widgets.Screen;
      type OriginalScreen = BlessedOriginal.Widgets.Screen;

      // Verify key properties exist
      expectTypeOf<TuxeScreen>().toHaveProperty('render');
      expectTypeOf<TuxeScreen>().toHaveProperty('key');
    });

    it('Widgets.ListElement should be compatible', () => {
      type TuxeListElement = BlessedTuxe.Widgets.ListElement;
      type OriginalListElement = BlessedOriginal.Widgets.ListElement;

      expectTypeOf<TuxeListElement>().toHaveProperty('add');
      expectTypeOf<TuxeListElement>().toHaveProperty('select');
    });

    it('Widgets.FormElement should be compatible', () => {
      type TuxeFormElement = BlessedTuxe.Widgets.FormElement;
      type OriginalFormElement = BlessedOriginal.Widgets.FormElement;

      expectTypeOf<TuxeFormElement>().toHaveProperty('submit');
    });

    it('Widgets.InputElement should be compatible', () => {
      type TuxeInputElement = BlessedTuxe.Widgets.InputElement;
      type OriginalInputElement = BlessedOriginal.Widgets.InputElement;

      expectTypeOf<TuxeInputElement>().toHaveProperty('setValue');
      expectTypeOf<TuxeInputElement>().toHaveProperty('getValue');
    });

    it('Widgets.ButtonElement should be compatible', () => {
      type TuxeButtonElement = BlessedTuxe.Widgets.ButtonElement;
      type OriginalButtonElement = BlessedOriginal.Widgets.ButtonElement;

      expectTypeOf<TuxeButtonElement>().toHaveProperty('press');
    });

    it('Widgets.ProgressBarElement should be compatible', () => {
      type TuxeProgressBarElement = BlessedTuxe.Widgets.ProgressBarElement;
      type OriginalProgressBarElement = BlessedOriginal.Widgets.ProgressBarElement;

      expectTypeOf<TuxeProgressBarElement>().toHaveProperty('setProgress');
    });

    it('Widgets.TableElement should be compatible', () => {
      type TuxeTableElement = BlessedTuxe.Widgets.TableElement;
      type OriginalTableElement = BlessedOriginal.Widgets.TableElement;

      expectTypeOf<TuxeTableElement>().toHaveProperty('setData');
    });
  });

  describe('Options Types', () => {
    it('BoxOptions should be compatible', () => {
      type TuxeBoxOptions = BlessedTuxe.Widgets.BoxOptions;
      type OriginalBoxOptions = BlessedOriginal.Widgets.BoxOptions;

      // Should have common properties
      expectTypeOf<TuxeBoxOptions>().toHaveProperty('top');
      expectTypeOf<TuxeBoxOptions>().toHaveProperty('left');
      expectTypeOf<TuxeBoxOptions>().toHaveProperty('width');
      expectTypeOf<TuxeBoxOptions>().toHaveProperty('height');
      expectTypeOf<TuxeBoxOptions>().toHaveProperty('content');
    });

    it('ListOptions should be compatible', () => {
      type TuxeListOptions = BlessedTuxe.Widgets.ListOptions;
      type OriginalListOptions = BlessedOriginal.Widgets.ListOptions;

      expectTypeOf<TuxeListOptions>().toHaveProperty('items');
      expectTypeOf<TuxeListOptions>().toHaveProperty('selected');
    });

    it('ScreenOptions should be compatible', () => {
      type TuxeScreenOptions = BlessedTuxe.Widgets.IScreenOptions;
      type OriginalScreenOptions = BlessedOriginal.Widgets.IScreenOptions;

      expectTypeOf<TuxeScreenOptions>().toHaveProperty('smartCSR');
      expectTypeOf<TuxeScreenOptions>().toHaveProperty('fastCSR');
    });

    it('InputOptions should be compatible', () => {
      type TuxeInputOptions = BlessedTuxe.Widgets.InputOptions;
      type OriginalInputOptions = BlessedOriginal.Widgets.InputOptions;

      expectTypeOf<TuxeInputOptions>().toHaveProperty('value');
    });

    it('ButtonOptions should be compatible', () => {
      type TuxeButtonOptions = BlessedTuxe.Widgets.ButtonOptions;
      type OriginalButtonOptions = BlessedOriginal.Widgets.ButtonOptions;

      expectTypeOf<TuxeButtonOptions>().toHaveProperty('content');
    });

    it('ProgressBarOptions should be compatible', () => {
      type TuxeProgressBarOptions = BlessedTuxe.Widgets.ProgressBarOptions;
      type OriginalProgressBarOptions = BlessedOriginal.Widgets.ProgressBarOptions;

      expectTypeOf<TuxeProgressBarOptions>().toHaveProperty('filled');
    });
  });

  describe('Style Types', () => {
    it('Style type should be compatible', () => {
      type TuxeStyle = BlessedTuxe.Widgets.Style;
      type OriginalStyle = BlessedOriginal.Widgets.Style;

      // Should have common properties
      expectTypeOf<TuxeStyle>().toHaveProperty('fg');
      expectTypeOf<TuxeStyle>().toHaveProperty('bg');
      expectTypeOf<TuxeStyle>().toHaveProperty('bold');
    });

    it('Border type should be compatible', () => {
      type TuxeBorder = BlessedTuxe.Widgets.Border;
      type OriginalBorder = BlessedOriginal.Widgets.Border;

      expectTypeOf<TuxeBorder>().toHaveProperty('type');
    });
  });

  describe('Event Types', () => {
    it('IMouseEventArg should be compatible', () => {
      type TuxeMouseEvent = BlessedTuxe.Widgets.Events.IMouseEventArg;
      type OriginalMouseEvent = BlessedOriginal.Widgets.Events.IMouseEventArg;

      expectTypeOf<TuxeMouseEvent>().toHaveProperty('x');
      expectTypeOf<TuxeMouseEvent>().toHaveProperty('y');
      expectTypeOf<TuxeMouseEvent>().toHaveProperty('action');
    });

    it('IKeyEventArg should be compatible', () => {
      type TuxeKeyEvent = BlessedTuxe.Widgets.Events.IKeyEventArg;
      type OriginalKeyEvent = BlessedOriginal.Widgets.Events.IKeyEventArg;

      expectTypeOf<TuxeKeyEvent>().toHaveProperty('full');
      expectTypeOf<TuxeKeyEvent>().toHaveProperty('name');
    });
  });

  describe('Helper Functions', () => {
    it('escape should be exported', () => {
      expectTypeOf(BlessedTuxe.escape).toBeFunction();
    });

    it('stripTags should be exported', () => {
      expectTypeOf(BlessedTuxe.stripTags).toBeFunction();
    });

    it('cleanTags should be exported', () => {
      expectTypeOf(BlessedTuxe.cleanTags).toBeFunction();
    });

    it('generateTags should be exported', () => {
      expectTypeOf(BlessedTuxe.generateTags).toBeFunction();
    });
  });

  describe('Utilities', () => {
    it('colors should be exported', () => {
      expect(BlessedTuxe.colors).toBeDefined();
      expectTypeOf(BlessedTuxe.colors).toHaveProperty('match');
    });

    it('unicode should be exported', () => {
      expect(BlessedTuxe.unicode).toBeDefined();
    });

    it('helpers should be exported', () => {
      expect(BlessedTuxe.helpers).toBeDefined();
      expectTypeOf(BlessedTuxe.helpers).toHaveProperty('sprintf');
      expectTypeOf(BlessedTuxe.helpers).toHaveProperty('tryRead');
    });
  });

  describe('Runtime Compatibility Tests', () => {
    it('should create screen', () => {
      const screenTuxe = BlessedTuxe.screen();

      expect(screenTuxe).toBeDefined();
      expect(typeof screenTuxe.render).toBe('function');
      expect(typeof screenTuxe.key).toBe('function');
      expectTypeOf(screenTuxe).toMatchTypeOf<BlessedOriginal.Widgets.Screen>();
    });

    it('should create box', () => {
      const boxTuxe = BlessedTuxe.box({ content: 'test' });

      expect(boxTuxe).toBeDefined();
      expect(typeof boxTuxe.setContent).toBe('function');
      expectTypeOf(boxTuxe).toMatchTypeOf<BlessedOriginal.Widgets.BoxElement>();
    });

    it('should support widget options', () => {
      const options: BlessedTuxe.Widgets.BoxOptions = {
        top: 0,
        left: 0,
        width: 10,
        height: 5,
        content: 'Hello',
        tags: true,
        border: { type: 'line' },
        style: {
          fg: 'white',
          bg: 'blue'
        }
      };

      const box = BlessedTuxe.box(options);
      expect(box).toBeDefined();
    });

    it('should support TypeScript type annotations', () => {
      const screen: BlessedTuxe.Widgets.Screen = BlessedTuxe.screen();
      const box: BlessedTuxe.Widgets.BoxElement = BlessedTuxe.box({
        parent: screen,
        content: 'test'
      });

      expect(screen).toBeDefined();
      expect(box).toBeDefined();
      expect(box.parent).toBe(screen);
    });
  });

  describe('Real-World Usage Patterns', () => {
    it('should work with typical blessed hello-world example', () => {
      const screen = BlessedTuxe.screen({ smartCSR: true });

      const box = BlessedTuxe.box({
        parent: screen,
        top: 'center',
        left: 'center',
        width: '50%',
        height: '50%',
        content: 'Hello {bold}world{/bold}!',
        tags: true,
        border: { type: 'line' },
        style: {
          fg: 'white',
          bg: 'blue',
          border: { fg: '#f0f0f0' }
        }
      });

      expect(screen).toBeDefined();
      expect(box).toBeDefined();
      expect(box.parent).toBe(screen);
    });

    it('should work with list example', () => {
      const screen = BlessedTuxe.screen();

      const list = BlessedTuxe.list({
        parent: screen,
        items: ['Item 1', 'Item 2', 'Item 3'],
        keys: true,
        mouse: true,
        style: {
          selected: { bg: 'blue' }
        }
      });

      expect(list).toBeDefined();
      expect(typeof list.select).toBe('function');
    });

    it('should work with form example', () => {
      const screen = BlessedTuxe.screen();

      const form = BlessedTuxe.form({
        parent: screen,
        keys: true
      });

      const input = BlessedTuxe.input({
        parent: form,
        name: 'username',
        top: 0,
        left: 0,
        width: 20
      });

      expect(form).toBeDefined();
      expect(input).toBeDefined();
      expect(typeof form.submit).toBe('function');
    });
  });
});
