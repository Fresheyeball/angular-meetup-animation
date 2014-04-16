(function(){
  angular.module('meetup').animation('.explosivo', function(){
    return {
      enter : function(element, done){
        new TweenLite.fromTo(element[0], 0.3, {
          opacity    : 0,
          rotationY  : 45
        },{
          opacity    : 1,
          rotationY  : 0,
          onComplete : done
        });
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