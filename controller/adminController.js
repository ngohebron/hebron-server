const { sendResponse } = require("../_helpers/responseHelper");
const adminService = require("../services/adminService");

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

module.exports = {
    adminLogin
}