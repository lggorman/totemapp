 /**
  * New App view
  * @param  {}
  * @return {}
  */
 $(function(){
    new app.AppView();
  });

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

var TotemRouter = new AppRouter();
Backbone.history.start();
