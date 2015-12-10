var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

Backbone.$ = $;

var TotemApp = require('./views/totemapp');

// App Init
var totemapp = new TotemApp();

Backbone.history.start({ pushState: true });
