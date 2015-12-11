var Backbone = require('backbone');

var Version = require('../models/version');

module.exports = Backbone.Collection.extend({
  model: Version,
  url: 'http://totem-backend12.herokuapp.com/versions'
});
