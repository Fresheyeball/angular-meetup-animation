(function(){
  angular.module('meetup').config(function($routeProvider){
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
      .otherwise({
        redirectTo : '/index'
      });
  });
}).call(this);