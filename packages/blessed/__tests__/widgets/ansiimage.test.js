import { describe, it, expect, beforeEach, vi } from 'vitest';
import ANSIImage from '../../lib/widgets/ansiimage.js';
import { createMockScreen } from '../helpers/mock.js';

describe('ANSIImage', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create an ansiimage instance', () => {
      const image = new ANSIImage({ screen });

      expect(image).toBeDefined();
      expect(image.type).toBe('ansiimage');
    });

    it('should inherit from Box', () => {
      const image = new ANSIImage({ screen });

      expect(image.screen).toBe(screen);
      expect(typeof image.render).toBe('function');
    });

    it('should enable shrink by default', () => {
      const image = new ANSIImage({ screen });

      expect(image.options.shrink).toBe(true);
    });

    it('should default scale to 1.0', () => {
      const image = new ANSIImage({ screen });

      expect(image.scale).toBe(1.0);
    });

    it('should accept custom scale', () => {
      const image = new ANSIImage({
        screen,
        scale: 0.5
      });

      expect(image.scale).toBe(0.5);
    });

    it('should enable animate by default', () => {
      const image = new ANSIImage({ screen });

      expect(image.options.animate).toBe(true);
    });

    it('should accept animate option', () => {
      const image = new ANSIImage({
        screen,
        animate: false
      });

      expect(image.options.animate).toBe(false);
    });

    it('should set _noFill flag', () => {
      const image = new ANSIImage({ screen });

      expect(image._noFill).toBe(true);
    });

    it('should register prerender handler on screen', () => {
      const image = new ANSIImage({ screen });

      expect(screen.listeners('prerender').length).toBeGreaterThan(0);
    });

    it('should register destroy handler', () => {
      const image = new ANSIImage({ screen });

      expect(image.listeners('destroy').length).toBeGreaterThan(0);
    });
  });

  describe('setImage()', () => {
    it('should have setImage method', () => {
      const image = new ANSIImage({ screen });

      expect(typeof image.setImage).toBe('function');
    });

    it('should store file path', () => {
      const image = new ANSIImage({ screen });

      try {
        image.setImage('/path/to/image.png');
      } catch (e) {
        // Will fail loading actual image, but should set file
      }

      expect(image.file).toBe('/path/to/image.png');
    });

    it('should handle image loading errors gracefully', () => {
      const image = new ANSIImage({ screen });

      image.setImage('/nonexistent/image.png');

      expect(image.content).toContain('Image Error');
      expect(image.img).toBeNull();
      expect(image.cellmap).toBeNull();
    });

    it('should clear content before loading', () => {
      const image = new ANSIImage({ screen });
      image.setContent = vi.fn();

      try {
        image.setImage('/path/to/image.png');
      } catch (e) {
        // Ignore loading error
      }

      expect(image.setContent).toHaveBeenCalledWith('');
    });
  });

  describe('play()', () => {
    it('should have play method', () => {
      const image = new ANSIImage({ screen });

      expect(typeof image.play).toBe('function');
    });

    it('should return early if no img', () => {
      const image = new ANSIImage({ screen });
      image.img = null;

      const result = image.play();

      expect(result).toBeUndefined();
    });

    it('should call img.play if img exists', () => {
      const image = new ANSIImage({ screen });
      image.img = {
        play: vi.fn()
      };

      image.play();

      expect(image.img.play).toHaveBeenCalled();
    });
  });

  describe('pause()', () => {
    it('should have pause method', () => {
      const image = new ANSIImage({ screen });

      expect(typeof image.pause).toBe('function');
    });

    it('should return early if no img', () => {
      const image = new ANSIImage({ screen });
      image.img = null;

      const result = image.pause();

      expect(result).toBeUndefined();
    });

    it('should call img.pause if img exists', () => {
      const image = new ANSIImage({ screen });
      image.img = {
        pause: vi.fn()
      };

      image.pause();

      expect(image.img.pause).toHaveBeenCalled();
    });
  });

  describe('stop()', () => {
    it('should have stop method', () => {
      const image = new ANSIImage({ screen });

      expect(typeof image.stop).toBe('function');
    });

    it('should return early if no img', () => {
      const image = new ANSIImage({ screen });
      image.img = null;

      const result = image.stop();

      expect(result).toBeUndefined();
    });

    it('should call img.stop if img exists', () => {
      const image = new ANSIImage({ screen });
      image.img = {
        stop: vi.fn()
      };

      image.stop();

      expect(image.img.stop).toHaveBeenCalled();
    });
  });

  describe('clearImage()', () => {
    it('should have clearImage method', () => {
      const image = new ANSIImage({ screen });

      expect(typeof image.clearImage).toBe('function');
    });

    it('should stop animation', () => {
      const image = new ANSIImage({ screen });
      image.stop = vi.fn();

      image.clearImage();

      expect(image.stop).toHaveBeenCalled();
    });

    it('should clear content', () => {
      const image = new ANSIImage({ screen });
      image.setContent = vi.fn();

      image.clearImage();

      expect(image.setContent).toHaveBeenCalledWith('');
    });

    it('should clear img and cellmap', () => {
      const image = new ANSIImage({ screen });
      image.img = {
        stop: vi.fn()
      };
      image.cellmap = {};

      image.clearImage();

      expect(image.img).toBeNull();
      expect(image.cellmap).toBeNull();
    });
  });

  describe('render()', () => {
    it('should have render method', () => {
      const image = new ANSIImage({ screen });

      expect(typeof image.render).toBe('function');
    });

    it('should call parent\'s render', () => {
      const image = new ANSIImage({ screen });
      screen.append(image);
      // Spy on parent's render method
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(image)), 'render').mockReturnValue(null);

      image.render();

      expect(renderSpy).toHaveBeenCalled();
      renderSpy.mockRestore();
    });

    it('should render image if img and cellmap exist', () => {
      const image = new ANSIImage({ screen });
      screen.append(image);
      // Spy on parent's render method
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(image)), 'render').mockReturnValue({ xi: 0, xl: 80, yi: 0, yl: 24 });

      image.img = {
        renderElement: vi.fn()
      };
      image.cellmap = [[1, 2, 3]];

      image.render();

      expect(image.img.renderElement).toHaveBeenCalledWith(image.cellmap, image);
      renderSpy.mockRestore();
    });

    it('should skip rendering if no cellmap', () => {
      const image = new ANSIImage({ screen });
      screen.append(image);

      // Spy on parent's render method
      const renderSpy = vi.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(image)), 'render').mockReturnValue({ xi: 0, xl: 80, yi: 0, yl: 24 });

      image.img = {
        renderElement: vi.fn()
      };
      image.cellmap = null;

      image.render();

      expect(image.img.renderElement).not.toHaveBeenCalled();
      renderSpy.mockRestore();
    });
  });

  describe('curl static method', () => {
    it('should have curl static method', () => {
      expect(typeof ANSIImage.curl).toBe('function');
    });
  });

  describe('common use cases', () => {
    it('should create an image viewer', () => {
      const image = new ANSIImage({
        screen,
        top: 0,
        left: 0,
        width: 40,
        height: 20
      });

      expect(image.scale).toBe(1.0);
      expect(image.options.animate).toBe(true);
    });

    it('should create a scaled image', () => {
      const image = new ANSIImage({
        screen,
        scale: 0.5
      });

      expect(image.scale).toBe(0.5);
    });

    it('should create a static image', () => {
      const image = new ANSIImage({
        screen,
        animate: false
      });

      expect(image.options.animate).toBe(false);
    });

    it('should handle error display', () => {
      const image = new ANSIImage({ screen });

      image.setImage('/invalid/path.png');

      expect(image.content).toContain('Image Error');
    });

    it('should support playback control', () => {
      const image = new ANSIImage({ screen });
      image.img = {
        play: vi.fn(),
        pause: vi.fn(),
        stop: vi.fn()
      };

      image.play();
      expect(image.img.play).toHaveBeenCalled();

      image.pause();
      expect(image.img.pause).toHaveBeenCalled();

      image.stop();
      expect(image.img.stop).toHaveBeenCalled();
    });

    it('should cleanup on destroy', () => {
      const image = new ANSIImage({ screen });
      image.stop = vi.fn();

      image.emit('destroy');

      expect(image.stop).toHaveBeenCalled();
    });
  });
});