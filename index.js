function objectifyError (error) {
  if (!error) return null;

  var errorObject = {};
  Object.getOwnPropertyNames(error).forEach(function(key) {
    errorObject[key] = error[key];
  });
  return errorObject;
}

module.exports = objectifyError;
