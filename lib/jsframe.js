var fs = require('fs'),
    templatePath = __dirname + '/template.js.html',
    jsPath = process.argv[2],
    jsContent,
    templateContent;


function die(msg, code) {
  if (typeof code !== "number") {
    code = 1;
  }

  console.error(msg);
  process.exit(code);
}

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

templateContent = fs.readFileSync(templatePath).toString();
jsContent = fs.readFileSync(jsPath).toString();

console.log(templateContent.replace(/^{{CODE}}$/mg, jsContent));
