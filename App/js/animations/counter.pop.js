(function(){
  angular.module('meetup').animation('.pop', function(){
    console.log('bowser');
    return {
      addClass : function(element, done){
        console.log('wowzer');
        var chars = element[0].querySelectorAll('.count'),
            tl    = null;
        console.log(chars);
        if(chars.length){
          tl = new TweenMax.staggerTo(chars, 2, {
            scale      : 5
          }, 0.2, done);
        }
        return function(){
          if(tl)
            { tl.kill(); }
        };
      }
    };
  });
}).call(this);