(function(){
  angular.module('meetup').animation('.pop', function(){
    return {
      show : function(element, done){
        console.log('wowzers');
        new TweenLite.to(element[0], 2, {
          scale      : 5,
          onComplete : done
        });
      }
    };
  });
}).call(this);