const { eq, sql } = require("drizzle-orm");
const { db } = require("../config/db.js");
const crypto = require("crypto");
const { donner, donation } = require("../drizzle/schema.js");
const { DONATION_STATUS } = require("../utils/donation_utils.js");
const razorpay = require("../config/razorpay.js");
const donorService = require("./donorService.js");
const { donationListDTO } = require("../dto/donation.dto.js");





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

async function verifyPayment(payment) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    payment;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  // 2️⃣ Generate signature using secret
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    await db
      .update(donation)
      .set({ status: "FAILED" })
      .where(eq(donation.payment_order_id, razorpay_order_id));

    return { success: false };
  }
  await db
    .update(donation)
    .set({
      status: "SUCCESS",
      payment_txn_id: razorpay_payment_id,
    })
    .where(eq(donation.payment_order_id, razorpay_order_id));

  return { success: true };

  // 3️⃣
}

async function getAllDonations(page = 1) {

  const limit = 50;
  const offset = (page -1)* limit

    const totalCountResult = await db.select({ count: sql`count(*)` }).from(donation);
  const totalCount = Number(totalCountResult[0].count);

  const result = await db
    .select({
      donation_id: donation.donation_id,
      amount: donation.amount,
      currency: donation.currency,
      message: donation.message,
      created_at: donation.created_at,

      
      donor_id: donner.doner_id,
      full_name: donner.full_name,
      email: donner.email,
      phone: donner.phone
    })
    .from(donation)
    .leftJoin(donner, eq(donation.donor_id, donner.doner_id))
    .limit(limit)
    .offset(offset)
    ;

    const formatted = donationListDTO(
    result.map((row) => ({
      donation_id: row.donation_id,
      amount: row.amount,
      currency: row.currency,
      message: row.message,
      created_at: row.created_at,
      donor: {
        donor_id: row.donor_id,
        full_name: row.full_name,
        email: row.email,
        phone: row.phone
      }
    }))
  );

  return {
    data: formatted,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page
  };

}





module.exports = {
  createDonation,
  verifyPayment,
  getAllDonations
};
