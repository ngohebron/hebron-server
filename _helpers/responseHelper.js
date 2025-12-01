/**
 * Standardized API response helper.
 * Signature: sendResponse(res, status, message, data, err)
 * - status: number (HTTP status code)
 * - message: string (friendly message)
 * - data: object | array | null
 * - err: Error | string | null
 *
 * Notes:
 * - If `data` is an Error and `err` is not provided, `data` will be treated as `err`.
 * - If `status` is not an integer, it will default to 200 for success responses or 500 for errors.
 */
function sendResponse(res, status, message, data, err) {
  // Handle the case where caller passed the error as the fourth argument
  if (!err && data instanceof Error) {
    err = data;
    data = null;
  }

  // Normalize status code
  let statusCode = Number(status);
  if (!Number.isInteger(statusCode)) {
    statusCode = err ? 500 : 200;
  }

  const success = statusCode >= 200 && statusCode < 300;

  // Build response payload
  const payload = {
    status: statusCode,
    success,
    message: message || (err ? (typeof err === 'string' ? err : err.message) : (success ? 'Success' : undefined)),
  };

  if (data !== undefined && data !== null) {
    payload.data = data;
  }

  if (err) {
    // Prefer to include minimal error info by default
    const errObj = {}
    if (typeof err === 'string') errObj.message = err;
    else if (err instanceof Error) {
      errObj.message = err.message;
      // Only include stack trace in non-production environments
      if (process.env.NODE_ENV !== 'production') errObj.stack = err.stack;
    } else errObj.message = String(err);
    payload.error = errObj;
  }

  return res.status(statusCode).json(payload);
}

module.exports = { sendResponse };
  