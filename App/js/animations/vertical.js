(function(){
  angular.module('meetup').animation('.jsvertical', function(){
    return {
      enter : function(element, done){
        new TweenLite.fromTo(element[0], 0.3, {
          opacity    : 0,
          height     : 0,
          margin     : 0,
          padding    : 0
        },{
          opacity    : 1,
          height     : 32,
          margin     : 3,
          padding    : 5,
          onComplete : done
        });
      },
      leave : function(element, done){
        new TweenLite.to(element[0], 0.3, {
          opacity    : 0,
          height     : 0,
          margin     : 0,
          padding    : 0,
          onComplete : done
        });
      }
    };
  });
}).call(this);
