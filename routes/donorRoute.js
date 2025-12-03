const express = require("express");
const router = express.Router();
const donationController = require("../controller/donationController");

router.post("/createDonor",donationController.createDonor)


module.exports = router;
