goog.provide('main');
goog.provide('main.ui');
goog.provide('main.ui.box');
goog.provide('main.ui.anim');
goog.require('base');
goog.require('css.map.css');
goog.require('kivi');

/** @const {number} */
main.N = 100;

/** @const {number} */
main.V = 10;

/**
 *
 * @param {number} value
 * @constructor
 * @struct
 * @final
 */
main.Box = function(value) {
  this.value = value;
  this.onChange = new kivi.Invalidator();
};

/**
 *
 * @constructor
 * @struct
 * @final
 */
main.BoxStore = function() {
  var boxes = this.boxes = /** @type {!Array<!main.Box>} */([]);
  for (var i = 0; i < main.N; i++) {
    boxes.push(new main.Box(0));
  }

  function update() {
    for (var i = 0; i < main.V; i++) {
      var b = boxes[i];
      b.value++;
      b.onChange.invalidate();
    }
    setTimeout(update, 0);
  }
  setTimeout(update, 0);
};

/** @type {!kivi.CDescriptor<!main.Box, null>} */
main.ui.box.d = new kivi.CDescriptor('Box');

/** @param {!kivi.Component<!main.Box, null>} c */
main.ui.box.d.init = function(c) {
  c.subscribe(c.data.onChange);
};

/** @param {!kivi.Component<!main.Box, null>} c */
main.ui.box.d.update = function(c) {
  var i = c.data.value;
  var top = Math.sin(i / 10) * 10;
  var left = Math.cos(i / 10) * 10;
  var color = i % 255;
  var content = i % 100;

  c.syncVRoot(kivi.createRoot().type(goog.getCssName('BoxRoot')).children([
    kivi.createElement('div')
        .type(goog.getCssName('Box'))
        .style({
          top: top + 'px',
          left: left + 'px',
          background: 'rgb(0,0,' + color + ')'
        })
        .children(content.toString())
  ]));
};

/** @type {!kivi.CDescriptor<!main.BoxStore, null>} */
main.ui.anim.d = new kivi.CDescriptor('Anim');

/** @param {!kivi.Component<!main.BoxStore, null>} c */
main.ui.anim.d.update = function(c) {
  var boxes = c.data.boxes;

  var children = new Array(boxes.length);
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    children[i] = kivi.createComponent(main.ui.box.d, box);
  }

  c.syncVRoot(kivi.createRoot().type(goog.getCssName('Grid')).children(children));
};

kivi.init(new kivi.Scheduler());

document.addEventListener('DOMContentLoaded', function() {
  var state = new main.BoxStore();

  kivi.nextFrame().write(function() {
    kivi.injectComponent(main.ui.anim.d, state, document.body);
  });
});
