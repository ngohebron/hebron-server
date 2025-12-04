const { sendResponse } = require("../_helpers/responseHelper");
const { get } = require("../routes");
const donorService = require("../services/donorService");

async function createDonor(req, res, next) {
  try {
    const donation = await donorService.createDoner(req, res);
    return sendResponse(res, 201, "Donor created", donation);
  } catch (error) {
    console.log("Error details:", error?.cause?.code);
    next(error);
  }
}
async function getAllDonores(req, res, next) {
    try {
        const donors = await donorService.getAllDonors();
        return sendResponse(res, 200, "Donors fetched", donors);
    } catch (error) {
        next(error);
    }
}

async function getDonorByEmail(req, res, next) {
  try {
    const { email } = req.params;
    const donor = await donorService.getDonerByEmail(email);
    if (!donor) {
      return sendResponse(
        res,
        404,
        `Donor with email ${email} not found`,
        null
      );
    }

    return sendResponse(res, 200, "Donor fetched", donor);
  } catch (error) {
    console.log("Error details:", error);
    next(error);
  }
}

async function getDonorByPhone(req, res, next) {
  try {
    const { phone } = req.params;
    const donor = await donorService.getDonerByPhone(phone);
    if (!donor) {
      return sendResponse(
        res,
        404,
        `Donor with phone ${phone} not found`,
        null
      );
    }

    return sendResponse(res, 200, "Donor fetched", donor);
  } catch (error) {
    console.log("Error details:", error);
    next(error);
  }
}




module.exports = { createDonor, getDonorByEmail, getAllDonores, getDonorByPhone };
