const { eq } = require("drizzle-orm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../config/db");
const { admin } = require("../drizzle/schema");



async function loginAdmin(email, password) {

  const [foundAdmin] = await db
    .select()
    .from(admin)
     .where(eq(admin.email, email)); 

  if (!foundAdmin) {
    throw new Error("Admin not found");
  }

  
  const isValid = await bcrypt.compare(password, foundAdmin.password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  
  const token = jwt.sign(
    { id: foundAdmin.id, email: foundAdmin.email, name: foundAdmin.name },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    admin: {
      id: foundAdmin.id,
      email: foundAdmin.email,
      name: foundAdmin.name,
    },
    token:{
        token:token,
        expiresIn:"1d"
    },
  };
}


module.exports = {
  loginAdmin
};
