'use strict';

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');
var DNode = kivi.DNode;
var vdom = kivi.vdom;

var _itemUid = 0;
function ItemStore() {
  this.items = DNode.create([]);
}

ItemStore.prototype.getAll = function() {
  return this.items;
};

ItemStore.prototype.add = function(props) {
  var item = kivi.DNode.create({
    id: _itemUid++,
    text: props.text
  });
  this.items.data.push(item);
  this.items.commit();
};

var store = {
  items: null
};

var TodoItem = vdom.declareComponent({
  tag: 'li',

  updateState: function() {
    this.state.sub(this.props.item);
    this.state.update(true);
  },

  build: function() {
    var root = vdom.r();
    root.children = [vdom.t(this.props.item.data.text)];
    return root;
  }
});

var TodoApp = vdom.declareComponent({
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

  updateState: function() {
    var items = store.items.getAll();
    this.state.data.items = items;
    this.state.sub(items);
    this.state.update(true);
  },

  build: function() {
    var items = this.state.data.items.data;
    var title = vdom.e('h2');
    title.children = [vdom.t('TODO')];

    var todoList = vdom.e('ul');
    var children = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      children.push(vdom.$c(item.id, TodoItem, {item: item}));
    }
    todoList.children = children;

    var form = vdom.e('form');
    var input = this.state.data.inputElement = vdom.e('input');
    var button = vdom.e('button');
    button.type = 'AddButton';
    button.children = [vdom.t('Add Item')];

    form.children = [input, button];

    var root = vdom.r();
    root.children = [title, todoList, form];
    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.init(new Scheduler());

  store.items = new ItemStore();

  kivi.nextFrame().write(function() {
    vdom.injectComponent(vdom.createComponent(TodoApp), document.body);
  });
});
