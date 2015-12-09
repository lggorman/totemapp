var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: Section,
  url: 'http://totem-backend12.herokuapp.com/sections'
});
