/**
 * widget.ts - high-level interface for blessed
 */

// Import all widget classes
import Node from '../widgets/node.js';
import Screen from '../widgets/screen.js';
import Element from '../widgets/element.js';
import Box from '../widgets/box.js';
import Text from '../widgets/text.js';
import Line from '../widgets/line.js';
import ScrollableBox from '../widgets/scrollablebox.js';
import ScrollableText from '../widgets/scrollabletext.js';
import BigText from '../widgets/bigtext.js';
import List from '../widgets/list.js';
import Form from '../widgets/form.js';
import Input from '../widgets/input.js';
import Textarea from '../widgets/textarea.js';
import Textbox from '../widgets/textbox.js';
import Button from '../widgets/button.js';
import ProgressBar from '../widgets/progressbar.js';
import FileManager from '../widgets/filemanager.js';
import Checkbox from '../widgets/checkbox.js';
import RadioSet from '../widgets/radioset.js';
import RadioButton from '../widgets/radiobutton.js';
import Prompt from '../widgets/prompt.js';
import Question from '../widgets/question.js';
import Message from '../widgets/message.js';
import Loading from '../widgets/loading.js';
import Listbar from '../widgets/listbar.js';
import Log from '../widgets/log.js';
import Table from '../widgets/table.js';
import ListTable from '../widgets/listtable.js';
import Terminal from '../widgets/terminal.js';
import Image from '../widgets/image.js';
import ANSIImage from '../widgets/ansiimage.js';
import OverlayImage from '../widgets/overlayimage.js';
import Video from '../widgets/video.js';
import Layout from '../widgets/layout.js';

const widget: any = {};

// Map of class names to imported classes
const widgetClasses: any = {
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
  Terminal,
  Image,
  ANSIImage,
  OverlayImage,
  Video,
  Layout
};

widget.classes = [
  'Node',
  'Screen',
  'Element',
  'Box',
  'Text',
  'Line',
  'ScrollableBox',
  'ScrollableText',
  'BigText',
  'List',
  'Form',
  'Input',
  'Textarea',
  'Textbox',
  'Button',
  'ProgressBar',
  'FileManager',
  'Checkbox',
  'RadioSet',
  'RadioButton',
  'Prompt',
  'Question',
  'Message',
  'Loading',
  'Listbar',
  'Log',
  'Table',
  'ListTable',
  'Terminal',
  'Image',
  'ANSIImage',
  'OverlayImage',
  'Video',
  'Layout'
];

widget.classes.forEach(function(name: string) {
  const file = name.toLowerCase();
  const WidgetClass = widgetClasses[name];

  // Create factory function for backward compatibility with blessed.box() syntax
  const factory: any = function(options: any) {
    return new WidgetClass(options);
  };

  // Preserve prototype chain for instanceof checks
  factory.prototype = WidgetClass.prototype;

  // Expose the actual class for direct instantiation with new
  factory.class = WidgetClass;

  widget[name] = widget[file] = factory;
});

widget.aliases = {
  'ListBar': 'Listbar',
  'PNG': 'ANSIImage'
};

Object.keys(widget.aliases).forEach(function(key: string) {
  const name = widget.aliases[key];
  widget[key] = widget[name];
  widget[key.toLowerCase()] = widget[name];
});

export default widget;
export { widget };
