(function(){
  angular.module('meetup').animation('.pop', function(){
    return {
      addClass : function(element, className, done){

        var chars = element[0].querySelectorAll('.count'),
            tl    = null;
        
        if(chars.length){
          tl = new TweenMax.staggerTo(chars, 2, {
            scale      : 5
          }, 0.2, done);          
        }else{ done(); }
        
        return function(){
          console.log(tl);
          if(tl)
            { tl.kill(); }
        };

      }
    };
  });
}).call(this);