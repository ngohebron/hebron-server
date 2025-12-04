const { sendResponse } = require("../_helpers/responseHelper");
const { get } = require("../routes");
const donationServices = require("../services/donationService")



async function createDonation(req, res, next) {
  try {
    const donation = await donationServices.createDonation(req, res, next);
    return sendResponse(res, 201, "Donation created", donation);
  } catch (error) {
    next(error);
  }
}

module.exports = {
    createDonation
}