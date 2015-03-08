'use strict';

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');
var DNode = kivi.DNode;
var vdom = kivi.vdom;

function CounterStore() {
  var node = this.node = DNode.create(0);

  setInterval(function() {
    node.data++;
    node.commit();
  }, 200);
}

var app = {
  store: null
};

var Counter = vdom.declareComponent({
  updateState: function() {
    var dirty = false;
    var counter = app.store.node;
    this.state.sub(counter);

    if (this.state.data !== counter.data) {
      this.state.data = counter.data;
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

var CounterTenth = vdom.declareComponent({
  updateState: function() {
    var counter = app.store.node;
    this.state.sub(counter);

    var i = (counter.data / 10) | 0;
    if (this.state.data !== i) {
      this.state.data = i;
      this.state.update(true);
    } else {
      this.state.update(false);
    }
  },

  build: function() {
    var root = vdom.r();
    root.children = [vdom.t('Counter / 10: ' + this.state.data.toString())];
    return root;
  }
});

var Main = vdom.declareComponent({
  build: function() {
    var root = vdom.r();
    root.children = [
      vdom.c(Counter),
      vdom.c(CounterTenth)
    ];
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.init(new Scheduler());
  app.store = new CounterStore();

  kivi.ENV.scheduler.nextFrame().write(function() {
    vdom.injectComponent(vdom.createComponent(Main), document.body);
  });
});
