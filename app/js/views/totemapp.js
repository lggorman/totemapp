var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

// Collections
var ProjectList = require('../collections/project-list');

// Views
var ProjectView = require('./project');

var Projects = new ProjectList();

Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: '#totemapp',

  events: {
    'click #add-new' : 'createOnEnter'
  },

  initialize: function() {
    this.$input = this.$('#new-project');
    this.$projectList = this.$('#project-list');
    Projects.fetch();
    this.render();
    this.listenTo(Projects, 'add', this.addOne);
  },

  addOne: function(project) {
    var view = new ProjectView({model: project});
    this.$projectList.append(view.render().el);
  },

  createOnEnter: function( event ) {
    Projects.create( { title : this.$input.val() } );
    this.$input.val('');
  },

  render: function() {
    Projects.each(function(item) {
      this.renderProject(item);
    }, this);
  },

  renderProject: function(item) {
    var projectView = new ProjectView({
      model: item
    });
    this.$el.append(projectView.render().el );
  }

});
