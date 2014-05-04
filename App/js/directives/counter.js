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
            for(var j = 0; j < digits - chars.length + 2; j++ ){
              chars.unshift(0);
            }
            for(var k = 0; k < $scope.chars.length; k++){
              $scope.chars[k].val = parseInt(chars[k]);
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