(function(){
  var amm = angular.module('meetup');

  amm.directive('swappable', function($timeout){
    return {
      link : function(scope, element, attrs){
        $timeout(function(){
          var candy = element[0].querySelectorAll('.candy');
          for(var i = 0; i < candy.length; i++){
            TweenLite.set(candy[i],{
              y : i * 35
            });
          }       
          TweenLite.set(element[0], { height : candy.length * 35 });
        }, 0, false); 
      }
    };
  });

  amm.animation('.swap', function(){
    return {
      enter : function(element, done){

        var tl = new TweenLite.fromTo(element[0], 0.3, {
          opacity    : 0,
          height     : 0,
          margin     : 0,
          padding    : 0
        },{
          opacity    : 1,
          height     : element[0].clientHeight,
          margin     : 3,
          padding    : 5,
          onComplete : done
        });

        return (function(){ 
          if(tl)
            { tl.kill(); }
        });

      },
      leave : function(element, done){
        
        var tl = new TweenLite.to(element[0], 0.3, {
          opacity    : 0,
          height     : 0,
          padding    : 0,
          margin     : '0 0 -3px 0',
          onComplete : done
        });
        
        return (function(){ 
          if(tl)
            { tl.kill(); }
        });

      }
    };
  });
}).call(this);
