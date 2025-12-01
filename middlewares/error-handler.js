const { sendResponse } = require("../_helpers/responseHelper");

function errorHandler(err, req, res, next) {
  switch (true) {
    case typeof err === "string":
    
      const is404 = err.toLowerCase().endsWith("not found");
      const statusCode = is404 ? 404 : 400;
     
      // send the error object as the 5th parameter for consistency
      sendResponse(res, statusCode, null, null, err);
      break;
    case err.name === "UnauthorizedError":
     
      sendResponse(res, 401, "Unauthorized", null);
      break;
    default:
    
      // include the original error object for debugging (stack included in non-production environments)
      sendResponse(res, 500, err.message, null, err);
      break;
  }
}

module.exports = errorHandler;
