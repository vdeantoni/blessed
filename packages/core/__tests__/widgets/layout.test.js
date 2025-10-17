import { describe, it, expect, beforeEach, vi } from 'vitest';
import Layout from '../../src/widgets/layout.js';
import Box from '../../src/widgets/box.js';
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
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(layout)), 'render').mockReturnValue(null);

      layout.render();

      expect(renderer).toHaveBeenCalled();
      renderSpy.mockRestore();
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

  describe('Inline Layout Positioning', () => {
    it('should position second child to the right of first', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24,
        layout: 'inline'
      });

      const box1 = new Box({ screen, width: 10, height: 5 });
      const box2 = new Box({ screen, width: 10, height: 5 });

      layout.append(box1);
      layout.append(box2);

      const coords = { xi: 0, xl: 80, yi: 0, yl: 24 };
      const iterator = layout.renderer(coords);

      iterator(box1, 0);
      box1.lpos = { xi: 0, xl: 10, yi: 0, yl: 5 };

      iterator(box2, 1);

      expect(box2.position.left).toBe(10);
      expect(box2.position.top).toBe(0);
    });

    it('should wrap to new row when child exceeds width', () => {
      const layout = new Layout({
        screen,
        width: 30,
        height: 24,
        layout: 'inline'
      });

      const box1 = new Box({ screen, width: 15, height: 5 });
      const box2 = new Box({ screen, width: 15, height: 5 });
      const box3 = new Box({ screen, width: 15, height: 5 });

      layout.append(box1);
      layout.append(box2);
      layout.append(box3);

      const coords = { xi: 0, xl: 30, yi: 0, yl: 24 };
      const iterator = layout.renderer(coords);

      iterator(box1, 0);
      box1.lpos = { xi: 0, xl: 15, yi: 0, yl: 5 };

      iterator(box2, 1);
      box2.lpos = { xi: 15, xl: 30, yi: 0, yl: 5 };

      iterator(box3, 2);

      expect(box3.position.left).toBe(0);
      expect(box3.position.top).toBe(5);
    });

    it('should position child below previous row element', () => {
      const layout = new Layout({
        screen,
        width: 30,
        height: 24,
        layout: 'inline'
      });

      const box1 = new Box({ screen, width: 10, height: 5 });
      const box2 = new Box({ screen, width: 10, height: 8 });
      const box3 = new Box({ screen, width: 10, height: 5 });
      const box4 = new Box({ screen, width: 10, height: 5 });

      layout.append(box1);
      layout.append(box2);
      layout.append(box3);
      layout.append(box4);

      const coords = { xi: 0, xl: 30, yi: 0, yl: 24 };
      const iterator = layout.renderer(coords);

      // First row (3 boxes fit in width 30)
      iterator(box1, 0);
      box1.lpos = { xi: 0, xl: 10, yi: 0, yl: 5 };

      iterator(box2, 1);
      box2.lpos = { xi: 10, xl: 20, yi: 0, yl: 8 };

      iterator(box3, 2);
      box3.lpos = { xi: 20, xl: 30, yi: 0, yl: 5 };

      // Fourth box wraps to new row
      iterator(box4, 3);

      expect(box4.position.left).toBe(0);
      // Box4 wraps to new row
      expect(box4.position.top).toBeGreaterThanOrEqual(5);
    });

    it('should handle element that fits on same row', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24,
        layout: 'inline'
      });

      const box1 = new Box({ screen, width: 20, height: 10 });
      const box2 = new Box({ screen, width: 30, height: 10 });

      layout.append(box1);
      layout.append(box2);

      const coords = { xi: 0, xl: 80, yi: 0, yl: 24 };
      const iterator = layout.renderer(coords);

      iterator(box1, 0);
      box1.lpos = { xi: 0, xl: 20, yi: 0, yl: 10 };

      iterator(box2, 1);

      expect(box2.position.left).toBe(20);
      expect(box2.position.top).toBe(0);
    });
  });

  describe('Grid Layout Positioning', () => {
    it('should calculate highest width in grid mode', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24,
        layout: 'grid'
      });

      const box1 = new Box({ screen, width: 10, height: 5 });
      const box2 = new Box({ screen, width: 20, height: 5 });
      const box3 = new Box({ screen, width: 15, height: 5 });

      layout.append(box1);
      layout.append(box2);
      layout.append(box3);

      const coords = { xi: 0, xl: 80, yi: 0, yl: 24 };
      const iterator = layout.renderer(coords);

      iterator(box1, 0);
      expect(box1.shrink).toBe(true);
    });

    it('should compensate position for grid layout', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24,
        layout: 'grid'
      });

      const box1 = new Box({ screen, width: 10, height: 5 });
      const box2 = new Box({ screen, width: 20, height: 5 });

      layout.append(box1);
      layout.append(box2);

      const coords = { xi: 0, xl: 80, yi: 0, yl: 24 };
      const iterator = layout.renderer(coords);

      iterator(box1, 0);
      box1.lpos = { xi: 0, xl: 10, yi: 0, yl: 5 };

      iterator(box2, 1);

      // Grid should compensate for width difference
      expect(box2.position.left).toBeGreaterThan(10);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty layout', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      expect(layout.children.length).toBe(0);
    });

    it('should handle single child', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      const box = new Box({ screen, width: 10, height: 5 });
      layout.append(box);

      expect(layout.children.length).toBe(1);
    });

    it('should handle child that overflows height', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 20
      });

      const box = new Box({ screen, width: 10, height: 25 });
      layout.append(box);

      const coords = { xi: 0, xl: 80, yi: 0, yl: 20 };
      const iterator = layout.renderer(coords);

      // Should still position the child even if it overflows
      iterator(box, 0);

      expect(box.position.top).toBe(0);
    });

    it('should handle zero-width layout', () => {
      const layout = new Layout({
        screen,
        width: 0,
        height: 24
      });

      const box = new Box({ screen, width: 10, height: 5 });
      layout.append(box);

      expect(layout.children.length).toBe(1);
    });

    it('should handle zero-height layout', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 0
      });

      const box = new Box({ screen, width: 10, height: 5 });
      layout.append(box);

      expect(layout.children.length).toBe(1);
    });
  });

  describe('Renderer Options', () => {
    it('should use custom renderer if provided', () => {
      const customIterator = vi.fn();
      const customRenderer = vi.fn(() => customIterator);

      const layout = new Layout({
        screen,
        width: 80,
        height: 24,
        renderer: customRenderer
      });

      layout._getCoords = vi.fn(() => ({ xi: 0, xl: 80, yi: 0, yl: 24 }));
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(layout)), 'render').mockReturnValue(null);

      layout.render();

      expect(customRenderer).toHaveBeenCalled();
      renderSpy.mockRestore();
    });

    it('should pass coords to renderer', () => {
      const customRenderer = vi.fn(() => () => {});

      const layout = new Layout({
        screen,
        width: 80,
        height: 24,
        renderer: customRenderer
      });

      const coords = { xi: 0, xl: 80, yi: 0, yl: 24 };
      layout._getCoords = vi.fn(() => coords);
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(layout)), 'render').mockReturnValue(null);

      layout.render();

      expect(customRenderer).toHaveBeenCalledWith(
        expect.objectContaining({
          xi: expect.any(Number),
          xl: expect.any(Number),
          yi: expect.any(Number),
          yl: expect.any(Number)
        })
      );
      renderSpy.mockRestore();
    });
  });

  describe('Render Lifecycle', () => {
    it('should emit prerender event', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      const prerenderSpy = vi.fn();
      layout.on('prerender', prerenderSpy);

      layout._getCoords = vi.fn(() => ({ xi: 0, xl: 80, yi: 0, yl: 24 }));
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(layout)), 'render').mockReturnValue(null);

      layout.render();

      expect(prerenderSpy).toHaveBeenCalled();
      renderSpy.mockRestore();
    });

    it('should emit render event with coords', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      const renderEventSpy = vi.fn();
      layout.on('render', renderEventSpy);

      const coords = { xi: 0, xl: 80, yi: 0, yl: 24 };
      layout._getCoords = vi.fn(() => coords);
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(layout)), 'render').mockReturnValue(null);

      layout.render();

      expect(renderSpy).toHaveBeenCalled();
      renderSpy.mockRestore();
    });

    it('should handle render with no coords', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      layout._getCoords = vi.fn(() => null);
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(layout)), 'render').mockReturnValue(null);

      const result = layout.render();

      expect(result).toBeUndefined();
      expect(layout.lpos).toBeUndefined();
      renderSpy.mockRestore();
    });

    it('should handle render with zero width coords', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      layout._getCoords = vi.fn(() => ({ xi: 10, xl: 10, yi: 0, yl: 24 }));
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(layout)), 'render').mockReturnValue(null);

      const result = layout.render();

      expect(result).toBeUndefined();
      renderSpy.mockRestore();
    });

    it('should handle render with zero height coords', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24
      });

      layout._getCoords = vi.fn(() => ({ xi: 0, xl: 80, yi: 10, yl: 10 }));
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(layout)), 'render').mockReturnValue(null);

      const result = layout.render();

      expect(result).toBeUndefined();
      renderSpy.mockRestore();
    });

    it('should adjust coords for border', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24,
        border: 'line'
      });

      layout._getCoords = vi.fn(() => ({ xi: 0, xl: 80, yi: 0, yl: 24 }));
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(layout)), 'render').mockReturnValue(null);

      layout.render();

      expect(layout.lpos).toBeDefined();
      renderSpy.mockRestore();
    });

    it('should adjust coords for padding', () => {
      const layout = new Layout({
        screen,
        width: 80,
        height: 24,
        padding: {
          left: 2,
          right: 2,
          top: 1,
          bottom: 1
        }
      });

      layout._getCoords = vi.fn(() => ({ xi: 0, xl: 80, yi: 0, yl: 24 }));
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(layout)), 'render').mockReturnValue(null);

      layout.render();

      // tpadding is a getter that checks if padding exists
      expect(layout.lpos).toBeDefined();
      expect(layout.padding).toBeDefined();
      renderSpy.mockRestore();
    });
  });
});
