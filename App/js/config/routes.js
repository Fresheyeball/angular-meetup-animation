(function(){
  angular.module('meetup').config(function($routeProvider){

    $routeProvider
      .when('/index', {
        templateUrl : 'partials/index.html'
      })
      .when('/css3', {
        templateUrl : 'partials/css3.html',
        controller  : 'collectionCtrl'
      })
      .when('/greensock', {
        templateUrl : 'partials/greensock.html',
        controller  : 'collectionCtrl'
      })
      .when('/css-vs-js', {
        templateUrl : 'partials/css-vs-js.html'        
      })
      .when('/directives', {
        templateUrl : 'partials/directives.html',
        controller  : 'counterCtrl'
      })
      .when('/swap', {
        templateUrl : 'partials/swap.html',
        controller  : 'swapCtrl'
      })
      .when('/unit', {
        templateUrl : 'partials/unit.html'
      })
      .otherwise({
        redirectTo : '/index'
      });

  });
}).call(this);
