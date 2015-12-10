var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

// Views
var SingleProjectView = require('./single-project');

// Templates
var ProjectTemplate = require('../templates/project.html');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  tagname: 'li',

  // template: _.template( $('#project-template').html() ),
  template: ProjectTemplate,

  events: {
    'click #delete-project': 'deleteProject',
    'click #open-project': 'singleProjectView'

  },

  deleteProject: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  singleProjectView: function(event) {
    event.preventDefault();
    $('#projects').hide();
    var singleProjectView = new SingleProjectView({
      model: this.model
    });
    $('#totemapp').append(singleProjectView.render() );
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template ( this.model.toJSON()) );
    return this;
  }

});
