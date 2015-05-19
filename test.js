var test = require('tape');
var objerr = require('./index');

test('handles no error', function (t) {
  var tmp = objerr();

  t.equals(tmp, null, 'received expected null return value');
  t.end();
});

test('nameless error', function (t) {
  var tmp = objerr(new Error());

  t.equals(tmp.code, undefined, 'received expected code');
  t.equals(tmp.message, undefined, 'received expected message');
  t.notEquals(tmp.stack, '', 'received non-blank stack trace');
  t.equals(tmp.type, undefined, 'received expected type');
  t.end();
});

test('common enumerable keys work properly', function (t) {
  var errmsg = 'funky';
  var typeval = 'sneaky';
  var magicnum = -141538462;

  var error = new Error(errmsg);
  error.code = magicnum;
  error.type = typeval;

  var tmp = objerr(error);
  t.equals(tmp.code, magicnum, 'received expected code');
  t.equals(tmp.message, errmsg, 'received expected message');
  t.notEquals(tmp.stack, '', 'received non-blank stack trace');
  t.equals(tmp.type, typeval, 'received expected type');
  t.end();
});

test('works with non-enumerable property', function (t) {
  var errmsg = 'walk on the ocean';
  var propval = 'on the stones';

  var error = new Error(errmsg);
  Object.defineProperty(error, 'step', {
    value: propval,
    enumerable: false
  });

  var tmp = objerr(error);
  t.equals(tmp.message, errmsg, 'recieved expected message');
  t.equals(tmp.step, propval, 'received expected non-enumerable property value');
  t.notEquals(tmp.stack, '', 'received non-blank stack trace');
  t.end();
});
