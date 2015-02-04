'use strict';

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');

var _itemUid = 0;
function Item(text) {
  this.id = _itemUid++;
  this.text = text;
}

function ItemStore() {
  this.items = [];
  this._listener = null;
}

ItemStore.prototype.listen = function(cb) {
  this._listener = cb;
};

ItemStore.prototype.notify = function() {
  if (this._listener != null) {
    this._listener();
  }
};

ItemStore.prototype.add = function(item) {
  this.items.push(item);
  this.notify();
};

var store = new ItemStore();

var TodoItem = kivi.declareComponent({
  name: 'TodoItem',
  tag: 'li',
  build: function() {
    var root = kivi.root();
    root.children = [kivi.text(this.data)];
    return root;
  }
});

var TodoApp = kivi.declareComponent({
  name: 'TodoApp',
  createState: function(data) {
    var self = this;
    return {
      inputElement: null,
      handleSubmit: function(e) {
        e.preventDefault();
        kivi.invalidate(self);
      }
    };
  },

  init: function() {
    var self = this;

    store.listen(function() {
      kivi.invalidate(self);
    });

    this.element.addEventListener('click', function(e) {
      var t = e.target;
      if (t.matches('.AddButton')) {
        e.preventDefault();
        var input = self.state.inputElement.ref;
        store.add(input.value);
        input.value = '';
      }
    });
  },

  build: function() {
    var items = store.items;
    var title = kivi.element('h2');
    title.children = [kivi.text('TODO')];

    var todoList = kivi.element('ul');
    var children = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      children.push(kivi.component(TodoItem, item, item.id));
    }
    todoList.children = children;

    var form = kivi.element('form');
    var input = this.state.inputElement = kivi.element('input');
    var button = kivi.element('button');
    button.type = 'AddButton';
    button.children = [kivi.text('Add Item')];

    form.children = [input, button];

    var root = kivi.root();
    root.children = [title, todoList, form];
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.initScheduler(new Scheduler());

  var a = kivi.component(TodoApp, null);
  kivi.create(a);
  kivi.render(a);
  document.body.appendChild(a.ref);
});
