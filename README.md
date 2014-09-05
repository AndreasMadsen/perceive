#perceive

> Inspect values with peace by readability

## Installation

```sheel
npm install perceive
```

## Example

```javascript
var perceive = require('perceive');

var value = {
  "multiline": "first line\nsecond line",
  "longlist": [
    "long complicated list", "with not enogth room for it all"
  ],
  "shortlist": [1, 2],
  "doubt": {
    "as string": "true",
    "as boolean": true
  }
};

console.log( perceive(value, { colors: true }) );
```

```yaml
multiline: |
    first line
    second line
longlist:
    - long complicated list
    - with not enogth room for it all
shortlist: [1, 2]
doubt:
    as string:  "true"
    as boolean: true
```

## Documentation

```
var perceive = require('perceive');
```

#### perceive(value, options)

The `value` is what will be formated and can be anything that `JSON.stringify`
can serialize and a few more things, such as:

* undefined
* Date
* Regexp
* Function

The `options` object only support a single option `colors`. If this is `true`
(default is `false`) the output will be [ANSI](http://en.wikipedia.org/wiki/ANSI_escape_code)
colorized for a terminal makeing it even more readable.

The actual output is technically YAML, this output format was chosen because:

* It is much more readable than JSON, e.q. multiline strings.
* By outputting an actual language you shouldn't be in doubt about what the
output means on a data level. If you are it's a bug, so please report it.

##License

**The software is license under "MIT"**

> Copyright (c) 2014 Andreas Madsen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
