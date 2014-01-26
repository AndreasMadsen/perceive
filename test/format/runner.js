
var path = require('path');
var yaml = require('js-yaml');
var interpreted = require('interpreted');

var perceive = require('../../perceive.js');

interpreted({
  source: path.resolve(__dirname, 'source'),
  expected: path.resolve(__dirname, 'expected'),

  test: function(name, content, callback) {
    var source = new Function('return ' + content + ';')();
    var output = perceive(source) + '\n';
    callback(null, output);
  },

  types: {
    'yaml': {
      'test': function (t, actual, expected) {
        t.deepEqual(actual, expected);
        t.equal(validateYaml(actual), null);
        t.equal(validateYaml(expected), null);
      },
      'update': function (actual) {
        return actual;
      }
    }
  }
});

function validateYaml(content) {
  try {
    yaml.safeLoad(content, { strict: true });
    return null;
  } catch (e) {
    return e;
  }
}
