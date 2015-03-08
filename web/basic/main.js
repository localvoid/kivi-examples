'use strict';

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');
var DNode = kivi.DNode;
var vdom = kivi.vdom;

function CounterStore() {
  var node = this.node = DNode.create({
    start: Date.now(),
    elapsed: 0
  });

  setInterval(function() {
    node.data.elapsed = Date.now() - node.data.start;
    node.commit();
  }, 1);
}

var app = {
  store: null
};

var CounterView = vdom.declareComponent({
  updateState: function() {
    var dirty = false;
    var node = app.store.node;
    this.state.sub(node);

    if (this.state.data !== node.data.elapsed) {
      this.state.data = node.data.elapsed;
      dirty = true;
    }
    this.state.update(dirty);
  },

  build: function() {
    var root = vdom.r();
    root.children = [vdom.t('Counter: ' + this.state.data.toString())];
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.init(new Scheduler());

  app.store = new CounterStore();

  kivi.nextFrame().write(function() {
    vdom.injectComponent(vdom.createComponent(CounterView), document.body);
  });
});
