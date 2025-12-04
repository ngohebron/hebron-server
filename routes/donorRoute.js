const express = require("express");
const router = express.Router();
const donationController = require("../controller/donationController");

router.post("/createDonor",donationController.createDonor)
router.get("/getDonorByEmail/:email",donationController.getDonorByEmail)


module.exports = router;
