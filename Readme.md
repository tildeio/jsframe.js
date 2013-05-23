# jsframe.js

### Summary

`jsframe.js` converts a JavaScript input into a JavaScript/HTML polyglot output
that can be interpreted as either JavaScript or HTML.  This allows you to
distribute a single file that can be loaded in a browser via either a `script`
element or an `iframe` element.


### Requirements

- npm

### Installation

`npm install -g jsframe`

### Usage

####  From the Command Line

`jsframe my_javascript.js > my_polyglot.js.html`

####  Programmatic

```js
var fs = require('fs'),
    jsf = require('jsframe'),
    outFd = File.openSync('my_polyglot.js.html', 'w');

jsf.process('my_javascript.js', outFd);
outFd.close();
```

### Example

```js
// my_javascript.js
if (this === top) {
  console.log("Loaded in a script tag");
} else {
  console.log("Loaded in a frame");
}
```

```sh
# shell
jsframe my_javascript.js > my_javascript.js.html
```

```html
<!DOCTYPE HTML>
<html>
  <head>
    <script src="my_javascript.js.html"></script>
  </head>
  <body>
    <iframe src="my_javascript.js.html"></iframe>
  </body>
</html>
```
