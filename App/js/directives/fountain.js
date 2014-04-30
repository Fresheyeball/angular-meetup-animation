(function(){
  angular.module('meetup').directive('fountain', function($animate){
    return {
      template : (function(){
        var temp = '';
        for(var i = 0; i < 25; i++){
           temp += '<div class="orb"></div>';
        }
        return temp;
      })(),
      link : function (scope, element, attrs){              
        scope.$on('flash', function(){
          $animate.addClass(scope.$eval(attrs.flash));
        });
      }
    }
  });
}).call(this);