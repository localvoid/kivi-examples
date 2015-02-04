'use strict';

var kivi = require('kivi');

var Hello = kivi.declareComponent({
  name: 'examples.Hello',
  build: function() {
    var root = kivi.root();
    root.children = [kivi.text('Hello ' + this.data.name)];
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  var c = kivi.component(Hello, {name: 'World'});
  kivi.create(c);
  kivi.render(c);
  document.body.appendChild(c.ref);
});
