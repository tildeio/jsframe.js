var fs = require('fs'),
    templatePath = __dirname + '/template.js.html',
    templateContent,
    _init = false;


function die(msg, code) {
  if (typeof code !== "number") {
    code = 1;
  }

  console.error(msg);
  process.exit(code);
}

function init() {
  if (_init) { return; }
  templateContent = fs.readFileSync(templatePath).toString();
  _init = true;
}

exports.process = function process(file, out) {
  init();
  var jsContent = fs.readFileSync(file).toString();

  var transformedContent = templateContent.replace(/^\{\{CODE\}\}$/mg, function () {
    return jsContent;
  });

  switch (typeof out) {
    case 'number':
      fs.writeSync(out, transformedContent);
      break;
    case 'object':
      out.write(transformedContent);
      break;
    default:
      throw new Error("Can't write to " + out);
  }
};
