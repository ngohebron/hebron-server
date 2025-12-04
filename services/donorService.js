const { eq } = require("drizzle-orm");
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

async function getAllDonors(){
   return await db.select().from(donner);
}


async function getDonerByEmail(email){
    const donnor = await db.select().from(donner).where(eq(donner.email, email)).limit(1);
    return donnor[0] || null;
}

async function getDonerByPhone(phone){
    const donnor = await db.select().from(donner).where(eq(donner.phone, phone)).limit(1);
    return donnor[0] || null;
}



module.exports = { createDoner, getDonerByEmail, getAllDonors, getDonerByPhone };