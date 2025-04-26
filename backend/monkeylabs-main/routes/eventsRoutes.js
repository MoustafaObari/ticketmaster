const express = require('express');
const eventController = require('../controllers/eventsController');

const router = express.Router();

router.get('/api/events', eventController.getAllEvents);
router.get('/api/events/:id', eventController.getEventById);

router.post('/api/events', eventController.createEvent);

router.put('/api/events/:id', eventController.updateEvent);

router.delete('/api/events', eventController.deleteAllEvents);

module.exports = router;