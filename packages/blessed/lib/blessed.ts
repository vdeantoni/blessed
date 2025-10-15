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

// Import widget classes for proper typing in BlessedFunction interface
import type Node from './widgets/node.js';
import type Screen from './widgets/screen.js';
import type Element from './widgets/element.js';
import type Box from './widgets/box.js';
import type Text from './widgets/text.js';
import type Line from './widgets/line.js';
import type ScrollableBox from './widgets/scrollablebox.js';
import type ScrollableText from './widgets/scrollabletext.js';
import type BigText from './widgets/bigtext.js';
import type List from './widgets/list.js';
import type Form from './widgets/form.js';
import type Input from './widgets/input.js';
import type Textarea from './widgets/textarea.js';
import type Textbox from './widgets/textbox.js';
import type Button from './widgets/button.js';
import type ProgressBar from './widgets/progressbar.js';
import type FileManager from './widgets/filemanager.js';
import type Checkbox from './widgets/checkbox.js';
import type RadioSet from './widgets/radioset.js';
import type RadioButton from './widgets/radiobutton.js';
import type Prompt from './widgets/prompt.js';
import type Question from './widgets/question.js';
import type Message from './widgets/message.js';
import type Loading from './widgets/loading.js';
import type Listbar from './widgets/listbar.js';
import type Log from './widgets/log.js';
import type Table from './widgets/table.js';
import type ListTable from './widgets/listtable.js';
import type Terminal from './widgets/terminal.js';
import type Image from './widgets/image.js';
import type ANSIImage from './widgets/ansiimage.js';
import type OverlayImage from './widgets/overlayimage.js';
import type Video from './widgets/video.js';
import type Layout from './widgets/layout.js';

// Widget factory type - functions that create widget instances
type WidgetFactory<T> = {
  (options?: any): T;
  class: new (options?: any) => T;
  prototype: T;
};

// Program options interface for BlessedProgram
export interface IBlessedProgramOptions {
  input?: NodeJS.ReadStream;
  output?: NodeJS.WriteStream;
  log?: string;
  dump?: boolean;
  zero?: boolean;
  buffer?: boolean;
  terminal?: string;
  term?: string;
  tput?: boolean;
  debug?: boolean;
  resizeTimeout?: number | false;
  [key: string]: any;
}

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
  Node: WidgetFactory<Node>;
  node: WidgetFactory<Node>;
  Screen: WidgetFactory<Screen>;
  screen: WidgetFactory<Screen>;
  Element: WidgetFactory<Element>;
  element: WidgetFactory<Element>;
  Box: WidgetFactory<Box>;
  box: WidgetFactory<Box>;
  Text: WidgetFactory<Text>;
  text: WidgetFactory<Text>;
  Line: WidgetFactory<Line>;
  line: WidgetFactory<Line>;
  ScrollableBox: WidgetFactory<ScrollableBox>;
  scrollablebox: WidgetFactory<ScrollableBox>;
  ScrollableText: WidgetFactory<ScrollableText>;
  scrollabletext: WidgetFactory<ScrollableText>;
  BigText: WidgetFactory<BigText>;
  bigtext: WidgetFactory<BigText>;
  List: WidgetFactory<List>;
  list: WidgetFactory<List>;
  Form: WidgetFactory<Form>;
  form: WidgetFactory<Form>;
  Input: WidgetFactory<Input>;
  input: WidgetFactory<Input>;
  Textarea: WidgetFactory<Textarea>;
  textarea: WidgetFactory<Textarea>;
  Textbox: WidgetFactory<Textbox>;
  textbox: WidgetFactory<Textbox>;
  Button: WidgetFactory<Button>;
  button: WidgetFactory<Button>;
  ProgressBar: WidgetFactory<ProgressBar>;
  progressbar: WidgetFactory<ProgressBar>;
  FileManager: WidgetFactory<FileManager>;
  filemanager: WidgetFactory<FileManager>;
  Checkbox: WidgetFactory<Checkbox>;
  checkbox: WidgetFactory<Checkbox>;
  RadioSet: WidgetFactory<RadioSet>;
  radioset: WidgetFactory<RadioSet>;
  RadioButton: WidgetFactory<RadioButton>;
  radiobutton: WidgetFactory<RadioButton>;
  Prompt: WidgetFactory<Prompt>;
  prompt: WidgetFactory<Prompt>;
  Question: WidgetFactory<Question>;
  question: WidgetFactory<Question>;
  Message: WidgetFactory<Message>;
  message: WidgetFactory<Message>;
  Loading: WidgetFactory<Loading>;
  loading: WidgetFactory<Loading>;
  Listbar: WidgetFactory<Listbar>;
  listbar: WidgetFactory<Listbar>;
  Log: WidgetFactory<Log>;
  log: WidgetFactory<Log>;
  Table: WidgetFactory<Table>;
  table: WidgetFactory<Table>;
  ListTable: WidgetFactory<ListTable>;
  listtable: WidgetFactory<ListTable>;
  Terminal: WidgetFactory<Terminal>;
  terminal: WidgetFactory<Terminal>;
  Image: WidgetFactory<Image>;
  image: WidgetFactory<Image>;
  ANSIImage: WidgetFactory<ANSIImage>;
  ansiimage: WidgetFactory<ANSIImage>;
  OverlayImage: WidgetFactory<OverlayImage>;
  overlayimage: WidgetFactory<OverlayImage>;
  Video: WidgetFactory<Video>;
  video: WidgetFactory<Video>;
  Layout: WidgetFactory<Layout>;
  layout: WidgetFactory<Layout>;

  // Aliases
  ListBar: WidgetFactory<Listbar>;
  PNG: WidgetFactory<ANSIImage>;
  png: WidgetFactory<ANSIImage>;
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

// Import widget types from barrel file
import type * as WidgetTypes from './widget-types.js';

/**
 * Widgets namespace - contains all widget classes, options, and utility types
 * This provides compatibility with @types/blessed
 */
export namespace Widgets {
  // Sub-namespace for utility types
  export namespace Types {
    export type TTopLeft = WidgetTypes.TTopLeft;
    export type TPosition = WidgetTypes.TPosition;
    export type TAlign = WidgetTypes.TAlign;
    export type TMouseAction = WidgetTypes.TMouseAction;
    export type TImage = WidgetTypes.TImage;
    export type TBorder = WidgetTypes.Border;
    export type TStyleBorder = WidgetTypes.StyleBorder;
    export type TCursor = WidgetTypes.Cursor;
    export type Effects = WidgetTypes.Effects;
    export type TStyle = WidgetTypes.Style;
  }

  // Sub-namespace for event types
  export namespace Events {
    export type IMouseEventArg = WidgetTypes.MouseEvent;
    export type IKeyEventArg = WidgetTypes.KeyEvent;
  }

  // Export all widget classes
  export type Node = WidgetTypes.Node;
  export type Screen = WidgetTypes.Screen;
  export type BlessedElement = WidgetTypes.Element;
  export type BoxElement = WidgetTypes.Box;
  export type TextElement = WidgetTypes.Text;
  export type LineElement = WidgetTypes.Line;
  export type ScrollableBoxElement = WidgetTypes.ScrollableBox;
  export type ScrollableTextElement = WidgetTypes.ScrollableText;
  export type BigTextElement = WidgetTypes.BigText;
  export type ListElement = WidgetTypes.List;
  export type FormElement = WidgetTypes.Form;
  export type InputElement = WidgetTypes.Input;
  export type TextareaElement = WidgetTypes.Textarea;
  export type TextboxElement = WidgetTypes.Textbox;
  export type ButtonElement = WidgetTypes.Button;
  export type ProgressBarElement = WidgetTypes.ProgressBar;
  export type FileManagerElement = WidgetTypes.FileManager;
  export type CheckboxElement = WidgetTypes.Checkbox;
  export type RadioSetElement = WidgetTypes.RadioSet;
  export type RadioButtonElement = WidgetTypes.RadioButton;
  export type PromptElement = WidgetTypes.Prompt;
  export type QuestionElement = WidgetTypes.Question;
  export type MessageElement = WidgetTypes.Message;
  export type LoadingElement = WidgetTypes.Loading;
  export type ListbarElement = WidgetTypes.Listbar;
  export type Log = WidgetTypes.Log;
  export type TableElement = WidgetTypes.Table;
  export type ListTableElement = WidgetTypes.ListTable;
  export type TerminalElement = WidgetTypes.Terminal;
  export type ImageElement = WidgetTypes.Image;
  export type ANSIImageElement = WidgetTypes.ANSIImage;
  export type OverlayImageElement = WidgetTypes.OverlayImage;
  export type VideoElement = WidgetTypes.Video;
  export type LayoutElement = WidgetTypes.Layout;
  export type Program = WidgetTypes.Program;

  // Export all option interfaces
  export type INodeOptions = WidgetTypes.NodeOptions;
  export type IScreenOptions = WidgetTypes.ScreenOptions;
  export type ElementOptions = WidgetTypes.ElementOptions;
  export type ScrollableOptions = WidgetTypes.ScrollableOptions;
  export type ScrollableBoxOptions = WidgetTypes.ScrollableBoxOptions;
  export type ScrollableTextOptions = WidgetTypes.ScrollableTextOptions;
  export type BoxOptions = WidgetTypes.BoxOptions;
  export type TextOptions = WidgetTypes.TextOptions;
  export type LineOptions = WidgetTypes.LineOptions;
  export type BigTextOptions = WidgetTypes.BigTextOptions;
  export type ListOptions<TStyle extends WidgetTypes.ListElementStyle = WidgetTypes.ListElementStyle> = WidgetTypes.ListOptions<TStyle>;
  export type FormOptions = WidgetTypes.FormOptions;
  export type InputOptions = WidgetTypes.InputOptions;
  export type TextareaOptions = WidgetTypes.TextareaOptions;
  export type TextboxOptions = WidgetTypes.TextboxOptions;
  export type ButtonOptions = WidgetTypes.ButtonOptions;
  export type ProgressBarOptions = WidgetTypes.ProgressBarOptions;
  export type FileManagerOptions = WidgetTypes.FileManagerOptions;
  export type CheckboxOptions = WidgetTypes.CheckboxOptions;
  export type RadioSetOptions = WidgetTypes.RadioSetOptions;
  export type RadioButtonOptions = WidgetTypes.RadioButtonOptions;
  export type PromptOptions = WidgetTypes.PromptOptions;
  export type QuestionOptions = WidgetTypes.QuestionOptions;
  export type MessageOptions = WidgetTypes.MessageOptions;
  export type LoadingOptions = WidgetTypes.LoadingOptions;
  export type ListbarOptions = WidgetTypes.ListbarOptions;
  export type LogOptions = WidgetTypes.LogOptions;
  export type TableOptions = WidgetTypes.TableOptions;
  export type ListTableOptions = WidgetTypes.ListTableOptions;
  export type TerminalOptions = WidgetTypes.TerminalOptions;
  export type ImageOptions = WidgetTypes.ImageOptions;
  export type ANSIImageOptions = WidgetTypes.ANSIImageOptions;
  export type OverlayImageOptions = WidgetTypes.OverlayImageOptions;
  export type VideoOptions = WidgetTypes.VideoOptions;
  export type LayoutOptions = WidgetTypes.LayoutOptions;

  // Export style types
  export type Style = WidgetTypes.Style;
  export type StyleBorder = WidgetTypes.StyleBorder;
  export type Effects = WidgetTypes.Effects;
  export type ListElementStyle = WidgetTypes.ListElementStyle;
  export type StyleListTable = WidgetTypes.StyleListTable;
  export type ProgressBarStyle = WidgetTypes.ProgressBarStyle;

  // Export common types
  export type Border = WidgetTypes.Border;
  export type Padding = WidgetTypes.Padding;
  export type Position = WidgetTypes.Position;
  export type PositionCoords = WidgetTypes.PositionCoords;
  export type Coords = WidgetTypes.Coords;
  export type RenderCoords = WidgetTypes.RenderCoords;
  export type Cursor = WidgetTypes.Cursor;
  export type LabelOptions = WidgetTypes.LabelOptions;
  export type ScrollbarConfig = WidgetTypes.ScrollbarConfig;
  export type TrackConfig = WidgetTypes.TrackConfig;

  // Export event types
  export type MouseEvent = WidgetTypes.MouseEvent;
  export type KeyEvent = WidgetTypes.KeyEvent;
  export type NodeEventType = WidgetTypes.NodeEventType;
  export type NodeScreenEventType = WidgetTypes.NodeScreenEventType;
  export type NodeMouseEventType = WidgetTypes.NodeMouseEventType;
  export type NodeGenericEventType = WidgetTypes.NodeGenericEventType;
  export type ListElementEventType = WidgetTypes.ListElementEventType;
  export type TextareaElementEventType = WidgetTypes.TextareaElementEventType;
}

/**
 * Named exports for all factory functions
 */
const blessedTyped = blessed as BlessedFunction;

export const screen = blessedTyped.screen;
export const box = blessedTyped.box;
export const text = blessedTyped.text;
export const line = blessedTyped.line;
export const scrollablebox = blessedTyped.scrollablebox;
export const scrollabletext = blessedTyped.scrollabletext;
export const bigtext = blessedTyped.bigtext;
export const list = blessedTyped.list;
export const form = blessedTyped.form;
export const input = blessedTyped.input;
export const textarea = blessedTyped.textarea;
export const textbox = blessedTyped.textbox;
export const button = blessedTyped.button;
export const progressbar = blessedTyped.progressbar;
export const filemanager = blessedTyped.filemanager;
export const checkbox = blessedTyped.checkbox;
export const radioset = blessedTyped.radioset;
export const radiobutton = blessedTyped.radiobutton;
export const prompt = blessedTyped.prompt;
export const question = blessedTyped.question;
export const message = blessedTyped.message;
export const loading = blessedTyped.loading;
export const listbar = blessedTyped.listbar;
export const log = blessedTyped.log;
export const table = blessedTyped.table;
export const listtable = blessedTyped.listtable;
export const terminal = blessedTyped.terminal;
export const image = blessedTyped.image;
export const ansiimage = blessedTyped.ansiimage;
export const overlayimage = blessedTyped.overlayimage;
export const video = blessedTyped.video;
export const layout = blessedTyped.layout;

// Program factory function
export const program = blessedTyped.program;

// Helper function exports
export const escape = helpers.escape;
export const stripTags = helpers.stripTags;
export const cleanTags = helpers.cleanTags;
export const generateTags = helpers.generateTags;
export const parseTags = helpers.parseTags;

// Export colors
export { colors };

// Export Program class as BlessedProgram
export { ProgramClass as BlessedProgram };

/**
 * Expose
 */
export default blessed as BlessedFunction;
export { blessed as blessed };
