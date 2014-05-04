(function(){
  var STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyomin'];

  angular.module('meetup').controller('swapCtrl', function($scope){
    $scope.standingStates = [];
    for(var i = 0; i < STATES.length; i++){
      $scope.standingStates.push({ name : STATES[i] });
    }

    $scope.destroyedStates = [];

    var moveState = function(from, to){
      return function(moveIndex){
        $scope[to].push($scope[from][moveIndex]);
        $scope[to] = _.sortBy($scope[to], 'name');
        $scope[from].splice(moveIndex, 1);
      }
    }

    $scope.moveToDestroyed = moveState('standingStates',  'destroyedStates');
    $scope.moveToStanding  = moveState('destroyedStates', 'standingStates');

    $scope.moveToDestroyed(1);

  });

}).call(this);
