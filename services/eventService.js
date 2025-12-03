const { db } = require("../config/db.js");
const { events, event_images } = require("../drizzle/schema.js");


async function createEvent(req, res) {


    const { title, description, output } = req.body;

    if (!title) {
        throw new Error("Title is required");
    }

    const event = await db.insert(events).values({
        title,
        description: description || null,
        output: output || null,
    });

    return { insertedId: event.insertId,
         title,
        description,
        output
     };


}

module.exports = { createEvent };