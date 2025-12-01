const Event = require('../models/event.model');
const EventImage = require('../models/eventImage.model');

exports.createEvent = async (req, res) => {
  try {
    const { title } = req.body;
    const event = await Event.create({ title });

    if (req.files) {
      const images = req.files.map(file => ({ imageUrl: file.path, eventId: event.id }));
      await EventImage.bulkCreate(images);
    }

    const eventWithImages = await Event.findByPk(event.id, { include: 'images' });
    res.status(201).json(eventWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllEvents = async (req, res) => {
    console.log("Fetching all events");
  try {
    const events = await Event.findAll({ include: 'images' });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, { include: 'images' });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    await event.destroy();
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
