ProjectList = Backbone.Collection.extend({
  model: Project,
  url: 'http://totem-backend12.herokuapp.com/projects'
});

SectionList = Backbone.Collection.extend({
  model: Section,
  url: 'http://totem-backend12.herokuapp.com/sections'
});
