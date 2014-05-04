(function(){
  angular.module('meetup').directive('counter', function($animate, $timeout){
    return {
      scope    : true,
      template : "<div class='count' ng-repeat='char in chars'>{{char.val}}</div>",
      controller : function($scope, $attrs){
        digits = parseInt($attrs.counterDigits);

        $scope.chars = [];
        for(var i = 0; i < digits; i++){
          $scope.chars.push({ 
            val : 0 
          });
        }
        console.log($scope.chars);

        $scope.$watch($attrs.counter, function(val){
          if(val || val === 0){ 
            var chars = (val + '').split('');
            for(var i = $scope.chars.length - 1; i >= 0; i--){
              console.log(i, chars[i], $scope.chars[i]);
              if(chars[i])
                { $scope.chars[i].val = parseInt(chars[i]); }
              else
                { $scope.chars[i].val = 0; }
            }
          }
        });
      },
      link     : function (scope, element, attrs){
        scope.$watch('chars', function(val){
          console.log(scope[attrs.counterAnimation]);
          $animate.addClass(element, scope[attrs.counterAnimation], function(){
            element.removeAttr('class');              
          });
        }, true);
      }
    }
  });
}).call(this);