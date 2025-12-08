const { eq, or } = require("drizzle-orm");
const { db } = require("../config/db.js");
const { donner } = require("../drizzle/schema.js");

async function createDoner(req, res) {
    const { full_name, email, phone,pancard_no} = req.body;

    if (!full_name || !email || !phone || !pancard_no) {
        throw new Error("Full name, email, phone, and pancard_no are required");
    }

    const doner = await db.insert(donner).values({
        full_name,
        email,
        phone,
        pancard_no
    });

    return {
        insertedId: doner.insertId,
        full_name,
        email,
        phone,
        pancard_no
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
async function getOrCreateDonor({ full_name, email, phone, pancard_no }) {
  // Check existing donor by email OR phone OR pancard_no
  const [existingDonor] = await db
    .select()
    .from(donner)
    .where(
      or(
        eq(donner.email, email),
        eq(donner.phone, phone),
        eq(donner.pancard_no, pancard_no)
      )
    )
    .limit(1);

  if (existingDonor) {
    return existingDonor;
  }

  try {
    const [result] = await db.insert(donner).values({
      full_name,
      email,
      phone,
      pancard_no,
    });

    const [newDonor] = await db
      .select()
      .from(donner)
      .where(eq(donner.doner_id, result.insertId))
      .limit(1);

    return newDonor;
  } catch (error) {
    // Catch duplicate errors to avoid server crash
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("A donor with this email/phone/PAN already exists.");
    }
    throw error;
  }
}



module.exports = { createDoner, getDonerByEmail, getAllDonors, getDonerByPhone, getOrCreateDonor };