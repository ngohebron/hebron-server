const { sendResponse } = require("../_helpers/responseHelper");
const { get } = require("../routes");
const donationServices = require("../services/donationService");
const { DONATION_STATUS } = require("../utils/donation_utils");
const donorService = require("../services/donorService");



// async function createDonation(req, res, next) {
//   try {
//     const donation = await donationServices.createDonation(req, res, next);
//     return sendResponse(res, 201, "Donation created", donation);
//   } catch (error) {
//     next(error);
//   }
// }

async function createDonation(req, res, next) {
  try {
    console.log("createDonation called with body:", req.body);
    const { full_name, email, phone, amount, pancard_no, currency, message } = req.body;

    // 1️⃣ Get or create donor
    const donor = await donorService.getOrCreateDonor({ full_name, email, phone, pancard_no });
     console.log("Donor Info:", donor);
    // 2️⃣ Create donation order with Razorpay
    const { newDonation, paymentOrder } = await donationServices.createDonation(
      donor.doner_id,
      amount,
      currency,
      message,
    );

    // 3️⃣ Send order details to frontend
    return sendResponse(res, 201, "Donation order created", {
      donation: newDonation,
      razorpayOrder: paymentOrder,
    });
  } catch (error) {
    next(error);
  }
}

async function verifyDonationPayment(req, res, next) {
  try {
    const paymentResult = await donationServices.verifyPayment(req.body);

    if (paymentResult.success) {
      return sendResponse(res, 200, "Payment verified successfully", paymentResult);
    } else {
      return sendResponse(res, 400, "Payment verification failed", paymentResult);
    }
  } catch (error) {
    next(error);
  }
}

async function getAllDonations(req, res) {
  try {

    const page = Number(req.query.page) || 1;
    const donations = await donationServices.getAllDonations(page);
    return sendResponse(res, 200, "Donations retrieved successfully", donations);
  } catch (error) {
   return sendResponse(res, 500, "Something went wrong", null, error);
  }
}

module.exports = {
    createDonation,
    verifyDonationPayment,
    getAllDonations
}