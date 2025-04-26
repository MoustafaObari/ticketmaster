const express = require('express');
const venueController = require('../controllers/venueController');

const router = express.Router();

router.get('/api/venues', venueController.getAllVenues);

router.post('/api/venues', venueController.createVenue);

router.put('/api/venues/:id', venueController.updateVenue);

router.delete('/api/venues', venueController.deleteAllVenues);

module.exports = router;