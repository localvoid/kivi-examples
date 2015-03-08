'use strict';

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');
var DNode = kivi.DNode;
var vdom = kivi.vdom;

var N = 100;
var V = 10;

function BoxStore() {
  var boxes = [];
  for (var i = 0; i < N; i++) {
    boxes.push(kivi.DNode.create(0));
  }

  this._boxes = DNode.create(boxes);

  var self = this;
  setInterval(function() {
    for (var i = 0; i < V; i++) {
      var b = boxes[i];
      b.data++;
      b.commit();
    }
  }, 0);
}

BoxStore.prototype.get = function(id) {
  return this._boxes.data[id];
};

BoxStore.prototype.getAll = function() {
  return this._boxes;
};

var store = {
  box: null
};

var Box = vdom.declareComponent({
  updateState: function() {
    var box = store.box.get(this.props.id);
    this.state.data = box;
    this.state.sub(box);
    this.state.update(true);
  },

  build: function() {
    var i = this.state.data.data;
    var top = Math.sin(i / 10) * 10;
    var left = Math.cos(i / 10) * 10;
    var color = i % 255;
    var content = i % 100;

    var box = vdom.e('div');
    box.type = 'Box';
    box.style = {
      top: top + 'px',
      left: left + 'px',
      background: 'rgb(0,0,' + color + ')'
    };
    box.children = [vdom.t(content)];

    var root = vdom.r();
    root.type = 'BoxRoot';
    root.children = [box];

    return root;
  }
});

var Anim = vdom.declareComponent({
  updateState: function() {
    var boxes = this.state.data = store.box.getAll();
    this.state.sub(boxes);
    this.state.update(true);
  },

  build: function() {
    var items = this.state.data.data;
    var root = vdom.r();
    root.type = 'Grid';

    var children = [];
    for (var i = 0; i < items.length; i++) {
      children.push(vdom.c(Box, {id: i}));
    }

    root.children = children;
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.init(new Scheduler());

  store.box = new BoxStore();

  kivi.nextFrame().write(function() {
    vdom.injectComponent(vdom.createComponent(Anim), document.body);
  });
});
