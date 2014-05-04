(function(){
  angular.module('meetup').animation('.flip', function(){
    return {
      addClass : function(element, className, done){

        var chars = element[0].querySelectorAll('.count'),
            tl    = null;
        
        if(chars.length){
          TweenLite.set(element[0],{
            perspective : 500
          });

          tl = new TimelineMax({ onComplete : done })
          .set(chars, {
            opacity   : 0,
            rotationX : 180
          })
          .staggerTo(chars, 1, {
            opacity    : 1,
            rotationX  : 0,
            ease       : Back.easeOut
          }, 0.6)
          .totalDuration(0.5);

        }else{ done(); }

        return function(){
          if(tl)
            { tl.pause().kill(); }
        };

      }
    };
  });
}).call(this);