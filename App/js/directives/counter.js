(function(){
  angular.module('meetup').directive('counter', function($animate, $timeout, $parse){
    return {
      scope    : true,
      template : "<div class='count' ng-repeat='char in chars'>{{char.val}}</div>",
      controller : function($scope, $attrs){        
        var digits = $parse($attrs.counterDigits)($scope);

        $scope.chars = [];
        for(var i = 0; i < digits; i++){
          $scope.chars.push({ 
            val : 0 
          });
        }

        $scope.$watch($attrs.counter, function(val){
          if(val || val === 0){ 
            var chars = (val + '').split('').map(function(x){ return parseInt(x); });

            if(chars.length < digits){
              var delta = digits - chars.length;
              for(var j = 0; j < delta; j++ ){
                chars.unshift(0);
              }              
            }

            for(var k = 0; k < digits; k++ ){
              $scope.chars[k].val = parseInt(chars[k]);
            }
          }
        });

      },
      link     : function (scope, element, attrs){

        scope.$watch('chars', function(val){
          $animate.addClass(element, scope[attrs.counterAnimation], function(){
            element.removeAttr('class');
          });
        }, true);

      }
    }
  });
}).call(this);