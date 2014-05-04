(function(){
  angular.module('meetup').controller('counterCtrl', function($scope, $interval){
    var interval       = null,
        SECOND         = 1000;
    $scope.count       = 0;
    $scope.animOptions = ['none','pop','spin'];
    $scope.anim        = $scope.animOptions[0];
    $scope.digits      = 3;

    $scope.random      = function(){ $scope.count = Math.floor(Math.random() * 999); };
    $scope.incrementBy = function(amount){ $scope.count += amount; };
    $scope.increment   = function(){ $scope.incrementBy(1); };

    $scope.stop        = function(){ $interval.cancel(interval); interval = null; };
    $scope.start       = function(){ 
      $scope.stop();
      interval = $interval($scope.increment, SECOND); 
    };    
    $scope.start();

    $scope.$watch('count', function(val){
      if(val > 999){ val = 0; }
    });

  });
}).call(this);