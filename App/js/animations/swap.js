(function(){
  var amm   = angular.module('meetup'),
      tl    = null;
      moves = [];

  amm.directive('swappable', function($timeout){
    var setPositionsInRepeat = function(element){
      $timeout(function(){
        var candy = element[0].querySelectorAll('.candy');
        for(var i = 0; i < candy.length; i++){
          TweenLite.set(candy[i],{ y : i * 35 });
        }       
        TweenLite.set(element[0], { height : candy.length * 35 });        
      }, 0, false);
    };

    return {
      link : function(scope, element, attrs){
        setPositionsInRepeat(element); 
        scope.$watch(function(){
          var tweens = [];
          $timeout(function(){
            _.each(moves, function(move, i){
              console.log(i);
              tweens.push(new TweenLite.to(move, {
                y : i * 35
              }));              
            });
            tl = new TimelineLite({tweens : tweens});

          }, 0, false);
        });
      }
    };
  });

  amm.animation('.swap', function($timeout){
    var addToMove = function(element){

    };

    return {
      move  : function(element, done){
        console.log(element);
        moves.push(element);
        done();
      },
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
