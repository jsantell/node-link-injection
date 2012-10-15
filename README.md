link-injection
======
Parse text for keywords and replace with links for documentation

### How it works

`link-injection` parses arbitrary text and replaces all keywords with an anchor link to the keyword's reference. Excellent for creating hyperlinks in documentation to other parts of the documentation and who knows what else. What is supported:

* Can parse plain text, or HTML -- will not create an anchor inside of another anchor
* Full word matching -- if `Array` is a keyword, it will not transpose `Float32Array` into an anchor

### Installing

* `npm install link-injection`

### Methods

* `parse( text, map, options )` Parses string `text` replacing instances of map's keys with an anchor with an href to the key's value.

### Options

* `caseSensitive` : Whether or not the keyword match should be case-sensitive. (default: `true`)

### Usage

```javascript
var
  inject = require( 'link-inject' ),
  html = '<div>Modern browsers are now implementing a Float32Array type, which is a typed array version of an Array, except it only holds 32-bit floating point numbers. The <a href="#Float32Array">Float32Array</a> is frequently used in 3D WebGL applications and audio processing.</div>
  // Using local links, but can be anything -- the keys' values are put into the href attribute
  map = {
    'Array' : '#Array',
    'Float32Array' : '#Float32Array'
  };

var output = inject.parse( html, map );
console.log( output );
```

Outputs:
```html
<div>
Modern browsers are now implementing a <a href="#Float32Array" title="Float32Array">Float32Array</a> type, which is a typed array version of an <a href="#Array" title="Array">Array</a>, except it only holds 32-bit floating point numbers. The <a href="#Float32Array">Float32Array</a> is frequently used in 3D WebGL applications and audio processing.
</div>
```

Development
---

Run `npm build` to build the coffee into JavaScript. Run `npm test` from project root -- requires `mocha` to be installed globally
