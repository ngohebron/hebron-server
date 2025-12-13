import axios from "axios";

const URL = "http://localhost:3000/api/donation/createDonation";

const body = {
  full_name: "Jayesh",
  email: "jyesh@example.com",
  phone: "9876243219",
  pancard_no:"FLTPB5867B", 
  amount: 2400,
  currency: "INR",
  message: "Keep up the good work",
  payment_gateway: "RAZORPAY"
}

async function hitApi(times) {
  for (let i = 1; i <= times; i++) {
    try {
      const res = await axios.post(URL, body);
      console.log(`Request ${i} → Status: ${res.status}`);
    } catch (err) {
      if (err.response) {
        console.log(`Request ${i} → Status: ${err.response.status}`);
      } else {
        console.error(`Request ${i} → Error:`, err.message);
      }
    }
  }
}

hitApi(70); // 🔥 hit API 70 times
