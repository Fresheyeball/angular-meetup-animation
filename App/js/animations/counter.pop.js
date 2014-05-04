(function(){
  angular.module('meetup').animation('.pop', function(){
    return {
      addClass : function(element, className, done){

        var chars = element[0].querySelectorAll('.count'),
            tl    = null;
        
        if(chars.length){

          tl = new TimelineMax({ onComplete:done })
          .staggerTo(chars, 0.2, {
            scale      : 1.5
          }, 0.1)
          .to(chars, 0.2, {
            scale      : 1
          });

        }else{ done(); }

        return function(){
          if(tl)
            { tl.kill(); }
        };

      }
    };
  });
}).call(this);