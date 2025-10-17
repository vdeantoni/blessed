/**
 * video.ts - video element for blessed
 */

/**
 * Modules
 */

import type { VideoOptions } from '../types';
import cp from 'child_process';
import Box from './box.js';
import Terminal from './terminal.js';

/**
 * Video
 */

class Video extends Box {
  override type = 'video';
  /**
   * The terminal element running mplayer or mpv.
   * Provides access to the underlying terminal that executes the video player.
   */
  tty!: Terminal; // Set conditionally in constructor if mplayer/mpv exists
  now!: number; // Set conditionally in constructor
  start!: number; // Set conditionally in constructor

  constructor(options: VideoOptions = {}) {
    super(options);

    let shell: string;
    let args: string[];

    if (this.exists('mplayer')) {
      shell = 'mplayer';
      args = ['-vo', 'caca', '-quiet', options.file || ''];
    } else if (this.exists('mpv')) {
      shell = 'mpv';
      args = ['--vo', 'caca', '--really-quiet', options.file || ''];
    } else {
      this.parseTags = true;
      this.setContent(
        '{red-fg}{bold}Error:{/bold}' +
          ' mplayer or mpv not installed.{/red-fg}'
      );
      return this;
    }

    const opts: any = {
      parent: this,
      left: 0,
      top: 0,
      width: this.width - this.iwidth,
      height: this.height - this.iheight,
      shell: shell,
      args: args.slice(),
    };

    this.now = (Date.now() / 1000) | 0;
    this.start = opts.start || 0;
    if (this.start) {
      if (shell === 'mplayer') {
        opts.args.unshift('-ss', this.start + '');
      } else if (shell === 'mpv') {
        opts.args.unshift('--start', this.start + '');
      }
    }

    const DISPLAY = this.runtime.process.env.DISPLAY;
    delete this.runtime.process.env.DISPLAY;
    this.tty = new Terminal(opts);
    this.runtime.process.env.DISPLAY = DISPLAY;

    this.on('click', () => {
      this.tty.pty.write('p');
    });

    // mplayer/mpv cannot resize itself in the terminal, so we have
    // to restart it at the correct start time.
    this.on('resize', () => {
      this.tty.destroy();

      const opts: any = {
        parent: this,
        left: 0,
        top: 0,
        width: this.width - this.iwidth,
        height: this.height - this.iheight,
        shell: shell,
        args: args.slice(),
      };

      const watched = ((Date.now() / 1000) | 0) - this.now;
      this.now = (Date.now() / 1000) | 0;
      this.start += watched;
      if (shell === 'mplayer') {
        opts.args.unshift('-ss', this.start + '');
      } else if (shell === 'mpv') {
        opts.args.unshift('--start', this.start + '');
      }

      const DISPLAY = this.runtime.process.env.DISPLAY;
      delete this.runtime.process.env.DISPLAY;
      this.tty = new Terminal(opts);
      this.runtime.process.env.DISPLAY = DISPLAY;
      this.screen.render();
    });
  }

  exists(program: string): boolean {
    try {
      return !!+cp
        .execSync(
          'type ' + program + ' > /dev/null 2> /dev/null' + ' && echo 1',
          { encoding: 'utf8' }
        )
        .trim();
    } catch (e) {
      return false;
    }
  }
}

/**
 * Expose
 */

export default Video;
export { Video };
