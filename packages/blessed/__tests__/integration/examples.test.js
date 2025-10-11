import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import blessed from '../../lib/blessed.js';

describe('Integration: examples', () => {
  let screen;

  beforeEach(() => {
    screen = blessed.screen({
      smartCSR: true,
      dockBorders: true,
      autoPadding: true
    });
  });

  afterEach(() => {
    if (screen && screen.program) {
      screen.destroy();
    }
  });

  describe('time.js example', () => {
    it('should create a centered container for clock', () => {
      const container = blessed.box({
        parent: screen,
        top: 'center',
        left: 'center',
        width: 'shrink',
        height: 9
      });

      expect(container).toBeDefined();
      expect(container.options.top).toBe('center');
      expect(container.options.left).toBe('center');
      expect(container.options.width).toBe('shrink');
      expect(container.parent).toBe(screen);
    });

    it('should support shrink width', () => {
      const box = blessed.box({
        width: 'shrink',
        height: 10
      });

      screen.append(box);

      expect(box.options.width).toBe('shrink');
      expect(box.shrink).toBe(true);
    });

    it('should support prerender event for dynamic positioning', () => {
      const container = blessed.box({
        parent: screen,
        top: 'center',
        left: 'center',
        width: 'shrink'
      });

      let prerenderCalled = false;
      container.on('prerender', () => {
        prerenderCalled = true;
      });

      screen.render();

      expect(container.listeners('prerender').length).toBeGreaterThan(0);
    });
  });

  describe('multiplex.js example', () => {
    it('should support multiple screens', () => {
      const screen1 = blessed.screen({ smartCSR: true });
      const screen2 = blessed.screen({ smartCSR: true });

      const box1 = blessed.box({
        parent: screen1,
        content: 'Screen 1'
      });

      const box2 = blessed.box({
        parent: screen2,
        content: 'Screen 2'
      });

      expect(screen1).toBeDefined();
      expect(screen2).toBeDefined();
      expect(box1.parent).toBe(screen1);
      expect(box2.parent).toBe(screen2);

      screen1.destroy();
      screen2.destroy();
    });

    it('should allow switching between screens', () => {
      const screen1 = blessed.screen({ smartCSR: true });
      const screen2 = blessed.screen({ smartCSR: true });

      // Screens can be rendered independently
      screen1.render();
      screen2.render();

      expect(screen1.renders).toBeGreaterThan(0);
      expect(screen2.renders).toBeGreaterThan(0);

      screen1.destroy();
      screen2.destroy();
    });
  });

  describe('index.js example', () => {
    it('should support basic screen with text', () => {
      const box = blessed.box({
        parent: screen,
        top: 1,
        left: 'center',
        width: '50%',
        height: 3,
        content: 'Hello World',
        tags: true,
        border: {
          type: 'line'
        }
      });

      expect(box.content).toBe('Hello World');
      expect(box.options.tags).toBe(true);
      expect(box.border).toBeDefined();
    });

    it('should support percentage positioning', () => {
      const box = blessed.box({
        parent: screen,
        left: '25%',
        width: '50%',
        height: '50%'
      });

      expect(box.options.left).toBe('25%');
      expect(box.options.width).toBe('50%');
      expect(box.options.height).toBe('50%');
    });
  });

  describe('blessed-telnet.js example', () => {
    it('should support text with tags', () => {
      const text = blessed.text({
        parent: screen,
        content: '{bold}Bold{/bold} and {underline}underlined{/underline}',
        tags: true
      });

      expect(text.content).toContain('Bold');
      expect(text.content).toContain('underlined');
      expect(text.options.tags).toBe(true);
    });

    it('should support text widget', () => {
      const text = blessed.text({
        parent: screen,
        top: 0,
        left: 0,
        width: '100%',
        height: 1,
        content: 'Welcome'
      });

      expect(text.type).toBe('text');
      expect(text.content).toBe('Welcome');
    });
  });

  describe('ansi-viewer example', () => {
    it('should support ANSI color codes', () => {
      const box = blessed.box({
        parent: screen,
        content: '\x1b[31mRed text\x1b[0m',
        tags: false
      });

      expect(box.content).toContain('Red text');
    });

    it('should support scrollable text', () => {
      const scrollableText = blessed.scrollabletext({
        parent: screen,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        content: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5',
        scrollable: true,
        alwaysScroll: true
      });

      expect(scrollableText.type).toBe('scrollable-text');
      expect(scrollableText.scrollable).toBe(true);
      expect(scrollableText.alwaysScroll).toBe(true);
    });
  });

  describe('general integration', () => {
    it('should support rendering multiple widgets', () => {
      const box1 = blessed.box({
        parent: screen,
        top: 0,
        left: 0,
        width: '50%',
        height: '50%',
        content: 'Box 1'
      });

      const box2 = blessed.box({
        parent: screen,
        top: 0,
        left: '50%',
        width: '50%',
        height: '50%',
        content: 'Box 2'
      });

      const box3 = blessed.box({
        parent: screen,
        top: '50%',
        left: 0,
        width: '100%',
        height: '50%',
        content: 'Box 3'
      });

      screen.render();

      expect(screen.children).toContain(box1);
      expect(screen.children).toContain(box2);
      expect(screen.children).toContain(box3);
      expect(screen.children.length).toBe(3);
    });

    it('should support nested widgets', () => {
      const parent = blessed.box({
        parent: screen,
        width: '100%',
        height: '100%'
      });

      const child1 = blessed.box({
        parent: parent,
        top: 0,
        width: '50%',
        height: '50%'
      });

      const child2 = blessed.box({
        parent: parent,
        top: '50%',
        width: '50%',
        height: '50%'
      });

      expect(parent.children).toContain(child1);
      expect(parent.children).toContain(child2);
      expect(child1.parent).toBe(parent);
      expect(child2.parent).toBe(parent);
    });

    it('should support focus management', () => {
      const box1 = blessed.box({
        parent: screen,
        focusable: true
      });

      const box2 = blessed.box({
        parent: screen,
        focusable: true
      });

      box1.focus();
      expect(typeof box1.focus).toBe('function');
      expect(typeof box2.focus).toBe('function');
    });

    it('should support event handling', () => {
      const box = blessed.box({
        parent: screen
      });

      let eventFired = false;
      box.on('custom-event', () => {
        eventFired = true;
      });

      box.emit('custom-event');

      expect(eventFired).toBe(true);
    });

    it('should support screen keyboard shortcuts', () => {
      let quitCalled = false;

      screen.key('q', () => {
        quitCalled = true;
      });

      // Verify key handler is registered
      expect(screen.program.listeners('keypress').length).toBeGreaterThan(0);
    });

    it('should support content with styles', () => {
      const box = blessed.box({
        parent: screen,
        content: '{red-fg}Red{/red-fg} {blue-bg}Blue{/blue-bg}',
        tags: true,
        style: {
          fg: 'white',
          bg: 'black'
        }
      });

      expect(box.options.tags).toBe(true);
      expect(box.style.fg).toBe('white');
      expect(box.style.bg).toBe('black');
    });

    it('should support borders and padding', () => {
      const box = blessed.box({
        parent: screen,
        border: {
          type: 'line',
          fg: 'blue'
        },
        padding: {
          left: 2,
          right: 2,
          top: 1,
          bottom: 1
        }
      });

      expect(box.border).toBeDefined();
      expect(box.border.type).toBe('line');
      expect(box.padding).toBeDefined();
      expect(box.padding.left).toBe(2);
    });
  });

  describe('Complex Multi-Widget Integration', () => {
    it('should handle form with multiple input fields', () => {
      const form = blessed.form({
        parent: screen,
        top: 0,
        left: 0,
        width: '50%',
        height: 10,
        keys: true
      });

      const input1 = blessed.textbox({
        parent: form,
        name: 'username',
        top: 0,
        left: 0,
        width: '100%',
        height: 1
      });

      const input2 = blessed.textbox({
        parent: form,
        name: 'password',
        top: 2,
        left: 0,
        width: '100%',
        height: 1
      });

      const button = blessed.button({
        parent: form,
        name: 'submit',
        content: 'Submit',
        top: 4,
        left: 0,
        shrink: true
      });

      expect(form.children.length).toBe(3);
      expect(form.children).toContain(input1);
      expect(form.children).toContain(input2);
      expect(form.children).toContain(button);
    });

    it('should handle list with dynamic item addition', () => {
      const list = blessed.list({
        parent: screen,
        top: 0,
        left: 0,
        width: '50%',
        height: 10,
        items: ['Item 1', 'Item 2']
      });

      expect(list.items.length).toBe(2);

      list.addItem('Item 3');
      list.addItem('Item 4');

      expect(list.items.length).toBe(4);
      // Items are Box objects, check content instead
      expect(list.items[2].content).toBe('Item 3');
      expect(list.items[3].content).toBe('Item 4');
    });

    it('should handle table with data updates', () => {
      const table = blessed.table({
        parent: screen,
        top: 0,
        left: 0,
        width: '80%',
        height: 10,
        data: [
          ['Name', 'Age'],
          ['Alice', '30']
        ]
      });

      expect(table.rows.length).toBe(2);

      table.setData([
        ['Name', 'Age', 'City'],
        ['Alice', '30', 'NYC'],
        ['Bob', '25', 'LA']
      ]);

      expect(table.rows.length).toBe(3);
      expect(table.rows[0].length).toBe(3);
    });

    it('should handle textarea with scrolling', () => {
      const textarea = blessed.textarea({
        parent: screen,
        top: 0,
        left: 0,
        width: '50%',
        height: 10,
        scrollable: true
      });

      textarea.setValue('Line 1\nLine 2\nLine 3\nLine 4\nLine 5');

      expect(textarea.value).toContain('Line 1');
      expect(textarea.scrollable).toBe(true);
    });

    it('should handle nested layout with multiple containers', () => {
      const outerBox = blessed.box({
        parent: screen,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: { type: 'line' }
      });

      const leftPanel = blessed.box({
        parent: outerBox,
        left: 0,
        width: '50%',
        height: '100%'
      });

      const rightPanel = blessed.box({
        parent: outerBox,
        left: '50%',
        width: '50%',
        height: '100%'
      });

      const leftContent = blessed.box({
        parent: leftPanel,
        content: 'Left',
        top: 0
      });

      const rightContent = blessed.box({
        parent: rightPanel,
        content: 'Right',
        top: 0
      });

      expect(outerBox.children.length).toBe(2);
      expect(leftPanel.children.length).toBe(1);
      expect(rightPanel.children.length).toBe(1);
      expect(leftContent.content).toBe('Left');
      expect(rightContent.content).toBe('Right');
    });

    it('should handle progressbar with updates', () => {
      const progress = blessed.progressbar({
        parent: screen,
        top: 0,
        left: 0,
        width: '50%',
        height: 1,
        filled: 0
      });

      expect(progress.filled).toBe(0);

      progress.setProgress(50);
      expect(progress.filled).toBe(50);

      progress.setProgress(100);
      expect(progress.filled).toBe(100);
    });

    it('should handle message box with timeout', () => {
      const msg = blessed.message({
        parent: screen,
        top: 'center',
        left: 'center',
        width: '50%',
        height: 'shrink',
        border: { type: 'line' }
      });

      msg.display('Test message');

      expect(msg.content).toContain('Test message');
      expect(typeof msg.hide).toBe('function');
    });

    it('should handle log widget with multiple entries', () => {
      const log = blessed.log({
        parent: screen,
        top: 0,
        left: 0,
        width: '50%',
        height: 10,
        scrollable: true
      });

      log.log('Entry 1');
      log.log('Entry 2');
      log.log('Entry 3');

      expect(typeof log.log).toBe('function');
      expect(log.scrollable).toBe(true);
    });

    it('should handle checkbox with state changes', () => {
      const checkbox = blessed.checkbox({
        parent: screen,
        top: 0,
        left: 0,
        content: 'Accept terms',
        checked: false
      });

      expect(checkbox.checked).toBe(false);

      checkbox.check();
      expect(checkbox.checked).toBe(true);

      checkbox.uncheck();
      expect(checkbox.checked).toBe(false);
    });

    it('should handle radioset with multiple options', () => {
      const radioset = blessed.radioset({
        parent: screen,
        top: 0,
        left: 0,
        width: '50%',
        height: 10
      });

      const radio1 = blessed.radiobutton({
        parent: radioset,
        content: 'Option 1',
        top: 0
      });

      const radio2 = blessed.radiobutton({
        parent: radioset,
        content: 'Option 2',
        top: 1
      });

      const radio3 = blessed.radiobutton({
        parent: radioset,
        content: 'Option 3',
        top: 2
      });

      expect(radioset.children.length).toBe(3);
      expect(typeof radio1.check).toBe('function');
    });

    it('should handle complex form submission workflow', () => {
      const form = blessed.form({
        parent: screen,
        keys: true
      });

      const username = blessed.textbox({
        parent: form,
        name: 'username',
        top: 0
      });

      const email = blessed.textbox({
        parent: form,
        name: 'email',
        top: 2
      });

      const subscribe = blessed.checkbox({
        parent: form,
        name: 'subscribe',
        content: 'Subscribe',
        top: 4
      });

      const submitBtn = blessed.button({
        parent: form,
        name: 'submit',
        content: 'Submit',
        top: 6
      });

      let submitCalled = false;
      form.on('submit', (data) => {
        submitCalled = true;
      });

      form.submit();

      expect(submitCalled).toBe(true);
      expect(form.children.length).toBe(4);
    });

    it('should handle listbar with item selection', () => {
      const listbar = blessed.listbar({
        parent: screen,
        top: 0,
        left: 0,
        width: '100%',
        height: 1,
        style: {
          selected: { bg: 'blue' }
        }
      });

      listbar.setItems({
        'File': { keys: ['f'] },
        'Edit': { keys: ['e'] },
        'View': { keys: ['v'] }
      });

      expect(typeof listbar.selectTab).toBe('function');
    });

    it('should handle scrollablebox with content overflow', () => {
      const scrollbox = blessed.scrollablebox({
        parent: screen,
        top: 0,
        left: 0,
        width: '50%',
        height: 10,
        scrollable: true,
        alwaysScroll: true
      });

      const longContent = Array.from({ length: 50 }, (_, i) => `Line ${i + 1}`).join('\n');
      scrollbox.setContent(longContent);

      expect(scrollbox.scrollable).toBe(true);
      expect(scrollbox.alwaysScroll).toBe(true);
    });

    it('should handle question dialog', () => {
      const question = blessed.question({
        parent: screen,
        top: 'center',
        left: 'center',
        width: '50%',
        height: 'shrink',
        border: { type: 'line' }
      });

      question.ask('Are you sure?');

      expect(question.content).toContain('Are you sure?');
      expect(typeof question.ask).toBe('function');
    });

    it('should handle prompt for user input', () => {
      const prompt = blessed.prompt({
        parent: screen,
        top: 'center',
        left: 'center',
        width: '50%',
        height: 'shrink',
        border: { type: 'line' }
      });

      prompt.input('Enter name:');

      expect(prompt.content).toContain('Enter name:');
      expect(typeof prompt.input).toBe('function');
    });

    it('should handle loading indicator', () => {
      const loading = blessed.loading({
        parent: screen,
        top: 'center',
        left: 'center',
        width: '50%',
        height: 3,
        border: { type: 'line' }
      });

      loading.load('Processing...');

      expect(loading.content).toContain('Processing...');
      expect(typeof loading.stop).toBe('function');
    });

    it('should handle dynamic element visibility', () => {
      const box1 = blessed.box({
        parent: screen,
        top: 0,
        left: 0,
        width: 20,
        height: 5,
        content: 'Box 1',
        hidden: false
      });

      const box2 = blessed.box({
        parent: screen,
        top: 0,
        left: 0,
        width: 20,
        height: 5,
        content: 'Box 2',
        hidden: true
      });

      expect(box1.hidden).toBe(false);
      expect(box2.hidden).toBe(true);

      box1.hide();
      box2.show();

      expect(box1.hidden).toBe(true);
      expect(box2.hidden).toBe(false);
    });

    it('should handle element detachment and reattachment', () => {
      const container = blessed.box({
        parent: screen,
        width: '100%',
        height: '100%'
      });

      const child = blessed.box({
        parent: container,
        content: 'Child'
      });

      expect(container.children.length).toBe(1);
      expect(child.parent).toBe(container);

      child.detach();

      expect(container.children.length).toBe(0);
      expect(child.parent).toBe(null);

      container.append(child);

      expect(container.children.length).toBe(1);
      expect(child.parent).toBe(container);
    });

    it('should handle screen rendering with many elements', () => {
      for (let i = 0; i < 20; i++) {
        blessed.box({
          parent: screen,
          top: i,
          left: 0,
          width: 10,
          height: 1,
          content: `Box ${i}`
        });
      }

      expect(screen.children.length).toBe(20);

      screen.render();

      expect(screen.renders).toBeGreaterThan(0);
    });
  });
});