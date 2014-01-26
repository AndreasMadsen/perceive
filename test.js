var perceive = require('./perceive.js');

/*
var value = {
  "multiline": "first line\nsecond line",
  "longlist": [
    "very long complicated list", "with not enogth room for it all"
  ],
  "shortlist": [1, 2],
  "shortcomplex": ["A B"], // introduces bug
  "doubt": {
    "as string": "true",
    "as boolean": true
  }
};
*/

var value = [
  ["no", "No", "NO"],
  ["yes", "Yes", "YES"],
  ["false", "False", "FALSE"],
  ["true", "True", "TRUE"]
];

console.log( perceive(value, { colors: true }) );
