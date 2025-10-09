import { describe, it, expect, beforeEach } from 'vitest';
import RadioSet from '../../lib/widgets/radioset.js';
import RadioButton from '../../lib/widgets/radiobutton.js';
import { createMockScreen } from '../helpers/mock.js';

describe('RadioSet', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe('constructor', () => {
    it('should create a radioset instance', () => {
      const radioset = new RadioSet({ screen });

      expect(radioset).toBeDefined();
      expect(radioset.type).toBe('radio-set');
    });

    it('should inherit from Box', () => {
      const radioset = new RadioSet({ screen });

      expect(radioset.screen).toBe(screen);
      expect(typeof radioset.append).toBe('function');
    });

    it('should accept standard box options', () => {
      const radioset = new RadioSet({
        screen,
        top: 5,
        left: 10,
        width: 20,
        height: 10,
        border: 'line'
      });

      expect(radioset.position.top).toBe(5);
      expect(radioset.position.left).toBe(10);
      expect(radioset.position.width).toBe(20);
      expect(radioset.position.height).toBe(10);
    });

    it('should accept style options', () => {
      const radioset = new RadioSet({
        screen,
        style: {
          fg: 'white',
          bg: 'blue',
          border: {
            fg: 'green'
          }
        }
      });

      expect(radioset.style.fg).toBe('white');
      expect(radioset.style.bg).toBe('blue');
    });
  });

  describe('with radio buttons', () => {
    it('should contain radio buttons as children', () => {
      const radioset = new RadioSet({ screen });

      const radio1 = new RadioButton({
        screen,
        parent: radioset,
        text: 'Option 1'
      });

      const radio2 = new RadioButton({
        screen,
        parent: radioset,
        text: 'Option 2'
      });

      expect(radioset.children).toContain(radio1);
      expect(radioset.children).toContain(radio2);
    });

    it('should act as container for multiple radio buttons', () => {
      const radioset = new RadioSet({ screen });

      radioset.append(new RadioButton({ screen, text: 'A' }));
      radioset.append(new RadioButton({ screen, text: 'B' }));
      radioset.append(new RadioButton({ screen, text: 'C' }));

      expect(radioset.children.length).toBe(3);
    });

    it('should allow only one radio button to be checked at a time', () => {
      const radioset = new RadioSet({ screen });

      const radio1 = new RadioButton({ screen, parent: radioset, text: 'Option 1' });
      const radio2 = new RadioButton({ screen, parent: radioset, text: 'Option 2' });
      const radio3 = new RadioButton({ screen, parent: radioset, text: 'Option 3' });

      // Check first radio
      radio1.check();
      expect(radio1.checked).toBe(true);
      expect(radio2.checked).toBe(false);
      expect(radio3.checked).toBe(false);

      // Check second radio - first should uncheck
      radio2.check();
      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(true);
      expect(radio3.checked).toBe(false);

      // Check third radio - second should uncheck
      radio3.check();
      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(false);
      expect(radio3.checked).toBe(true);
    });
  });

  describe('layout', () => {
    it('should support vertical layout', () => {
      const radioset = new RadioSet({
        screen,
        top: 0,
        left: 0,
        width: 20,
        height: 10
      });

      const radio1 = new RadioButton({
        screen,
        parent: radioset,
        top: 0,
        text: 'Option 1'
      });

      const radio2 = new RadioButton({
        screen,
        parent: radioset,
        top: 1,
        text: 'Option 2'
      });

      expect(radio1.position.top).toBe(0);
      expect(radio2.position.top).toBe(1);
    });

    it('should support horizontal layout', () => {
      const radioset = new RadioSet({
        screen,
        top: 0,
        left: 0,
        width: 40,
        height: 3
      });

      const radio1 = new RadioButton({
        screen,
        parent: radioset,
        left: 0,
        text: 'A'
      });

      const radio2 = new RadioButton({
        screen,
        parent: radioset,
        left: 15,
        text: 'B'
      });

      expect(radio1.position.left).toBe(0);
      expect(radio2.position.left).toBe(15);
    });
  });

  describe('common use cases', () => {
    it('should create a simple yes/no radioset', () => {
      const radioset = new RadioSet({
        screen,
        label: 'Choose one:',
        border: 'line'
      });

      const yesRadio = new RadioButton({
        screen,
        parent: radioset,
        text: 'Yes',
        top: 0
      });

      const noRadio = new RadioButton({
        screen,
        parent: radioset,
        text: 'No',
        top: 1
      });

      yesRadio.check();
      expect(yesRadio.checked).toBe(true);
      expect(noRadio.checked).toBe(false);

      noRadio.check();
      expect(yesRadio.checked).toBe(false);
      expect(noRadio.checked).toBe(true);
    });

    it('should create a multiple choice radioset', () => {
      const radioset = new RadioSet({
        screen,
        width: 30,
        height: 8,
        border: 'line',
        label: 'Select your preference:'
      });

      const options = ['Option A', 'Option B', 'Option C', 'Option D'];
      const radios = options.map((text, index) => {
        return new RadioButton({
          screen,
          parent: radioset,
          text,
          top: index
        });
      });

      // Label creates an extra child element
      expect(radioset.children.length).toBe(5);

      // Select option C
      radios[2].check();
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(false);
      expect(radios[2].checked).toBe(true);
      expect(radios[3].checked).toBe(false);
    });

    it('should get selected radio value', () => {
      const radioset = new RadioSet({ screen });

      const radio1 = new RadioButton({ screen, parent: radioset, text: 'Red' });
      const radio2 = new RadioButton({ screen, parent: radioset, text: 'Green' });
      const radio3 = new RadioButton({ screen, parent: radioset, text: 'Blue' });

      radio2.check();

      // Find checked radio
      const selected = radioset.children.find(child => child.checked);
      expect(selected).toBe(radio2);
      expect(selected.text).toBe('Green');
    });

    it('should handle no selection initially', () => {
      const radioset = new RadioSet({ screen });

      radioset.append(new RadioButton({ screen, text: 'A' }));
      radioset.append(new RadioButton({ screen, text: 'B' }));

      const selected = radioset.children.find(child => child.checked);
      expect(selected).toBeUndefined();
    });
  });
});