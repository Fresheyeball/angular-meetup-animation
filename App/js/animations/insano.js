(function(){
  angular.module('meetup').animation('.insano', function(){
    return {
      enter : function(element, done){
        var tl    = new TimelineLite,
            split = new SplitText(element[0], {
              type : "words,chars"
            }),
            chars = split.chars;

        tl.staggerFrom(chars, 1, {
          opacity         : 0,
          scale           : 0,
          y               : 80,
          rotationX       : 180,
          transformOrigin : "0% 50% -50",
          ease            : Back.easeOut
        }, 0.01, "+=0");

        tl.add(new TweenLite.fromTo(element[0], 0.3, {
          opacity    : 0,
          rotationY  : 45,
          delay      : -1
        },{
          opacity    : 1,
          rotationY  : 0,
          onComplete : done
        }));
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