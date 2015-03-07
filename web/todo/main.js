'use strict';

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');

var _itemUid = 0;
function ItemStore() {
  this.items = kivi.DNode.create();
  this.items.data = [];
}

ItemStore.prototype.getAll = function() {
  return this.items;
};

ItemStore.prototype.add = function(props) {
  var item = kivi.DNode.create();
  item.data = {
    id: _itemUid++,
    text: props.text
  };
  this.items.data.push(item);
  this.items.commit();
};

var store = {
  items: null
};

var TodoItem = kivi.Component.declare({
  tag: 'li',

  updateState: function() {
    this.state.sub(this.props.item);
    this.state.update();
  },

  build: function() {
    var root = kivi.VNode.root();
    root.children = [kivi.VNode.text(this.props.item.data.text)];
    return root;
  }
});

var TodoApp = kivi.Component.declare({
  updateState: function() {
    var items = store.items.getAll();
    this.state.data.items = items;
    this.state.sub(items);
    this.state.update();
  },
  init: function() {
    var self = this;

    this.state.data = {
      items: null,
      inputElement: null,
      handleSubmit: function(e) {
        e.preventDefault();
        self.invalidate();
      }
    };

    this.element.addEventListener('click', function(e) {
      var t = e.target;
      if (t.matches('.AddButton')) {
        e.preventDefault();
        var input = self.state.data.inputElement.ref;
        store.items.add({text: input.value});
        input.value = '';
      }
    });
  },

  build: function() {
    var items = this.state.data.items.data;
    var title = kivi.VNode.element('h2');
    title.children = [kivi.VNode.text('TODO')];

    var todoList = kivi.VNode.element('ul');
    var children = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      children.push(kivi.VNode.component(TodoItem, {item: item}));
    }
    todoList.children = children;

    var form = kivi.VNode.element('form');
    var input = this.state.data.inputElement = kivi.VNode.element('input');
    var button = kivi.VNode.element('button');
    button.type = 'AddButton';
    button.children = [kivi.VNode.text('Add Item')];

    form.children = [input, button];

    var root = kivi.VNode.root();
    root.children = [title, todoList, form];
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.ENV.scheduler = new Scheduler();
  store.items = new ItemStore();

  kivi.ENV.scheduler.nextFrame().write(function() {
    var c = kivi.Component.create(TodoApp);
    document.body.appendChild(c.element);
    c.update();
  });
});
