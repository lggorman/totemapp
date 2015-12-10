var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

// Template
var VersionTemplate = require('../templates/version.html');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  tagname: 'li',

  // template: _.template( $('#version-template').html() ),
  template: VersionTemplate,

  events: {
    'click #delete-version': 'deleteVersion',
  },

  deleteVersion: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template ( this.model.toJSON()) );
    return this;
  }

});
