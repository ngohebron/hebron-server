// 

const express = require("express");
const router = express.Router();
const { getDatabase } = require("../_helpers/sqldb");

// GET ALL USERS
router.get("/users", async (req, res) => {
    try {
        const db = getDatabase();
        const [rows] = await db.query("SELECT * FROM users");

        res.json({
            success: true,
            data: rows
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
