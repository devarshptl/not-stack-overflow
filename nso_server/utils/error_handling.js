const _ = require("lodash");
const {errorDetails} = require("../constants/error_codes");

const createErrorObject = (code, type, error) => {
  return JSON.stringify({
    code,
    type,
    error: error,
  });
};

const catchErrorHandling = (err, code) => {
  let errorPayload;
  try {
    const ers = _.map(err?.errors);
    errorPayload = createErrorObject(403, code, ers);
  } catch (err) {
    errorPayload = createErrorObject(errorDetails[code].statusCode, code, [errorDetails[code]]);
  }
  throw new Error(errorPayload);
};

const normalErrorThrow = (code) => {
  throw new Error(createErrorObject(errorDetails[code].statusCode, code, [errorDetails[code]]));
};

module.exports = {
  createErrorObject,
  catchErrorHandling,
  normalErrorThrow,
};
