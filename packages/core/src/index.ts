/**
 * @tui/core - Platform-agnostic TUI library
 *
 * This package contains all the core TUI logic without any platform-specific dependencies.
 * Platform adapters (@tui/node, @tui/browser) inject runtime implementations to provide
 * platform-specific functionality.
 */

export * from './runtime.js';
export { setRuntime, _clearRuntime } from './runtime-context.js';

// Re-export types
export * from './types/index.js';

// Re-export Program and Tput
export { default as Program } from './lib/program.js';
export { default as Tput, sprintf, tryRead } from './lib/tput.js';

// Re-export helpers
export * from './lib/helpers.js';
export * as colors from './lib/colors.js';
export * as unicode from './lib/unicode.js';
export * from './lib/alias.js';
export * from './lib/events.js';
export * from './lib/image-renderer.js';

// Re-export core widgets
export * from './widgets/node.js';
export * from './widgets/element.js';
export * from './widgets/box.js';
export * from './widgets/text.js';
export * from './widgets/line.js';

// Re-export input widgets
export * from './widgets/button.js';
export * from './widgets/checkbox.js';
export * from './widgets/input.js';
export * from './widgets/radiobutton.js';
export * from './widgets/radioset.js';
export * from './widgets/textarea.js';
export * from './widgets/textbox.js';

// Re-export scrollable widgets
export * from './widgets/scrollablebox.js';
export * from './widgets/scrollabletext.js';

// Re-export list widgets
export * from './widgets/list.js';
export * from './widgets/listbar.js';
export * from './widgets/listtable.js';

// Re-export form widget
export * from './widgets/form.js';

// Re-export layout widgets
export * from './widgets/layout.js';
export * from './widgets/table.js';

// Re-export UI widgets
export * from './widgets/loading.js';
export * from './widgets/log.js';
export * from './widgets/message.js';
export * from './widgets/progressbar.js';
export * from './widgets/prompt.js';
export * from './widgets/question.js';

// Re-export special widgets
export * from './widgets/bigtext.js';
export * from './widgets/filemanager.js';
export { default as Screen } from './widgets/screen.js';
export * from './widgets/image.js';
export * from './widgets/ansiimage.js';
export * from './widgets/overlayimage.js';

// NOTE: Terminal and Video widgets require additional Runtime abstraction
// They will be migrated in a later phase
