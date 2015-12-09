var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

Backbone.$ = $;

var app = app || {};

// Collections
var ProjectList = require('./collections/project-list'),
    VersionList = require('./collections/version-list'),
    SectionList = require('./collections/section-list');

// Templates
var SingleSectionTemplate = require('./templates/single-section.html');

app.Projects = new ProjectList();

app.SingleSectionView = Backbone.View.extend({
  el: '#totemapp',

  // template: _.template( $('#single-section-template').html() ),
  template: SingleSectionTemplate,

  events: {
    'click #add-new-version' : 'createOnEnter'
  },

  initialize: function() {
    app.Versions = new VersionList();
    app.Versions.fetch({
      data: { section_id: this.model.get('id') },
      processData: true
    });
    this.listenTo(app.Versions, 'add', this.addOne);
  },

  addOne: function(version) {
    var view = new app.VersionView({model: version});
    $('#version-list').append(view.render().el);
  },

  createOnEnter: function( event ) {
    var sectionId = this.model.get('id');
    version = app.Versions.create({section_id : sectionId});
    console.log($('#new-version').val());
    version.set('file', $('#new-version').val());
    $('#new-version').val('');
  },

  render: function() {
    this.$el.append(this.template (this.model.toJSON()) );
    app.Versions.each(function(item) {
      this.renderVersion(item);
    }, this);
  },

  renderVersion: function(item) {
    var versionView = new app.VersionView({
      model: item
    });
    this.$el.append(versionView.render().el );
  }

});


/**
* Single Project View
* @param  {}
* @return {}
*/
app.SingleProjectView = Backbone.View.extend({
  el: '#totemapp',

  template: _.template( $('#single-project-template').html() ),

  events: {
    'click #add-new-section' : 'createOnEnter'
  },

  initialize: function() {
    app.Sections = new SectionList();
    app.Sections.fetch({
      data: { project_id: this.model.get('id') },
      processData: true
    });
    this.listenTo(app.Sections, 'add', this.addOne);
  },

  addOne: function(section) {
    var view = new app.SectionView({model: section});
    $('#section-list').append(view.render().el);
  },

  createOnEnter: function( event ) {
    var sectionName = $('#new-section').val();
    var projectId = this.model.get('id');
    app.Sections.create( {
      project_id : projectId,
      title : sectionName
    } );
    $('#new-section').val('');
  },

  render: function() {
    this.$el.append(this.template (this.model.toJSON()) );
    app.Sections.each(function(item) {
      this.renderSection(item);
    }, this);
  },

  renderSection: function(item) {
    var sectionView = new app.SectionView({
      model: item
    });
    this.$el.append(sectionView.render().el );
  }

});

/**
* Project View
* @param  {}
* @return {}
*/
app.ProjectView = Backbone.View.extend({

  tagname: 'li',

  template: _.template( $('#project-template').html() ),

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
    var singleProjectView = new app.SingleProjectView({
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

/**
* App View
* @param  {}
* @return {}
*/
app.AppView = Backbone.View.extend({
  el: '#totemapp',

  events: {
    'click #add-new' : 'createOnEnter'
  },

  initialize: function() {
    this.$input = this.$('#new-project');
    app.Projects.fetch();
    this.render();
    this.listenTo(app.Projects, 'add', this.addOne);
  },

  addOne: function(project) {
    var view = new app.ProjectView({model: project});
    $('#project-list').append(view.render().el);
  },

  createOnEnter: function( event ) {
    app.Projects.create( { title : this.$input.val() } );
    this.$input.val('');
  },

  render: function() {
    app.Projects.each(function(item) {
      this.renderProject(item);
    }, this);
  },

  renderProject: function(item) {
    var projectView = new app.ProjectView({
      model: item
    });
    this.$el.append(projectView.render().el );
  }

});

/**
* Section View
* @param  {}
* @return {}
*/
app.SectionView = Backbone.View.extend({

  tagname: 'li',

  template: _.template( $('#section-template').html() ),

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
    var singleSectionView = new app.SingleSectionView({
      model: this.model
    });
    $('#totemapp').append(singleSectionView.render() );
  }

});

app.VersionView = Backbone.View.extend({

  tagname: 'li',

  template: _.template( $('#version-template').html() ),

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

