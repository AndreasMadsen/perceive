
var type = require('type-component');

module.exports = function (value, options) {
  var formatter = new Preceive(options || {});

  return formatter[type(value)](value);
};

function Preceive(options) {
  this.colors = (options.colors === true);
  this.indent = '';
  this.complexNewline = false;
}

/*
 * Helpers
 */
// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
var COLOR_CODES = {
  'grey' : [90, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

Preceive.prototype._colorize = function (color, string) {
  if (this.colors) {
    return '\u001b[' + COLOR_CODES[color][0] + 'm' + string + '\u001b[' + COLOR_CODES[color][1] + 'm';
  } else {
    return string;
  }
};

Preceive.prototype._complexStart = function () {
  if (this.complexNewline) {
    return '\n';
  } else {
    this.complexNewline = true;
    return '';
  }
};

function stringLength(string) {
  return string.length;
}

var SPACEING = [' ', '  ', '   ', '    ', '     ', '      '];
var NO_SPACEING = [' ', ' ', ' ', ' ', ' '];

var COMPLEX = {
  'object': true,
  'array': true,
  'arguments': true,
  'string': false,
  'null': false,
  'boolean': false,
  'number': false,
  'undefined': false,
  'function': false,
  'regexp': false,
  'date': false
};

var QOUTE_STRING = /^(true|false|no|yes|null)$/i;
var SPECIAL_STRING = /(^'|^"|^!|\n|\r|:)/;

/*
 * Complex
 */
Preceive.prototype.object = function (value) {
  var keys = Object.keys(value);

  // Short circuit if its an empty object
  if (keys.length === 0) return '{}';

  // Determine if key spaceing should be used
  var keylens = keys.map(stringLength);
  var min = Math.min.apply(Math, keylens);
  var max = Math.max.apply(Math, keylens);
  var align = (max - min <= 5);

  // Increment indent
  var indent = this.indent;
  this.indent += '    ';

  // Create output
  var output = this._complexStart();

  for (var i = 0; i < keys.length; i++) {
    var item = value[ keys[i] ];
    var t = type(item);

    output += indent + keys[i] + ':' + (align ? SPACEING[max - keylens[i]] : ' ') + this[t](item);
    if (i !== keys.length - 1) output += '\n';
  }

  // Decrement indent
  this.indent = indent;
  return output;
};

Preceive.prototype.array = Preceive.prototype.arguments = function (value) {
  // Short circuit if its an empty array
  if (value.length === 0) return '[]';

  // Increment indent
  var indent = this.indent;
  this.indent += '    ';

  // Determin if array should be a oneliner by simulating a complex
  // condition
  var isComplex = this.complexNewline;
  this.complexNewline = true;

  var oneliner = true;
  var parts = new Array(value.length);
  var total = 0;
  var colorizeFactor = this.colors ? 9 : 0;
  for (var i = 0; i < value.length; i++) {
    var t = type(value[i]);

    parts[i] = this[t](value[i]);
    total += parts[i].length - colorizeFactor;

    if ( COMPLEX[t] || (t === 'string' && SPECIAL_STRING.test(value[i])) ) {
      oneliner = false;
    }
  }

  this.complexNewline = isComplex;
  if (this.indent.length + total > 70 || total > 20) oneliner = false;


  // Create output
  var output = '';

  if (oneliner) {
    output = '[' + parts.join(', ') + ']';
  } else {
    output += this._complexStart();
    for (var j = 0; j < value.length; j++) {
      output += indent + '- ' + parts[j];
      if (j !== value.length - 1) output += '\n';
    }
  }

  // Decrement indent
  this.indent = indent;
  return output;
};

/*
 * primitives
 */
Preceive.prototype.string = function (value) {
  var output = '', lines;

  if (SPECIAL_STRING.test(value)) {
    output += '|\n';
    lines = value.split('\n');

    for (var i = 0; i < lines.length; i++) {
      output += this.indent + this._colorize('green', lines[i]);
      if (i !== lines.length - 1) output += '\n';
    }
  } else if (QOUTE_STRING.test(value)) {
    output = '"' + this._colorize('green', value) + '"';
  } else {
    output = this._colorize('green', value);
  }

  return output;
};

Preceive.prototype.null = function (value) {
  return this._colorize('grey', 'null');
};

Preceive.prototype.boolean = function (value) {
  return this._colorize('yellow', (value ? 'true' : 'false'));
};

Preceive.prototype.number = function (value) {
  return this._colorize('yellow', value.toString());
};

/*
 * specials
 */
Preceive.prototype.undefined = function (value) {
  return this._colorize('grey', 'undefined');
};

Preceive.prototype.function = function (value) {
  return this._colorize('cyan', '[Function ' + (value.name || '(anonymous)') + ']');
};

Preceive.prototype.regexp = function (value) {
  return this._colorize('red', value.toString());
};

Preceive.prototype.date = function (value) {
  return this._colorize('magenta', value.toJSON());
};
