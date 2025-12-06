const { db } = require("../config/db.js");
const { events, event_images } = require("../drizzle/schema.js");




async function createEvent(payload) {
  try {
    const { title, description, output, images = [] } = payload;

    console.log("incoming", payload);

    if (!title) throw new Error("Title is required");

    // 1️⃣ INSERT EVENT
    const [insertEvent] = await db.insert(events).values({
      title,
      description,
      output,
    }) // IMPORTANT!!!
     console.log("Insert Event Result:", insertEvent);
    const eventId = insertEvent.insertId;  // NOW WORKS

    console.log("Created event with ID:", eventId);

    // 2️⃣ INSERT IMAGES WITH eventId
    if (images.length) {
      const rows = images.map((img) => ({
        event_id: eventId,
        image_url: typeof img === "string" ? img : img.image_url,
      }));
      
      await db.insert(event_images).values(rows) // ALSO MUST EXECUTE
    }

    return {
      success: true,
      message: "Event created successfully",
      event_id: eventId
    };

  } catch (err) {
    console.error("Error creating event:", err);
    throw new Error("Failed to create event");
  }
}


module.exports = { createEvent };