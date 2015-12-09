var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: Project,
  url: 'http://totem-backend12.herokuapp.com/projects'
});
