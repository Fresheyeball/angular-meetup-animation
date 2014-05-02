(function(){
  angular.module('meetup').directive('counter', function($animate){
    return {
      scope    : true,
      template : "<div class='count' ng-repeat='char in chars'>{{char}}</div>",
      link     : function (scope, element, attrs){
        scope.$watch(attrs.count, function(val){
          if(val)
            { scope.chars = val.split(''); }

          $animate.addClass(scope.$eval(attrs.countAnimation));
        });
        scope.$watch(attrs.countAnimation, function(){

        });
      }
    }
  });
}).call(this);