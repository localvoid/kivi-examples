'use strict';

var kivi = require('kivi');
var forms = require('kivi/lib/vdom/forms');
var Scheduler = require('kivi/lib/scheduler');
var DNode = kivi.DNode;
var vdom = kivi.vdom;

function FormStore() {
  this.username = DNode.create('username');
  this.password = DNode.create('password');
}

var app = {
  store: null
};

var Form = vdom.declareComponent({
  init: function() {
    this.state.data = {
      username: null,
      password: null
    };

    this.element.addEventListener('input', function(e) {
      if (e.target.matches('.Form_Username')) {
        kivi.action(function() {
          var n = app.store.username;
          n.data = e.target.value;
          n.commit();
        });
      } else if (e.target.matches('.Form_Password')) {
        kivi.action(function() {
          var n = app.store.password;
          n.data = e.target.value;
          n.commit();
        });
      }
    });
  },

  updateState: function() {
    var dirty = false;
    var username = app.store.username;
    var password = app.store.password;
    var data = this.state.data;

    this.state.sub(username);
    this.state.sub(password);

    if (data.username !== username.data) {
      data.username = username.data;
      dirty = true;
    }
    if (data.password !== password.data) {
      data.password = password.data;
      dirty = true;
    }

    this.state.update(dirty);
  },

  build: function() {
    var data = this.state.data;

    var usernameInput = vdom.d(forms.TextInput, data.username);
    usernameInput.type = 'Form_Username';

    var passwordInput = vdom.d(forms.PasswordInput, data.password);
    passwordInput.type = 'Form_Password';

    var password = vdom.t(data.password);

    var root = vdom.r();
    root.children = [
      usernameInput,
      passwordInput,
      password
    ];

    return root;
  }
});

document.addEventListener('DOMContentLoaded', function(_) {
  kivi.init(new Scheduler());

  app.store = new FormStore();

  kivi.nextFrame().write(function() {
    vdom.injectComponent(vdom.createComponent(Form), document.body);
  });
});
