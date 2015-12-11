var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

// Collections
var SectionList = require('../collections/section-list');

// Views
var SingleSectionView = require('./single-section');
var SectionView = require('./section');

// Templates
var SingleProjectTemplate = require('../templates/single-project.html');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: '#projects',

  template: SingleProjectTemplate,

  events: {
    'click #add-new-section' : 'createOnEnter'
  },

  initialize: function() {
    var Sections = new SectionList();
    Sections.fetch({
      data: { project_id: this.model.get('id') },
      processData: true
    });
    this.listenTo(Sections, 'add', this.addOne);
  },

  addOne: function(section) {
    var view = new SectionView({model: section});
    $('#section-list').append(view.render().el);
  },

  createOnEnter: function( event ) {
    var sectionName = $('#new-section').val();
    var projectId = this.model.get('id');
    Sections.create( {
      project_id : projectId,
      title : sectionName
    } );
    $('#new-section').val('');
  },

  render: function() {
    this.$el.append(this.template (this.model.toJSON()) );
    Sections.each(function(item) {
      this.renderSection(item);
    }, this);
  },

  renderSection: function(item) {
    var sectionView = new SectionView({
      model: item
    });
    this.$el.append(sectionView.render().el );
  }

});
