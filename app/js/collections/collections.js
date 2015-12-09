ProjectList = Backbone.Collection.extend({
  model: Project,
  url: 'http://localhost:4567/projects'
});

SectionList = Backbone.Collection.extend({
  model: Section,
  url: 'http://localhost:4567/sections'
});

VersionList = Backbone.Collection.extend({
  model: Version,
  url: 'http://localhost:4567/versions'
});
