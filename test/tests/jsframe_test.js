QUnit.config.testTimeout = 300;
QUnit.config.testTimeout = 300 * 100;

test("polyglotted js can be loaded as JavaScript", function() {
  stop();

  function checkPolyLoaded(event) {
    start();
    event = event || window.event;

    equal(event.data, "poly_simple loaded", "user script can run as JavaScript");
  }

  window.onmessage = checkPolyLoaded;

  var $script = $('<script src="/tmp/poly_simple.js.html"></script>');
  $script.appendTo('#qunit-fixture');
});

test("polyglotted js can be loaded as HTML", function() {
  stop();

  function checkPolyLoaded(event) {
    start();
    event = event || window.event;

    equal(event.data, "poly_simple loaded", "user script can run as JavaScript");
  }

  window.onmessage = checkPolyLoaded;

  var $iframe = $('<iframe src="/tmp/poly_simple.js.html"></iframe>');
  $iframe.appendTo('#qunit-fixture');
});

test("iframes can be loaded from a polyglotted js", function() {
  stop();

  function checkDepVersion(event) {
    start();
    event = event || window.event;

    equal(event.data, "0.1.0", "sandbox loaded via polyglot");
  }

  window.onmessage = checkDepVersion;

  var $iframe = $('<iframe src="/test/fixtures/container.html"></iframe>');
  $iframe.appendTo('#qunit-fixture');
});


if (document.documentMode) {
  test("iframes loaded in ie via polyglot are not in quirks mode", function() {
    stop();

    function checkDoctype(event) {
      start();
      event = event || window.event;

      var docType = parseInt(event.data, 10);
      ok(docType >= 8, "sandbox not loaded in quirks mode");
    }

    window.onmessage = checkDoctype;

    var $iframe = $('<iframe src="/test/fixtures/container_doctype.html"></iframe>');
    $iframe.appendTo('#qunit-fixture');
  });
}

if (typeof Worker !== 'undefined') {
  test("polyglot files can be used as webworker URLs", function() {
    stop();

    function checkPolyLoaded(event) {
      start();
      event = event || window.event;

      equal(event.data, "poly_simple loaded", "user script can run as JavaScript");
    }

    var worker = new Worker('/tmp/poly_simple_worker.js.html');
    worker.onmessage = checkPolyLoaded;
  });
}
