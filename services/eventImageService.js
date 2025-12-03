const { db } = require("../config/db.js");
const { events, event_images } = require("../drizzle/schema.js");
const { eq } = require("drizzle-orm");

async function createEventImage(req, res) {
    const { eventId } = req.params;

    const { imageUrl, caption } = req.body;
    
    if (!eventId ) {
        throw new Error("EventId is required");
    }
    if (!imageUrl ) {
        throw new Error("Image is required");
    }

    const eventExists  = await db
    .select()
    .from(events)
    .where(eq(events.event_id, eventId));


    if (!eventExists  || eventExists.length === 0) {
        throw new Error("Event not found");
    }

    const eventImage = await db.insert(event_images).values({
        event_id: eventId,
        image_url: imageUrl,
        caption: caption,
    });

    return {
        insertedId: eventImage.insertId,
        eventId,
        imageUrl,
        caption
    };
}


module.exports = { createEventImage };