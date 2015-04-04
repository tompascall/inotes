// app.js

angular.module('fb-test', [])

.controller('FbController', function ($scope, $timeout) {
  var database = new Firebase('https://scorching-torch-6342.firebaseio.com/');
  var usersRef = database.child("users");

  usersRef.set({
    '0': {
      date_of_birth: "June 23, 1912",
      full_name: "Alan Turing"
    },
    '1': {
      date_of_birth: "December 9, 1906",
      full_name: "Grace Hopper"
    }
  });

  usersRef.on("value", function(snapshot) {
    console.log(JSON.stringify(snapshot.val()));

    $timeout(function() {
      $scope.users = snapshot.val();
    }, 0);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


  $scope.addUser = function () {
    var users = $scope.users.map(function (user) {
      return {
        date_of_birth: user.date_of_birth,
        full_name: user.full_name
      };
    });

    users.push({
      date_of_birth: $scope.newUserBirth,
      full_name: $scope.newUserName
    });

    console.log(JSON.stringify(users));
    usersRef.set(users);

    $scope.newUserBirth = $scope.newUserName = '';

  };
});
