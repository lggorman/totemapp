var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: Version,
  url: 'http://totem-backend12.herokuapp.com/versions'
});
