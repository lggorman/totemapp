var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

// Collections
var VersionList = require('../collections/version-list');

// Views
var VersionView = require('./version');

// Templates
var SingleSectionTemplate = require('../templates/single-section.html');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: '#totemapp',

  template: SingleSectionTemplate,

  events: {
    'click #add-new-version' : 'createOnEnter'
  },

  initialize: function() {
    var Versions = new VersionList();
    Versions.fetch({
      data: { section_id: this.model.get('id') },
      processData: true
    });
    this.listenTo(Versions, 'add', this.addOne);
  },

  addOne: function(version) {
    var view = new VersionView({model: version});
    $('#version-list').append(view.render().el);
  },

  createOnEnter: function( event ) {
    var sectionId = this.model.get('id');
    version = Versions.create({section_id : sectionId});
    console.log($('#new-version').val());
    version.set('file', $('#new-version').val());
    $('#new-version').val('');
  },

  render: function() {
    this.$el.append(this.template (this.model.toJSON()) );
    Versions.each(function(item) {
      this.renderVersion(item);
    }, this);
  },

  renderVersion: function(item) {
    var versionView = new VersionView({
      model: item
    });
    this.$el.append(versionView.render().el );
  }

});
