(function(){
  angular.module('meetup').directive('counter', function($animate, $timeout){
    return {
      scope    : true,
      template : "<div class='count' ng-repeat='char in chars'>{{char.value}}</div>",
      controller : function($scope, $attrs){
        var tl    = null,
            tprop = { val : 0 };

        $scope.counter = 0;

        $scope.$watch($attrs.counter, function(newVal, oldVal){
          tprop.val = oldVal || 0;
          tl = new TweenLite.to(tprop, 1, {
            val      : newVal,
            onUpdate : function(){
              $scope.counter = Math.floor(tprop.val);
              $scope.$digest();
            }
          });
        });

        $scope.$watch('counter', function(val){
          if(val || val === 0)
            { 
              var chars = (val + '').split('');
              $scope.chars = [];
              angular.forEach(chars, function(ch){
                $scope.chars.push({
                  value : ch
                });
              });
            }          
        });

      },
      link     : function (scope, element, attrs){
        TweenLite.set(element,{
          perspective : 500
        });
        scope.$watch('chars', function(val){
          $animate.addClass(element, scope[attrs.counterAnimation], function(){
            element.removeClass(scope[attrs.counterAnimation]);
          });
        }, true);
      }
    }
  });
}).call(this);