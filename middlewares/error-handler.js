const { sendResponse } = require("../_helpers/responseHelper");
const { extractDuplicateField } = require("../utils/error_utills");

function errorHandler(err, req, res, next) {
  console.log("Error Handler Triggered:", err.cause.sqlMessage);

  switch (true) {
    // ▶ CASE 1: Custom string error
    case typeof err === "string":
      const is404 = err.toLowerCase().endsWith("not found");
      sendResponse(res, is404 ? 404 : 400, null, null, err);
      break;

    // ▶ CASE 2: JWT or Authorization Error
    case err.name === "UnauthorizedError":
      sendResponse(res, 401, "Unauthorized", null);
      break;

    // ▶ CASE 3: MySQL Duplicate Entry
    case err?.cause?.code === "ER_DUP_ENTRY":
      sendResponse(res, 400, "Duplicate entry", null, {
        field: extractDuplicateField(err),
        message: "Donor already exists in the database",
      });
      break;

    // ▶ CASE 4: Validation Library (e.g., Zod/Joi)
    case err.name === "ValidationError":
      sendResponse(res, 422, "Validation failed", err.errors);
      break;

    // ▶ DEFAULT CASE: INTERNAL SERVER ERROR
    default:
      sendResponse(res, 500, err.message, null, err);
      break;
  }
}

module.exports = errorHandler;
