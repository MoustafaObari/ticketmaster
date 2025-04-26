const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.get('/api/tickets', ticketController.getAllTickets);
router.get('/api/tickets/event/:id', ticketController.getAllTicketsByEventId);

router.post('/api/tickets', ticketController.createTicket);

router.put('/api/tickets/:id', ticketController.updateTicket);

router.delete('/api/tickets', ticketController.deleteAllTickets);

module.exports = router;