/**
 * filemanager.ts - file manager element for blessed
 */

/**
 * Modules
 */

import type { FileManagerOptions } from '../types';
import helpers from '../lib/helpers.js';
import List from './list.js';
import { getEnvVar } from '../lib/runtime-helpers';

/**
 * FileManager
 */

class FileManager extends List {
  override type = 'file-manager';
  declare options: FileManagerOptions; // Type refinement - initialized by parent
  /**
   * The current working directory.
   *
   * @example
   * console.log(fileManager.cwd);
   * fileManager.cwd = '/home/user/documents';
   */
  cwd: string;
  file: string;
  override value: string;

  constructor(options: FileManagerOptions = {}) {
    options.parseTags = true;
    // options.label = ' {blue-fg}%path{/blue-fg} ';

    super(options);

    this.cwd = options.cwd || this.runtime.process.cwd();
    this.file = this.cwd;
    this.value = this.cwd;

    if (options.label && ~options.label.indexOf('%path')) {
      this._label.setContent(options.label.replace('%path', this.cwd));
    }

    this.on('select', (item: any) => {
      const value = item.content.replace(/\{[^{}]+\}/g, '').replace(/@$/, '');
      const file = this.runtime.path.resolve(this.cwd, value);

      return this.runtime.fs.stat(file, (err, stat) => {
        if (err) {
          return this.emit('error', err, file);
        }
        this.file = file;
        this.value = file;
        if (stat.isDirectory()) {
          this.emit('cd', file, this.cwd);
          this.cwd = file;
          if (options.label && ~options.label.indexOf('%path')) {
            this._label.setContent(options.label.replace('%path', file));
          }
          this.refresh();
        } else {
          this.emit('file', file);
        }
        return undefined;
      });
    });
  }

  /**
   * Refresh the file list.
   * Reads the directory (cwd) and updates the list of files.
   * Emits 'refresh' event when complete.
   *
   * @param cwd - Optional directory to read (defaults to current cwd)
   * @param callback - Optional callback function called when refresh completes
   * @example
   * fileManager.refresh((err) => {
   *   if (err) return console.error(err);
   *   console.log('Refreshed');
   * });
   */
  refresh(cwd?: any, callback?: any) {
    if (!callback) {
      callback = cwd;
      cwd = null;
    }

    if (cwd) this.cwd = cwd;
    else cwd = this.cwd;

    return this.runtime.fs.readdir(cwd, (err, list) => {
      if (err && err.code === 'ENOENT') {
        this.cwd = cwd !== getEnvVar("HOME") ? getEnvVar("HOME") || '/' : '/';
        return this.refresh(callback);
      }

      if (err) {
        if (callback) return callback(err);
        return this.emit('error', err, cwd);
      }

      let dirs: any[] = [];
      let files: any[] = [];

      list.unshift('..');

      list.forEach(name => {
        const f = this.runtime.path.resolve(cwd, name);
        let stat: any;

        try {
          stat = this.runtime.fs.lstatSync(f);
        } catch (e) {}

        if ((stat && stat.isDirectory()) || name === '..') {
          dirs.push({
            name: name,
            text: '{light-blue-fg}' + name + '{/light-blue-fg}/',
            dir: true,
          });
        } else if (stat && stat.isSymbolicLink()) {
          files.push({
            name: name,
            text: '{light-cyan-fg}' + name + '{/light-cyan-fg}@',
            dir: false,
          });
        } else {
          files.push({
            name: name,
            text: name,
            dir: false,
          });
        }
      });

      dirs = helpers.asort(dirs);
      files = helpers.asort(files);

      list = dirs.concat(files).map(data => {
        return data.text;
      });

      this.setItems(list);
      this.select(0);
      this.screen.render();

      this.emit('refresh');

      if (callback) callback();
    });
  }

  /**
   * Pick a single file and return the path.
   * Shows the file manager, waits for selection, then hides and returns result.
   * Emits 'file' event when file is selected, 'cancel' event when cancelled.
   *
   * @param cwd - Optional directory to start in (or callback if omitted)
   * @param callback - Callback function receiving (err, filePath)
   * @example
   * fileManager.pick((err, filePath) => {
   *   if (err) return console.error(err);
   *   if (filePath) console.log('Selected:', filePath);
   * });
   */
  override pick(cwd?: any, callback?: any) {
    if (!callback) {
      callback = cwd;
      cwd = null;
    }

    const focused = this.screen.focused === this;
    const hidden = this.hidden;
    let onfile: any, oncancel: any;

    const resume = () => {
      this.removeListener('file', onfile);
      this.removeListener('cancel', oncancel);
      if (hidden) {
        this.hide();
      }
      if (!focused) {
        this.screen.restoreFocus();
      }
      this.screen.render();
    };

    this.on(
      'file',
      (onfile = (file: any) => {
        resume();
        return callback(null, file);
      })
    );

    this.on(
      'cancel',
      (oncancel = () => {
        resume();
        return callback();
      })
    );

    this.refresh(cwd, (err: any) => {
      if (err) return callback(err);

      if (hidden) {
        this.show();
      }

      if (!focused) {
        this.screen.saveFocus();
        this.focus();
      }

      this.screen.render();
    });
  }

  /**
   * Reset the file manager to its original cwd.
   * Refreshes the file list for the reset directory.
   *
   * @param cwd - Optional directory to reset to (or callback if omitted)
   * @param callback - Optional callback function called when reset completes
   * @example
   * fileManager.reset((err) => {
   *   if (err) return console.error(err);
   *   console.log('Reset to original directory');
   * });
   */
  reset(cwd?: any, callback?: any) {
    if (!callback) {
      callback = cwd;
      cwd = null;
    }
    this.cwd = cwd || this.options.cwd;
    this.refresh(callback);
  }
}

/**
 * Expose
 */

export default FileManager;
export { FileManager };
