// app.js

angular.module('fb-test', ['ngHolder'])

.controller('FbController', function ($scope, $timeout) {
  var database = new Firebase('https://scorching-torch-6342.firebaseio.com/');
  var usersRef = database.child("test/users");

  usersRef.set({
    '0': {
      full_name: "Samson Godfri Gnanasegaran",
      rating: 4
    },
    '1': {
      full_name: "Adam Kelly",
      rating: 3,
    }
  });

  usersRef.on("value", function(snapshot) {
    $timeout(function() {
      $scope.users = snapshot.val();
    }, 0);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


  $scope.addUser = function () {
    // Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
    // The $scope.users object contains $$hashKey angular key, so we have to filter it out
    var users = $scope.users.map(function (user) {
      return {
        full_name: user.full_name,
        rating: user.rating
      };
    });

    users.push({
      full_name: $scope.newUserName,
      date_of_birth: $scope.rating
    });

    usersRef.set(users);

    $scope.rating = $scope.newUserName = '';

  };
});
