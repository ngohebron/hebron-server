const { eq, desc } = require("drizzle-orm");

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


async function deleteEvent(eventId) {
  try {
    // 1️⃣ OPTIONAL: Check if event exists
    const event = await db.select().from(events).where(eq(events.event_id, eventId));

    if (!event.length) {
      return {
        success: false,
        message: "Event not found",
      };
    }

    // 2️⃣ DELETE EVENT → Images auto-delete due to CASCADE
    await db.delete(events).where(eq(events.event_id, eventId));

    return {
      success: true,
      message: "Event deleted successfully",
      deleted_event_id: eventId,
    };

  } catch (err) {
    console.error("Error deleting event:", err);
    throw new Error("Failed to delete event");
  }
}

async function getAllEvents() {
  const allEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.created_at));

  for (const ev of allEvents) {
    const imgs = await db
      .select()
      .from(event_images)
      .where(eq(event_images.event_id, ev.event_id));

    ev.images = imgs;
  }

  return allEvents;
}

module.exports = { createEvent, deleteEvent, getAllEvents};