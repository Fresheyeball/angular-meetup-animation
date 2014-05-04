(function(){
  angular.module('meetup').animation('.spin', function(){
    return {
      addClass : function(element, className, done){

        var chars = element[0].querySelectorAll('.count'),
            tl    = null;
        
        if(chars.length){
          TweenLite.set(chars,{
            perspective : 500
          });

          tl = new TimelineMax({ onComplete : done })
          .staggerTo(chars, 1, {
            rotation   : 360,
            ease       : Back.easeOut
          }, 0.6).totalDuration(1);

        }else{ done(); }

        return function(){
          if(tl)
            { tl.pause().kill(); }
        };

      }
    };
  });
}).call(this);