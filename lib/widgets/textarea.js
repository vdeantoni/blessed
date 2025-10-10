/**
 * textarea.js - textarea element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import unicode from '../unicode.js';
import Input from './input.js';

const nextTick = global.setImmediate || process.nextTick.bind(process);

/**
 * Textarea
 */

class Textarea extends Input {
  type = 'textarea';

  constructor(options = {}) {
    options.scrollable = options.scrollable !== false;

    super(options);

    this.scrollable = options.scrollable;
    this.screen._listenKeys(this);

    this.value = options.value || '';

    this.__updateCursor = this._updateCursor.bind(this);
    this.on('resize', this.__updateCursor);
    this.on('move', this.__updateCursor);

    if (options.inputOnFocus) {
      this.on('focus', this.readInput.bind(this, null));
    }

    if (!options.inputOnFocus && options.keys) {
      this.on('keypress', (ch, key) => {
        if (this._reading) return;
        if (key.name === 'enter' || (options.vi && key.name === 'i')) {
          return this.readInput();
        }
        if (key.name === 'e') {
          return this.readEditor();
        }
      });
    }

    if (options.mouse) {
      this.on('click', (data) => {
        if (this._reading) return;
        if (data.button !== 'right') return;
        this.readEditor();
      });
    }
  }

  _updateCursor(get) {
    if (this.screen.focused !== this) {
      return;
    }

    const lpos = get ? this.lpos : this._getCoords();
    if (!lpos) return;

    let last = this._clines[this._clines.length - 1];
    const program = this.screen.program;
    let line;
    let cx;
    let cy;

    // Stop a situation where the textarea begins scrolling
    // and the last cline appears to always be empty from the
    // _typeScroll `+ '\n'` thing.
    // Maybe not necessary anymore?
    if (last === '' && this.value[this.value.length - 1] !== '\n') {
      last = this._clines[this._clines.length - 2] || '';
    }

    line = Math.min(
      this._clines.length - 1 - (this.childBase || 0),
      (lpos.yl - lpos.yi) - this.iheight - 1);

    // When calling clearValue() on a full textarea with a border, the first
    // argument in the above Math.min call ends up being -2. Make sure we stay
    // positive.
    line = Math.max(0, line);

    cy = lpos.yi + this.itop + line;
    cx = lpos.xi + this.ileft + this.strWidth(last);

    // XXX Not sure, but this may still sometimes
    // cause problems when leaving editor.
    if (cy === program.y && cx === program.x) {
      return;
    }

    if (cy === program.y) {
      if (cx > program.x) {
        program.cuf(cx - program.x);
      } else if (cx < program.x) {
        program.cub(program.x - cx);
      }
    } else if (cx === program.x) {
      if (cy > program.y) {
        program.cud(cy - program.y);
      } else if (cy < program.y) {
        program.cuu(program.y - cy);
      }
    } else {
      program.cup(cy, cx);
    }
  }

  readInput(callback) {
    const focused = this.screen.focused === this;

    if (this._reading) return;
    this._reading = true;

    this._callback = callback;

    if (!focused) {
      this.screen.saveFocus();
      this.focus();
    }

    this.screen.grabKeys = true;

    this._updateCursor();
    this.screen.program.showCursor();
    //this.screen.program.sgr('normal');

    this._done = (err, value) => {
      if (!this._reading) return;

      if (this._done.done) return;
      this._done.done = true;

      this._reading = false;

      delete this._callback;
      delete this._done;

      this.removeListener('keypress', this.__listener);
      delete this.__listener;

      this.removeListener('blur', this.__done);
      delete this.__done;

      this.screen.program.hideCursor();
      this.screen.grabKeys = false;

      if (!focused) {
        this.screen.restoreFocus();
      }

      if (this.options.inputOnFocus) {
        this.screen.rewindFocus();
      }

      // Ugly
      if (err === 'stop') return;

      if (err) {
        this.emit('error', err);
      } else if (value != null) {
        this.emit('submit', value);
      } else {
        this.emit('cancel', value);
      }
      this.emit('action', value);

      if (!callback) return;

      return err
        ? callback(err)
        : callback(null, value);
    };

    // Put this in a nextTick so the current
    // key event doesn't trigger any keys input.
    nextTick(() => {
      this.__listener = this._listener.bind(this);
      this.on('keypress', this.__listener);
    });

    this.__done = this._done.bind(this, null, null);
    this.on('blur', this.__done);
  }

  get input() {
    return this.readInput;
  }

  get setInput() {
    return this.readInput;
  }

  _listener(ch, key) {
    const done = this._done;
    const value = this.value;

    if (key.name === 'return') return;
    if (key.name === 'enter') {
      ch = '\n';
    }

    // TODO: Handle directional keys.
    if (key.name === 'left' || key.name === 'right'
        || key.name === 'up' || key.name === 'down') {
      ;
    }

    if (this.options.keys && key.ctrl && key.name === 'e') {
      return this.readEditor();
    }

    // TODO: Optimize typing by writing directly
    // to the screen and screen buffer here.
    if (key.name === 'escape') {
      if (done) done(null, null);
    } else if (key.name === 'backspace') {
      if (this.value.length) {
        if (this.screen.fullUnicode) {
          if (unicode.isSurrogate(this.value, this.value.length - 2)) {
          // || unicode.isCombining(this.value, this.value.length - 1)) {
            this.value = this.value.slice(0, -2);
          } else {
            this.value = this.value.slice(0, -1);
          }
        } else {
          this.value = this.value.slice(0, -1);
        }
      }
    } else if (ch) {
      if (!/^[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]$/.test(ch)) {
        this.value += ch;
      }
    }

    if (this.value !== value) {
      this.screen.render();
    }
  }

  _typeScroll() {
    // XXX Workaround
    const height = this.height - this.iheight;
    if (this._clines.length - this.childBase > height) {
      this.scroll(this._clines.length);
    }
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    if (value == null) {
      value = this.value;
    }
    if (this._value !== value) {
      this.value = value;
      this._value = value;
      this.setContent(this.value);
      this._typeScroll();
      this._updateCursor();
    }
  }

  clearValue() {
    return this.setValue('');
  }

  get clearInput() {
    return this.clearValue;
  }

  submit() {
    if (!this.__listener) return;
    return this.__listener('\x1b', { name: 'escape' });
  }

  cancel() {
    if (!this.__listener) return;
    return this.__listener('\x1b', { name: 'escape' });
  }

  render() {
    this.setValue();
    return super.render();
  }

  readEditor(callback) {
    if (this._reading) {
      const _cb = this._callback;
      const cb = callback;

      this._done('stop');

      callback = (err, value) => {
        if (_cb) _cb(err, value);
        if (cb) cb(err, value);
      };
    }

    if (!callback) {
      callback = () => {};
    }

    return this.screen.readEditor({ value: this.value }, (err, value) => {
      if (err) {
        if (err.message === 'Unsuccessful.') {
          this.screen.render();
          return this.readInput(callback);
        }
        this.screen.render();
        this.readInput(callback);
        return callback(err);
      }
      this.setValue(value);
      this.screen.render();
      return this.readInput(callback);
    });
  }

  get editor() {
    return this.readEditor;
  }

  get setEditor() {
    return this.readEditor;
  }
}

/**
 * Expose
 */

export default Textarea;
export { Textarea };

