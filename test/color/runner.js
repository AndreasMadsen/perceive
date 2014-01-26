
var path = require('path');
var interpreted = require('interpreted');

var perceive = require('../../perceive.js');

interpreted({
  source: path.resolve(__dirname, 'source'),
  expected: path.resolve(__dirname, 'expected'),

  test: function(name, content, callback) {
    var source = new Function('return ' + content + ';')();
    var output = perceive(source, {colors: true});
    callback(null, output);
  }
});
