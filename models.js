Project = Backbone.Model.extend({
	urlRoot: 'http://totem-backend12.herokuapp.com/projects',
	defaults: {
	    title: ''
	}
});

ProjectList = Backbone.Collection.extend({
	model: Project,
	url: 'http://totem-backend12.herokuapp.com/projects'
});

Section = Backbone.Model.extend({
	urlRoot: 'http://totem-backend12.herokuapp.com/sections',
	defaults: {
	    title: '',
	    project_id: ''
	}
});

SectionList = Backbone.Collection.extend({
	model: Section,
	url: 'http://totem-backend12.herokuapp.com/sections'
});

Version = Backbone.Model.extend({
	urlRoot: 'http://totem-backend12.herokuapp.com/versions',
	defaults: {
	    section_id: '',
	    file: ''
	}
});

VersionList = Backbone.Collection.extend({
	model: Version,
	url: 'http://totem-backend12.herokuapp.com/versions'
});