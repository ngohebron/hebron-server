//same as ENUM in other languages
// as JAVASCRIPT doesn't have ENUM natively so we use Object.freeze to create a constant object
export const DONATION_STATUS = Object.freeze({
  CREATED: "CREATED",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED"
});