(function(){
  angular.module('meetup').animation('.swap', function(){
    return {
      enter : function(element, done){

        var tl = new TweenLite.fromTo(element[0], 0.3, {
          opacity    : 0,
          height     : 0,
          margin     : 0,
          padding    : 0
        },{
          opacity    : 1,
          height     : element[0].clientHeight,
          margin     : 3,
          padding    : 5,
          onComplete : done
        });

        return (function(){ 
          if(tl)
            { tl.kill(); }
        });

      },
      leave : function(element, done){
        
        var tl = new TweenLite.to(element[0], 0.3, {
          opacity    : 0,
          height     : 0,
          padding    : 0,
          margin     : '0 0 -3px 0',
          onComplete : done
        });
        
        return (function(){ 
          if(tl)
            { tl.kill(); }
        });

      }
    };
  });
}).call(this);
