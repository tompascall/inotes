// note-directives.js

'use strict';

(function(){
  var app = angular.module('notes-directives', []);

  app.directive('removeNote', function() {

    var noteRemover = function(scope, element, attrs) {

      function removeNoteElement() {
        var noteElement = angular.element(element.closest('.note'));
        $(element).on('click', function() {
          if (confirm('Are you sure?')) {
            $(noteElement).remove();
            removeNoteObject();
            scope.updateNotes(scope);
          }
        });
      }

      function removeNoteObject() {
        var date = scope.note.date;
        scope.notes = scope.notes.filter(function(note) {
          return note.date !== date;
        });
      }

      removeNoteElement();
    };

    return {
      restrict: 'A',
      link: noteRemover
    };
  });
})();
