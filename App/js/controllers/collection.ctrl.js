(function(){
  angular.module('meetup').controller('collectionCtrl', function($scope){
    $scope.students = [
      "Tom",
      "Dick",
      "Sally"
    ];

    $scope.addNew = function(){
      $scope.students.push($scope.new);
      $scope.new = null;
    };

    $scope.remove = function(student){
      var index = $scope.students.indexOf(student);
      $scope.students.splice(index, 1);
    };

    $scope.animClass = 'slide';

  });
}).call(this);