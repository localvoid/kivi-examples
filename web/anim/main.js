'use strict';

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');

var N = 100;
var V = 10;

function BoxStore() {
  this._boxes = kivi.DNode.create();
  this._boxes.data = [];
  for (var i = 0; i < N; i++) {
    var box = kivi.DNode.create();
    box.data = 0;
    this._boxes.data.push(box);
  }

  var self = this;
  setInterval(function() {
    for (var i = 0; i < V; i++) {
      self.increment(i);
    }
  }, 0);
}

BoxStore.prototype.get = function(id) {
  return this._boxes.data[id];
};

BoxStore.prototype.getAll = function() {
  return this._boxes;
};

BoxStore.prototype.increment = function(id) {
  var box = this._boxes.data[id];
  box.data += 1;
  box.commit();
};

var store = {
  box: null
};

var Box = kivi.Component.declare({
  updateState: function() {
    var box = store.box.get(this.props.id);
    this.state.data = box;
    this.state.sub(box);
    this.state.update();
  },

  build: function() {
    var i = this.state.data.data;
    var top = Math.sin(i / 10) * 10;
    var left = Math.cos(i / 10) * 10;
    var color = i % 255;
    var content = i % 100;

    var root = kivi.VNode.root();
    root.type = 'BoxRoot';

    var box = kivi.VNode.element('div');
    box.type = 'Box';
    box.style = {
      top: top + 'px',
      left: left + 'px',
      background: 'rgb(0,0,' + color + ')'
    };

    root.children = [box];
    box.children = [kivi.VNode.text(content)];

    return root;
  }
});

var Anim = kivi.Component.declare({
  updateState: function() {
    var boxes = this.state.data = store.box.getAll();
    this.state.sub(boxes);
    this.state.update();
  },

  build: function() {
    var items = this.state.data.data;
    var root = kivi.VNode.root();
    root.type = 'Grid';

    var children = [];
    for (var i = 0; i < items.length; i++) {
      children.push(kivi.VNode.component(Box, {id: i}));
    }

    root.children = children;
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.ENV.scheduler = new Scheduler();
  store.box = new BoxStore();

  kivi.ENV.scheduler.nextFrame().write(function() {
    var c = kivi.Component.create(Anim);
    document.body.appendChild(c.element);
    c.update();
  });
});
