const { sendResponse } = require("../_helpers/responseHelper");
 const { db } = require("../config/db.js");
        const { usersTable } = require("../drizzle/schema.js");
        const { eq } = require("drizzle-orm");

async function createUser(req, res) {
    try {
        // Accept payload either from body (preferred) or from query params (for GET /users used in current routes)
        const payload = req.body && Object.keys(req.body).length ? req.body : req.query;
        const { name, email, age } = payload || {};


        // Insert a new user
        await db.insert(usersTable).values({ name, email, age: Number(age) });

        // Fetch the created user and return it
        const created = await db.select().from(usersTable).where(eq(usersTable.email, email));
        const result = created && created.length ? created[0] : null;

        return sendResponse(res, 201, "User created", result);
    } catch (error) {
        console.error("Error creating user via Drizzle:", error);
        return sendResponse(res, 500, "Something went wrong", null, error);
    }
}

module.exports = { createUser };