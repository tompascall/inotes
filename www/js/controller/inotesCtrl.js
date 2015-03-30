// inotesCtrl.js

'use strict';

angular.module('inotes')

.controller('InotesCtrl', function($scope, $ionicModal, Notes, Tags) {
  var controller = this;

  this.updateNotes = function () {
    Notes.save($scope.notes);
  };

  this.init = (function() {
    //$scope.note = {};
    $scope.searchNote = false;
    $scope.search = {};
    $scope.newNote = {};
    // Load or initialize projects
    $scope.notes = Notes.all();
    var welcomeNote = {
      title: 'Welcome!',
      text: 'Welcome to iNotes! This is a simple app ' +
        'to manage your notes. You can\n' +
        '- add your notes,\n' +
        '- remove them and\n' +
        '- edit and search them\n\n' +
        'Enjoy it!',
      tags: ['Welcome note', 'enjoy']
    };
    Object.defineProperty(welcomeNote, 'date', {
      value:Date.now(),
      writable: true,
      enumerable: false,
      configurable: false
    });

    if (!$scope.notes.dirty) {
      $scope.notes.dirty = true;
      $scope.notes.noteArr.push(welcomeNote);
      controller.updateNotes();
    }
    // Create our modal
    $ionicModal.fromTemplateUrl('newnote-modal.html', function(modal) {
      $scope.newnoteModal = modal;
    }, { scope: $scope, focusFirstInput: true});

    $ionicModal.fromTemplateUrl('editnote-modal.html', function(modal) {
      $scope.editnoteModal = modal;
    },  { scope: $scope });
  })();

  this.getNoteIndex = function (note) {
    var noteArr = $scope.notes.noteArr;
    for (var i = 0; i < noteArr.length; i++) {
      if (noteArr[i].date === note.date) return i;
    }
  };

  $scope.toggleSearchNote = function () {
    $scope.searchNote = !$scope.searchNote;
    if (!$scope.searchNote) {
      $scope.search = {};
    }
  };

  $scope.createNote = function() {

    $scope.newNote.tags = Tags.filterTags($scope.newNote.tags);

    Object.defineProperty($scope.newNote, 'date', {
      value: Date.now(),
      writable: true,
      enumerable: false, // otherwise the searching can be failed
      configurable: false
    });

    $scope.newNote.date = Date.now();
    $scope.notes.noteArr.unshift($scope.newNote);
    $scope.newnoteModal.hide();
    controller.updateNotes();
    $scope.newNote = {};
  };

  $scope.showNewNote = function() {
    $scope.newnoteModal.show();
  };

  $scope.hideNewNote = function() {
    $scope.newnoteModal.hide();
  };

  $scope.showEditNote = function(note) {
    $scope.editedNote = angular.copy(note);
    $scope.editnoteModal.show();
  };

  $scope.hideEditNote = function() {
    $scope.editnoteModal.hide();
  };

  $scope.editNote = function() {
    if (angular.isString($scope.editedNote.tags)) {
      $scope.editedNote.tags = Tags.filterTags($scope.editedNote.tags);
    }

    var noteIndex = controller.getNoteIndex($scope.editedNote);
    $scope.notes.noteArr[noteIndex] = $scope.editedNote;

    controller.updateNotes();
    $scope.editnoteModal.hide();
  };

  $scope.removeNote = function(note) {
    if (confirm('Are you sure?')) {
      var noteIndex = controller.getNoteIndex(note);
      $scope.notes.noteArr.splice(noteIndex, 1);
      controller.updateNotes();
    }
  };
});
