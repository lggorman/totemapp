var Backbone = require('backbone');

var Project = require('../models/project');

module.exports = Backbone.Collection.extend({
  model: Project,
  url: 'http://totem-backend12.herokuapp.com/projects'
});
