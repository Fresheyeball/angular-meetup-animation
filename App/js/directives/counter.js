(function(){
  angular.module('meetup').directive('counter', function($animate, $timeout){
    return {
      scope    : true,
      template : "<div class='count' ng-repeat='char in chars'>{{char.value}}</div>",
      controller : function($scope, $attrs){
        $scope.$watch($attrs.counter, function(val){
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
        scope.$watch('chars', function(val){
          $animate.addClass(element, scope[attrs.counterAnimation], function(){
            element.removeClass(scope[attrs.counterAnimation]);              
          });
        }, true);
      }
    }
  });
}).call(this);