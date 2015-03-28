// tags.js

'use strict';

angular.module('inotes')

.factory('Tags', function TagsFactory () {
  return {
    filterTags: function (tagString) {
      var originalSet = this.createSetFromString(tagString);
      var set;
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
      var tagWithoutWhitespaceBoundary;
      return set.map(function(tag) {
        tagWithoutWhitespaceBoundary = tag.trim();
        return tagWithoutWhitespaceBoundary;
      });
    }
  };
})
