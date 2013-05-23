QUnit.config.testTimeout = 2000 * 100;

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
