(function(){
  angular.module('meetup').directive('counter', function($animate, $timeout){
    return {
      scope    : true,
      template : "<div class='count' ng-repeat='char in chars'>{{char.value}}</div>",
      link     : function (scope, element, attrs){
        scope.$watch(attrs.counter, function(val){
          if(val || val === 0)
            { 
              var chars = (val + '').split('');
              scope.chars = [];
              angular.forEach(chars, function(ch){
                scope.chars.push({
                  value : ch
                });
              });

              $timeout(function(){
                var chars = element[0].querySelectorAll('.count');
                for(var i = 0; i < chars.length; i++){
                  console.log(scope[attrs.counterAnimation]);
                  $animate.enter(chars[0], scope[attrs.counterAnimation]);                                  
                }
              }, 0, false);

            }
        });
        scope.$watch(attrs.countAnimation, function(){

        });
      }
    }
  });
}).call(this);