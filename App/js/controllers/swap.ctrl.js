(function(){
  var STATES        = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
      STATES.length = 25,
      SECOND        = 1000;

  angular.module('meetup').controller('swapCtrl', function($scope, $interval){
    var setStatesFrom = function(states){
      $scope.standingStates = [];
      for(var i = 0; i < states.length; i++){     $scope.standingStates.push({ name : states[i] }); }
      $scope.destroyedStates = [];
      for(var j = 0; j < states.length / 2; j++){ $scope.moveToDestroyed(1); }
    };

    var moveState = function(from, to){
      return function(moveIndex){
        $scope[to].push($scope[from][moveIndex]);
        $scope[from].splice(moveIndex, 1);
        sort();
      }
    }

    var sort = function(){
      var _sort = function(k){
        $scope[k] = _.sortBy($scope[k], 'name');
      };
      _sort('standingStates');
      _sort('destroyedStates');
    };

    $scope.moveToDestroyed = moveState('standingStates',  'destroyedStates');
    $scope.moveToStanding  = moveState('destroyedStates', 'standingStates');

    setStatesFrom(STATES);

    $scope.random = function(){
      setStatesFrom(_.shuffle(STATES));
    };

    var inter    = null;
    $scope.stop  = function(){ $interval.cancel(inter); };
    $scope.start = function(){
      $scope.stop();
      inter = $interval($scope.random, SECOND);
    };

  });

}).call(this);
