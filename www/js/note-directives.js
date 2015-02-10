// note-directives.js

'use strict';

(function(){
  var app = angular.module('notes-directives', []);

  app.directive('newnoteModal', function() {
    return {
      restrict: 'E',
      templateUrl: 'newnote-modal.html'
    };
  });
})();
