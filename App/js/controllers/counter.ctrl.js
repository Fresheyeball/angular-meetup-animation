(function(){
  angular.module('meetup').controller('counterCtrl', function($scope, $interval){
    
    $scope.count       = 0;
    $scope.animOptions = ['pop','spin'];
    $scope.anim        = $scope.animOptions[0];

    $interval(function(){
      $scope.count++;
    }, 1000);
    
  });
}).call(this);