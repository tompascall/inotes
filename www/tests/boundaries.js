// test removing whitespace-boundaries

'use strict';

function removeWhiteSpaces (set) {
  var tagWithoutWhitespaceBoundary;
  return set.map(function(tag) {
    tagWithWhitespaceBoundary = tag.trim();
    return tagWithWhitespaceBoundary;
  });
}

var testSet = [
  'a',
  ' a',
  'a ',
  ' a ',
  'aa'
];

var modSet = removeWhiteSpaces(testSet);

modSet.forEach(function (tag) {
  var stringBuf = new Buffer(tag, 'utf8');
  console.log(stringBuf);
});

