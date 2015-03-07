'use strict';

var kivi = require('kivi');
var ENV = kivi.ENV;
var Scheduler = require('kivi/lib/scheduler');
var DNode = kivi.DNode;
var VNode = kivi.VNode;
var Component = kivi.Component;

function CounterStore() {
  var node = this.node = DNode.create();
  node.data = {
    start: Date.now(),
    elapsed: 0
  };

  setInterval(function() {
    node.data.elapsed = Date.now() - node.data.start;
    node.commit();
  }, 1);
}

var app = {
  store: null
};

var CounterView = Component.declare({
  updateState: function() {
    var node = app.store.node;
    this.state.sub(node);

    if (this.state.data !== node.data.elapsed) {
      this.state.data = node.data.elapsed;
      this.state.update();
    }
  },

  build: function() {
    var root = VNode.root();
    root.children = [VNode.text('Counter: ' + this.state.data.toString())];
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  ENV.scheduler = new Scheduler();
  app.store = new CounterStore();

  kivi.ENV.scheduler.nextFrame().write(function() {
    var c = Component.create(CounterView);
    document.body.appendChild(c.element);
    c.update();
  });
});
