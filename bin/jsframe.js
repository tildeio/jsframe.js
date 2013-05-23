#!/usr/bin/env node

var fs = require('fs'),
    jsframe = require('../lib/jsframe'),
    jsPath;

function die(msg, code) {
  if (typeof code !== "number") {
    code = 1;
  }

  console.error(msg);
  process.exit(code);
}


jsPath = process.argv[2];
if (jsPath === "--version" || jsPath === "-V") {
  die(require(__dirname + '/../package.json').version, 0);
}

if (!jsPath) {
  die("Usage: jsframe.js <file.js>");
  return;
} else if (!fs.existsSync(jsPath)) {
  die("Cannot find `" + jsPath + "'");
  return;
}

jsframe.process(jsPath, process.stdout);
