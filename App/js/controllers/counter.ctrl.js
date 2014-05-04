(function(){
  angular.module('meetup').controller('counterCtrl', function($scope, $interval){
    
    $scope.count       = 0;
    $scope.animOptions = ['none','pop','count'];
    $scope.anim        = $scope.animOptions[0];

    $interval(function(){
      $scope.count = Math.floor(Math.random() * 1000);
    }, 2000);

  });
}).call(this);