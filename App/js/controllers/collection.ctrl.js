(function(){
  angular.module('meetup').controller('collectionCtrl', function($scope){
  
    $scope.students = [{
      name : "Tom"
    },{
      name : "Dick"
    },{
      name : "Sally"
    }];

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