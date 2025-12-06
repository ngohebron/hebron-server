const { db } = require("../config/db.js");
const { events, event_images } = require("../drizzle/schema.js");
const { eq } = require("drizzle-orm");

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

async function createEventImage(req, res) {
    const { eventId } = req.params;
    const { image } = req.body;

    if (!eventId || !image) {
        throw new Error("Event ID and image are required");
    }

    const eventImage = await db.insert(event_images).values({
        event_id: eventId,
        image,
    });

    return { insertedId: eventImage.insertId,
         eventId,
        image
     };
}

async function getAllEvents(req,res){
    const eventsList = await db.select().from(events).leftJoin(event_images, eq(events.event_id, event_images.event_id));;
   
    const grouped = {};

    eventsList.forEach((row) => {
        const event = row.events;
        const image = row.event_images;

        if (!grouped[event.event_id]) {
            grouped[event.event_id] = {
                ...event,
                images: []
            };
        }

        if (image) {  
            grouped[event.event_id].images.push(image);
        }
    });

    return Object.values(grouped);
}

module.exports = { createEvent ,getAllEvents};