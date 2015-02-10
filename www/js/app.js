angular.module('inotes', ['ionic', 'notes-directives'])

.factory('Notes', function() {
  return {
    all: function() {
      var noteString = window.localStorage['notes'];
      if(noteString) {
        return angular.fromJson(noteString);
      }
      return {noteArr: [], dirty: false};
    },
    save: function(notes) {
      window.localStorage['notes'] = angular.toJson(notes);
    }
   }
})

.controller('InotesCtrl', function($scope, $ionicModal, Notes) {
  init($scope, $ionicModal);

  $scope.createNote = function() {
    if(!$scope.note) {
      return;
    }
    $scope.note.tags = filterTags($scope.note.tags);
    $scope.note.date = Date.now();
    $scope.notes.noteArr.unshift($scope.note);
    $scope.noteModal.hide();
    updateNotes($scope);
    $scope.note = {};
  };

  $scope.newNote = function() {
    $scope.noteModal.show();
  };

  $scope.closeNewNote = function() {
    $scope.noteModal.hide();
  };

  $scope.removeNote = function(index) {
    if (confirm('Are you sure?')) {
      $scope.notes.noteArr.splice(index, 1);
      updateNotes($scope);
    }
  }

  function init($scope) {
    $scope.note = {};
    // Load or initialize projects
    $scope.notes = Notes.all();
    var welcomeNote = {
      title: 'Welcome!',
      text: 'Welcome to iNotes! This is a simple app ' +
        'to manage your notes. You can\n' +
        '- add your notes, and\n' +
        '- remove them\n\n' +
        'Soon you will be able to search and edit your notes, too.\n\n' +
        'Enjoy it!',
      tags: ['Welcome note', 'enjoy']
    };

    if (!$scope.notes.dirty) {
      $scope.notes.dirty = true;
      $scope.notes.noteArr.push(welcomeNote);
      updateNotes($scope);
    }
    // Create our modal
    $ionicModal.fromTemplateUrl('new-note.html', function(modal) {
      $scope.noteModal = modal;
    }, {
      scope: $scope
    });
  }

  function updateNotes($scope) {
    Notes.save($scope.notes);
  }
});

function filterTags(tagString) {
  var set = filterSameTags(tagString);
  return removeWhiteSpaces(set);
};

function filterSameTags(tagString) {
  var set = [];
  var tagArr;
  if (tagString) {
    tagArr = tagString.split(',').filter(function(tag) {
        return tag !== '';
    });

    tagArr.forEach(function(tag) {
      if (set.indexOf(tag) === -1) set.push(tag);
    });
  }
  return set;
};

function removeWhiteSpaces(set) {
  var tagWithWhiteSpaceBoundary;
  return set.map(function(tag) {
    tagWithWhiteSpaceBoundary = tag.match(/^\s*(\S+[\S\s]*\S+)\s*$/);
    return (tagWithWhiteSpaceBoundary) ? tagWithWhiteSpaceBoundary[1] : tag;
  });
};
