// app.js

'use strict';

angular.module('fb-test', ['ngHolder', 'firebase'])

.value('providersData', [
  {
    full_name: 'Samson Godfri Gnanasegaran',
    rating: 4,
    objects: [''],
    profilePictureUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_01.jpg'
  },
  {
    full_name: 'Adam Kelly',
    rating: 3,
    objects: [''],
    profilePictureUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_02.jpeg'
  }
])

.factory('ProvidersDataRef', function ($firebaseArray) {
  var database = new Firebase('https://scorching-torch-6342.firebaseio.com/');
  var providersRef = database.child('test/providers/tutors/');
  return $firebaseArray(providersRef);
})

.controller('FbController', function ($scope,
                                      providersData,
                                      ProvidersDataRef) {

  $scope.providers = ProvidersDataRef;

  $scope.addProvider = function () {
    $scope.providers.$add({
      full_name: $scope.newProviderName,
      rating: $scope.newProviderRating,
      objects: ['']
    });

    $scope.newProviderRating = $scope.newProviderName = $scope.objects = '';
  };

  $scope.providers.$loaded().then(function () {
    if ($scope.providers.length === 0) {
      providersData.forEach(function (provider) {
        $scope.providers.$add(provider);
      });
    }
  });
});
