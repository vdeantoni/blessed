/**
 * blessed - a high-level terminal interface library for node.js
 */

/**
 * Blessed
 */

import ProgramClass from './program.js';
import Tput, { sprintf, tryRead } from './tput.js';
import widget from './widget.js';
import colors from './colors.js';
import unicode from './unicode.js';
import helpers from './helpers.js';

// Widget factory type - functions that create widget instances
type WidgetFactory<T> = {
  (options?: any): T;
  class: new (options?: any) => T;
  prototype: T;
};

interface BlessedFunction {
  (...args: any[]): ProgramClass;
  program(...args: any[]): ProgramClass;
  tput(...args: any[]): Tput;
  Program: typeof ProgramClass;
  Tput: typeof Tput;
  widget: typeof widget;
  colors: typeof colors;
  unicode: typeof unicode;
  helpers: typeof helpers & {
    sprintf: typeof sprintf;
    tryRead: typeof tryRead;
  };

  // Widget classes and factories (both capitalized and lowercase)
  Node: WidgetFactory<any>;
  node: WidgetFactory<any>;
  Screen: WidgetFactory<any>;
  screen: WidgetFactory<any>;
  Element: WidgetFactory<any>;
  element: WidgetFactory<any>;
  Box: WidgetFactory<any>;
  box: WidgetFactory<any>;
  Text: WidgetFactory<any>;
  text: WidgetFactory<any>;
  Line: WidgetFactory<any>;
  line: WidgetFactory<any>;
  ScrollableBox: WidgetFactory<any>;
  scrollablebox: WidgetFactory<any>;
  ScrollableText: WidgetFactory<any>;
  scrollabletext: WidgetFactory<any>;
  BigText: WidgetFactory<any>;
  bigtext: WidgetFactory<any>;
  List: WidgetFactory<any>;
  list: WidgetFactory<any>;
  Form: WidgetFactory<any>;
  form: WidgetFactory<any>;
  Input: WidgetFactory<any>;
  input: WidgetFactory<any>;
  Textarea: WidgetFactory<any>;
  textarea: WidgetFactory<any>;
  Textbox: WidgetFactory<any>;
  textbox: WidgetFactory<any>;
  Button: WidgetFactory<any>;
  button: WidgetFactory<any>;
  ProgressBar: WidgetFactory<any>;
  progressbar: WidgetFactory<any>;
  FileManager: WidgetFactory<any>;
  filemanager: WidgetFactory<any>;
  Checkbox: WidgetFactory<any>;
  checkbox: WidgetFactory<any>;
  RadioSet: WidgetFactory<any>;
  radioset: WidgetFactory<any>;
  RadioButton: WidgetFactory<any>;
  radiobutton: WidgetFactory<any>;
  Prompt: WidgetFactory<any>;
  prompt: WidgetFactory<any>;
  Question: WidgetFactory<any>;
  question: WidgetFactory<any>;
  Message: WidgetFactory<any>;
  message: WidgetFactory<any>;
  Loading: WidgetFactory<any>;
  loading: WidgetFactory<any>;
  Listbar: WidgetFactory<any>;
  listbar: WidgetFactory<any>;
  Log: WidgetFactory<any>;
  log: WidgetFactory<any>;
  Table: WidgetFactory<any>;
  table: WidgetFactory<any>;
  ListTable: WidgetFactory<any>;
  listtable: WidgetFactory<any>;
  Terminal: WidgetFactory<any>;
  terminal: WidgetFactory<any>;
  Image: WidgetFactory<any>;
  image: WidgetFactory<any>;
  ANSIImage: WidgetFactory<any>;
  ansiimage: WidgetFactory<any>;
  OverlayImage: WidgetFactory<any>;
  overlayimage: WidgetFactory<any>;
  Video: WidgetFactory<any>;
  video: WidgetFactory<any>;
  Layout: WidgetFactory<any>;
  layout: WidgetFactory<any>;

  // Aliases
  ListBar: WidgetFactory<any>;
  PNG: WidgetFactory<any>;
  png: WidgetFactory<any>;
}

function blessed(...args: any[]): ProgramClass {
  return new ProgramClass(...args);
}

// Factory functions for backward compatibility
(blessed as any).program = function (...args: any[]): ProgramClass {
  return new ProgramClass(...args);
};

(blessed as any).tput = function (...args: any[]): Tput {
  return new Tput(...args);
};

(blessed as any).Program = ProgramClass;
(blessed as any).Tput = Tput;
(blessed as any).widget = widget;
(blessed as any).colors = colors;
(blessed as any).unicode = unicode;
(blessed as any).helpers = helpers;
(blessed as any).helpers.sprintf = sprintf;
(blessed as any).helpers.tryRead = tryRead;
helpers.merge(blessed as any, helpers);
helpers.merge(blessed as any, widget);

/**
 * Expose
 */

export default blessed as BlessedFunction;
export { blessed as blessed };