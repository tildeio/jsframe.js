var argv = require('optimist').argv,
    fs = require('fs'),
    templatePath = __dirname + '/' + 'template.js.html',
    jsPath = process.argv[2],
    jsContent,
    templateContent;


function die(msg) {
  console.error(msg);
  process.exit(1);
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
