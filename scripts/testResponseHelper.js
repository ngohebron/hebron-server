const { sendResponse } = require('../_helpers/responseHelper');

function mockRes() {
  let statusCode;
  return {
    status: function(code) {
      statusCode = code;
      return this;
    },
    json: function(obj) {
      console.log('STATUS:', statusCode);
      console.log('PAYLOAD:', JSON.stringify(obj, null, 2));
    }
  };
}

console.log('--- Valid success response ---');
sendResponse(mockRes(), 200, 'All good', { name: 'Hebron' });

console.log('\n--- Error as 4th param (data is Error) ---');
sendResponse(mockRes(), 400, 'Bad Request', new Error('Invalid input'));

console.log('\n--- Error as 5th param (explicit) ---');
sendResponse(mockRes(), 500, 'Server failure', null, new Error('Oops'));

console.log('\n--- Undefined status (should default) ---');
sendResponse(mockRes(), undefined, 'No status provided', { foo: 'bar' });

console.log('\n--- status not integer (should default because string) ---');
sendResponse(mockRes(), 'not-a-number', 'Invalid status type', null);

console.log('\n--- Provide only res object (fallback to 200 success) ---');
// This simulates someone accidentally calling sendResponse(res)
sendResponse(mockRes());
