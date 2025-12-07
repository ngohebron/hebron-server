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

async function deleteEvent(req, res) {
    try {
        
        const { eventId } = req.params;
        const result = await eventService.deleteEvent(eventId);

        if (result.success) {
            return sendResponse(res, 200, result.message);
        } else {
            return sendResponse(res, 404, result.message);
        }
    } catch (error) {
        return sendResponse(res, 500, "Something went wrong", null, error);
    }
}
async function getListOfEvents(req, res) { 
    try {
        const allEvents = await eventService.getAllEvents();

        return sendResponse(
            res,
            200,
            "Events retrieved successfully",
            allEvents
        );

    } catch (error) {
        console.error("Get All Events Error:", error);
        return sendResponse(res, 500, "Something went wrong", null, error);
    }
}


module.exports = { createEvent ,createEventImage,deleteEvent,getListOfEvents};