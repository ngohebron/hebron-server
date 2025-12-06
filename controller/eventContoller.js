const { sendResponse } = require('../_helpers/responseHelper');
const eventService = require('../services/eventService');
const eventImageService = require('../services/eventImageService');

async function createEvent(req, res,next) {
      
    try {
        const event = await eventService.createEvent(req.body)

        return sendResponse(res, 201, "Event created", event);
    } catch (error) {
        console.error("Error creating event:", error);
        return sendResponse(res, 500, "Something went wrong", null, error);
    }
}

async function createEventImage(req, res) {
    try {

        const data = await eventImageService.createEventImage(req);
        return sendResponse(res, 201, "Event Image created", data);

    } catch (error) {
        return sendResponse(res, 500, "Something went wrong", null, error);
    }
}



module.exports = { createEvent ,createEventImage};