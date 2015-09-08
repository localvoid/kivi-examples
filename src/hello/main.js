goog.provide('main');
goog.provide('main.ui');
goog.provide('main.ui.hello');
goog.require('kivi');

/** @type {!kivi.CDescriptor<string, null>} */
main.ui.hello.d = new kivi.CDescriptor('Hello');

/** @param {!kivi.Component<string, null>} c */
main.ui.hello.d.update = function(c) {
  c.syncVRoot(kivi.createRoot().children(`Hello ${c.data}`));
};

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.nextFrame().write(function() {
    kivi.injectComponent(main.ui.hello.d, 'World', /** @type {!Element} */(document.body));
  });
});
