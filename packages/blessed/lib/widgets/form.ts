/**
 * form.ts - form element for blessed
 */

/**
 * Modules
 */

import type { FormOptions, KeyEvent } from '../types';
import Box from './box.js';

/**
 * Form
 *
 * @fires submit - Form is submitted. Receives a data object containing all form values.
 * @fires cancel - Form is canceled.
 * @fires reset - Form is reset to its initial state.
 */

class Form extends Box {
  type = 'form';
  _children: any;
  _selected: any;
  /**
   * The last data submitted by the form.
   * Contains values from all form elements (textboxes, checkboxes, etc.).
   *
   * @example
   * form.on('submit', () => {
   *   console.log(form.submission);
   * });
   */
  submission: any;

  constructor(options: FormOptions = {}) {
    options.ignoreKeys = true;
    super(options);

    if (options.keys) {
      this.screen._listenKeys(this);
      this.on('element keypress', (el: any, _ch: any, key: KeyEvent) => {
        if ((key.name === 'tab' && !key.shift)
            || (el.type === 'textbox' && options.autoNext && key.name === 'enter')
            || key.name === 'down'
            || (options.vi && key.name === 'j')) {
          if (el.type === 'textbox' || el.type === 'textarea') {
            if (key.name === 'j') return;
            if (key.name === 'tab') {
              // Workaround, since we can't stop the tab from being added.
              el.emit('keypress', null, { name: 'backspace' });
            }
            el.emit('keypress', '\x1b', { name: 'escape' });
          }
          // Set _selected to the element that triggered navigation if not set
          if (!this._selected) {
            this._selected = el;
          }
          this.focusNext();
          return;
        }

        if ((key.name === 'tab' && key.shift)
            || key.name === 'up'
            || (options.vi && key.name === 'k')) {
          if (el.type === 'textbox' || el.type === 'textarea') {
            if (key.name === 'k') return;
            el.emit('keypress', '\x1b', { name: 'escape' });
          }
          // Set _selected to the element that triggered navigation if not set
          if (!this._selected) {
            this._selected = el;
          }
          this.focusPrevious();
          return;
        }

        if (key.name === 'escape') {
          this.focus();
          return;
        }
      });
    }
  }

  _refresh() {
    // Always rebuild the children list to pick up any changes in keyable state or visibility
    const out: any[] = [];

    this.children.forEach((el: any) => {
      if (el.keyable && el.visible) out.push(el);
      el.children.forEach((child: any) => {
        if (child.keyable && child.visible) out.push(child);
      });
    });

    this._children = out;
  }

  _visible() {
    return !!this._children.length;
  }

  next(): any {
    this._refresh();

    if (!this._visible()) return;

    if (!this._selected) {
      this._selected = this._children[0];
      if (this.screen.focused !== this._selected) {
        return this._selected;
      }
    }

    const i = this._children.indexOf(this._selected);
    if (!~i || !this._children[i + 1]) {
      this._selected = this._children[0];
      return this._selected;
    }

    this._selected = this._children[i + 1];
    return this._selected;
  }

  previous(): any {
    this._refresh();

    if (!this._visible()) return;

    if (!this._selected) {
      this._selected = this._children[this._children.length - 1];
      if (this.screen.focused !== this._selected) return this._selected;
    }

    const i = this._children.indexOf(this._selected);
    if (!~i || !this._children[i - 1]) {
      this._selected = this._children[this._children.length - 1];
      return this._selected;
    }

    this._selected = this._children[i - 1];
    return this._selected;
  }

  /**
   * Focus the next form element.
   * Cycles through all visible and keyable child elements.
   *
   * @example
   * form.focusNext();
   */
  focusNext() {
    const next = this.next();
    if (next) next.focus();
  }

  /**
   * Focus the previous form element.
   * Cycles through all visible and keyable child elements.
   *
   * @example
   * form.focusPrevious();
   */
  focusPrevious() {
    const previous = this.previous();
    if (previous) previous.focus();
  }

  resetSelected() {
    this._selected = null;
  }

  focusFirst() {
    this.resetSelected();
    this.focusNext();
  }

  focusLast() {
    this.resetSelected();
    this.focusPrevious();
  }

  /**
   * Submit the form.
   * Collects values from all child elements and emits a 'submit' event.
   * Also sets the submission property with the collected data.
   *
   * @returns The collected form data object
   * @example
   * form.on('submit', (data) => {
   *   console.log('Form data:', data);
   * });
   * form.submit();
   */
  submit() {
    const out: any = {};

    this.children.forEach((el: any) => {
      if (el.value != null) {
        const name = el.name || el.type;
        if (Array.isArray(out[name])) {
          out[name].push(el.value);
        } else if (out[name]) {
          out[name] = [out[name], el.value];
        } else {
          out[name] = el.value;
        }
      }
      el.children.forEach((child: any) => {
        if (child.value != null) {
          const name = child.name || child.type;
          if (Array.isArray(out[name])) {
            out[name].push(child.value);
          } else if (out[name]) {
            out[name] = [out[name], child.value];
          } else {
            out[name] = child.value;
          }
        }
      });
    });

    this.emit('submit', out);

    return this.submission = out;
  }

  /**
   * Discard the form and emit a 'cancel' event.
   *
   * @example
   * form.cancel();
   */
  cancel() {
    this.emit('cancel');
  }

  /**
   * Clear the form.
   * Resets all child elements to their default state.
   * - Lists: select index 0
   * - Textboxes/Textareas: clear input
   * - Checkboxes/Radio buttons: uncheck
   * - Progress bars: set to 0
   * - File managers: refresh to original cwd
   *
   * @example
   * form.reset();
   */
  reset() {
    this.children.forEach((el: any) => {
      switch (el.type) {
        case 'screen':
          break;
        case 'box':
          break;
        case 'text':
          break;
        case 'line':
          break;
        case 'scrollable-box':
          break;
        case 'list':
          el.select(0);
          return;
        case 'form':
          break;
        case 'input':
          break;
        case 'textbox':
          el.clearInput();
          return;
        case 'textarea':
          el.clearInput();
          return;
        case 'button':
          delete el.value;
          break;
        case 'progress-bar':
          el.setProgress(0);
          break;
        case 'file-manager':
          el.refresh(el.options.cwd);
          return;
        case 'checkbox':
          el.uncheck();
          return;
        case 'radio-set':
          break;
        case 'radio-button':
          el.uncheck();
          return;
        case 'prompt':
          break;
        case 'question':
          break;
        case 'message':
          break;
        case 'info':
          break;
        case 'loading':
          break;
        case 'list-bar':
          //el.select(0);
          break;
        case 'dir-manager':
          el.refresh(el.options.cwd);
          return;
        case 'terminal':
          el.write('');
          return;
        case 'image':
          //el.clearImage();
          return;
      }
      el.children.forEach((child: any) => {
        switch (child.type) {
          case 'screen':
            break;
          case 'box':
            break;
          case 'text':
            break;
          case 'line':
            break;
          case 'scrollable-box':
            break;
          case 'list':
            child.select(0);
            return;
          case 'form':
            break;
          case 'input':
            break;
          case 'textbox':
            child.clearInput();
            return;
          case 'textarea':
            child.clearInput();
            return;
          case 'button':
            delete child.value;
            break;
          case 'progress-bar':
            child.setProgress(0);
            break;
          case 'file-manager':
            child.refresh(child.options.cwd);
            return;
          case 'checkbox':
            child.uncheck();
            return;
          case 'radio-set':
            break;
          case 'radio-button':
            child.uncheck();
            return;
          case 'prompt':
            break;
          case 'question':
            break;
          case 'message':
            break;
          case 'info':
            break;
          case 'loading':
            break;
          case 'list-bar':
            //child.select(0);
            break;
          case 'dir-manager':
            child.refresh(child.options.cwd);
            return;
          case 'terminal':
            child.write('');
            return;
          case 'image':
            //child.clearImage();
            return;
        }
      });
    });

    this.emit('reset');
  }
}

/**
 * Expose
 */

export default Form;
export { Form };
