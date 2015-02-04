'use strict';

var kivi = require('kivi');

var Basic = kivi.declareComponent({
  name: 'examples.Basic',
  build: function() {
    var root = kivi.root();
    root.children = [kivi.text('Elapsed: ' + this.data + 'ms')];
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  var now = Date.now();
  var a = kivi.component(Basic, 0);
  kivi.create(a);
  kivi.render(a);
  document.body.appendChild(a.ref);

  setInterval(function() {
    var elapsed = Date.now() - now;
    var b = kivi.component(Basic, elapsed);
    kivi.update(a, b);
    a = b;
  }, 50);
});
