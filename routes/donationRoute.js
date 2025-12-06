const express = require("express");
const router = express.Router();
const donationController = require("../controller/donationController");

router.post("/createDonation", donationController.createDonation);
router.post("/verifyDonationPayment", donationController.verifyDonationPayment);
router.get('/getAllDonations',donationController.getAllDonations)

module.exports = router;