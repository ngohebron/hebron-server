const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const eventController = require('../controllers/event.controller');

router.post('/', upload.array('images', 10), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
