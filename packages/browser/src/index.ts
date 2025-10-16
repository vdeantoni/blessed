/**
 * blessed-browser main entry point
 *
 * This module adapts the blessed TUI library for browser use by:
 * 1. Auto-initializing Node.js polyfills (no consumer setup needed!)
 * 2. Inlining terminfo/termcap data
 * 3. Excluding non-browser-compatible widgets
 * 4. Providing xterm.js integration
 *
 * Simply import and use - zero configuration required!
 */

// IMPORTANT: Import auto-init first to set up environment
import './runtime/auto-init.js';

// Re-export core blessed (with polyfills applied)
export * from '@tui/core';

// Export xterm adapter
export { XTermAdapter, createXTermScreen } from './adapters/xterm-adapter.js';

// Import all widget classes for helper functions
import {
  Box,
  Text,
  Line,
  ScrollableBox,
  ScrollableText,
  List,
  Listbar,
  ListTable,
  Form,
  Button,
  Checkbox,
  Input,
  RadioButton,
  RadioSet,
  Textarea,
  Textbox,
  Layout,
  Table,
  Loading,
  Log,
  Message,
  ProgressBar,
  Prompt,
  Question,
  Screen,
  BigText,
  FileManager,
  Image,
  ANSIImage,
  OverlayImage,
} from '@tui/core';

// Create blessed namespace with helper functions
export const blessed = {
  // Core widgets
  box: (options?: any) => new Box(options),
  text: (options?: any) => new Text(options),
  line: (options?: any) => new Line(options),

  // Scrollable widgets
  scrollablebox: (options?: any) => new ScrollableBox(options),
  scrollabletext: (options?: any) => new ScrollableText(options),
  scrollable: (options?: any) => new ScrollableBox(options),

  // List widgets
  list: (options?: any) => new List(options),
  listbar: (options?: any) => new Listbar(options),
  listtable: (options?: any) => new ListTable(options),

  // Form widgets
  form: (options?: any) => new Form(options),
  button: (options?: any) => new Button(options),
  checkbox: (options?: any) => new Checkbox(options),
  input: (options?: any) => new Input(options),
  radiobutton: (options?: any) => new RadioButton(options),
  radioset: (options?: any) => new RadioSet(options),
  textarea: (options?: any) => new Textarea(options),
  textbox: (options?: any) => new Textbox(options),

  // Layout widgets
  layout: (options?: any) => new Layout(options),
  table: (options?: any) => new Table(options),

  // UI widgets
  loading: (options?: any) => new Loading(options),
  log: (options?: any) => new Log(options),
  message: (options?: any) => new Message(options),
  progressbar: (options?: any) => new ProgressBar(options),
  prompt: (options?: any) => new Prompt(options),
  question: (options?: any) => new Question(options),

  // Special widgets
  screen: (options?: any) => new Screen(options),
  bigtext: (options?: any) => new BigText(options),
  filemanager: (options?: any) => new FileManager(options),
  image: (options?: any) => new Image(options),
  ansiimage: (options?: any) => new ANSIImage(options),
  overlayimage: (options?: any) => new OverlayImage(options),

  // Widget classes (for instanceof checks)
  Box,
  Text,
  Line,
  ScrollableBox,
  ScrollableText,
  List,
  Listbar,
  ListTable,
  Form,
  Button,
  Checkbox,
  Input,
  RadioButton,
  RadioSet,
  Textarea,
  Textbox,
  Layout,
  Table,
  Loading,
  Log,
  Message,
  ProgressBar,
  Prompt,
  Question,
  Screen,
  BigText,
  FileManager,
  Image,
  ANSIImage,
  OverlayImage,
};

// Note: The following widgets are NOT available in browser build:
// - filemanager (uses fs extensively)
// - video (uses child_process)
// - ansiimage (uses child_process)
// - overlayimage (uses child_process)
// - bigtext (uses fs)
