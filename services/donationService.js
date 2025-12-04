const { eq } = require("drizzle-orm");
const { db } = require("../config/db.js");
const { donner, donation} = require("../drizzle/schema.js");
const { DONATION_STATUS } = require("../utils/donation_utils.js");
const razorpay = require("../config/razorpay.js");
const donorService = require("./donorService.js");


async function createDonation(donor_id, amount, currency = "INR", message) {
  try {
      // 1️⃣ Create Razorpay order
      const paymentOrder = await razorpay.orders.create({
          amount: amount * 100, // convert rupees to paise
          currency,
          receipt: `donation_${Date.now()}`,
          payment_capture: 1, // auto-capture
      });
      console.log("Razorpay Order Created:", paymentOrder);

      // 2️⃣ Insert donation into DB
      const [result] = await db.insert(donation).values({
          donor_id,
          amount,
          currency,
          message,
          status: DONATION_STATUS.PENDING,
          payment_gateway: "RAZORPAY",
          payment_order_id: paymentOrder.id,
      });

      // 3️⃣ Fetch inserted donation
      const [newDonation] = await db
          .select()
          .from(donation)
          .where(eq(donation.donation_id, result.insertId))
          .limit(1);

      // ✅ Return both donation and payment order
      return { newDonation, paymentOrder };

  } catch (error) {
      console.log("Error in createDonation:", error);
      throw error; // important to let controller handle it
  }
}

module.exports = {
    createDonation
};
