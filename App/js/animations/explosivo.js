(function(){
  angular.module('meetup').animation('.explosivo', function(){
    console.log('moot');
    return {
      enter : function(element, done){
        var tl = new TweenLite.fromTo(element[0], 0.3, {
          opacity      : 0,
          rotationY    : 45
        },{
          opacity      : 1,
          rotationY    : 0,
          onComplete   : done
        });
        return (function(){ tl.kill(); });
      },
      leave : function(element, done){
        var tweens = [],
            x      = element[0].querySelector('i');

        TweenLite.set(element[0], {
          transformPerspective:500
        });

        var getRandomRotation = function(max){
          return (Math.floor(Math.random() * max) * (Math.round(Math.random()) > 0 ? -1 : 1));
        };

        tweens.push(new TweenLite.to(element[0], 1, {
          opacity      : 0,
          scale        : 1.2,
          marginBottom : -element[0].offsetHeight,
          delay        : 1, 
          rotationX    : getRandomRotation(30),
          ease         : Cubic.easeOut
        }));

        tweens.push(new TweenLite.to(element[0], 2, {
          rotationY    : getRandomRotation(30),
          ease         : Cubic.easeInOut
        }));

        tweens.push(new TweenLite.to(x, 1, {
          right        : element[0].offsetWidth - x.offsetWidth,
          scale        : 1.5,
          ease         : Back.easeOut
        }));

        tweens.push(new TweenLite.to(x, 2, {
          rotation     : '7rad'
        }));

        var tl = new TimelineLite({
          tweens       : tweens,
          onComplete   : done
        }).duration(0.75);

        return (function(){ tl.kill(); });
      }
    };
  });

}).call(this);
