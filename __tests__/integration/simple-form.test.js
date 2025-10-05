import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import blessed from '../../lib/blessed.js';

describe('Integration: simple-form example', () => {
  let screen;

  beforeEach(() => {
    screen = blessed.screen({
      smartCSR: true,
      dockBorders: true
    });
  });

  afterEach(() => {
    if (screen && screen.program) {
      screen.destroy();
    }
  });

  it('should create form with submit and cancel buttons', () => {
    const form = blessed.form({
      parent: screen,
      keys: true,
      left: 0,
      top: 0,
      width: 30,
      height: 4,
      bg: 'green',
      content: 'Submit or cancel?'
    });

    const submit = blessed.button({
      parent: form,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: 10,
      top: 2,
      name: 'submit',
      content: 'submit',
      style: {
        bg: 'blue'
      }
    });

    const cancel = blessed.button({
      parent: form,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: 20,
      top: 2,
      name: 'cancel',
      content: 'cancel',
      style: {
        bg: 'blue'
      }
    });

    expect(form).toBeDefined();
    expect(submit).toBeDefined();
    expect(cancel).toBeDefined();
    expect(form.children).toContain(submit);
    expect(form.children).toContain(cancel);
    expect(form.content).toBe('Submit or cancel?');
  });

  it('should handle form submission', () => {
    return new Promise((resolve) => {
      const form = blessed.form({
        parent: screen,
        keys: true,
        width: 30,
        height: 4,
        content: 'Submit or cancel?'
      });

      const submit = blessed.button({
        parent: form,
        name: 'submit',
        content: 'submit'
      });

      submit.on('press', () => {
        form.submit();
      });

      form.on('submit', (data) => {
        form.setContent('Submitted.');
        expect(form.content).toBe('Submitted.');
        resolve();
      });

      // Simulate button press
      submit.emit('press');
    });
  });

  it('should handle form reset/cancel', () => {
    return new Promise((resolve) => {
      const form = blessed.form({
        parent: screen,
        keys: true,
        width: 30,
        height: 4,
        content: 'Submit or cancel?'
      });

      const cancel = blessed.button({
        parent: form,
        name: 'cancel',
        content: 'cancel'
      });

      cancel.on('press', () => {
        form.reset();
      });

      form.on('reset', (data) => {
        form.setContent('Canceled.');
        expect(form.content).toBe('Canceled.');
        resolve();
      });

      // Simulate button press
      cancel.emit('press');
    });
  });

  it('should render form to screen', () => {
    const form = blessed.form({
      parent: screen,
      keys: true,
      width: 30,
      height: 4,
      content: 'Test Form'
    });

    screen.render();

    expect(form.parent).toBe(screen);
    expect(screen.children).toContain(form);
  });

  it('should support keyboard navigation', () => {
    const form = blessed.form({
      parent: screen,
      keys: true
    });

    const button1 = blessed.button({
      parent: form,
      keys: true,
      name: 'button1',
      content: 'Button 1'
    });

    const button2 = blessed.button({
      parent: form,
      keys: true,
      name: 'button2',
      content: 'Button 2'
    });

    expect(form.options.keys).toBe(true);
    expect(button1.options.keys).toBe(true);
    expect(button2.options.keys).toBe(true);
  });
});