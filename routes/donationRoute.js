const express = require("express");
const router = express.Router();
const donationController = require("../controller/donationController");
const { globalLimiter, globalThrottle } = require("../middlewares/requestLimiter");

router.post("/createDonation", globalLimiter, globalThrottle, donationController.createDonation);
router.post("/verifyDonationPayment", globalLimiter, globalThrottle, donationController.verifyDonationPayment);
router.get('/getAllDonations',donationController.getAllDonations)

module.exports = router;