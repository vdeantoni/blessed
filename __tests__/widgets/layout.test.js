import { describe, it, expect, beforeEach, vi } from 'vitest';
import Layout from '../../lib/widgets/layout.js';
import Box from '../../lib/widgets/box.js';
import { createMockScreen } from '../helpers/mock.js';

describe('Layout', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe('constructor', () => {
    it('should create a layout instance', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      expect(layout).toBeDefined();
      expect(layout.type).toBe('layout');
    });

    it('should work as factory function', () => {
      const layout = Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      expect(layout).toBeDefined();
      expect(layout.type).toBe('layout');
    });

    it('should inherit from Element', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      expect(layout.screen).toBe(screen);
      expect(typeof layout.render).toBe('function');
    });

    it('should throw error without width and height', () => {
      expect(() => {
        new Layout({ screen });
      }).toThrow('`Layout` must have a width and height!');
    });

    it('should accept width with left/right', () => {
      const layout = new Layout({
        screen,
        left: 0,
        right: 0,
        height: '100%'
      });

      expect(layout).toBeDefined();
    });

    it('should accept height with top/bottom', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        top: 0,
        bottom: 0
      });

      expect(layout).toBeDefined();
    });

    it('should default layout type to inline', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      expect(layout.options.layout).toBe('inline');
    });

    it('should accept grid layout type', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%',
        layout: 'grid'
      });

      expect(layout.options.layout).toBe('grid');
    });

    it('should accept custom renderer', () => {
      const customRenderer = vi.fn();
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%',
        renderer: customRenderer
      });

      expect(layout.renderer).toBe(customRenderer);
    });
  });

  describe('isRendered()', () => {
    it('should return false if element has no lpos', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      const box = new Box({ screen });

      expect(layout.isRendered(box)).toBe(false);
    });

    it('should return false if element has zero width', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      const box = new Box({ screen });
      box.lpos = { xi: 0, xl: 0, yi: 0, yl: 10 };

      expect(layout.isRendered(box)).toBe(false);
    });

    it('should return false if element has zero height', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      const box = new Box({ screen });
      box.lpos = { xi: 0, xl: 10, yi: 0, yl: 0 };

      expect(layout.isRendered(box)).toBe(false);
    });

    it('should return true if element has valid dimensions', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      const box = new Box({ screen });
      box.lpos = { xi: 0, xl: 10, yi: 0, yl: 10 };

      expect(layout.isRendered(box)).toBe(true);
    });
  });

  describe('getLast()', () => {
    it('should return last rendered child before index', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      const box1 = new Box({ screen, width: 10, height: 5 });
      const box2 = new Box({ screen, width: 10, height: 5 });
      const box3 = new Box({ screen, width: 10, height: 5 });

      layout.append(box1);
      layout.append(box2);
      layout.append(box3);

      box1.lpos = { xi: 0, xl: 10, yi: 0, yl: 5 };
      box2.lpos = { xi: 10, xl: 20, yi: 0, yl: 5 };

      const last = layout.getLast(3);

      expect(last).toBe(box2);
    });

    it('should return undefined if no rendered children before index', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      const box1 = new Box({ screen, width: 10, height: 5 });
      const box2 = new Box({ screen, width: 10, height: 5 });

      layout.append(box1);
      layout.append(box2);

      const last = layout.getLast(1);

      expect(last).toBeUndefined();
    });
  });

  describe('getLastCoords()', () => {
    it('should return coordinates of last rendered child', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      const box1 = new Box({ screen, width: 10, height: 5 });
      const box2 = new Box({ screen, width: 10, height: 5 });

      layout.append(box1);
      layout.append(box2);

      const coords = { xi: 0, xl: 10, yi: 0, yl: 5 };
      box1.lpos = coords;

      const lastCoords = layout.getLastCoords(2);

      expect(lastCoords).toBe(coords);
    });

    it('should return undefined if no last child', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      const box = new Box({ screen, width: 10, height: 5 });
      layout.append(box);

      const lastCoords = layout.getLastCoords(1);

      expect(lastCoords).toBeUndefined();
    });
  });

  describe('renderer()', () => {
    it('should return an iterator function', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      const coords = { xi: 0, xl: 80, yi: 0, yl: 24 };
      const iterator = layout.renderer(coords);

      expect(typeof iterator).toBe('function');
    });

    it('should position first child at 0,0', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      const box = new Box({ screen, width: 10, height: 5 });
      layout.append(box);

      const coords = { xi: 0, xl: 80, yi: 0, yl: 24 };
      const iterator = layout.renderer(coords);

      iterator(box, 0);

      expect(box.position.left).toBe(0);
      expect(box.position.top).toBe(0);
    });

    it('should make children shrinkable', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      const box = new Box({ screen, width: 10, height: 5 });
      layout.append(box);

      const coords = { xi: 0, xl: 80, yi: 0, yl: 24 };
      const iterator = layout.renderer(coords);

      iterator(box, 0);

      expect(box.shrink).toBe(true);
    });
  });

  describe('render()', () => {
    it('should have render method', () => {
      const layout = new Layout({
        screen,
        width: '100%',
        height: '100%'
      });

      expect(typeof layout.render).toBe('function');
    });

    it('should call renderer when rendering', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      const renderer = vi.fn(() => () => {});
      layout.renderer = renderer;

      layout._getCoords = vi.fn(() => ({ xi: 0, xl: 80, yi: 0, yl: 24 }));
      layout._render = vi.fn();

      layout.render();

      expect(renderer).toHaveBeenCalled();
    });
  });

  describe('common use cases', () => {
    it('should create an inline layout', () => {
      const layout = new Layout({
        screen,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        layout: 'inline'
      });

      expect(layout.options.layout).toBe('inline');
    });

    it('should create a grid layout', () => {
      const layout = new Layout({
        screen,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        layout: 'grid'
      });

      expect(layout.options.layout).toBe('grid');
    });

    it('should contain multiple children', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      const box1 = new Box({ screen, width: 20, height: 10 });
      const box2 = new Box({ screen, width: 20, height: 10 });
      const box3 = new Box({ screen, width: 20, height: 10 });

      layout.append(box1);
      layout.append(box2);
      layout.append(box3);

      expect(layout.children.length).toBe(3);
    });

    it('should support border and padding', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24,
        border: 'line',
        padding: {
          left: 2,
          right: 2,
          top: 1,
          bottom: 1
        }
      });

      expect(layout.border).toBeDefined();
      expect(layout.padding).toBeDefined();
    });
  });
});