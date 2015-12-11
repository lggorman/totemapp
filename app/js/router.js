var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var TotemAppView = require('./views/totemapp');

module.exports = Backbone.Router.extend({
  initialize: function(el){
    this.el = el;
    this.totemAppView = new TotemAppView();
  },

  routes: {
    '': 'home'
  },

  home: function(){
    Backbone.trigger('manager:goto', this.totemAppView, 'home');
  }
});
