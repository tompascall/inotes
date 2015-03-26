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
      console.log('saving...');
      console.log(notes);
    }
   }
})

.factory('Tags', function () {
  return {
    filterTags: function (tagString) {
      var originalSet = this.createSetFromString(tagString);
      var set = [];
      set = this.removeWhiteSpaces(originalSet);
      console.log('after removing: ', set);
      return this.filterSameTags(set);
    },

    createSetFromString: function (tagString) {
      var tagArr;
      if (tagString) {
        tagArr = tagString.split(',').filter(function(tag) {
            console.log(tag);
            return tag !== '';
        });
      }
      return tagArr;
    },

    filterSameTags: function (tags) {
      var set = [];
      tags.forEach(function(tag) {
        if (set.indexOf(tag) === -1) set.push(tag);
      });
      return set;
    },

    removeWhiteSpaces: function (set) {
      var tagWithWhiteSpaceBoundary;
      return set.map(function(tag) {
        tagWithWhiteSpaceBoundary = tag.match(/^\s*(\S+[\S\s]*\S+)\s*$/);
        return (tagWithWhiteSpaceBoundary) ? tagWithWhiteSpaceBoundary[1] : tag;
      });
    }
  };
})

.controller('InotesCtrl', function($scope, $ionicModal, Notes, Tags) {
  var controller = this;

  this.updateNotes = function () {
    Notes.save($scope.notes);
  };

  this.init = (function() {
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

  $scope.testAlert = function () {
    alert("searching");
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


