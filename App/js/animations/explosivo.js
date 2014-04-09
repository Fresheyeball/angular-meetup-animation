(function(){
  angular.module('meetup').animation('.explosivo', function(){
    return {
      enter : function(element, done){
        new TweenLite.fromTo(element[0], 0.3, {
          opacity    : 0
        },{
          opacity    : 1,
          onComplete : done
        });
      },
      leave : function(element, done){
        new TweenLite.fromTo(element[0], 0.3, {
          opacity    : 1
        },{
          opacity    : 0,
          onComplete : done
        });
      }
    };
  });
}).call(this);