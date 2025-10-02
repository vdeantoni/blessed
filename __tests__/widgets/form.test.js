import { describe, it, expect, beforeEach, vi } from 'vitest';
import Form from '../../lib/widgets/form.js';
import Button from '../../lib/widgets/button.js';
import Checkbox from '../../lib/widgets/checkbox.js';
import { createMockScreen } from '../helpers/mock.js';

// Helper to create a keyable button
function createKeyableButton(screen) {
  const button = new Button({ screen });
  button.keyable = true;
  return button;
}

// Helper to create a keyable checkbox
function createKeyableCheckbox(screen, text = '') {
  const checkbox = new Checkbox({ screen, text });
  checkbox.keyable = true;
  return checkbox;
}

describe('Form', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe('constructor', () => {
    it('should create a form instance', () => {
      const form = new Form({ screen });

      expect(form).toBeDefined();
      expect(form.type).toBe('form');
    });

    it('should work as factory function', () => {
      const form = Form({ screen });

      expect(form).toBeDefined();
      expect(form.type).toBe('form');
    });

    it('should inherit from Box', () => {
      const form = new Form({ screen });

      expect(form.screen).toBe(screen);
      expect(typeof form.render).toBe('function');
    });

    it('should set ignoreKeys to true', () => {
      const form = new Form({ screen });

      expect(form.options.ignoreKeys).toBe(true);
    });
  });

  describe('_refresh()', () => {
    it('should collect keyable children', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);
      button1.keyable = true;
      button2.keyable = true;

      form.append(button1);
      form.append(button2);

      form._refresh();

      expect(form._children).toBeDefined();
      expect(form._children.length).toBe(2);
      expect(form._children).toContain(button1);
      expect(form._children).toContain(button2);
    });

    it('should collect nested keyable children', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button = createKeyableButton(screen);
      const checkbox = createKeyableCheckbox(screen);

      form.append(button);
      button.append(checkbox);

      form._refresh();

      expect(form._children.length).toBe(2);
      expect(form._children).toContain(button);
      expect(form._children).toContain(checkbox);
    });

    it('should only refresh once', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button = createKeyableButton(screen);
      form.append(button);

      form._refresh();
      const firstChildren = form._children;

      form._refresh();
      const secondChildren = form._children;

      expect(firstChildren).toBe(secondChildren);
    });
  });

  describe('next()', () => {
    it('should return first child when nothing selected', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);

      form.append(button1);
      form.append(button2);

      const next = form.next();

      expect(next).toBe(button1);
    });

    it('should cycle through children', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);

      form.append(button1);
      form.append(button2);

      form.next(); // button1
      const next = form.next(); // button2

      expect(next).toBe(button2);
    });

    it('should wrap around to first child', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);

      form.append(button1);
      form.append(button2);

      form.next(); // button1
      form.next(); // button2
      const next = form.next(); // back to button1

      expect(next).toBe(button1);
    });

    it('should skip invisible children', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);
      const button3 = new Button({ screen, keyable: true });

      form.append(button1);
      form.append(button2);
      form.append(button3);

      button2.hide();

      form.next(); // button1
      const next = form.next(); // should skip button2, return button3

      expect(next).toBe(button3);
    });
  });

  describe('previous()', () => {
    it('should return last child when nothing selected', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);

      form.append(button1);
      form.append(button2);

      const prev = form.previous();

      expect(prev).toBe(button2);
    });

    it('should cycle through children backwards', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);

      form.append(button1);
      form.append(button2);

      form.previous(); // button2
      const prev = form.previous(); // button1

      expect(prev).toBe(button1);
    });

    it('should wrap around to last child', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);

      form.append(button1);
      form.append(button2);

      form.previous(); // button2
      form.previous(); // button1
      const prev = form.previous(); // back to button2

      expect(prev).toBe(button2);
    });

    it('should skip invisible children', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);
      const button3 = new Button({ screen, keyable: true });

      form.append(button1);
      form.append(button2);
      form.append(button3);

      button2.hide();

      form.previous(); // button3
      const prev = form.previous(); // should skip button2, return button1

      expect(prev).toBe(button1);
    });
  });

  describe('focusNext() / focusPrevious()', () => {
    it('should call next() and focus result', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);

      form.append(button1);
      form.append(button2);

      form.focusNext();

      // next() was called and returned button1
      expect(form._selected).toBe(button1);
    });

    it('should call previous() and focus result', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);

      form.append(button1);
      form.append(button2);

      form.focusPrevious();

      // previous() was called and returned button2
      expect(form._selected).toBe(button2);
    });
  });

  describe('resetSelected()', () => {
    it('should reset selected child', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button = new Button({ screen, keyable: true });
      form.append(button);

      form.next(); // Select first child
      expect(form._selected).toBe(button);

      form.resetSelected();

      expect(form._selected).toBeNull();
    });
  });

  describe('focusFirst() / focusLast()', () => {
    it('should reset and focus first child', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);

      form.append(button1);
      form.append(button2);

      // Call focusFirst
      form.focusFirst();

      // Should have selected button1 after reset and focusNext
      expect(form._selected).toBe(button1);
    });

    it('should reset and focus last child', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button1 = createKeyableButton(screen);
      const button2 = createKeyableButton(screen);

      form.append(button1);
      form.append(button2);

      // Call focusLast
      form.focusLast();

      // Should have selected button2 after reset and focusPrevious
      expect(form._selected).toBe(button2);
    });
  });

  describe('submit()', () => {
    it('should collect values from children', () => {
      const form = new Form({ screen });
      screen.append(form);

      const checkbox = new Checkbox({ screen, text: 'Option' });
      checkbox.name = 'option1';
      checkbox.check();

      const button = new Button({ screen, content: 'Submit' });
      button.name = 'submit';
      button.value = true;

      form.append(checkbox);
      form.append(button);

      const data = form.submit();

      expect(data.option1).toBe(true);
      expect(data.submit).toBe(true);
    });

    it('should emit submit event with data', () => {
      const form = new Form({ screen });
      screen.append(form);

      const checkbox = new Checkbox({ screen, text: 'Option' });
      checkbox.name = 'agree';
      checkbox.check();

      form.append(checkbox);

      const spy = vi.fn();
      form.on('submit', spy);

      form.submit();

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0]).toEqual({ agree: true });
    });

    it('should handle multiple values with same name', () => {
      const form = new Form({ screen });
      screen.append(form);

      const checkbox1 = new Checkbox({ screen, text: 'Option 1' });
      checkbox1.name = 'options';
      checkbox1.value = 'value1';

      const checkbox2 = new Checkbox({ screen, text: 'Option 2' });
      checkbox2.name = 'options';
      checkbox2.value = 'value2';

      form.append(checkbox1);
      form.append(checkbox2);

      const data = form.submit();

      expect(Array.isArray(data.options)).toBe(true);
      expect(data.options).toEqual(['value1', 'value2']);
    });

    it('should use type as name if name not provided', () => {
      const form = new Form({ screen });
      screen.append(form);

      const checkbox = new Checkbox({ screen, text: 'Option' });
      checkbox.check();

      form.append(checkbox);

      const data = form.submit();

      expect(data.checkbox).toBe(true);
    });

    it('should store submission data', () => {
      const form = new Form({ screen });
      screen.append(form);

      const checkbox = new Checkbox({ screen, text: 'Option' });
      checkbox.name = 'option';
      checkbox.check();

      form.append(checkbox);

      form.submit();

      expect(form.submission).toEqual({ option: true });
    });
  });

  describe('cancel()', () => {
    it('should emit cancel event', () => {
      const form = new Form({ screen });
      const spy = vi.fn();

      form.on('cancel', spy);
      form.cancel();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('reset()', () => {
    it('should uncheck checkboxes', () => {
      const form = new Form({ screen });
      screen.append(form);

      const checkbox = new Checkbox({ screen, text: 'Option' });
      checkbox.check();

      form.append(checkbox);

      form.reset();

      expect(checkbox.checked).toBe(false);
    });

    it('should delete button values', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button = new Button({ screen, content: 'Submit' });
      button.value = true;

      form.append(button);

      form.reset();

      expect(button.value).toBeUndefined();
    });

    it('should emit reset event', () => {
      const form = new Form({ screen });
      const spy = vi.fn();

      form.on('reset', spy);
      form.reset();

      expect(spy).toHaveBeenCalled();
    });

    it('should handle nested elements', () => {
      const form = new Form({ screen });
      screen.append(form);

      const button = new Button({ screen });
      const checkbox = new Checkbox({ screen, text: 'Option' });
      checkbox.check();

      form.append(button);
      button.append(checkbox);

      form.reset();

      expect(checkbox.checked).toBe(false);
    });
  });

  describe('keyboard navigation', () => {
    it('should setup keyboard listener when keys option is true', () => {
      const form = new Form({ screen, keys: true });

      // Just verify the form was created with keys option
      expect(form.options.keys).toBe(true);
    });
  });

  describe('vi mode navigation', () => {
    it('should support vi mode when enabled', () => {
      const form = new Form({ screen, keys: true, vi: true });

      // Just verify the form was created with vi option
      expect(form.options.vi).toBe(true);
    });
  });

  describe('common use cases', () => {
    it('should create login form', () => {
      const form = new Form({
        screen,
        keys: true,
        left: 'center',
        top: 'center',
        width: 30,
        height: 8
      });

      const submitButton = new Button({
        screen,
        content: 'Login'
      });
      submitButton.name = 'submit';

      form.append(submitButton);

      const spy = vi.fn();
      form.on('submit', spy);

      form.submit();

      expect(spy).toHaveBeenCalled();
    });

    it('should handle form with checkboxes', () => {
      const form = new Form({ screen });
      screen.append(form);

      const checkbox1 = new Checkbox({ screen, text: 'Option 1' });
      checkbox1.name = 'option1';

      const checkbox2 = new Checkbox({ screen, text: 'Option 2' });
      checkbox2.name = 'option2';

      form.append(checkbox1);
      form.append(checkbox2);

      checkbox1.check();

      const data = form.submit();

      expect(data.option1).toBe(true);
      expect(data.option2).toBe(false);
    });
  });
});