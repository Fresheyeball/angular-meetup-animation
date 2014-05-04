(function(){
  angular.module('meetup').animation('.pop', function(){
    return {
      addClass : function(element, className, done){

        var chars = element[0].querySelectorAll('.count');
        
        if(chars.length){
          console.log('add');
          TweenMax.staggerTo(chars, 0.3, {
            scale      : 1.5
          }, 0.2, done);          
        }else{ done(); }

      }
    };
  });
}).call(this);