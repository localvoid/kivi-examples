'use strict';

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');
var vdom = kivi.vdom;

var Hello = vdom.declareComponent({
  build: function() {
    var root = vdom.r();
    root.children = [vdom.t('Hello ' + this.props.name)];
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.init(new Scheduler());

  kivi.nextFrame().write(function() {
    vdom.injectComponent(vdom.createComponent(Hello, {name: 'World'}), document.body);
  });
});
