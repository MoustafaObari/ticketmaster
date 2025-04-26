const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.get('/api/payments', paymentController.getAllPayments);

router.post('/api/payments', paymentController.createPayment);

router.put('/api/payments/:id', paymentController.updatePayment);

router.delete('/api/payments', paymentController.deleteAllPayments);

module.exports = router;