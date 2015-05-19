var test = require('tape');
var objerr = require('./index');

test('handles no error gracefully', function (t) {
  var x = objerr();

  t.equals(x.code, undefined, 'receive expected code');
  t.equals(x.message, undefined, 'receive expected message');
  t.equals(x.stack, undefined, 'receive no stack trace');
  t.equals(t.type, undefined, 'receive expected type');
  t.end();
});

test('nameless error', function (t) {
  var x = objerr(new Error());

  t.equals(x.code, undefined, 'receive expected code');
  t.equals(x.message, '', 'receive expected message');
  t.notEquals(x.stack, '', 'receive non-blank stack trace');
  t.equals(t.type, undefined, 'receive expected type');
  t.end();
});

test('default keyArray works properly', function (t) {
  var error = new Error('funky');
  error.code = -141538462;
  error.type = 'sneaky';

  var x = objerr(error);
  t.equals(x.code, -141538462, 'receive expected code');
  t.equals(x.message, 'funky', 'receive expected message');
  t.notEquals(x.stack, '', 'receive non-blank stack trace');
  t.equals(x.type, 'sneaky', 'receive expected type');
  t.end();
});

test('custom keyArray works properly', function (t) {
  var error = new Error('funky');
  error.toad = 'sprocket';

  var x = objerr(error, ['toad']);
  t.equals(x.toad, 'sprocket', ' receive strange error value');
  t.equals(x.code, undefined, 'receive expected code');
  t.equals(x.message, undefined, 'receive expected message');
  t.equals(x.stack, undefined, 'receive no stack trace');
  t.equals(t.type, undefined, 'receive expected type');
  t.end();
});
