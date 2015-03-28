// routes.js

'use strict';

angular.module('inotes')

.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/notes.html'
  })
  .otherwise({
    templateUrl: 'templates/notes.html'
  });
});
