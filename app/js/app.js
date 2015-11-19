/**
* Routes
* @param  {}
* @return {}
*/
var AppRouter = Backbone.Router.extend({

    routes:{
        'projects/:id' : 'singleProject'
    },

    initialize: function(){
      // console.log('initialize app');
      this.events();
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
    TotemRouter = new AppRouter();

Backbone.history.start({ pushState: true });
