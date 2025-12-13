const express = require("express");
const router = express.Router();
const adminLogin  = require("../controller/adminController");

router.post("/login", adminLogin.adminLogin);
router.post("/sendEmail",adminLogin.sendEmail)

module.exports = router;
