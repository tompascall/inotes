// test removing whitespace-boundaries

'use strict';

function removeWhiteSpaces (set) {
  var tagWithWhiteSpaceBoundary;
  return set.map(function(tag) {
    tagWithWhiteSpaceBoundary = tag.match(/^\s*(\S+[\S\s]*\S+)\s*$/);
    return (tagWithWhiteSpaceBoundary) ? tagWithWhiteSpaceBoundary[1] : tag;
  });
}

var testSet = [
  'a a',
  ' a a',
  ' a a '
];

var modSet = removeWhiteSpaces(testSet);

modSet.forEach(function (tag) {
  var stringBuf = new Buffer(tag, 'utf8');
  console.log(stringBuf);
});

