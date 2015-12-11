var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: 'http://totem-backend12.herokuapp.com/projects',
  defaults: {
      title: ''
  }
});
