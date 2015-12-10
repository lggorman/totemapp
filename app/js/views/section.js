var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

// View
var SingleSectionView = require('./single-section');

// Template
var SectionTemplate = require('../templates/section.html');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  tagname: 'li',

  // template: _.template( $('#section-template').html() ),
  template: SectionTemplate,

  events: {
    'click #delete-section': 'deleteSection',
    'click #open-section': 'singleSectionView'
  },

  deleteSection: function(event) {
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
  },

  singleSectionView: function(event) {
    event.preventDefault();
    $('#sections').hide();
    var singleSectionView = new SingleSectionView({
      model: this.model
    });
    $('#totemapp').append(singleSectionView.render() );
  }

});
