const { db } = require("../config/db.js");
const { donner } = require("../drizzle/schema.js");

async function createDoner(req, res) {
    const { full_name, email, phone } = req.body;

    if (!full_name || !email || !phone) {
        throw new Error("Full name, email, and phone are required");
    }

    const doner = await db.insert(donner).values({
        full_name,
        email,
        phone,
    });

    return {
        insertedId: doner.insertId,
        full_name,
        email,
        phone
    };
}

module.exports = { createDoner };