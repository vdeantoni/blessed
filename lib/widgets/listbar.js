/**
 * listbar.js - listbar element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const helpers = require('../helpers');

const Node = require('./node');
const Box = require('./box');

/**
 * Listbar / HorizontalList
 */

class Listbar extends Box {
  type = 'listbar';

  get selected() {
    return this.leftBase + this.leftOffset;
  }

  constructor(options = {}) {
    super(options);

    this.items = [];
    this.ritems = [];
    this.commands = [];

    this.leftBase = 0;
    this.leftOffset = 0;

    this.mouse = options.mouse || false;

    if (!this.style.selected) {
      this.style.selected = {};
    }

    if (!this.style.item) {
      this.style.item = {};
    }

    if (options.commands || options.items) {
      this.setItems(options.commands || options.items);
    }

    if (options.keys) {
      this.on('keypress', (ch, key) => {
        if (key.name === 'left'
            || (options.vi && key.name === 'h')
            || (key.shift && key.name === 'tab')) {
          this.moveLeft();
          this.screen.render();
          // Stop propagation if we're in a form.
          if (key.name === 'tab') return false;
          return;
        }
        if (key.name === 'right'
            || (options.vi && key.name === 'l')
            || key.name === 'tab') {
          this.moveRight();
          this.screen.render();
          // Stop propagation if we're in a form.
          if (key.name === 'tab') return false;
          return;
        }
        if (key.name === 'enter'
            || (options.vi && key.name === 'k' && !key.shift)) {
          this.emit('action', this.items[this.selected], this.selected);
          this.emit('select', this.items[this.selected], this.selected);
          const item = this.items[this.selected];
          if (item._.cmd.callback) {
            item._.cmd.callback();
          }
          this.screen.render();
          return;
        }
        if (key.name === 'escape' || (options.vi && key.name === 'q')) {
          this.emit('action');
          this.emit('cancel');
          return;
        }
      });
    }

    if (options.autoCommandKeys) {
      this.onScreenEvent('keypress', (ch) => {
        if (/^[0-9]$/.test(ch)) {
          let i = +ch - 1;
          if (!~i) i = 9;
          return this.selectTab(i);
        }
      });
    }

    this.on('focus', () => {
      this.select(this.selected);
    });
  }

    setItems(commands) {
        if (!Array.isArray(commands)) {
            commands = Object.keys(commands).reduce((obj, key, i) => {
                let cmd = commands[key];
                let cb;

                if (typeof cmd === 'function') {
                    cb = cmd;
                    cmd = { callback: cb };
                }

                if (cmd.text == null) cmd.text = key;
                if (cmd.prefix == null) cmd.prefix = ++i + '';

                if (cmd.text == null && cmd.callback) {
                    cmd.text = cmd.callback.name;
                }

                obj.push(cmd);

                return obj;
            }, []);
        }

        this.items.forEach((el) => {
            el.detach();
        });

        this.items = [];
        this.ritems = [];
        this.commands = [];

        commands.forEach((cmd) => {
            this.add(cmd);
        });

        this.emit('set items');
    };

    appendItem(item, callback) {
        const prev = this.items[this.items.length - 1];
        let drawn;
        let cmd;
        let title;
        let len;

        if (!this.parent) {
            drawn = 0;
        } else {
            drawn = prev ? prev.aleft + prev.width : 0;
            if (!this.screen.autoPadding) {
                drawn += this.ileft;
            }
        }

        if (typeof item === 'object') {
            cmd = item;
            if (cmd.prefix == null) cmd.prefix = (this.items.length + 1) + '';
        }

        if (typeof item === 'string') {
            cmd = {
                prefix: (this.items.length + 1) + '',
                text: item,
                callback: callback
            };
        }

        if (typeof item === 'function') {
            cmd = {
                prefix: (this.items.length + 1) + '',
                text: item.name,
                callback: item
            };
        }

        if (cmd.keys && cmd.keys[0]) {
            cmd.prefix = cmd.keys[0];
        }

        const t = helpers.generateTags(this.style.prefix || { fg: 'lightblack' });

        title = (cmd.prefix != null ? t.open + cmd.prefix + t.close + ':' : '') + cmd.text;

        len = ((cmd.prefix != null ? cmd.prefix + ':' : '') + cmd.text).length;

        const options = {
            screen: this.screen,
            top: 0,
            left: drawn + 1,
            height: 1,
            content: title,
            width: len + 2,
            align: 'center',
            autoFocus: false,
            tags: true,
            mouse: true,
            style: helpers.merge({}, this.style.item),
            noOverflow: true
        };

        if (!this.screen.autoPadding) {
            options.top += this.itop;
            options.left += this.ileft;
        }

        ['bg', 'fg', 'bold', 'underline',
            'blink', 'inverse', 'invisible'].forEach((name) => {
            options.style[name] = () => {
                const attr = this.items[this.selected] === el
                    ? this.style.selected[name]
                    : this.style.item[name];
                if (typeof attr === 'function') attr = attr(el);
                return attr;
            };
        });

        const el = new Box(options);

        this._[cmd.text] = el;
        cmd.element = el;
        el._.cmd = cmd;

        this.ritems.push(cmd.text);
        this.items.push(el);
        this.commands.push(cmd);
        this.append(el);

        if (cmd.callback) {
            if (cmd.keys) {
                this.screen.key(cmd.keys, () => {
                    this.emit('action', el, this.selected);
                    this.emit('select', el, this.selected);
                    if (el._.cmd.callback) {
                        el._.cmd.callback();
                    }
                    this.select(el);
                    this.screen.render();
                });
            }
        }

        if (this.items.length === 1) {
            this.select(0);
        }

        // XXX May be affected by new element.options.mouse option.
        if (this.mouse) {
            el.on('click', () => {
                this.emit('action', el, this.selected);
                this.emit('select', el, this.selected);
                if (el._.cmd.callback) {
                    el._.cmd.callback();
                }
                this.select(el);
                this.screen.render();
            });
        }

        this.emit('add item');
    };

    render() {
        let drawn = 0;

        if (!this.screen.autoPadding) {
            drawn += this.ileft;
        }

        this.items.forEach((el, i) => {
            if (i < this.leftBase) {
                el.hide();
            } else {
                el.rleft = drawn + 1;
                drawn += el.width + 2;
                el.show();
            }
        });

        return super.render();
    };

    select(offset) {
        if (typeof offset !== 'number') {
            offset = this.items.indexOf(offset);
        }

        if (offset < 0) {
            offset = 0;
        } else if (offset >= this.items.length) {
            offset = this.items.length - 1;
        }

        if (!this.parent) {
            this.emit('select item', this.items[offset], offset);
            return;
        }

        const lpos = this._getCoords();
        if (!lpos) return;

        const width = (lpos.xl - lpos.xi) - this.iwidth;
        let drawn = 0;
        let visible = 0;
        let el;

        el = this.items[offset];
        if (!el) return;

        this.items.forEach((el, i) => {
            if (i < this.leftBase) return;

            const lpos = el._getCoords();
            if (!lpos) return;

            if (lpos.xl - lpos.xi <= 0) return;

            drawn += (lpos.xl - lpos.xi) + 2;

            if (drawn <= width) visible++;
        });

        let diff = offset - (this.leftBase + this.leftOffset);
        if (offset > this.leftBase + this.leftOffset) {
            if (offset > this.leftBase + visible - 1) {
                this.leftOffset = 0;
                this.leftBase = offset;
            } else {
                this.leftOffset += diff;
            }
        } else if (offset < this.leftBase + this.leftOffset) {
            diff = -diff;
            if (offset < this.leftBase) {
                this.leftOffset = 0;
                this.leftBase = offset;
            } else {
                this.leftOffset -= diff;
            }
        }

        // XXX Move `action` and `select` events here.
        this.emit('select item', el, offset);
    };

    removeItem(child) {
        var i = typeof child !== 'number'
            ? this.items.indexOf(child)
            : child;

        if (~i && this.items[i]) {
            child = this.items.splice(i, 1)[0];
            this.ritems.splice(i, 1);
            this.commands.splice(i, 1);
            this.remove(child);
            if (i === this.selected) {
                this.select(i - 1);
            }
        }

        this.emit('remove item');
    };

    move(offset) {
        this.select(this.selected + offset);
    };

    moveLeft(offset) {
        this.move(-(offset || 1));
    };

    moveRight(offset) {
        this.move(offset || 1);
    };

    selectTab(index) {
        var item = this.items[index];
        if (item) {
            if (item._.cmd.callback) {
                item._.cmd.callback();
            }
            this.select(index);
            this.screen.render();
        }
        this.emit('select tab', item, index);
    };

    add(item, callback) {
        return this.appendItem(item, callback);
    }

    addItem(item, callback) {
        return this.appendItem(item, callback);
    }
}

Listbar.prototype.add = Listbar.prototype.appendItem;
Listbar.prototype.addItem = Listbar.prototype.appendItem;

/**
 * Expose
 */

module.exports = Listbar;
