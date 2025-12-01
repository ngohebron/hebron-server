const eventService = require("../services/event.service");
const { success, error } = require("../utils/response");
const { createEventSchema } = require("../validations/event.validation");

class EventController {

  async create(req, res) {
    try {
        console.log("POST /api/events request received");  
      const { error: validationError } = createEventSchema.validate(req.body);
      if (validationError) return error(res, validationError.message, 400);

      const data = await eventService.createEvent(req.body);
      return success(res, data, "Event created successfully");
    } catch (err) {
      return error(res, err.message);
    }
  }

  async getAll(req, res) {
    try {
      const data = await eventService.getAllEvents();
      return success(res, data);
    } catch (err) {
      return error(res, err.message);
    }
  }

  async getById(req, res) {
    try {
      const data = await eventService.getEventById(req.params.id);
      return success(res, data);
    } catch (err) {
      return error(res, err.message);
    }
  }
}

module.exports = new EventController();
