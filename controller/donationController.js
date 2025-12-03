const { sendResponse } = require('../_helpers/responseHelper');
const donorService = require('../services/donorService');


async function createDonor(req, res) {
    try{
       const donation = await donorService.createDoner(req, res);
       return sendResponse(res, 201, "Donor created", donation);
    }catch(error){
        console.error("Error creating donor:", error);
        return sendResponse(res, 500, "Something went wrong", null, error);
    }
}

module.exports = { createDonor };