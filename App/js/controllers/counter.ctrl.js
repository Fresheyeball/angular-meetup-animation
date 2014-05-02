(function(){
  angular.module('meetup').controller('counterCtrl', function($scope, $interval){
    $scope.count = 0;
    $scope.anim  = 'pop';
    $interval(function(){
      $scope.count++;
    }, 1000);
  });
}).call(this);