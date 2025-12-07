const express = require("express");
const router = express.Router();
const eventController = require("../controller/eventContoller");

router.post("/createEvent",eventController.createEvent)
router.post("/createEventImage/:eventId",eventController.createEventImage)
router.delete("/deleteEvent/:eventId",eventController.deleteEvent)
router.get("/getAllEvents",eventController.getListOfEvents)

module.exports = router;
