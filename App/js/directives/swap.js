(function(){
  var amm          = angular.module('meetup'),
      CANDY_HEIGHT = 35, 
      transport    = null;

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
            if(element[0]._gsTransform && element[0]._gsTransform.y){
              ctrl.tweens.push( new TweenLite.to( element[0], 0.3, { 
                y     : scope.$index * CANDY_HEIGHT,
                delay : scope.$index * 0.05
              }));
            }else{
              TweenLite.set(element[0], { y : scope.$index * CANDY_HEIGHT });
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
        });
        var transport = element.clone(),
            example   = document.querySelectorAll('.example')[0];

        transport = angular.element(transport[0].outerHTML.replace('li', 'div'));

        var elementStyle    = getComputedStyle(element[0]),
            backgroundColor = elementStyle.backgroundColor,
            marginTop       = parseInt(elementStyle.marginTop) * 2,
            elementposition = element[0].getBoundingClientRect(),
            parentPosition  = example.getBoundingClientRect(),
            position        = {
              top  : elementposition.top - parentPosition.top - marginTop,
              left : elementposition.left - parentPosition.left - marginTop
            };

        TweenLite.set(transport, {
          x : position.left,
          y : position.top,
          background : getComputedStyle(element[0]).backgroundColor,
          position : 'absolute',
          width : element[0].clientWidth,
          height : CANDY_HEIGHT,
          left : 0,
          top : 0
        });

        angular.element(example).append(transport);

        transport(transport);

      }
    };
  });

}).call(this);
