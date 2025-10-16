/**
 * @tui/blessed - 100% backward compatible blessed API
 *
 * This package wraps @tui/node to provide the exact same API as the original
 * blessed library. It's a drop-in replacement for users migrating from blessed.
 */

import * as TuiTypes from '@tui/node';
export * from '@tui/node';

// Initialize the Node.js runtime immediately when this module loads
import { getNodeRuntime } from '@tui/node';
getNodeRuntime(); // This ensures runtime is ready before any blessed API is used

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
  (...args: any[]): TuiTypes.Program;

  // Methods
  program(...args: any[]): TuiTypes.Program;
  tput(...args: any[]): TuiTypes.Tput;

  // Classes
  Program: typeof TuiTypes.Program;
  Tput: typeof TuiTypes.Tput;

  // Utilities
  colors: typeof TuiTypes.colors;
  unicode: typeof TuiTypes.unicode;
  helpers: typeof TuiTypes & {
    sprintf: typeof TuiTypes.sprintf;
    tryRead: typeof TuiTypes.tryRead;
  };

  // Widget factories (PascalCase)
  Node: WidgetFactory<TuiTypes.Node>;
  Screen: WidgetFactory<TuiTypes.Screen>;
  Element: WidgetFactory<TuiTypes.Element>;
  Box: WidgetFactory<TuiTypes.Box>;
  Text: WidgetFactory<TuiTypes.Text>;
  Line: WidgetFactory<TuiTypes.Line>;
  ScrollableBox: WidgetFactory<TuiTypes.ScrollableBox>;
  ScrollableText: WidgetFactory<TuiTypes.ScrollableText>;
  BigText: WidgetFactory<TuiTypes.BigText>;
  List: WidgetFactory<TuiTypes.List>;
  Form: WidgetFactory<TuiTypes.Form>;
  Input: WidgetFactory<TuiTypes.Input>;
  Textarea: WidgetFactory<TuiTypes.Textarea>;
  Textbox: WidgetFactory<TuiTypes.Textbox>;
  Button: WidgetFactory<TuiTypes.Button>;
  ProgressBar: WidgetFactory<TuiTypes.ProgressBar>;
  FileManager: WidgetFactory<TuiTypes.FileManager>;
  Checkbox: WidgetFactory<TuiTypes.Checkbox>;
  RadioSet: WidgetFactory<TuiTypes.RadioSet>;
  RadioButton: WidgetFactory<TuiTypes.RadioButton>;
  Prompt: WidgetFactory<TuiTypes.Prompt>;
  Question: WidgetFactory<TuiTypes.Question>;
  Message: WidgetFactory<TuiTypes.Message>;
  Loading: WidgetFactory<TuiTypes.Loading>;
  Listbar: WidgetFactory<TuiTypes.Listbar>;
  Log: WidgetFactory<TuiTypes.Log>;
  Table: WidgetFactory<TuiTypes.Table>;
  ListTable: WidgetFactory<TuiTypes.ListTable>;
  Image: WidgetFactory<TuiTypes.Image>;
  ANSIImage: WidgetFactory<TuiTypes.ANSIImage>;
  OverlayImage: WidgetFactory<TuiTypes.OverlayImage>;
  Layout: WidgetFactory<TuiTypes.Layout>;

  // Widget factories (lowercase)
  node: WidgetFactory<TuiTypes.Node>;
  screen: WidgetFactory<TuiTypes.Screen>;
  element: WidgetFactory<TuiTypes.Element>;
  box: WidgetFactory<TuiTypes.Box>;
  text: WidgetFactory<TuiTypes.Text>;
  line: WidgetFactory<TuiTypes.Line>;
  scrollablebox: WidgetFactory<TuiTypes.ScrollableBox>;
  scrollabletext: WidgetFactory<TuiTypes.ScrollableText>;
  bigtext: WidgetFactory<TuiTypes.BigText>;
  list: WidgetFactory<TuiTypes.List>;
  form: WidgetFactory<TuiTypes.Form>;
  input: WidgetFactory<TuiTypes.Input>;
  textarea: WidgetFactory<TuiTypes.Textarea>;
  textbox: WidgetFactory<TuiTypes.Textbox>;
  button: WidgetFactory<TuiTypes.Button>;
  progressbar: WidgetFactory<TuiTypes.ProgressBar>;
  filemanager: WidgetFactory<TuiTypes.FileManager>;
  checkbox: WidgetFactory<TuiTypes.Checkbox>;
  radioset: WidgetFactory<TuiTypes.RadioSet>;
  radiobutton: WidgetFactory<TuiTypes.RadioButton>;
  prompt: WidgetFactory<TuiTypes.Prompt>;
  question: WidgetFactory<TuiTypes.Question>;
  message: WidgetFactory<TuiTypes.Message>;
  loading: WidgetFactory<TuiTypes.Loading>;
  listbar: WidgetFactory<TuiTypes.Listbar>;
  log: WidgetFactory<TuiTypes.Log>;
  table: WidgetFactory<TuiTypes.Table>;
  listtable: WidgetFactory<TuiTypes.ListTable>;
  image: WidgetFactory<TuiTypes.Image>;
  ansiimage: WidgetFactory<TuiTypes.ANSIImage>;
  overlayimage: WidgetFactory<TuiTypes.OverlayImage>;
  layout: WidgetFactory<TuiTypes.Layout>;
}

/**
 * Widgets namespace - contains all widget types and options
 * Provides compatibility with @types/blessed
 */
export namespace Widgets {
  // Type aliases
  export namespace Types {
    export type TTopLeft = TuiTypes.TTopLeft;
    export type TPosition = TuiTypes.TPosition;
    export type TAlign = TuiTypes.TAlign;
    export type TMouseAction = TuiTypes.TMouseAction;
    export type TBorder = TuiTypes.Border;
    export type TStyleBorder = TuiTypes.StyleBorder;
    export type TCursor = TuiTypes.Cursor;
    export type Effects = TuiTypes.Effects;
    export type TStyle = TuiTypes.Style;
  }

  export namespace Events {
    export type IMouseEventArg = TuiTypes.MouseEvent;
    export type IKeyEventArg = TuiTypes.KeyEvent;
  }

  // Widget class types
  export type Node = TuiTypes.Node;
  export type Screen = TuiTypes.Screen;
  export type BlessedElement = TuiTypes.Element;
  export type Element = TuiTypes.Element;
  export type BoxElement = TuiTypes.Box;
  export type Box = TuiTypes.Box;
  export type TextElement = TuiTypes.Text;
  export type Text = TuiTypes.Text;
  export type LineElement = TuiTypes.Line;
  export type Line = TuiTypes.Line;
  export type ScrollableBoxElement = TuiTypes.ScrollableBox;
  export type ScrollableBox = TuiTypes.ScrollableBox;
  export type ScrollableTextElement = TuiTypes.ScrollableText;
  export type ScrollableText = TuiTypes.ScrollableText;
  export type BigTextElement = TuiTypes.BigText;
  export type BigText = TuiTypes.BigText;
  export type ListElement = TuiTypes.List;
  export type List = TuiTypes.List;
  export type FormElement = TuiTypes.Form;
  export type Form = TuiTypes.Form;
  export type InputElement = TuiTypes.Input;
  export type Input = TuiTypes.Input;
  export type TextareaElement = TuiTypes.Textarea;
  export type Textarea = TuiTypes.Textarea;
  export type TextboxElement = TuiTypes.Textbox;
  export type Textbox = TuiTypes.Textbox;
  export type ButtonElement = TuiTypes.Button;
  export type Button = TuiTypes.Button;
  export type ProgressBarElement = TuiTypes.ProgressBar;
  export type ProgressBar = TuiTypes.ProgressBar;
  export type FileManagerElement = TuiTypes.FileManager;
  export type FileManager = TuiTypes.FileManager;
  export type CheckboxElement = TuiTypes.Checkbox;
  export type Checkbox = TuiTypes.Checkbox;
  export type RadioSetElement = TuiTypes.RadioSet;
  export type RadioSet = TuiTypes.RadioSet;
  export type RadioButtonElement = TuiTypes.RadioButton;
  export type RadioButton = TuiTypes.RadioButton;
  export type PromptElement = TuiTypes.Prompt;
  export type Prompt = TuiTypes.Prompt;
  export type QuestionElement = TuiTypes.Question;
  export type Question = TuiTypes.Question;
  export type MessageElement = TuiTypes.Message;
  export type Message = TuiTypes.Message;
  export type LoadingElement = TuiTypes.Loading;
  export type Loading = TuiTypes.Loading;
  export type ListbarElement = TuiTypes.Listbar;
  export type Listbar = TuiTypes.Listbar;
  export type Log = TuiTypes.Log;
  export type TableElement = TuiTypes.Table;
  export type Table = TuiTypes.Table;
  export type ListTableElement = TuiTypes.ListTable;
  export type ListTable = TuiTypes.ListTable;
  export type ImageElement = TuiTypes.Image;
  export type Image = TuiTypes.Image;
  export type ANSIImageElement = TuiTypes.ANSIImage;
  export type ANSIImage = TuiTypes.ANSIImage;
  export type OverlayImageElement = TuiTypes.OverlayImage;
  export type OverlayImage = TuiTypes.OverlayImage;
  export type LayoutElement = TuiTypes.Layout;
  export type Layout = TuiTypes.Layout;
  export type Program = TuiTypes.Program;

  // Options types
  export type INodeOptions = TuiTypes.NodeOptions;
  export type IScreenOptions = TuiTypes.ScreenOptions;
  export type ElementOptions = TuiTypes.ElementOptions;
  export type ScrollableOptions = TuiTypes.ScrollableOptions;
  export type ScrollableBoxOptions = TuiTypes.ScrollableBoxOptions;
  export type ScrollableTextOptions = TuiTypes.ScrollableTextOptions;
  export type BoxOptions = TuiTypes.BoxOptions;
  export type TextOptions = TuiTypes.TextOptions;
  export type LineOptions = TuiTypes.LineOptions;
  export type BigTextOptions = TuiTypes.BigTextOptions;
  export type ListOptions<
    TStyle extends TuiTypes.ListElementStyle = TuiTypes.ListElementStyle,
  > = TuiTypes.ListOptions<TStyle>;
  export type FormOptions = TuiTypes.FormOptions;
  export type InputOptions = TuiTypes.InputOptions;
  export type TextareaOptions = TuiTypes.TextareaOptions;
  export type TextboxOptions = TuiTypes.TextboxOptions;
  export type ButtonOptions = TuiTypes.ButtonOptions;
  export type ProgressBarOptions = TuiTypes.ProgressBarOptions;
  export type FileManagerOptions = TuiTypes.FileManagerOptions;
  export type CheckboxOptions = TuiTypes.CheckboxOptions;
  export type RadioSetOptions = TuiTypes.RadioSetOptions;
  export type RadioButtonOptions = TuiTypes.RadioButtonOptions;
  export type PromptOptions = TuiTypes.PromptOptions;
  export type QuestionOptions = TuiTypes.QuestionOptions;
  export type MessageOptions = TuiTypes.MessageOptions;
  export type LoadingOptions = TuiTypes.LoadingOptions;
  export type ListbarOptions = TuiTypes.ListbarOptions;
  export type LogOptions = TuiTypes.LogOptions;
  export type TableOptions = TuiTypes.TableOptions;
  export type ListTableOptions = TuiTypes.ListTableOptions;
  export type ImageOptions = TuiTypes.ImageOptions;
  export type ANSIImageOptions = TuiTypes.ANSIImageOptions;
  export type OverlayImageOptions = TuiTypes.OverlayImageOptions;
  export type LayoutOptions = TuiTypes.LayoutOptions;

  // Style types
  export type Style = TuiTypes.Style;
  export type StyleBorder = TuiTypes.StyleBorder;
  export type Effects = TuiTypes.Effects;
  export type ListElementStyle = TuiTypes.ListElementStyle;
  export type StyleListTable = TuiTypes.StyleListTable;
  export type ProgressBarStyle = TuiTypes.ProgressBarStyle;
  export type Border = TuiTypes.Border;
  export type Padding = TuiTypes.Padding;
  export type Position = TuiTypes.Position;
  export type PositionCoords = TuiTypes.PositionCoords;
  export type Coords = TuiTypes.Coords;
  export type RenderCoords = TuiTypes.RenderCoords;
  export type Cursor = TuiTypes.Cursor;
  export type LabelOptions = TuiTypes.LabelOptions;
}

// Create WidgetFactory instances
const nodeFactory = createWidgetFactory(TuiTypes.Node);
const screenFactory = createWidgetFactory(TuiTypes.Screen);
const elementFactory = createWidgetFactory(TuiTypes.Element);
const boxFactory = createWidgetFactory(TuiTypes.Box);
const textFactory = createWidgetFactory(TuiTypes.Text);
const lineFactory = createWidgetFactory(TuiTypes.Line);
const scrollableboxFactory = createWidgetFactory(TuiTypes.ScrollableBox);
const scrollabletextFactory = createWidgetFactory(TuiTypes.ScrollableText);
const bigtextFactory = createWidgetFactory(TuiTypes.BigText);
const listFactory = createWidgetFactory(TuiTypes.List);
const formFactory = createWidgetFactory(TuiTypes.Form);
const inputFactory = createWidgetFactory(TuiTypes.Input);
const textareaFactory = createWidgetFactory(TuiTypes.Textarea);
const textboxFactory = createWidgetFactory(TuiTypes.Textbox);
const buttonFactory = createWidgetFactory(TuiTypes.Button);
const progressbarFactory = createWidgetFactory(TuiTypes.ProgressBar);
const filemanagerFactory = createWidgetFactory(TuiTypes.FileManager);
const checkboxFactory = createWidgetFactory(TuiTypes.Checkbox);
const radiosetFactory = createWidgetFactory(TuiTypes.RadioSet);
const radiobuttonFactory = createWidgetFactory(TuiTypes.RadioButton);
const promptFactory = createWidgetFactory(TuiTypes.Prompt);
const questionFactory = createWidgetFactory(TuiTypes.Question);
const messageFactory = createWidgetFactory(TuiTypes.Message);
const loadingFactory = createWidgetFactory(TuiTypes.Loading);
const listbarFactory = createWidgetFactory(TuiTypes.Listbar);
const logFactory = createWidgetFactory(TuiTypes.Log);
const tableFactory = createWidgetFactory(TuiTypes.Table);
const listtableFactory = createWidgetFactory(TuiTypes.ListTable);
const imageFactory = createWidgetFactory(TuiTypes.Image);
const ansiimageFactory = createWidgetFactory(TuiTypes.ANSIImage);
const overlayimageFactory = createWidgetFactory(TuiTypes.OverlayImage);
const layoutFactory = createWidgetFactory(TuiTypes.Layout);

/**
 * Create the blessed function (callable + properties)
 */
function createBlessedFunction(): BlessedFunction {
  // Main callable function - creates Program
  const blessedFn = function (...args: any[]): TuiTypes.Program {
    return new TuiTypes.Program(...args);
  };

  // Add all properties
  Object.assign(blessedFn, {
    // Methods
    program: (...args: any[]) => new TuiTypes.Program(...args),
    tput: (...args: any[]) => new TuiTypes.Tput(...args),

    // Classes
    Program: TuiTypes.Program,
    Tput: TuiTypes.Tput,

    // Utilities
    colors: TuiTypes.colors,
    unicode: TuiTypes.unicode,
    helpers: Object.assign({}, TuiTypes, {
      sprintf: TuiTypes.sprintf,
      tryRead: TuiTypes.tryRead,
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

// Default export (CommonJS: const blessed = require('@tui/blessed'))
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
export const { escape, stripTags, cleanTags, generateTags } = TuiTypes;
export const colors = blessed.colors;
export const unicode = blessed.unicode;
export const helpers = blessed.helpers;
