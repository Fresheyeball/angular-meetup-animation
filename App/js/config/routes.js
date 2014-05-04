(function(){
  angular.module('meetup').config(function($routeProvider, $locationProvider){
    // $locationProvider.html5Mode(true);

    $routeProvider
      .when('/index', {
        templateUrl : 'partials/index.html',
        controller  : 'indexCtrl'
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
      .when('/transportObjects',{
        templateUrl : 'partials/transportObjects.html',
        controller  : 'transportCtrl'
      })
      .when('/swap', {
        templateUrl : 'partials/swap.html',
        controller  : 'swapCtrl'
      })
      .otherwise({
        redirectTo : '/index'
      });
  });
}).call(this);
