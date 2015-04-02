// notes.js

'use strict';

angular.module('inotes')

.factory('Notes', function() {
  return {
    all: function() {
      var noteString = window.localStorage.notes;
      if(noteString) {
        return angular.fromJson(noteString);
      }
      return {noteArr: [], dirty: false};
    },
    save: function(notes) {
      window.localStorage.notes = angular.toJson(notes);
      console.log('saving...');
      console.log(notes);
    }
   };
});
