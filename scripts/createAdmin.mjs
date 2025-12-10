import bcrypt from "bcrypt";
import { db } from "../config/db.js";
import { admin } from "../drizzle/schema.js";

async function createAdmin() {
  const name = "Super Admin";
  const email = "admin@hebron.org";
  const password = "Admin@123"; // Later change in database

  // Check if admin already exists
  const [exists] = await db.select().from(admin).limit(1);
  if (exists) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 10);

  await db.insert(admin).values({
    name,
    email,
    password: hash,
  });

  console.log("Admin created successfully");
  process.exit(0);
}

//npm run seed:admin

createAdmin();
