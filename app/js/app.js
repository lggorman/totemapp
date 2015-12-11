var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var StateManager = require('./vendor/backbone.statemanager');

var Manager = require('./state-manager');

Backbone.$ = $;

var TotemApp = require('./views/totemapp');

// App Init
var totemapp = new TotemApp();
var manger = new Manager();

Backbone.history.start({ pushState: true });
