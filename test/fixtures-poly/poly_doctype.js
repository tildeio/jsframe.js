(function () {
  function addEventListener(target, eventName, listener) {
    if (target.addEventListener) {
      target.addEventListener(eventName, listener);
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventName, listener);
    }
  }

  function removeEventListener(target, eventName, listener) {
    if (target.removeEventListener) {
      target.removeEventListener(eventName, listener);
    } else if (target.detachEvent) {
      target.detachEvent('on' + eventName, listener);
    }
  }


  var loc = location.href,
      hIdx = loc.indexOf('#');

  if (hIdx > -1 && loc.substr(hIdx+1) === 'child') {
    addEventListener(window, 'message', function (event) {
      var data;
      try {
        eval("data = " + event.data);
      } catch (err) {
        return;
      }

      if (data.init) {
        var html, head = '';

        head += '<base href="' + data.base + '" />';
        for (var item, i = 0; i < data.urls.length; ++i ) {
          item = data.urls[i];
          head += ('<script src="' + item + '"><' + '/script>');
        }
        html =  '<!DOCTYPE html><html><head>' + head + '</head><body></body></html>';

        document.write(html);
        document.close();
      }
    });
  } else {
    addEventListener(window, 'load', function () {
      var iframe = document.createElement('iframe');
      iframe.src = '/tmp/poly_doctype.js.html#child';

      var initSender = function () {
        removeEventListener(iframe, 'load', initSender);
        iframe.contentWindow.postMessage(JSON.stringify({
          init: true,
          base: 'http://' + document.location.host + '/',
          urls: ['/test/fixtures/sandbox_doctype.js']
        }), '*');
      };
      addEventListener(iframe, 'load', initSender);

      document.body.appendChild(iframe);
    });
  }
})();
