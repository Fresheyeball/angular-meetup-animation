(function(){

  angular.module('meetup').controller('testCtrl', function($scope){
    var expect = chai.expect;

    var Dummy = (function() {
      function Dummy() {
        this.dom = document.createElement('div');
        TweenLite.set(this.dom, {
          height : 10,
          width  : 10
        });
        document.body.appendChild(this.dom);
      }

      Dummy.prototype.animate = function() {
        var that = this;
        new TweenLite.to(this.dom, 1, {
          height: 100,
          onComplete: function(){
            that.done();
          }
        });
      };

      Dummy.prototype.done = function() {
        this.dom.foo = 'foo';
      };

      Dummy.prototype.remove = function(){
        document.body.removeChild(this.dom);
      };

      return Dummy;

    })();

    // unit tests inside a controller? This is demonstration madness!
    $scope.test = function(){
      document.getElementById('mocha').innerHTML = '';
      mocha.ui();
      describe('Dummy', function () {
        var d = null;

        beforeEach(function () {
          d = new Dummy();
        });

        afterEach(function(){
          d.remove();
        });

        it('should have a div attached as .dom', function () {
          expect(d.dom).to.exist;
        });

        it('should .animate should animate height to 100', function(){
          expect(d.dom.offsetHeight).to.equal(10);
          expect(d.dom.offsetWidth).to.equal(10);
          expect(d.dom.foo).to.not.exist;

          d.animate();
          TweenLite.flush();

          expect(d.dom.offsetHeight).to.equal(100);
          expect(d.dom.offsetWidth).to.equal(10);
          expect(d.dom.foo).to.equal('foo');
        });

      });

      mocha.run();
    };

  });

}).call(this);
