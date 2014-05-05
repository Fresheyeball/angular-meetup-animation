(function(){
  var amm             = angular.module('meetup'),
      SWAP_HEIGHT    = 35,
      TRANSPORT_CLASS = 'transport',
      transit         = null;

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
              height : scope.states.length * SWAP_HEIGHT
            });
          }, 0, false);
        });

        transit = function(transport, parentPosition, marginTop){
          $timeout(function(){$timeout(function(){
            var swaps             = document.querySelectorAll('[swap]'),
                text              = transport.text().trim(),
                desinationElement = null;

            for(var i = 0; i < swaps.length; i++){
              var swap = angular.element(swaps[i]);
              if(swap.text().trim() === text && !swap.hasClass(TRANSPORT_CLASS)){
                desinationElement = swap[0];
              }
            }
            
            if(!desinationElement){ return; }

            TweenLite.set(desinationElement, {
              opacity : 0
            });

            var destinationPosition = desinationElement.getBoundingClientRect(),
                backgroundColor     = getComputedStyle(desinationElement).backgroundColor,
                position            = {
                  top  : destinationPosition.top - parentPosition.top - marginTop,
                  left : destinationPosition.left - parentPosition.left - marginTop
                };

            angular.element(desinationElement).addClass('destin');

            new TimelineLite().to(transport, 1, {
              y : position.top,
              x : position.left,
              background : backgroundColor,
              onComplete : function(){
                TweenLite.set(desinationElement, {
                  opacity : 1
                });
              }
            }).to(transport, 0.5, {
              opacity : 0,
              onComplete : function(){
                angular.element(transport).remove();
              }
            });

          }, 0, false); }, 0, false);
        };
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
                y     : scope.$index * SWAP_HEIGHT,
                delay : scope.$index * 0.05
              }));
            }else{
              TweenLite.set(element[0], { y : scope.$index * SWAP_HEIGHT });
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
          x          : position.left,
          y          : position.top,
          background : getComputedStyle(element[0]).backgroundColor,
          position   : 'absolute',
          width      : element[0].clientWidth,
          height     : SWAP_HEIGHT - (marginTop / 2),
          left       : 0,
          top        : 0
        });

        element.addClass(TRANSPORT_CLASS);

        transport.addClass(TRANSPORT_CLASS);

        angular.element(example).append(transport);

        transit(transport, parentPosition, marginTop);

      }
    };
  });

}).call(this);
