'use strict';

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');

var Hello = kivi.Component.declare({
  name: 'examples.Hello',
  build: function() {
    var root = kivi.VNode.root();
    root.children = [kivi.VNode.text('Hello ' + this.props.name)];
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.ENV.scheduler = new Scheduler();

  kivi.ENV.scheduler.nextFrame().write(function() {
    var c = kivi.Component.create(Hello, {name: 'World'});
    document.body.appendChild(c.element);
    c.update();
  });
});
