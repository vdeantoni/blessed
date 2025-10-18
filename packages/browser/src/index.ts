/**
 * @tui/browser main entry point
 *
 * This package adapts @tui/core for browser use with XTerm.js integration.
 *
 * ## Usage
 *
 * Simply import widgets and use them - runtime auto-initializes:
 *
 * ```typescript
 * import { createXTermScreen, Box } from '@tui/browser';
 * import { Terminal } from 'xterm';
 *
 * // Create xterm instance
 * const term = new Terminal();
 * term.open(document.getElementById('terminal')!);
 *
 * // Create blessed screen and widgets
 * const screen = createXTermScreen({ terminal: term });
 * const box = new Box({ parent: screen, content: 'Hello!' });
 * screen.render();
 * ```
 */

// Initialize runtime BEFORE importing @tui/core (critical!)
import './runtime/auto-init.js';

// Re-export core blessed (runtime is now initialized)
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

/**
 * @deprecated Runtime now auto-initializes on import. This function is a no-op.
 * You can safely remove calls to `initBrowser()` from your code.
 */
export function initBrowser(): void {
  // Runtime auto-initializes when this module loads
  // This function kept for backward compatibility only
}

/**
 * @deprecated The `blessed` namespace with factory functions is deprecated.
 * Import widgets directly instead:
 *
 * ```typescript
 * // ❌ Deprecated
 * import { blessed } from '@tui/browser';
 * const box = blessed.box({ parent: screen });
 *
 * // ✅ Recommended
 * import { Box } from '@tui/browser';
 * const box = new Box({ parent: screen });
 * ```
 *
 * This namespace will be removed in v2.0.0.
 */
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
