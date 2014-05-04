(function(){
  angular.module('meetup').controller('counterCtrl', function($scope, $interval){
    var interval       = null,
        SECOND         = 1000;
    $scope.count       = 0;
    $scope.animOptions = ['none','pop','spin'];
    $scope.anim        = $scope.animOptions[0];

    $scope.random      = function(){ Math.floor(Math.random() * 1000); };
    $scope.incrementBy = function(amount){ $scope.count += amount; };
    $scope.increment   = function(){ $scope.incrementBy(1); };

    $scope.stop  = function(){ $interval.cancel(interval); };
    $scope.start = function(){ 
      $scope.stop();
      var interval = $interval($scope.increment, SECOND); 
    };    
    $scope.start();

    $scope.$watch('count', function(val){
      if(val > 9999){ val = 0; }
    });

  });
}).call(this);