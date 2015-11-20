Project = Backbone.Model.extend({
	urlRoot: 'http://totem-backend12.herokuapp.com/projects',
	defaults: {
	    title: ''
	}
});

Section = Backbone.Model.extend({
	urlRoot: 'http://totem-backend12.herokuapp.com/sections',
	defaults: {
	    title: '',
	    project_id: ''
	}
});

Version = Backbone.Model.extend({
  urlRoot: 'http://totem-backend12.herokuapp.com/versions',
  defaults: {
      section_id: '',
      file: ''
  }
});


