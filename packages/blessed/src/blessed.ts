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
  // Type aliases
  export namespace Types {
    export type TTopLeft = TuxeTypes.TTopLeft;
    export type TPosition = TuxeTypes.TPosition;
    export type TAlign = TuxeTypes.TAlign;
    export type TMouseAction = TuxeTypes.TMouseAction;
    export type TBorder = TuxeTypes.Border;
    export type TStyleBorder = TuxeTypes.StyleBorder;
    export type TCursor = TuxeTypes.Cursor;
    export type Effects = TuxeTypes.Effects;
    export type TStyle = TuxeTypes.Style;
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

// Create WidgetFactory instances
const nodeFactory = createWidgetFactory(TuxeTypes.Node);
const screenFactory = createWidgetFactory(TuxeTypes.Screen);
const elementFactory = createWidgetFactory(TuxeTypes.Element);
const boxFactory = createWidgetFactory(TuxeTypes.Box);
const textFactory = createWidgetFactory(TuxeTypes.Text);
const lineFactory = createWidgetFactory(TuxeTypes.Line);
const scrollableboxFactory = createWidgetFactory(TuxeTypes.ScrollableBox);
const scrollabletextFactory = createWidgetFactory(TuxeTypes.ScrollableText);
const bigtextFactory = createWidgetFactory(TuxeTypes.BigText);
const listFactory = createWidgetFactory(TuxeTypes.List);
const formFactory = createWidgetFactory(TuxeTypes.Form);
const inputFactory = createWidgetFactory(TuxeTypes.Input);
const textareaFactory = createWidgetFactory(TuxeTypes.Textarea);
const textboxFactory = createWidgetFactory(TuxeTypes.Textbox);
const buttonFactory = createWidgetFactory(TuxeTypes.Button);
const progressbarFactory = createWidgetFactory(TuxeTypes.ProgressBar);
const filemanagerFactory = createWidgetFactory(TuxeTypes.FileManager);
const checkboxFactory = createWidgetFactory(TuxeTypes.Checkbox);
const radiosetFactory = createWidgetFactory(TuxeTypes.RadioSet);
const radiobuttonFactory = createWidgetFactory(TuxeTypes.RadioButton);
const promptFactory = createWidgetFactory(TuxeTypes.Prompt);
const questionFactory = createWidgetFactory(TuxeTypes.Question);
const messageFactory = createWidgetFactory(TuxeTypes.Message);
const loadingFactory = createWidgetFactory(TuxeTypes.Loading);
const listbarFactory = createWidgetFactory(TuxeTypes.Listbar);
const logFactory = createWidgetFactory(TuxeTypes.Log);
const tableFactory = createWidgetFactory(TuxeTypes.Table);
const listtableFactory = createWidgetFactory(TuxeTypes.ListTable);
const imageFactory = createWidgetFactory(TuxeTypes.Image);
const ansiimageFactory = createWidgetFactory(TuxeTypes.ANSIImage);
const overlayimageFactory = createWidgetFactory(TuxeTypes.OverlayImage);
const layoutFactory = createWidgetFactory(TuxeTypes.Layout);

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
    Node: nodeFactory,
    Screen: screenFactory,
    Element: elementFactory,
    Box: boxFactory,
    Text: textFactory,
    Line: lineFactory,
    ScrollableBox: scrollableboxFactory,
    ScrollableText: scrollabletextFactory,
    BigText: bigtextFactory,
    List: listFactory,
    Form: formFactory,
    Input: inputFactory,
    Textarea: textareaFactory,
    Textbox: textboxFactory,
    Button: buttonFactory,
    ProgressBar: progressbarFactory,
    FileManager: filemanagerFactory,
    Checkbox: checkboxFactory,
    RadioSet: radiosetFactory,
    RadioButton: radiobuttonFactory,
    Prompt: promptFactory,
    Question: questionFactory,
    Message: messageFactory,
    Loading: loadingFactory,
    Listbar: listbarFactory,
    Log: logFactory,
    Table: tableFactory,
    ListTable: listtableFactory,
    Image: imageFactory,
    ANSIImage: ansiimageFactory,
    OverlayImage: overlayimageFactory,
    Layout: layoutFactory,

    // Widget factories (lowercase)
    node: nodeFactory,
    screen: screenFactory,
    element: elementFactory,
    box: boxFactory,
    text: textFactory,
    line: lineFactory,
    scrollablebox: scrollableboxFactory,
    scrollabletext: scrollabletextFactory,
    bigtext: bigtextFactory,
    list: listFactory,
    form: formFactory,
    input: inputFactory,
    textarea: textareaFactory,
    textbox: textboxFactory,
    button: buttonFactory,
    progressbar: progressbarFactory,
    filemanager: filemanagerFactory,
    checkbox: checkboxFactory,
    radioset: radiosetFactory,
    radiobutton: radiobuttonFactory,
    prompt: promptFactory,
    question: questionFactory,
    message: messageFactory,
    loading: loadingFactory,
    listbar: listbarFactory,
    log: logFactory,
    table: tableFactory,
    listtable: listtableFactory,
    image: imageFactory,
    ansiimage: ansiimageFactory,
    overlayimage: overlayimageFactory,
    layout: layoutFactory,
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

// Widget factories (PascalCase)
export const Node = blessed.Node;
export const Screen = blessed.Screen;
export const Element = blessed.Element;
export const Box = blessed.Box;
export const Text = blessed.Text;
export const Line = blessed.Line;
export const ScrollableBox = blessed.ScrollableBox;
export const ScrollableText = blessed.ScrollableText;
export const BigText = blessed.BigText;
export const List = blessed.List;
export const Form = blessed.Form;
export const Input = blessed.Input;
export const Textarea = blessed.Textarea;
export const Textbox = blessed.Textbox;
export const Button = blessed.Button;
export const ProgressBar = blessed.ProgressBar;
export const FileManager = blessed.FileManager;
export const Checkbox = blessed.Checkbox;
export const RadioSet = blessed.RadioSet;
export const RadioButton = blessed.RadioButton;
export const Prompt = blessed.Prompt;
export const Question = blessed.Question;
export const Message = blessed.Message;
export const Loading = blessed.Loading;
export const Listbar = blessed.Listbar;
export const Log = blessed.Log;
export const Table = blessed.Table;
export const ListTable = blessed.ListTable;
export const Image = blessed.Image;
export const ANSIImage = blessed.ANSIImage;
export const OverlayImage = blessed.OverlayImage;
export const Layout = blessed.Layout;

// Widget factories (lowercase)
export const node = blessed.node;
export const screen = blessed.screen;
export const element = blessed.element;
export const box = blessed.box;
export const text = blessed.text;
export const line = blessed.line;
export const scrollablebox = blessed.scrollablebox;
export const scrollabletext = blessed.scrollabletext;
export const bigtext = blessed.bigtext;
export const list = blessed.list;
export const form = blessed.form;
export const input = blessed.input;
export const textarea = blessed.textarea;
export const textbox = blessed.textbox;
export const button = blessed.button;
export const progressbar = blessed.progressbar;
export const filemanager = blessed.filemanager;
export const checkbox = blessed.checkbox;
export const radioset = blessed.radioset;
export const radiobutton = blessed.radiobutton;
export const prompt = blessed.prompt;
export const question = blessed.question;
export const message = blessed.message;
export const loading = blessed.loading;
export const listbar = blessed.listbar;
export const log = blessed.log;
export const table = blessed.table;
export const listtable = blessed.listtable;
export const image = blessed.image;
export const ansiimage = blessed.ansiimage;
export const overlayimage = blessed.overlayimage;
export const layout = blessed.layout;

// Helper functions
export const { escape, stripTags, cleanTags, generateTags } = TuxeTypes;
export const colors = blessed.colors;
export const unicode = blessed.unicode;
export const helpers = blessed.helpers;
