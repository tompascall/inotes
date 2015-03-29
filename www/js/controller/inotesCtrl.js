// inotesCtrl.js

'use strict';

angular.module('inotes')

.controller('InotesCtrl', function($scope, $ionicModal, Notes, Tags) {
  var controller = this;

  this.updateNotes = function () {
    Notes.save($scope.notes);
  };

  this.init = (function() {
    $scope.note = {};
    $scope.searchNote = false;
    $scope.search = {};
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

  $scope.toggleSearchNote = function () {
    $scope.searchNote = !$scope.searchNote;
    if (!$scope.searchNote) {

      $scope.search = {};

    }
  };

  $scope.createNote = function() {
    if(!$scope.note) {
      return;
    }
    $scope.note.tags = Tags.filterTags($scope.note.tags);
    $scope.note.date = Date.now();
    $scope.notes.noteArr.unshift($scope.note);
    $scope.newnoteModal.hide();
    controller.updateNotes();
    $scope.note = {};
  };

  $scope.showNewNote = function() {
    $scope.newnoteModal.show();
  };

  $scope.hideNewNote = function() {
    $scope.newnoteModal.hide();
  };

  $scope.showEditNote = function(index) {
    $scope.editedNote = angular.copy($scope.notes.noteArr[index]);
    $scope.editedNote.index = index;
    $scope.editnoteModal.show();
  };

  $scope.hideEditNote = function() {
    $scope.editnoteModal.hide();
  };

  $scope.editNote = function(index) {
    if (angular.isString($scope.editedNote.tags)) {
      $scope.editedNote.tags = Tags.filterTags($scope.editedNote.tags);
    }
    $scope.notes.noteArr[index] = $scope.editedNote;
    controller.updateNotes();
    $scope.editnoteModal.hide();
  };

  $scope.removeNote = function(index) {
    if (confirm('Are you sure?')) {
      $scope.notes.noteArr.splice(index, 1);
      controller.updateNotes();
    }
  };
});
