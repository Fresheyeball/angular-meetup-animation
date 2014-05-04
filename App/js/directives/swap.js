(function(){
  var amm   = angular.module('meetup'),
      CANDY_HEIGHT = 35;

  amm.directive('swappable', function($timeout){
    return {
      scope : true,
      controller : function($scope, $attrs){
        this.elems = [];

        $scope.$watchCollection($attrs.swappable, function(val){ $scope.states = val; });
        
        this.addElement = function(element){
          this.elems.push(element);
        };
        this.removeElement = function(element){
          console.log('remove', element);
          this.elems = _.without(this.elems, element);
        };

      },
      link : function(scope, element, attrs, ctrl){

        $timeout(function(){
          TweenLite.set(element[0], {
            height : scope.states.length * CANDY_HEIGHT
          });
        }, 0, false);

        var firster = true;
        scope.$watchCollection('states', function(){
          var tweens = [];
          $timeout(function(){
            for(var i = 0; i < ctrl.elems.length; i++){
              tweens.push(new TweenLite.to(ctrl.elems[i], 2, {
                y     : i * CANDY_HEIGHT,
                delay : i
              }));
              var durration = firster ? 0 : 2; firster = false;
              new TimelineLite({tweens:tweens}).totalDuration(durration);
            }
          }, 0, false);
        });

      }
    };
  });

  amm.directive('swap', function($timeout){
    return {
      require : '^swappable',
      link    : function(scope, element, attrs, ctrl){
        ctrl.addElement(element);
        scope.$on('$destroy', function(){
          ctrl.removeElement(element);
        });
      }
    };
  });

}).call(this);
