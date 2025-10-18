/**
 * @tuxe/blessed - 100% backward compatible blessed API
 *
 * This package wraps @tuxe/node to provide the exact same API as the original
 * blessed library. It's a drop-in replacement for users migrating from blessed.
 */

import * as TuxeTypes from '@tuxe/node';
export * from '@tuxe/node';

// Runtime auto-initializes when @tuxe/node is imported

/**
 * WidgetFactory type - matches old blessed pattern
 * Factory function + class constructor + prototype
 */
export type WidgetFactory<T> = {
  (options?: any): T;
  class: new (options?: any) => T;
  prototype: T;
};

/**
 * Helper to create a WidgetFactory from a class
 */
function createWidgetFactory<T>(
  WidgetClass: new (options?: any) => T
): WidgetFactory<T> {
  const factory = (options?: any) => new WidgetClass(options);
  (factory as any).class = WidgetClass;
  (factory as any).prototype = WidgetClass.prototype;
  return factory as WidgetFactory<T>;
}

/**
 * BlessedFunction interface - matches old blessed structure
 */
export interface BlessedFunction {
  // Callable - creates Program
  (...args: any[]): TuxeTypes.Program;

  // Methods
  program(...args: any[]): TuxeTypes.Program;
  tput(...args: any[]): TuxeTypes.Tput;

  // Classes
  Program: typeof TuxeTypes.Program;
  Tput: typeof TuxeTypes.Tput;

  // Utilities
  colors: typeof TuxeTypes.colors;
  unicode: typeof TuxeTypes.unicode;
  helpers: typeof TuxeTypes & {
    sprintf: typeof TuxeTypes.sprintf;
    tryRead: typeof TuxeTypes.tryRead;
  };

  // Widget factories (PascalCase)
  Node: WidgetFactory<TuxeTypes.Node>;
  Screen: WidgetFactory<TuxeTypes.Screen>;
  Element: WidgetFactory<TuxeTypes.Element>;
  Box: WidgetFactory<TuxeTypes.Box>;
  Text: WidgetFactory<TuxeTypes.Text>;
  Line: WidgetFactory<TuxeTypes.Line>;
  ScrollableBox: WidgetFactory<TuxeTypes.ScrollableBox>;
  ScrollableText: WidgetFactory<TuxeTypes.ScrollableText>;
  BigText: WidgetFactory<TuxeTypes.BigText>;
  List: WidgetFactory<TuxeTypes.List>;
  Form: WidgetFactory<TuxeTypes.Form>;
  Input: WidgetFactory<TuxeTypes.Input>;
  Textarea: WidgetFactory<TuxeTypes.Textarea>;
  Textbox: WidgetFactory<TuxeTypes.Textbox>;
  Button: WidgetFactory<TuxeTypes.Button>;
  ProgressBar: WidgetFactory<TuxeTypes.ProgressBar>;
  FileManager: WidgetFactory<TuxeTypes.FileManager>;
  Checkbox: WidgetFactory<TuxeTypes.Checkbox>;
  RadioSet: WidgetFactory<TuxeTypes.RadioSet>;
  RadioButton: WidgetFactory<TuxeTypes.RadioButton>;
  Prompt: WidgetFactory<TuxeTypes.Prompt>;
  Question: WidgetFactory<TuxeTypes.Question>;
  Message: WidgetFactory<TuxeTypes.Message>;
  Loading: WidgetFactory<TuxeTypes.Loading>;
  Listbar: WidgetFactory<TuxeTypes.Listbar>;
  Log: WidgetFactory<TuxeTypes.Log>;
  Table: WidgetFactory<TuxeTypes.Table>;
  ListTable: WidgetFactory<TuxeTypes.ListTable>;
  Image: WidgetFactory<TuxeTypes.Image>;
  ANSIImage: WidgetFactory<TuxeTypes.ANSIImage>;
  OverlayImage: WidgetFactory<TuxeTypes.OverlayImage>;
  Layout: WidgetFactory<TuxeTypes.Layout>;

  // Widget factories (lowercase)
  node: WidgetFactory<TuxeTypes.Node>;
  screen: WidgetFactory<TuxeTypes.Screen>;
  element: WidgetFactory<TuxeTypes.Element>;
  box: WidgetFactory<TuxeTypes.Box>;
  text: WidgetFactory<TuxeTypes.Text>;
  line: WidgetFactory<TuxeTypes.Line>;
  scrollablebox: WidgetFactory<TuxeTypes.ScrollableBox>;
  scrollabletext: WidgetFactory<TuxeTypes.ScrollableText>;
  bigtext: WidgetFactory<TuxeTypes.BigText>;
  list: WidgetFactory<TuxeTypes.List>;
  form: WidgetFactory<TuxeTypes.Form>;
  input: WidgetFactory<TuxeTypes.Input>;
  textarea: WidgetFactory<TuxeTypes.Textarea>;
  textbox: WidgetFactory<TuxeTypes.Textbox>;
  button: WidgetFactory<TuxeTypes.Button>;
  progressbar: WidgetFactory<TuxeTypes.ProgressBar>;
  filemanager: WidgetFactory<TuxeTypes.FileManager>;
  checkbox: WidgetFactory<TuxeTypes.Checkbox>;
  radioset: WidgetFactory<TuxeTypes.RadioSet>;
  radiobutton: WidgetFactory<TuxeTypes.RadioButton>;
  prompt: WidgetFactory<TuxeTypes.Prompt>;
  question: WidgetFactory<TuxeTypes.Question>;
  message: WidgetFactory<TuxeTypes.Message>;
  loading: WidgetFactory<TuxeTypes.Loading>;
  listbar: WidgetFactory<TuxeTypes.Listbar>;
  log: WidgetFactory<TuxeTypes.Log>;
  table: WidgetFactory<TuxeTypes.Table>;
  listtable: WidgetFactory<TuxeTypes.ListTable>;
  image: WidgetFactory<TuxeTypes.Image>;
  ansiimage: WidgetFactory<TuxeTypes.ANSIImage>;
  overlayimage: WidgetFactory<TuxeTypes.OverlayImage>;
  layout: WidgetFactory<TuxeTypes.Layout>;
}

/**
 * Widgets namespace - contains all widget types and options
 * Provides compatibility with @types/blessed
 */
export namespace Widgets {
  // Type aliases for backward compatibility
  export namespace Types {
    export type TTopLeft = TuxeTypes.PositionValue;
    export type TPosition = TuxeTypes.PositionValue;
    export type TAlign = TuxeTypes.Alignment;
    export type TMouseAction = TuxeTypes.MouseAction;
    export type TBorder = TuxeTypes.Border;
    export type TStyleBorder = TuxeTypes.StyleBorder;
    export type TCursor = TuxeTypes.Cursor;
    export type Effects = TuxeTypes.Effects;
    export type TStyle = TuxeTypes.Style;
    export type TImage = TuxeTypes.ImageData;
  }

  export namespace Events {
    export type IMouseEventArg = TuxeTypes.MouseEvent;
    export type IKeyEventArg = TuxeTypes.KeyEvent;
  }

  // Widget class types
  export type Node = TuxeTypes.Node;
  export type Screen = TuxeTypes.Screen;
  export type BlessedElement = TuxeTypes.Element;
  export type Element = TuxeTypes.Element;
  export type BoxElement = TuxeTypes.Box;
  export type Box = TuxeTypes.Box;
  export type TextElement = TuxeTypes.Text;
  export type Text = TuxeTypes.Text;
  export type LineElement = TuxeTypes.Line;
  export type Line = TuxeTypes.Line;
  export type ScrollableBoxElement = TuxeTypes.ScrollableBox;
  export type ScrollableBox = TuxeTypes.ScrollableBox;
  export type ScrollableTextElement = TuxeTypes.ScrollableText;
  export type ScrollableText = TuxeTypes.ScrollableText;
  export type BigTextElement = TuxeTypes.BigText;
  export type BigText = TuxeTypes.BigText;
  export type ListElement = TuxeTypes.List;
  export type List = TuxeTypes.List;
  export type FormElement = TuxeTypes.Form;
  export type Form = TuxeTypes.Form;
  export type InputElement = TuxeTypes.Input;
  export type Input = TuxeTypes.Input;
  export type TextareaElement = TuxeTypes.Textarea;
  export type Textarea = TuxeTypes.Textarea;
  export type TextboxElement = TuxeTypes.Textbox;
  export type Textbox = TuxeTypes.Textbox;
  export type ButtonElement = TuxeTypes.Button;
  export type Button = TuxeTypes.Button;
  export type ProgressBarElement = TuxeTypes.ProgressBar;
  export type ProgressBar = TuxeTypes.ProgressBar;
  export type FileManagerElement = TuxeTypes.FileManager;
  export type FileManager = TuxeTypes.FileManager;
  export type CheckboxElement = TuxeTypes.Checkbox;
  export type Checkbox = TuxeTypes.Checkbox;
  export type RadioSetElement = TuxeTypes.RadioSet;
  export type RadioSet = TuxeTypes.RadioSet;
  export type RadioButtonElement = TuxeTypes.RadioButton;
  export type RadioButton = TuxeTypes.RadioButton;
  export type PromptElement = TuxeTypes.Prompt;
  export type Prompt = TuxeTypes.Prompt;
  export type QuestionElement = TuxeTypes.Question;
  export type Question = TuxeTypes.Question;
  export type MessageElement = TuxeTypes.Message;
  export type Message = TuxeTypes.Message;
  export type LoadingElement = TuxeTypes.Loading;
  export type Loading = TuxeTypes.Loading;
  export type ListbarElement = TuxeTypes.Listbar;
  export type Listbar = TuxeTypes.Listbar;
  export type Log = TuxeTypes.Log;
  export type TableElement = TuxeTypes.Table;
  export type Table = TuxeTypes.Table;
  export type ListTableElement = TuxeTypes.ListTable;
  export type ListTable = TuxeTypes.ListTable;
  export type ImageElement = TuxeTypes.Image;
  export type Image = TuxeTypes.Image;
  export type ANSIImageElement = TuxeTypes.ANSIImage;
  export type ANSIImage = TuxeTypes.ANSIImage;
  export type OverlayImageElement = TuxeTypes.OverlayImage;
  export type OverlayImage = TuxeTypes.OverlayImage;
  export type LayoutElement = TuxeTypes.Layout;
  export type Layout = TuxeTypes.Layout;
  export type Program = TuxeTypes.Program;

  // Options types
  export type INodeOptions = TuxeTypes.NodeOptions;
  export type IScreenOptions = TuxeTypes.ScreenOptions;
  export type ElementOptions = TuxeTypes.ElementOptions;
  export type ScrollableOptions = TuxeTypes.ScrollableOptions;
  export type ScrollableBoxOptions = TuxeTypes.ScrollableBoxOptions;
  export type ScrollableTextOptions = TuxeTypes.ScrollableTextOptions;
  export type BoxOptions = TuxeTypes.BoxOptions;
  export type TextOptions = TuxeTypes.TextOptions;
  export type LineOptions = TuxeTypes.LineOptions;
  export type BigTextOptions = TuxeTypes.BigTextOptions;
  export type ListOptions<
    TStyle extends TuxeTypes.ListElementStyle = TuxeTypes.ListElementStyle,
  > = TuxeTypes.ListOptions<TStyle>;
  export type FormOptions = TuxeTypes.FormOptions;
  export type InputOptions = TuxeTypes.InputOptions;
  export type TextareaOptions = TuxeTypes.TextareaOptions;
  export type TextboxOptions = TuxeTypes.TextboxOptions;
  export type ButtonOptions = TuxeTypes.ButtonOptions;
  export type ProgressBarOptions = TuxeTypes.ProgressBarOptions;
  export type FileManagerOptions = TuxeTypes.FileManagerOptions;
  export type CheckboxOptions = TuxeTypes.CheckboxOptions;
  export type RadioSetOptions = TuxeTypes.RadioSetOptions;
  export type RadioButtonOptions = TuxeTypes.RadioButtonOptions;
  export type PromptOptions = TuxeTypes.PromptOptions;
  export type QuestionOptions = TuxeTypes.QuestionOptions;
  export type MessageOptions = TuxeTypes.MessageOptions;
  export type LoadingOptions = TuxeTypes.LoadingOptions;
  export type ListbarOptions = TuxeTypes.ListbarOptions;
  export type LogOptions = TuxeTypes.LogOptions;
  export type TableOptions = TuxeTypes.TableOptions;
  export type ListTableOptions = TuxeTypes.ListTableOptions;
  export type ImageOptions = TuxeTypes.ImageOptions;
  export type ANSIImageOptions = TuxeTypes.ANSIImageOptions;
  export type OverlayImageOptions = TuxeTypes.OverlayImageOptions;
  export type LayoutOptions = TuxeTypes.LayoutOptions;

  // Style types
  export type Style = TuxeTypes.Style;
  export type StyleBorder = TuxeTypes.StyleBorder;
  export type Effects = TuxeTypes.Effects;
  export type ListElementStyle = TuxeTypes.ListElementStyle;
  export type StyleListTable = TuxeTypes.StyleListTable;
  export type ProgressBarStyle = TuxeTypes.ProgressBarStyle;
  export type Border = TuxeTypes.Border;
  export type Padding = TuxeTypes.Padding;
  export type Position = TuxeTypes.Position;
  export type PositionCoords = TuxeTypes.PositionCoords;
  export type Coords = TuxeTypes.Coords;
  export type RenderCoords = TuxeTypes.RenderCoords;
  export type Cursor = TuxeTypes.Cursor;
  export type LabelOptions = TuxeTypes.LabelOptions;
}

// Widget class to factory mapping
const WIDGET_CLASSES = {
  Node: TuxeTypes.Node,
  Screen: TuxeTypes.Screen,
  Element: TuxeTypes.Element,
  Box: TuxeTypes.Box,
  Text: TuxeTypes.Text,
  Line: TuxeTypes.Line,
  ScrollableBox: TuxeTypes.ScrollableBox,
  ScrollableText: TuxeTypes.ScrollableText,
  BigText: TuxeTypes.BigText,
  List: TuxeTypes.List,
  Form: TuxeTypes.Form,
  Input: TuxeTypes.Input,
  Textarea: TuxeTypes.Textarea,
  Textbox: TuxeTypes.Textbox,
  Button: TuxeTypes.Button,
  ProgressBar: TuxeTypes.ProgressBar,
  FileManager: TuxeTypes.FileManager,
  Checkbox: TuxeTypes.Checkbox,
  RadioSet: TuxeTypes.RadioSet,
  RadioButton: TuxeTypes.RadioButton,
  Prompt: TuxeTypes.Prompt,
  Question: TuxeTypes.Question,
  Message: TuxeTypes.Message,
  Loading: TuxeTypes.Loading,
  Listbar: TuxeTypes.Listbar,
  Log: TuxeTypes.Log,
  Table: TuxeTypes.Table,
  ListTable: TuxeTypes.ListTable,
  Image: TuxeTypes.Image,
  ANSIImage: TuxeTypes.ANSIImage,
  OverlayImage: TuxeTypes.OverlayImage,
  Layout: TuxeTypes.Layout,
} as const;

// Create all widget factories
const factories = Object.fromEntries(
  Object.entries(WIDGET_CLASSES).map(([name, WidgetClass]) => [
    name,
    createWidgetFactory(WidgetClass),
  ])
) as Record<keyof typeof WIDGET_CLASSES, WidgetFactory<any>>;

// Create lowercase variant names (PascalCase → lowercase)
const lowercaseFactories = Object.fromEntries(
  Object.entries(factories).map(([name, factory]) => [
    name.toLowerCase(), // Convert entire name to lowercase
    factory,
  ])
);

/**
 * Create the blessed function (callable + properties)
 */
function createBlessedFunction(): BlessedFunction {
  // Main callable function - creates Program
  const blessedFn = function (...args: any[]): TuxeTypes.Program {
    return new TuxeTypes.Program(...args);
  };

  // Add all properties
  Object.assign(blessedFn, {
    // Methods
    program: (...args: any[]) => new TuxeTypes.Program(...args),
    tput: (...args: any[]) => new TuxeTypes.Tput(...args),

    // Classes
    Program: TuxeTypes.Program,
    Tput: TuxeTypes.Tput,

    // Utilities
    colors: TuxeTypes.colors,
    unicode: TuxeTypes.unicode,
    helpers: Object.assign({}, TuxeTypes, {
      sprintf: TuxeTypes.sprintf,
      tryRead: TuxeTypes.tryRead,
    }),

    // Widget factories (PascalCase)
    ...factories,

    // Widget factories (lowercase)
    ...lowercaseFactories,
  });

  return blessedFn as BlessedFunction;
}

// Create and export the blessed function
const blessed = createBlessedFunction();

// Default export (CommonJS: const blessed = require('@tuxe/blessed'))
export default blessed;

// Named exports matching old blessed
export const program = blessed.program;
export const tput = blessed.tput;

// Widget factories - dynamically export both PascalCase and lowercase
export const {
  Node,
  Screen,
  Element,
  Box,
  Text,
  Line,
  ScrollableBox,
  ScrollableText,
  BigText,
  List,
  Form,
  Input,
  Textarea,
  Textbox,
  Button,
  ProgressBar,
  FileManager,
  Checkbox,
  RadioSet,
  RadioButton,
  Prompt,
  Question,
  Message,
  Loading,
  Listbar,
  Log,
  Table,
  ListTable,
  Image,
  ANSIImage,
  OverlayImage,
  Layout,
  node,
  screen,
  element,
  box,
  text,
  line,
  scrollablebox,
  scrollabletext,
  bigtext,
  list,
  form,
  input,
  textarea,
  textbox,
  button,
  progressbar,
  filemanager,
  checkbox,
  radioset,
  radiobutton,
  prompt,
  question,
  message,
  loading,
  listbar,
  log,
  table,
  listtable,
  image,
  ansiimage,
  overlayimage,
  layout,
} = blessed;

// Helper functions
export const { escape, stripTags, cleanTags, generateTags } = TuxeTypes;
export const colors = blessed.colors;
export const unicode = blessed.unicode;
export const helpers = blessed.helpers;

// Legacy type aliases for backward compatibility
export type TTopLeft = TuxeTypes.PositionValue;
export type TPosition = TuxeTypes.PositionValue;
export type TAlign = TuxeTypes.Alignment;
export type TMouseAction = TuxeTypes.MouseAction;
export type TImage = TuxeTypes.ImageData;
