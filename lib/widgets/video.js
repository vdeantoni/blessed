/**
 * video.js - video element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const cp = require('child_process');

const Node = require('./node');
const Box = require('./box');
const Terminal = require('./terminal');

/**
 * Video
 */

class Video extends Box {
  type = 'video';

  constructor(options = {}) {
    super(options);

    let shell;
    let args;

    if (this.exists('mplayer')) {
      shell = 'mplayer';
      args = ['-vo', 'caca', '-quiet', options.file];
    } else if (this.exists('mpv')) {
      shell = 'mpv';
      args = ['--vo', 'caca', '--really-quiet', options.file];
    } else {
      this.parseTags = true;
      this.setContent('{red-fg}{bold}Error:{/bold}'
        + ' mplayer or mpv not installed.{/red-fg}');
      return this;
    }

    const opts = {
      parent: this,
      left: 0,
      top: 0,
      width: this.width - this.iwidth,
      height: this.height - this.iheight,
      shell: shell,
      args: args.slice()
    };

    this.now = Date.now() / 1000 | 0;
    this.start = opts.start || 0;
    if (this.start) {
      if (shell === 'mplayer') {
        opts.args.unshift('-ss', this.start + '');
      } else if (shell === 'mpv') {
        opts.args.unshift('--start', this.start + '');
      }
    }

    const DISPLAY = process.env.DISPLAY;
    delete process.env.DISPLAY;
    this.tty = new Terminal(opts);
    process.env.DISPLAY = DISPLAY;

    this.on('click', () => {
      this.tty.pty.write('p');
    });

    // mplayer/mpv cannot resize itself in the terminal, so we have
    // to restart it at the correct start time.
    this.on('resize', () => {
      this.tty.destroy();

      const opts = {
        parent: this,
        left: 0,
        top: 0,
        width: this.width - this.iwidth,
        height: this.height - this.iheight,
        shell: shell,
        args: args.slice()
      };

      const watched = (Date.now() / 1000 | 0) - this.now;
      this.now = Date.now() / 1000 | 0;
      this.start += watched;
      if (shell === 'mplayer') {
        opts.args.unshift('-ss', this.start + '');
      } else if (shell === 'mpv') {
        opts.args.unshift('--start', this.start + '');
      }

      const DISPLAY = process.env.DISPLAY;
      delete process.env.DISPLAY;
      this.tty = new Terminal(opts);
      process.env.DISPLAY = DISPLAY;
      this.screen.render();
    });
  }

    exists(program) {
        try {
            return !!+cp.execSync('type '
                + program + ' > /dev/null 2> /dev/null'
                + ' && echo 1', { encoding: 'utf8' }).trim();
        } catch (e) {
            return false;
        }
    }
}

/**
 * Expose
 */

module.exports = Video;
