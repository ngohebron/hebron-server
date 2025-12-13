const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Hebron Foundation" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, mailOptions };

  } catch (error) {
    console.log("Email Error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail

