const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.post("/", eventController.create);
router.get("/", eventController.getAll);
router.get("/:id", eventController.getById);

module.exports = router;
