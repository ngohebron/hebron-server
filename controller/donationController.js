
const { sendResponse } = require('../_helpers/responseHelper');
const donorService = require('../services/donorService');


async function createDonor(req, res,next) {
    try{
       const donation = await donorService.createDoner(req, res);
       return sendResponse(res, 201, "Donor created", donation);
    }catch(error){
       
        console.log("Error details:", error?.cause?.code);
         next(error);
        
        
    }
}

module.exports = { createDonor };