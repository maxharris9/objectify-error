function objectifyError(error, keyArray) {
  var errorObject = {};

  keyArray = keyArray || ['code', 'message', 'name', 'stack', 'type'];

  if (!error) return {};

  // forward non-enumerable properties
  keyArray.forEach(function (key) {
    errorObject[key] = error[key];
  });

  // forward any custom, enumerable properties
  Object.keys(error).forEach(function (index) {
    errorObject[index] = error[index];
  });

  return errorObject;
}

module.exports = objectifyError;
