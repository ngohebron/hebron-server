// 
const { createUser } = require("../controller/userController");
const express = require("express");
const router = express.Router();
const { getDatabase } = require("../_helpers/sqldb");
const { sendResponse } = require("../_helpers/responseHelper");



// GET ALL USERS
// router.get("/users", async (req, res) => {
//     try {
//         const db = getDatabase();
//         const [rows] = await db.query("SELECT * FROM users");

//         res.json({
//             success: true,
//             data: rows
//         });
//     } catch (err) {
//         console.error("Error fetching users:", err);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// });



// CREATE A NEW USER
router.post("/users", createUser);

module.exports = router;
