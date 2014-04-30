(function(){
  angular.module('meetup').controller('counterCtrl', function($scope){
    $scope.count = 0;
    $scope.anim  = 'pop';
  });
}).call(this);