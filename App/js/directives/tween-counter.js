(function(){
  angular.module('meetup').directive('tweenCounter', function($animate, $timeout, $parse){
    return {
      scope    : true,
      template : "<div class='count' ng-repeat='char in chars'>{{char.val}}</div>",
      controller : function($scope, $attrs){ 

        var digits = $parse($attrs.tweenCounterDigits)($scope);
        $scope._count = 0;

        $scope.chars = [];
        for(var i = 0; i < digits; i++){
          $scope.chars.push({ 
            val : 0 
          });
        }

        $scope.$watch($attrs.tweenCounter, function(newVal, oldVal){
          var tprop = { val : oldVal };
          new TweenLite.to(tprop, 0.5, {
            val : newVal,
            onUpdate : function(){
              $scope._count = tprop.val;
              $scope.$digest();
            }
          });
        });

        $scope.$watch('_count', function(val){
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
      }
    }
  });
}).call(this);