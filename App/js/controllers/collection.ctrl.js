(function(){
  var i = 0,
      mores = [
        'Jack',
        'Jill',
        'I cant think of any more names',
        'Why does he keep clicking add?',
        'Seriously, I cant think of any more names',
        'This joke is stupid and getting old fast',
        'Why does he keep going with this?',
        'Stop it!',
        'I said Stop!',
        'I giveup, array over, next one will be an error'
      ],
      more = function()
        { return mores[i++]; };

  angular.module('meetup').controller('collectionCtrl', function($scope){

    $scope.reset = function(){
      $scope.students = [{
        name : "Tom"
      },{
        name : "Dick"
      },{
        name : "Sally"
      },{
        name : "The quick brown fox jumped over the lazy dog."
      }];
      i = 0;
    };

    $scope.reset();

    $scope.addNew = function(){
      if( !$scope.new )
        { $scope.new = more(); }

      $scope.students.push({name : $scope.new});
      $scope.new = null;
    };

    $scope.remove = function(student){
      var index = $scope.students.indexOf(student);
      $scope.students.splice(index, 1);
    };

  });
}).call(this);
