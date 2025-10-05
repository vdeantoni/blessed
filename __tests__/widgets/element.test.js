import { describe, it, expect, beforeEach, vi } from 'vitest';
import Element from '../../lib/widgets/element.js';
import { createMockScreen } from '../helpers/mock.js';

describe('Element', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe('constructor', () => {
    it('should create an element instance', () => {
      const el = new Element({ screen });

      expect(el).toBeDefined();
      expect(el.type).toBe('element');
    });

    it('should work as factory function', () => {
      const el = Element({ screen });

      expect(el).toBeDefined();
      expect(el.type).toBe('element');
    });

    it('should inherit from Node', () => {
      const el = new Element({ screen });

      expect(el.screen).toBe(screen);
      expect(typeof el.append).toBe('function');
      expect(typeof el.prepend).toBe('function');
      expect(typeof el.remove).toBe('function');
    });

    it('should accept name option', () => {
      const el = new Element({ screen, name: 'myElement' });

      expect(el.name).toBe('myElement');
    });

    it('should initialize position object', () => {
      const el = new Element({
        screen,
        top: 5,
        left: 10,
        width: 30,
        height: 20
      });

      expect(el.position).toBeDefined();
      expect(el.position.top).toBe(5);
      expect(el.position.left).toBe(10);
      expect(el.position.width).toBe(30);
      expect(el.position.height).toBe(20);
    });

    it('should accept position object directly', () => {
      const el = new Element({
        screen,
        position: {
          top: 1,
          left: 2,
          width: 50,
          height: 25
        }
      });

      expect(el.position.top).toBe(1);
      expect(el.position.left).toBe(2);
    });

    it('should handle shrink width option', () => {
      const el = new Element({
        screen,
        width: 'shrink',
        height: 10
      });

      expect(el.shrink).toBe(true);
      expect(el.position.width).toBeUndefined();
    });

    it('should handle shrink height option', () => {
      const el = new Element({
        screen,
        width: 10,
        height: 'shrink'
      });

      expect(el.shrink).toBe(true);
      expect(el.position.height).toBeUndefined();
    });

    it('should initialize style from options', () => {
      const el = new Element({
        screen,
        style: {
          fg: 'white',
          bg: 'blue',
          bold: true
        }
      });

      expect(el.style.fg).toBe('white');
      expect(el.style.bg).toBe('blue');
      expect(el.style.bold).toBe(true);
    });

    it('should initialize style from individual options', () => {
      const el = new Element({
        screen,
        fg: 'green',
        bg: 'black',
        bold: true,
        underline: true
      });

      expect(el.style.fg).toBe('green');
      expect(el.style.bg).toBe('black');
      expect(el.style.bold).toBe(true);
      expect(el.style.underline).toBe(true);
    });

    it('should default hidden to false', () => {
      const el = new Element({ screen });

      expect(el.hidden).toBe(false);
    });

    it('should accept hidden option', () => {
      const el = new Element({ screen, hidden: true });

      expect(el.hidden).toBe(true);
    });

    it('should accept fixed option', () => {
      const el = new Element({ screen, fixed: true });

      expect(el.fixed).toBe(true);
    });

    it('should default align to left', () => {
      const el = new Element({ screen });

      expect(el.align).toBe('left');
    });

    it('should accept align option', () => {
      const el = new Element({ screen, align: 'center' });

      expect(el.align).toBe('center');
    });

    it('should default valign to top', () => {
      const el = new Element({ screen });

      expect(el.valign).toBe('top');
    });

    it('should accept valign option', () => {
      const el = new Element({ screen, valign: 'middle' });

      expect(el.valign).toBe('middle');
    });

    it('should default wrap to true', () => {
      const el = new Element({ screen });

      expect(el.wrap).toBe(true);
    });

    it('should accept wrap option', () => {
      const el = new Element({ screen, wrap: false });

      expect(el.wrap).toBe(false);
    });

    it('should accept ch (fill character) option', () => {
      const el = new Element({ screen, ch: '#' });

      expect(el.ch).toBe('#');
    });

    it('should default ch to space', () => {
      const el = new Element({ screen });

      expect(el.ch).toBe(' ');
    });
  });

  describe('show() and hide()', () => {
    it('should have show method', () => {
      const el = new Element({ screen, hidden: true });

      expect(typeof el.show).toBe('function');
    });

    it('should have hide method', () => {
      const el = new Element({ screen });

      expect(typeof el.hide).toBe('function');
    });

    it('should show element and emit event', () => {
      const el = new Element({ screen, hidden: true });
      const showSpy = vi.fn();

      el.on('show', showSpy);
      el.show();

      expect(el.hidden).toBe(false);
      expect(showSpy).toHaveBeenCalled();
    });

    it('should hide element and emit event', () => {
      const el = new Element({ screen });
      const hideSpy = vi.fn();

      el.on('hide', hideSpy);
      el.hide();

      expect(el.hidden).toBe(true);
      expect(hideSpy).toHaveBeenCalled();
    });
  });

  describe('toggle()', () => {
    it('should have toggle method', () => {
      const el = new Element({ screen });

      expect(typeof el.toggle).toBe('function');
    });

    it('should toggle visibility from hidden to visible', () => {
      const el = new Element({ screen, hidden: true });

      el.toggle();

      expect(el.hidden).toBe(false);
    });

    it('should toggle visibility from visible to hidden', () => {
      const el = new Element({ screen });

      el.toggle();

      expect(el.hidden).toBe(true);
    });
  });

  describe('focus()', () => {
    it('should have focus method', () => {
      const el = new Element({ screen });

      expect(typeof el.focus).toBe('function');
    });
  });

  describe('setContent() and getContent()', () => {
    it('should have setContent method', () => {
      const el = new Element({ screen });

      expect(typeof el.setContent).toBe('function');
    });

    it('should have getContent method', () => {
      const el = new Element({ screen });

      expect(typeof el.getContent).toBe('function');
    });

    it('should set content', () => {
      const el = new Element({ screen });
      el.setContent('Test Content');

      expect(el.content).toBe('Test Content');
    });

    it('should emit set content event', () => {
      const el = new Element({ screen });
      const contentSpy = vi.fn();

      el.on('set content', contentSpy);
      el.setContent('New Content');

      expect(contentSpy).toHaveBeenCalled();
    });
  });

  describe('setText() and getText()', () => {
    it('should have setText method', () => {
      const el = new Element({ screen });

      expect(typeof el.setText).toBe('function');
    });

    it('should have getText method', () => {
      const el = new Element({ screen });

      expect(typeof el.getText).toBe('function');
    });
  });

  describe('insertLine() and deleteLine()', () => {
    it('should have insertLine method', () => {
      const el = new Element({ screen });

      expect(typeof el.insertLine).toBe('function');
    });

    it('should have deleteLine method', () => {
      const el = new Element({ screen });

      expect(typeof el.deleteLine).toBe('function');
    });
  });

  describe('insertTop() and insertBottom()', () => {
    it('should have insertTop method', () => {
      const el = new Element({ screen });

      expect(typeof el.insertTop).toBe('function');
    });

    it('should have insertBottom method', () => {
      const el = new Element({ screen });

      expect(typeof el.insertBottom).toBe('function');
    });
  });

  describe('common use cases', () => {
    it('should create a basic container', () => {
      const el = new Element({
        screen,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      });

      expect(el.position.width).toBe('100%');
      expect(el.position.height).toBe('100%');
    });

    it('should create a styled element', () => {
      const el = new Element({
        screen,
        style: {
          fg: 'white',
          bg: 'blue',
          border: { fg: 'cyan' }
        }
      });

      expect(el.style.fg).toBe('white');
      expect(el.style.bg).toBe('blue');
    });

    it('should create a centered element', () => {
      const el = new Element({
        screen,
        top: 'center',
        left: 'center',
        width: '50%',
        height: '50%'
      });

      expect(el.position.top).toBe('center');
      expect(el.position.left).toBe('center');
    });

    it('should create a shrinkable element', () => {
      const el = new Element({
        screen,
        width: 'shrink',
        height: 'shrink'
      });

      expect(el.shrink).toBe(true);
    });

    it('should create an aligned element', () => {
      const el = new Element({
        screen,
        align: 'center',
        valign: 'middle'
      });

      expect(el.align).toBe('center');
      expect(el.valign).toBe('middle');
    });

    it('should support content with tags', () => {
      const el = new Element({ screen });

      el.setContent('{red-fg}Red Text{/red-fg}');

      expect(el.content).toContain('Red Text');
    });
  });
});