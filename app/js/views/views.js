var app = app || {};

app.Projects = new ProjectList();

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

  newAttributes: function() {
    return {
      title: this.$input.val().trim()
    };
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

app.ProjectView = Backbone.View.extend({

  el: '#project-list',

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
    this.listenTo( this.model, 'change', this.render );
  },

  render: function() {
    this.$el.html(this.template ( this.model.toJSON()) );
    return this;
  }

});

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

  newAttributes: function() {
    return {
      title: this.$input.val().trim()
    };
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
    this.$el.append(projectView.render().el);
  }

});

app.SectionView = Backbone.View.extend({

  tagname: 'li',

  template: _.template( $('#section-template').html() ),

  events: {
    'click #delete-section': 'deleteSection',
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
  }

});
