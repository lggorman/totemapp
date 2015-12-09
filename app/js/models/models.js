Project = Backbone.Model.extend({
	urlRoot: 'http://localhost:4567/projects',
	defaults: {
	    title: ''
	}
});

Section = Backbone.Model.extend({
	urlRoot: 'http://localhost:4567/sections',
	defaults: {
	    title: '',
	    project_id: ''
	}
});

Version = Backbone.Model.extend({
  urlRoot: 'http://localhost:4567/versions',
  defaults: {
      section_id: '',
      file: ''
  }
});


