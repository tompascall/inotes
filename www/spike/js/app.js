// app.js

angular.module('fb-test', ['ngHolder'])

.controller('FbController', function ($scope, $timeout) {
  var database = new Firebase('https://scorching-torch-6342.firebaseio.com/');
  var providersRef = database.child("test/providers/tutors/");
  $scope.providers = [];

  providersRef.set(null); // clear database

  providersRef.push({
    full_name: "Samson Godfri Gnanasegaran",
    rating: 4,
    objects: ['']
  });

  providersRef.push({
    full_name: "Adam Kelly",
    rating: 3,
    objects: ['']
  })

  providersRef.on("child_added", function(snapshot) {
    $timeout(function() {
      $scope.providers.push(snapshot.val());
    }, 0);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


  $scope.addProvider = function () {
    providersRef.push({
      full_name: $scope.newProviderName,
      rating: $scope.newProviderRating,
      objects: ['']
    });
    $scope.newProviderRating = $scope.newProviderName = $scope.objects = '';
  };
});
