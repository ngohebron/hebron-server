const { sendResponse } = require("../_helpers/responseHelper");
const adminService = require("../services/adminService");
const sendEmails = require("../services/sendEmail");

async function adminLogin(req,res){
    try{
        const {email,password} = req.body;
         if (!email || !password) {
      return sendResponse(res, 400, "Email and password are required");
    }
        const admin = await adminService.loginAdmin(email,password);
        return sendResponse(res, 200, "Admin logged in", admin);

    }catch(error){
        return sendResponse(res, 500, "Something went wrong", null, error);
    }
}

async function sendEmail(req, res) {
    try {
        const { name, email, message } = req.body;

        const result = await sendEmails({
  to: email,
  subject: "Thank you for contacting Hebron Foundation!",
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
    <div style="
      max-width: 600px; 
      margin: auto; 
      background: white; 
      border-radius: 10px; 
      padding: 25px; 
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    ">
      
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #4c6ef5; margin: 0;">Hebron Foundation</h2>
        <p style="margin: 0; color: #555;">We’re here to help</p>
      </div>

      <p style="font-size: 16px; color: #333;">Hello <strong>${name}</strong>,</p>

      <p style="font-size: 15px; color: #555;">
        Thank you for reaching out to Hebron Foundation. We have received your message and our team will get back to you shortly.
      </p>

      <div style="
        margin: 20px 0;
        padding: 15px;
        background-color: #f1f5ff;
        border-left: 4px solid #4c6ef5;
        border-radius: 6px;
      ">
        <p style="margin: 0; color: #333; font-weight: bold;">Your Message:</p>
        <p style="margin-top: 8px; color: #444;">${message}</p>
      </div>

      <p style="font-size: 15px; color: #555;">
        We appreciate your time and will get back to you as soon as possible.
      </p>

      <p style="font-size: 15px; color: #333; margin-top: 25px;">
        Regards,<br/>
        <strong>Hebron Foundation Team</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;" />

      <p style="font-size: 12px; color: #999; text-align: center;">
        This is an automated message. Please do not reply to this email.
      </p>

    </div>
  </div>
  `,
});
    
    return sendResponse(res, 200, "Email sent successfully!", result);

    } catch (error) {
        return sendResponse(res, 500, "Something went wrong", null, error);
    }
}



module.exports = {
    adminLogin ,sendEmail
}