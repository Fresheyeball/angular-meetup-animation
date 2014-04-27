(function(){
  angular.module('meetup').animation('.insano', function(){
    return {
      enter : function(element, done){
        var tl     = new TimelineLite,
            tweens = [];
          
        tweens.push(new TweenLite.fromTo(element[0], 0.3, {
          opacity    : 0,
          rotationY  : 45,
          delay      : -1
        },{
          opacity    : 1,
          rotationY  : 0,
          onComplete : done
        }));

        tl.tweens(tweens);

      },
      leave : function(element, done){
        new TweenLite.fromTo(element[0], 0.3, {
          opacity    : 1,
          scale      : 1
        },{
          opacity    : 0,
          scale      : 3,
          onComplete : done
        });
      }
    };
  });
}).call(this);