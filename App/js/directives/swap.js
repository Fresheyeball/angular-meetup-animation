(function(){
  var amm   = angular.module('meetup'),
      CANDY_HEIGHT = 35;

  amm.directive('swappable', function($timeout){
    return {
      scope : true,
      controller : function($scope, $attrs){
        this.elems = [];

        $scope.$watch($attrs.swappable, function(val){ $scope.states = _.sortBy(val, 'name'); });
        
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

        scope.$watchCollection('states', function(){
          var tweens = [];
          $timeout(function(){
            console.log('watcher', attrs.swappable);
            for(var i = 0; i < ctrl.elems.length; i++){
              tweens.push(new TweenLite.to(ctrl.elems[i], 0.5, {
                y : i * CANDY_HEIGHT
              }));
              new TimelineLite({tweens:tweens});
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
