const { eq } = require("drizzle-orm");
const { db } = require("../config/db.js");
const { donner, donation} = require("../drizzle/schema.js");
const { DONATION_STATUS } = require("../utils/donation_utils.js");
const donorService = require("./donorService.js");



async function createDonation(req, res, next) {
  try {
    const { full_name, email, phone, amount, currency, message, payment_gateway } = req.body;

    // 1️⃣ Get or create donor
    const donor = await donorService.getOrCreateDonor({ full_name, email, phone });

    // 2️⃣ Insert donation
    const [result] = await db.insert(donation).values({
      donor_id: donor.doner_id,
      amount,
      currency,
      message,
      payment_gateway,
      status: DONATION_STATUS.CREATED
    });

    // 3️⃣ Fetch inserted donation
    const [newDonation] = await db
      .select()
      .from(donation)
      .where(eq(donation.donation_id, result.insertId))
      .limit(1);

    return newDonation;
  } catch (error) {
    next(error);
  }
}


module.exports = {
    createDonation
}

