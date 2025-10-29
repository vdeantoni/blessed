import fs from "fs";
import blessed from "../dist/index.js";

const __dirname = import.meta.dirname;
const __filename = import.meta.filename;

// {open}xxxx{close} xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx
// xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx {red-bg}xxxx xxxx xxxx{/red-bg}

const screen = blessed.screen({
  dump: __dirname + "/logs/nowrap.log",
  warnings: true,
});

var box = blessed.box({
  parent: screen,
  width: 60,
  wrap: false,
  tags: true,
  content: fs.readFileSync(__filename, "utf8"),
  //content: '{red-bg}' + blessed.escape('{{{{{}{bold}x{/bold}}') + '{/red-bg}'
  //  + '\nescaped: {green-fg}{escape}{{{}{{a{bold}b{/bold}c{/escape}{/green-fg}'
});

box.focus();

screen.key("q", function () {
  return screen.destroy();
});

screen.render();
