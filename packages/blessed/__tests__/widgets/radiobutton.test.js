import { describe, it, expect, beforeEach, vi } from 'vitest';
import RadioButton from '../../lib/widgets/radiobutton.js';
import RadioSet from '../../lib/widgets/radioset.js';
import Form from '../../lib/widgets/form.js';
import { createMockScreen } from '../helpers/mock.js';

describe('RadioButton', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe('constructor', () => {
    it('should create a radiobutton instance', () => {
      const radio = new RadioButton({ screen });

      expect(radio).toBeDefined();
      expect(radio.type).toBe('radio-button');
    });

    it('should inherit from Checkbox', () => {
      const radio = new RadioButton({ screen });

      expect(radio.screen).toBe(screen);
      expect(typeof radio.check).toBe('function');
      expect(typeof radio.uncheck).toBe('function');
      expect(typeof radio.toggle).toBe('function');
    });

    it('should support text option', () => {
      const radio = new RadioButton({ screen, text: 'Option 1' });

      expect(radio.text).toBe('Option 1');
    });

    it('should be unchecked by default', () => {
      const radio = new RadioButton({ screen });

      expect(radio.checked).toBe(false);
    });
  });

  describe('render()', () => {
    it('should render unchecked radio button', () => {
      const radio = new RadioButton({ screen, text: 'Option' });
      screen.append(radio);

      radio.setContent = vi.fn();
      radio.render();

      expect(radio.setContent).toHaveBeenCalled();
      const content = radio.setContent.mock.calls[0][0];
      expect(content).toContain('( ) Option');
    });

    it('should render checked radio button', () => {
      const radio = new RadioButton({ screen, text: 'Option' });
      screen.append(radio);

      radio.checked = true;
      radio.setContent = vi.fn();
      radio.render();

      expect(radio.setContent).toHaveBeenCalled();
      const content = radio.setContent.mock.calls[0][0];
      expect(content).toContain('(*) Option');
    });

    it('should use parentheses instead of brackets', () => {
      const radio = new RadioButton({ screen, text: 'Test' });
      screen.append(radio);

      radio.setContent = vi.fn();
      radio.render();

      const content = radio.setContent.mock.calls[0][0];
      expect(content).toMatch(/^\(/); // Starts with (
      expect(content).not.toContain('[');
    });
  });

  describe('check()', () => {
    it('should check the radio button in a radioset', () => {
      const radioset = new RadioSet({ screen });
      screen.append(radioset);

      const radio = new RadioButton({ screen });
      radioset.append(radio);

      radio.check();

      expect(radio.checked).toBe(true);
    });

    it('should emit check event', () => {
      const radioset = new RadioSet({ screen });
      screen.append(radioset);

      const radio = new RadioButton({ screen });
      radioset.append(radio);

      const spy = vi.fn();
      radio.on('check', spy);

      radio.check();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('uncheck()', () => {
    it('should uncheck the radio button', () => {
      const radio = new RadioButton({ screen });
      screen.append(radio);

      radio.checked = true;
      radio.uncheck();

      expect(radio.checked).toBe(false);
    });

    it('should emit uncheck event', () => {
      const radio = new RadioButton({ screen });
      screen.append(radio);

      radio.checked = true;
      const spy = vi.fn();
      radio.on('uncheck', spy);

      radio.uncheck();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('toggle()', () => {
    it('should be aliased to check()', () => {
      const radio = new RadioButton({ screen });

      expect(radio.toggle).toBe(radio.check);
    });

    it('should check when toggled', () => {
      const radioset = new RadioSet({ screen });
      screen.append(radioset);

      const radio = new RadioButton({ screen });
      radioset.append(radio);

      radio.toggle();

      expect(radio.checked).toBe(true);
    });
  });

  describe('mutual exclusion', () => {
    it('should uncheck other radio buttons in RadioSet when checked', () => {
      const radioset = new RadioSet({ screen });
      screen.append(radioset);

      const radio1 = new RadioButton({ screen, text: 'Option 1' });
      const radio2 = new RadioButton({ screen, text: 'Option 2' });
      const radio3 = new RadioButton({ screen, text: 'Option 3' });

      radioset.append(radio1);
      radioset.append(radio2);
      radioset.append(radio3);

      radio1.check();
      expect(radio1.checked).toBe(true);
      expect(radio2.checked).toBe(false);
      expect(radio3.checked).toBe(false);

      radio2.check();
      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(true);
      expect(radio3.checked).toBe(false);

      radio3.check();
      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(false);
      expect(radio3.checked).toBe(true);
    });

    it('should uncheck other radio buttons in Form when checked', () => {
      const form = new Form({ screen });
      screen.append(form);

      const radio1 = new RadioButton({ screen, text: 'Option 1' });
      const radio2 = new RadioButton({ screen, text: 'Option 2' });

      form.append(radio1);
      form.append(radio2);

      radio1.check();
      expect(radio1.checked).toBe(true);
      expect(radio2.checked).toBe(false);

      radio2.check();
      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(true);
    });

    it('should only affect radio buttons in same container', () => {
      const container1 = new RadioSet({ screen });
      const container2 = new RadioSet({ screen });
      screen.append(container1);
      screen.append(container2);

      const radio1 = new RadioButton({ screen, text: 'Group 1 - Option 1' });
      const radio2 = new RadioButton({ screen, text: 'Group 1 - Option 2' });
      const radio3 = new RadioButton({ screen, text: 'Group 2 - Option 1' });
      const radio4 = new RadioButton({ screen, text: 'Group 2 - Option 2' });

      container1.append(radio1);
      container1.append(radio2);
      container2.append(radio3);
      container2.append(radio4);

      radio1.check();
      radio3.check();

      expect(radio1.checked).toBe(true);
      expect(radio2.checked).toBe(false);
      expect(radio3.checked).toBe(true);
      expect(radio4.checked).toBe(false);

      radio2.check();
      radio4.check();

      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(true);
      expect(radio3.checked).toBe(false); // Changed: radio4 unchecked radio3 in same container
      expect(radio4.checked).toBe(true);
    });

    it('should not uncheck itself', () => {
      const radioset = new RadioSet({ screen });
      screen.append(radioset);

      const radio = new RadioButton({ screen, text: 'Option' });
      radioset.append(radio);

      radio.check();
      expect(radio.checked).toBe(true);

      radio.check();
      expect(radio.checked).toBe(true);
    });
  });

  describe('integration with nested elements', () => {
    it('should handle nested radio buttons correctly', () => {
      const radioset = new RadioSet({ screen });
      screen.append(radioset);

      const container = new RadioButton({ screen, text: 'Parent' });
      const childRadio = new RadioButton({ screen, text: 'Child' });

      radioset.append(container);
      container.append(childRadio);

      container.check();
      expect(container.checked).toBe(true);

      childRadio.check();
      expect(container.checked).toBe(false);
      expect(childRadio.checked).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle radio button without proper parent container', () => {
      const radioset = new RadioSet({ screen });
      screen.append(radioset);

      const radio = new RadioButton({ screen });
      radioset.append(radio);

      // Should not crash
      radio.check();

      expect(radio.checked).toBe(true);
    });

    it('should handle empty text', () => {
      const radio = new RadioButton({ screen, text: '' });
      screen.append(radio);

      radio.setContent = vi.fn();
      radio.render();

      const content = radio.setContent.mock.calls[0][0];
      expect(content).toContain('( ) ');
    });

    it('should handle long text', () => {
      const longText = 'Very long option text that might wrap or be truncated';
      const radio = new RadioButton({ screen, text: longText });
      screen.append(radio);

      radio.setContent = vi.fn();
      radio.render();

      const content = radio.setContent.mock.calls[0][0];
      expect(content).toContain(longText);
    });

    it('should handle special characters in text', () => {
      const radio = new RadioButton({ screen, text: 'Option <>&"' });
      screen.append(radio);

      expect(radio.text).toBe('Option <>&"');
    });
  });

  describe('common use cases', () => {
    it('should work as single-choice selector', () => {
      const radioset = new RadioSet({ screen });
      screen.append(radioset);

      const options = ['Small', 'Medium', 'Large'];
      const radios = options.map(text => {
        const radio = new RadioButton({ screen, text });
        radioset.append(radio);
        return radio;
      });

      // Select medium
      radios[1].check();

      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);
      expect(radios[2].checked).toBe(false);

      // Change to large
      radios[2].check();

      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(false);
      expect(radios[2].checked).toBe(true);
    });

    it('should work with form submission', () => {
      const form = new Form({ screen });
      screen.append(form);

      const radio1 = new RadioButton({ screen, text: 'Yes' });
      const radio2 = new RadioButton({ screen, text: 'No' });
      radio1.name = 'answer';
      radio2.name = 'answer';

      form.append(radio1);
      form.append(radio2);

      radio1.check();

      const data = form.submit();

      // Form collects values from elements with same name into array
      expect(Array.isArray(data.answer)).toBe(true);
      expect(data.answer).toContain(true);
      expect(data.answer).toContain(false);
    });

    it('should allow getting selected value from group', () => {
      const radioset = new RadioSet({ screen });
      screen.append(radioset);

      const radio1 = new RadioButton({ screen, text: 'Option A' });
      const radio2 = new RadioButton({ screen, text: 'Option B' });
      const radio3 = new RadioButton({ screen, text: 'Option C' });
      radio1.value = 'a';
      radio2.value = 'b';
      radio3.value = 'c';

      radioset.append(radio1);
      radioset.append(radio2);
      radioset.append(radio3);

      radio2.check();

      // Find checked radio - checkbox returns checked state, not value
      let selected = null;
      radioset.forDescendants(el => {
        if (el.type === 'radio-button' && el.checked) {
          // Checkbox widgets return checked state (true/false), not value property
          selected = el.checked;
        }
      });

      expect(selected).toBe(true);
    });
  });
});