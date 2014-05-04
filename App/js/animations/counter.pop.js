(function(){
  angular.module('meetup').animation('.pop', function(){
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
            scale      : 1.5,
            ease       : Cubic.easeInOut
          }, 0.6)
          .staggerTo(chars, 1, {
            scale      : 1,
            ease       : Back.easeOut
          }, 0.6).totalDuration(0.5);

        }else{ done(); }

        return function(){
          if(tl)
            { tl.pause().kill(); }
        };

      }
    };
  });
}).call(this);