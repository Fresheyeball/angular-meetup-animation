(function(){
  var amm   = angular.module('meetup');

  amm.directive('swappable', function(){
    return {
      controller : function(){
        var i = 0;
        this.test = function(){
          console.log(i++);
        };
      }
    };
  });

  amm.directive('swap', function(){
    return {
      require : '^swappable',
      link    : function(scope, element, attrs, ctrl){
        ctrl.test();
      }
    };
  });

}).call(this);
