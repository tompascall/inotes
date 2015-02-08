angular.module('inotes', ['ionic'])

.factory('Notes', function() {
   return {
  //   all: function() {
  //     var noteString = window.localStorage['notes'];
  //     if(noteString) {
  //       return angular.fromJson(noteString);
  //     }
  //     return [];
  //   },
  //   save: function(notes) {
  //     window.localStorage['notes'] = angular.toJson(notes);
  //   }
   }
})

.controller('InotesCtrl', function($scope, $ionicModal, Notes) {
  this.note = {};
  // Load or initialize projects
  //$scope.notes = Notes.all();
  $scope.notes = notes;

  // Create our modal
  $ionicModal.fromTemplateUrl('new-note.html', function(modal) {
    $scope.noteModal = modal;
  }, {
    scope: $scope
  });

  $scope.createNote = function(note) {
    if(!note) {
      return;
    }
    note.tags = filterTags(note.tags);
    note.date = Date.now();
    console.log(note.tags);
    $scope.notes.unshift(note);
    $scope.noteModal.hide();

    //Notes.save($scope.notes);
    note = {};
  };

  $scope.newNote = function() {
    $scope.noteModal.show();
  };

  $scope.closeNewNote = function() {
    $scope.noteModal.hide();
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

var notes = [
  {
    title: 'Note1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['lorem', 'ipsum'],
    date: 1422563026917
  },
  {
    title: 'Note2',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    tags: ['omnis', 'natus'],
    date: 1422563073947
  },
  {
    title: 'Note3',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['lorem', 'ipsum'],
    date: 1422563114822
  },
  {
    title: 'Note4',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    tags: ['omnis', 'natus'],
    date: 1422563136774
  }
];
