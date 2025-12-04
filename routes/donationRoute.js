const express = require("express");
const router = express.Router();
const donationController = require("../controller/donationController");

router.post("/createDonation", donationController.createDonation);

module.exports = router;