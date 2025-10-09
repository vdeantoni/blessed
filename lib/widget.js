/**
 * widget.js - high-level interface for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

var widget = exports;

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

widget.classes.forEach(function(name) {
  var file = name.toLowerCase();
  var WidgetClass = require('./widgets/' + file);

  // Create factory function for backward compatibility with blessed.box() syntax
  var factory = function(options) {
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

Object.keys(widget.aliases).forEach(function(key) {
  var name = widget.aliases[key];
  widget[key] = widget[name];
  widget[key.toLowerCase()] = widget[name];
});
