#!/usr/bin/env node

import blessed from '../src/blessed.js';

const argv = process.argv.slice(2);
const cmd = argv.shift();

const tput = blessed.tput({
  terminal: process.env.TERM,
  termcap: !!process.env.USE_TERMCAP,
  extended: true,
});

if (cmd && tput[cmd]) {
  process.stdout.write(tput[cmd].apply(tput, argv));
}
