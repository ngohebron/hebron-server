const { sendResponse } = require("../_helpers/responseHelper");

function errorHandler(err, req, res, next) {
  switch (true) {
    case typeof err === "string":
    
      const is404 = err.toLowerCase().endsWith("not found");
      const statusCode = is404 ? 404 : 400;
     
      sendResponse(res, statusCode, null, err);
      break;
    case err.name === "UnauthorizedError":
     
      sendResponse(res, 401, "Unauthorized", null);
      break;
    default:
    
      sendResponse(res, 500, err.message, null);
      break;
  }
}

module.exports = errorHandler;
