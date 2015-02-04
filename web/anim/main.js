'use strict';

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');

var N = 5000;
var V = 10;

var Box = kivi.declareComponent({
  name: 'examples.Box',
  updateState: function(oldData, newData) {
    if (oldData === newData) {
      return false;
    }
    return true;
  },

  build: function() {
    var i = this.data;
    var top = Math.sin(i / 10) * 10;
    var left = Math.cos(i / 10) * 10;
    var color = i % 255;
    var content = i % 100;

    var root = kivi.root();
    root.type = 'BoxRoot';

    var box = kivi.element('div');
    box.type = 'Box';
    box.style = {
      top: top + 'px',
      left: left + 'px',
      background: 'rgb(0,0,' + color + ')'
    };

    root.children = [box];
    box.children = [kivi.text(content)];

    return root;
  }
});

var Anim = kivi.declareComponent({
  name: 'examples.Anim',
  build: function() {
    var items = this.data;
    var root = kivi.root();
    root.type = 'Grid';

    var children = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      children.push(kivi.component(Box, item.value, item.id));
    }

    root.children = children;
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.initScheduler(new Scheduler());

  var items = new Array(N);
  for (var i = 0; i < N; i++) {
    items[i] = {id: i, value: 0};
  }
  var a = kivi.component(Anim, items);
  kivi.create(a);
  kivi.render(a);
  document.body.appendChild(a.ref);

  setInterval(function() {
    for (var i = 0; i < V; i++) {
      items[i].value += 1;
    }
    kivi.invalidate(a.cref);
  }, 0);
});
