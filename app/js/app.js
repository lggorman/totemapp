var app = app || {};
/**
* Routes
* @param  {}
* @return {}
*/
  app.AppRouter = Backbone.Router.extend({

    routes:{
        'projects/:id' : 'singleProject',
        'test' : 'test'
    },

    initialize: function(){
      // console.log('initialize app');
      this.events();
    },

    test: function(){
      console.log('test');
    },

    singleProject: function(id) {
      console.log(id);
    },

    events: function () {
      $('a').click(function (e) {
        e.preventDefault();
        console.log('test');
        // TotemApp.navigate(e.target.pathname, true);
      });
    }
});

// App Init
var TotemApp    = new app.AppView(),
    TotemRouter = new app.AppRouter();

Backbone.history.start({ pushState: true });
