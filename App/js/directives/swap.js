(function(){
  var amm   = angular.module('meetup'),
      CANDY_HEIGHT = 35;

  amm.directive('swappable', function($timeout){
    return {
      scope : true,
      controller : function($scope, $attrs){
        this.tweens = [];

        $scope.$watchCollection($attrs.swappable, function(val){ 
          $scope.states = val; 
        });

        this.animate = function(){
          new TimelineLite({tweens : this.tweens}).totalDuration(1);
          this.tweens = [];
        };

      },
      link : function(scope, element, attrs, ctrl){
        var tm = null;
        scope.$watch(function(){
          $timeout.cancel(tm);
          tm = $timeout(function(){
            new TweenLite.set(element[0], {
              height : scope.states.length * CANDY_HEIGHT
            });
          }, 0, false);
        });
      }

    };
  });

  amm.directive('swap', function($timeout){
    return {
      require : '^swappable',
      link    : function(scope, element, attrs, ctrl){
        var tm = null; 
        element[0].removeAttribute('style');
        scope.$watch(function(){
          $timeout.cancel(tm);
          $timeout(function(){
            if(element[0]._gsTransform && element[0]._gsTransform.y > 0){
              ctrl.tweens.push( new TweenLite.to( element[0], 0.3, { 
                y     : scope.$index * CANDY_HEIGHT,
                delay : scope.$index * 0.05
              }));
            }else{
              TweenLite.set(element[0],    { y : scope.$index * CANDY_HEIGHT });
            }
            if(scope.$index === scope.states.length - 1){
              ctrl.animate();
            }            
          }, 0, false);
        });

      }
    };
  });

  amm.animation('.swap', function(){
    return {
      enter : function(element, done){
        TweenLite.from(element[0], 0.3, {
          opacity : 0,
          height  : 0,
          padding : 0,
          onComplete : done
        });
      },
      leave : function(element, done){
        TweenLite.to(element[0], 0.3, {
          opacity : 0,
          height  : 0,
          padding : 0,
          onComplete : done
        })
      }
    };
  });

}).call(this);
