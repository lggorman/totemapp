var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var SingleProjectView = require('./views/single-project');

module.exports = Backbone.Router.extend({
  initialize: function(el){
    this.el = el;
    this.projectView = new SingleProjectView();
  },

  routes: {
    '': 'home'
  },

  home: function(){
    Backbone.trigger('manager:goto', this.projectView, 'home');
  }
});
