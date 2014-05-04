(function(){
  angular.module('meetup').animation('.count', function($timeout){
    return {
      addClass : function(element, className, done){
        var getVal = function(){
          var chars = element[0].querySelectorAll('.count'),
              val   = '';
          if(chars.length){
            for(var i = 0; i < chars.length; i++){
              if(chars[i].innerHTML[0] !== '{'){
                val += chars[i].innerHTML;
              }
            }
            val = parseInt(val);
          }
          return val;
        };

        var onUpdate = function(tval){
          console.log(Math.floor(tval));
        };

        var oldVal = getVal();
        $timeout(function(){
          var newVal = getVal(),
              tprop  = {val : oldVal};
          if(oldVal || newVal){
            new TweenLite.to(tprop, 0.3, {
              val        : newVal,
              onComplete : done,
              onUpdate   : function(){
                onUpdate(tprop.val);
              }
            });            
          }else{ done(); }
        }, 0, false);
      }
    };
  });
}).call(this);