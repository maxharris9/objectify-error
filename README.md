objectify-error
===============

Creates enumerable error object from enumerable and non-enumerable properties of ordinary error objects.

## example

```
var objerr = require('objectify-error');
var e = new Error('error message');

Object.keys(e); // returns []

Object.keys(objerr(e)); // returns [ 'stack', 'arguments', 'type', 'message' ]
```

## running tests

```
npm install
npm test
```
