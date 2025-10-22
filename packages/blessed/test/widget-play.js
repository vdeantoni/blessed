import blessed from "../dist/index.js";

const __dirname = import.meta.dirname;

const screen = blessed.screen({
  dump: __dirname + "/logs/play.log",
  smartCSR: true,
  warnings: true,
});

var frames = require(__dirname + "/frames.json");

var timer = setInterval(function () {
  if (!frames.length) {
    clearInterval(timer);
    return screen.destroy();
  }
  process.stdout.write(frames.shift());
}, 100);
