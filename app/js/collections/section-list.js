var Backbone = require('backbone');

var Section = require('../models/section');

module.exports = Backbone.Collection.extend({
  model: Section,
  url: 'http://totem-backend12.herokuapp.com/sections'
});
