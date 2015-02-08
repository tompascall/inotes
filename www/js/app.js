angular.module('inotes', ['ionic', 'notes-directives'])

.factory('Notes', function() {
  return {
    all: function() {
      var noteString = window.localStorage['notes'];
      if(noteString) {
        return angular.fromJson(noteString);
      }
      return [];
    },
    save: function(notes) {
      window.localStorage['notes'] = angular.toJson(notes);
    }
   }
})

.controller('InotesCtrl', function($scope, $ionicModal, Notes) {
  $scope.note = {};
  // Load or initialize projects
  $scope.notes = Notes.all();

  // Create our modal
  $ionicModal.fromTemplateUrl('new-note.html', function(modal) {
    $scope.noteModal = modal;
  }, {
    scope: $scope
  });

  $scope.createNote = function() {
    if(!$scope.note) {
      return;
    }
    $scope.note.tags = filterTags($scope.note.tags);
    $scope.note.date = Date.now();
    $scope.notes.unshift($scope.note);
    $scope.noteModal.hide();
    $scope.updateNotes($scope);
    $scope.note = {};
  };

  $scope.updateNotes = function(scope) {
    $scope.notes = scope.notes;
    Notes.save($scope.notes);
  }

  $scope.newNote = function() {
    $scope.noteModal.show();
  };

  $scope.closeNewNote = function() {
    $scope.noteModal.hide();
  };
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
