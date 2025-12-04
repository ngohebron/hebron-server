const express = require("express");
const router = express.Router();
const donationController = require("../controller/donationController");

router.post("/createDonor",donationController.createDonor)
router.get("/getAllDonors", donationController.getAllDonores);
router.get("/getDonorByEmail/:email",donationController.getDonorByEmail)
router.get("/getDonorByPhone/:phone",donationController.getDonorByPhone)



module.exports = router;
