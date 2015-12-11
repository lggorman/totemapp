var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var router = require('./router');

module.exports = Backbone.View.extend({
  el: '#totemapp',

  initialize: function(){
    var _this = this;
    this.router = new router();

    Backbone.StateManager.addStateManager(this);
    Backbone.on('manager:goto', function(view, state){
      _this.goto(view, state);
    });

  },

  goto: function(view, state){

    var _this = this,
        next = view,
        previous = this.currentPage || null,
        options = {
          next: next,
          previous: previous,
          callback: function(){
            if(previous){
              previous.remove();
            }
          }
        };
    next.render({'page':true});
    this.$el.append( next.$el );
    this.triggerState(state, options);
    _this.currentPage = next;
  },

  states: {
    home: {
      enter: function(){},
      exit: function(){},
      transitions:{}
    }
  }

});
