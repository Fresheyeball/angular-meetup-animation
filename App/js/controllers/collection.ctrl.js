(function(){
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
    };

    $scope.reset();

    $scope.addNew = function(){
      $scope.students.push({name : $scope.new});
      $scope.new = null;
    };

    $scope.remove = function(student){
      var index = $scope.students.indexOf(student);
      $scope.students.splice(index, 1);
    };

  });
}).call(this);
