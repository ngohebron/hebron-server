// utils/errorUtils.js
function extractDuplicateField(err) {
  try {
    const match = err.sqlMessage.match(/for key '(.+?)'/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

module.exports = { extractDuplicateField };
